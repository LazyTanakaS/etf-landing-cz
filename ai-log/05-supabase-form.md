 ▐▛███▛█   Claude Code v2.1.295
▝▜██████▀  Sonnet 5.5 · Claude Pro
 ▝▝   ▝▝   ~/Desktop/Projects/etf-landing-cz


❯ /clear                                                                        

❯ Session 05: Supabase schema + lead form. Plan first, do not write code until  
  I approve.                                                                    
  Read CLAUDE.md, docs/strategy.md §5, docs/copy-cs.md (form + consent),        
  NOTES.md.                                                                     
                                                                                
  Scope:                                                                        
  1. SQL migration file in supabase/migrations/ (I run it myself in the         
  Supabase                                                                      
     dashboard; you do not touch my Supabase project):                          
     - events(id, session_id, name, variant, created_at), leads(id, email,      
       consent_at, consent_text_version, created_at), not linked.               
     - CHECK on event names (page_view, cta_click, calc_used, form_start,       
       form_submit), CHECK on variant (NULL or 'a'/'b'), CHECK on email length. 
     - RLS enabled; anon: INSERT only, no SELECT/UPDATE/DELETE. No UNIQUE on    
  email.                                                                        
  2. src/lib/supabase.ts client from VITE_SUPABASE_URL /                        
  VITE_SUPABASE_ANON_KEY,                                                       
     Prefer: return=minimal. Add .env.example (and the .gitignore exception for 
  it).                                                                          
     Never commit .env.                                                         
  3. Lead form component: email + consent checkbox (text from copy-cs.md,       
     consent_text_version constant), honeypot field, client validation,         
     states: idle / sending / success / error. Failure must not lose the typed  
  email.                                                                        
  4. Variant reading: utm_content -> 'a'|'b'|null, a pure function with unit    
  tests.                                                                        
  5. Do not implement tracking calls yet (that is session 06); only the insert  
     functions for events and leads.                                            
                                                                                
  In the plan list: file list, what each test covers, what you are unsure       
  about.                                                                        
  Do not commit. Do not add dependencies except @supabase/supabase-js.          

⏺ Přečtu zadané soubory a podívám se na stávající strukturu projektu.

  Searched for 2 patterns, ran 5 shell commands (ctrl+o to expand)

