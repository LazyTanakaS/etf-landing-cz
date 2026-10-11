 ▐▛███▛█   Claude Code v2.1.295
▝▜██████▀  Sonnet 5.5 · Claude Pro
 ▝▝   ▝▝   ~/Desktop/Projects/etf-landing-cz


❯ /clear                                                                        

❯ /effort high                                                                  
  ⎿  Set effort level to high (saved as your default for new sessions):
     Comprehensive implementation with extensive testing and documentation ·
     burns fastest — medium handles most tasks

❯ Přečti CLAUDE.md, docs/strategy.md (oddíl 4 a Příloha A), docs/copy-cs.md     
  (oddíly 2, 5 a 9), src/data/etfs.ts, src/fees.ts, src/fees.test.ts,           
  src/content.ts, src/components/Hero.tsx, src/components/EtfTable.tsx a        
  src/App.tsx. Pracuj v plan mode. Nic nevytvářej ani neměň, dokud neřeknu      
  "zapiš". Git neřeš: nic necommituj a nepushuj, commity dělám já.              
                                                                                
  Cíl této session: kalkulačka poplatku fondu. Bez formuláře, souhrnu,          
  Supabase, měření a bloku "Co uvádějí brokeři".                                
                                                                                
  Udělej:                                                                       
  1. Komponenta Calculator (id="kalkulacka") v App.tsx za tabulkou. Pole: Fond  
  (výběr z pěti, stejné pořadí jako v tabulce, v nabídce jen symbol), Měsíční   
  vklad v Kč (výchozí 5 000), Doba investování v letech (výchozí 10). Texty     
  slovo od slova z docs/copy-cs.md, oddíl 5, ulož do src/content.ts.            
  2. Výsledek počítej funkcí totalFee ze src/fees.ts. Počet měsíců = roky * 12. 
  Zaokrouhluj až při zobrazení (Intl, cs-CZ).                                   
  3. Řádek "Pro představu" podle oddílu 5: nejnižší a nejvyšší TER z            
  src/data/etfs.ts, vklad 5 000 Kč, 120 měsíců, stejná funkce totalFee. Žádná   
  druhá implementace vzorce a žádné pevné číslo v textu. Řádek nezávisí na      
  hodnotách zadaných do kalkulačky. Pokud v src/fees.test.ts chybí test na      
  hodnotu 4 537,50 Kč, napiš to do plánu.                                       
  4. Hero A: CTA href změň na #kalkulacka a odstraň komentář TODO.              
  5. Věta s předpokladem výpočtu (oddíl 5) stojí viditelně hned u výsledku.     
                                                                                
  Pravidla:                                                                     
  - Soubory src/fees.ts a src/fees.test.ts neměň. Je to moje a ověřená část.    
  Pokud myslíš, že je tam chyba, napiš to do plánu.                             
  - Žádné nové závislosti, žádný stav mimo useState, žádné knihovny na          
  formuláře.                                                                    
  - Styl kódu jako v existujících souborech (.prettierrc). Žádný fialový        
  gradient, systémové písmo.                                                    
  - Přístupnost: každé pole má label, vstup pro částku a roky s                 
  inputMode="numeric", výsledek v aria-live="polite", viditelný focus.          
  Mobile-first, 375 px bez vodorovného posunu.                                  
                                                                                
  Nejdřív do plánu napiš tyto tři otázky s návrhem řešení, nerozhoduj je za mě: 
  a) Meze pro vklad a dobu (min a max) a co se zobrazí při prázdném, nulovém    
  nebo záporném vstupu. V copy-cs.md pro chyby kalkulačky text není. Navrhni    
  krátký text a označ ho [návrh, schválí autor].                                
  b) Česká podoba počtu let ve větě "Poplatek fondu za {n} let": 1 rok, 2 až 4  
  roky, 5 a více let. Navrhni řešení a označ ho [návrh, schválí autor].         
  c) Zda měnit tabulku a Hero jinak, než je výše. Pokud ano, napiš proč.        
                                                                                
  Stop: zeptej se před přidáním závislosti nebo úpravou konfigurace mimo        
  šablonu.                                                                      
  Hotovo: npm test, npm run build i npm run lint projdou, na šířce 375 px a     
  1440 px není vodorovný posun a kalkulačka je čitelná a ovladatelná z          
  klávesnice. Na konci vypiš změněné soubory a skutečný výstup příkazů, ne      
  shrnutí.                                                                      

⏺ Nejdřív načtu nástroje pro plan mode a přečtu zadané soubory.

  Read 10 files (ctrl+o to expand)

⏺ Entered plan mode
  Claude is now exploring and designing an implementation approach.

  Read 3 files, ran 1 shell command (ctrl+o to expand)

⏺ Updated plan
  ⎿  /plan to preview

