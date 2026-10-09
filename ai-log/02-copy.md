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

✻ Cooked for 4m 37s · done 4:01 PM

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

✻ Cooked for 47s · done 4:22 PM

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

✻ Brewed for 1m 10s · done 4:27 PM

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

✻ Baked for 16s · done 4:43 PM