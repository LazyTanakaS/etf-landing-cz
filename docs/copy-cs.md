# České texty stránky a reklam

Stav: návrh odsouhlasený autorem, zdroj pravdy pro texty. Rozhoduje autor.
Navazuje na `docs/strategy.md` (oddíly 2, 3, 4, 7). Čísla jsou jen z `data/*.md` nebo z přílohy A strategie.
Značení: [právní riziko] = formulace, kterou musí posoudit [PROVOZOVATEL] nebo právník. `[doplnit]` = chybí údaj, který doplní autor.
Řádky "Proč" jsou podklad pro README.

Pravidla textů: vykání, krátké věty, bez vykřičníků. Zakázáno: "nejlepší", "okrádají", "zaručeno", "odemkněte", sliby výnosu, falešné reference.
Rod: ETF je střední rod. Jednotné číslo "americké ETF", množné "americká ETF". Držet všude.
Slova "kalkulačka" a "kótován" se nemění.

## 1. Reklamy

| | Reklama A (poplatky) | Reklama B (dostupnost) |
|---|---|---|
| Nadpis (do 40 znaků) | Kolik činí poplatek fondu za 10 let? (36) | Dá se americké ETF koupit u brokera? (36) |
| Hlavní text (do 125 znaků) | Pět amerických ETF, poplatek fondu (TER) u každého a výpočet na 10 let. Každé číslo má zdroj a datum. (101) | Záleží na brokerovi. Ukážeme, co brokeři uvádějí na svých stránkách, a na co se zeptat u svého brokera. (103) |
| CTA | Spočítat poplatek (tlačítko platformy: "Zjistit více") | Zobrazit tabulku (tlačítko platformy: "Zjistit více") |
| Řádek s upozorněním (81) | Investice nesou riziko ztráty. Informativní obsah, nejde o investiční doporučení. | stejný |

- Proč A: otázka s horizontem z oddílu 7 strategie. V reklamě není žádné číslo s předpoklady, protože se nevejdou do 125 znaků. "Činí" místo "stojí", protože "stojí fond" se dá číst jako cena fondu a kalkulačka neříká "kolik vás to stojí celkem".
- Proč B: otázka bez tvrzení o nedostupnosti, protože Fio uvádí opak. "Záleží na brokerovi" je věta z tabulky, takže reklama a stránka říkají totéž. Reklama neuvádí počet ani jména brokerů, aby neslibovala víc ani míň, než blok pod tabulkou obsahuje.
- [právní riziko]: věta "Záleží na brokerovi" jako odpověď v reklamě. Zda se řádek s upozorněním vejde do formátu reklamy a zda ho pravidla platformy a [PROVOZOVATEL] pokládají za dostatečný. Přesné seznamy tlačítek platforem nejsou ověřeny.

## 2. Hero stránky (první obrazovka na mobilu)

### Hero A (anchor tlačítka vede na kalkulačku)

- H1: Kolik činí poplatek fondu za 10 let?
- Podnadpis: Pět amerických ETF vedle sebe. U každého poplatek fondu (TER), zdroj a datum. A kalkulačka, která poplatek spočítá pro vaši částku.
- CTA: Spočítat poplatek
- Drobný text: Informativní obsah, nejde o investiční doporučení a investice nesou riziko ztráty. [Poučení o rizicích]
- Proč: H1 opakuje nadpis reklamy. Podnadpis říká, co návštěvník dostane, a nezmiňuje pořadí sekcí. Číslo s předpoklady je až u kalkulačky, kde je pro ně místo.

### Hero B (anchor tlačítka vede na tabulku)

- H1: Dá se americké ETF koupit u vašeho brokera?
- Podnadpis: Záleží na brokerovi. Níže je pět amerických ETF v jedné tabulce a to, co o nich brokeři uvádějí na svých stránkách.
- CTA: Zobrazit tabulku
- Drobný text: Citujeme brokery z jejich stránek, načteno 9. 10. 2026. Stav u konkrétního fondu si ověřte u svého brokera před nákupem. Informativní obsah, nejde o investiční doporučení. Investice nesou riziko ztráty. [Poučení o rizicích]
- Proč: odpověď "záleží" je v první větě, bez čekání na scroll. Podnadpis nepočítá ani nejmenuje brokery, takže slibuje jen to, co blok pod tabulkou obsahuje.
- [právní riziko]: "u vašeho brokera" při částečném pokrytí brokerů (viz oddíl 4).

## 3. Tabulka

