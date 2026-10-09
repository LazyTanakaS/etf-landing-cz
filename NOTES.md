## Pomocný chat s Claude

Hlavní práce (strategie, ověřování dat, texty, kód a testy) probíhala v Claude Code s modelem Sonnet 5.5. Exporty jednotlivých sessions jsou ve složce `ai-log/`.

Vedle toho jsem používal samostatný chat s Claude (aplikace Claude, mimo Claude Code). Jeho záznam v `ai-log/` není, protože příkaz `/export` patří jen ke Claude Code. Chat jsem použil na:

- plán práce na týden a pořadí sessions,
- přípravu startovních promptů: první prompt vznikl z mého návrhu v Miro, prošel skillem prompt-master a [doplnit: co jsem upravil],
- kontrolu odpovědí agenta z Claude Code, například nesrovnalostí v TER nebo chybějících zdrojů,
- kontrolu české terminologie a formulací.

Na mně zůstalo: výběr cílové skupiny a lead magnetu, ověření údajů přímo na stránkách emitentů a brokerů a rozhodnutí, co vyškrtnout. Chat měl jen čtecí přístup ke složce projektu a do repozitáře nic nezapisoval. Soubory vznikly v Claude Code nebo jsem je psal sám.

## Session 01-strategy (9. 10. 2026)

Model: Sonnet 5.5, High effort. Režim: plan mode, žádné soubory bez mého schválení.

Zadání: kritika mého návrhu z Miro (dostupnost amerických ETF pro české drobné investory, příklad poplatků, zamčená tabulka, formulace, rozsah), dvě alternativy lead magnetu, potom návrh strategie.

Ověřil jsem sám:

- TER a burzu u každého ETF na stránkách emitentů (`data/etf-sources.md`).
- Tvrzení brokerů na veřejných stránkách (`data/availability.md`).
- Vzorec poplatků a jeho testovací hodnoty jsem přepočítal ručně.

Kde se AI mýlila nebo nebyla spolehlivá:

- Tvrdila, že TER u QQQ je 0,20 % a že to číslo stojí v mém návrhu. Stránka Invesco ukazuje 0,18 % (k 8. 10. 2026) a v mém návrhu to číslo nebylo.
- Vzorec n(n+1)/2 popsala jako „vklad na konci měsíce", ale odpovídá vkladu na začátku měsíce. Zachyceno při kontrole, popis opraven.
- Na požádání vrátila data bez URL a bez datumů a jedna odpověď odporovala předchozí. Obě jsem odmítl a vyžádal zdroje.
- Text prospektu VOO i stránky Degira četl menší model. Bral jsem to jen jako kontrolu, ne jako ověření. Stránky Degira jsem poté přečetl sám na obou jazykových verzích a zapsal jen to, co na nich stojí.
- V jedné verzi tabulky měly všechny fondy stejné datum 28. 4. 2026. U IVV a SCHD jsem ho na stránce neviděl, proto jsem vrátil „no date".

Moje rozhodnutí, ne AI:

- Opustil jsem tvrzení „poplatky okrádají": vypočtený rozdíl mezi 0,03 % a 0,18 % je za 10 let asi 4 540 Kč při vložených 600 000 Kč.
- Lead magnet V1 (souhrn na obrazovce), vklad na začátku měsíce, bez kvízu, bez výnosů a dividend.
- Dostupnost jako „záleží na brokerovi", protože Fio a IBKR uvádějí opak.

## Session 02-copy (9. 10. 2026)

Model: Sonnet 5.5, high effort. Režim: plan mode, texty zapsány až po mém „zapiš".

Zadání: české texty reklam A a B, hero obou variant, tabulka, blok „Co uvádějí brokeři", kalkulačka, formulář, souhrn po odeslání, poučení o rizicích, pořadí sekcí a seznam frází k jazykové kontrole.

Ověřil jsem sám:

- Stránky Degira (česká i anglická verze) a datum článku Fio: 19. 1. 2022. Do textu jsem proto dal, že je článek starý a stav se mohl změnit.
- Že každé číslo v textech pochází z `data/*.md` nebo z přílohy A strategie.
- České formulace a navržené termíny do glosáře.

Kde se AI mýlila nebo nebyla spolehlivá:

- Blok „Co uvádějí brokeři" tvrdil, že u Degira, XTB a Portu nebylo nic nalezeno. Platilo to jen před mým ověřením Degira, text jsem nechal opravit.
- Číslo 4 537,50 Kč dala do hero jako pevný text. Požadoval jsem, aby se počítalo funkcí kalkulačky z `etfs.ts`.
- Drobný text v hero A byl na první obrazovku mobilu příliš dlouhý a podnadpis odkazoval na „kalkulačku pod tabulkou", i když pořadí sekcí je jiné. Oboje opraveno.
- Tvrdila, že `docs/glossary-cs.md` neexistuje. Soubor existoval.
- Navrhla nahradit „kalkulačka" slovem „kalkulátor". Nechal jsem „kalkulačka" (běžnější české slovo).

Moje rozhodnutí, ne AI:

- Reklama B a hero B bez počtu a jmen brokerů.
- Sloupec UCITS v první verzi vypuštěn, protože VUAA nemám ověřený z primárního zdroje.
- ETF jako střední rod (jednotné „americké ETF", množné „americká ETF"), řazení tabulky podle TER a při shodě abecedně.
- Zachována slova „kalkulačka" a „kótován".
