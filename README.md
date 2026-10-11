# Landing page: americká ETF pro české drobné investory

Konverzní stránka (lead magnet) pro návštěvníky z mobilní reklamy. Porovnává pět amerických ETF (IVV, VOO, VTI, SCHD, QQQ), ukazuje poplatek fondu (TER), shrnuje, co o dostupnosti uvádějí brokeři na svých stránkách, a nabízí kalkulačku poplatku. Za e-mail dá návštěvník souhrn na obrazovce. Zadání: `docs/zadani.md` (Zadání B). Texty stránky jsou česky, kód, komentáře a commity anglicky.

Stránka je informativní. Není investičním poradenstvím a neslibuje žádný výnos.

## 1. Spuštění

Nasazení (Vercel): https://etf-landing-cz.vercel.app

```
npm install
npm run dev      # vývoj, měření událostí je vypnuté
npm test         # vitest
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

Proměnné prostředí (Vite je zapéká do buildu, po změně ve Vercelu je nutný nový build):

- `VITE_SUPABASE_URL`: adresa projektu Supabase,
- `VITE_SUPABASE_ANON_KEY`: veřejný (publishable) klíč. Je v prohlížeči viditelný, bezpečnost drží RLS. Service klíč se do klienta ani repozitáře nedává.

Bez těchto proměnných se nic neodešle a formulář ukáže chybový stav.

## 2. Lead magnet a reklamy

Lead magnet je osobní souhrn na obrazovce za e-mail (`docs/strategy.md`, oddíl 3): částka, doba, pět fondů, rozpis po letech a otázky pro brokera, s tlačítkem "Zkopírovat souhrn jako text". Souhrn se vytvoří v prohlížeči a e-mailem se neposílá.

Dvě verze reklamy (`docs/copy-cs.md`, oddíl 1):

|                            | Reklama A (poplatky)                                                                                        | Reklama B (dostupnost)                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Nadpis (do 40 znaků)       | Kolik činí poplatek fondu za 10 let? (36)                                                                   | Dá se americké ETF koupit u brokera? (36)                                                                     |
| Hlavní text (do 125 znaků) | Pět amerických ETF, poplatek fondu (TER) u každého a výpočet na 10 let. Každé číslo má zdroj a datum. (101) | Záleží na brokerovi. Ukážeme, co brokeři uvádějí na svých stránkách, a na co se zeptat u svého brokera. (103) |
| CTA                        | Spočítat poplatek (tlačítko platformy: "Zjistit více")                                                      | Zobrazit tabulku (tlačítko platformy: "Zjistit více")                                                         |
| Řádek s upozorněním (81)   | Investice nesou riziko ztráty. Informativní obsah, nejde o investiční doporučení.                           | stejný                                                                                                        |

Značené adresy pro reklamy:

- A: `https://etf-landing-cz.vercel.app/?utm_source=meta&utm_medium=paid_social&utm_content=a`
- B: `https://etf-landing-cz.vercel.app/?utm_source=meta&utm_medium=paid_social&utm_content=b`

Kód čte jen `utm_content` (a/b). `utm_source` a `utm_medium` jsou jen pro reklamní systém.

## 3. Pořadí sekcí a proč

Jedno pořadí pro obě varianty reklamy, liší se jen hero a kotva tlačítka (`docs/copy-cs.md`, oddíl 9):

1. Hero: opakuje slib reklamy a do pár sekund říká, co návštěvník dostane.
2. Tabulka pěti ETF: hodnota je vidět celá před žádostí o kontakt, bez brány.
3. Co uvádějí brokeři: odpovídá na otázku z reklamy B. Je krátká, takže ji návštěvník z reklamy A rychle přeskočí.
4. Kalkulačka: dává osobní výsledek a vytváří moment, kdy dává smysl žádat o e-mail.
5. Formulář, po odeslání souhrn: e-mail se žádá až po tabulce a kalkulačce (`docs/strategy.md`, oddíl 3).
6. Poučení o rizicích: dosažitelné odkazem z hero, formuláře i reklamy, nevytahuje se před hodnotu.
7. Zdroje a patička: všechna čísla s datem načtení na jednom místě.

Jedno pořadí proto, aby A/B test měřil slib v reklamě a hero, ne dvě různé stránky.

## 4. Data a poctivost