⏺ User approved Claude's plan
  ⎿  Plan saved to: ~/.claude/plans/snazzy-tickling-planet.md · /plan to edit
     Plán: kalkulačka poplatku fondu (session 04)

     Stav: návrh. Nic nezapisuji, dokud autor neřekne "zapiš". Git neřeším
     (commity dělá autor).

     Kontext

     Hero A odkazuje na kalkulačku, která zatím neexistuje (TODO v Hero.tsx).
     Cíl: komponenta Calculator (id="kalkulacka") za tabulkou, výpočet přes
     totalFee ze src/fees.ts, texty slovo od slova z docs/copy-cs.md oddíl 5 v
     src/content.ts. Mimo rozsah: formulář, souhrn, Supabase, měření, blok "Co
     uvádějí brokeři".

     Pozn.: spoléhám na výjimku ze strategie, oddíl 9 (v tomto projektu kód s AI
     vzniká, vzorec a jeho test jsou autorovy). fees.ts a fees.test.ts se
     nemění.

     ---

     Tři otázky k rozhodnutí autora

     a) Meze vstupů a chybové stavy

     Co zjistím z kódu: totalFee nemá žádné ochrany. Příklad s reálnými čísly:
     totalFee(5000, 0.0003, -2) = 5000 * 0,000025 * ((-2) * (-1)) / 2 = +0,125 
     Kč (kladný poplatek za záporné období). Proto musí validovat kalkulačka, ne
     vzorec. Zároveň to není chyba ve fees.ts (vzorec je definovaný pro n >=
     0), jen komponenta nesmí poslat nesmysl.

     Návrh pravidel [návrh, schválí autor]:

     ┌───────────────┬─────────────────────────────────────────────────┬───────┐
     │     Pole      │                    Povoleno                     │ Jinak │
     ├───────────────┼─────────────────────────────────────────────────┼───────┤
     │ Měsíční vklad │ celé číslo 100 až 1 000 000 Kč (mezery jako     │ chyba │
     │               │ oddělovač tisíců se tolerují: "5 000")          │       │
     ├───────────────┼─────────────────────────────────────────────────┼───────┤
     │ Doba          │ celé číslo 1 až 50 let                          │ chyba │
     │ investování   │                                                 │       │
     └───────────────┴─────────────────────────────────────────────────┴───────┘

     - Prázdné pole, 0, záporné číslo, desetinné číslo, písmena i mimo rozsah =
       jedna a tatáž chyba u daného pole. Důvod: pro návštěvníka znamená všechno
       totéž ("zadejte hodnotu v rozsahu"), méně textů ke schválení.
     - Meze nemají zdroj. Nejsou to fakta o brokerech, jen pojistka proti
       nesmyslům a proti zobrazení "0,00 Kč" pro vklad 1 Kč. Alternativa: dolní
       mez 1 Kč (bez libovolného čísla, ale s tím zavádějícím "0,00 Kč").
     - Texty chyb [návrh, schválí autor]:
       - Vklad: Zadejte měsíční vklad jako celé číslo od 100 do 1 000 000 Kč.
       - Doba: Zadejte dobu investování jako celé číslo let od 1 do 50.
     - Chování: chyba se ukáže po opuštění pole (blur), ne při psaní (jinak "5"
       při psaní "5000" bliká chybou pod mezí 100). Při neplatném vstupu se
       výsledek nezobrazí (žádné staré číslo). Chyba je u pole, napojená přes
       aria-describedby, pole má aria-invalid.
     - Pole jako type="text" + inputMode="numeric" (ne type="number": spinnery,
       povolené "e", rozdílné desetinné oddělovače). Hodnoty držím jako text ve
       stavu, parsuju až při výpočtu.

     b) Česká podoba "{n} let" ve větě "Poplatek fondu za {n} let"

     Pravidlo po předložce "za" (4. pád): 1 = rok, 2 až 4 = roky, ostatní = let.
     Příklady: "za 1 rok", "za 3 roky", "za 10 let".

     Návrh [návrh, schválí autor]: malá čistá funkce yearsLabel(n) v content.ts
     (nebo format.ts), pro 1 / 2-4 / ostatní. Tři slovní tvary se uloží do
     content.ts.

     Nejistota [neověřeno]: složená čísla 21 až 24, 31 až 34, 41 až 44. Nejsem
     si jistý, zda psát "22 roky" nebo "22 let" (zápis číslicemi vs. slovy
     "dvaadvacet let"). Možnosti:
     1. Mez doby 1 až 20 let: složená čísla nevznikají, pravidlo je jednoznačné.
        Kompromis: horizont 30 let nejde zadat.
     2. Mez 1 až 50 a pro n > 20 vždy "let". Kompromis: u 22 může být gramaticky
        sporné, ověřit v Internetové jazykové příručce ÚJČ.
     3. Mez 1 až 50 a pravidlo podle poslední číslice. Totéž riziko opačně.

     Doporučení k rozhodnutí: 1, nebo 2 po ověření v příručce. Rozhodne autor.

     Související: řádek "Pro představu" má v šabloně "po dobu {roky} let" (2.
     pád, jiný než "za"). Doba je pevná konstanta 120 měsíců = 10 let, takže tam
     stojí vždy "let" a skloňování netřeba. Změní-li se konstanta na 1 rok,
     bylo by to "po dobu 1 roku", proto konstantu nechávám na 10 let a mám to v
     plánu jako poznámku.

     c) Změny tabulky a Hero mimo zadané

     - Tabulka: beze změny. EtfTable.tsx se nemění. Jen App.tsx jednou spočítá
       sortByTer(etfs) a předá stejný seznam tabulce i kalkulačce (zaručí stejné
       pořadí).
     - Hero: jen href="#kalkulacka" a smazání TODO komentáře, jak je zadáno.
       Hero B (anchor na tabulku) neexistuje v content.ts, nesahám na něj.
     - Upozornění, ne změna: na mobilu je kalkulačka až pod pěti kartami
       tabulky, tlačítko "Spočítat poplatek" tedy skočí dost daleko. Je to v
       souladu s pořadím sekcí (copy-cs oddíl 9) a se zadáním. Nic neměním. Až
       přibude blok brokerů mezi tabulku a kalkulačku, bude skok delší.
     - Výklad copy, potvrdit: v oddílu 5 "Pole: Fond (výběr z pěti) | Měsíční
       vklad, Kč (výchozí 5 000) | Doba investování, roky (výchozí 10)" čtu
       závorky jako poznámku, ne jako text štítku. Štítky tedy: Fond, Měsíční 
       vklad, Kč, Doba investování, roky.
     - Výchozí fond: první v pořadí tabulky (IVV, nejnižší TER). Vyhne se novému
       textu typu "Vyberte fond". Může to působit jako nenápadné doporučení,
       tak to uvádím. Alternativa (prázdná volba) potřebuje text, který v copy
       není.

     ---

     Kontrola věcí ze zadání

     - Test na 4 537,50 Kč existuje: src/fees.test.ts:45-52 (illustration,
       toBeCloseTo(4537.5), počítá z etfs). Nic nechybí. Test ale počítá s
       vlastními literály 5000 a 120, nehlídá řádek na stránce. Pokud chcete
       hlídat i stránku, navrhuju nový soubor (viz krok 3), fees.test.ts zůstane
       nedotčen.
     - fees.ts revize, chybu jsem nenašel. Ručně: měsíc k má držené k vkladů,
       poplatek měsíce = k * vklad * TER/12, součet 1..n = n(n+1)/2. n=120: 5000
       * 0,0003/12 * 7260 = 907,50. feeForYear: rok 1 = 12 * (1+12)/2 = 78 ->
       0,125 * 78 = 9,75. Souhlasí s přílohou A.
     - Věta s předpokladem (copy 5) má stejný význam jako vzorec (v copy je
       poznámka "ověřit"): "jedna dvanáctina ročního TER z držené hodnoty",
       zhodnocení 0 % = držená hodnota = součet vkladů. Ověřeno, souhlasí.
     - Žádná druhá implementace vzorce. feeForYear se nepoužije (patří do
       souhrnu v příští session).

     ---

     Plán implementace (po "zapiš")

     Žádné nové závislosti, žádná konfigurace. Styl: .prettierrc (bez středníků,
     jednoduché uvozovky).

     1. src/content.ts: nový blok calculatorContent (komentář "docs/copy-cs.md,
        section 5"): nadpis, podnadpis, štítky, věta výsledku (funkce s
        parametry), poznámka pod výsledkem, věta s předpokladem, šablona "Pro
        představu" (funkce), chybové texty (po schválení), tvary slova rok.
        Texty slovo od slova z copy-cs.
     2. src/format.ts: přidat formatCzk(value, fractionDigits) přes
        Intl.NumberFormat('cs-CZ'), vždy "X Kč" s pevnou mezerou. Poplatek 2
        desetinná místa (907,50 Kč), vložená částka a rozdíl bez zaokrouhlování
        do mezistavů (zaokrouhluje se jen zde, při zobrazení).
     3. src/calculator.ts (nový, čisté funkce, bez Reactu): meze,
        parseWholeNumber(text) -> číslo nebo null, illustration(items) -> { 
        deposit, months, invested, minTer, maxTer, gap } přes totalFee z fees.ts
        a konstanty 5000 a 120 (nezávislé na vstupu kalkulačky). Důvod:
        testovatelné bez DOM.
        - Volitelně src/calculator.test.ts: parse (prázdné, "0", "-5", "5 000",
          "5,5", "abc"), a že illustration dá 4537,50 a 600 000 s aktuálními
          daty. fees.test.ts se nemění. Zadání to nevyžaduje, napište, jestli
          chcete.
     4. src/components/Calculator.tsx: useState pro ticker, text vkladu, text
        let, "touched" příznaky. Vše ostatní se odvozuje v renderu (žádný
        useEffect).
        - section#kalkulacka s aria-labelledby, štítky přes htmlFor/id, select
          pro fond (jen symboly, pořadí z props), dvě textová pole s
          inputMode="numeric".
        - Bez <form> (žádný odesílací stav, nehrozí přenačtení stránky při
          Enteru).
        - Výsledek: months = years * 12 -> totalFee(deposit, ter, months),
          vložené = deposit * months. Živá oblast aria-live="polite"
          aria-atomic="true" obsahuje větu výsledku a "Je to jen poplatek
          fondu...". Při neplatném vstupu je oblast prázdná.
        - Pořadí pod polem: výsledek, "Je to jen...", věta s předpokladem (běžná
          velikost písma, ne .small, ne <details>, stále viditelná i při
          neplatném vstupu, hned pod výsledkem), potom řádek "Pro představu".
        - "Pro představu": illustration(items), nezávisí na stavu, žádné pevné
          číslo v textu.
     5. src/App.tsx: const sorted = sortByTer(etfs), <EtfTable items={sorted} />
        a <Calculator items={sorted} /> v <main> za tabulkou.
     6. src/components/Hero.tsx: href="#kalkulacka", smazat TODO komentář.
     7. src/index.css: třídy pro kalkulačku. Pole pod sebou, od 40rem tři vedle
        sebe. input/select width: 100%, font-size: 1rem (iOS nezoomuje), výška
        aspoň 44 px, ohraničení z --border. Viditelný focus už řeší globální
        :focus-visible. Chyba v textu (ne jen barvou), kontrast z existujících
        proměnných. Systémové písmo, žádný gradient. Dlouhé řetězce
        overflow-wrap.

     Změněné/nové soubory: src/content.ts, src/format.ts, src/calculator.ts
     (nový), src/calculator.test.ts (nový, volitelný),
     src/components/Calculator.tsx (nový), src/App.tsx, src/components/Hero.tsx,
     src/index.css.
     Nedotčeno: src/fees.ts, src/fees.test.ts, src/components/EtfTable.tsx,
     konfigurace, package.json.

     ---

     Ověření ("Hotovo")

     1. npm test, npm run build, npm run lint: vložím skutečný výstup.
     2. Mutace (pravidlo autora): v calculator.ts změnit * 12 / záměnu min a max
        TER / mez >= 100 a ověřit, že test zčervená, potom vrátit.
     3. Šířka 375 a 1440 px: npm run dev + prohlížečový nástroj,
        document.documentElement.scrollWidth <= clientWidth. Pokud prohlížečový
        nástroj nebude k dispozici, napíšu to přímo a požádám o ruční kontrolu,
        nebudu tvrdit, že je ověřeno.
     4. Klávesnice: Tab projde odkaz CTA -> select -> vklad -> roky, focus je
        viditelný, šipky v selectu mění fond, výsledek se mění bez myši.
     5. Ruční scénáře s čísly: výchozí (IVV, 5 000, 10) = 907,50 Kč z 600 000
        Kč; QQQ = 5 445,00 Kč; 1 rok IVV = 9,75 Kč a "za 1 rok"; "Pro představu"
        = 4 537,50 Kč; prázdné / 0 / -5 / 5,5 / "abc" / 2 000 000 = chyba bez
        výsledku.
     6. Na konci: seznam změněných souborů a skutečný výstup příkazů.

     Otevřené, čeká na autora

     a) meze a texty chyb, b) tvar "rok / roky / let" a případná mez 20 let, c)
     potvrdit: tabulka beze změny, výklad štítků, výchozí fond IVV, zda psát
     calculator.test.ts.