- Nadpis: Pět amerických ETF vedle sebe
- Popisek řazení: Řazeno podle poplatku fondu (TER), od nejnižšího. Při stejném poplatku abecedně podle symbolu.
- Pořadí řádků podle dat: IVV, VOO, VTI (0,03 %), SCHD (0,06 %), QQQ (0,18 %).
- Sloupce (4): Burzovní symbol a název | Burza (podle stránky emitenta) | Poplatek fondu (TER) | Dostupnost
- Název fondu: `[název z webu emitenta]`. V `data/*.md` nejsou, nedoplňovat z paměti.
- Buňka burza: NYSE Arca (IVV, SCHD) / Nasdaq (QQQ) / "neuvedeno" (VOO, VTI)
- Buňka TER (příklad): 0,03 %, k datu 28. 4. 2026. Zdroj: Vanguard, načteno 9. 10. 2026.
  - IVV a SCHD: "datum na stránce neuvedeno".
  - VTI: "údaj ze stránky fondu, prospekt neověřen".
- Buňka dostupnost (všechny řádky): Záleží na brokerovi. Ověřte před nákupem.
- Pod tabulkou: QQQ je podle stránky emitenta kótován na Nasdaq, ne na NYSE. Poplatek fondu je jen jedna ze složek nákladů. Poplatky brokera, směna měn a daně v něm nejsou.
- Proč: nadpis "americká ETF" místo "NYSE" kvůli QQQ a poznámka to říká otevřeně. U každého čísla je zdroj a datum. Řazení podle symbolu je jednoznačné i dokud nejsou vyplněné názvy.
- [právní riziko]: sloupec "Dostupnost". Zda stačí "záleží na brokerovi" a zda je nutné i "ověřte".
- Sloupec s evropským ekvivalentem (UCITS) v první verzi není. VUAA není v `data/`.

## 4. Blok "Co uvádějí brokeři"

- Interactive Brokers na svých stránkách uvádí, že americká ETF jsou pro neprofesionální zákazníky z EHP a Spojeného království obecně blokována, protože nemají KID. (Znalostní báze IBKR, stránka bez data, načteno 9. 10. 2026.)
- Degiro na svých stránkách uvádí, že obecně nenabízí ETF bez KID v jazyce klienta a že se to týká nových nákupů. Stávající pozice lze podle stránek držet a prodat. Anglická stránka dodává, že americké produkty jsou dotčeny zvlášť. Česká stránka americká ETF nezmiňuje. (Helpdesk Degiro, česká a anglická stránka, obě bez data, načteno 9. 10. 2026.)
- Fio ve svém článku z 19. 1. 2022 uvádí, že klienti mohou americká ETF obchodovat bez omezení, ale bez poradenství a aktivní nabídky. Jmenuje VOO a IVV. Článek je starý, stav se mohl změnit. (Článek Fio, načteno 9. 10. 2026.)
- U XTB a Portu jsme k 9. 10. 2026 na jejich vlastních stránkách nenašli tvrzení k americkým ETF. Zeptejte se přímo u nich.
- Proč: vždy "broker uvádí", nikdy jako náš fakt. Rozpor mezi IBKR, Degiro a Fio stojí vedle sebe bez našeho verdiktu. U Degiro zůstává rozdíl mezi českou a anglickou stránkou, protože to zdroj říká a nic víc.
- [právní riziko]: parafráze Degiro a IBKR (aby "nenabízí" a "blokována" nezněly jako "nelze koupit") a věta o XTB a Portu.
- Záměrně vynecháno: Fio tvrdí, že ostatní brokeři americká ETF přestali nabízet (tvrzení o třetích stranách bez primárního zdroje), a jakákoli zmínka o ČNB (stanovisko je [neověřeno]).

## 5. Kalkulačka

- Nadpis: Kalkulačka poplatku fondu (TER)
- Podnadpis: Bez zhodnocení a bez poplatků brokera.
- Pole: Fond (výběr z pěti) | Měsíční vklad, Kč (výchozí 5 000) | Doba investování, roky (výchozí 10)
- Výsledek: Poplatek fondu za {n} let: {X} Kč. Z vložených {Y} Kč. Ilustrace, výpočet.
- Pod výsledkem: Je to jen poplatek fondu. Poplatky brokera, směna měn a daně v něm nejsou. Výsledek není předpověď.
- Věta s předpokladem: Předpoklad výpočtu: vkládáte na začátku každého měsíce. Každý měsíc se z držené hodnoty účtuje jedna dvanáctina ročního poplatku fondu (TER). Zhodnocení 0 %, bez poplatků brokera a směny měn.
- Proč: předpoklad stojí hned u výsledku a odpovídá vzorci z přílohy A strategie. Výchozí hodnoty vycházejí ze zdrojového vektoru a v textu jsou označené jako ilustrace.
- Zkontrolovat: věta se slovně liší od oddílu 4 strategie ("TER/12 měsíčně"). Význam musí být stejný, ověřit proti vzorci.

