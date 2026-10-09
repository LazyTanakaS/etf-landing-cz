# Strategie: landing page, americká ETF pro české investory

Stav: návrh odsouhlasený autorem. Rozhoduje autor.
Značení: [fakt] má zdroj a datum, [předpoklad] je vstup bez zdroje, [doporučení] má důvod a kompromis, [neověřeno] nemá oporu.
Hodnoty fondů jsou jen v `data/etf-sources.md`, tvrzení brokerů jen v `data/availability.md`. Tento dokument je neduplikuje.

## 1. Cílová skupina

- [předpoklad] Čeští drobní investoři zhruba 28-45 let z mobilní reklamy (FB/IG/Google), investují pár tisíc Kč měsíčně. Věk a výše částek nemají zdroj.
- Bolest: neví, jestli a u koho se americké ETF koupí a co stojí fond sám. Původní otázka "které ETF je pro mě nejlepší" je poradenská, nevedeme ji.
- [doporučení] Cílit na dostupnost a poplatek fondu. Důvod: pokryje to ověřená data. Kompromis: užší téma než "nejlepší ETF".

## 2. Lead magnet: dostupnost a poplatky

Návštěvník vidí hned plně otevřenou tabulku a kalkulačku. Za kontakt dostane osobní souhrn (viz 3).

Tabulka (5 fondů), sloupce:
- ticker a název,
- burza podle stránky emitenta (u VOO a VTI "neuvedeno"),
- TER s odkazem na zdroj a datem načtení,
- dostupnost: "záleží na brokerovi, ověřte před nákupem",
- evropský ekvivalent (UCITS), jen informace.

Nadpis říká "americká ETF", ne "NYSE". [fakt] QQQ je kótován na Nasdaq (Nasdaq/NMS), zdroj: stránka Invesco, načteno 9. 10. 2026 (viz `data/etf-sources.md`). Odchylku od zadání zdůvodní README.

Řazení: podle TER, s popiskem "řazeno podle TER".