⏺ Plán je hotový, ale zatím jsem nic nezapsal. Schválení plánu v nástroji
  nepovažuju za vaše „zapiš“ a tři otázky jsou stále otevřené. Plán je v
  /Users/tanaka/.claude/plans/snazzy-tickling-planet.md.

  Co jsem zjistil
  - Test na 4 537,50 Kč existuje. Je v src/fees.test.ts:45-52, takže nic
    nechybí. Počítá ale s vlastními literály 5000 a 120 a nehlídá řádek na
    stránce.
  - fees.ts jsem zkontroloval ručně a chybu jsem nenašel. Vychází 907,50 Kč pro
    n = 120 a 9,75 Kč pro rok 1, což sedí s přílohou A.
  - totalFee nemá žádné ochrany. totalFee(5000, 0.0003, -2) vrátí +0,125 Kč.
    Neplatné vstupy proto musí odmítnout kalkulačka.
  - Věta s předpokladem z copy-cs.md oddílu 5 odpovídá vzorci. Měsíční poplatek
    je držená hodnota × TER/12, což dává součet n(n+1)/2.

  Vaše rozhodnutí (vše v plánu s označením [návrh, schválí autor])
  - a) Meze a chyby.
    - Vklad 100 až 1 000 000 Kč, doba 1 až 50 let, celá čísla.
    - Prázdné pole, 0, záporné číslo, desetinné číslo i písmena dají jednu chybu
      u pole.
    - Texty chyb jsou navržené v plánu.
    - Chyba se ukáže až po opuštění pole.
  - b) „{n} let“. Návrh je „rok“ pro 1, „roky“ pro 2 až 4 a „let“ pro ostatní.
    - U složených čísel 21 až 24, 31 až 34 a 41 až 44 si nejsem jistý, zda psát
      „22 roky“, nebo „22 let“. Mám to jako [neověřeno].
    - Nabízím dvě cesty: omezit dobu na 1 až 20 let, nebo nechat 50 a pravopis
      ověřit v Internetové jazykové příručce.
    - Řádek „Pro představu“ má pevných 10 let, tam skloňování nepotřebuji.
  - c) Tabulka a Hero.
    - Tabulku neměním, Hero jen href a TODO.
    - Potvrďte prosím tři věci:
      - štítky polí bez závorek (Fond, Měsíční vklad, Kč, Doba investování, 
        roky),
      - výchozí fond IVV,
      - zda mám psát nový src/calculator.test.ts.
    - Na mobilu je kalkulačka až pod pěti kartami tabulky, takže CTA skočí
      daleko. Je to v souladu se zadáním a nic s tím nedělám.

  Odpovězte na a), b) a c) a napište „zapiš“.