- Čísla fondů jsou ze stránek emitentů, načteno 9. 10. 2026; názvy fondů 11. 10. 2026 (`data/etf-sources.md`). U IVV a SCHD stránka datum TER neuvádí, tabulka to říká.
- Tvrzení brokerů jsou parafráze jejich vlastních stránek, načteno 9. 10. 2026 (`data/availability.md`). Stránka je uvádí vždy jako "broker uvádí", nikdy jako vlastní fakt.
- Nadpis říká "americká ETF", ne "NYSE": QQQ je podle stránky Invesco kótován na Nasdaq. Odchylka od zadání je záměrná.

Co je `[neověřeno]`:

- VTI: stránka fondu ukazuje TER 0,03 %, sekundární zdroj 0,04 %, rozpor není vyřešen a prospekt nebyl otevřen. Stránka to u VTI uvádí.
- Stanovisko ČNB k americkým ETF.
- Degiro (česká stránka americká ETF nezmiňuje, anglická ano), XTB a Portu: u XTB a Portu jsme na jejich stránkách nenašli tvrzení k americkým ETF, stránka to tak říká.
- Stav u konkrétního tickeru není ověřen u žádného brokera.
- Burza u VOO a VTI: stránka emitenta ji neuvádí, tabulka píše "neuvedeno".
- Doklad pro Fio je článek z 19. 1. 2022, stav se mohl změnit; stránka to uvádí.

Záměrně se neříká: nic o výnosech a dividendách, žádné "nejlepší" ani "okrádají", nic o ČNB, nic o tom, že ostatní brokeři americká ETF nenabízejí (tvrzení Fia o třetích stranách bez primárního zdroje). Rozdíl poplatku 4 537,50 Kč (5 000 Kč měsíčně, 10 let, vloženo 600 000 Kč, TER 0,18 % vs. 0,03 %) se počítá za běhu stejnou funkcí jako kalkulačka, není to pevný text.

## 5. Očekávaná konverze

Pro plánování beru střední odhad 4,5 % ze zobrazení stránky, to je asi 3,6 % z kliku na reklamu.

Je to odhad z mých předpokladů, ne měření a ne benchmark. Žádný zdroj jsem nepoužil. Předpoklady jsou vstupy k nahrazení naměřenými hodnotami, jakmile poběží reklama.

Cesta: klik na reklamu, zobrazení stránky (`page_view`), použití kalkulačky (`calc_used`), začátek formuláře (`form_start`), odeslání (`form_submit`). Míra pokračování mezi kroky:

| Krok                              | Nízký | Střední | Vysoký |
| --------------------------------- | ----- | ------- | ------ |
| S1: klik, zobrazení stránky       | 0,70  | 0,80    | 0,90   |
| S2: zobrazení, použití kalkulačky | 0,20  | 0,30    | 0,35   |
| S3: kalkulačka, začátek formuláře | 0,25  | 0,30    | 0,30   |
| S4: začátek formuláře, odeslání   | 0,40  | 0,50    | 0,55   |

Zobrazení stránky, odeslání = S2 _ S3 _ S4:

- nízký: 0,20 _ 0,25 _ 0,40 = 2,0 %,
- střední: 0,30 _ 0,30 _ 0,50 = 4,5 %,
- vysoký: 0,35 _ 0,30 _ 0,55 = 5,8 % (přesně 5,775 %).

Klik, odeslání = S1 _ (výše): 0,70 _ 2,0 % = 1,4 %; 0,80 _ 4,5 % = 3,6 %; 0,90 _ 5,775 % = 5,2 %.

Rozumné rozmezí pro plánování je tedy asi 2 až 6 % ze zobrazení stránky, střed 4,5 %. Rozmezí je široké, protože předpoklady nemají oporu v datech. Navíc se do jmenovatele započítají boti a náhledy odkazů (`docs/funnel.sql`), takže naměřená hodnota bude spíš nižší.

## 6. Tři A/B hypotézy

Řazeno podle očekávaného dopadu. Dopad je můj úsudek, neměřil jsem ho.

