-- Funnel from the events table, split by ad variant (utm_content: a / b).
-- Run it yourself in the Supabase dashboard (SQL Editor). The editor runs as
-- postgres and bypasses RLS, so it can read what the browser (anon) cannot.
--
-- HOW TO USE
--   1. Set `since` below to the moment the ads start. Every number is counted
--      from created_at >= since only, so test rows and preview visits from
--      before the launch stay out of the result.
--   2. Before the ads start, clean the events table by hand in the dashboard
--      (Table Editor, or `delete from public.events;` as postgres). `since` is
--      a second safety net, not a replacement. The `leads` table is separate:
--      the two are not linked, so the leads need no filtering here.
--   3. Run it. One row per variant, one column per event, plus the conversion.
--
-- HOW TO READ IT
--   * The unit is a page load, not a person. Each load makes a new random
--     session_id, so a reload counts as a new session. All events of one
--     session carry the same variant, so grouping by variant is exact.
--   * Variant 'none' = no utm_content, or a value other than a / b.
--     Variant 'all' = every variant together.
--   * conversion_pct = form_submit sessions / page_view sessions * 100.
--
-- KNOWN LIMITS (the code is not changed for any of them)
--   * Bots, crawlers and link previews that run JavaScript send page_view and
--     raise the denominator, which lowers the conversion. anon INSERT is open
--     to scripts (docs/strategy.md, section 10).
--   * An ad blocker may block requests to *.supabase.co, so some visits are
--     missing, and not at random.
--   * form_start fires on the first focus of the e-mail field. Autofill that
--     fills the field without a focus can give form_submit without form_start.
--   * crypto.randomUUID needs a secure context and a newer browser (Safari
--     15.4 or later). Where it is missing, that visit is not measured at all.
--   * A failed send is not retried, so every number is a lower bound.
--   * A session that has form_submit but whose page_view failed to send raises
--     the conversion slightly, because the numerator counts it and the
--     denominator does not.
--   * calc_used counts only a valid result after the visitor changed the fund,
--     the deposit or the years. The default values alone do not count.

with params as (
  -- EDIT ME: start of the ad campaign. Placeholder = the assignment deadline.
  select timestamptz '2026-10-16 00:00:00+02' as since
),
scoped as (
  select e.session_id, e.name, e.variant
  from public.events e
  cross join params p
  where e.created_at >= p.since
)
select
  case when grouping(variant) = 1 then 'all' else coalesce(variant, 'none') end
    as variant,
  count(distinct session_id) filter (where name = 'page_view')   as page_view,
  count(distinct session_id) filter (where name = 'cta_click')   as cta_click,
  count(distinct session_id) filter (where name = 'calc_used')   as calc_used,
  count(distinct session_id) filter (where name = 'form_start')  as form_start,
  count(distinct session_id) filter (where name = 'form_submit') as form_submit,
  round(
    100.0 * count(distinct session_id) filter (where name = 'form_submit')
    / nullif(count(distinct session_id) filter (where name = 'page_view'), 0),
    2
  ) as conversion_pct
from scoped
group by rollup (variant)
order by grouping(variant), variant nulls last;
