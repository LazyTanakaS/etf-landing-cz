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

❯ /export ai-log/05-supabase-form.md                                            
  ⎿  Conversation exported to:
     /Users/tanaka/Desktop/Projects/etf-landing-cz/ai-log/05-supabase-form.md

❯ clear                                                                         

⏺ Export konverzace je uložený v ai-log/05-supabase-form.md. K práci nic
  nepřibylo.

  Zbývá z mé strany nic. Na vás čeká:

  1. Vytvořit .env.example (obsah je ve zprávě výše) a vlastní .env.
  2. Pustit migraci v Supabase SQL editoru a ruční testy (a) až (e).
  3. Zkusit chybovou větev formuláře přes npm run dev bez .env.
  4. Commitnout sám. ai-log/05-supabase-form.md je nový soubor, přidejte ho do
     commitu.

✻ Cogitated for 8s · done 7:07 PM

※ recap: Session 05 pro etf-landing-cz je hotová: migrace, formulář s e-mailem a souhlasem, vložení záznamů přes čistý fetch a testy, nic není commitnuté. Další krok: vytvořit `.env.example` a `.env`, pustit migraci v Supabase a ručně vyzkoušet formulář.

❯ Session 06: měření událostí trychtýře (tracking). Nejdřív plán, kód nepište,  
  dokud ho neschválím.                                                          
  Přečtěte CLAUDE.md, docs/strategy.md §3, §5, §10, NOTES.md a současný src/    
  (zejména src/lib/inserts.ts, src/variant.ts, Hero.tsx, Calculator.tsx,        
  LeadForm.tsx).                                                                
                                                                                
  Cíl: posílat pět událostí (page_view, cta_click, calc_used, form_start,       
  form_submit) do tabulky events, aby šel změřit trychtýř od návštěvy po        
  odeslání                                                                      
  formuláře a rozdělit ho podle varianty reklamy (utm_content: a / b).          
                                                                                
  Už přijatá rozhodnutí:                                                        
  1. session_id je crypto.randomUUID() držené jen v paměti (proměnná v modulu,  
     nové při každém načtení stránky). Žádné sessionStorage, localStorage ani   
     cookies.                                                                   
  2. Každá událost se pošle nejvýše jednou za načtení stránky.                  
  3. Kdy se co posílá: page_view po připojení aplikace (mount); cta_click při   
     kliknutí na CTA v Hero; calc_used při prvním zobrazení platného výsledku   
     v kalkulačce; form_start při prvním focusu pole e-mail; form_submit až po  
     úspěšném uložení leadu (ok: true). Větev honeypotu žádnou událost          
  neposílá.                                                                     
  4. Události se posílají jen v produkčním buildu (import.meta.env.PROD).       
     V dev režimu tracker nedělá nic.                                           
  5. Varianta: přečte se jednou při startu pomocí                               
     readAdVariant(window.location.search) a posílá se s každou událostí        
     (null, pokud chybí).                                                       
  6. Měření nesmí rozbít stránku: fire and forget, žádné await v cestě UI,      
     žádné vyhazované výjimky, žádné opakování pokusů, při selhání ticho.       
  7. Dotaz na trychtýř patří do docs/funnel.sql: počet unikátních sessions      
  podle                                                                         
     varianty a názvu události, plus konverze form_submit / page_view podle     
     varianty. Pustím ho sám v dashboardu Supabase; vy na můj projekt           
     v Supabase nesahejte.                                                      
                                                                                
  Omezení:                                                                      
  - Veškerá logika v čistém modulu (src/tracker.ts) s injektovanými závislostmi 
    (funkce insertu, továrna na session id, varianta, příznak enabled), aby šel 
    testovat bez jsdom. Komponenty volají jen track('název').                   
  - React 19 StrictMode spouští efekty v dev režimu dvakrát: logika „jen        
  jednou"                                                                       
    nesmí na tom záviset (je v trackeru, ne v efektu).                          
  - Žádné nové závislosti. Žádné změny databáze.                                
  - Testy: jen jednou na událost, varianta se předává, vypnutý režim nic        
    neposílá, selhávající insert nevyhodí výjimku a neopakuje se.               
  - U nových testů proveďte mutační kontrolu a vypište, jaké mutace jste        
  zkoušel.                                                                      
  - Necommitujte. NOTES.md a ai-log/ jsou moje.                                 
                                                                                
  V plánu uveďte: seznam souborů, přesně kam půjde každé volání track(), čím si 
  nejste jistý. Na konci vypište každé místo, kde jste se odchýlil od plánu.    

