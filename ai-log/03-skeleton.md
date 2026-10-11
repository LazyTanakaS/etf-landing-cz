 ▐▛███▛█   Claude Code v2.1.295
▝▜██████▀  Sonnet 5.5 · Claude Pro
 ▝▝   ▝▝   ~/Desktop/Projects/etf-landing-cz


❯ /clear                                                                        

❯ Přečti CLAUDE.md, docs/strategy.md, data/etf-sources.md, data/availability.md 
  a docs/glossary-cs.md. Pracuj v plan mode, nepiš soubory, dokud neřeknu       
  "zapiš".                                                                      
                                                                                
  Úkol: navrhni české texty stránky a obou reklam podle strategie (sekce 2, 3,  
  4, 7).                                                                        
                                                                                
  Co potřebuji:                                                                 
  1. Reklama A a B: nadpis (do 40 znaků), hlavní text (do 125 znaků), CTA. Obě  
  drž v mezích sekce 7 (A poplatky, B dostupnost jako otázka).                  
  2. Hero stránky pro A a pro B: první obrazovka na mobilu musí navazovat na    
  slib reklamy a hned říct, co návštěvník dostane. H1, podnadpis, CTA, drobný   
  text pod CTA.                                                                 
  3. Popisky tabulky a kalkulačky (včetně věty s předpokladem ze sekce 4),      
  formulář (pole, tlačítko, souhlas), text souhrnu po odeslání.                 
  4. Blok o rizicích a disclaimer, obecně platné znění; označ, co musí posoudit 
  [PROVOZOVATEL].                                                               
  5. Pořadí sekcí stránky a jednovětné zdůvodnění každé (použiji do README).    
                                                                                
  Pravidla:                                                                     
  - Čísla jen z data/*.md nebo z přílohy A strategie (označ je "ilustrace,      
  výpočet"). Nic nevymýšlej, žádné odhady konverze ani počty uživatelů.         
  - Zakázáno: "nejlepší", "okrádají", "zaručeno", sliby výnosu, vykřičníky,     
  "odemkněte", falešné reference.                                               
  - Vykání, krátké věty, česky bez kalků z angličtiny. Používej jen termíny z   
  docs/glossary-cs.md; nové mi nejdřív navrhni.                                 
  - Ke každému textu uveď jednou větou, proč tak zní (pro README), a označ      
  formulace s právním rizikem.                                                  
  - Na konci zvlášť vypiš fráze, které mohou znít jako překlad nebo             
  rusismus/slovakismus, s alternativou.                                         
                                                                                
  Nejdřív mi ukaž návrh v odpovědi.                                             

⏺ Čtu soubory, které jste uvedl.

  Searched for 1 pattern, read 6 files, ran 3 shell commands (ctrl+o to expand)

⏺ Ничего не записал. Все тексты ниже на чешском, пояснения «Proč» тоже на
  чешском, чтобы их можно было перенести в README. Символы в лимитах проверены
  len().

  Что нашёл до начала

  1. docs/glossary-cs.md не существует. Единственный словарь в проекте это
     незакоммиченный список в NOTES.md (10 терминов). Я опирался на него. Новые
     термины перечислены в разделе 7.
  2. VUAA и «OCF 0,07 %» есть только в strategy.md и в ai-log/, но не в 
     data/*.md. По вашему правилу про числа я не ставлю 0,07 % в тексты. Ячейка
     помечена [doplnit z data/], пока строка не попадёт в etf-sources.md.
  3. Полных названий фондов в data/*.md нет, только тикеры. Названия я не
     подставлял. В таблице стоит [název z webu emitenta].
  4. ČNB в текстах нет. Fio ссылается на ČNB без первичного источника, а «ČNB
     povoluje» запрещено. Блок о брокерах цитирует только то, что Fio и IBKR
     пишут о себе.
  5. Охват брокеров: проверены только Interactive Brokers и Fio. Поэтому в
     рекламе B стоит «dva brokeři». Это честнее, чем «brokeři» вообще, но слабее
     как приманка (см. решение 1).

  1. Reklamy

  Nadpis (≤40)
  Reklama A (poplatky): Kolik činí poplatek fondu za 10 let? (36)
  Reklama B (dostupnost): Dá se americké ETF koupit u brokera? (36)
  ────────────────────────────────────────
  Hlavní text (≤125)
  Reklama A (poplatky): Pět amerických ETF, poplatek fondu (TER) u každého a
  výpočet na 10 let. Každé číslo má zdroj a datum. (101)
  Reklama B (dostupnost): Záleží na brokerovi. Ukážeme, co dva brokeři uvádějí
  na
  svých stránkách, a na co se svého brokera zeptat. (105)
  ────────────────────────────────────────
  CTA
  Reklama A (poplatky): Spočítat poplatek (tlačítko platformy: „Zjistit více“)
  Reklama B (dostupnost): Zobrazit tabulku (tlačítko platformy: „Zjistit více“)
  ────────────────────────────────────────
  Řádek s upozorněním (81)
  Reklama A (poplatky): Investice nesou riziko ztráty. Informativní obsah, nejde

  o investiční doporučení.
  Reklama B (dostupnost): stejný

  - Proč A: Otázka s horizontem z oddílu 7. V reklamě není číslo 4 537,50 Kč,
    protože předpoklady se do 125 znaků nevejdou. „Činí“ místo „stojí“ je
    záměrné: „stojí fond“ se dá číst jako cena fondu, a kalkulačka neříká „kolik
    vás to stojí celkem“.
  - Proč B: Otázka bez tvrzení o nedostupnosti, protože Fio uvádí opak. „Záleží
    na brokerovi“ je věta z tabulky, takže reklama a stránka říkají totéž.
  - [právní riziko]:
    - Věta „Záleží na brokerovi“ jako odpověď v reklamě.
    - Zda se řádek s upozorněním vejde do formátu reklamy a zda je pravidly
      platformy a [PROVOZOVATEL] považován za dostatečný.
    - Přesné seznamy tlačítek platforem jsem neověřoval.

  2. Hero stránky (první obrazovka na mobilu)

  Hero A (anchor tlačítka vede na kalkulačku)
  - H1: Kolik činí poplatek fondu za 10 let?
  - Podnadpis: Pět amerických ETF vedle sebe. U každého poplatek fondu (TER),
    zdroj a datum. Pod tabulkou kalkulačka.
  - CTA: Spočítat poplatek
  - Drobný text: Ilustrace, výpočet: 5 000 Kč měsíčně, 10 let, bez zhodnocení a
    bez poplatků brokera. Rozdíl mezi nejnižším a nejvyšším poplatkem fondu z
    těchto pěti: 4 537,50 Kč. Informativní obsah, nejde o investiční doporučení.
    Investice nesou riziko ztráty. [Poučení o rizicích]
  - Proč: H1 opakuje nadpis reklamy. Konkrétní číslo je pod CTA i s předpoklady,
    takže nevypadá jako slib. Hodnota (tabulka a kalkulačka) je pojmenovaná
    hned v podnadpisu.

  Hero B (anchor tlačítka vede na tabulku)
  - H1: Dá se americké ETF koupit u vašeho brokera?
  - Podnadpis: Záleží na brokerovi. Níže je pět amerických ETF v jedné tabulce a
    to, co o nich uvádějí Interactive Brokers a Fio.
  - CTA: Zobrazit tabulku
  - Drobný text: Citujeme brokery z jejich stránek, načteno 9. 10. 2026. Stav u
    konkrétního fondu si ověřte u svého brokera před nákupem. Informativní
    obsah, nejde o investiční doporučení. Investice nesou riziko ztráty.
    [Poučení o rizicích]
  - Proč: Odpověď „záleží“ je v první větě, bez čekání na scroll. Pojmenování
    obou brokerů říká poctivě, co stránka pokrývá, takže návštěvník s Degiro
    nebo XTB nebude zklamaný později.
  - [právní riziko]: jmenování Interactive Brokers a Fio v hero; „vašeho“
    brokera, protože stránka mluví jen o dvou.

  3. Tabulka, kalkulačka, formulář, souhrn

  Tabulka
  - Nadpis: Pět amerických ETF vedle sebe
  - Popisek řazení: Řazeno podle poplatku fondu (TER), od nejnižšího. Při
    stejném poplatku abecedně.
  - Sloupce: Burzovní symbol a název | Burza (podle stránky emitenta) | Poplatek
    fondu (TER) | Dostupnost | Evropský ekvivalent (UCITS)
  - Buňka TER (příklad): 0,03 %, k datu 28. 4. 2026. Zdroj: Vanguard,
    načteno 9. 10. 2026. IVV a SCHD: „datum na stránce neuvedeno“. U VTI: „údaj
    ze stránky fondu, prospekt neověřen“.
  - Buňka burza: NYSE Arca (IVV, SCHD) / Nasdaq (QQQ) / „neuvedeno“ (VOO, VTI)
  - Buňka dostupnost (všechny řádky): Záleží na brokerovi. Ověřte před nákupem.
  - Buňka UCITS: VUAA [doplnit z data/] u S&P 500; u ostatních „přímý ekvivalent
    neověřen“. Nejde o doporučení.
  - Pod tabulkou: QQQ je podle stránky emitenta kótován na Nasdaq, ne na NYSE.
    Poplatek fondu je jen jedna ze složek nákladů; poplatky brokera, směna měn a
    daně v něm nejsou.
  - Proč: Nadpis „americká ETF“ místo „NYSE“ kvůli QQQ, a poznámka to otevřeně
    říká. Zdroj a datum jsou u každého čísla, protože tak to požaduje CLAUDE.md.
  - [právní riziko]: sloupec „Dostupnost“, jestli „záleží na brokerovi“ nestačí
    a nutné je i „ověřte“.

  Blok „Co uvádějí brokeři“
  - Interactive Brokers na svých stránkách uvádí, že americká ETF jsou pro
    neprofesionální zákazníky z EHP a Spojeného království obecně blokována,
    protože nemají KID. (Znalostní báze IBKR, načteno 9. 10. 2026.)
  - Fio na svých stránkách uvádí, že klienti mohou americká ETF obchodovat bez
    omezení, ale bez poradenství a aktivní nabídky. Jmenuje VOO a IVV. (Článek
    Fio, načteno 9. 10. 2026, datum článku [doplnit].)
  - Další brokeři: U Degiro, XTB a Portu jsme k 9. 10. 2026 na jejich vlastních
    stránkách nenašli tvrzení k americkým ETF. Zeptejte se přímo u nich.
  - Proč: Vždy „broker uvádí“, nikdy jako náš fakt (oddíl 2). Rozpor IBKR a Fio
    stojí vedle sebe bez našeho verdiktu.
  - [právní riziko]: celý blok, hlavně parafráze IBKR (zda neznamená „nejde
    koupit“) a věta o Degiro, XTB, Portu.

  Kalkulačka
  - Nadpis: Kalkulačka poplatku fondu (TER)
  - Podnadpis: Bez zhodnocení a bez poplatků brokera.
  - Pole: Fond (výběr z pěti) | Měsíční vklad, Kč (výchozí 5 000) | Doba
    investování, roky (výchozí 10)
  - Výsledek: Poplatek fondu za {n} let: {X} Kč. Z vložených {Y} Kč. Ilustrace, 
    výpočet.
  - Pod výsledkem: Je to jen poplatek fondu. Poplatky brokera, směna měn a daně
    v něm nejsou. Výsledek není předpověď.
  - Věta s předpokladem: Předpoklad výpočtu: vkládáte na začátku každého měsíce.
    Každý měsíc se z držené hodnoty účtuje jedna dvanáctina ročního poplatku
    fondu (TER). Zhodnocení 0 %, bez poplatků brokera a směny měn.
  - Proč: Předpoklad stojí hned u výsledku a odpovídá vzorci z přílohy A.
    Výchozí hodnoty 5 000 Kč a 10 let jsou ze zdrojového vektoru, a v textu jsou
    označené jako ilustrace.
  - Zkontrolovat: Věta se slovně liší od oddílu 4 (tam „TER/12 měsíčně“). Význam
    by měl být stejný, ověřte proti vzorci.

  Formulář (zobrazí se po výsledku kalkulačky)
  - Nadpis: Souhrn pro váš scénář
  - Úvod: Po zadání e-mailu se na obrazovce zobrazí souhrn: částka, doba, všech
    pět fondů, rozpis po letech a otázky pro brokera. E-mailem ho neposíláme.
  - Pole: E-mail (povinné), placeholder jmeno@priklad.cz
  - Souhlas (checkbox): Souhlasím se zpracováním e-mailové adresy za účelem
    [PROVOZOVATEL: účel]. Správce: [PROVOZOVATEL: název, kontakt]. Souhlas mohu
    kdykoli odvolat na [PROVOZOVATEL: kontakt].
  - Tlačítko: Zobrazit souhrn
  - Drobný text: Souhrn se vytvoří ve vašem prohlížeči. Zadanou částku a dobu
    neukládáme.
  - Chyby: „Zadejte e-mail ve tvaru jmeno@domena.cz.“ / „Bez souhlasu souhrn
    zobrazit nemůžeme.“
  - Proč: Text hned říká, co návštěvník dostane a co ne, protože brána je
    kosmetická (oddíl 3) a stránka to nezastírá. Věta „částku a dobu neukládáme“
    odpovídá schématu leads z oddílu 5.
  - [právní riziko]: celý souhlas (účel, správce), věta „neukládáme“ a verze
    textu (consent_text_version = v1).

  Souhrn po odeslání
  - Nadpis: Váš souhrn
  - Řádek scénáře: Měsíční vklad {A} Kč, doba {N} let, vloženo celkem {B} Kč.
  - Tabulka: pět fondů, poplatek fondu (TER), poplatek fondu za {N} let. Pod ní:
    Poplatek fondu po jednotlivých letech (rozpis).
  - Pod tabulkou: Ilustrace, výpočet, při předpokladech uvedených u kalkulačky.
    Není to investiční doporučení.
  - Otázky pro brokera:
    a. Mohu u vás jako neprofesionální zákazník koupit toto ETF (burzovní
       symbol)?
    b. Je pro nákup potřeba sdělení klíčových informací (KID)? Pokud ano, kde ho
       najdu?
    c. Jaké poplatky účtujete za nákup a držení?
    d. Je nutná směna měn a kolik stojí?
    e. Poskytujete k nákupu poradenství, nebo jen provedete můj pokyn?
  - Tlačítko: Zkopírovat souhrn jako text. Po kliknutí: „Zkopírováno.“
  - Závěr: Souhrn vám e-mailem neposíláme, zůstane jen na této obrazovce.
    Zkopírujte si ho.
  - Proč: Souhrn dělá jen to, co jde spočítat v prohlížeči. Otázky pro brokera
    jsou otázky, ne tvrzení, takže nic nevymýšlejí a uživatel s nimi může jít k
    libovolnému brokerovi (i bez V2).
  - [právní riziko]: otázka 2 (dotýká se KID a ČNB bez našeho stanoviska) a
    otázka 5 (hranice k poradenství).

  4. Rizika a disclaimer (obecně platné znění)

  Poučení o rizicích
  - Investování je spojeno s rizikem. Hodnota investice může klesat i stoupat a
    můžete získat zpět méně, než jste vložili.
  - Tato stránka neuvádí ani neslibuje žádný výnos.
  - Pokud fond obchoduje v jiné měně než koruna, působí na hodnotu vaší
    investice i kurz.
  - Poplatek fondu (TER) je jen jedna ze složek nákladů. K němu se mohou přičíst
    poplatky brokera, směna měn a daně.
  - Dostupnost amerických ETF se u brokerů a v čase liší. Údaje jsou
    načteny 9. 10. 2026 a mohou být zastaralé. Před nákupem je ověřte u svého
    brokera.
  - Stránka je informativní. Není investičním poradenstvím ani doporučením
    koupit či prodat konkrétní fond.
  - Daňové zacházení závisí na vaší situaci. Stránka ho neposuzuje.
  - Provozovatel: [PROVOZOVATEL: název, sídlo, kontakt].

  Musí posoudit [PROVOZOVATEL]:
  - Finální znění celého bloku a zda stačí „není poradenství“.
  - Zda je nutné označit stránku jako reklamní sdělení.
  - Identifikace provozovatele a jeho regulatorní status.
  - Věta o daních.
  - Umístění bloku na stránce (viz oddíl 5).
  - Souhlas a sessionStorage (v oddílu 10 označeno [neověřeno]).

  Proč: Jen obecná a ověřitelná tvrzení, žádná čísla ani sliby. Hrubá chyba by
  byla tvrdit něco o ČNB nebo o daních, takže tam jsou jen odkazy na situaci
  čtenáře.

  5. Pořadí sekcí (jedno pro A i B, liší se jen hero a anchor CTA)

  1. Hero: přebírá slib reklamy a do pár sekund řekne, co návštěvník dostane.
  2. Tabulka pěti ETF: hodnota je vidět celá před žádostí o kontakt, bez brány.
  3. Co uvádějí brokeři: odpovídá na otázku z reklamy B a je krátká, takže ji
     návštěvník z A rychle přeskočí.
  4. Kalkulačka: dává osobní výsledek a vytváří moment, kdy dává smysl žádat o
     kontakt.
  5. Formulář, po odeslání souhrn: žádá o e-mail teprve po tabulce a výsledku
     kalkulačky (oddíl 3 strategie).
  6. Poučení o rizicích: dosažitelné z hero, formuláře i reklamy odkazem, obsah
     je krátký a nevytahuje se před hodnotu.
  7. Zdroje, provozovatel, patička: souhrn všech zdrojů a dat načtení pro
     kontrolu a důvěru.

  Jedno pořadí a jen jiné hero znamená, že A/B test měří slib, ne dvě různé
  stránky.

  6. Fráze, které mohou znít jako překlad nebo rusismus/slovakismus

  ┌────────────────────┬──────────────────────────┬─────────────────────────┐
  │       Fráze        │          Riziko          │       Alternativa       │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ americké ETF / „ta │ rod slova není ustálený; │ vybrat jeden rod a      │
  │  ETF“ vs. „ten     │  ruština nutí k mužskému │ držet ho všude;         │
  │ ETF“               │  („ETF-ы“)               │ strategie používá       │
  │                    │                          │ střední                 │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ načteno 9. 10.     │ kalk z                   │ zjištěno /              │
  │ 2026               │ „retrieved/loaded“       │ zkontrolováno / stav k  │
  │                    │                          │ 9. 10. 2026             │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ neprofesionální    │ správně česky; hrozí     │ zůstat u                │
  │ zákazník           │ zpětný kalk „retailový   │ „neprofesionální        │
  │                    │ klient“                  │ zákazník“               │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │                    │ OK; „horizont“ je        │ doba investování /      │
  │ doba investování   │ legitimní, ale zní       │ investiční horizont     │
  │                    │ ruskeji                  │                         │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ činí poplatek      │ trochu úřední            │ stojí poplatek (ale viz │
  │                    │                          │  „kolik stojí fond“)    │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ souhrn             │ OK                       │ shrnutí                 │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ Dá se koupit       │ hovorové, ale přirozené  │ Lze koupit              │
  │                    │ v reklamě                │                         │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ ne investiční      │ rusismus „ne X“          │ nejde o investiční      │
  │ doporučení         │                          │ doporučení (použito)    │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ kótován na         │ český termín, ale ruské  │ obchoduje se na         │
  │                    │ „котируется“             │                         │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ vedle sebe         │ OK                       │ srovnání / vedle sebe   │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ zeptat se svého    │ OK                       │ zeptat se u svého       │
  │ brokera            │                          │ brokera                 │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ zobrazit           │ OK                       │ ukázat (méně formální)  │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ Ukážeme (v reklamě │ OK                       │ Najdete (neslibujeme za │
  │  B)                │                          │  nás)                   │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ Podívejte se, co   │ OK                       │ Zjistěte, co uvádějí    │
  │ uvádějí            │                          │                         │
  ├────────────────────┼──────────────────────────┼─────────────────────────┤
  │ kalkulačka         │ OK                       │ kalkulátor              │
  └────────────────────┴──────────────────────────┴─────────────────────────┘

  Slovakismů vidím málo, ale „záleží“ a „dá se“ jsou společné pro češtinu i
  slovenštinu. Pro kontrolu stojí za to dát celý text rodilému mluvčímu.

  7. Návrh termínů do glosáře (zatím nemáme)

  - broker: používám jako v strategy.md (alternativa „obchodník s cennými
    papíry“).
  - neprofesionální zákazník: místo „retail“.
  - kalkulačka, souhrn, měsíční vklad, doba investování, dostupnost, emitent:
    používám jako obecná slova.
  - poplatek brokera, směna měn, kurz, zhodnocení: použito v předpokladu a v
    rizicích.
  - evropský ekvivalent (UCITS): dle strategy.md.
  - načteno / k datu: dvě různá data (kdy zdroj čteme × kdy údaj platí).
  - poučení o rizicích, investiční doporučení: pro disclaimer.
  - OCF (průběžné poplatky): až bude VUAA v data/.

  8. Rozhodnutí na vás

  1. Reklama B: „dva brokeři“ (poctivé, užší) vs. „brokeři“ (širší sliby, ale
     návštěvník s Degiro najde prázdno). Doporučuji „dva brokeři“.
  2. Číslo 4 537,50 Kč v hero A: nechat jako ilustraci pod CTA (konkrétní, ale
     přitahuje právní pozornost) vs. přesunout jen do kalkulačky. Doporučuji
     nechat.
  3. Rod slova „ETF“: střední (jako teď) vs. mužský. Rozhodnout jednou.
  4. Tvrdé řazení: při stejném TER abecedně, nebo ručně (např. podle toho, co
     víme o fondu)? Abecedně je neutrální.
  5. VUAA 0,07 %: zapsat do data/etf-sources.md s odkazem a datem, nebo ve
     sloupci UCITS zatím vynechat?

  Když řeknete „zapiš“, uložím schválené texty (kam, to mi napište: např.
  docs/copy-cs.md).

✻ Cooked for 4m 37s · done Friday 4:01 PM

※ recap: Цель: подготовить чешские тексты лендинга и двух реклам по стратегии. Черновик уже показан в ответе, файлы не записаны. Следующий шаг: ответьте на пять решений из раздела 8 и напишите «zapiš», а я сохраню тексты, например в docs/copy-cs.md.

❯ Rozhodnutí a opravy:                                                          
  1. Degiro: přečti aktualizovaný data/availability.md. Degiro na obou          
  stránkách uvádí, že bez KID v místním jazyce ETF obecně nenabízí; anglická    
  stránka dodává, že americké produkty jsou zasaženy zvlášť. Oprav blok "Co     
  uvádějí brokeři": věta, že jsme nenašli tvrzení, platí už jen pro XTB a       
  Portu.                                                                        
  2. Reklama B a hero B bez počtu brokerů: "Ukážeme, co brokeři uvádějí na      
  svých stránkách, a na co se zeptat u svého brokera."                          
  3. Hero A: drobný text zkrať na jednu větu s upozorněním. Číslo 4 537,50 Kč   
  přesuň ke kalkulačce. Podnadpis nesmí říkat "Pod tabulkou kalkulačka" (pořadí 
  je tabulka, brokeři, kalkulačka).                                             
  4. Rod: střední, jednotné "americké ETF", množné "americká ETF". Drž ho       
  všude.                                                                        
  5. Řazení při stejném TER abecedně.                                           
  6. Sloupec UCITS pro první verzi vynech; VUAA není v data/.                   
  7. Slovo "kalkulačka" ani "kótován" neměň.                                    
  8. Datum článku Fio zůstává [doplnit], doplním sám.                           
     Ukaž mi jen opravené části, zatím nezapisuj.                               

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Přečetl jsem aktualizovaný data/availability.md. Degiro tam má teď stav
  „obecně žádná ETF bez KID v jazyce klienta, nové nákupy dotčeny“ a obě stránky
  jsou bez data. Ničeho jsem nezapsal. Níže jsou jen změněné části.

  1. Reklama B

  - Nadpis: Dá se americké ETF koupit u brokera? (36, beze změny)
  - Hlavní text: Záleží na brokerovi. Ukážeme, co brokeři uvádějí na svých
    stránkách, a na co se zeptat u svého brokera. (103, v limitu)
  - CTA: beze změny.

  2. Hero B

  - H1: beze změny.
  - Podnadpis: Záleží na brokerovi. Níže je pět amerických ETF v jedné tabulce a
    to, co o nich brokeři uvádějí na svých stránkách.
  - Drobný text: beze změny.
  - Změna oproti minulému návrhu: Jmenovitě jsem vypustil Interactive Brokers a
    Fio. Dvojice jmen by dál naznačovala, že stránka pokrývá jen dva brokery,
    což už neplatí.
  - Proč: Hero slibuje to, co blok pod tabulkou skutečně obsahuje, a nepočítá
    brokery.
  - Poznámka: „U vašeho brokera“ v H1 zůstává, ale pokrytí je pořád jen částečné
    (IBKR, Degiro, Fio; XTB a Portu ne). Je to stejné riziko jako dřív.

  3. Hero A

  - H1: Kolik činí poplatek fondu za 10 let?
  - Podnadpis: Pět amerických ETF vedle sebe. U každého poplatek fondu (TER),
    zdroj a datum. A kalkulačka, která poplatek spočítá pro vaši částku.
  - CTA: Spočítat poplatek (anchor na kalkulačku)
  - Drobný text (jedna věta): Informativní obsah, nejde o investiční doporučení
    a investice nesou riziko ztráty. [Poučení o rizicích]
  - Proč: Podnadpis už nemluví o pořadí na stránce, jen říká, co návštěvník
    dostane. Číslo se přesunulo ke kalkulačce, kde je u něj místo na
    předpoklady.

  4. Číslo 4 537,50 Kč u kalkulačky

  Pevný řádek pod výsledkem, nezávislý na zadaných hodnotách:

  ▎ Pro představu, ilustrace, výpočet: při 5 000 Kč měsíčně po dobu 10 let 
  ▎ (vloženo 600 000 Kč), bez zhodnocení a bez poplatků brokera, je rozdíl mezi 
  ▎ nejnižším (0,03 %) a nejvyšším (0,18 %) poplatkem fondu z této tabulky 4 
  ▎ 537,50 Kč.

  - Proč: Číslo má vlastní předpoklady přímo vedle sebe, takže se nemůže plést s
    výsledkem pro uživatelův scénář. Hodnoty 0,03 % a 0,18 % jsou z
    data/etf-sources.md, rozdíl z přílohy A (5 445 − 907,50).
  - [právní riziko]: Je to srovnání dvou konkrétních fondů, i když nejsou
    pojmenované. Posoudí [PROVOZOVATEL].

  5. Blok „Co uvádějí brokeři“ (opravený, rod jednotný)

  - Interactive Brokers na svých stránkách uvádí, že americká ETF jsou pro
    neprofesionální zákazníky z EHP a Spojeného království obecně blokována,
    protože nemají KID. (Znalostní báze IBKR, stránka bez data,
    načteno 9. 10. 2026.)
  - Degiro na svých stránkách uvádí, že obecně nenabízí ETF bez KID v jazyce
    klienta a že se to týká nových nákupů. Stávající pozice lze podle stránek
    držet a prodat. Anglická stránka dodává, že americké produkty jsou dotčeny
    zvlášť. Česká stránka americká ETF nezmiňuje. (Helpdesk Degiro, česká a
    anglická stránka, obě bez data, načteno 9. 10. 2026.)
  - Fio na svých stránkách uvádí, že klienti mohou americká ETF obchodovat bez
    omezení, ale bez poradenství a aktivní nabídky. Jmenuje VOO a IVV. (Článek
    Fio, datum článku [doplnit], načteno 9. 10. 2026.)
  - XTB a Portu: U XTB a Portu jsme k 9. 10. 2026 na jejich vlastních stránkách
    nenašli tvrzení k americkým ETF. Zeptejte se přímo u nich.

  Proč:
  - U Degiro je zachovaný rozdíl mezi českou a anglickou stránkou, protože to je
    přesně to, co zdroj říká, a nic víc. Stávající pozice jsou doplněné z
    poznámek, protože bez nich by věta „nabízí“ zněla tvrději, než zdroj říká.
  - Věta „nenašli jsme“ platí už jen pro XTB a Portu.
  - Rod: „americká ETF“ je v celém bloku střední rod množného čísla. Ostatní
    texty z minulé verze už vyhovují (singulár „americké ETF“, „toto ETF“ v
    otázce 1).

  [právní riziko]:
  - Parafráze Degiro a jejich formulace „nenabízí“ (aby nezněla jako „nelze
    koupit“).
  - Věta pro XTB a Portu.
  - Záměrně jsem vynechal Fio tvrzení, že ostatní brokeři americká ETF přestali
    nabízet. Je to tvrzení o třetích stranách bez primárního zdroje.

  6. Tabulka bez sloupce UCITS

  - Sloupce (4): Burzovní symbol a název | Burza (podle stránky emitenta) |
    Poplatek fondu (TER) | Dostupnost
  - Popisek řazení: Řazeno podle poplatku fondu (TER), od nejnižšího. Při
    stejném poplatku abecedně podle symbolu.
  - Pořadí řádků: IVV, VOO, VTI (0,03 %), SCHD (0,06 %), QQQ (0,18 %).
  - Odstraněno: sloupec „Evropský ekvivalent (UCITS)“ a věta „Nejde o
    doporučení“, která k němu patřila.
  - Proč: Řazení podle symbolu je jednoznačné i dokud nejsou vyplněné názvy
    fondů.
  - Poznámka k dokumentům: V docs/strategy.md (oddíl 2) a v README je UCITS
    sloupec pořád popsaný. Při zápisu to sladit, jinak se zdokumentovaný rozsah
    rozejde s kódem.

  7. Co se nemění

  - „Kalkulačka“ a „kótován“ zůstávají.
  - Datum článku Fio je [doplnit].
  - Rod: střední, všude „americké ETF“ (jednotné číslo) a „americká ETF“
    (množné). V seznamu rusismů z minulé odpovědi tím odpadá řádek o rodu,
    rozhodnuto.

  Chcete-li, zapíšu texty po vašem „zapiš“.

✻ Cooked for 47s · done Friday 4:22 PM

※ recap: Cílem je navrhnout české texty stránky a obou reklam podle strategie; opravené části (Degiro, reklama B, hero A, tabulka bez UCITS) jsem ukázal, ale nic nezapsal. Další krok: napište "zapiš" a uložím texty, případně mi řekněte cílový soubor.

❯ Zapiš. Texty ulož do docs/copy-cs.md. Dvě úpravy před zápisem:                
  1. Číslo 4 537,50 Kč nesmí být pevný text. Ve stránce se musí počítat stejnou 
  funkcí jako kalkulačka z hodnot v etfs.ts (rozdíl nejvyššího a nejnižšího     
  TER v tabulce, vklad 5 000 Kč, 120 měsíců). Do docs/copy-cs.md napiš, že jde  
  o vypočtenou hodnotu, a uveď odkaz na přílohu A.                              
  2. Do docs/strategy.md přidej na konec krátký oddíl "Změny po session copy"   
  (sloupec UCITS vypuštěn, počet brokerů z reklam odstraněn, číslo přesunuto ke 
  kalkulačce). Existující text neměň.                                           
     Po zápisu mi vypiš, které soubory jsi změnil.                              

⏺ Updated plan
  ⎿  /plan to preview

⏺ User approved Claude's plan
  ⎿  Plan saved to: 
     ~/.claude/plans/pasted-content-id-248c-p-e-ti-claude-md-piped-curry.md · 
     /plan to edit
     Plan: write approved Czech copy

     Context

     The author approved the Czech copy drafts (ads A/B, heroes, table,
     calculator, form, summary, risks, section order) and said "zapiš".

     Steps

     1. Create docs/copy-cs.md with the approved copy (Czech texts, short "Proč"
        notes, [právní riziko] and [PROVOZOVATEL] markers). The 4 537,50 Kč
        figure is documented as a computed value (max minus min TER in etfs.ts,
        deposit 5 000 Kč, 120 months, same function as the calculator), with a
        reference to Appendix A of docs/strategy.md; it is not fixed text.
     2. Append section "Změny po session copy" to the end of docs/strategy.md
        (UCITS column dropped, broker count removed from ads, number moved to
        the calculator). Existing text is not changed.
     3. No commit.

     Verification

     git status / git diff --stat show only these two files; list them to the
     author.

⏺ Write(docs/copy-cs.md)
  ⎿  Wrote 192 lines to docs/copy-cs.md
       1 # České texty stránky a reklam
       3 Stav: návrh odsouhlasený autorem, zdroj pravdy pro texty. Rozhod
       4 Navazuje na `docs/strategy.md` (oddíly 2, 3, 4, 7). Čísla jsou j
         en z `data/*.md` nebo z přílohy A strategie.
         OZOVATEL] nebo právník. `[doplnit]` = chybí údaj, který doplní a
       6 Řádky "Proč" jsou podklad pro README.
       8 Pravidla textů: vykání, krátké věty, bez vykřičníků. Zakázáno: "
         nejlepší", "okrádají", "zaručeno", "odemkněte", sliby výnosu, fa
       9 Rod: ETF je střední rod. Jednotné číslo "americké ETF", množné "
      10 Slova "kalkulačka" a "kótován" se nemění.
     … +314 lines (ctrl+o to expand)

⏺ Update(docs/strategy.md)
  ⎿  Added 8 lines
      154  Pro srovnání, konvence konce měsíce při n = 120 a TER 0,03 % /
            0,06 % / 0,18 %: 892,50 / 1 785 / 5 355 Kč (rozdíl 0,18 % vs 
           0,03 %: 4 462,50 Kč místo 4 537,50 Kč).
      155  
      156  Hodnoty v tabulce jsou výpočet z uvedeného vzorce, ne data o f
           ondech.
      157 +                                                              
      158 +## Změny po session copy                                      
      159 +                                                              
      160 +Texty jsou v `docs/copy-cs.md`. Oproti oddílům 2, 4 a 7 platí:
      161 +                                                              
      162 +- Sloupec "evropský ekvivalent (UCITS)" je v první verzi vypuš
          +těn. VUAA není v `data/`. Tabulka má 4 sloupce.               
      163 +- Reklamy ani hero nezmiňují počet ani jména brokerů. Pokrytí 
          +je částečné: doložené jsou Interactive Brokers, Degiro a Fio, 
          +u XTB a Portu stránka uvádí, že jsme nic nenašli.             
      164 +- Číslo rozdílu mezi nejnižším a nejvyšším TER (v ilustraci 4 
          +537,50 Kč) je přesunuto ke kalkulačce a není to pevný text. Po
          +čítá se za běhu stejnou funkcí jako kalkulačka z hodnot v `etf
          +s.ts` (vklad 5 000 Kč, 120 měsíců). Vzorec: příloha A.        

  Ran 1 shell command (ctrl+o to expand)

⏺ Записал два файла. Ничего не коммитил.

  Изменённые файлы
  - docs/copy-cs.md (новый): все утверждённые тексты в 11 разделах: рекламы,
    hero A и B, таблица, блок о брокерах, калькулятор, форма, итоговый экран,
    риски, порядок секций, список фраз для языковой проверки и предложения для
    глоссария.
  - docs/strategy.md: в конец добавлен раздел «Změny po session copy», старый
    текст не тронут. В нём три пункта: UCITS-столбец убран, число брокеров из
    реклам убрано, число перенесено к калькулятору.

  Число 4 537,50 Kč
  - В copy-cs.md (раздел 5) это шаблон с подстановками {minTER}, {maxTER},
    {rozdíl}, {vloženo}, а не фиксированный текст.
  - Там же написано, что значение вычисляется той же функцией, что и
    калькулятор. Исходные данные: etfs.ts, вклад 5 000 Kč, 120 месяцев.
  - Ссылка на приложение A в strategy.md стоит. Результат на текущих данных (4
    537,50 Kč) помечен как значение для unit-теста, а не для текста.

  На что обратить внимание
  - etfs.ts в репозитории пока нет. Я так и написал в документе: файл появится
    вместе с таблицей.
  - docs/glossary-cs.md по-прежнему отсутствует. Термины из NOTES.md
    использованы, новые перечислены в разделе 11.
  - Названия фондов в таблице остались как [název z webu emitenta], дата статьи
    Fio как [doplnit], а [PROVOZOVATEL] — в согласии, риск-блоке и реквизитах.

✻ Brewed for 1m 10s · done Friday 4:27 PM

※ recap: Цель: чешские тексты лендинга по ETF и двух реклам. Они записаны в docs/copy-cs.md, а в strategy.md добавлен раздел об изменениях, коммита нет. Следующий шаг: просмотреть оба файла и решить, коммитить ли их.

❯ Doplň do docs/copy-cs.md datum článku Fio: 19. 1. 2022. Ve větě o Fio ho uveď 
  přímo v textu a přidej, že je článek starý a stav se mohl změnit. Návrh       
  znění: "Fio ve svém článku z 19. 1. 2022 uvádí, že klienti mohou americká ETF 
  obchodovat bez omezení, ale bez poradenství a aktivní nabídky. Jmenuje VOO a  
  IVV. Článek je starý, stav se mohl změnit. (Článek Fio, načteno 9. 10.        
  2026.)" Zároveň do rizik v docs/strategy.md (v oddílu "Změny po session       
  copy") přidej: důkaz pro Fio je z roku 2022. Existující text neměň. Ukaž mi   
  jen změněné řádky.                                                            

⏺ Update(docs/copy-cs.md)
  ⎿  Added 1 line, removed 1 line
      62  
      63  - Interactive Brokers na svých stránkách uvádí, že americká ETF
           jsou pro neprofesionální zákazníky z EHP a Spojeného královstv
          í obecně blokována, protože nemají KID. (Znalostní báze IBKR, s
          tránka bez data, načteno 9. 10. 2026.)
      64  - Degiro na svých stránkách uvádí, že obecně nenabízí ETF bez K
          ID v jazyce klienta a že se to týká nových nákupů. Stávající po
          zice lze podle stránek držet a prodat. Anglická stránka dodává,
           že americké produkty jsou dotčeny zvlášť. Česká stránka americ
          ká ETF nezmiňuje. (Helpdesk Degiro, česká a anglická stránka, o
          bě bez data, načteno 9. 10. 2026.)
      65 -- Fio na svých stránkách uvádí, že klienti mohou americká ETF o
         -bchodovat bez omezení, ale bez poradenství a aktivní nabídky. J
         -menuje VOO a IVV. (Článek Fio, datum článku `[doplnit]`, načten
         -o 9. 10. 2026.)                                                
      65 +- Fio ve svém článku z 19. 1. 2022 uvádí, že klienti mohou amer
         +ická ETF obchodovat bez omezení, ale bez poradenství a aktivní 
         +nabídky. Jmenuje VOO a IVV. Článek je starý, stav se mohl změni
         +t. (Článek Fio, načteno 9. 10. 2026.)                          
      66  - U XTB a Portu jsme k 9. 10. 2026 na jejich vlastních stránkác
          h nenašli tvrzení k americkým ETF. Zeptejte se přímo u nich.
      67  - Proč: vždy "broker uvádí", nikdy jako náš fakt. Rozpor mezi I
          BKR, Degiro a Fio stojí vedle sebe bez našeho verdiktu. U Degir
          o zůstává rozdíl mezi českou a anglickou stránkou, protože to z
          droj říká a nic víc.
      68  - [právní riziko]: parafráze Degiro a IBKR (aby "nenabízí" a "b
          lokována" nezněly jako "nelze koupit") a věta o XTB a Portu.

⏺ Update(docs/strategy.md)
  ⎿  Added 1 line
      162  - Sloupec "evropský ekvivalent (UCITS)" je v první verzi vypuš
           těn. VUAA není v `data/`. Tabulka má 4 sloupce.
      163  - Reklamy ani hero nezmiňují počet ani jména brokerů. Pokrytí 
           je částečné: doložené jsou Interactive Brokers, Degiro a Fio, 
           u XTB a Portu stránka uvádí, že jsme nic nenašli.
      164  - Číslo rozdílu mezi nejnižším a nejvyšším TER (v ilustraci 4 
           537,50 Kč) je přesunuto ke kalkulačce a není to pevný text. Po
           čítá se za běhu stejnou funkcí jako kalkulačka z hodnot v `etf
           s.ts` (vklad 5 000 Kč, 120 měsíců). Vzorec: příloha A.
      165 +- Riziko: důkaz pro Fio je z roku 2022 (článek z 19. 1. 2022).
          + Stav se mohl změnit, stránka to u citace uvádí.              

⏺ Изменил по одной строке в двух файлах. Не коммитил.

  docs/copy-cs.md, блок «Co uvádějí brokeři», строка про Fio (раньше было datum 
  článku [doplnit]):
  - Fio ve svém článku z 19. 1. 2022 uvádí, že klienti mohou americká ETF 
  obchodovat bez omezení, ale bez poradenství a aktivní nabídky. Jmenuje VOO a 
  IVV. Článek je starý, stav se mohl změnit. (Článek Fio, načteno 9. 10. 2026.)
  Формулировка ваша, слово в слово.

  docs/strategy.md, раздел «Změny po session copy», новый последний пункт:
  - Riziko: důkaz pro Fio je z roku 2022 (článek z 19. 1. 2022). Stav se mohl 
  změnit, stránka to u citace uvádí.
  Старый текст не менял. В strategy.md в разделе 2 всё ещё стоит «datum článku
  doplní autor», я оставил это как есть, потому что вы просили не править
  существующий текст.

  Предупреждаю о возможном противоречии. Hero B пишет «načteno 9. 10. 2026» без
  привязки к Fio, а блок теперь честно показывает 2022. Это не ошибка, но если
  захотите, можно в hero уточнить, что часть источников старше.

✻ Baked for 16s · done Friday 4:43 PM

❯ /export ai-log/02-copy.md                                                     
  ⎿  Conversation exported to:
     /Users/tanaka/Desktop/Projects/etf-landing-cz/ai-log/02-copy.md

※ recap: Мы пишем чешские тексты лендинга про американские ETF и две рекламы. Они уже записаны в docs/copy-cs.md, дата статьи Fio внесена, и ничего не закоммичено. Следующий шаг: проверьте оба файла и скажите, коммитить ли.

❯ /effort medium                                                                  ⎿  Set effort level to medium (saved as your default for new sessions):
     Balanced approach with standard implementation and testing

❯ Přečti CLAUDE.md, docs/strategy.md, docs/copy-cs.md, data/etf-sources.md a    
  data/availability.md. Nejdřív v plan mode napiš plán a nic nevytvářej, dokud  
  neřeknu "zapiš".                                                              
                                                                                
  Cíl této session: kostra aplikace a první nasazení, ne celá stránka.          
  Udělej:                                                                       
  1. Vite + React + TypeScript v kořeni repozitáře (šablona react-ts). Bez      
  dalších závislostí.                                                           
  2. src/data/etfs.ts: pět ETF, hodnoty jen z data/etf-sources.md (burza, TER,  
  datum "k", URL zdroje, datum načtení). Co v souboru chybí, je null s          
  komentářem. Nic nedoplňuj z paměti. Název fondu: null.                        
  3. Jedna stránka, mobile-first (375 px, potom 1440 px): hero A (texty z       
  docs/copy-cs.md), tabulka se čtyřmi sloupci řazená podle TER, při stejném TER 
  abecedně podle symbolu, a patička s poučením o rizicích.                      
  4. Žádná kalkulačka, formulář, Supabase ani měření.                           
     Pravidla: texty přesně z docs/copy-cs.md; žádný fialový gradient; písmo    
  zatím systémové; semantické HTML; viditelný focus.                            
     Nedělej: nic mimo tuto kostru, žádné nové závislosti, žádné úpravy data/ a 
  docs/.                                                                        
     Stop: zeptej se před přidáním závislosti nebo úpravou konfigurace mimo     
  šablonu Vite.                                                                 
     Hotovo: npm run build a npm run lint projdou a tabulka je čitelná na 375   
  px bez horizontálního posunu. Po každém kroku napiš, co je hotové; na konci   
  vypiš změněné soubory a skutečný výstup build a lint.                         

  Read 1 file, ran 2 shell commands (ctrl+o to expand)

⏺ Přečetl jsem CLAUDE.md, docs/copy-cs.md (oddíly 1 až 5 jsem četl znovu),
  data/etf-sources.md, docs/strategy.md ze začátku konverzace i
  data/availability.md. availability.md do kostry nejde, protože blok o
  brokerech tato session nedělá. Nic jsem nevytvořil. Nástroje: Node 26.9.0, npm
  11.19.1.

  Plán

  Krok 1 – šablona Vite (základ)
  - Do kořene repozitáře jde šablona react-ts tak, aby nic nepřepsala. Nejdřív
    ji vygeneruji do dočasné složky mimo repozitář a zkopíruji soubory. Vite by
    jinak při neprázdné složce spustil interaktivní otázku.
  - npm install, potom npm run build a npm run lint na holé šabloně jako výchozí
    stav.
  - Hlášení: co je hotové a co vyšlo.

  Krok 2 – úklid šablony
  - Smažu demo: App.css, src/assets/react.svg, public/vite.svg a odkaz na ni v
    index.html, boilerplate v index.css.
  - V index.html nastavím lang="cs" a <title> na H1 z copy (viz otázky).
  - Konfiguraci mimo šablonu (vite.config.ts, tsconfig*, eslint.config.js)
    neměním.

  Krok 3 – src/data/etfs.ts
  - Typ Etf: ticker, name: string | null, exchange: string | null, ter (zlomek,
    např. 0.0003, ve stejné konvenci jako příloha A), terAsOf: string | null,
    sourceName, sourceUrl, retrievedOn.
  - Ukládám jen to, co je v data/etf-sources.md:

  ┌────────┬────────────────────────────┬─────────────────┬──────────────────┐
  │ Ticker │          exchange          │       ter       │     terAsOf      │
  ├────────┼────────────────────────────┼─────────────────┼──────────────────┤
  │ VOO    │ null ("not shown on page") │ 0.0003          │ 2026-04-28       │
  ├────────┼────────────────────────────┼─────────────────┼──────────────────┤
  │ IVV    │ "NYSE Arca"                │ 0.0003          │ null ("no date   │
  │        │                            │                 │ on page")        │
  ├────────┼────────────────────────────┼─────────────────┼──────────────────┤
  │ VTI    │ null ("not shown on page") │ 0.0003          │ 2026-04-28       │
  ├────────┼────────────────────────────┼─────────────────┼──────────────────┤
  │        │ "Nasdaq" (zdroj:           │                 │                  │
  │ QQQ    │ "Nasdaq/NMS (Global        │ 0.0018          │ 2026-10-08       │
  │        │ Market)")                  │                 │                  │
  ├────────┼────────────────────────────┼─────────────────┼──────────────────┤
  │ SCHD   │ "NYSE Arca"                │ 0.0006 (zdroj   │ null             │
  │        │                            │ píše 0.060 %)   │                  │
  └────────┴────────────────────────────┴─────────────────┴──────────────────┘

  - name je všude null s komentářem, že názvy se doplní z webu emitenta.
  - retrievedOn je všude 2026-10-09. Pro VTI přidám příznak terDisputed: true,
    protože copy má u něj poznámku o neověřeném prospektu.
  - Řazení (TER vzestupně, při shodě abecedně podle symbolu) bude malá čistá
    funkce vedle dat, ne v komponentě. Tady patří první unit test, až budeme
    smět přidat Vitest.

  Krok 4 – stránka (App.tsx plus malé komponenty Hero, EtfTable, Footer, bez 
  knihoven)
  - Hero A: H1, podnadpis, CTA a drobný text přesně z oddílu 2. Odkaz "Poučení o
    rizicích" vede na #rizika.
  - Tabulka (čtyři sloupce):
    - Nadpis a popisek řazení z oddílu 3, přes <caption>.
    - Hlavička: Burzovní symbol a název, Burza (podle stránky emitenta),
      Poplatek fondu (TER), Dostupnost.
    - TER se formátuje přes Intl (cs-CZ): 0,03 % a datum 28. 4. 2026.
    - Chybějící burza se zobrazí jako "neuvedeno", chybějící datum jako "datum
      na stránce neuvedeno".
    - Pod tabulkou je věta o QQQ a poplatcích brokera.
  - Footer id="rizika": Poučení o rizicích z oddílu 8 včetně řádku
    [PROVOZOVATEL: …].
  - Semantické HTML: header/main/section/footer, h1/h2, skutečná <table>, odkazy
    se zdrojem.

  Krok 5 – CSS (jeden soubor, mobile-first)
  - Systémové písmo, tokeny na :root, žádný gradient, :focus-visible s
    viditelným obrysem, světlé schéma.
  - Od 375 px: tabulka se na úzké obrazovce přeskládá do karet (řádek pod sebou,
    popisek sloupce z data-label) a role table/row/cell doplním ARIA atributy,
    aby se sémantika neztratila. Čtyři sloupce se do 343 px čitelně nevejdou.
  - Od zhruba 640 px běžná tabulka. Kontrola 1440 px s omezenou šířkou obsahu.

  Krok 6 – ověření
  - npm run build a npm run lint, skutečný výstup do reportu.
  - Šířka 375 px: kontrola, že nejsou vodorovné posuvníky (scrollWidth <= 
    clientWidth), a screenshoty 375 px a 1440 px. Použiji headless Chrome, který
    už máte, nebo built-in browser. Žádná nová závislost.

  Na konci: seznam změněných souborů a celý výstup buildu a lintu. Žádný commit,
  dokud neřeknete. Pak navrhnu /export ai-log/03-skeleton.md. Pracujeme v
  režimu výjimky z oddílu 9 strategie (AI píše kód v tomto projektu).

  Otázky, na kterých záleží

  1. Nasazení. V názvu session je "první nasazení", ale v úkolech a v kritériu
     "Hotovo" není. Plánuji bez nasazení (Vercel je veřejné publikování a chci
     vaše výslovné ano). Je to správně?
  2. CTA "Spočítat poplatek" a kalkulačka, která ještě není. Copy slibuje
     kalkulačku i v podnadpisu. Doporučuji nechat texty přesně a dát CTA zatím
     href="#tabulka" s komentářem TODO: #kalkulacka. Alternativa: CTA zatím
     nevykreslit. Stránka s tímto textem není spustitelná jako reklamní cíl,
     dokud kalkulačka neexistuje.
  3. Názvy fondů jsou null. V buňce zobrazím jen symbol, bez textu [název z webu
     emitenta] na veřejné stránce. Nebo chcete placeholder vidět?
  4. Šablonový README.md. Nekopíruji ho (je to boilerplate Vite a README píšeme
     sami). A také mažu vite.svg favicon. Souhlasíte?
  5. [PROVOZOVATEL: …] ve footeru se vykreslí viditelně, protože texty jdou
     přesně z copy. Pro kostru OK?

  Když na 1 až 5 odpovíte (stačí čísla) a řeknete "zapiš", začnu krokem 1.

✻ Crunched for 1m 19s · done Friday 5:03 PM

※ recap: Cíl je kostra landing page (Vite, React, TypeScript) s hero A, tabulkou pěti ETF a patičkou s riziky. Plán je napsaný, nic jsem nevytvořil. Další krok: odpovězte na otázky 1 až 5 a řekněte "zapiš".

❯ 1. Ano, nasazení je v rozsahu, ale git neřeš: nic necommituj a nepushuj,      
  commity i push dělám já. Vercel nasadím sám v dashboardu, žádné vercel CLI    
  nespouštěj. Do index.html přidej <meta name="robots" content="noindex"> s     
  komentářem, že se odstraní před spuštěním reklam.                             
  2. Ano: CTA href="#tabulka" s komentářem TODO: #kalkulacka.                   
  3. V buňce jen symbol, žádný placeholder na veřejné stránce. Názvy doplním    
  sám z webů emitentů.                                                          
  4. Ano, šablonový README nekopíruj.                                           
  5. Ano, [PROVOZOVATEL: …] zůstane viditelné.                                  
                                                                                
  Úpravy plánu:                                                                 
  - .gitignore: přidej .env a .env.*. Nic mimo šablony nepřepisuj (.git,        
  CLAUDE.md, NOTES.md, docs, data, ai-log). V package.json nastav name na       
  etf-landing-cz, bez pole engines.                                             
  - Odkaz na vite.svg je v index.html, ne v index.css. Po úklidu prohledej      
  index.html a src, jestli nezbyl odkaz na smazané soubory.                     
  - terDisputed přejmenuj tak, aby odpovídal textu z copy ("prospekt            
  neověřen"), a vykresli přesně ten text.                                       
  - Po každém kroku vypiš git status a git diff --stat, abych mohl udělat       
  commit. Navrhni anglickou zprávu commitu, ale sám necommituj.                 
  - Před "zapiš" mi znovu vypiš tabulku etfs.ts včetně terAsOf a krok 6 celé, v 
  tom plánu jsou useknuté řádky.                                                

⏺ Nic jsem nevytvořil. Níže je upravený plán v částech, které jste chtěl vidět
  celé, a pak zbytek změn. Až napíšete „zapiš“, začnu krokem 1.

  src/data/etfs.ts: všechny řádky včetně terAsOf

  Zdroj všech hodnot je data/etf-sources.md, načteno 2026-10-09. ter je zlomek
  (konvence přílohy A).

  ticker: IVV
  name: null
  exchange: "NYSE Arca"
  ter: 0.0003
  terAsOf: null (datum na stránce není)
  sourceName: iShares
  sourceUrl: https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf
  retrievedOn: 2026-10-09
  prospectusNotVerified: false
  ────────────────────────────────────────
  ticker: VOO
  name: null
  exchange: null (stránka burzu neuvádí)
  ter: 0.0003
  terAsOf: 2026-04-28
  sourceName: Vanguard
  sourceUrl: https://investor.vanguard.com/investment-products/etfs/profile/voo
  retrievedOn: 2026-10-09
  prospectusNotVerified: false
  ────────────────────────────────────────
  ticker: VTI
  name: null
  exchange: null (stránka burzu neuvádí)
  ter: 0.0003
  terAsOf: 2026-04-28
  sourceName: Vanguard
  sourceUrl: https://investor.vanguard.com/investment-products/etfs/profile/vti
  retrievedOn: 2026-10-09
  prospectusNotVerified: true
  ────────────────────────────────────────
  ticker: SCHD
  name: null
  exchange: "NYSE Arca"
  ter: 0.0006 (zdroj píše 0.060 %)
  terAsOf: null (datum na stránce není)
  sourceName: Schwab
  sourceUrl: https://www.schwabassetmanagement.com/products/schd
  retrievedOn: 2026-10-09
  prospectusNotVerified: false
  ────────────────────────────────────────
  ticker: QQQ
  name: null
  exchange: "Nasdaq" (zdroj: "Nasdaq/NMS (Global Market)")
  ter: 0.0018
  terAsOf: 2026-10-08
  sourceName: Invesco
  sourceUrl: https://www.invesco.com/qqq-etf/en/about.html
  retrievedOn: 2026-10-09
  prospectusNotVerified: false

  - Řádky jsou v pořadí podle dat. Řazení stejně zajistí funkce, ne pořadí v
    souboru.
  - Příznak prospectusNotVerified (původně terDisputed) odpovídá textu z copy.
    Vykreslí se přesně „údaj ze stránky fondu, prospekt neověřen“.
  - Poznámka: Prospekt nebyl otevřen u žádného fondu, příznak je true jen u VTI,
    protože tak to určuje copy kvůli nevyřešenému rozporu 0,04 % ze
    sekundárního zdroje. V komentáři u pole to napíšu.
  - name je všude null s komentářem, že se doplní z webů emitentů. V buňce se
    zobrazí jen symbol.

  Krok 6 – ověření (celý)

  1. npm run build, pak npm run lint. Do reportu dám skutečný výstup obou
     příkazů, ne shrnutí.
  2. Hledání zbytků po úklidu: grep na vite.svg, react.svg, App.css a Vite + 
     React v index.html a src/. Výsledek je prázdný, jinak opravím.
  3. Kontrola zakázaného: grep na gradient, na vykřičníky v textech a na slova
     „nejlepší“, „okrádají“, „zaručeno“, „odemkněte“. Texty porovnám s
     docs/copy-cs.md po řádcích.
  4. Spuštění npm run preview na pozadí (ne vercel) a prohlížeč na 375 px a 1440
     px:
     - Nejdřív headless Chrome, pokud je v /Applications/Google Chrome.app.
       Pokud ne, built-in browser.
     - Pokud nejde ani to, napíšu to otevřeně a necháte si šířku zkontrolovat v
       DevTools.
  5. Na 375 px zjistím document.documentElement.scrollWidth <= clientWidth
     (žádný vodorovný posun) a udělám screenshot celé stránky.
  6. Na 1440 px screenshot celé stránky a kontrola, že obsah má omezenou šířku.
  7. Viditelný focus: z prohlížeče ověřím, že odkaz „Poučení o rizicích“, CTA a
     odkazy se zdroji mají při :focus-visible obrys.
  8. Server z bodu 4 ukončím. Do reportu napíšu, co z bodů 4 až 7 se mi
     nepodařilo ověřit.

  Změny podle vašich odpovědí

  - Git: nic necommituju ani nepushuju, žádný git add. Po každém kroku dám git 
    status --short a git diff --stat. git diff --stat ukazuje jen sledované
    soubory, nové soubory proto vidíte jen v git status. Přidám i návrh anglické
    zprávy:
    - krok 1: chore: scaffold Vite react-ts template
    - krok 2: chore: remove Vite demo files, set lang and noindex
    - krok 3: feat: add ETF data from issuer pages
    - krok 4: feat: add hero, ETF table and risk footer
    - krok 5: style: add mobile-first layout
  - Nasazení: žádné vercel CLI. V reportu dám nastavení pro dashboard: Framework
    Preset Vite, Build Command npm run build, Output Directory dist.
  - index.html: lang="cs", <title> = H1 z copy, <meta name="robots" 
    content="noindex"> s komentářem <!-- noindex: remove before launching ads 
    -->. Odkaz na vite.svg odstraním z index.html (opraveno, v plánu jsem ho
    chybně přisoudil index.css).
  - CTA: href="#tabulka" s komentářem TODO: #kalkulacka.
  - .gitignore: přidám .env a .env.*. Zbytek šablony nechám.
  - package.json: name na etf-landing-cz, pole engines nepřidávám (a pokud ho
    šablona obsahuje, nepřenáším).
  - Šablonový README.md nekopíruju. .git, CLAUDE.md, NOTES.md, docs/, data/,
    ai-log/ se nepřepisují. Před kopírováním šablony porovnám názvy souborů, aby
    se nic nepřepsalo.
  - Footer: [PROVOZOVATEL: …] zůstává viditelné.

✻ Churned for 29s · done Friday 5:19 PM

❯ zapiš. Změny oproti plánu:                                                    
  - Pole prospectusNotVerified nahraď polem terCaveat: string | null. U VTI     
  přesně "údaj ze stránky fondu, prospekt neověřen", u ostatních null.          
  Komponenta jen vykreslí řetězec, pokud existuje.                              
  - Všechny české texty stránky dej do src/content.ts, komponenty je jen        
  vykreslují. Texty beze změny, slovo od slova z copy-cs.md.                    
  - Hero udělej jako komponentu s props (varianta). Zatím jen varianta A, B     
  přidáme později.                                                              

⏺ Krok 1: šablona do dočasné složky mimo repozitář.

  Ran 4 shell commands (ctrl+o to expand)

⏺ Krok 1 hotový (výsledek ověřím znovu na konci). Pokračuji krokem 2, úklid
  šablony.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Zbylé odkazy jsou jen v demo App.tsx, který přepíšu v kroku 4. Krok 3: data.

⏺ Write(src/data/etfs.ts)
  ⎿  Wrote 88 lines to src/data/etfs.ts
       1 // Values come only from data/etf-sources.md (issuer pages, read
       2 // Anything the source does not show is null. Do not fill gaps f
         rom memory.
       4 export interface Etf {
       5   ticker: string
         e issuer page.
       7   name: string | null
         es not show it.
       9   exchange: string | null
         onvention as
     … +91 lines (ctrl+o to expand)

⏺ Write(src/content.ts)
  ⎿  Wrote 53 lines to src/content.ts
       1 // All Czech page copy lives here, word for word from docs/copy-
       2 // Components only render it. Change the wording in the doc firs
         t.
       3 
       5 export const heroContent = {
       6   A: {
       8     subheading:
       9       'Pět amerických ETF vedle sebe. U každého poplatek fondu (
         TER), zdroj a datum. A kalkulačka, která poplatek spočítá pro va
      10     cta: 'Spočítat poplatek',
     … +58 lines (ctrl+o to expand)

⏺ Write(src/format.ts)
  ⎿  Wrote 16 lines to src/format.ts
       1 const terFormat = new Intl.NumberFormat('cs-CZ', {
       2   style: 'percent',
       3   minimumFractionDigits: 2,
       4   maximumFractionDigits: 2,
       5 })
       6 
       7 // 0.0003 -> "0,03 %"
       8 export function formatTer(ter: number): string {
       9   return terFormat.format(ter)
      10 }
     … +7 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(src/index.css)
  ⎿  Added 207 lines, removed 83 lines
        1  :root {
        2 -  --text: #6b6375;                                            
        3 -  --text-h: #08060d;                                          
        4 -  --bg: #fff;                                                 
        5 -  --border: #e5e4e7;                                          
        6 -  --code-bg: #f4f3ec;                                         
        7 -  --accent: #aa3bff;                                          
        8 -  --accent-bg: rgba(170, 59, 255, 0.1);                       
        9 -  --accent-border: rgba(170, 59, 255, 0.5);                   
       10 -  --social-bg: rgba(244, 243, 236, 0.5);                      
       11 -  --shadow:                                                   
       12 -    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0
          - 4px 6px -2px;                                                
        2 +  --bg: #fbfaf7;                                              
        3 +  --surface: #ffffff;                                         
        4 +  --text: #1c2024;                                            
        5 +  --muted: #565d66;                                           
        6 +  --border: #d8d4cb;                                          
        7 +  --accent: #0b5c4f;                                          
        8 +  --accent-text: #ffffff;                                     
        9  
       14 -  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;          
       15 -  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;       
       16 -  --mono: ui-monospace, Consolas, monospace;                  
       10 +  --font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-s
          +erif;                                                         
       11 +  --gutter: 1rem;                                             
       12 +  --max-width: 64rem;                                         
       13  
       18 -  font: 18px/145% var(--sans);                                
       19 -  letter-spacing: 0.18px;                                     
       20 -  color-scheme: light dark;                                   
       14 +  color-scheme: light;                                        
       15 +  font-family: var(--font);                                   
       16 +  font-size: 16px;                                            
       17 +  line-height: 1.5;                                           
       18    color: var(--text);
       19    background: var(--bg);
       23 -  font-synthesis: none;                                       
       24 -  text-rendering: optimizeLegibility;                         
       25 -  -webkit-font-smoothing: antialiased;                        
       26 -  -moz-osx-font-smoothing: grayscale;                         
       27 -                                                              
       28 -  @media (max-width: 1024px) {                                
       29 -    font-size: 16px;                                          
       30 -  }                                                           
       20  }
       21  
       33 -@media (prefers-color-scheme: dark) {                         
       34 -  :root {                                                     
       35 -    --text: #9ca3af;                                          
       36 -    --text-h: #f3f4f6;                                        
       37 -    --bg: #16171d;                                            
       38 -    --border: #2e303a;                                        
       39 -    --code-bg: #1f2028;                                       
       40 -    --accent: #c084fc;                                        
       41 -    --accent-bg: rgba(192, 132, 252, 0.15);                   
       42 -    --accent-border: rgba(192, 132, 252, 0.5);                
       43 -    --social-bg: rgba(47, 48, 58, 0.5);                       
       44 -    --shadow:                                                 
       45 -      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25)
          - 0 4px 6px -2px;                                              
       46 -  }                                                           
       47 -                                                              
       48 -  #social .button-icon {                                      
       49 -    filter: invert(1) brightness(2);                          
       50 -  }                                                           
       51 -}                                                             
       52 -                                                              
       53 -#root {                                                       
       54 -  width: 1126px;                                              
       55 -  max-width: 100%;                                            
       56 -  margin: 0 auto;                                             
       57 -  text-align: center;                                         
       58 -  border-inline: 1px solid var(--border);                     
       59 -  min-height: 100svh;                                         
       60 -  display: flex;                                              
       61 -  flex-direction: column;                                     
       22 +*,                                                            
       23 +*::before,                                                    
       24 +*::after {                                                    
       25    box-sizing: border-box;
       26  }
       27  
       28  body {
       29    margin: 0;
       30 +  background: var(--bg);                                      
       31  }
       32  
       33 +/* Page blocks share one column and one gutter. */            
       34 +.hero,                                                        
       35 +main,                                                         
       36 +footer {                                                      
       37 +  max-width: var(--max-width);                                
       38 +  margin-inline: auto;                                        
       39 +  padding-inline: var(--gutter);                              
       40 +}                                                             
       41 +                                                              
       42  h1,
       43  h2 {
       71 -  font-family: var(--heading);                                
       72 -  font-weight: 500;                                           
       73 -  color: var(--text-h);                                       
       44 +  line-height: 1.2;                                           
       45 +  margin: 0 0 0.75rem;                                        
       46  }
       47  
       48  h1 {
       77 -  font-size: 56px;                                            
       78 -  letter-spacing: -1.68px;                                    
       79 -  margin: 32px 0;                                             
       80 -  @media (max-width: 1024px) {                                
       81 -    font-size: 36px;                                          
       82 -    margin: 20px 0;                                           
       83 -  }                                                           
       49 +  font-size: 1.75rem;                                         
       50  }
       51 +                                                              
       52  h2 {
       86 -  font-size: 24px;                                            
       87 -  line-height: 118%;                                          
       88 -  letter-spacing: -0.24px;                                    
       89 -  margin: 0 0 8px;                                            
       90 -  @media (max-width: 1024px) {                                
       91 -    font-size: 20px;                                          
       92 -  }                                                           
       53 +  font-size: 1.375rem;                                        
       54  }
       55 +                                                              
       56  p {
       95 -  margin: 0;                                                  
       57 +  margin: 0 0 0.75rem;                                        
       58  }
       59  
       98 -code,                                                         
       99 -.counter {                                                    
      100 -  font-family: var(--mono);                                   
      101 -  display: inline-flex;                                       
      102 -  border-radius: 4px;                                         
      103 -  color: var(--text-h);                                       
       60 +a {                                                           
       61 +  color: var(--accent);                                       
       62  }
       63  
      106 -code {                                                        
      107 -  font-size: 15px;                                            
      108 -  line-height: 135%;                                          
      109 -  padding: 4px 8px;                                           
      110 -  background: var(--code-bg);                                 
       64 +:focus-visible {                                              
       65 +  outline: 3px solid var(--accent);                           
       66 +  outline-offset: 3px;                                        
       67  }
       68 +                                                              
       69 +.hero {                                                       
       70 +  padding-block: 2rem 1.5rem;                                 
       71 +}                                                             
       72 +                                                              
       73 +.hero-lead {                                                  
       74 +  font-size: 1.125rem;                                        
       75 +  max-width: 40rem;                                           
       76 +}                                                             
       77 +                                                              
       78 +.button {                                                     
       79 +  display: inline-block;                                      
       80 +  padding: 0.75rem 1.25rem;                                   
       81 +  margin-block: 0.5rem 1rem;                                  
       82 +  background: var(--accent);                                  
       83 +  color: var(--accent-text);                                  
       84 +  font-weight: 600;                                           
       85 +  text-decoration: none;                                      
       86 +  border-radius: 0.375rem;                                    
       87 +}                                                             
       88 +                                                              
       89 +.small {                                                      
       90 +  display: block;                                             
       91 +  font-size: 0.875rem;                                        
       92 +  color: var(--muted);                                        
       93 +}                                                             
       94 +                                                              
       95 +main {                                                        
       96 +  padding-block: 1rem 2rem;                                   
       97 +}                                                             
       98 +                                                              
       99 +/* Table: stacked cards on narrow screens, a real table from 4
          +0rem. */                                                      
      100 +table {                                                       
      101 +  width: 100%;                                                
      102 +  border-collapse: collapse;                                  
      103 +}                                                             
      104 +                                                              
      105 +caption {                                                     
      106 +  text-align: left;                                           
      107 +  color: var(--muted);                                        
      108 +  font-size: 0.875rem;                                        
      109 +  padding-bottom: 0.75rem;                                    
      110 +}                                                             
      111 +                                                              
      112 +thead {                                                       
      113 +  position: absolute;                                         
      114 +  width: 1px;                                                 
      115 +  height: 1px;                                                
      116 +  overflow: hidden;                                           
      117 +  clip-path: inset(50%);                                      
      118 +}                                                             
      119 +                                                              
      120 +tr,                                                           
      121 +th,                                                           
      122 +td {                                                          
      123 +  display: block;                                             
      124 +}                                                             
      125 +                                                              
      126 +tbody tr {                                                    
      127 +  background: var(--surface);                                 
      128 +  border: 1px solid var(--border);                            
      129 +  border-radius: 0.5rem;                                      
      130 +  padding: 0.75rem 1rem;                                      
      131 +  margin-bottom: 0.75rem;                                     
      132 +}                                                             
      133 +                                                              
      134 +th,                                                           
      135 +td {                                                          
      136 +  text-align: left;                                           
      137 +  font-weight: 400;                                           
      138 +  padding: 0.25rem 0;                                         
      139 +  overflow-wrap: anywhere;                                    
      140 +}                                                             
      141 +                                                              
      142 +td::before {                                                  
      143 +  content: attr(data-label);                                  
      144 +  display: block;                                             
      145 +  font-size: 0.8125rem;                                       
      146 +  color: var(--muted);                                        
      147 +}                                                             
      148 +                                                              
      149 +.ticker {                                                     
      150 +  display: block;                                             
      151 +  font-size: 1.25rem;                                         
      152 +  font-weight: 700;                                           
      153 +}                                                             
      154 +                                                              
      155 +.fund-name {                                                  
      156 +  display: block;                                             
      157 +  color: var(--muted);                                        
      158 +}                                                             
      159 +                                                              
      160 +footer {                                                      
      161 +  padding-block: 1.5rem 3rem;                                 
      162 +  border-top: 1px solid var(--border);                        
      163 +}                                                             
      164 +                                                              
      165 +footer ul {                                                   
      166 +  margin: 0 0 1rem;                                           
      167 +  padding-left: 1.25rem;                                      
      168 +}                                                             
      169 +                                                              
      170 +footer li {                                                   
      171 +  margin-bottom: 0.5rem;                                      
      172 +}                                                             
      173 +                                                              
      174 +@media (min-width: 40rem) {                                   
      175 +  :root {                                                     
      176 +    --gutter: 1.5rem;                                         
      177 +  }                                                           
      178 +                                                              
      179 +  h1 {                                                        
      180 +    font-size: 2.5rem;                                        
      181 +  }                                                           
      182 +                                                              
      183 +  .hero {                                                     
      184 +    padding-block: 3rem 2rem;                                 
      185 +  }                                                           
      186 +                                                              
      187 +  table {                                                     
      188 +    display: table;                                           
      189 +    background: var(--surface);                               
      190 +    border: 1px solid var(--border);                          
      191 +  }                                                           
      192 +                                                              
      193 +  thead {                                                     
      194 +    position: static;                                         
      195 +    width: auto;                                              
      196 +    height: auto;                                             
      197 +    overflow: visible;                                        
      198 +    clip-path: none;                                          
      199 +    display: table-header-group;                              
      200 +  }                                                           
      201 +                                                              
      202 +  tbody {                                                     
      203 +    display: table-row-group;                                 
      204 +  }                                                           
      205 +                                                              
      206 +  tr {                                                        
      207 +    display: table-row;                                       
      208 +  }                                                           
      209 +                                                              
      210 +  th,                                                         
      211 +  td {                                                        
      212 +    display: table-cell;                                      
      213 +    padding: 0.75rem 1rem;                                    
      214 +    vertical-align: top;                                      
      215 +    border-top: 1px solid var(--border);                      
      216 +  }                                                           
      217 +                                                              
      218 +  thead th {                                                  
      219 +    font-size: 0.875rem;                                      
      220 +    font-weight: 600;                                         
      221 +    color: var(--muted);                                      
      222 +    border-top: 0;                                            
      223 +  }                                                           
      224 +                                                              
      225 +  tbody tr {                                                  
      226 +    border: 0;                                                
      227 +    border-radius: 0;                                         
      228 +    padding: 0;                                               
      229 +    margin: 0;                                                
      230 +  }                                                           
      231 +                                                              
      232 +  td::before {                                                
      233 +    content: none;                                            
      234 +  }                                                           
      235 +}                                                             

  Ran 1 shell command (ctrl+o to expand)

⏺ Build a lint procházejí. Teď krok 6, ověření.

  Listed 1 directory, ran 1 shell command (ctrl+o to expand)

⏺ Write(~/.claude/jobs/71e49503/tmp/check.mjs)
  ⎿  Wrote 51 lines to ../../../.claude/jobs/71e49503/tmp/check.mjs
       1 // Drives headless Chrome over CDP: measures horizontal overflow
          and takes screenshots.
       3 import { writeFileSync } from 'node:fs'
       4 
       5 const out = '/Users/tanaka/.claude/jobs/71e49503/tmp'
       7   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
         ,
       8   ['--headless=new', '--remote-debugging-port=9333', '--no-first
       9    `--user-data-dir=${out}/chrome-profile`, 'about:blank'],
      10   { stdio: 'ignore' },
     … +48 lines (ctrl+o to expand)

  Read 2 files, ran 2 shell commands (ctrl+o to expand)

⏺ Obě šířky vypadají dobře. Ještě ověřím viditelný focus z klávesnice, pak
  ukončím server a udělám finální běh.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Kostra je hotová a lokálně ověřená, nic jsem necommitoval ani nepushoval. npm 
  run build i npm run lint skončily s exit code 0.

  Co je hotové

  1. Šablona. Vygenerovaná šablona react-ts (create-vite 9.2.1) je v kořeni
     repozitáře. README.md jsem nekopíroval a .git, CLAUDE.md, NOTES.md, docs/,
     data/ a ai-log/ jsem nezměnil. V package.json je name = etf-landing-cz a
     není tam engines. Do .gitignore jsem přidal .env a .env.*.
  2. Úklid. Smazal jsem demo soubory, favicon i public/. index.html má
     lang="cs", <title> s H1 z copy a <meta name="robots" content="noindex"> s
     komentářem <!-- noindex: remove before launching ads -->. Hledání zbytků
     odkazů na smazané soubory v index.html a src/ je prázdné.
  3. src/data/etfs.ts. Data jsou jen z data/etf-sources.md, name je všude null a
     terCaveat je jen u VTI. Řazení dělá funkce sortByTer (TER vzestupně, při
     shodě abecedně podle symbolu).
  4. Stránka. Texty jsou slovo od slova v src/content.ts, komponenty je jen
     vykreslují. Hero má prop variant a zatím existuje jen 'A'. CTA vede na
     #tabulka s komentářem TODO: #kalkulacka. Footer s poučením o rizicích má
     id="rizika" a [PROVOZOVATEL: …] je viditelné.
  5. CSS. Mobile-first, systémové písmo, bez gradientu, zelený akcent #0b5c4f,
     jen světlé schéma.
  6. Ověření (headless Chrome):
     - 375 px: scrollWidth 375 = clientWidth 375, takže žádný vodorovný posun. 5
       řádků se přeskládá do karet.
     - 1440 px: scrollWidth 1440 = clientWidth 1440, běžná tabulka, obsah
       omezený na 64 rem.
     - Klávesnice: tři stisky Tab zaostřily CTA, „Poučení o rizicích“ a odkaz
       iShares, všechny mají obrys solid 3px rgb(11, 92, 79).
     - Zakázaná slova, vykřičníky a gradient v src a index.html nenajde grep.

  Odchylky od plánu

  - Šablona používá oxlint, ne ESLint. Aktuální create-vite má .oxlintrc.json a
    skript "lint": "oxlint". Beru to jako součást šablony a nic jsem nepřidával.
    Lint nevypisuje žádné shrnutí, jen hlavičku, takže „prošlo“ je podle exit
    code 0.
  - Přidal jsem src/format.ts (malé funkce formatTer a formatDate) mimo seznam v
    plánu. Je to jen formátování 0,03 % a 28. 4. 2026 přes Intl.
  - Stránka nemá favicon. Prohlížeč si ho vyžádá a dostane 404. Je to bezpečné,
    ale u nasazení si toho můžete všimnout.
  - Datum v buňce se na 1440 px občas zalomí uprostřed („9. 10. / 2026“). Je to
    kosmetika, nezasahoval jsem.

  Git: změněné soubory (vše nové, git diff --stat je prázdný)

  .gitignore, .oxlintrc.json, index.html, package-lock.json, package.json,
  tsconfig.app.json, tsconfig.json, tsconfig.node.json, vite.config.ts a src/
  (App.tsx, main.tsx, index.css, content.ts, format.ts, data/etfs.ts,
  components/Hero.tsx, components/EtfTable.tsx, components/Footer.tsx). git diff
  --stat neukazuje nové soubory, proto jen git status --short.

  Návrh zpráv pro commity po částech:
  - chore: scaffold Vite react-ts template (.gitignore, .oxlintrc.json,
    package*.json, tsconfig*.json, vite.config.ts, index.html, src/main.tsx)
  - feat: add ETF data from issuer pages (src/data/etfs.ts)
  - feat: add hero, ETF table and risk footer (src/content.ts, src/format.ts,
    src/components/, src/App.tsx)
  - style: add mobile-first layout (src/index.css)

  Rozdělit to lze jen podle souborů, ne po krocích, protože jsem šel v jednom
  běhu.

  Nasazení na Vercel (v dashboardu)

  Framework Preset: Vite, Build Command npm run build, Output Directory dist,
  Install Command npm install. Stránka je noindex, ale není to jediná ochrana:
  web je veřejný, dokud ho neschováte za Vercel Authentication. Pozor, pořád
  chybí kalkulačka, názvy fondů a text [PROVOZOVATEL: …], takže ji nepoužívat
  jako cíl reklam.

  Pomocné soubory (skripty, screenshoty shot-375.png, shot-1440.png) jsou v
  /Users/tanaka/.claude/jobs/71e49503/tmp, mimo repozitář. Server vite preview
  jsem ukončil, Chrome profil smazal. Na konec doporučuji /export 
  ai-log/03-skeleton.md.

✻ Brewed for 2m 59s · done Friday 5:24 PM

※ recap: Cíl je landing page s ETF pro české investory. Kostra (Vite, data, hero A, tabulka, footer) je hotová a build i lint prošly. Další krok: vy commitnete, nasadíte na Vercel v dashboardu a řeknete, co dál (kalkulačka).