⏺ Plán Session 05: Supabase schéma a formulář

  Přečetl jsem CLAUDE.md, strategy §3 a §5, copy-cs §6 až §8, NOTES.md a
  stávající src/. Zatím jsem nic nezapsal. Ověřil jsem tři věci:
  - Složka supabase/ neexistuje.
  - .gitignore obsahuje .env.*, takže by pohltil i .env.example.
  - V projektu není jsdom ani React Testing Library. Nová závislost smí být jen
    @supabase/supabase-js, takže komponenty testovat nemůžu a veškerá logika
    musí být v čistých funkcích (jako calculator.ts).

  Soubory

  Soubor: supabase/migrations/20261011120000_events_and_leads.sql
  Obsah: Tabulky, CHECKy, RLS, GRANTy. Pustíte si ho sám.
  ────────────────────────────────────────
  Soubor: src/lib/supabase.ts
  Obsah: Líně vytvořený klient (getSupabase()), čte VITE_SUPABASE_URL a
  VITE_SUPABASE_ANON_KEY.
  ────────────────────────────────────────
  Soubor: src/lib/inserts.ts
  Obsah: insertEvent() a insertLead(). Vrací { ok: boolean }, nevyhazuje
  výjimky.
  ────────────────────────────────────────
  Soubor: src/variant.ts
  Obsah: readVariant(search: string): 'a' | 'b' | null.
  ────────────────────────────────────────
  Soubor: src/leadForm.ts
  Obsah: Čistá logika: validateLeadForm() a submitLead(values, insert).
  ────────────────────────────────────────
  Soubor: src/components/LeadForm.tsx
  Obsah: Tenká komponenta: useState pro hodnoty a stav, volá submitLead.
  ────────────────────────────────────────
  Soubor: src/content.ts (úprava)
  Obsah: leadFormContent a consentTextVersion = 'v1', texty z copy-cs §6
  doslova.
  ────────────────────────────────────────
  Soubor: src/index.css (úprava)
  Obsah: Styly formuláře a honeypotu mimo obrazovku.
  ────────────────────────────────────────
  Soubor: src/App.tsx (úprava)
  Obsah: <LeadForm /> pod <Calculator />.
  ────────────────────────────────────────
  Soubor: .env.example, .gitignore (úprava)
  Obsah: Prázdné proměnné a výjimka !.env.example za řádkem .env.*.
  ────────────────────────────────────────
  Soubor: package.json, package-lock.json
  Obsah: Přibude jen @supabase/supabase-js.

  Testy jdou do src/variant.test.ts, src/leadForm.test.ts a
  src/lib/inserts.test.ts. NOTES.md a ai-log/ nechávám na vás. Necommituju.

  Migrace

  - events
    - id uuid s defaultem gen_random_uuid(). Uuid volím proto, že u bigint
      identity si nejsem jistý oprávněním anon k sekvenci.
    - session_id uuid (v session 06 to bude crypto.randomUUID(), a malformovaná
      hodnota tak spadne na typu).
    - name text s CHECK na pět názvů.
    - variant text s CHECK IS NULL OR IN ('a','b').
    - created_at timestamptz default now().
  - leads
    - id uuid, email text s CHECK na délku 5 až 254.
    - consent_at timestamptz default now(), consent_text_version text,
      created_at.
    - session_id v ní není a tabulky nejsou propojené. Bez UNIQUE.
  - Oprávnění
    - ENABLE ROW LEVEL SECURITY a policy FOR INSERT TO anon WITH CHECK (true).
      Validaci dělají CHECKy.
    - REVOKE ALL z anon a authenticated, potom GRANT INSERT jen na sloupce,
      které klient posílá: events (session_id, name, variant) a leads (email, 
      consent_text_version).
    - consent_at si tedy nastaví server a klient ho nemůže zfalšovat.
  - Na konec souboru přijde komentář s ručním testem: curl s anon klíčem, kde
    INSERT projde a SELECT selže.

  Testy

  variant.test.ts
  - ?utm_content=a a b vrátí 'a' a 'b'.
  - Chybějící parametr, prázdná hodnota a c vrátí null.
  - Případ A záleží na vašem rozhodnutí (viz otázky).
  - Opakovaný parametr (a a pak b) vezme první.
  - Ostatní parametry (utm_source) se ignorují.
  - Prázdný řetězec a ?.

  leadForm.test.ts
  - E-mail:
    - prázdný, bez @, bez tečky v doméně, s mezerou uprostřed → chyba z copy;
    - jmeno@priklad.cz s mezerami okolo projde a ořízne se;
    - délka 254 projde, 255 ne (stejná konstanta jako v SQL, s komentářem).
  - Souhlas nezaškrtnutý → chyba z copy. Obě chyby najednou vrátí obě.
  - Honeypot vyplněný → výsledek success a insert se nezavolal.
  - submitLead:
    - neplatný vstup → insert se nezavolal;
    - platný vstup → insert zavolán jednou s { email, consent_text_version: 'v1'
      };
    - insert vrátí ok: false nebo vyhodí výjimku → error.

  inserts.test.ts (vi.mock('./supabase'))
  - insertLead pošle přesně dva sloupce, tedy bez session_id a bez consent_at.
  - insertEvent pošle tři sloupce.
  - Chyba z klienta a výjimka se převedou na { ok: false }.
  - Žádný z insertů nevolá .select().

  Ověřím také mutací: rozbiju podmínku a test musí zčervenat.

  Co testy nepokryjí: zachování e-mailu po chybě je vlastnost komponenty (stav
  se při error nemaže) a bez RTL ji automaticky ověřit nejde. Zkontrolujete ji
  ručně v prohlížeči s vypnutou sítí. Z toho důvodu je v komponentě jediné
  místo, kde se stav maže, a to je větev success.

  Čím si nejsem jistý

  1. Výchozí oprávnění nových tabulek v Supabase. Nevím, zda anon dostane práva
     automaticky. Proto migrace nastavuje REVOKE a GRANT explicitně a funguje v
     obou případech.
  2. Prefer: return=minimal. insert() bez .select() by měl vracet prázdnou
     odpověď, ale nevím jistě, zda ho supabase-js posílá explicitně. Po
     instalaci to ověřím ve zdrojích postgrest-js a vy v záložce Network.
  3. Velikost bundlu. supabase-js přitáhne i auth, realtime a storage, které
     nepotřebujeme. Změřím gzip před a po instalaci. Pokud přírůstek bude
     citelný, alternativou je ~15 řádků čistého fetch na REST endpoint.
  4. Auth klient. Nastavil bych persistSession: false, autoRefreshToken: false a
     detectSessionInUrl: false. Jinak klient sahá do localStorage a čte URL,
     což se kříží s rizikem ze strategy §10 (souhlas a úložiště prohlížeče).
  5. Honeypot. Název pole nesmí být email, phone ani url, jinak ho autofill
     vyplní a skutečný uživatel se tiše zahodí. Použiji neutrální název,
     tabIndex=-1, aria-hidden a skrytí mimo obrazovku. Funguje to jen proti
     jednoduchým botům na webu. Bot, který zavolá REST API napřímo, ho obejde
     (to je už ve strategy §10).
  6. consent_text_version = 'v1' s placeholdery. Text souhlasu obsahuje
     [PROVOZOVATEL: …]. Až provozovatel text doplní, musí se verze zvýšit na v2.
     Dám to do komentáře u konstanty.

  Rozhodnutí na vás

  1. Chybí texty v copy-cs §6. Text chyby při selhání odeslání, text tlačítka
     během odesílání a text po úspěchu v copy nejsou, jsou tam jen dvě validační
     chyby. Navrhnu české verze, označené jako návrh k vašemu schválení, a
     doplníte je do copy-cs.md. Co má formulář po úspěchu ukázat, než v session
     07 přibude souhrn? Moje volba: komponenta volá onSuccess a sama žádný
     vymyšlený text nevypisuje.
  2. Když uložení selže: má formulář zůstat s chybou a tlačítkem „zkusit znovu",
     nebo má dovolit pokračovat k souhrnu i bez uložení? Moje volba: zůstat s
     chybou a e-mail nechat vyplněný. Brána je ale kosmetická, takže je to
     produktové rozhodnutí.
  3. Rozsah CHECKů. Přidal bych dva, které jste nezadal: omezení
     consent_text_version na tvar ^v[0-9]{1,3}$ (jinak jde do textového sloupce
     vložit cokoli) a volitelně position('@' in email) > 1. Chcete oba, jen
     první, nebo žádný?
  4. utm_content=A. Brát jako 'a' (normalizace na malá písmena, protože CHECK v
     DB je malými), nebo jen přesně a/b? Moje volba: normalizovat, protože
     odkazy do reklam se píšou ručně. Pozor: Hero dnes bere variant="A" velkými,
     mapování se řeší až při napojení.
  5. Zapojení do App.tsx. Připojit formulář hned pod kalkulačku, nebo ho zatím
     nechat nezapojený do session 07, až bude souhrn? Moje volba: připojit, aby
     šel vyzkoušet. Na Vercelu pak musí být nastavené obě VITE_ proměnné, jinak
     formulář po odeslání skončí chybou.

  Až odpovíte (stačí čísla s volbou, jinak platí moje výchozí), začnu v tomto
  pořadí: instalace závislosti a měření bundlu → migrace → variant.ts a testy →
  leadForm.ts a testy → supabase.ts a inserts.ts a testy → komponenta →
  .env.example a .gitignore → npm test, npm run lint, npm run build.