⏺ Přečtu aktuální stav souborů, na které se plán opírá.

  Searched for 1 pattern, ran 1 shell command (ctrl+o to expand)

⏺ Plán Session 06: měření událostí

  Nic jsem nezapsal, jen přečetl. Čekám na schválení. Oproti aktuálnímu stavu
  jsou čtyři věci, na které se zeptám níže. První z nich mění význam jedné
  události.

  Soubory

  ┌────────────────────────────────┬────────────────────────────────────────┐
  │             Soubor             │                 Změna                  │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │                                │ Nový, čistý modul: createTracker(deps) │
  │ src/tracker.ts                 │  vrací { track(name) }. Neimportuje    │
  │                                │ window, crypto ani import.meta.env.    │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ src/tracker.test.ts            │ Nový, testy bez jsdom.                 │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │                                │ Nový, tenké zapojení: jediné místo,    │
  │ src/track.ts                   │ které sahá na window.location.search,  │
  │                                │ crypto.randomUUID a                    │
  │                                │ import.meta.env.PROD. Exportuje track. │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ docs/funnel.sql                │ Nový: dotaz na trychtýř, pustíte si ho │
  │                                │  sám.                                  │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ src/App.tsx,                   │                                        │
  │ src/components/Hero.tsx,       │ Volání track() (viz tabulka).          │
  │ Calculator.tsx, LeadForm.tsx   │                                        │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ src/lib/inserts.ts             │ Jen oprava komentáře "No tracking      │
  │                                │ calls yet".                            │
  └────────────────────────────────┴────────────────────────────────────────┘

  Dva soubory s podobným jménem jsou záměrné. tracker.ts je továrna, kterou jde
  importovat v Node. track.ts je instance zapojená na prohlížeč. Kdyby se window
  četl v tracker.ts při importu, testy by spadly.

  Návrh tracker.ts

  - Závislosti: insert(event), newSessionId(), variant ('a' | 'b' | null) a
    enabled.
  - Jednou na událost: Set už poslaných názvů. Název se do něj zapíše synchronně
    před voláním insert, ne až po odpovědi. Proto selhání neumožní druhý pokus,
    dvojklik nic nezdvojí a StrictMode nehraje roli, protože zámek je v
    trackeru, ne v efektu.
  - Session id: vytvoří se líně při první odeslané události, jednou na tracker.
    Když je tracker vypnutý, nevytvoří se vůbec.
  - Fire and forget: track vrací void. insert volám v try/catch (pro synchronní
    výjimku) a na výsledek věším .catch(() => {}) (pro odmítnutý promise).
    Neřeším ok: false, žádné opakování.
  - Selhání továrny na id (např. crypto.randomUUID chybí): tracker se tiše
    vypne, žádný pokus o opakování.
  - Řádek události: přesně { session_id, name, variant }, shodně s EventRow.

  Přesná místa volání track()

  ┌─────────────┬─────────────────────────────┬─────────────────────────────┐
  │   Událost   │            Místo            │          Poznámka           │
  ├─────────────┼─────────────────────────────┼─────────────────────────────┤
  │             │ App.tsx: useEffect(() => {  │ Dvojí spuštění v dev a      │
  │ page_view   │ track('page_view') }, [])   │ StrictMode nevadí, zámek je │
  │             │                             │  v trackeru.                │
  ├─────────────┼─────────────────────────────┼─────────────────────────────┤
  │             │ Hero.tsx: onClick na <a     │ Neblokuje navigaci, odkaz   │
  │ cta_click   │ className="button"          │ zůstává obyčejný. Kliknutí  │
  │             │ href="#kalkulacka">         │ z klávesnice (Enter) spustí │
  │             │                             │  také click.                │
  ├─────────────┼─────────────────────────────┼─────────────────────────────┤
  │ calc_used   │ Calculator.tsx: viz otázka  │                             │
  │             │ 1                           │                             │
  ├─────────────┼─────────────────────────────┼─────────────────────────────┤
  │ form_start  │ LeadForm.tsx: onFocus na    │ Pole souhlasu se nepočítá.  │
  │             │ poli e-mail                 │                             │
  ├─────────────┼─────────────────────────────┼─────────────────────────────┤
  │ form_submit │ LeadForm.tsx: viz otázka 2  │ Honeypot nic neposílá.      │
  └─────────────┴─────────────────────────────┴─────────────────────────────┘

  Testy (tracker.test.ts)

  1. Každý z pěti názvů se pošle právě jednou, i když zavolám track dvakrát.
  2. Řádek obsahuje přesně session_id, name, variant.
  3. Varianta 'a', 'b' i null se předá u všech událostí.
  4. Jedna session: newSessionId se zavolá jednou na tracker a všechny události
     mají stejné id. Druhý tracker (simulace znovunačtení) dostane jiné id.
  5. enabled: false: insert ani newSessionId se nezavolají a nic nevyhodí.
  6. insert vrátí { ok: false }, vrátí odmítnutý promise nebo vyhodí synchronně.
     track nevyhodí, a po opakovaném track téhož názvu se insert nevolá znovu.
  7. track se vrátí okamžitě, i když insert nikdy neskončí, a další název se
     přesto pošle.
  8. Továrna na id vyhodí: track nevyhodí, nic se nepošle, nezkouší se znovu.

  Mutace, které provedu a vypíšu:
  - odstranění zámku "jednou"
  - zámek zapsaný až po ok: true
  - variant natvrdo null
  - ignorování enabled
  - nové id pro každou událost
  - odstranění try/catch (sync výjimka) a .catch (async odmítnutí)
  - opakování po selhání
  - await insert v cestě track
  - pád při chybě továrny

  Co testy nepokryjí: volání v komponentách a track.ts (bez jsdom). Ověříte je
  ručně: npm run build && npm run preview (produkční build, tedy PROD), s .env,
  a pak v dashboardu select name, variant, count(*) from events group by 1,2.
  Testovací řádky potom smažete vy.

  docs/funnel.sql

  1. Unikátní sessions podle varianty a názvu události: count(distinct 
     session_id), group by variant, name, NULL zobrazená jako bez varianty,
     pořadí podle trychtýře.
  2. Konverze form_submit / page_view podle varianty, přes count(distinct 
     session_id) filter (where name = ...) a nullif proti dělení nulou.
  3. Komentáře v souboru: session je načtení stránky, ne člověk (znovunačtení =
     nová session). Všechny události jedné session mají stejnou variantu, takže
     seskupení podle varianty je správné.

  Čím si nejsem jistý a co potřebuji rozhodnout

  1. calc_used se podle zadání spustí hned po načtení. Kalkulačka má výchozí
  hodnoty (5 000 Kč, 10 let) a ukáže platný výsledek už při prvním vykreslení.
  "První zobrazení platného výsledku" by tedy znamenalo calc_used u každého
  návštěvníka, ve stejném okamžiku jako page_view, a trychtýř by ztratil smysl.
  Navrhuji: calc_used se pošle při prvním platném výsledku po první změně vstupu
  (fond, vklad nebo doba). Realizace: stav interacted nastavený v onChange
  třech polí a useEffect, který při interacted && result !== null zavolá track.
  Je to v efektu, ale tracker ho zajistí proti opakování. Souhlasíte, nebo to
  chcete doslova?

  2. form_submit a honeypot. submitLead vrací success i u bota, takže komponenta
  nepozná, zda se opravdu ukládalo. Navrhuji nic neměnit v leadForm.ts:
  komponenta předá submitLead obalený insertLead, který po ok: true zavolá
  track('form_submit'). U bota se insert nevolá, takže událost nevznikne.
  Souhlasíte, nebo raději změnit návratový typ submitLead?

  3. page_view v App.tsx jako efekt, jak jste určil. Alternativa je jeden řádek
  v main.tsx před render (mimo React, žádný efekt). Nechám App.tsx, pokud
  neřeknete jinak.

  4. Zastaralé dokumenty. Rozhodnutí o paměti místo sessionStorage platí a
  docs/strategy.md §5 ("žije v sessionStorage"), §10 (riziko sessionStorage) a
  docs/copy-cs.md §8 (řádek "souhlas a sessionStorage") jsou teď zastaralé.
  Nechávám je na vás.

  Další nejistoty:
  - Právo. Nevím, zda odesílání náhodného id na server bez souhlasu spadá pod
    zákon 127/2005, i když se nic neukládá v prohlížeči. Navrhuji přidat do §10
    jako [neověřeno] pro provozovatele. Text poučení také o měření nic neříká.
    Nerozhoduji o tom.
  - crypto.randomUUID existuje jen v zabezpečeném kontextu (HTTPS, localhost) a
    v novějších prohlížečích (Safari od 15.4). Jinde se měření tiše vypne. Podíl
    takových návštěv neznám.
  - Znečištění dat. PROD je pravdivé i pro Vercel preview a npm run preview, a
    stejně tak i vaše vlastní návštěvy. Bez změny databáze (zakázané) je od
    ostatních neodliším. Úklid jen ručně v dashboardu.
  - Boti a náhledy odkazů zvyšují page_view a tím snižují konverzi. Anon INSERT
    je otevřený botům (už je v §10).
  - Adblock může požadavky na *.supabase.co blokovat. Podíl neznám.
  - form_start se spustí jen focusem pole e-mail. Autofill, který pole vyplní
    bez focusu, může vytvořit form_submit bez form_start. Čekám to jen
    výjimečně.

