## Pomocný chat s Claude

Hlavní práce (strategie, ověřování dat, texty, kód a testy) probíhala v Claude Code s modelem Sonnet 5.5. Exporty jednotlivých sessions jsou ve složce `ai-log/`.

Vedle toho jsem používal samostatný chat s Claude (aplikace Claude, mimo Claude Code). Jeho záznam v `ai-log/` není, protože příkaz `/export` patří jen ke Claude Code. Chat jsem použil na:

- plán práce na týden a pořadí sessions,
- přípravu startovních promptů: první prompt vznikl z mého návrhu v Miro, prošel skillem prompt-master a [doplnit: co jsem upravil],
- kontrolu odpovědí agenta z Claude Code, například nesrovnalostí v TER nebo chybějících zdrojů,
- kontrolu české terminologie a formulací.

Na mně zůstalo: výběr cílové skupiny a lead magnetu, ověření údajů přímo na stránkách emitentů a brokerů a rozhodnutí, co vyškrtnout. Chat měl jen čtecí přístup ke složce projektu a do repozitáře nic nezapisoval. Soubory vznikly v Claude Code nebo jsem je psal sám.

## Session 01-strategy (09.10.2026)

Model: Sonnet 5.5, High effort. Režim: plan mode, žádné soubory bez mého schválení.
Zadání: kritika mého návrhu z Miro (dostupnost amerických ETF pro české drobné investory, příklad poplatků, zamčená tabulka, formulace, rozsah), dvě alternativy lead magnetu, potom návrh strategie.

Ověřil jsem sám:

- TER a burzu u každého ETF na stránkách emitentů (data/etf-sources.md)
- Tvrzení brokerů na veřejných stránkách (data/availability.md)
- Vzorec poplatků a jeho testovací hodnoty jsem přepočítal ručně.

Kde se AI mýlila nebo nebyla spolehlivá:

- Tvrdila, že TER u QQQ je 0,20 % a že to číslo stojí v mém návrhu. Stránka Invesco ukazuje 0,18 % (k 8. 10. 2026) a v mém návrhu to číslo nebylo.
- Vzorec n(n+1)/2 popsala jako „vklad na konci měsíce", ale odpovídá vkladu na začátku měsíce. Zachyceno při kontrole, popis opraven.
- Na požádání vrátila data bez URL a bez datumů a jedna odpověď odporovala předchozí. Obě jsem odmítl a vyžádal zdroje.
- Text prospektu VOO četl menší model, stejně jako stránky Degira. Bral jsem to jen jako kontrolu, ne jako ověření.
- Text prospektu VOO četl menší model. Stránky Degira jsem poté přečetl sám na obou jazykových verzích a zapsal jen to, co na nich stojí..
- V jedné verzi tabulky měly všechny fondy stejné datum 28. 4. 2026. U IVV a SCHD jsem ho na stránce neviděl, proto jsem vrátil „no date".
- Agent se mylil a myslel že docs/glossary-cs.md neexistuje.

Moje rozhodnutí, ne AI:

- Opustil jsem tvrzení „poplatky okrádají": vypočtený rozdíl mezi 0,03 % a 0,18 % je za 10 let asi 4 540 Kč při vložených 600 000 Kč.
- Lead magnet V1 (souhrn na obrazovce), vklad na začátku měsíce, bez kvízu, bez výnosů a dividend.
- Dostupnost jako „záleží na brokerovi", protože Fio a IBKR uvádějí opak.