✻ Worked for 1m 54s · done 3:50 PM

❯ Rozhodnutí:                                                                   
  1. Souhlas. LeadForm volá onSuccess a žádný vlastní text úspěchu nevypisuje.  
     Navrhněte české texty pro chybu při selhání odeslání a pro tlačítko        
     „zkusit znovu", označené „návrh, schválí autor". Do docs/copy-cs.md je     
     přesunu sám.                                                               
  2. Souhlas. Při selhání formulář zůstane s chybou a zadaný e-mail se zachová. 
     Doplňte: tlačítko odeslání je zakázané, dokud je stav „sending" (UNIQUE na 
     e-mailu není, dvojklik by vytvořil duplicity). Stav se maže jen ve větvi   
     success.                                                                   
  3. Přidejte oba CHECKy: consent_text_version ~ '^v[0-9]{1,3}$' a              
     position('@' in email) > 1. Pravidla v databázi nesmí být nikdy přísnější  
     než validace na klientu. Napište to komentářem vedle sdílených konstant.   
  4. Normalizujte utm_content: trim(), toLowerCase(), pak porovnání s 'a' /     
  'b',                                                                          
     jinak null. Testy musí pokrýt „A" a „ a ". Varianta reklamy (utm_content)  
     zůstává oddělená od Hero variant="A" (text hrdinské sekce): jiné názvy,    
     žádné mapování teď.                                                        
  5. Zapojte <LeadForm /> do App.tsx hned pod kalkulačku.                       
                                                                                
  Bundle:                                                                       
  Před instalací @supabase/supabase-js a po ní změřte gzip velikost produkčního 
  buildu a uveďte obě čísla. Pokud přírůstek přesáhne 30 kB gzip, supabase-js   
  nenechávejte: použijte čistý fetch na REST endpoint (zhruba 15 řádků,         
  hlavičky apikey, Authorization, Content-Type, Prefer: return=minimal) a       
  vynechte nastavení auth klienta. Řekněte mi, kterou cestou jdete, dřív než    
  začnete psát inserts.ts.                                                      
                                                                                
  Opravy vašeho plánu:                                                          
  - Pojmenování: všude používejte submitLead (v tabulce máte „tLead") a         
    leadFormContent v content.ts. Text tabulky byl poškozený, názvy si ověřte.  
  - Na konec migrace přidejte zakomentovaný ruční test, který pustím já:        
    (a) INSERT s anon klíčem projde, (b) SELECT nevrátí nic nebo 401,           
    (c) variant = 'c' je zamítnut, (d) neznámý název události je zamítnut,      
    (e) e-maily o délce 4 a 255 znaků jsou zamítnuty.                           
  - consent_text_version je 'v1' s placeholdery [PROVOZOVATEL]: u konstanty     
    přidejte komentář, že se musí zvýšit na 'v2', až provozovatel doplní text.  
                                                                                
  Pořadí práce jako ve vašem plánu: výchozí velikost bundlu -> migrace ->       
  variant.ts + testy -> leadForm.ts + testy -> supabase.ts/inserts.ts + testy   
  ->                                                                            
  komponenta -> .env.example a .gitignore -> npm test, npm run lint,            
  npm run build.                                                                
  U přidaných testů proveďte mutační kontrolu a napište, které mutace jste      
  zkoušel. Necommitujte. NOTES.md a ai-log/ jsou moje.                          
  Na konci vypište každé místo, kde jste si nebyl jistý nebo se odchýlil od     
  plánu.                                                                        

⏺ Začínám výchozím měřením bundlu.

  Ran 1 shell command (ctrl+o to expand)

⏺ Výchozí stav: JS 72,27 kB gzip (Vite), CSS 1,22 kB. Nainstaluji závislost a
  změřím přírůstek s reálným použitím klienta, protože nepoužitý import by se
  vytřásl.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Supabase-js by přidal +54,84 kB gzip, nad 30kB limit, takže místo něj použiju
  čistý fetch na REST endpoint s hlavičkami apikey/Authorization/Content-Type a
  Prefer: return=minimal. Závislost vracím zpět a inserts.ts napíšu hned poté. 
  · summary

  Ran 1 shell command (ctrl+o to expand)

⏺ Další krok je migrace. Píšu ji tak, aby ruční testy (a) až (e) šly pustit v
  SQL editoru přes set local role anon a aby (a) a (b) měly i variantu curl přes
  skutečné REST rozhraní.

⏺ Write(supabase/migrations/20261011120000_events_and_leads.sql)
  ⎿  Wrote 147 lines to
     supabase/migrations/20261011120000_events_and_leads.sql
       1 -- Session 05: tables for anonymous measurement (events) and lea
       2 -- Run once in the Supabase dashboard (SQL Editor). Not idempote
         nt on purpose.
       4 -- Design (see docs/strategy.md section 5):
       5 --   * events and leads are NOT linked: leads has no session_id.
         he data in the
       7 --     dashboard (it runs as postgres and bypasses RLS).
         ddress exists.
       9 --     Deduplicate outside the app.
         low. id,
     … +171 lines (ctrl+o to expand)

⏺ Migrace je hotová. Dál jde variant.ts s testy. Názvy mají být oddělené od Hero
  variant, proto AdVariant a readAdVariant.

⏺ Write(src/variant.ts)
  ⎿  Wrote 14 lines to src/variant.ts
       1 // Ad variant: which ad brought the visitor here. It comes from 
       2 // is stored in events.variant. It is separate from the Hero `va
         riant` prop,
         er yet.
       5 
       6 // Matches events_variant_check in supabase/migrations: NULL, 'a
       7 // utm_content is typed by hand in ad URLs, so " A " counts as '
         a'.
         {
      10     .get('utm_content')
     … +8 lines (ctrl+o to expand)

⏺ Write(src/variant.test.ts)
  ⎿  Wrote 46 lines to src/variant.test.ts
       1 import { describe, expect, it } from 'vitest'
       2 import { readAdVariant } from './variant'
       3 
       4 describe('readAdVariant', () => {
       5   it('reads a and b', () => {
       6     expect(readAdVariant('?utm_content=a')).toBe('a')
       7     expect(readAdVariant('?utm_content=b')).toBe('b')
       8   })
       9 
      10   it('normalizes case: "A" and "B" count as a and b', () => {
     … +38 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ M2 byla nepřesná: sed smazal celý řádek ?.trim() a s ním i optional chaining,
  takže spadl test pro chybějící parametr z jiného důvodu. Opakuji čistě.

  Ran 1 shell command (ctrl+o to expand)

⏺ Teď leadForm.ts. Nejdřív se podívám na styl content.ts a calculator.ts, abych
  ho zachoval.

  Ran 1 shell command (ctrl+o to expand)

⏺ Řídím se stylem content.ts (texty doslova z copy-cs, komentáře anglicky).
  Nejdřív texty formuláře a konstanta verze souhlasu.

⏺ Update(src/content.ts)
  ⎿  Added 29 lines
       78      `Pro představu, ilustrace, výpočet: při ${deposit} měsíčně
            po dobu ${years} let (vloženo ${invested}), bez zhodnocení a 
           bez poplatků brokera, je rozdíl mezi nejnižším (${minTer}) a n
           ejvyšším (${maxTer}) poplatkem fondu z této tabulky ${gap}.`,
       79  } as const
       80  
       81 +// Stored with every lead (leads.consent_text_version) so a le
          +ad can be matched                                             
       82 +// to the exact consent wording it agreed to. The text below s
          +till contains the                                             
       83 +// [PROVOZOVATEL] placeholders. When the operator fills them i
          +n, the wording                                                
       84 +// changes, so this MUST be raised to 'v2' (and 'v3', ...) in 
          +the same commit.                                              
       85 +// The database accepts 'v' plus 1-3 digits (leads_consent_tex
          +t_version_check).                                             
       86 +export const CONSENT_TEXT_VERSION = 'v1'                      
       87 +                                                              
       88 +// docs/copy-cs.md, section 6 (form). The consent text is [prá
          +vní riziko]:                                                  
       89 +// purpose and controller are for [PROVOZOVATEL] to fill in.  
       90 +export const leadFormContent = {                              
       91 +  heading: 'Souhrn pro váš scénář',                           
       92 +  intro:                                                      
       93 +    'Po zadání e-mailu se na obrazovce zobrazí souhrn: částka,
          + doba, všech pět fondů, rozpis po letech a otázky pro brokera.
          + E-mailem ho neposíláme.',                                    
       94 +  emailLabel: 'E-mail',                                       
       95 +  emailPlaceholder: 'jmeno@priklad.cz',                       
       96 +  consent:                                                    
       97 +    'Souhlasím se zpracováním e-mailové adresy za účelem [PROV
          +OZOVATEL: účel]. Správce: [PROVOZOVATEL: název, kontakt]. Souh
          +las mohu kdykoli odvolat na [PROVOZOVATEL: kontakt].',        
       98 +  submit: 'Zobrazit souhrn',                                  
       99 +  note: 'Souhrn se vytvoří ve vašem prohlížeči. Zadanou částku
          + a dobu neukládáme.',                                         
      100 +  emailError: 'Zadejte e-mail ve tvaru jmeno@domena.cz.',     
      101 +  consentError: 'Bez souhlasu souhrn zobrazit nemůžeme.',     
      102 +  // Proposal, author to approve (návrh, schválí autor). Not i
          +n                                                             
      103 +  // docs/copy-cs.md yet: the author moves the approved wordin
          +g there.                                                      
      104 +  sending: 'Odesílám…',                                       
      105 +  sendError:                                                  
      106 +    'Odeslání se nepodařilo. Zkontrolujte připojení a zkuste t
          +o znovu. Váš e-mail ve formuláři zůstal.',                    
      107 +  retry: 'Zkusit znovu',                                      
      108 +} as const                                                    
      109 +                                                              
      110  // docs/copy-cs.md, section 8 (risk notice). The final wording
            is for
      111  // [PROVOZOVATEL] or a lawyer to approve.
      112  export const riskContent = {

⏺ Write(src/leadForm.ts)
  ⎿  Wrote 87 lines to src/leadForm.ts
       1 import { CONSENT_TEXT_VERSION } from './content'
       3 // Shared limits. RULE: the database must never be stricter than
          this client
         d send there.
       5 // The same numbers sit in supabase/migrations/20261011120000_ev
       6 // (leads_email_length_check, leads_email_at_check,
       7 // leads_consent_text_version_check). Change one side, change th
       8 export const EMAIL_MIN_LENGTH = 5 // shortest accepted address: 
         a@b.c
      10 export const CONSENT_TEXT_VERSION_PATTERN = /^v[0-9]{1,3}$/
     … +89 lines (ctrl+o to expand)

⏺ Write(src/leadForm.test.ts)
  ⎿  Wrote 149 lines to src/leadForm.test.ts
       1 import { describe, expect, it, vi } from 'vitest'
       2 import { CONSENT_TEXT_VERSION } from './content'
       3 import {
       4   CONSENT_TEXT_VERSION_PATTERN,
       5   EMAIL_MAX_LENGTH,
       6   EMAIL_MIN_LENGTH,
       7   submitLead,
       8   validateLeadForm,
       9   type LeadFormValues,
      10 } from './leadForm'
     … +159 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Testy leadForm jsou zelené a všech 13 mutací spadlo (k M5 se vrátím ve výpisu
  na konci). Teď supabase.ts a inserts.ts na čistém fetch, jak jsem oznámil
  výše.

⏺ Write(src/lib/supabase.ts)
  ⎿  Wrote 47 lines to src/lib/supabase.ts
      1 // Minimal Supabase REST client: one INSERT into a table, nothing
      2 // It is plain fetch on purpose. @supabase/supabase-js was measur
        ed in this
      3 // project at +54.84 kB gzip (72.27 -> 127.11 kB) for a page that
      4 // POST, and a landing page opened from an ad has a few seconds.
      5 //
        browser, so
      7 // the security is in RLS (supabase/migrations), not in hiding th
        e key.
      9 const REQUEST_TIMEOUT_MS = 10_000
     … +48 lines (ctrl+o to expand)
⏺ Write(src/lib/inserts.ts)
  ⎿  Wrote 40 lines to src/lib/inserts.ts
       1 import type { LeadRow } from '../leadForm'
       2 import type { AdVariant } from '../variant'
       3 import { postgrestInsert, type InsertResult } from './supabase'
       4 
       5 // Same list as events_name_check in supabase/migrations.
       6 export const EVENT_NAMES = [
       7   'page_view',
       8   'cta_click',
       9   'calc_used',
      10   'form_start',
     … +35 lines (ctrl+o to expand)

⏺ Write(src/lib/inserts.test.ts)
  ⎿  Wrote 142 lines to src/lib/inserts.test.ts
      1 import { afterEach, beforeEach, describe, expect, it, vi } from '
        vitest'
      2 import { EVENT_NAMES, insertEvent, insertLead } from './inserts'
      3 
      4 const URL = 'https://abc.supabase.co'
      6 
      7 const okResponse = (status = 201) => new Response(null, { status 
        })
      8 
      9 let fetchMock: ReturnType<typeof vi.fn>
     … +151 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Všech 14 mutací v lib/ spadlo a tsc prochází. Před komponentou se podívám na
  zbytek CSS a konec Calculator.tsx, ať styl formuláře sedí.

  Ran 1 shell command (ctrl+o to expand)

⏺ Teď komponenta. Logika je v leadForm.ts, komponenta jen drží stav a volá
  submitLead.

⏺ Write(src/components/LeadForm.tsx)
  ⎿  Wrote 142 lines to src/components/LeadForm.tsx
       1 import { useRef, useState, type SubmitEvent } from 'react'
       2 import { leadFormContent } from '../content'
       3 import { submitLead } from '../leadForm'
       4 import { insertLead } from '../lib/inserts'
       5 
       6 type Status = 'idle' | 'sending' | 'success' | 'error'
       7 
       8 const noErrors = { emailInvalid: false, consentMissing: false }
       9 
      10 interface LeadFormProps {
     … +143 lines (ctrl+o to expand)

⏺ Update(src/index.css)
  ⎿  Added 86 lines
      229    margin-bottom: 0;
      230  }
      231  
      232 +/* Lead form. */                                              
      233 +#formular {                                                   
      234 +  margin-top: 2.5rem;                                         
      235 +}                                                             
      236 +                                                              
      237 +.lead-field {                                                 
      238 +  margin-bottom: 1rem;                                        
      239 +}                                                             
      240 +                                                              
      241 +.lead-field label {                                           
      242 +  display: block;                                             
      243 +  font-weight: 600;                                           
      244 +  margin-bottom: 0.25rem;                                     
      245 +}                                                             
      246 +                                                              
      247 +/* 16px font keeps iOS from zooming on focus. */              
      248 +.lead-field input[type='email'] {                             
      249 +  width: 100%;                                                
      250 +  min-width: 0;                                               
      251 +  min-height: 2.75rem;                                        
      252 +  padding: 0.5rem 0.75rem;                                    
      253 +  font: inherit;                                              
      254 +  color: var(--text);                                         
      255 +  background: var(--surface);                                 
      256 +  border: 1px solid var(--muted);                             
      257 +  border-radius: 0.375rem;                                    
      258 +}                                                             
      259 +                                                              
      260 +.lead-field input[aria-invalid='true'][type='email'] {        
      261 +  border-color: var(--error);                                 
      262 +  border-width: 2px;                                          
      263 +}                                                             
      264 +                                                              
      265 +/* Checkbox and its long consent text side by side. */        
      266 +.lead-consent {                                               
      267 +  display: flex;                                              
      268 +  align-items: flex-start;                                    
      269 +  gap: 0.75rem;                                               
      270 +}                                                             
      271 +                                                              
      272 +.lead-consent input {                                         
      273 +  flex: none;                                                 
      274 +  width: 1.5rem;                                              
      275 +  height: 1.5rem;                                             
      276 +  margin: 0.125rem 0 0;                                       
      277 +  accent-color: var(--accent);                                
      278 +}                                                             
      279 +                                                              
      280 +.lead-consent label {                                         
      281 +  font-weight: 400;                                           
      282 +  margin-bottom: 0;                                           
      283 +}                                                             
      284 +                                                              
      285 +.lead-error {                                                 
      286 +  margin: 0.25rem 0 0.75rem;                                  
      287 +  color: var(--error);                                        
      288 +  font-weight: 600;                                           
      289 +}                                                             
      290 +                                                              
      291 +/* Honeypot: off screen, not display:none (some bots skip hidd
          +en fields). */                                                
      292 +.lead-trap {                                                  
      293 +  position: absolute;                                         
      294 +  left: -10000px;                                             
      295 +  width: 1px;                                                 
      296 +  height: 1px;                                                
      297 +  overflow: hidden;                                           
      298 +}                                                             
      299 +                                                              
      300 +.lead-submit {                                                
      301 +  min-height: 2.75rem;                                        
      302 +  padding: 0.75rem 1.25rem;                                   
      303 +  margin-block: 0.5rem 0.75rem;                               
      304 +  background: var(--accent);                                  
      305 +  color: var(--accent-text);                                  
      306 +  font: inherit;                                              
      307 +  font-weight: 600;                                           
      308 +  border: 0;                                                  
      309 +  border-radius: 0.375rem;                                    
      310 +  cursor: pointer;                                            
      311 +}                                                             
      312 +                                                              
      313 +.lead-submit:disabled {                                       
      314 +  opacity: 0.6;                                               
      315 +  cursor: not-allowed;                                        
      316 +}                                                             
      317 +                                                              
      318  footer {
      319    padding-block: 1.5rem 3rem;
      320    border-top: 1px solid var(--border);

⏺ Update(src/App.tsx)
  ⎿  Added 1 line
      14        <main>
      15          <EtfTable items={sorted} />
      16          <Calculator items={sorted} />
      17 +        <LeadForm />                                           
      18        </main>
      19        <Footer />
      20      </>

⏺ Update(src/App.tsx)
  ⎿  Added 1 line
      2  import { EtfTable } from './components/EtfTable'
      3  import { Footer } from './components/Footer'
      4  import { Hero } from './components/Hero'
      5 +import { LeadForm } from './components/LeadForm'                
      6  import { etfs, sortByTer } from './data/etfs'
      7  
      8  function App() {

⏺ Zbývá .env.example a výjimka v .gitignore.

⏺ Write(.env.example)
  ⎿  Error writing file

⏺ Update(.gitignore)
  ⎿  Added 1 line
      26  # Environment files
      27  .env
      28  .env.*
      29 +!.env.example                                                  

⏺ Zápis .env.example mi blokuje nastavené oprávnění, proto soubor obejdu jinak a
  předám vám ho na konci — výjimku v .gitignore jsem už zapsal. Teď pouštím
  kontroly. · summary

  Ran 2 shell commands (ctrl+o to expand)

⏺ Session 05: hotovo, nic nepotvrzeno

  npm test (49 testů), npm run lint a npm run build procházejí. Necommitoval
  jsem. NOTES.md, docs/strategy.md a ai-log/04-calculator.md jsou změny z doby
  před mou prací, nesahal jsem na ně.

  Co chybí: .env.example

  Zápis zablokovalo pravidlo ve vašem nastavení oprávnění, které brání práci se
  soubory .env*. Neobcházel jsem ho. Vytvořte soubor sami, jeho obsah je:

  # Copy to .env (never commit .env) and fill in from the Supabase dashboard,
  # Project Settings -> API. Both values are public in the browser bundle; the
  # security is RLS (supabase/migrations). Never put the service_role key here.
  # Vercel needs the same two variables in Project Settings -> Environment 
  Variables.
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=

  Výjimka !.env.example v .gitignore je zapsaná. git check-ignore potvrdil, že
  .env.example ignorovaný není a .env i .env.local ano.

  Bundle a volba cesty

  ┌─────────────────────────────────────┬───────────────────────────────────┐
  │                                     │              JS gzip              │
  ├─────────────────────────────────────┼───────────────────────────────────┤
  │ Výchozí stav                        │ 72,27 kB                          │
  ├─────────────────────────────────────┼───────────────────────────────────┤
  │ S @supabase/supabase-js             │ 127,11 kB (+54,84 kB, nad limitem │
  │                                     │  30 kB)                           │
  ├─────────────────────────────────────┼───────────────────────────────────┤
  │ Výsledek (čistý fetch, formulář,    │ 73,54 kB (+1,27 kB)               │
  │ texty)                              │                                   │
  └─────────────────────────────────────┴───────────────────────────────────┘

  supabase-js jsem odinstaloval, package.json a lock-file jsou beze změny. Jde
  se čistým fetch, bez nastavení auth klienta.

  Soubory

  - supabase/migrations/20261011120000_events_and_leads.sql včetně
    zakomentovaných ručních testů (a) až (e), u (a) a (b) i s variantou curl.
  - src/variant.ts (readAdVariant) a src/variant.test.ts.
  - src/leadForm.ts (validateLeadForm, submitLead) a src/leadForm.test.ts.
  - src/lib/supabase.ts (postgrestInsert), src/lib/inserts.ts a
    src/lib/inserts.test.ts.
  - src/components/LeadForm.tsx.
  - Úpravy: src/content.ts (leadFormContent, CONSENT_TEXT_VERSION s komentářem o
    zvýšení na v2), src/index.css, src/App.tsx, .gitignore.

  Mutační kontrola

  Každou mutaci jsem po běhu vrátil a ověřil diff proti originálu.

  variant.ts
  - Zkoušel jsem vypuštění toLowerCase, vypuštění trim, přijetí c, poslední
    místo prvního utm_content a přijímání jen a. Všechny spadly.
  - Moje první mutace trim byla nepřesná, sed smazal i optional chaining.
    Opakoval jsem ji čistě a test spadl správně.

  leadForm.ts (13 mutací, všechny spadly)
  - Honeypot ignorován, i s whitespace.
  - Souhlas nevyžadován.
  - Maximální délka 255.
  - E-mail bez trim, a to i při volání insert.
  - Regex bez tečky v doméně.
  - ok:false a výjimka vedoucí na success.
  - Neplatný formulář nebo bot, který přesto volá insert.
  - Verze souhlasu v1234.
  - Přežila jedna mutace: EMAIL_MIN_LENGTH = 1. Je to ekvivalentní mutace,
    protože regex už sám vyžaduje aspoň 5 znaků (a@b.c). Test hlídá jen hodnotu
    konstanty, ne chování.

  lib/ (14 mutací, všechny spadly)
  - HTTP chyby vydávané za ok.
  - catch vracející ok.
  - Chybějící nebo změněná hlavička Prefer, Authorization a apikey.
  - Chybějící abort signal.
  - Chybějící env, které přesto volá fetch.
  - Ponechané / na konci URL.
  - Odesílání celého objektu (spread) u leadů i událostí.
  - Vynechané variant: null.
  - Lead posílaný do events.
  - Špatný seznam názvů událostí.

  Komponenta: LeadForm.tsx automatickými testy pokrytá není (bez jsdom ani RTL).
  Mutaci "stav se maže i při chybě" jsem tedy neověřil.

  Odchylky od plánu a nejistoty

  1. Čistý fetch místo supabase-js. Plánované getSupabase() je teď
     postgrestInsert() v src/lib/supabase.ts.
  2. Timeout 10 s přes AbortSignal.timeout. Nebylo v zadání. Bez něj by
     zaseknutý request nechal tlačítko navždy zakázané. Podporu v Safari jsem
     neověřoval.
  3. Hlavička Authorization: Bearer s novým klíčem sb_publishable_…. Zadání ji
     předepisuje, ale nevím jistě, zda ji gateway s klíčem tohoto formátu
     přijme. Ukáže to ruční test (a) přes curl. Pokud vrátí chybu, mám
     kontrolovat, jaký klíč jste použil.
  4. Oprávnění nových tabulek a INSERT bez RETURNING přes PostgREST. Explicitní
     REVOKE/GRANT migrace to pokrývá, ale že PostgREST s return=minimal projde
     jen s INSERT policy, ověřuje až ruční test (a) přes curl. Z testu v SQL
     editoru to neplyne.
  5. Název readAdVariant a typ AdVariant místo readVariant, kvůli oddělení od
     Hero variant. Mapování žádné.
  6. Po úspěchu formulář zmizí (return null) a návštěvník nevidí žádný text,
     dokud nebude souhrn (session 07). Odpovídá rozhodnutí č. 1, ale chci,
     abyste to věděl.
  7. Duplicitní ochrana proti dvojkliku. Kromě zakázaného tlačítka je v
     komponentě i useRef zámek. Důvod: disabled se projeví až po dalším renderu.
  8. Typ SubmitEvent<HTMLFormElement> (React 19 typy). tsc ho přijal. Pokud ho
     @types/react v budoucnu změní, spadne build.
  9. Texty "návrh, schválí autor" jsou v content.ts: sending ("Odesílám…"),
     sendError ("Odeslání se nepodařilo. Zkontrolujte připojení a zkuste to
     znovu. Váš e-mail ve formuláři zůstal.") a retry ("Zkusit znovu"). Tlačítko
     po chybě mění popisek na retry, jde tedy o jedno tlačítko, ne dvě. Do
     docs/copy-cs.md je přesunete vy.
  10. Chyby validace se zobrazují po pokusu o odeslání a zůstávají, dokud
      neodešlete znovu. Při úpravě pole zmizí až při dalším odeslání.
  11. Honeypot nemá label. Je aria-hidden, takže jsem nevymýšlel žádný text.
  12. Test lists the five event names je kopie seznamu a hlídá jen náhodné
      přepsání, ne shodu s databází. Shodu hlídá jen ruční test (d).
  13. Sdílené limity. Komentáře s pravidlem "databáze nesmí být přísnější" jsou
      v leadForm.ts u konstant a v hlavičce migrace.

  Další kroky

  1. Vytvořte .env.example (obsah výše) a vlastní .env s klíči.
  2. Pusťte migraci v SQL editoru a poté ruční testy (a) až (e).
  3. Ruční zkouška chybové větve: spusťte npm run dev bez .env a odešlete platný
     formulář. Má se zobrazit chyba, e-mail v poli má zůstat a tlačítko má
     říkat "Zkusit znovu".
  4. Až budete spokojený, commit si uděláte sám. Zapojení na Vercelu vyžaduje
     obě VITE_ proměnné v dashboardu.

✻ Worked for 4m 48s · done 4:00 PM

※ recap: Session 05 (Supabase schéma a formulář pro sběr e-mailů) je implementovaná a testy, lint i build procházejí, nic není commitnuté. Teď je na vás vytvořit `.env.example` (obsah jsem uvedl), pustit migraci v Supabase a ruční testy.