✻ Churned for 1m 31s · done 7:32 PM

❯ Plán schválen s těmito odpověďmi:                                             
  1. calc_used: souhlas s vaším návrhem (interacted + efekt; změna fondu,       
  vkladu                                                                        
     i doby se počítá).                                                         
  2. form_submit: souhlas, obalte insertLead, submitLead beze změny. Obal vrací 
     výsledek insertu nezměněný a na track nečeká.                              
  3. page_view: nechte v App.tsx.                                               
  4. Zastaralé dokumenty (strategy §5, §10, copy-cs §8) upravím sám. Do §10     
  přidám                                                                        
     poznámku [neověřeno] o zákonu 127/2005 pro provozovatele.                  
                                                                                
  Doplnění:                                                                     
  - docs/funnel.sql: na začátek přidejte parametr data spuštění (since,         
    timestamptz) a všechny dotazy filtrujte přes created_at >= since, ať se do  
    čísel nedostanou moje testy a návštěvy preview. Do komentáře napište, že    
  před                                                                          
    spuštěním reklamy vyčistím tabulku events ručně.                            
  - Ostatní nejistoty (boti, adblock, autofill, starší Safari) jen vypište jako 
    komentář nebo seznam omezení v odpovědi, kód kvůli nim neměňte.             
  - Mutace a pořadí práce podle vašeho plánu. Necommitujte.                     

