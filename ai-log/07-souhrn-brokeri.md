 ▐▛███▛█   Claude Code v2.1.295
▝▜██████▀  Sonnet 5.5 · Claude Pro
 ▝▝   ▝▝   ~/Desktop/Projects/etf-landing-cz


❯ /clear                                                                        

❯ Session 07: blok "Co uvádějí brokeři" a souhrn po odeslání (vysoký effort)    
                                                                                
  Podklad: docs/copy-cs.md oddíly 4, 7, 9, design bundle (artboard "Váš         
  souhrn", blok brokerů). Texty slovo od slova z copy-cs.md do src/content.ts.  
  Fakta o brokerech a data načtení jen z data/*.md a copy-cs.md, nic z paměti.  
  Nic necommituj. Nejdřív plán a počkej na schválení.                           
                                                                                
  A) Blok "Co uvádějí brokeři" (oddíl 4)                                        
  - Nová komponenta, vložit do App mezi EtfTable a Calculator (pořadí podle     
  oddílu 9).                                                                    
  - Čtyři položky: IBKR, Degiro, Fio, "XTB a Porto" (věta, že jsme nic          
  nenašli). Každá s <cite> a datem načtení.                                     
  - Jsou to PARAFRÁZE, ne přesné citáty: žádné uvozovky kolem textu, žádné      
  <blockquote> pro vlastní větu. Typografický styl z designu (tenké linky, bez  
  karet a stínů, 2x2 od 60rem) zachovej.                                        
  - Neslibuj víc, než zdroje říkají. Nic o ČNB, nic o tvrzení Fia o jiných      
  brokerech (je záměrně vynecháno).                                             
                                                                                
  B) Souhrn (oddíl 7)                                                           
  - Zvedni stav kalkulačky (platný vklad a roky) do App, aby ho znal formulář.  
  Pokud je vstup při odeslání neplatný, použij poslední platné hodnoty (na      
  začátku výchozích 5 000 Kč / 10 let). Scénář se NIKAM neukládá ani neposílá   
  (viz "neukládáme"), žije jen v paměti stránky.                                
  - Po úspěšném odeslání formulář zmizí a nahradí ho souhrn: nadpis "Váš        
  souhrn" (fokus na H2), řádek scénáře, tabulka pěti fondů (TER, poplatek fondu 
  za N let), rozpis po letech, otázky pro brokera, tlačítko "Zkopírovat souhrn  
  jako text" ("Zkopírováno." po kliknutí), závěrečná věta.                      
  - Čisté funkce s testy: poplatek po jednotlivých letech (znovu použij         
  totalFee z fees.ts, žádná druhá kopie vzorce; kontrola proti příloze A: 5 000 
  Kč, 120 měsíců: TER 0,03 % = 907,50; 0,06 % = 1 815; 0,18 % = 5 445) a        
  funkce, která poskládá text souhrnu pro schránku (bez nezlomitelných mezer,   
  běžné mezery).                                                                
  - Tvar roku přes yearsForm/yearsUnit, jak v kalkulačce. Nezlomitelná mezera   
  mezi číslem a "Kč".                                                           
  - Kopírování: navigator.clipboard s ošetřením selhání (fallback: zpráva, že   
  kopírování selhalo, a text zůstane označitelný). Nic nesmí vyhodit výjimku.   
  - Tracking: žádné nové události, schéma se nemění.                            
                                                                                
  C) Hero B (oddíl 2 v copy-cs.md)                                              
  - Přidej heroContent.B slovo od slova z copy-cs.md (H1, podnadpis, CTA        
  "Zobrazit tabulku", drobný text). Do obou variant přidej pole s kotvou: A =   
  #kalkulacka, B = #tabulka. Komponenta Hero čte kotvu z obsahu, žádné podmínky 
  podle varianty v JSX.                                                         
  - Tabulka dostane id="tabulka" (zkontroluj, že kotva funguje a že             
  fokus/scroll na ni nekončí pod sticky prvkem, pokud nějaký je).               
  - Výběr varianty: čistá funkce (utm_content a/b → 'A'/'B', jinak 'A') s       
  testy: a, b, A, B, c, prázdné, chybí. Použij stávající readAdVariant,         
  nedublikuj parsování.                                                         
  - App používá tuto funkci pro Hero; tracker zůstává beze změny.               
  - Ověř v prohlížeči: ?utm_content=b ukáže hero B a CTA vede na tabulku; bez   
  parametru hero A. Mutační kontrola nové funkce.                               
  - Texty hero B mají [právní riziko], ponech značky v copy-cs.md, nic          
  nepřepisuj.                                                                   

⏺ Nejdřív si projdu podklady a stávající kód, pak předložím plán.

  Read 2 files, ran 6 shell commands (ctrl+o to expand)

⏺ Prošel jsem docs/copy-cs.md, data/availability.md, src/ a CSS. Zatím jsem nic
  nezměnil ani nespustil. Tady je plán ke schválení.

  Co jsem zjistil

  - feeForYear v fees.ts je druhá kopie vzorce. Počítá si deposit * ter/12 * ...
    po svém a nikde v src se nepoužívá, jen v testech. Požaduješ, aby šlo vše
    přes totalFee. Navrhuju roční poplatek počítat jako totalFee(d, ter, 12·y) −
    totalFee(d, ter, 12·(y−1)). Nejsou tedy dvě kopie.
  - Design bundle v repu není. Ve Downloads je ETF poplatky – landing page.html
    (2 MB), ale nejde z něj vyhledat text, nejspíš je zabalený. Typografii bloku
    brokerů a souhrnu proto odvodím z existujícího index.css (tenké linky,
    .sec-head, .src, bez karet a stínů). Pokud chceš věrnost artboardu, dej mi
    export nebo screenshot artboardu "Váš souhrn" a bloku brokerů.
  - Sticky prvek v CSS není (grep na sticky, fixed a scroll-margin nic nenašel).
    Kotva #tabulka proto nemá co zakrývat. Ověřím to i v prohlížeči.
  - EtfTable už má id="tabulka" (EtfTable.tsx:49). Úkol "tabulka dostane id" je
    tedy hotový, jen to potvrdím.
  - Hero má natvrdo href="#kalkulacka". LeadForm už má prop onSuccess, kterou
    stačí napojit.
  - readAdVariant vrací 'a' | 'b' | null. Tracker ji čte sám v track.ts a
    zůstane beze změny.

  A) Blok "Co uvádějí brokeři"

  - content.ts: brokersContent s nadpisem "Co uvádějí brokeři" a čtyřmi
    položkami slovo od slova z oddílu 4. Každá má název, větu, zdroj a datum
    načtení (9. 10. 2026). Datum se vezme jako datum, ne jako součást věty.
  - components/Brokers.tsx: <section id="brokeri"> se seznamem <ul>. Věta je
    obyčejný <p> bez uvozovek a bez <blockquote>. Zdroj je <cite> s odkazem a
    "načteno {datum}" (formatDate).
  - Odkazy na zdroje jdou z data/availability.md (IBKR KB 2993, Degiro CZ a EN,
    Fio článek). U XTB a Portu žádný odkaz není, protože nic nebylo nalezeno.
    Neuvedu ho.
  - CSS: tenké linky mezi položkami, od 60rem mřížka 2×2, bez karet a stínů.
  - Pořadí v App: EtfTable, Brokers, Calculator.
  - Nic o ČNB a nic o tvrzení Fia o jiných brokerech.
  - Otázka k [právní riziko]: u Degira a IBKR zůstávají parafráze z copy-cs.md
    beze změny. Značky ponechám jen v docs, ne v UI.

  B) Souhrn

  - Stav v App: depositText a yearsText se zvednou z Calculator, který je
    dostane jako props. App si navíc drží lastValid = {deposit, years} s
    výchozími 5 000 a 10. Při odeslání se použije aktuální platný vstup, jinak
    lastValid. Nikam se neukládá ani neposílá.
  - Čisté funkce v novém src/summary.ts:
    - feeByYear(deposit, ter, years) vrací poplatek pro každý rok přes totalFee
      (rozdíl kumulativních hodnot). feeForYear buď smažu, nebo přepíšu na tento
      tvar. Rozhodni ty. Navrhuju přepsat a přesunout.
    - buildSummaryText(...) poskládá text pro schránku s běžnými mezerami, ne
      \u00A0.
  - Testy:
    - 5 000 Kč, 120 měsíců: 907,50, 1 815 a 5 445.
    - Součet ročních hodnot se rovná totalFee.
    - Hranice roku 1 a 20.
    - Text pro schránku neobsahuje \u00A0.
    - Tvar roku pro 1, 2 a 5 let.
    - Mutační kontrola: rozbiju 12*(y-1) a ověřím, že testy zčervenají.
  - components/Summary.tsx:
    - H2 "Váš souhrn" s tabIndex={-1} a focus() po zobrazení.
    - Řádek scénáře, tabulka pěti fondů (TER a poplatek za N let), rozpis po
      letech, pět otázek pro brokera, tlačítko a závěrečná věta.
    - Nezlomitelná mezera před "Kč" přes stávající formatCzk.
    - Tvar roku přes yearsForm a yearsUnit.
  - Rozpis po letech: <table> s rokem v řádcích a fondy ve sloupcích. Na mobilu
    se posouvá vodorovně uvnitř kontejneru, ne celá stránka. Pokud chceš kratší
    rozpis (například <details>), řekni.
  - Kopírování:
    - copyText(text) vždy zachytí výjimku.
    - Pokud navigator.clipboard chybí nebo writeText selže, ukáže se hláška
      "Kopírování se nepodařilo. Text si označte a zkopírujte ručně." a text
      souhrnu se zobrazí v <pre> nebo <textarea readOnly> k označení. Tuto
      hlášku v copy-cs.md nemáme, napíšu ji jako návrh a nechám ji ke schválení.
    - "Zkopírováno." se po kliknutí ukáže v aria-live regionu.
  - Žádné nové události, schéma beze změny.

  C) Hero B

  - heroContent.B slovo od slova z oddílu 2. Značky [právní riziko] zůstanou v
    copy-cs.md.
  - Obě varianty dostanou pole anchor: A = #kalkulacka, B = #tabulka. Hero čte
    content.anchor a žádná podmínka podle varianty v JSX nevznikne.
  - Drobný text B je delší než A a obsahuje "načteno 9. 10. 2026". Do note ho
    dám celý.
  - src/variant.ts dostane pickHeroVariant(search): 'A' | 'B', která volá
    readAdVariant, takže parsování není zdvojené. Vrací 'B' jen pro 'b', jinak
    'A'.
  - Testy: a, b, A, B, c, prázdné a chybějící. Navíc mezery a +B+, protože to
    dědí z readAdVariant.
  - Mutační kontrola: prohodím mapování nebo vrátím 'B' pro 'a' a ověřím, že
    testy zčervenají.
  - App volá pickHeroVariant(window.location.search) jednou při startu. Tracker
    se nemění.
  - Ověření v prohlížeči: ?utm_content=b ukáže hero B a CTA skočí na tabulku.
    Bez parametru je hero A. Zkontroluju i fokus a scroll. Na obě varianty
    pustím npm test, npm run lint a npm run build.

  Pořadí práce a pravidla

  1. pickHeroVariant, hero B a kotvy (C), nejmenší a nejméně rizikové.
  2. summary.ts s testy a mutační kontrolou (B, logika).
  3. Zvednutí stavu, Summary a napojení LeadForm.onSuccess (B, UI).
  4. Brokers (A).
  5. Prohlížeč, testy, lint, build.

  Nic necommituju. Texty budou jen z copy-cs.md a data/availability.md. Pokud mi
  v nich něco chybí, doplním [doplnit] a nepíšu to z paměti.

  Otázky, na kterých plán závisí

  1. feeForYear: přepsat přes totalFee a přesunout do summary.ts, nebo ponechat
     jako je? Doporučuju přepsat.
  2. Rozpis po letech: tabulka s vodorovným posunem, nebo <details> sbalený?
     Doporučuju tabulku.
  3. Text chyby kopírování: schvaluješ návrh výše?
  4. Design bundle: mám pracovat z existujícího CSS, nebo mi dáš export
     artboardu?

  Po tvém schválení začnu bodem 1.

✻ Crunched for 51s · done 8:39 PM

※ recap: Cílem je dokončit session 07 na ETF landing page: blok brokerů, souhrn po odeslání a hero B. Zatím jsem jen předložil plán bez změn v kódu. Další krok je tvoje schválení plánu a odpovědi na čtyři otázky na jeho konci.

❯ Plán schvalen, s těmito úpravami:                                             
                                                                                
  1) Design bundle je pořád v ~/Downloads (ETF poplatky - landing page.html),   
  stejný soubor jako v session 06b, jen ho rozbal znovu. Řetězce uvnitř jsou    
  escapované (\u002F místo /), proto hledání textu selhalo, dekóduj je.         
  Artboard "Souhrn po odeslání formuláře" a blok brokerů v mobile/desktop       
  stránce vem přímo z něj, nevytvářej typografii odhadem z index.css. Vyjmenuj, 
  co jsi z designu převzal a kde ses odchýlil.                                  
  2) feeForYear zruš (včetně testů, které testují jen ji). Rozpis po letech =   
  kumulativní poplatek po k letech = totalFee(vklad, ter, 12*k) pro k = 1..N.   
  Poslední řádek se musí přesně rovnat hodnotě v hlavní tabulce souhrnu (přidej 
  na to test: pro 5 000 Kč a 10 let TER 0,03 % → 907,50; 0,06 % → 1 815; 0,18   
  % → 5 445). Žádné odčítání dvou totalFee.                                     
  3) Rozpis: <details> zavřený (jak v designu), uvnitř tabulka rok × pět fondů  
  v .tbl-box s overflow-x: auto, první sloupec "Rok", pod ní věta "Součet od    
  začátku investování do konce daného roku." Tu větu nejdřív zapiš do           
  docs/copy-cs.md s pomocí "návrh, schválí autor", potom do content.ts.         
  4) Blok brokerů: položky musí po složení dávat přesně větu z oddílu 4         
  copy-cs.md včetně závorky se zdrojem ("Znalostní báze IBKR, stránka bez data, 
  načteno 9. 10. 2026"). Pokud zdroj a datum oddělíš do polí, výstup se musí    
  slovo od slova shodovat. Žádné uvozovky kolem parafrází.                      
                                                                                
  Pokračuj v plánu částmi B a C (souhrn, hero B) tak, jak jsem je zadal. Nic    
  neimplementuj, dokud plán nebude kompletní a já ho neschválím.                

⏺ Rozbalím design bundle a dekóduju escapované řetězce. Zatím jen čtu, nic
  neimplementuju.

  Read 1 file, ran 5 shell commands (ctrl+o to expand)

⏺ Teď čtu blok brokerů z desktopové stránky návrhu.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Design bundle jsem rozbalil a dekódoval. Čtu z něj artboard "Souhrn po
  odeslání formuláře" a blok brokerů z desktopové stránky. Je to dvojitě
  zabalený bundle (vnořený __bundler/template). Mobilní stránka sdílí stejné
  CSS, takže u implementace jen ověřím markup bloku brokerů i tam. Nic
  neimplementuju a nic nemění soubory v repu. Zbývá schválit úplný plán.

  Co beru z designu a kde se odchyluju

  Prvek: Souhrn: rám
  Z designu beru: .sheet (parchment, 2px espresso, radius 8), .sec-head s
  dvojitou linkou, h2 s tabindex="-1"
  Odchylka: nic
  ────────────────────────────────────────
  Prvek: Souhrn: dvě sloupce
  Z designu beru: .sum-grid: 1 sloupec, od 60rem 1.25fr / 1fr, gap 48px. Vlevo
  scénář, tabulka a rozpis, vpravo otázky, tlačítko a závěr
  Odchylka: v index.css se používá @media, ne @container, takže přepíšu na
  @media
   (min-width: 60rem)
  ────────────────────────────────────────
  Prvek: Řádek scénáře
  Z designu beru: .scenario (rámeček, lg písmo, tabulární čísla)
  Odchylka: nic
  ────────────────────────────────────────
  Prvek: Tabulka pěti fondů
  Z designu beru: .tbl-box + .sumtable, sloupce fond / TER / poplatek za N let,
  ticker v serifu, zebra, čísla vpravo
  Odchylka: v designu jsou sc-raw-table a spol. (artefakt exportu), v kódu budou

  běžné table, thead, th scope. Hlavička "fond" je v designu malými písmeny, v
  kódu zachovám
  ────────────────────────────────────────
  Prvek: Rozpis
  Z designu beru: <details class="disclosure">, zavřený, summary s šipkou
  Odchylka: otevřený obsah v designu nemám, vytvořím ho podle .sumtable a
  .tbl-box (rok × pět fondů). Šipku otočím při otevření
  ────────────────────────────────────────
  Prvek: Otázky
  Z designu beru: .q-list: ol s číslem v serifu (counter)
  Odchylka: nic
  ────────────────────────────────────────
  Prvek: Tlačítko
  Z designu beru: .btn.btn-secondary.btn-wide.btn-icon s ikonou kopírování
  Odchylka: po kliknutí "Zkopírováno." jako .done (v designu je třída bez
  ukázky,
  doplním ikonu fajfky)
  ────────────────────────────────────────
  Prvek: Závěr
  Z designu beru: .small
  Odchylka: nic
  ────────────────────────────────────────
  Prvek: Brokeři: rozvržení
  Z designu beru: .quotes: 1 sloupec, od 60rem 2×2 (column-gap:48px), .quote s
  linkami nahoře a dole
  Odchylka: nic
  ────────────────────────────────────────
  Prvek: Brokeři: obalení
  Z designu beru: design používá <figure><blockquote> a velkou uvozovku „
  (.qmark)
  Odchylka: vynechávám: tvoje pravidlo je žádné uvozovky a žádný blockquote pro
  vlastní větu, protože jde o parafráze. Použiji <li><p> a <cite>. Odsazení
  40px vlevo pro uvozovku nechám jen u XTB-pomlčky, pokud ji chceš zachovat
  (viz otázka 1)
  ────────────────────────────────────────
  Prvek: Brokeři: XTB/Porto
  Z designu beru: design: pomlčka (–) místo uvozovky, bez figcaption a bez cite
  Odchylka: dodržím, protože věta je z copy-cs.md a datum je v ní

  Nové CSS třídy do index.css: .sum-grid, .sum-col, .scenario, .tbl-box,
  .sumtable, .disclosure, .q-list, .btn-secondary, .btn-icon, .done, .h3,
  .quotes, .quote. Nic z toho tam teď není, mají se jen tokeny (barvy a stíny).

  Pořadí práce

  0. Texty do docs (nejdřív, ke schválení autora)
  - docs/copy-cs.md, oddíl 7: věta pod tabulkou rozpisu Součet od začátku 
    investování do konce daného roku. (návrh, schválí autor).
  - Oddíl 7: hláška při selhání kopírování Kopírování se nepodařilo. Text si 
    označte a zkopírujte ručně. (návrh, schválí autor). Podle tvého zadání jde o
    fallback, takže ho píšu do docs stejným způsobem.
  - Do content.ts pak jen texty, které jsou v docs.

  1. Hero B (C)
  - heroContent.B slovo od slova z oddílu 2. Obě varianty dostanou anchor: A =
    #kalkulacka, B = #tabulka. Hero čte content.anchor a v JSX není žádná
    podmínka podle varianty.
  - variant.ts: pickHeroVariant(search): 'A' | 'B', která volá readAdVariant a
    vrací 'B' jen pro 'b'. track.ts zůstává beze změny.
  - Testy: a, b, A, B, c, prázdné, chybí (navíc +B+, protože to dědí). Mutační
    kontrola: vrátím 'B' pro 'a' a ověřím, že testy zčervenají.
  - App volá pickHeroVariant(window.location.search). Ověření v prohlížeči:
    ?utm_content=b ukáže hero B a CTA skočí na #tabulka, bez parametru hero A.
    id="tabulka" už v EtfTable.tsx:49 je. Sticky prvek v CSS není, ale
    zkontroluju to v prohlížeči.

  2. Logika souhrnu (B)
  - fees.ts: feeForYear zrušit včetně obou testů, které testují jen ji (matches 
    appendix A a adds up to the total fee). Místo ní cumulativeFees(deposit, 
    ter, years), které vrací pole totalFee(deposit, ter, 12 * k) pro k = 1..N.
    Žádné odčítání, žádná druhá kopie vzorce.
  - Testy v fees.test.ts:
    - 5 000 Kč a 10 let: poslední prvek pro TER 0,03 % dává 907,50, pro 0,06 % 1
      815 a pro 0,18 % 5 445. Kontrola jak toBeCloseTo, tak přes formatCzk
      ("907,50 Kč").
    - Poslední řádek rozpisu se přesně rovná hodnotě hlavní tabulky souhrnu, tj.
      totalFee(d, ter, 12 * N), se toBe.
    - Délka pole je N, hranice 1 a 20 let.
    - Mutační kontrola: změním 12 * k na 12 * (k - 1) a ověřím, že testy
      zčervenají.
  - summary.ts: buildSummaryText(...) poskládá text se stejnými větami jako
    obrazovka, ale běžnými mezerami. Test: výstup neobsahuje \u00A0 a obsahuje
    čísla a otázky z content.ts.

  3. Komponenta a stav (B)
  - App drží depositText, yearsText a lastValid (výchozí 5 000 a 10). Calculator
    dostane tyto hodnoty přes props. LeadForm.onSuccess uloží platné hodnoty do
    scenarioAtSubmit a přepne na Summary. Při neplatném vstupu se použije
    lastValid. Scénář se nikam neukládá ani neposílá.
  - Summary.tsx podle tabulky výše: H2 s fokusem, scénář, tabulka, <details>
    zavřený (uvnitř .tbl-box s overflow-x: auto, první sloupec "Rok", pod ní
    věta z kroku 0), .small ilustrace, otázky, tlačítko a závěr. Tvar roku přes
    yearsForm a yearsUnit. Mezery před "Kč" přes formatCzk.
  - Kopírování: copyText(text): Promise<boolean> zachytí každou výjimku. Při
    selhání nebo chybějícím navigator.clipboard se ukáže hláška a pod ní
    <textarea readOnly> s označitelným textem. "Zkopírováno." jde do aria-live.
    Žádné nové události.

  4. Blok brokerů (A)
  - Pole v content.ts podle tvého bodu 4: { text, source, retrieved }, kde
    source je např. "Znalostní báze IBKR, stránka bez data". Složí se jako
    ${text} (${source}, načteno ${datum}.), přesně jako ve větě z oddílu 4.
    Datum se formátuje přes formatDate, tedy s nezlomitelnými mezerami, jak je v
    designu.
  - Test shody: pro každou položku složený výstup po nahrazení \u00A0 za mezeru
    musí být podřetězcem věty z docs/copy-cs.md, oddíl 4. Test čte
    docs/copy-cs.md, takže se obsah nemůže rozejít. Mutační kontrola: změním
    jedno slovo ve source a test zčervená.
  - Žádné uvozovky, žádný <blockquote>. <cite> obalí text zdroje v závorce,
    odkazy na zdroje jdou z data/availability.md.
  - XTB a Porto: věta bez <cite> a bez zdroje, datum je v ní. Nic o ČNB a nic o
    tvrzení Fia o jiných brokerech.
  - App: EtfTable, Brokers, Calculator, LeadForm / Summary, Risks.

  5. Ověření
  npm test, npm run lint, npm run build. V prohlížeči na 375 a 1280: hero A i B,
  kotva, souhrn, rozpis, kopírování, výpadek schránky a blok brokerů 2×2 od
  60rem. Nakonec napíšu seznam, co z designu platí a kde ses odchýlil.

  Otevřené věci, ať je plán úplný

  1. Odkazy ve <cite>: u Degira jsou dvě stránky, česká a anglická. Navrhuju
     odkazovat slova "česká" a "anglická" zvlášť, text zůstane stejný.
     Souhlasíš, nebo bez odkazů?
  2. Hero B má "Citujeme brokery z jejich stránek", ale blok jsou parafráze bez
     uvozovek. To je nesoulad v samotném copy-cs.md. Podle zadání text neměním,
     jen na to upozorňuju. Pokud chceš, stojí za to změnit "Citujeme" v docs na
     "Uvádíme, co brokeři uvádějí" nebo podobně.
  3. Pomlčka u XTB (.qmark): zachovat z designu, nebo vynechat, aby všechny
     čtyři položky měly stejné odsazení?

  Až odpovíš a plán schválíš, začnu krokem 0.

✻ Sautéed for 1m 19s · done 9:02 PM

❯ Plán schvalen. Odpovědi:                                                      
  1) Odkazy v <cite>: ano. U Degira odkaz na slova "česká" a "anglická", text   
  se nemění. Stejný způsob otevírání jako v patičce, rel="noopener noreferrer". 
  2) Hero B: změň v docs/copy-cs.md oddíl 2 (Hero B, drobný text) "Citujeme     
  brokery z jejich stránek, načteno 9. 10. 2026." na "Shrnujeme, co brokeři     
  uvádějí na svých stránkách, načteno 9. 10. 2026." Zbytek drobného textu beze  
  změny. Nejdřív docs, potom content.ts.                                        
  3) Pomlčku (.qmark) u XTB vynech. Všechny čtyři položky mají stejné odsazení, 
  XTB se liší jen tím, že nemá <cite>.                                          
  4) Texty z kroku 0 (věta pod rozpisem, hláška o selhání kopírování) schvaluji 
  tak, jak jsou.                                                                
  5) Po přesunu stavu kalkulačky do App ověř v prohlížeči (build + preview,     
  záložka Network), že calc_used se pořád odešle jednou a ne při načtení        
  stránky.                                                                      
  6) Oblast pro "Zkopírováno." (aria-live) musí být v DOM už před kliknutím a   
  měnit jen text.                                                               
                                                                                
  Pokračuj krokem 0, pak kroky 1 až 5. Nic necommituj. Na konci seznam odchylek 
  od designu a to, co nebylo ověřeno. NOTES.md doplň sekci Session 07           
  (komponenty napsal agent podle schváleného plánu).                            

⏺ Začínám krokem 0: texty do docs/copy-cs.md.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Krok 1: hero B (docs jsou hotové, teď content.ts, variant.ts, Hero).

  Ran 1 shell command (ctrl+o to expand)

⏺ Mutační kontrola pickHeroVariant:

  Ran 1 shell command (ctrl+o to expand)

⏺ Shell je fish, mutace se neprovedly. Spustím je přes bash.

  Ran 1 shell command (ctrl+o to expand)

⏺ Všechny tři mutanty hero funkce chytily testy. Krok 2: fees.ts a summary.ts s
  testy.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Mutační kontroly kroku 2:

  Ran 1 shell command (ctrl+o to expand)

⏺ Testy drží. Krok 3 a 4: komponenty, stav v App, CSS. Nejdřív Calculator s
  controlled props.

  Ran 4 shell commands (ctrl+o to expand)

⏺ Build, lint i testy jsou zelené (95). Mutační kontrola testu bloku brokerů:

  Ran 1 shell command (ctrl+o to expand)

⏺ Teď ověření v prohlížeči. Zjišťuju, co mám k dispozici.

  Listed 1 directory (ctrl+o to expand)

⏺ Repo obsahuje .env s reálnou Supabase, takže produkční build by při ověření
  odesílal data do živé databáze. Místo toho postavím testovací build do dočasné
  složky směrovaný na lokální falešný server a budu ho ovládat přes Chrome s
  puppeteer-core instalovaným mimo repo. · summary

  Ran 3 shell commands (ctrl+o to expand)

⏺ Našel jsem skutečnou chybu – při 375 px má stránka vodorovný scroll, protože
  implicitní sloupec gridu roste podle minimální šířky tabulky. Opravím to na
  minmax(0, 1fr) a zároveň upravím test, protože se nevymazal vstup a výsledek
  500 070 Kč byl jen ukázkou "poslední platné hodnoty". · summary

  Ran 1 shell command (ctrl+o to expand)
⏺ Scroll je opravený, výpočet sedí (7 000 · 0,000025 · 108·109/2 = 1 030,05 Kč).
  Zbylé 404 je favicon.ico, s touto session nesouvisí. Teď screenshoty.

  Read 4 files (ctrl+o to expand)

⏺ Blok brokerů vypadá dobře, ale na desktopu je v souhrnu useknutý sloupec
  "poplatek fondu za 10 let" kvůli white-space: nowrap na hlavičce. Opravím to
  povolením zalamování jen u hlavičky sloupce. · summary

  Read 2 files, ran 2 shell commands (ctrl+o to expand)

⏺ Layout funguje na 375 i 1280 (rozpis je zavřený, uvnitř scroll jen v .tbl-box,
  hlavní tabulka se vejde). Uklízím servery, spouštím finální kontroly a píšu
  NOTES.md.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Všechny tři části zadání jsou hotové, nic není commitnuté. Texty jsou z
  copy-cs.md a data/availability.md. Testy (95), lint a build procházejí.

  Co je hotové

  - Docs první: do docs/copy-cs.md jsem zapsal tři schválené změny: "Shrnujeme,
    co brokeři uvádějí…" v hero B, větu pod rozpisem a hlášku o selhání
    kopírování.
  - Hero B: heroContent.B a pole anchor u obou variant. Hero čte kotvu z obsahu.
    pickHeroVariant volá readAdVariant, parsování tedy není zdvojené, a tracker
    se nemění.
  - Souhrn: stav kalkulačky je v App. Při neplatném vstupu se použijí poslední
    platné hodnoty a scénář zůstává jen v paměti stránky.
  - Rozpis po letech: feeForYear jsem zrušil i s testy. Nahradila ji
    cumulativeFees (totalFee(12·k)), jejíž poslední řádek se přesně rovná hlavní
    tabulce.
  - Kopírování: copyText nikdy nevyhodí výjimku. Oblast role="status" je v DOM
    od začátku a mění se jen její text.
  - Blok brokerů: mezi EtfTable a Calculator. Test brokers.test.ts čte
    docs/copy-cs.md a porovnává složené věty slovo od slova.
  - Mutační kontroly: všechny mutanty (hero funkce, cumulativeFees, text pro
    schránku, copyText, blok brokerů) zachytily testy.

  Ověření v prohlížeči

  Použil jsem build s falešným lokálním serverem místo Supabase, aby se nic
  nezapsalo do živé databáze.
  - Hero: bez parametru hero A, s ?utm_content=b hero B a CTA vede na #tabulka.
  - Tracking: po načtení odešel jen page_view. calc_used odešel po první změně
    jednou a podruhé už ne.
  - Souhrn: fokus je na H2 a poslední řádek rozpisu se rovná hlavní tabulce.
    Vložený text je bez nezlomitelných mezer a simulovaný výpadek schránky ukáže
    hlášku s označeným textem.
  - Opravené při ověření: na 375 px měla stránka vodorovný scroll kvůli gridu a
    na desktopu byl useknutý sloupec s poplatkem. Obojí je opravené.
  - Kotva: #tabulka nic nezakrývá (sticky prvek v CSS není).

  Odchylky od designu

  Podrobně jsou v NOTES.md, sekce Session 07.
  - Brokeři: bez <figure>, <blockquote> a uvozovky „. XTB a Porto bez pomlčky a
    bez <cite>.
  - Odkazy: ve <cite> jsou odkazy na zdroje, v designu nejsou.
  - CSS: @media místo container queries. Hlavičky sloupců se smí zalamovat a
    buňky mají menší padding pod 40rem.
  - Rozpis: obsah rozbaleného <details> jsem navrhl podle .sumtable.
  - "Zkopírováno.": bez ikony fajfky. Fallback <textarea> v designu není.

  Do textu pro schránku jsem navíc přidal větu o předpokladech z kalkulačky, aby
  vložený text nebyl bez nich.

  Neověřeno

  - reálná Supabase a nasazení na Vercelu,
  - Safari/iOS, ovládání klávesnicí, screen reader a schránka mimo Chrome,
  - věrnost designu jen okem na screenshotech, ne pixelově,
  - favicon.ico vrací 404, to bylo už dřív.

  Další krok: projít git diff a commitnout po částech. Nové soubory jsou
  untracked (brokers.ts, summary.ts, jejich testy, Brokers.tsx, Summary.tsx) a
  ai-log/06b-styl.md už untracked byl.

✻ Churned for 6m 1s · done 9:11 PM

※ recap: Cílem session 07 bylo dodat blok brokerů, souhrn po odeslání formuláře a hero B pro ETF landing page. Vše je hotové a ověřené, nic není commitnuté. Další krok: projít `git diff` a commitnout po částech.

❯ Doplň názvy fondů. Postup:                                                    
  1) Nejdřív data/etf-sources.md: ke každému fondu přidej řádek "název podle    
  stránky emitenta" s přesným zněním a datem načtení 11. 10. 2026 (zdroj:       
  stránka v sourceUrl).                                                         
  2) Potom src/data/etfs.ts: pole name z těchto řádků, nic z paměti.            
     IVV: iShares Core S&P 500 ETF                                              
     VOO: Vanguard S&P 500 ETF                                                  
     VTI: Vanguard Morningstar Total Stock Market ETF                           
     SCHD: Schwab U.S. Dividend Equity ETF                                      
     QQQ: Invesco QQQ ETF                                                       
  3) Projdi, kde se name zobrazuje (tabulka, karty, případně souhrn), a ověř,   
  že zástupný text "[název z webu emitenta]" už nikde nezůstal. Přidej test:    
  žádný fond nemá name === null.                                                
  4) Aktualizuj docs/copy-cs.md oddíl 3 (poznámka "Název fondu: [název z webu   
  emitenta]" už neplatí) a komentáře v etfs.ts (zmínky "to be filled from the   
  issuer page").                                                                
  5) Spusť npm test, lint a build a napiš výsledek.                             
     Nic necommituj.                                                            

⏺ Nejdřív si přečtu zdrojový soubor a data, pak ověřím názvy přímo na stránkách
  emitentů. Zadaná znění nezapisuju bez kontroly.

  Searched for 1 pattern (ctrl+o to expand)

⏺ Teď ověřuju názvy na stránkách emitentů (WebFetch je odložený nástroj, načtu
  ho).

⏺ Fetch(https://www.ishares.com/us/products/239726/ishares-core-sp-500-etf)
  ⎿  Received 2.8MB (200 OK)

⏺ Fetch(https://investor.vanguard.com/investment-products/etfs/profile/voo)
  ⎿  Received 257.7KB (200 OK)

⏺ Fetch(https://investor.vanguard.com/investment-products/etfs/profile/vti)
  ⎿  Received 258KB (200 OK)

⏺ Fetch(https://www.schwabassetmanagement.com/products/schd)
  ⎿  Received 0 bytes (403 Forbidden)

⏺ Fetch(https://www.invesco.com/qqq-etf/en/about.html)
  ⎿  Received 205.6KB (200 OK)

⏺ SCHD vrátil 403, QQQ nemá název v nadpisu. Zkusím surové HTML přes curl, abych
  viděl přesná znění.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Všech pět názvů je ověřeno na stránkách (SCHD přes Chrome, curl dostal 403).
  Teď zjistím, kde se name používá a kde zůstal zástupný text. Předchozí grep
  kvůli fish neproběhl.

  Ran 1 shell command (ctrl+o to expand)

⏺ Zjistil jsem, že placeholder "[název z webu emitenta]" existuje jen v
  dokumentaci – v UI se name === null prostě nevykreslí (EtfTable.tsx:61 a :111)
  a souhrn názvy nezobrazuje. Teď provedu úpravy v zadaném pořadí. · summary

  Ran 1 shell command (ctrl+o to expand)

⏺ docs/strategy.md se změnil, a to jsem neměl v úmyslu. Zjišťuju, co se stalo.

  Ran 1 shell command (ctrl+o to expand)

⏺ Ty dvě externí změny ve strategy.md a copy-cs.md (ze sessionStorage) jsem
  zachoval beze zásahu, protože nejsou moje a vznikly mimo tuto session. Nyní
  provedu mutační kontrolu testu a finální běh. · summary

  Ran 1 shell command (ctrl+o to expand)

⏺ Názvy fondů jsou doplněné. npm test prošel (97 testů), lint je čistý, build
  prošel a Prettier hlásí vše v pořádku. Nic není commitnuté.

  Ověření názvů: zadaná znění jsem nezapsal naslepo, ale zkontroloval je na
  stránkách z sourceUrl. Všech pět sedí.
  - IVV: h1 stránky.
  - VOO a VTI: <title> stránky (VTI-Vanguard Morningstar Total Stock Market ETF 
    | Vanguard).
  - SCHD: curl a WebFetch dostaly 403, takže jsem stránku načetl v Chrome přes
    puppeteer. Název je v h1.
  - QQQ: je to nejslabší místo. Nadpis stránky je "About QQQ" a <title> je
    "Holdings & Sector Allocations of Invesco QQQ". "Invesco QQQ ETF" je název z
    textu stránky (6×). Právní subjekt se na stránce jmenuje "Invesco QQQ
    Trust". Zapsal jsem to do poznámky a rozhodnutí je na tobě.

  Změny podle kroků:
  1. data/etf-sources.md: nová tabulka "Fund names" se znění, místem na stránce
     a datem načtení 2026-10-11, plus poznámka o SCHD a QQQ.
  2. src/data/etfs.ts: name je vyplněné u všech pěti fondů a komentáře jsou
     aktualizované.
  3. Zobrazení: name se vykresluje jen v EtfTable.tsx (karty i tabulka, řádky 61
     a 111). Souhrn ani patička názvy nezobrazují. Zástupný text "[název z webu
     emitenta]" nebyl nikdy v UI, jen v dokumentaci. V dist ho není a "Invesco
     QQQ ETF" tam je. Nový test src/data/etfs.test.ts hlídá, že žádný fond nemá
     name === null, prázdný název ani zástupný text. Tři mutace (null, zástupný
     text, prázdný řetězec) test zachytil.
  4. docs/copy-cs.md, oddíl 3: poznámka o zástupném textu je nahrazená přesnými
     názvy a odkazem na data/etf-sources.md.

  Mimo moje změny: git status ukazuje i úpravy docs/strategy.md a poslední
  odrážky oddílu 8 v copy-cs.md (text o sessionStorage a cookie Supabase).
  Provedl je někdo jiný (soubory se změnily v 21:20), nejspíš ty. Nechal jsem je
  tak, jak jsou. Pokud nemají být součástí commitu s názvy fondů, dej je do
  samostatného.

  Typ name je dál string | null a komponenty mají ochranu !== null. Pokud chceš
  typ zpřísnit na string, jsou to dva řádky v EtfTable.tsx.

✻ Churned for 1m 24s · done 9:23 PM

※ recap: Cíl: dokončit session 07 ETF landing page (brokeři, souhrn, hero B) a doplnit názvy fondů, vše hotové, testy, lint i build prochází, nic necommitnuto. Další krok: projít git diff a commitnout po částech, QQQ název nech na svém rozhodnutí.

❯ Doplň do NOTES.md na konec sekce Session 07 odstavec "Názvy fondů" (3 až 5    
  vět): odkud názvy jsou (stránky emitentů, ověřeno 11. 10. 2026), proč u QQQ   
  "Invesco QQQ ETF" (název z textu stránky, nadpis je "About QQQ", právní       
  subjekt "Invesco QQQ Trust"), co hlídá test, že SCHD šel načíst jen v Chrome  
  (curl a WebFetch 403). Nic necommituj.                                        

  Ran 1 shell command (ctrl+o to expand)

⏺ Na konec sekce Session 07 v NOTES.md jsem přidal odstavec "Názvy fondů" (5
  vět). Nic není commitnuté a Prettier hlásí soubor v pořádku.

  Odstavec říká:
  - odkud názvy jsou (stránky emitentů, ověřeno 11. 10. 2026),
  - proč je u QQQ "Invesco QQQ ETF" (název z textu stránky, nadpis je "About
    QQQ", právní subjekt "Invesco QQQ Trust"),
  - že SCHD šel načíst jen v Chrome (curl a WebFetch 403),
  - co hlídá test (žádný fond nemá name === null, prázdný název ani zástupný
    text) a že mutace zachytil.

  Odstavec stojí až za seznamem "Neověřeno" jako poslední věc sekce, ne uvnitř
  seznamu. Pokud ho chceš výš, mezi "Ověřeno" a "Neověřeno", dej vědět.
✻ Brewed for 10s · done 9:29 PM