1. Hero A vs. B pod odpovídající reklamou. Mění se H1, podnadpis, CTA a kotva (A: kalkulačka, B: tabulka). Měří `cta_click / page_view` a `form_submit / page_view` po variantách. Největší dopad proto, že hero je první věc, kterou návštěvník vidí, a rozhoduje o všech dalších krocích. Omezení: variantu určuje reklama (`utm_content`), ne náhodné přiřazení na stránce, takže se mísí vliv reklamy a hero i složení publika.
2. Moment zobrazení formuláře. Dnes je formulář pod kalkulačkou. Varianta: formulář dřív (pod tabulkou) nebo až po použití kalkulačky. Měří `form_start / calc_used` a `form_submit / page_view`. Druhý největší dopad, protože formulář je krok S3 a S4 z odhadu výše a každý z nich je podle předpokladu ztrátový. Pozor: `calc_used` ani `form_start` nejsou striktně posloupnost, formulář je vidět i bez použití kalkulačky.
3. Souhrn podle zvoleného brokera (V2). Dnes by byl z poloviny prázdný, protože doložené jsou jen IBKR, Degiro a Fio. Měří jen `form_submit / form_start`, tedy slib ve formuláři; hodnotu samotného souhrnu pěti událostmi změřit nejde. Nejnižší dopad proto, že závisí na datech, která zatím nejsou, a na kroku až po odeslání.

## 7. Měření

Pět událostí, každá nejvýše jednou za načtení stránky: `page_view`, `cta_click` (tlačítko v hero), `calc_used` (první platný výsledek po změně fondu, vkladu nebo let; výchozí hodnoty se nepočítají), `form_start` (první focus pole e-mailu), `form_submit` (jen po úspěšném zápisu leadu).

- Varianta: `utm_content` (a/b, bez ohledu na velikost písmen a mezery) se zapíše do `events.variant`. Jiná nebo žádná hodnota dává NULL a hero A.
- Session id: náhodné UUID jen v paměti stránky, bez cookie, `sessionStorage` a `localStorage`. Kompromis: události zůstanou anonymní, ale obnovení stránky je nová session a konverzi nelze přiřadit osobě.
- Schéma (`supabase/migrations/`): `events` (id, session_id, name, variant, created_at) s CHECK na název události a variantu; `leads` (id, email, consent_at, consent_text_version, created_at). Tabulky nejsou propojené, `leads` nemá session id.
- RLS: role `anon` smí jen INSERT na vyjmenované sloupce, žádný SELECT, UPDATE ani DELETE. Insert se posílá bez čtení zpět. Data se čtou v dashboardu Supabase.
- Konverze po variantách: `docs/funnel.sql`, spouští se v SQL Editoru. Nejdřív nastavit `since` na začátek reklamy a předtím ručně smazat zkušební řádky. Jednotkou je načtení stránky, ne osoba. Řádek `none` jsou přímé návštěvy bez `utm_content`, `all` je součet. `conversion_pct = form_submit / page_view`.

Známá omezení:

- Přímé návštěvy (bez `utm_content`) mají `variant` NULL, ve `docs/funnel.sql` jsou řádek `none`.
- Nová session po obnovení stránky, takže se jedna osoba může počítat víckrát.
- Služba Supabase může nastavit technický cookie proti botům (Cloudflare `__cf_bm`). Kód stránky sám nic neukládá. Zda náhodné id bez souhlasu spadá pod zákon 127/2005, je `[neověřeno]` a posoudí provozovatel.
- Boti a náhledy odkazů zvyšují jmenovatele, blokátory reklam mohou požadavky na `*.supabase.co` blokovat, neúspěšné odeslání se neopakuje, takže čísla jsou spodní odhad. Další omezení jsou v hlavičce `docs/funnel.sql`.
- `docs/funnel.sql` jsem ověřil na dočasné lokální PostgreSQL s vymyšlenými daty, ne na živém projektu Supabase.

## 8. Jak byla použita AI a kde se mýlila

Role: plánování a revize plánů probíhaly v samostatném chatu s Claude, implementace v Claude Code (model Sonnet 5.5) po schváleném plánu. Exporty sessions jsou v `ai-log/`, chat v exportech není. Prompty byly anglicky, odpovědi většinou česky, v několika sessions částečně rusky (viz NOTES.md). Podrobný záznam je v `NOTES.md`. Commity a push jsem dělal sám.

Tento README sestavil agent z dokumentů v repu a já jsem ho zkontroloval a upravil.