⏺ Plán je schválený, jdu podle pořadí: tracker.ts + testy + mutace, pak
  track.ts, volání v komponentách, funnel.sql, nakonec kontroly.

⏺ Write(src/tracker.ts)  ⎿  Wrote 56 lines to src/tracker.ts
       1 import type { EventName, EventRow } from './lib/inserts'
       2 import type { InsertResult } from './lib/supabase'
       3 import type { AdVariant } from './variant'
       5 // Pure module: no window, no crypto, no import.meta.env. Everyt
         hing it needs is
       6 // injected, so it runs in tests without a browser. The wiring i
         s in track.ts.
       8   insert: (event: EventRow) => Promise<InsertResult>
       9   newSessionId: () => string
      10   variant: AdVariant | null
     … +55 lines (ctrl+o to expand)

⏺ Write(src/tracker.test.ts)
  ⎿  Wrote 141 lines to src/tracker.test.ts
       1 import { describe, expect, it, vi } from 'vitest'
       2 import { EVENT_NAMES } from './lib/inserts'
       3 import { createTracker, type TrackerDeps } from './tracker'
       4 
       5 function setup(overrides: Partial<TrackerDeps> = {}) {
       6   const insert = vi.fn().mockResolvedValue({ ok: true })
       7   let counter = 0
       8   const newSessionId = vi.fn(() => `session-${++counter}`)
       9   const { track } = createTracker({
      10     insert,
     … +147 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ M7 (odstranění .catch) přežila. Zjišťuji proč, než tomu uvěřím.

  Ran 1 shell command (ctrl+o to expand)

⏺ Vitest unhandled rejection v tomhle nastavení nezachytil. Test proto zpřesním:
  sám si zaregistruje unhandledRejection a ověří, že nic neuniklo.

⏺ Update(src/tracker.test.ts)
  ⎿  Added 13 lines, removed 4 lines
       97    it('a rejected insert does not throw or leak an unhandled re
           jection', async () => {
       98      const { insert, track } = setup()
       99      insert.mockRejectedValue(new Error('network down'))
      100 -    expect(() => track('page_view')).not.toThrow()            
      101 -    await flush() // an unhandled rejection would fail the tes
          -t run here                                                    
      102 -    track('page_view')                                        
      103 -    await flush()                                             
      100 +    // The runner does not fail on this by itself, so listen e
          +xplicitly.                                                    
      101 +    const unhandled: unknown[] = []                           
      102 +    const listener = (reason: unknown) => unhandled.push(reaso
          +n)                                                            
      103 +    process.on('unhandledRejection', listener)                
      104 +    try {                                                     
      105 +      expect(() => track('page_view')).not.toThrow()          
      106 +      await flush()                                           
      107 +      track('page_view')                                      
      108 +      await flush()                                           
      109 +    } finally {                                               
      110 +      process.off('unhandledRejection', listener)             
      111 +    }                                                         
      112 +    expect(unhandled).toEqual([])                             
      113      expect(insert).toHaveBeenCalledTimes(1)
      114    })
      115  

  Ran 1 shell command (ctrl+o to expand)
  ⎿  Interrupted · What should Claude do instead?

✻ Cogitated for 1m 2s · done 7:35 PM

❯ continue                                                                      

  Ran 1 shell command (ctrl+o to expand)

⏺ Vidím dvě věci: tsc nerozpoznává process kvůli chybějícím typům v
  tsconfig.app.json a mutace M7 stále přežívá, protože listener nic nezachytil.
  Teď zjistím, jestli se unhandled rejection vůbec ve vitestu projeví. · summary

  Ran 2 shell commands (ctrl+o to expand)

⏺ Zjistil jsem, že vi.fn() sám zachytává odmítnutý promise, takže test s ním
  nikdy nic nezachytí. Proto nahradím spy obyčejnou funkcí a process doplním
  přes /// <reference types="node" />. · summary

  Ran 1 shell command (ctrl+o to expand)

⏺ Mutace M7 teď padá správně a ostatní držely. Pokračuji track.ts a místy
  volání.

⏺ Write(src/track.ts)
  ⎿  Wrote 19 lines to src/track.ts
       1 import { insertEvent } from './lib/inserts'
       2 import { createTracker } from './tracker'
       3 import { readAdVariant } from './variant'
       5 // The one tracker of this page load, and the only file that tou
         ches window,
       6 // crypto and the build mode. Components import `track` and call
       7 // track('page_view') and so on; all rules are in tracker.ts.
       9 // - The session id lives only in this module's memory: a new on
         e on every page
      10 //   load, no sessionStorage, localStorage or cookies.
     … +12 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Teď úpravy komponent.

⏺ Update(src/App.tsx)
  ⎿  Added 1 line
      1 +import { useEffect } from 'react'                               
      2  import { Calculator } from './components/Calculator'
      3  import { EtfTable } from './components/EtfTable'
      4  import { Footer } from './components/Footer'

⏺ Update(src/App.tsx)
  ⎿  Added 7 lines
       5  import { Hero } from './components/Hero'
       6  import { LeadForm } from './components/LeadForm'
       7  import { etfs, sortByTer } from './data/etfs'
       8 +import { track } from './track'                                
       9  
      10  function App() {
      11    // One sorted list, so the table and the calculator offer the
           same order.
      12    const sorted = sortByTer(etfs)
      13  
      14 +  // StrictMode runs this effect twice in dev. That is harmless
         +: the tracker                                                  
      15 +  // sends each event at most once per page load.              
      16 +  useEffect(() => {                                            
      17 +    track('page_view')                                         
      18 +  }, [])                                                       
      19 +                                                               
      20    return (
      21      <>
      22        <Hero variant="A" />

⏺ Update(src/components/Hero.tsx)
  ⎿  Added 1 line
      1  import { heroContent, type HeroVariant } from '../content'
      2 +import { track } from '../track'                                
      3  
      4  interface HeroProps {
      5    variant: HeroVariant

⏺ Update(src/components/Hero.tsx)
  ⎿  Added 5 lines, removed 1 line
      12      <header className="hero">
      13        <h1>{content.heading}</h1>
      14        <p className="hero-lead">{content.subheading}</p>
      15 -      <a className="button" href="#kalkulacka">                
      15 +      <a                                                       
      16 +        className="button"                                     
      17 +        href="#kalkulacka"                                     
      18 +        onClick={() => track('cta_click')}                     
      19 +      >                                                        
      20          {content.cta}
      21        </a>
      22        <p className="small">

  Ran 1 shell command (ctrl+o to expand)

⏺ Teď docs/funnel.sql. Aby datum since bylo jen na jednom místě, dávám trychtýř
  do jednoho dotazu: řádek na variantu, sloupec na událost, konverze v posledním
  sloupci.

⏺ Write(docs/funnel.sql)
  ⎿  Wrote 66 lines to docs/funnel.sql
       1 -- Funnel from the events table, split by ad variant (utm_conten
       2 -- Run it yourself in the Supabase dashboard (SQL Editor). The e
       3 -- postgres and bypasses RLS, so it can read what the browser (a
         non) cannot.
       5 -- HOW TO USE
         ber is counted
         visits from
       8 --      before the launch stay out of the result.
         the dashboard
         es). `since` is
     … +91 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Je tu lokální Postgres, takže SQL můžu ověřit na vlastní dočasné instanci v
  tmp (do vašeho Supabase nesahám). Vytvořím tabulku z migrace, vložím testovací
  data a pustím dotaz.

  Ran 1 shell command (ctrl+o to expand)

⏺ Výsledek souhlasí s ručně spočítanými hodnotami – duplicitní řádek se počítá
  jednou a testovací řádky před since jsou vyřazené. Nyní vyzkouším mutace
  dotazu a poté smažu lokální databázi. · summary

  Ran 1 shell command (ctrl+o to expand)

⏺ Dotaz drží, všechny tři mutace změnily čísla. Lokální databáze je zastavená a
  smazaná. Poslední kontroly: testy, lint, build.
  Ran 1 shell command (ctrl+o to expand)

⏺ Session 06: měření událostí, hotovo, nic nepotvrzeno

  npm test (62 testů), npm run lint a npm run build procházejí. JS bundle
  vzrostl z 73,54 na 74,14 kB gzip. Žádné nové závislosti, žádná změna databáze,
  v kódu žádné sessionStorage, localStorage ani cookies. Necommitoval jsem.

  Soubory

  ┌─────────────────────┬────────────────────────────────────────────────────┐
  │       Soubor        │                       Obsah                        │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │                     │ createTracker(deps): zámek "jednou" v Set, zapsaný │
  │ src/tracker.ts      │  před odesláním. Session id se vytvoří líně při    │
  │                     │ první události. Chyba továrny na id měření vypne.  │
  │                     │ Vše je v try/catch, nic se nečeká a neopakuje.     │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │ src/tracker.test.ts │ 13 testů.                                          │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │ src/track.ts        │ Instance: window.location.search,                  │
  │                     │ crypto.randomUUID, import.meta.env.PROD.           │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │ docs/funnel.sql     │ Trychtýř s parametrem since.                       │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │ App.tsx             │ page_view v useEffect.                             │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │ Hero.tsx            │ onClick na CTA odkazu dává cta_click.              │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │                     │ Stav interacted (nastavuje změna fondu, vkladu i   │
  │ Calculator.tsx      │ doby) a efekt interacted && hasResult dává         │
  │                     │ calc_used.                                         │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │                     │ onFocus na poli e-mail dává form_start. Obal       │
  │ LeadForm.tsx        │ insertLeadAndTrack volá track('form_submit') po    │
  │                     │ ok: true, vrací výsledek nezměněný a nečeká na     │
  │                     │ track. submitLead zůstal beze změny.               │
  ├─────────────────────┼────────────────────────────────────────────────────┤
  │ lib/inserts.ts      │ Jen opravený komentář.                             │
  └─────────────────────┴────────────────────────────────────────────────────┘

  Mutační kontrola

  tracker.ts (12 mutací)
  - Odstraněný zámek "jednou".
  - Zámek zapsaný až po ok: true.
  - variant natvrdo null.
  - Ignorované enabled.
  - Nové session id pro každou událost.
  - Synchronní výjimka z insert unikne ven.
  - Chybějící .catch na promise.
  - Opakování po selhání.
  - await insert (track se stane asynchronním).
  - Chyba továrny na id unikne ven.
  - Továrna se po chybě zkouší znovu.
  - Session id vytvořené už při vzniku trackeru.

  Všech 12 nakonec spadlo, ale jedna mutace (chybějící .catch) napoprvé přežila,
  tedy můj test odmítnutého promise byl slepý. Příčina: vi.fn() si sám připojí
  handler k vrácenému promise, takže odmítnutí nikdy není "unhandled". Test teď
  používá obyčejnou funkci a sám poslouchá unhandledRejection. Mutaci jsem
  pustil znovu a spadla. M8 (opakování) jsem po úpravě testu pustil také znovu.

  funnel.sql: ověřil jsem ho na dočasné lokální instanci PostgreSQL 17 (ne na
  vašem Supabase) s vymyšlenými daty. Čísla sedla ručně spočítaným hodnotám.
  Mutace padaly: odstraněný filtr created_at, count() místo count(distinct),
  posunuté since. Instanci jsem smazal.

  Komponenty (volání track()) jsem mutačně netestoval, bez jsdom to nejde.

  Odchylky od plánu

  1. funnel.sql je jeden dotaz, ne dva. Počty sessions podle varianty a události
     jsou pivotem (řádek na variantu, sloupec na událost) a konverze je
     poslední sloupec. Důvod: since je jen na jednom místě. Řádek all je součet
     všech variant a none jsou návštěvy bez platného utm_content.
  2. since obsahuje placeholder 2026-10-16 00:00:00+02 (termín zadání), protože
     datum spuštění reklam neznám. Přepište ho.
  3. tracker.test.ts má /// <reference types="node" /> a v jednom testu
     process.on, protože tsconfig.app.json načítá jen typy vite/client.
  4. insert v TrackerDeps je typovaný jako Promise<InsertResult>, ne obecně.
  5. Chybějící crypto.randomUUID vypne měření pro celé načtení stránky bez
     pokusu o opakování. V plánu jsem to popsal, v testu 8 je to pokryté.

  Co jsem neověřil

  Chování volání v komponentách v prohlížeči. Zkontrolujte ručně:
  1. Vytvořte .env, spusťte npm run build && npm run preview (PROD je pravda jen
     v produkčním buildu, npm run dev neposílá nic).
  2. V záložce Network by mělo být právě jedno POST /rest/v1/events na každou
     událost: page_view při načtení, cta_click po kliknutí na CTA, calc_used až
     po první změně polí, form_start při prvním focusu e-mailu a form_submit po
     úspěšném odeslání.
  3. Honeypot nechte vyplněný (např. v DevTools) a ověřte, že form_submit
     nevznikne.
  4. Poté v dashboardu select name, variant, count(*) from events group by 1,2 a
     testovací řádky smažte.

  Omezení (v kódu neřešeno)

  - Boti a náhledy odkazů zvyšují page_view a snižují konverzi, anon INSERT je
    otevřený skriptům.
  - Adblock může blokovat *.supabase.co, takže chybějící návštěvy nejsou
    náhodné.
  - Autofill bez focusu může dát form_submit bez form_start.
  - Safari starší než 15.4 a nezabezpečený kontext: crypto.randomUUID chybí a
    návštěva se neměří vůbec.
  - Selhané odeslání se neopakuje, všechna čísla jsou spodní odhad.
  - Session je načtení stránky, ne člověk, znovunačtení = nová session.
  - Konverze lehce nadhodnocená, pokud page_view selže a form_submit projde.
  - Testovací návštěvy a Vercel preview nejdou od ostatních odlišit bez změny
    databáze, proto since v funnel.sql a ruční vyčištění events před spuštěním
    reklam.

  Zastaralé dokumenty (strategy §5 a §10, copy-cs §8) a poznámku o zákonu
  127/2005 upravíte vy, jak jste psal. Do NOTES.md se vejde i zjištění o vi.fn()
  a unhandled rejection.

✻ Churned for 2m 18s · done 7:39 PM

※ recap: Session 06 přidala měření pěti událostí trychtýře do tabulky events, kód i testy jsou hotové a necommitované. Další krok: spustit `npm run build && npm run preview` s `.env` a v záložce Network ověřit, že každá událost odejde právě jednou.