### Řádek "Pro představu" (vypočtená hodnota)

Řádek pod výsledkem. Není to pevný text: všechna čísla v něm se počítají za běhu.

> Pro představu, ilustrace, výpočet: při {vklad} Kč měsíčně po dobu {roky} let (vloženo {vloženo} Kč), bez zhodnocení a bez poplatků brokera, je rozdíl mezi nejnižším ({minTER}) a nejvyšším ({maxTER}) poplatkem fondu z této tabulky {rozdíl} Kč.

Jak se hodnoty počítají:

- `minTER` a `maxTER`: nejnižší a nejvyšší TER v tabulce, z hodnot v `etfs.ts`. Ten soubor v repozitáři zatím neexistuje, vzniká s tabulkou.
- `vklad` = 5 000 Kč, doba = 120 měsíců (10 let). Řádek je nezávislý na hodnotách zadaných do kalkulačky.
- `vloženo` = `vklad * 120`.
- `rozdíl` = výstup stejné funkce poplatku, kterou používá kalkulačka, pro `maxTER` minus výstup pro `minTER`. Žádná druhá implementace vzorce.
- Vzorec a konvence vkladu: příloha A v `docs/strategy.md` (`vklad * (TER / 12) * n * (n + 1) / 2`, vklad na začátku měsíce).
- Kontrola proti příloze A: se současnými daty (0,03 % a 0,18 %) vychází `5 445 - 907,50 = 4 537,50` Kč a vloženo 600 000 Kč. Tato hodnota patří do unit testu, ne do šablony textu. Změní-li se data v `etfs.ts`, změní se i číslo ve stránce.

- Proč: číslo má vlastní předpoklady přímo vedle sebe, takže se nemůže plést s výsledkem pro uživatelův scénář. Počítá se ze stejných dat a stejné funkce jako zbytek stránky, takže se nemůže rozejít s tabulkou.
- [právní riziko]: je to srovnání dvou konkrétních fondů, i když nejsou pojmenované. Posoudí [PROVOZOVATEL].

## 6. Formulář (zobrazí se po výsledku kalkulačky)

- Nadpis: Souhrn pro váš scénář
- Úvod: Po zadání e-mailu se na obrazovce zobrazí souhrn: částka, doba, všech pět fondů, rozpis po letech a otázky pro brokera. E-mailem ho neposíláme.
- Pole: E-mail (povinné), placeholder `jmeno@priklad.cz`
- Souhlas (checkbox): Souhlasím se zpracováním e-mailové adresy za účelem `[PROVOZOVATEL: účel]`. Správce: `[PROVOZOVATEL: název, kontakt]`. Souhlas mohu kdykoli odvolat na `[PROVOZOVATEL: kontakt]`.
- Tlačítko: Zobrazit souhrn
- Drobný text: Souhrn se vytvoří ve vašem prohlížeči. Zadanou částku a dobu neukládáme.
- Chyby: "Zadejte e-mail ve tvaru jmeno@domena.cz." / "Bez souhlasu souhrn zobrazit nemůžeme."
- Proč: text hned říká, co návštěvník dostane a co ne, protože brána je kosmetická (oddíl 3 strategie) a stránka to nezastírá. Věta "částku a dobu neukládáme" odpovídá schématu `leads` z oddílu 5 strategie.
- [právní riziko]: celý souhlas (účel, správce), věta "neukládáme" a verze textu (`consent_text_version = v1`).

## 7. Souhrn po odeslání

- Nadpis: Váš souhrn
- Řádek scénáře: Měsíční vklad {A} Kč, doba {N} let, vloženo celkem {B} Kč.
- Tabulka: pět fondů, poplatek fondu (TER), poplatek fondu za {N} let. Pod ní: Poplatek fondu po jednotlivých letech (rozpis).
- Pod tabulkou: Ilustrace, výpočet, při předpokladech uvedených u kalkulačky. Není to investiční doporučení.
- Otázky pro brokera:
  1. Mohu u vás jako neprofesionální zákazník koupit toto ETF (burzovní symbol)?
  2. Je pro nákup potřeba sdělení klíčových informací (KID)? Pokud ano, kde ho najdu?
  3. Jaké poplatky účtujete za nákup a držení?
  4. Je nutná směna měn a kolik stojí?
  5. Poskytujete k nákupu poradenství, nebo jen provedete můj pokyn?