Odchylka od plánu: `docs/strategy.md`, oddíl 9, předpokládal, že vzorec kalkulačky a jeho test napíšu já. Podle `NOTES.md` (Session 04) je napsala AI a já jsem je přepsal ručně a ověřil testy s hodnotami, které jsem spočítal sám. Je to vědomá odchylka od oddílu 9.

Doložené chyby:

- `calc_used` jsem zadal jako "po prvním platném výsledku". Kalkulačka ale ukazuje platný výsledek hned po načtení, takže by se spustila každému návštěvníkovi. Zachytil to agent při plánování, opraveno na první změnu vstupu.
- Test chybějícího `.catch` byl zpočátku slepý: `vi.fn()` si na vrácený promise přidá vlastní handler, takže nezachycená rejection nevznikla. Test teď používá obyčejnou funkci a poslouchá `unhandledRejection`.
- Design měl chybu: pravidlo `.on-dark a` přebíjelo `.btn` a tlačítko v hero mělo špatný kontrast. Opraveno přes `.on-dark a:not(.btn)`, naměřeno 5,58:1.
- Konvence vkladu ve vzorci: agent popsal n(n+1)/2 jako "vklad na konci měsíce", ale odpovídá začátku měsíce. Zachyceno při kontrole.
- TER u QQQ: agent tvrdil 0,20 %, stránka Invesco ukazuje 0,18 %. U dat bez URL a data jsem odpověď odmítl a vyžádal zdroje.
- Pevné číslo v hero: 4 537,50 Kč agent napsal jako pevný text, požadoval jsem výpočet funkcí kalkulačky z `etfs.ts`.
- Uniklý klíč: do chatu jsem omylem vložil tajný klíč Supabase (sb*secret*…). Klíč jsem zneplatnil v nastavení API klíčů projektu. Klient používá jen publishable klíč, bezpečnost drží RLS.

Jak jsem výstup kontroloval:

- Mutace: rozbil jsem podmínku nebo vzorec a ověřil, že test zčervená (například 12 mutací v `tracker.ts`, všechny zachyceny; v `leadForm.ts` jeden ekvivalentní mutant přežil).
- Ruční ověření v prohlížeči: šířky 375 a 1440 px, telefon, reálná REST volání přes curl, pět událostí odeslaných jednou.
- Kontrola kontrastu: 32 dvojic text/pozadí, 0 selhání AA.
- Data a texty jsem porovnával se stránkami emitentů a brokerů sám.

## 9. Omezení a co se nedělalo

- Vyškrtnuto (`docs/strategy.md`, oddíl 8): kvíz, e-mailová série, Mailchimp, SEO, heatmapy, PDF a e-mail, CSV export, odkaz s parametry scénáře, profilové doporučení, výnosy a dividendy, souhrn podle brokera (V2), kompletní brand. Důvod: rozsah 15 až 20 hodin.
- Otevřená rizika: viz `docs/strategy.md`, oddíl 10 (dostupnost per ticker neověřena, nejasné stanovisko ČNB, otevřený anon INSERT s částečnou ochranou, právní kvalifikace formulací).
- Safari na iPhonu je ověřeno ručně v rozsahu uvedeném níže; Android a Safari na macOS ne (na MacBooku používám prohlížeč Zen). Fallback písma jsem zkoušel jen v Chrome na macOS.
- Stránka má `noindex` záměrně, do spuštění reklam.
- Čeština nebyla zkontrolována rodilým mluvčím. Seznam rizikových frází: `docs/copy-cs.md`, oddíl 10.
- Rozpis po letech v souhrnu ukazuje kumulativní součet (řádek roku k je poplatek po k letech, poslední řádek se rovná hlavní tabulce). Roční přírůstek definuje příloha A v `docs/strategy.md`.
- `[PROVOZOVATEL]` je ve stránce nevyplněno.
- Nasazení na Vercelu a zápis do reálné Supabase jsem 11. 10. 2026 ověřil ručně na telefonu iPhone 13 v prohlížeči Safari: hero A i B, odeslání formuláře, zobrazení souhrnu. Zkušební řádky jsem smazal.

## 10. Co musí doplnit skutečný provozovatel

Správce osobních údajů a kontakty, účel a právní základ zpracování e-mailu, závěrečné znění disclaimeru a poučení o rizicích, posouzení měření a souhlasu, kontrola reklamních formulací. Úplný seznam: `docs/strategy.md`, oddíl 11.
