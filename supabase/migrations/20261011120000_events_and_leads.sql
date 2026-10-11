-- Session 05: tables for anonymous measurement (events) and lead capture (leads).
-- Run once in the Supabase dashboard (SQL Editor). Not idempotent on purpose.
--
-- Design (see docs/strategy.md section 5):
--   * events and leads are NOT linked: leads has no session_id.
--   * anon may only INSERT. No SELECT, UPDATE or DELETE. Read the data in the
--     dashboard (it runs as postgres and bypasses RLS).
--   * No UNIQUE on leads.email: an error would reveal that an address exists.
--     Deduplicate outside the app.
--   * The client sends only the columns listed in the GRANTs below. id,
--     created_at and consent_at are set by the server, so a client cannot
--     forge the consent time.
--
-- Rule: a database check must never be stricter than the client validation.
-- The shared limits live in src/leadForm.ts (EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH,
-- CONSENT_TEXT_VERSION_PATTERN). Change a number there, change it here.
--
-- Do not use `insert ... returning` or `.select()` as anon: there is no SELECT
-- policy, so reading the row back fails. The client uses Prefer: return=minimal.

begin;

create table public.events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  name text not null,
  variant text,
  created_at timestamptz not null default now(),
  constraint events_name_check
    check (name in ('page_view', 'cta_click', 'calc_used', 'form_start', 'form_submit')),
  constraint events_variant_check
    check (variant is null or variant in ('a', 'b'))
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  consent_at timestamptz not null default now(),
  consent_text_version text not null,
  created_at timestamptz not null default now(),
  -- 5 = shortest address the client accepts (a@b.c), 254 = common upper bound.
  constraint leads_email_length_check
    check (char_length(email) between 5 and 254),
  -- At least one character before the @ (client: local part is not empty).
  constraint leads_email_at_check
    check (position('@' in email) > 1),
  constraint leads_consent_text_version_check
    check (consent_text_version ~ '^v[0-9]{1,3}$')
);

alter table public.events enable row level security;
alter table public.leads enable row level security;

-- Start from nothing, then grant INSERT on the columns the client sends.
-- Explicit on purpose: default privileges of new tables differ between projects.
revoke all on table public.events from anon, authenticated;
revoke all on table public.leads from anon, authenticated;

grant insert (session_id, name, variant) on public.events to anon;
grant insert (email, consent_text_version) on public.leads to anon;

-- The checks above do the validation, so the policies only open the door.
create policy events_anon_insert on public.events
  for insert to anon with check (true);

create policy leads_anon_insert on public.leads
  for insert to anon with check (true);

commit;

-- ---------------------------------------------------------------------------
-- Manual test (commented out). Run each block on its own in the SQL Editor.
-- `set local role anon` makes the editor behave like the browser client.
-- Every block ends with rollback, so no test row stays in the tables.
-- ---------------------------------------------------------------------------
--
-- (a) INSERT as anon passes (expected: success, 1 row affected, then rollback).
--
--   begin;
--   set local role anon;
--   insert into public.events (session_id, name, variant)
--     values (gen_random_uuid(), 'page_view', 'a');
--   insert into public.leads (email, consent_text_version)
--     values ('test@example.com', 'v1');
--   rollback;
--
--   Same through the real REST path (leaves 1 row in events, delete it in the
--   dashboard afterwards). Expected: HTTP 201 and an empty body.
--
--   curl -i "$VITE_SUPABASE_URL/rest/v1/events" \
--     -H "apikey: $VITE_SUPABASE_ANON_KEY" \
--     -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY" \
--     -H "Content-Type: application/json" \
--     -H "Prefer: return=minimal" \
--     -d '{"session_id":"00000000-0000-4000-8000-000000000000","name":"page_view","variant":null}'
--
-- (b) SELECT as anon returns nothing or fails
--     (expected: "permission denied for table events", via REST HTTP 401).
--
--   begin;
--   set local role anon;
--   select * from public.events;
--   rollback;
--
--   curl -i "$VITE_SUPABASE_URL/rest/v1/events?select=*" \
--     -H "apikey: $VITE_SUPABASE_ANON_KEY" \
--     -H "Authorization: Bearer $VITE_SUPABASE_ANON_KEY"
--
-- (c) variant = 'c' is rejected (expected: violates check constraint "events_variant_check").
--
--   begin;
--   set local role anon;
--   insert into public.events (session_id, name, variant)
--     values (gen_random_uuid(), 'page_view', 'c');
--   rollback;
--
-- (d) Unknown event name is rejected (expected: violates check constraint "events_name_check").
--
--   begin;
--   set local role anon;
--   insert into public.events (session_id, name, variant)
--     values (gen_random_uuid(), 'page_scroll', null);
--   rollback;
--
-- (e) E-mail of 4 and of 255 characters is rejected
--     (expected: both violate "leads_email_length_check").
--     'a@bc' has an @ at position 2, so only the length check can fire.
--
--   begin;
--   set local role anon;
--   insert into public.leads (email, consent_text_version)
--     values ('a@bc', 'v1');
--   rollback;
--
--   begin;
--   set local role anon;
--   insert into public.leads (email, consent_text_version)
--     values (repeat('a', 243) || '@example.com', 'v1');
--   rollback;
--
-- Bonus: the new checks.
--   e-mail without @: 'abcdef'          -> violates "leads_email_at_check"
--   e-mail starting with @: '@example.com' -> violates "leads_email_at_check"
--   consent_text_version 'v1234' or 'x' -> violates "leads_consent_text_version_check"
--   consent_at is not granted: insert (email, consent_text_version, consent_at)
--     as anon -> "permission denied for table leads"
--   Boundaries that must pass: 'a@b.c' (5 chars) and repeat('a', 242) || '@example.com' (254 chars).