- Tlačítko: Zkopírovat souhrn jako text. Po kliknutí: "Zkopírováno."
- Závěr: Souhrn vám e-mailem neposíláme, zůstane jen na této obrazovce. Zkopírujte si ho.
- Proč: souhrn dělá jen to, co jde spočítat v prohlížeči. Otázky pro brokera jsou otázky, ne tvrzení, takže nic nevymýšlejí a návštěvník s nimi může jít k libovolnému brokerovi.
- [právní riziko]: otázka 2 (dotýká se KID a ČNB bez našeho stanoviska) a otázka 5 (hranice k poradenství).

## 8. Poučení o rizicích a disclaimer

Obecně platné znění. Finální podobu určí [PROVOZOVATEL] nebo právník.

- Investování je spojeno s rizikem. Hodnota investice může klesat i stoupat a můžete získat zpět méně, než jste vložili.
- Tato stránka neuvádí ani neslibuje žádný výnos.
- Pokud fond obchoduje v jiné měně než koruna, působí na hodnotu vaší investice i kurz.
- Poplatek fondu (TER) je jen jedna ze složek nákladů. K němu se mohou přičíst poplatky brokera, směna měn a daně.
- Dostupnost amerických ETF se u brokerů a v čase liší. Údaje jsou načteny 9. 10. 2026 a mohou být zastaralé. Před nákupem je ověřte u svého brokera.
- Stránka je informativní. Není investičním poradenstvím ani doporučením koupit či prodat konkrétní fond.
- Daňové zacházení závisí na vaší situaci. Stránka ho neposuzuje.
- Provozovatel: `[PROVOZOVATEL: název, sídlo, kontakt]`.

Musí posoudit [PROVOZOVATEL]:

- finální znění celého bloku a zda stačí "není poradenství",
- zda je nutné označit stránku jako reklamní sdělení,
- identifikace provozovatele a jeho regulatorní status,
- věta o daních,
- umístění bloku na stránce,
- souhlas a `sessionStorage` (strategie, oddíl 10: [neověřeno]).

Proč: jen obecná a ověřitelná tvrzení, žádná čísla ani sliby. Nic o ČNB, o daních jen odkaz na situaci čtenáře.

## 9. Pořadí sekcí

Jedno pořadí pro A i B. Liší se jen hero a anchor CTA.

1. Hero: přebírá slib reklamy a do pár sekund říká, co návštěvník dostane.
2. Tabulka pěti ETF: hodnota je vidět celá před žádostí o kontakt, bez brány.
3. Co uvádějí brokeři: odpovídá na otázku z reklamy B a je krátká, takže ji návštěvník z reklamy A rychle přeskočí.
4. Kalkulačka: dává osobní výsledek a vytváří moment, kdy dává smysl žádat o kontakt.
5. Formulář, po odeslání souhrn: žádá o e-mail teprve po tabulce a výsledku kalkulačky (oddíl 3 strategie).
6. Poučení o rizicích: dosažitelné odkazem z hero, formuláře i reklamy; obsah je krátký a nevytahuje se před hodnotu.
7. Zdroje, provozovatel, patička: souhrn všech zdrojů a dat načtení pro kontrolu a důvěru.

Proč jedno pořadí: A/B test měří slib v reklamě a hero, ne dvě různé stránky.

## 10. Fráze k jazykové kontrole

Mohou znít jako překlad nebo rusismus či slovakismus. Doporučuji dát celý text přečíst rodilému mluvčímu.

| Fráze | Riziko | Alternativa |
|---|---|---|
| načteno 9. 10. 2026 | kalk z "retrieved/loaded" | zjištěno / zkontrolováno / stav k 9. 10. 2026 |
| neprofesionální zákazník | správně česky; hrozí zpětný kalk "retailový klient" | zůstat u "neprofesionální zákazník" |
| doba investování | v pořádku; "horizont" zní ruskeji | investiční horizont |
| činí poplatek | trochu úřední | stojí poplatek (ale viz oddíl 1: "stojí fond") |
| souhrn | v pořádku | shrnutí |
| Dá se koupit | hovorové, v reklamě přirozené | Lze koupit |
| nejde o investiční doporučení | v pořádku (rusismus "ne doporučení" se nepoužívá) | |
| Ukážeme (reklama B) | v pořádku | Najdete |
| záleží, dá se | společné pro češtinu i slovenštinu | |

## 11. Návrh termínů do glosáře

`docs/glossary-cs.md` v repozitáři není. Zatím jsem vycházel z termínů v `NOTES.md`. Navrhované nové termíny:

- broker (alternativa: obchodník s cennými papíry),
- neprofesionální zákazník (místo "retail"),
- kalkulačka, souhrn, měsíční vklad, doba investování, dostupnost, emitent,
- poplatek brokera, směna měn, kurz, zhodnocení,
- načteno (kdy zdroj čteme) a k datu (kdy údaj platí),
- poučení o rizicích, investiční doporučení.