✻ Cooked for 2m 37s · done 3:09 PM

❯ a) Meze: vklad 100 až 1 000 000 Kč, doba 1 až 20 let, celá čísla. Pole jako   
  type="text" s inputMode="numeric" a vlastní kontrolou; před kontrolou odstraň 
  mezery včetně nezlomitelné ("5 000" je platný vstup). Chyba po opuštění       
  pole, potom průběžně. aria-invalid a aria-describedby. Texty chyb vypiš do    
  odpovědi celé, zkontroluji je.                                                
  b) Tvary: 1 rok, 2 až 4 roky, 5 až 20 let. Složená čísla se neřeší. Text      
  copy-cs.md upravím sám.                                                       
  c) Štítky "Měsíční vklad" a "Doba investování" jako text, jednotky "Kč" a     
  "roky" vedle pole. Výchozí fond IVV (první řádek tabulky). Ano, piš           
  src/calculator.test.ts. Čisté funkce (validace, tvar roku, hodnota pro "Pro   
  představu") dej do src/calculator.ts. Hodnota "Pro představu" je funkce s     
  konstantami 5000 a 120, test volá ji, ne literály.                            
  Do mutací přidej: hranici tvaru roku (4/5), horní mez 20/21 a změnu vkladu či 
  doby v "Pro představu". Po schválení teď "zapiš".                             

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(src/calculator.ts)
  ⎿  Wrote 72 lines to src/calculator.ts
       1 import type { Etf } from './data/etfs'
       2 import { totalFee } from './fees'
       3 
       5   deposit: { min: 100, max: 1_000_000 },
       6   years: { min: 1, max: 20 },
       7 } as const
       8 
         section 5).
      10 // It does not depend on what the visitor types into the calcula
         tor.
     … +72 lines (ctrl+o to expand)

⏺ Write(src/calculator.test.ts)
  ⎿  Wrote 100 lines to src/calculator.test.ts
      1 import { describe, expect, it } from 'vitest'
      2 import {
      3   illustration,
      4   parseDeposit,
      5   parseYears,
      6   scenario,
      7   yearsForm,
      8 } from './calculator'
      9 import { etfs } from './data/etfs'
     … +96 lines (ctrl+o to expand)

⏺ Update(src/format.ts)
  ⎿  Added 18 lines
       4    maximumFractionDigits: 2,
       5  })
       6  
       7 +const numberFormat = new Intl.NumberFormat('cs-CZ', {          
       8 +  maximumFractionDigits: 0,                                    
       9 +})                                                             
      10 +                                                               
      11 +// 1000000 -> "1 000 000" (no-break spaces)                    
      12 +export function formatNumber(value: number): string {          
      13 +  return numberFormat.format(value)                            
      14 +}                                                              
      15 +                                                               
      16 +// Rounds only here, when displaying. 907.5 with 2 digits -> "9
         +07,50 Kč".                                                     
      17 +export function formatCzk(value: number, fractionDigits: number
         +): string {                                                    
      18 +  const formatted = new Intl.NumberFormat('cs-CZ', {           
      19 +    minimumFractionDigits: fractionDigits,                     
      20 +    maximumFractionDigits: fractionDigits,                     
      21 +  }).format(value)                                             
      22 +  return `${formatted} Kč`                                     
      23 +}                                                              
      24 +                                                               
      25  // 0.0003 -> "0,03 %"
      26  export function formatTer(ter: number): string {
      27    return terFormat.format(ter)

⏺ Update(src/calculator.test.ts)
  ⎿  Removed 2 lines
       92    })
       93  
       94    it('follows the data, not a fixed number', () => {
       95 -    const [first] = etfs                                      
       95      const doubled = etfs.map((etf) => ({ ...etf, ter: etf.ter 
           * 2 }))
       97 -    expect(first).toBeDefined()                               
       96      expect(illustration(doubled).gap).toBeCloseTo(illustration
           (etfs).gap * 2)
       97    })
       98  })

