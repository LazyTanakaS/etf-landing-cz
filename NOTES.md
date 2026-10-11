## Pomocný chat s Claude

Hlavní práce (strategie, ověřování dat, texty, kód a testy) probíhala v Claude Code s modelem Sonnet 5.5. Exporty jednotlivých sessions jsou ve složce `ai-log/`.

Vedle toho jsem používal samostatný chat s Claude (aplikace Claude, mimo Claude Code). Jeho záznam v `ai-log/` není, protože příkaz `/export` patří jen ke Claude Code. Chat jsem použil na:

- plán práce na týden a pořadí sessions,
- přípravu startovních promptů: první prompt vznikl z mého návrhu v Miro, prošel skillem prompt-master téměř beze změn,
- kontrolu odpovědí agenta z Claude Code, například nesrovnalostí v TER nebo chybějících zdrojů,
- kontrolu české terminologie a formulací,
- návrh vzorce poplatků a jeho testu (`src/fees.ts`, `src/fees.test.ts`), který jsem potom přepsal ručně (viz Session 04),
- návrh textu poznámek v tomto souboru (zapsal a upravil jsem ho sám).
  Na mně zůstalo: výběr cílové skupiny a lead magnetu, ověření údajů přímo na stránkách emitentů a brokerů a rozhodnutí, co vyškrtnout. Chat měl jen čtecí přístup ke složce projektu a do repozitáře nic nezapisoval. Soubory vznikly v Claude Code nebo jsem je psal sám; u `fees.ts` a `fees.test.ts` šlo o ruční přepis návrhu z chatu.

Claude Code v několika sessions odpovídal částečně rusky (můj pracovní jazyk), proto jsou v exportech ruské slova. Texty stránky, data, kód a dokumentace jsou česky nebo anglicky.

## Session 01-strategy

Model: Sonnet 5.5, High effort. Režim: plan mode, žádné soubory bez mého schválení. Commity a push jsem spouštěl já, nebo je agent spustil na můj výslovný příkaz s přesně zadanými soubory (např. `git add README.md NOTES.md docs src`); `.env` jsem před každým commitem kontroloval ve `git status`.

Zadání: kritika mého návrhu z Miro (dostupnost amerických ETF pro české drobné investory, příklad poplatků, zamčená tabulka, formulace, rozsah), dvě alternativy lead magnetu, potom návrh strategie.

Ověřil jsem sám:

- TER a burzu u každého ETF na stránkách emitentů (`data/etf-sources.md`).
- Tvrzení brokerů na veřejných stránkách (`data/availability.md`).
- Vzorec poplatků a jeho testovací hodnoty jsem přepočítal ručně.
  Kde se agent mýlil nebo nebyl spolehlivý:

- Tvrdil, že TER u QQQ je 0,20 % a že to číslo stojí v mém návrhu. Stránka Invesco ukazuje 0,18 % (k 8. 10. 2026) a v mém návrhu to číslo nebylo.
- Vzorec n(n+1)/2 popsal jako „vklad na konci měsíce", ale odpovídá vkladu na začátku měsíce. Zachyceno při kontrole, popis opraven.
- Na požádání vrátil data bez URL a bez datumů a jedna odpověď odporovala předchozí. Obě jsem odmítl a vyžádal zdroje.
- Text prospektu VOO i stránky Degira četl menší model. Bral jsem to jen jako kontrolu, ne jako ověření. Stránky Degira jsem poté přečetl sám na obou jazykových verzích a zapsal jen to, co na nich stojí.
- V jedné verzi tabulky měly všechny fondy stejné datum 28. 4. 2026. U IVV a SCHD jsem ho na stránce neviděl, proto jsem vrátil „no date".
  Moje rozhodnutí, ne AI:

- Opustil jsem tvrzení „poplatky okrádají": vypočtený rozdíl mezi 0,03 % a 0,18 % je za 10 let asi 4 540 Kč při vložených 600 000 Kč.
- Lead magnet V1 (souhrn na obrazovce), vklad na začátku měsíce, bez kvízu, bez výnosů a dividend.
- Dostupnost jako „záleží na brokerovi", protože Fio a IBKR uvádějí opak.

## Session 02-copy

Model: Sonnet 5.5, high effort. Režim: plan mode, texty zapsány až po mém „zapiš". Commity, push i kontrola `.env` probíhaly stejně jako v session 01.

Zadání: české texty reklam A a B, hero obou variant, tabulka, blok „Co uvádějí brokeři", kalkulačka, formulář, souhrn po odeslání, poučení o rizicích, pořadí sekcí a seznam frází k jazykové kontrole.

Ověřil jsem sám:

- Stránky Degira (česká i anglická verze) a datum článku Fio: 19. 1. 2022. Do textu jsem proto dal, že je článek starý a stav se mohl změnit.
- Že každé číslo v textech pochází z `data/*.md` nebo z přílohy A strategie.
- České formulace a navržené termíny do glosáře.
  Kde se agent mýlil nebo nebyl spolehlivý:

- Blok „Co uvádějí brokeři" tvrdil, že u Degira, XTB a Portu nebylo nic nalezeno. Platilo to jen před mým ověřením Degira, text jsem nechal opravit.
- Číslo 4 537,50 Kč dal do hero jako pevný text. Požadoval jsem, aby se počítalo funkcí kalkulačky z `etfs.ts`.
- Drobný text v hero A byl na první obrazovku mobilu příliš dlouhý a podnadpis odkazoval na „kalkulačku pod tabulkou", i když pořadí sekcí je jiné. Oboje opraveno.
- Poprvé řekl, že `docs/glossary-cs.md` neexistuje, a to platilo. Po tom, co jsem soubor vytvořil, to tvrdil dál.
- Navrhl nahradit „kalkulačku" slovem „kalkulátor". Nechal jsem „kalkulačka" (běžnější české slovo).
  Moje rozhodnutí, ne AI:

- Reklama B a hero B bez počtu a jmen brokerů.
- Sloupec UCITS v první verzi vypuštěn, protože VUAA nemám ověřený z primárního zdroje.
- ETF jako střední rod (jednotné „americké ETF", množné „americká ETF"), řazení tabulky podle TER a při shodě abecedně.
- Zachována slova „kalkulačka" a „kótován".

## Session 03-skeleton

Model: Sonnet 5.5, medium effort. Režim: plan mode, soubory zapsány až po mém „zapiš". Commity, push i kontrola `.env` probíhaly stejně jako v session 01. Na Vercel jsem nasadil sám v dashboardu.

`ai-log/03-skeleton.md` obsahuje na začátku i záznam session 02 (mezi sessions jsem nepoužil `/clear`). Session 03 začíná promptem „Cíl této session: kostra aplikace a první nasazení".

Zadání: kostra Vite react-ts, `src/data/etfs.ts` jen z `data/etf-sources.md` (chybějící údaje `null`), texty slovo od slova z `docs/copy-cs.md`, bez kalkulačky, formuláře a nových závislostí.

Ověřil jsem sám:

- Data v `etfs.ts` proti `data/etf-sources.md` a texty v `src/content.ts` proti `docs/copy-cs.md`.
- `npm run build` a `npm run lint` jsem spustil sám, vzhled jsem zkontroloval na nasazené stránce na telefonu.
  Kde se agent mýlil:

- Do chatu jsem vložil poškozený výpis plánu (při kopírování z terminálu chyběly části řádků). Podle něj jsem agentovi „opravil" umístění odkazu na `vite.svg` (index.css místo index.html), i když jeho původní plán byl správný. Agent mou opravu přijal bez námitky a napsal, že plán chybně přisoudil index.css. Zjištěno při kontrole exportu.
- Příznak `prospectusNotVerified: false` u čtyř fondů by tvrdil, že prospekt ověřen byl (nebyl u žádného). Nahrazeno polem `terCaveat` s textem z copy jen u VTI.
- Lint (oxlint) vypisuje jen exit code 0 bez shrnutí, proto jsem ho spustil sám.
  Chyba v nastavení gitu (ne v kódu): v konfiguraci byla zástupná noreply adresa (`12345678+…`), GitHub proto přiřadil commity cizímu účtu. Zjištěno na GitHubu, historii jsem přepsal (`git rebase --root` s novým autorem a `git push --force-with-lease`).

Moje rozhodnutí, ne AI:

- České texty v jednom souboru `src/content.ts`, `Hero` jako komponenta s prop `variant`.
- TER jako zlomek, v buňce jen symbol, názvy fondů doplním ručně z webů emitentů.
- CTA zatím na `#tabulka`, `noindex` do spuštění reklam, `[PROVOZOVATEL]` zůstává viditelné.

## Session 04

`src/fees.ts` a `src/fees.test.ts` vznikly v commitu 3890df4 (11. 10. 2026, 15:02) před začátkem Session 04. Návrh vzorce a testu vytvořila AI v chatu, který není uložen v `ai-log/`. Já jsem oba soubory přepsal ručně a ověřil testy s hodnotami, které jsem spočítal sám. Blok „illustration“ přibyl v commitu d317ddb. Zadání (`docs/strategy.md`, oddíl 9) původně počítalo s tím, že vzorec a test napíšu sám bez AI; tohle je vědomá odchylka, kterou jsem přiznal. Logiku kalkulačky a UI napsal agent po schváleném plánu.

Ověřil jsem sám:

- Kontroly mutací: rozbil jsem vzorec a testy zčervenaly.
- Šířky 375 a 1440 px bez vodorovného posunu, ovládání z klávesnice, Vercel na telefonu.
  Kde se agent mýlil:

- Běžná mezera před „Kč" (opraveno na pevnou mezeru).
- Neobratný text chyby „celé číslo let".
- `copy-cs.md` nebyl v souladu s `content.ts` a zůstal zastaralý komentář.
  Moje rozhodnutí, ne AI:

- Roky omezeny na 20, aby nebyly potřeba neověřené české složené tvary.

## Session 05: Supabase schéma a lead formulář

Schéma, RLS a formulář napsal agent po schváleném plánu. Plán jsem nejprve zkontroloval v pomocném chatu (rozhodnutí: `events.variant`, CHECKy, deaktivované tlačítko během odesílání, `utm_content` normalizován na a/b).

`supabase-js` vs. prostý `fetch`: naměřeno +54,84 kB gzip (72,27 → 127,11 kB) pro jeden POST, oproti +1,27 kB s `fetch`. Prahovou hodnotu (30 kB) jsem stanovil před měřením, zvolen `fetch`.

Ověřil jsem sám:

- Testy: celkem 49 prochází. Kontroly mutací: `variant.ts`, `leadForm.ts` (13, jeden ekvivalentní mutant přežil), `lib/` (14).
- Migrace spuštěna v SQL editoru, testy (a)–(e) v roli `anon` (insert projde, select a špatné hodnoty jsou odmítnuty).
- Reálná REST volání přes curl (201 při insertu, 401 při selectu), formulář na telefonu proti produkci.
  Kde se to pokazilo:

- V `.env` byly hodnoty bez názvů proměnných, takže URL a klíč byly prázdné.
- Proměnné ve Vercelu byly přidány až po posledním buildu, takže formulář zobrazoval chybový stav až do opětovného nasazení (Redeploy). Vite zapéká proměnné `VITE_` už při buildu.
  Kde si agent nebyl jistý:

- Hlavička Authorization s novým formátem publishable klíče (potvrzeno curl testem).
- Stav úspěchu: formulář zmizí, žádný text až do souhrnné obrazovky v session 07.

## Session 06: funnel tracking

