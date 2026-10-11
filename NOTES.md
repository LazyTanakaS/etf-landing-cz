## Pomocný chat s Claude

Hlavní práce (strategie, ověřování dat, texty, kód a testy) probíhala v Claude Code s modelem Sonnet 5.5. Exporty jednotlivých sessions jsou ve složce `ai-log/`.

Vedle toho jsem používal samostatný chat s Claude (aplikace Claude, mimo Claude Code). Jeho záznam v `ai-log/` není, protože příkaz `/export` patří jen ke Claude Code. Chat jsem použil na:

- plán práce na týden a pořadí sessions,
- přípravu startovních promptů: první prompt vznikl z mého návrhu v Miro, prošel skillem prompt-master téměř beze změn,
- kontrolu odpovědí agenta z Claude Code, například nesrovnalostí v TER nebo chybějících zdrojů,
- kontrolu české terminologie a formulací,
- návrh textu poznámek v tomto souboru (zapsal a upravil jsem ho sám).

Na mně zůstalo: výběr cílové skupiny a lead magnetu, ověření údajů přímo na stránkách emitentů a brokerů a rozhodnutí, co vyškrtnout. Chat měl jen čtecí přístup ke složce projektu a do repozitáře nic nezapisoval. Soubory vznikly v Claude Code nebo jsem je psal sám.

## Session 01-strategy (9. 10. 2026)

Model: Sonnet 5.5, High effort. Režim: plan mode, žádné soubory bez mého schválení. Commity a push jsem dělal sám, agent necommitoval.

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

## Session 02-copy (9. 10. 2026)

Model: Sonnet 5.5, high effort. Režim: plan mode, texty zapsány až po mém „zapiš". Commity a push jsem dělal sám, agent necommitoval.

Zadání: české texty reklam A a B, hero obou variant, tabulka, blok „Co uvádějí brokeři", kalkulačka, formulář, souhrn po odeslání, poučení o rizicích, pořadí sekcí a seznam frází k jazykové kontrole.

Ověřil jsem sám:

- Stránky Degira (česká i anglická verze) a datum článku Fio: 19. 1. 2022. Do textu jsem proto dal, že je článek starý a stav se mohl změnit.
- Že každé číslo v textech pochází z `data/*.md` nebo z přílohy A strategie.
- České formulace a navržené termíny do glosáře.

Kde se agent mýlil nebo nebyl spolehlivý:

- Blok „Co uvádějí brokeři" tvrdil, že u Degira, XTB a Portu nebylo nic nalezeno. Platilo to jen před mým ověřením Degira, text jsem nechal opravit.
- Číslo 4 537,50 Kč dal do hero jako pevný text. Požadoval jsem, aby se počítalo funkcí kalkulačky z `etfs.ts`.
- Drobný text v hero A byl na první obrazovku mobilu příliš dlouhý a podnadpis odkazoval na „kalkulačku pod tabulkou", i když pořadí sekcí je jiné. Oboje opraveno.
- Po vytvoření `docs/glossary-cs.md` dál tvrdil, že soubor neexistuje (poprvé to platilo, soubor jsem vytvořil až poté).
- Navrhl nahradit „kalkulačku" slovem „kalkulátor". Nechal jsem „kalkulačka" (běžnější české slovo).

Moje rozhodnutí, ne AI:

- Reklama B a hero B bez počtu a jmen brokerů.
- Sloupec UCITS v první verzi vypuštěn, protože VUAA nemám ověřený z primárního zdroje.
- ETF jako střední rod (jednotné „americké ETF", množné „americká ETF"), řazení tabulky podle TER a při shodě abecedně.
- Zachována slova „kalkulačka" a „kótován".

Claude Code v několika sessions odpovídal částečně rusky (můj pracovní jazyk), proto jsou v exportech ruské slova. Texty stránky, data, kód a dokumentace jsou česky nebo anglicky.

## Session 03-skeleton (9. 10. 2026)

Model: Sonnet 5.5, medium effort. Režim: plan mode, soubory zapsány až po mém „zapiš". Commity a push jsem dělal sám, agent necommitoval. Na Vercel jsem nasadil sám v dashboardu.

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

Vzorec a unit test napsal AI (podle přílohy A), já jsem je přepsal ručně a ověřil jsem je testy s hodnotami, které jsem spočítal sám. Původně jsem je chtěl psát sám (viz strategy.md, oddíl 9); rozhodl jsem se jinak.

- Formula (totalFee, feeForYear) and the test file were written by the AI
  (me as mentor-reviewer chat); I retyped them myself.
- Calculator logic and UI by the agent, after an approved plan.
- Checked by hand: mutation checks (broke the formula, tests went red),
  375 and 1440 px without horizontal scroll, keyboard path, Vercel on a phone.
- AI errors: regular space before "Kč" (fixed with nbsp), awkward error text
  "celé číslo let", copy-cs.md out of sync with content.ts, stale comment.
- Decision: years limited to 20 to avoid unverified Czech compound forms.