Dostupnost a brokeři:
- Stránka cituje brokera jeho vlastními slovy a s datem načtení ("Broker na svých stránkách uvádí..."), nikdy jako vlastní fakt.
- Doložené: Interactive Brokers (znalostní báze, obecně blokováno pro retail z EHP a UK, bez tickerů) a Fio (klienti mohou obchodovat americká ETF bez omezení, ale bez poradenství a aktivní nabídky; datum článku doplní autor).
- Degiro, XTB, Portu: [neověřeno], bez tvrzení.
- Stav per ticker u žádného brokera není ověřen.
- ČNB: obecný princip je v [Q&A B02](https://www.cnb.cz/en/faq/Questions-and-answers-on-the-PRIIPs-KID/) (aktualizováno 22. 10. 2018): pro execution-only na podnět investora se povinnost KID podle čl. 13(1) nevztahuje. Americká ETF nezmiňuje. Stanovisko ČNB k americkým ETF je [neověřeno]. Nepsat "ČNB povoluje".

Evropský ekvivalent (UCITS): vyplnit jen tam, kde je ověřený a má vlastní řádek ve zdrojích. Zatím jen S&P 500 přes VUAA (OCF 0,07 %, anglický KID, český KID neověřen). U ostatních "přímý ekvivalent neověřen". Nejde o doporučení.

Mimo obsah: výnosy, dividendy (bez ověřených dat, riziko minulých výnosů), profil "konzervativní / vyvážený / růstový", slova "nejlepší" a "okrádají".

## 3. Kdy žádáme o kontakt a co je za formulářem

Moment: po zobrazení tabulky a výsledku kalkulačky pro jeden fond.

Formulář: e-mail (povinný), souhlas. Skrytý honeypot, v databázi se neukládá.

Varianta V1, osobní souhrn. Vše se generuje v prohlížeči, bez serveru a bez e-mailu:
- souhrn na obrazovce: částka, horizont, 5 fondů, rozpis po letech, otázky pro brokera,
- tlačítko "Zkopírovat souhrn jako text".

Nic neslibujeme: ani e-mail, ani PDF.

- [doporučení] V1. Důvod: doručitelné hned, levné, bez nedoložených dat. Kompromis: co lze spočítat v prohlížeči, spočítá si návštěvník i bez formuláře. Brána je kosmetická, stránka to nezastírá.
- Účel zpracování e-mailu bez slibu doručení určí [PROVOZOVATEL].
- Hypotéza do README, ne do scope: souhrn podle zvoleného brokera (V2). Dnes by byl z poloviny prázdný, protože doložené jsou jen IBKR a Fio.

## 4. Interaktivní prvky

Srovnávací tabulka: celá viditelná, viz 2.

Kalkulačka: označená "poplatek fondu (TER), bez zhodnocení a bez poplatků brokera".
- Předpoklad na stránce: "vklad na začátku každého měsíce, poplatek TER/12 měsíčně z hodnoty držené v daném měsíci, zhodnocení 0 %, bez poplatků brokera a směny měn."
- Vzorec a testovací vektory: příloha A.
- Rozdíl mezi nejnižším a nejvyšším TER je v ilustraci 4 537,50 Kč za 10 let při vložených 600 000 Kč. Kalkulačka neříká "kolik vás to stojí celkem".
- Vzorec a jeho unit test píše autor, AI je reviduje (pravidla v 9).

Kvíz: ne.

## 5. Měření (Supabase, tabulky events a leads)

- Události: `page_view`, `cta_click`, `calc_used`, `form_start`, `form_submit`.
- `events`: id, session_id, name, created_at. Žádné osobní údaje.
- `leads`: id, email, consent_at, consent_text_version, created_at. `session_id` se do `leads` nezapisuje.
- [doporučení] Tabulky nepropojit. Důvod: události zůstanou anonymní. Kompromis: konverzi nelze přiřadit relaci, jen agregovaně.
- Session id je náhodné a žije v `sessionStorage`.
- RLS: anon smí INSERT, žádný SELECT. Insert bez čtení zpět (return=minimal).
- Bez UNIQUE na e-mailu: chyba by prozradila, že e-mail už existuje. Deduplikace mimo aplikaci.
- Ochrana před boty: honeypot a CHECK omezení délky e-mailu a seznam povolených názvů událostí. Rate limit bez Edge Functions nejde.
- Klíče jen v `.env` (v `.gitignore`). Publishable klíč je v prohlížeči veřejný, bezpečnost drží RLS. Service klíč nikdy v repozitáři ani v klientu.

## 6. Vizuální základ (malý, promyšlený)

Paleta a písmo se vyberou později podle referencí autora. Zatím:
- Kandidáti písma: IBM Plex Sans, IBM Plex Serif, Source Sans 3, Source Serif 4. [fakt] Všechny mají podmnožinu `latin-ext` (Google Fonts metadata a CSS API, 9. 10. 2026). Jde o deklaraci podmnožiny, ne test glyfů. Před výběrem projít testovací řetězec "ěščřžýáíéúůďťňó ĚŠČŘŽÝÁÍÉÚŮĎŤŇÓ".
- Při vlastním hostování nebo `next/font` zapnout `latin-ext`, jinak čeština spadne na záložní písmo.
- Tón: vykání, krátké věty, každé číslo se zdrojem a datem malým písmem pod ním, žádné vykřičníky ani "odemkněte". Žádný fialový gradient, žádná falešná čísla ani reference.

## 7. Reklamní směry (dvě verze, finální texty později)

- A, poplatky: "Kolik stojí fond za 10 let? Spočítejte poplatek." Bez emocí a slibů.
- B, dostupnost, jako otázka: "Dá se americké ETF koupit u vašeho brokera? Podívejte se, co brokeři uvádějí na svých stránkách." Netvrdit nic o nedostupnosti: Fio uvádí opak.
- Obě verze: risk disclaimer a odkaz na poučení o rizicích na stránce. Obecně platné znění, finální posoudí [PROVOZOVATEL] nebo právník.

## 8. Co vyškrtáváme a proč

- Kvíz, e-mailová série, Mailchimp, SEO, heatmapy, PDF a e-mail, CSV export, odkaz s parametry scénáře, profilové doporučení, výnosy a dividendy, V2 podle brokera, kompletní brand.
- Důvod: rozsah 15-20 hodin.
- Škrtat odspodu: doladění vzhledu, další texty.
- Nikdy nevyškrtávat: ověřená data, bezpečné texty, měření, README.

Hrubý odhad hodin (není měření): data a ověření 2-3 (část je hotová v `data/etf-sources.md` a `data/availability.md`), kalkulačka 3, stránka a tabulka 4, formulář + Supabase + RLS + události 3-4, souhrn V1 1-2, texty 2, README 2, nasazení a test na 375 px 1-2. Dohromady asi 18-22 hodin. Horní hranice je nad rozsahem, proto se škrtá odspodu (viz výše).

## 9. Práce s AI

- Pravidlo "8 týdnů bez AI kódu" platí pro studijní projekty. Zde zadání práci s AI vyžaduje, takže výjimka (rozhodnutí autora).
- Vzorec kalkulačky a jeho unit test píše autor podle specifikace v příloze A, AI je reviduje.
- README popíše: instrukce, kontrolu výstupu, kde se AI mýlila (například konvence vkladu ve vzorci), a exporty konverzací v `ai-log/`.

## 10. Otevřená rizika

- Dostupnost per ticker není ověřena u žádného brokera; premisa magnetu platí jen částečně.
- Stránky brokerů jsou bez data, uvádí se datum načtení. Degiro, XTB a Portu jsou [neověřeno].
- Stanovisko ČNB k americkým ETF je [neověřeno]; Fio ho uvádí bez primárního zdroje.
- VTI: TER 0,03 % dle stránky fondu k 9. 10. 2026, prospekt neověřen.
- Burza u VOO a VTI je v tabulce "neuvedeno", stránka emitenta ji neuvádí.
- Účel zpracování e-mailu bez slibu doručení: [PROVOZOVATEL].
- `sessionStorage` id může vyžadovat souhlas i bez cookies (zákon 127/2005) [neověřeno]; posoudí [PROVOZOVATEL].
- Právní kvalifikace formulací [neověřeno]; posoudí [PROVOZOVATEL] nebo právník.
- Anon INSERT je otevřený botům; ochrana jen částečná.
- Očekávaná konverze je odhad s odůvodněním v README. Ne zjištěná hodnota.
- Rozsah může přesáhnout 20 hodin.

## 11. Co musí doplnit skutečný provozovatel (do README)

[PROVOZOVATEL]: správce osobních údajů a kontakty, účel a právní základ zpracování e-mailu, závěrečná podoba disclaimeru a poučení o rizicích, posouzení měření a souhlasu, kontrola reklamních formulací.

## Příloha A: vzorec a testovací vektory

Značení: TER jako zlomek (0,03 % = 0,0003), `vklad` v Kč, `n` měsíců. Zaokrouhlovat až při zobrazení.

Celkový poplatek (vklad na začátku měsíce): `vklad * (TER / 12) * n * (n + 1) / 2`
Poplatek za rok y: `vklad * (TER / 12) * součet k pro k od 12*(y-1)+1 do 12*y`. Nezávisí na celkovém horizontu.

Důvod: vklad č. m je držen n-m+1 měsíců, součet je n(n+1)/2. Pro konvenci konce měsíce by bylo n(n-1)/2 (výsledky níže jen pro srovnání).

Testovací vektory (vklad 5 000 Kč, začátek měsíce; v testu `toBeCloseTo`):

| Případ | Očekávaný výsledek |
|---|---|
| n = 0 | 0 |
| n = 1, TER 0,03 % | 0,125 |
| n = 12, TER 0,03 % | 9,75 |
| n = 120, TER 0,03 % | 907,50 |
| n = 120, TER 0,06 % | 1 815 |
| n = 120, TER 0,18 % | 5 445 |
| rok 1 z 120, TER 0,03 % | 9,75 |
| rok 2 z 120, TER 0,03 % | 27,75 |
| rok 10 z 120, TER 0,03 % | 171,75 |

Vlastnosti k otestování:
- součet ročních poplatků = celkový poplatek,
- dvojnásobný vklad dává dvojnásobný poplatek,
- dvojnásobné TER dává dvojnásobný poplatek,
- poplatek při TER = 0 je 0.

Pro srovnání, konvence konce měsíce při n = 120 a TER 0,03 % / 0,06 % / 0,18 %: 892,50 / 1 785 / 5 355 Kč (rozdíl 0,18 % vs 0,03 %: 4 462,50 Kč místo 4 537,50 Kč).

Hodnoty v tabulce jsou výpočet z uvedeného vzorce, ne data o fondech.

## Změny po session copy

Texty jsou v `docs/copy-cs.md`. Oproti oddílům 2, 4 a 7 platí:

- Sloupec "evropský ekvivalent (UCITS)" je v první verzi vypuštěn. VUAA není v `data/`. Tabulka má 4 sloupce.
- Reklamy ani hero nezmiňují počet ani jména brokerů. Pokrytí je částečné: doložené jsou Interactive Brokers, Degiro a Fio, u XTB a Portu stránka uvádí, že jsme nic nenašli.
- Číslo rozdílu mezi nejnižším a nejvyšším TER (v ilustraci 4 537,50 Kč) je přesunuto ke kalkulačce a není to pevný text. Počítá se za běhu stejnou funkcí jako kalkulačka z hodnot v `etfs.ts` (vklad 5 000 Kč, 120 měsíců). Vzorec: příloha A.
- Riziko: důkaz pro Fio je z roku 2022 (článek z 19. 1. 2022). Stav se mohl změnit, stránka to u citace uvádí.