- Tracker je čistý modul s injektovanými závislostmi (nepotřebuje jsdom); prochází 62 testů, 12 mutací v `tracker.ts`, všechny zachyceny.
- Chyba v mém zadání, kterou zachytil agent: `calc_used` jsem zadal jako „první platný výsledek", ale kalkulačka ukazuje platný výsledek hned po načtení (výchozí hodnoty), takže by se spustil každému návštěvníkovi. Opraveno: počítá se až po první změně fondu, vkladu nebo let.
- Test byl zpočátku slepý: `vi.fn()` si na vrácený promise přidá vlastní handler, takže chybějící `.catch` nikdy nevytvořilo nezachycenou rejection. Test teď používá obyčejnou funkci a poslouchá `unhandledRejection`.
- `funnel.sql` jsem ověřil na dočasné lokální PostgreSQL s vymyšlenými daty, ne na svém projektu Supabase.
- Session id žije jen v paměti (žádný sessionStorage ani cookies), vědomý kompromis: obnovení stránky je nová session. Zda odesílání náhodného id bez souhlasu spadá pod zákon 127/2005, není ověřeno; nechávám to na provozovateli.
- Ručně ověřeno: build + preview, pět událostí vždy jednou, varianta „a" z `utm_content`, zkušební řádky smazány.

## Session 06b: vizuální styl

Styly (`index.css`), markup komponent (Hero, EtfTable, Calculator, LeadForm, Risks, Footer, Icons, Placeholders) a `splitPlaceholders` napsal agent po schváleném plánu. Funkci `yearsUnit` a její test píšu já (v `calculator.ts` je zatím stub, který vrací "roky").

Co se dělalo:

- Design "klidná banka + editorial, měkká káva": tokeny v `:root`, staré proměnné odstraněny.
- Newsreader 500 a 600 self-hosted (latin + latin-ext woff2 z `@fontsource/newsreader` 5.3.0, OFL.txt přiložen), preload jen latin 600, bez externích požadavků.
- Hero, tabulka (karty do 40rem, tabulka od 40rem), kalkulačka, formulář, rizika (nová komponenta `Risks`), patička "Zdroje".
- Nové texty ("TER", "Zdroje") nejdřív v `docs/copy-cs.md`, potom v `content.ts`. Statické `units.years` odstraněno.
  Naměřeno (Chrome headless, build přes `vite preview`):

- CTA v hero: espresso na karamelu, 5,58:1, výška 48 px. Oprava `.on-dark a:not(.btn)` funguje.
- AA: 32 unikátních dvojic text/pozadí v běžném stavu, 0 selhání.
- Bez horizontálního scrollu při 375, 640, 960 a 1440 px.
- CLS 0 při woff2 zdrženém o 1,5 s (PerformanceObserver `layout-shift`, 375 i 1440 px); výška dokumentu před i po stejná.
- Velikosti: CSS 12,73 kB (3,47 kB gzip), JS 239,56 kB (75,02 kB gzip), woff2 celkem 77 736 B (23 624 + 23 876 + 15 068 + 15 168).
- Testy: 66 (62 + 4 pro `splitPlaceholders`). Mutace `splitPlaceholders`: 5 mutantů, všechny zachyceny.
- Fallback "Newsreader Fallback": hodnoty z designu (96/92/24) jsem přepočítal z metrik souborů (průměrná šířka znaků, hhea ascent/descent). Dvě tváře: 500 = Georgia, size-adjust 97,1 %, ascent 75,7 %, descent 27,3 %; 600 = Georgia Bold, 86 %, 85,5 %, 30,8 %.
  Odchylky od designu:

- `@media` místo container queries (zadání).
- Tabulka bez `min-width: 40rem`, buňky se zalamují.
- Věta výsledku kalkulačky zůstává jedna (text beze změny), číslo se jen vyřízne pro velké zobrazení; není samostatný štítek "Ilustrace, výpočet." a není tučný "Předpoklad výpočtu:".
- Zdroje v patičce jsou odkazy, ne holý text.
- Blok brokerů z designu neřešen (session 07).
- `unicode-range` fontů podle Fontsource (plné latin a latin-ext), ne užší rozsah ze zadání.
  Neověřeno:

- Chybové stavy formuláře a kalkulačky (`is-invalid`, `.err`, `.alert`) v prohlížeči.
- Safari/iOS, ovládání z klávesnice, screen reader.
- Fallback font jen v Chrome na macOS (Georgia je dostupná); na zařízeních bez Georgie se korekce neuplatní.
- Dynamická jednotka u let, dokud nenapíšu `yearsUnit`.
- Telefon a nasazení na Vercelu.

## Session 07: blok brokerů, souhrn po odeslání, hero B

Komponenty (`Brokers`, `Summary`), moduly `summary.ts`, `brokers.ts`, funkce `cumulativeFees` a `pickHeroVariant`, testy k nim a styly napsal agent po schváleném plánu. Nic není commitnuté. Texty jsou slovo od slova z `docs/copy-cs.md`; do docs jsem nejdřív zapsal tři věci (schváleno autorem): změnu "Citujeme" na "Shrnujeme, co brokeři uvádějí na svých stránkách" v hero B, větu pod rozpisem a hlášku o selhání kopírování.

Co se dělalo:

- Hero B: `heroContent.B`, pole `anchor` u obou variant (A `#kalkulacka`, B `#tabulka`), `Hero` čte kotvu z obsahu. `pickHeroVariant(search)` volá `readAdVariant` (jedno místo parsování), tracker beze změny.
- Stav kalkulačky (text vkladu a let) je v `App`. Při odeslání se použijí poslední platné hodnoty, na začátku 5 000 Kč a 10 let. Scénář zůstává jen v paměti stránky.
- `feeForYear` zrušena včetně jejích testů. Nahradila ji `cumulativeFees(vklad, ter, roky)` = `totalFee(vklad, ter, 12 * k)` pro k = 1..N. Poslední řádek rozpisu je přesně hodnota z hlavní tabulky souhrnu (test `toBe` a kontrola 907,50 / 1 815 / 5 445 Kč).
- `buildSummaryText` skládá text pro schránku s běžnými mezerami. Do textu jsem přidal i větu o předpokladech z kalkulačky (`calculatorContent.assumption`), aby vložený text nebyl bez předpokladů.
- `copyText` nikdy nevyhodí výjimku. Při selhání se ukáže hláška a `<textarea readOnly>` s vybraným textem. Oblast `role="status"` je v DOM od začátku, mění se jen její text. "Zkopírováno." po 4 s zmizí.
- Blok brokerů: položky jsou pole `text` + `source` (části, některé s odkazem) + datum. Test `brokers.test.ts` čte `docs/copy-cs.md` a porovnává složenou větu s oddílem 4 slovo od slova (nezlomitelné mezery se berou jako mezery).
  Převzato z designu (bundle, artboard "Souhrn po odeslání formuláře" a blok brokerů): tokeny, `.sheet`, `.scenario`, `.tbl-box` + `.sumtable`, zavřený `<details>` s šipkou, `.q-list`, tlačítko `btn-secondary` s ikonou, `.quotes` (tenké linky, bez karet a stínů, 2x2 od 60rem), `<cite>` pod větou.

Odchylky od designu:

- `@media` místo container queries.
- Brokeři bez `<figure>`, `<blockquote>` a velké uvozovky `„` (jsou to parafráze); položky mají stejné odsazení, XTB a Portu bez pomlčky a bez `<cite>`.
- V `<cite>` jsou odkazy na zdroje (u Degira zvlášť "česká" a "anglická"). V designu odkazy nejsou.
- `sc-raw-table` z exportu nahrazeno `table`, `thead`, `th scope`. Hlavička sloupců v hlavní tabulce se smí zalamovat (jinak byl na desktopu useknutý sloupec s poplatkem); čísla se nezalamují.
- Obsah rozpisu v designu není (je jen zavřený `<details>`), tabulku rok × pět fondů jsem navrhl podle `.sumtable`.
- "Zkopírováno." bez ikony fajfky. Fallback `<textarea>` a jeho styl v designu nejsou. Menší padding buněk tabulky pod 40rem (jinak scroll i u hlavní tabulky na 375 px).
  Ověřeno (build s falešným serverem místo Supabase, Chrome headless přes puppeteer-core, požadavky zachyceny na lokálním serveru):

- Bez parametru hero A s kotvou `#kalkulacka`. `?utm_content=b`: hero B, CTA "Zobrazit tabulku", `#tabulka`, události s `variant: 'b'`.
- Po načtení odešel jen `page_view`. `calc_used` odešel po první změně kalkulačky jednou a po další změně znovu ne. Po odeslání formuláře `form_start`, insert leadu (jen `email` a `consent_text_version`, žádný scénář) a `form_submit`.
- Neplatný vstup při odeslání: souhrn použil poslední platné hodnoty (7 000 Kč a 9 let); 7 000 Kč, 9 let, TER 0,03 % = 1 030,05 Kč odpovídá ručnímu výpočtu.
- Fokus po zobrazení souhrnu na H2, formulář zmizel, rozpis zavřený, 10 řádků, poslední řádek se rovná hlavní tabulce, schránka bez nezlomitelných mezer, simulovaný výpadek `clipboard.writeText` ukáže hlášku a označený text.
- Kotva `#tabulka`: horní okraj tabulky na 0 px a nic ji nezakrývá (sticky prvek v CSS není).
- Bez horizontálního scrollu stránky na 375, 640 a 1280 px. Brokeři 2 sloupce od 1280 px, souhrn 2 sloupce od 1280 px.
- Mutační kontroly: `pickHeroVariant` (3 mutanty), `cumulativeFees` (posun roku), `buildSummaryText` (odstraněno nahrazení mezer, index roku), `copyText` (`catch` vrací true), `summaryRows` (součet o 0,01 Kč), blok brokerů (změna slova ve zdroji i v textu, chybějící tečka, přidané uvozovky, chybějící odkaz). Všechny mutanty zachyceny. Testů je 95, lint a build čisté.
  Neověřeno:

- Reálná Supabase (použit falešný server, aby se nezapsaly zkušební řádky do živé databáze) a nasazení na Vercelu.
- Safari/iOS, klávesnice (Tab přes rozpis, `<details>`), screen reader (oznámení "Zkopírováno."), skutečné schránky v jiných prohlížečích než Chrome.
- Prefix `[PROVOZOVATEL]` a `[právní riziko]` texty zůstávají k posouzení provozovatelem.
- Věrnost vůči designu je ověřená okem na screenshotech, ne pixelovým porovnáním.
- `favicon.ico` vrací 404 (už před touto session).
  Názvy fondů: názvy v `src/data/etfs.ts` jsou ze stránek emitentů (adresy v `sourceUrl`), ověřeno 11. 10. 2026 a zapsáno do `data/etf-sources.md`, oddíl Fund names (IVV a SCHD z nadpisu h1, VOO a VTI z `<title>` stránky). U QQQ je "Invesco QQQ ETF" název z textu stránky, protože nadpis je "About QQQ" a `<title>` název fondu neobsahuje; právní subjekt se na stránce jmenuje "Invesco QQQ Trust". Stránka Schwab pro SCHD vrátila curl i WebFetch 403, načíst šla jen v Chrome. Test `src/data/etfs.test.ts` hlídá, že žádný fond nemá `name === null`, prázdný název ani zástupný text; mutace (null, zástupný text, prázdný řetězec) zachytil. Nic z toho nebylo doplněno z paměti.