⏺ Update(src/content.ts)
  ⎿  Added 42 lines
      36      'QQQ je podle stránky emitenta kótován na Nasdaq, ne na NYS
          E. Poplatek fondu je jen jedna ze složek nákladů. Poplatky brok
          era, směna měn a daně v něm nejsou.',
      37  } as const
      38  
      39 +// docs/copy-cs.md, section 5 (calculator). Labels are the text
         + only, the units                                               
      40 +// stand next to the fields. The two error texts and the three 
         +year forms are                                                 
      41 +// not in the doc yet [návrh, schválí autor].                  
      42 +export const calculatorContent = {                             
      43 +  heading: 'Kalkulačka poplatku fondu (TER)',                  
      44 +  subheading: 'Bez zhodnocení a bez poplatků brokera.',        
      45 +  fields: {                                                    
      46 +    fund: 'Fond',                                              
      47 +    deposit: 'Měsíční vklad',                                  
      48 +    years: 'Doba investování',                                 
      49 +  },                                                           
      50 +  units: {                                                     
      51 +    deposit: 'Kč',                                             
      52 +    years: 'roky',                                             
      53 +  },                                                           
      54 +  yearsForms: {                                                
      55 +    one: 'rok',                                                
      56 +    few: 'roky',                                               
      57 +    many: 'let',                                               
      58 +  },                                                           
      59 +  depositError: (min: string, max: string) =>                  
      60 +    `Zadejte měsíční vklad jako celé číslo od ${min} do ${max} 
         +Kč.`,                                                          
      61 +  yearsError: (min: number, max: number) =>                    
      62 +    `Zadejte dobu investování jako celé číslo let od ${min} do 
         +${max}.`,                                                      
      63 +  result: (years: number, yearsForm: string, fee: string, inves
         +ted: string) =>                                                
      64 +    `Poplatek fondu za ${years} ${yearsForm}: ${fee}. Z vložený
         +ch ${invested}. Ilustrace, výpočet.`,                          
      65 +  belowResult:                                                 
      66 +    'Je to jen poplatek fondu. Poplatky brokera, směna měn a da
         +ně v něm nejsou. Výsledek není předpověď.',                    
      67 +  assumption:                                                  
      68 +    'Předpoklad výpočtu: vkládáte na začátku každého měsíce. Ka
         +ždý měsíc se z držené hodnoty účtuje jedna dvanáctina ročního p
         +oplatku fondu (TER). Zhodnocení 0 %, bez poplatků brokera a smě
         +ny měn.',                                                      
      69 +  // Every value is computed, the text has no fixed number.    
      70 +  illustration: (                                              
      71 +    deposit: string,                                           
      72 +    years: number,                                             
      73 +    invested: string,                                          
      74 +    minTer: string,                                            
      75 +    maxTer: string,                                            
      76 +    gap: string,                                               
      77 +  ) =>                                                         
      78 +    `Pro představu, ilustrace, výpočet: při ${deposit} měsíčně 
         +po dobu ${years} let (vloženo ${invested}), bez zhodnocení a be
         +z poplatků brokera, je rozdíl mezi nejnižším (${minTer}) a nejv
         +yšším (${maxTer}) poplatkem fondu z této tabulky ${gap}.`,     
      79 +} as const                                                     
      80 +                                                               
      81  // docs/copy-cs.md, section 8 (risk notice). The final wording 
          is for
      82  // [PROVOZOVATEL] or a lawyer to approve.
      83  export const riskContent = {

⏺ Write(src/components/Calculator.tsx)
  ⎿  Wrote 136 lines to src/components/Calculator.tsx
       1 import { useState } from 'react'
       2 import {
       3   illustration,
       4   limits,
       5   parseDeposit,
       6   parseYears,
       7   scenario,
       8   yearsForm,
       9 } from '../calculator'
      10 import { calculatorContent } from '../content'
     … +137 lines (ctrl+o to expand)

⏺ Update(src/App.tsx)
  ⎿  Added 1 line
      1 +import { Calculator } from './components/Calculator'            
      2  import { EtfTable } from './components/EtfTable'
      3  import { Footer } from './components/Footer'
      4  import { Hero } from './components/Hero'

⏺ Update(src/App.tsx)
  ⎿  Added 5 lines, removed 1 line
       5  import { etfs, sortByTer } from './data/etfs'
       6  
       7  function App() {
       8 +  // One sorted list, so the table and the calculator offer the
         + same order.                                                   
       9 +  const sorted = sortByTer(etfs)                               
      10 +                                                               
      11    return (
      12      <>
      13        <Hero variant="A" />
      14        <main>
      12 -        <EtfTable items={sortByTer(etfs)} />                   
      15 +        <EtfTable items={sorted} />                            
      16 +        <Calculator items={sorted} />                          
      17        </main>
      18        <Footer />
      19      </>

⏺ Update(src/components/Hero.tsx)
  ⎿  Added 1 line, removed 2 lines
      11      <header className="hero">
      12        <h1>{content.heading}</h1>
      13        <p className="hero-lead">{content.subheading}</p>
      14 -      {/* TODO: #kalkulacka (the calculator does not exist yet)
         - */}                                                           
      15 -      <a className="button" href="#tabulka">                   
      14 +      <a className="button" href="#kalkulacka">                
      15          {content.cta}
      16        </a>
      17        <p className="small">

⏺ Update(src/index.css)
  ⎿  Added 65 lines
      163    color: var(--muted);
      164  }
      165  
      166 +/* Calculator: fields stacked on narrow screens, side by side 
          +from 40rem. */                                                
      167 +#kalkulacka {                                                 
      168 +  margin-top: 2.5rem;                                         
      169 +}                                                             
      170 +                                                              
      171 +.calc-fields {                                                
      172 +  display: grid;                                              
      173 +  gap: 1rem;                                                  
      174 +  margin-bottom: 1rem;                                        
      175 +}                                                             
      176 +                                                              
      177 +.calc-field label {                                           
      178 +  display: block;                                             
      179 +  font-weight: 600;                                           
      180 +  margin-bottom: 0.25rem;                                     
      181 +}                                                             
      182 +                                                              
      183 +.calc-input-row {                                             
      184 +  display: flex;                                              
      185 +  align-items: center;                                        
      186 +  gap: 0.5rem;                                                
      187 +}                                                             
      188 +                                                              
      189 +/* 16px font keeps iOS from zooming on focus. */              
      190 +.calc-field input,                                            
      191 +.calc-field select {                                          
      192 +  width: 100%;                                                
      193 +  min-width: 0;                                               
      194 +  min-height: 2.75rem;                                        
      195 +  padding: 0.5rem 0.75rem;                                    
      196 +  font: inherit;                                              
      197 +  color: var(--text);                                         
      198 +  background: var(--surface);                                 
      199 +  border: 1px solid var(--muted);                             
      200 +  border-radius: 0.375rem;                                    
      201 +}                                                             
      202 +                                                              
      203 +.calc-field input[aria-invalid='true'] {                      
      204 +  border-color: var(--error);                                 
      205 +  border-width: 2px;                                          
      206 +}                                                             
      207 +                                                              
      208 +.calc-error {                                                 
      209 +  margin: 0.25rem 0 0;                                        
      210 +  color: var(--error);                                        
      211 +  font-weight: 600;                                           
      212 +}                                                             
      213 +                                                              
      214 +.calc-result {                                                
      215 +  background: var(--surface);                                 
      216 +  border: 1px solid var(--border);                            
      217 +  border-radius: 0.5rem;                                      
      218 +  padding: 0.75rem 1rem;                                      
      219 +  margin-bottom: 0.75rem;                                     
      220 +}                                                             
      221 +                                                              
      222 +.calc-result-line {                                           
      223 +  font-size: 1.25rem;                                         
      224 +  font-weight: 700;                                           
      225 +}                                                             
      226 +                                                              
      227 +.calc-result p:last-child {                                   
      228 +  margin-bottom: 0;                                           
      229 +}                                                             
      230 +                                                              
      231  footer {
      232    padding-block: 1.5rem 3rem;
      233    border-top: 1px solid var(--border);
⏺ Update(src/index.css)
  ⎿  Added 1 line
       6    --border: #d8d4cb;
       7    --accent: #0b5c4f;
       8    --accent-text: #ffffff;
       9 +  --error: #a02a1c;                                            
      10  
      11    --font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-se
          rif;
      12    --gutter: 1rem;

⏺ Update(src/index.css)
  ⎿  Added 4 lines
      256      padding-block: 3rem 2rem;
      257    }
      258  
      259 +  .calc-fields {                                              
      260 +    grid-template-columns: repeat(3, minmax(0, 1fr));         
      261 +  }                                                           
      262 +                                                              
      263    table {
      264      display: table;
      265      background: var(--surface);

  Ran 2 shell commands (ctrl+o to expand)

⏺ Testy, build, lint i všech devět mutací jsou hotové. Teď ověřuji vzhled na 375
  a 1440 px v prohlížeči.

⏺ Skill(anthropic-skills:built-in-browser)
  ⎿  Successfully loaded skill

  Listed 1 directory, ran 1 shell command (ctrl+o to expand)

⏺ Write(~/.claude/jobs/71e49503/tmp/check.mjs)
  ⎿  Added 166 lines, removed 30 lines
        1 -// Drives headless Chrome over CDP: measures horizontal overfl
          -ow and takes screenshots.                                     
        1 +// Headless Chrome check over CDP. Lives outside the repo, no 
          +dependencies.                                                 
        2  import { spawn } from 'node:child_process'
        3  import { writeFileSync } from 'node:fs'
        4  
        5 -const out = '/Users/tanaka/.claude/jobs/71e49503/tmp'         
        6 -const chrome = spawn(                                         
        7 -  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrom
          -e',                                                           
        8 -  ['--headless=new', '--remote-debugging-port=9333', '--no-fir
          -st-run',                                                      
        9 -   `--user-data-dir=${out}/chrome-profile`, 'about:blank'],   
       10 -  { stdio: 'ignore' },                                        
       11 -)                                                             
       12 -await new Promise((r) => setTimeout(r, 2500))                 
       13 -const targets = await (await fetch('http://127.0.0.1:9333/json
          -')).json()                                                    
        5 +const TMP = '/Users/tanaka/.claude/jobs/71e49503/tmp'         
        6 +const CHROME = '/Applications/Google Chrome.app/Contents/MacOS
          +/Google Chrome'                                               
        7 +const URL_ = 'http://localhost:4173/'                         
        8 +                                                              
        9 +const chrome = spawn(CHROME, [                                
       10 +  '--headless=new',                                           
       11 +  '--remote-debugging-port=9333',                             
       12 +  `--user-data-dir=${TMP}/chrome-profile`,                    
       13 +  '--no-first-run',                                           
       14 +  '--hide-scrollbars=false',                                  
       15 +  'about:blank',                                              
       16 +], { stdio: 'ignore' })                                       
       17 +                                                              
       18 +const sleep = (ms) => new Promise((r) => setTimeout(r, ms))   
       19 +                                                              
       20 +let targets                                                   
       21 +for (let i = 0; i < 40; i++) {                                
       22 +  try {                                                       
       23 +    targets = await (await fetch('http://127.0.0.1:9333/json')
          +).json()                                                      
       24 +    if (targets.some((t) => t.type === 'page')) break         
       25 +  } catch {}                                                  
       26 +  await sleep(250)                                            
       27 +}                                                             
       28  const page = targets.find((t) => t.type === 'page')
       29  const ws = new WebSocket(page.webSocketDebuggerUrl)
       30  await new Promise((r) => (ws.onopen = r))
       31 +                                                              
       32  let id = 0
       33  const pending = new Map()
       34  ws.onmessage = (e) => {
       35    const m = JSON.parse(e.data)
       21 -  if (m.id && pending.has(m.id)) pending.get(m.id)(m.result)  
       36 +  if (m.id && pending.has(m.id)) {                            
       37 +    pending.get(m.id)(m)                                      
       38 +    pending.delete(m.id)                                      
       39 +  }                                                           
       40  }
       41  const send = (method, params = {}) =>
       24 -  new Promise((res) => {                                      
       25 -    const i = ++id                                            
       26 -    pending.set(i, res)                                       
       27 -    ws.send(JSON.stringify({ id: i, method, params }))        
       42 +  new Promise((resolve) => {                                  
       43 +    const myId = ++id                                         
       44 +    pending.set(myId, resolve)                                
       45 +    ws.send(JSON.stringify({ id: myId, method, params }))     
       46    })
       29 -                                                              
       30 -for (const width of [375, 1440]) {                            
       31 -  await send('Emulation.setDeviceMetricsOverride', {          
       32 -    width, height: 800, deviceScaleFactor: 1, mobile: width < 
          -600,                                                          
       33 -  })                                                          
       34 -  await send('Page.navigate', { url: 'http://localhost:4173/' 
          -})                                                            
       35 -  await new Promise((r) => setTimeout(r, 1500))               
       47 +const evaluate = async (expression) => {                      
       48    const r = await send('Runtime.evaluate', {
       37 -    expression: `JSON.stringify({sw: document.documentElement.
          -scrollWidth, cw: document.documentElement.clientWidth, h: docu
          -ment.documentElement.scrollHeight, rows: document.querySelecto
          -rAll('tbody tr').length})`,                                   
       49 +    expression,                                               
       50      returnByValue: true,
       51 +    awaitPromise: true,                                       
       52    })
       40 -  console.log(width, r.result.value)                          
       41 -  const h = JSON.parse(r.result.value).h                      
       42 -  const shot = await send('Page.captureScreenshot', {         
       43 -    format: 'png',                                            
       44 -    captureBeyondViewport: true,                              
       45 -    clip: { x: 0, y: 0, width, height: h, scale: 1 },         
       53 +  return r.result?.result?.value                              
       54 +}                                                             
       55 +const key = async (k, code, vk) => {                          
       56 +  await send('Input.dispatchKeyEvent', { type: 'keyDown', key:
          + k, code, windowsVirtualKeyCode: vk })                        
       57 +  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k
          +, code, windowsVirtualKeyCode: vk })                          
       58 +}                                                             
       59 +const shot = async (name) => {                                
       60 +  const r = await send('Page.captureScreenshot', { format: 'pn
          +g', captureBeyondViewport: true })                            
       61 +  writeFileSync(`${TMP}/${name}.png`, Buffer.from(r.result.dat
          +a, 'base64'))                                                 
       62 +}                                                             
       63 +const open = async (width, height) => {                       
       64 +  await send('Emulation.setDeviceMetricsOverride', {          
       65 +    width, height, deviceScaleFactor: 1, mobile: width < 600, 
       66    })
       47 -  writeFileSync(`${out}/shot-${width}.png`, Buffer.from(shot.d
          -ata, 'base64'))                                               
       67 +  await send('Page.navigate', { url: URL_ })                  
       68 +  await sleep(800)                                            
       69  }
       70 +const focusId = () => evaluate('document.activeElement && (doc
          +ument.activeElement.id || document.activeElement.tagName + "."
          + + document.activeElement.className)')                        
       71 +const setField = async (selector, value) => {                 
       72 +  await evaluate(`document.querySelector(${JSON.stringify(sele
          +ctor)}).focus()`)                                             
       73 +  await evaluate('document.activeElement.select()')           
       74 +  if (value === '') await key('Backspace', 'Backspace', 8)    
       75 +  else await send('Input.insertText', { text: value })        
       76 +}                                                             
       77 +const blur = () => evaluate('document.activeElement.blur()')  
       78 +const resultText = () => evaluate(`(() => {                   
       79 +  const live = document.querySelector('#kalkulacka [aria-live]
          +')                                                            
       80 +  return live ? live.innerText.replace(/\\u00a0/g, ' ') : null
       81 +})()`)                                                        
       82 +const errors = () => evaluate(`[...document.querySelectorAll('
          +.calc-error')].map(e => e.innerText)`)                        
       83 +                                                              
       84 +await send('Page.enable')                                     
       85 +await send('Runtime.enable')                                  
       86 +                                                              
       87 +for (const [w, h] of [[375, 812], [1440, 900]]) {             
       88 +  await open(w, h)                                            
       89 +  const m = await evaluate(`({                                
       90 +    scrollWidth: document.documentElement.scrollWidth,        
       91 +    clientWidth: document.documentElement.clientWidth,        
       92 +    bodyScrollWidth: document.body.scrollWidth,               
       93 +  })`)                                                        
       94 +  console.log(`== ${w}px`, JSON.stringify(m), m.scrollWidth <=
          + m.clientWidth ? 'NO horizontal scroll' : 'HORIZONTAL SCROLL!'
          +)                                                             
       95 +  const wide = await evaluate(`[...document.querySelectorAll('
          +#kalkulacka *')].filter(e => e.getBoundingClientRect().right >
          + document.documentElement.clientWidth + 0.5).map(e => e.tagNam
          +e + '.' + e.className)`)                                      
       96 +  console.log('   elements wider than viewport inside calculat
          +or:', JSON.stringify(wide))                                   
       97 +  const fs = await evaluate(`(() => { const i = document.query
          +Selector('#kalkulacka-vklad'); const s = getComputedStyle(i); 
          +const r = i.getBoundingClientRect(); return { fontSize: s.font
          +Size, height: r.height } })()`)                               
       98 +  console.log('   input font/height:', JSON.stringify(fs))    
       99 +  await evaluate(`document.querySelector('#kalkulacka').scroll
          +IntoView()`)                                                  
      100 +  await shot(`calc-${w}`)                                     
      101 +}                                                             
      102 +                                                              
      103 +// Behaviour and keyboard at 375 px.                          
      104 +await open(375, 812)                                          
      105 +console.log('== default result:', await resultText())         
      106 +console.log('   illustration line:', await evaluate(`[...docum
          +ent.querySelectorAll('#kalkulacka > p')].map(p => p.innerText.
          +replace(/\\u00a0/g, ' ')).join('\\n   ')`))                   
      107 +                                                              
      108 +// Tab order starting from the hero CTA.                      
      109 +await evaluate(`document.querySelector('.button').focus()`)   
      110 +const order = [await focusId()]                               
      111 +for (let i = 0; i < 3; i++) { await key('Tab', 'Tab', 9); orde
          +r.push(await focusId()) }                                     
      112 +console.log('== Tab order from CTA:', JSON.stringify(order))  
      113 +                                                              
      114 +// Tab skips table links; verify the sequence reaches the calc
          +ulator fields in order.                                       
      115 +await evaluate(`document.querySelector('#kalkulacka-fond').foc
          +us()`)                                                        
      116 +const seq = [await focusId()]                                 
      117 +for (let i = 0; i < 2; i++) { await key('Tab', 'Tab', 9); seq.
          +push(await focusId()) }                                       
      118 +console.log('   fund -> deposit -> years:', JSON.stringify(seq
          +))                                                            
      119 +const outline = await evaluate(`(() => { const s = getComputed
          +Style(document.activeElement); return s.outlineStyle + ' ' + s
          +.outlineWidth + ' ' + s.outlineColor })()`)                   
      120 +console.log('   focus outline on years input (keyboard focus):
          +', outline)                                                   
      121 +                                                              
      122 +// Select a fund with the keyboard: ArrowDown on the focused s
          +elect.                                                        
      123 +await evaluate(`document.querySelector('#kalkulacka-fond').foc
          +us()`)                                                        
      124 +await key('End', 'End', 35)                                   
      125 +console.log('   select value after End key:', await evaluate(`
          +document.querySelector('#kalkulacka-fond').value`))           
      126 +console.log('   result for last fund:', await resultText())   
      127 +await evaluate(`document.querySelector('#kalkulacka-fond').val
          +ue`)                                                          
      128 +                                                              
      129 +// Reload for clean scenarios.                                
      130 +await open(375, 812)                                          
      131 +const scenarios = [                                           
      132 +  ['5000', '1'],                                              
      133 +  ['5 000', '2'],                                             
      134 +  ['5 000', '4'],                                             
      135 +  ['100', '5'],                                               
      136 +  ['1000000', '20'],                                          
      137 +]                                                             
      138 +for (const [d, y] of scenarios) {                             
      139 +  await setField('#kalkulacka-vklad', d)                      
      140 +  await setField('#kalkulacka-roky', y)                       
      141 +  await blur()                                                
      142 +  console.log(`== deposit "${d}" years "${y}":`, JSON.stringif
          +y(await resultText()), 'errors:', JSON.stringify(await errors(
          +)))                                                           
      143 +}                                                             
      144 +                                                              
      145 +console.log('== invalid inputs')                              
      146 +await open(375, 812)                                          
      147 +const bad = [                                                 
      148 +  ['vklad', '#kalkulacka-vklad', ''],                         
      149 +  ['vklad', '#kalkulacka-vklad', '0'],                        
      150 +  ['vklad', '#kalkulacka-vklad', '-5'],                       
      151 +  ['vklad', '#kalkulacka-vklad', '5,5'],                      
      152 +  ['vklad', '#kalkulacka-vklad', 'abc'],                      
      153 +  ['vklad', '#kalkulacka-vklad', '99'],                       
      154 +  ['vklad', '#kalkulacka-vklad', '1000001'],                  
      155 +  ['roky', '#kalkulacka-roky', ''],                           
      156 +  ['roky', '#kalkulacka-roky', '0'],                          
      157 +  ['roky', '#kalkulacka-roky', '21'],                         
      158 +  ['roky', '#kalkulacka-roky', '2,5'],                        
      159 +]                                                             
      160 +for (const [name, sel, val] of bad) {                         
      161 +  await open(375, 812)                                        
      162 +  await setField(sel, val)                                    
      163 +  const before = await errors()                               
      164 +  await blur()                                                
      165 +  const after = await errors()                                
      166 +  const attrs = await evaluate(`(() => { const i = document.qu
          +erySelector(${JSON.stringify(sel)}); return { invalid: i.getAt
          +tribute('aria-invalid'), describedby: i.getAttribute('aria-des
          +cribedby') } })()`)                                           
      167 +  console.log(`   ${name} "${val}": errors before blur ${JSON.
          +stringify(before)}, after blur ${JSON.stringify(after)}, resul
          +t ${JSON.stringify(await resultText())}, ${JSON.stringify(attr
          +s)}`)                                                         
      168 +}                                                             
      169 +                                                              
      170 +// Live validation after blur: field already touched, now type
          + bad then good value.                                         
      171 +await open(375, 812)                                          
      172 +await setField('#kalkulacka-vklad', '')                       
      173 +await blur()                                                  
      174 +console.log('== live after blur: empty ->', JSON.stringify(awa
          +it errors()))                                                 
      175 +await setField('#kalkulacka-vklad', '7500')                   
      176 +console.log('   typed 7500 (no blur):', JSON.stringify(await e
          +rrors()), JSON.stringify(await resultText()))                 
      177 +await setField('#kalkulacka-vklad', '5')                      
      178 +console.log('   typed 5 (no blur, touched):', JSON.stringify(a
          +wait errors()))                                               
      179 +await setField('#kalkulacka-vklad', '')                       
      180 +await setField('#kalkulacka-roky', '')                        
      181 +await blur()                                                  
      182 +await evaluate(`document.querySelector('#kalkulacka').scrollIn
          +toView()`)                                                    
      183 +await shot('calc-375-errors')                                 
      184 +                                                              
      185  ws.close()
      186  chrome.kill()
      187  process.exit(0)

  Read 3 files, ran 2 shell commands (ctrl+o to expand)

⏺ Vzhled sedí na 375 i 1440 px. Teď zastavuji preview server a naposledy
  spouštím příkazy pro finální výstup.

  Ran 1 shell command (ctrl+o to expand)

⏺ Kalkulačka je hotová: npm test, npm run build i npm run lint projdou a na 375
  i 1440 px není vodorovný posun. Nic jsem necommitoval. fees.ts, fees.test.ts,
  EtfTable.tsx a package.json jsem nezměnil.

  Texty chyb ke kontrole

  - Vklad: Zadejte měsíční vklad jako celé číslo od 100 do 1 000 000 Kč.
  - Doba: Zadejte dobu investování jako celé číslo let od 1 do 20.

  Čísla v nich se berou z limits a formátují přes Intl, takže jsou na jednom
  místě. Stejná chyba platí pro prázdné pole, 0, záporné číslo, desetinné číslo,
  písmena i hodnotu mimo rozsah. Tvary „rok / roky / let“ a obě chyby jsou v
  content.ts označené jako [návrh, schválí autor]. copy-cs.md upravíte sami.

  Změněné soubory

  - Nové: src/calculator.ts, src/calculator.test.ts,
    src/components/Calculator.tsx.
  - Upravené: src/content.ts (blok calculatorContent), src/format.ts
    (formatNumber, formatCzk), src/App.tsx (jeden sortByTer, kalkulačka za
    tabulkou), src/components/Hero.tsx (href="#kalkulacka", TODO pryč),
    src/index.css (třídy calc-*, --error).
  - Čisté funkce v calculator.ts: parseWholeNumber, parseDeposit, parseYears,
    yearsForm, scenario (měsíce, poplatek, vloženo) a illustration. Ta má
    konstanty 5000 a 120 a volá totalFee.

  Výstup příkazů

  npm test:   Test Files 2 passed (2) | Tests 17 passed (17)
  npm build:  ✓ 25 modules transformed … ✓ built in 67ms (tsc -b bez chyb)
  npm lint:   bez výstupu, exit=0

  Ověření v prohlížeči

  Použil jsem headless Chrome přes CDP. Skript je mimo repozitář, v
  ~/.claude/jobs/71e49503/tmp/check.mjs.
  - Šířka: při 375 i 1440 px je scrollWidth == clientWidth a v kalkulačce není
    žádný prvek přes okraj. Inputy mají 16 px a výšku 44 px.
  - Klávesnice: Tab jde fond → vklad → roky. Focus má viditelný obrys 3 px.
    Klávesa End ve selectu přepne na QQQ a výsledek se přepočítá.
  - Čísla ručně:
    - IVV, 5 000 Kč, 10 let → 907,50 Kč z 600 000 Kč.
    - QQQ → 5 445,00 Kč.
    - 1 rok → „za 1 rok“, 9,75 Kč.
    - 2 roky → 37,50 Kč, 4 roky → 147,00 Kč.
    - 1 000 000 Kč na 20 let → 723 000,00 Kč.
    - „Pro představu“ → 4 537,50 Kč z 600 000 Kč.
  - Vstup: „5 000“ i „5\u00A0000“ projdou. Všech 11 neplatných vstupů dá chybu
    až po opuštění pole, potom už průběžně, a výsledek zmizí. Pole mají
    aria-invalid a aria-describedby (jednotka plus chyba).

  Screenshoty jsou v ~/.claude/jobs/71e49503/tmp/ (calc-375.png, calc-1440.png,
  calc-375-errors.png).

  Mutace

  Každou jsem aplikoval zvlášť, testy zčervenaly a soubor jsem vrátil (kontrola
  cmp, zpět 17/17 zelených):

  ┌────────────────────────────────────────┬───────────────────┐
  │                 Mutace                 │     Výsledek      │
  ├────────────────────────────────────────┼───────────────────┤
  │ tvar roku <= 4 → <= 5                  │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ tvar roku === 1 → === 2                │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ horní mez doby 20 → 21                 │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ dolní mez vkladu 100 → 99              │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ horní mez vkladu 1 000 000 → 1 000 001 │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ „Pro představu“: vklad 5000 → 5001     │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ „Pro představu“: 120 → 121 měsíců      │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ years * 12 → * 13                      │ červený           │
  ├────────────────────────────────────────┼───────────────────┤
  │ Math.min → Math.max v illustration     │ červený (2 testy) │
  └────────────────────────────────────────┴───────────────────┘

  Poznámky

  - Zaokrouhlování 4,575: vklad 100 Kč na 5 let dá matematicky přesně 4,575 Kč a
    stránka ukáže 4,57 Kč, ne 4,58. Důvod je binární reprezentace čísla
    (4,5749999…) při zaokrouhlení v Intl. Je to jen v haléřích a jen při
    zobrazení. Chcete-li jiné pravidlo, je to jedna změna v formatCzk.
  - Výchozí vklad: v poli je 5000 bez mezery, ne „5 000“.
  - Živá oblast: aria-live hlásí celou větu výsledku při každé změně, tedy při
    psaní vícekrát. Debounce jsem nepřidával.
  - Věta s předpokladem: je běžným písmem hned pod výsledkem, ne v .small ani v
    <details>, a je vidět i při neplatném vstupu. „Pro představu“ je až pod ní a
    na vstupu nezávisí.

  Další krok

  Zkontrolujte texty chyb a git diff, a pak commitněte po svém. Pak můžu projít
  Calculator.tsx jako review, abyste ho uměli vysvětlit.

✻ Churned for 2m 40s · done 3:16 PM

※ recap: Cíl je kalkulačka poplatku fondu pro ETF landing page, a ta je hotová: testy, build i lint prochází, na 375 i 1440 px není vodorovný posun a nic není commitnuté. Další krok je, abyste zkontrolovali dva texty chyb a `git diff` a pak commitnuli.