 ▐▛███▛█   Claude Code v2.1.295
▝▜██████▀  Sonnet 5.5 · Claude Pro
 ▝▝   ▝▝   ~/Desktop/Projects/etf-landing-cz


❯ /clear                                                                        

❯ /effort medium                                                                
  ⎿  Set effort level to medium (saved as your default for new sessions):
     Balanced approach with standard implementation and testing

❯ Session 06b: vizuální styl (bez commitu, bez změny textů)                     
                                                                                
  Cíl: aplikovat design systém "klidná banka + editorial, měkká káva" na        
  stávající stránku. Podklad: designové HTML (mobile.html, desktop.html, token  
  sheet). Texty se NEMĚNÍ, kromě schválených: štítek "TER" nad velkým číslem v  
  mobilní kartě, nadpis "Zdroje" v patičce a dynamická jednotka u pole let.     
                                                                                
  Nejdřív napiš plán (soubory, pořadí, rizika) a počkej na schválení. Nic       
  necommituj.                                                                   
                                                                                
  1. Tokeny                                                                     
  - Přesuň tokeny z token sheetu do :root v src/index.css (barvy, písma,        
  stupnice, spacing, radius, --border, --shadow, --tap, --maxw).                
  - Zmapuj staré proměnné (--bg, --surface, --text, --muted, --border,          
  --accent, --error) na nové, staré odstraň, ať nezůstane mrtvý kód.            
  - Focus ring: 3px solid, offset 3px, barva = --mocha na světlém, --link-dark  
  na tmavém. Na tmavém pozadí přepiš --focus-ring uvnitř .on-dark (ne           
  --focus-light).                                                               
                                                                                
  2. Písmo                                                                      
  - Newsreader 500 a 600, self-hosted woff2 v public/fonts, subset U+0000-017F, 
  U+2013-2014, U+2018-201E, U+2026, font-display: swap.                         
  - Žádný Google Fonts, žádný externí požadavek.                                
  - Fallback "Newsreader Fallback" (local Georgia) s                            
  size-adjust/ascent-override/descent-override/line-gap-override. Hodnoty z     
  designu jsou jen startovní; ověř je a napiš, jak jsi je ladil.                
  - Preload jen váhy 600. Tělo textu: system-ui. Čísla: tabular-nums            
  lining-nums.                                                                  
  - Zkontroluj, že licence OFL je přiložena (soubor OFL.txt vedle fontů).       
  - Nahlas velikost woff2 souborů.                                              
                                                                                
  3. Hero                                                                       
  - Espresso pás, masthead s dvojitou linkou, CTA karamel s 2px espresso rámem  
  a tvrdým stínem (4px 4px 0, pressed 2px 2px 0).                               
  - POZOR, chyba v designu: pravidlo .on-dark a { color: var(--link-dark) }     
  přebíjí .btn (specificita). Oprav přes .on-dark a:not(.btn) (i pro :hover).   
  Text tlačítka musí být espresso na karamelu (5,58:1). Změř computed style a   
  kontrast v prohlížeči a uveď výsledek.                                        
                                                                                
  4. EtfTable                                                                   
  - Do 40rem karty: ticker + TER nahoře, pod tím dl řádky se štítky; nad TER    
  velký štítek "TER" (nový).                                                    
  - Od 40rem skutečná tabulka se zebrou. Žádný fond není zvýrazněn.             
  - Chybějící data kurzívou, --muted. Upozornění u VTI: čárkovaný box s SVG     
  ikonou "i".                                                                   
  - Použij @media (min-width: 40rem), ne container queries.                     
                                                                                
  5. Calculator                                                                 
  - Pergamenový list bez stínu, text max 42rem, dvojitá linka nad H2.           
  - Jednotka u pole let dynamicky podle yearsForm (1 rok, 2–4 roky, 5+ let).    
  Přidej test na tuto funkci, pokud ještě není.                                 
  - Při neplatném vstupu se blok výsledku skrývá (jako dosud).                  
                                                                                
  6. LeadForm                                                                   
  - Pergamen + tvrdý stín (akce). Chyby polí pod polem (aria-describedby),      
  chyba odeslání nad tlačítkem s role="alert", e-mail se zachová, checkbox      
  24px, tlačítka 48px.                                                          
                                                                                
  7. Rizika a patička                                                           
  - Riziková upozornění 16px (ne drobné písmo), číslování 1–7 v serifu, stejná  
  vizuální váha jako ostatní bloky. V patičce nadpis "Zdroje" (nový).           
  - Zástupné texty [PROVOZOVATEL …] třídou .ph: monospace na latte, čárkovaný   
  okraj (na espressu okraj link-dark).                                          
                                                                                
  8. Breakpointy: 40rem (gutter 24, tabulka, pole formuláře vedle sebe) a 60rem 
  (dvousloupcový hero, kalkulačka, formulář, rizika).                           
                                                                                
  Akceptace (uveď výsledky, ne jen "hotovo"):                                   
  - 375 px a 1440 px bez horizontálního scrollu.                                
  - Kontrasty AA změřené v prohlížeči, včetně textu CTA v hero.                 
  - Žádný layout shift při načtení fontu (popiš, jak jsi ověřil).               
  - Velikost CSS a fontů.                                                       
  - npm test, lint a build projdou (62 testů + případné nové).                  
  - Texty v content.ts beze změny kromě schválených; nové štítky přidej nejdřív 
  do docs/copy-cs.md.                                                           
  - Pokud se od designu odchýlíš, napiš kde a proč.                             
  - Nic neimplementuj z sessions 07 (souhrn, blok brokerů), jen styly           
  stávajících komponent.                                                        

⏺ Nejdřív si projdu projekt a podklady, ať je plán konkrétní.

  Ran 8 shell commands (ctrl+o to expand)

⏺ Rozbaluju designový soubor ze Stažených (5 stránek, gzip), abych z něj vzal
  tokeny a hodnoty fallback fontu pro plán.

  Ran 4 shell commands (ctrl+o to expand)

⏺ Plán – Session 06b (nic jsem zatím nezměnil)

  Podklad: v ~/Downloads/ETF poplatky – landing page.html je zabalených 5
  stránek (mobile, desktop, souhrn, stavy komponent, token sheet). Rozbalil jsem
  je do dočasné složky jobu, nic v repu. Tokeny, @font-face a CSS komponent z
  toho umím vzít přímo.

  Pořadí a soubory

  1. Tokeny a písmo (src/index.css, public/fonts/, index.html)
     - Nové tokeny do :root (paper, parchment, latte, espresso, ink, muted,
       mocha, caramel, link-dark, error, divider, zebra; písma; --fs-*; radius;
       --border, --shadow, --maxw; --tap: 48px).
     - Mapování starých proměnných:
       - --bg → --paper
       - --surface → --parchment
       - --text → --ink
       - --muted → --muted
       - --border → nový --border (2px espresso) plus --hair
       - --accent → --mocha (odkazy) / --caramel (CTA)
       - --error zůstává
     - Staré --accent-text, --font, --gutter, --max-width zruším a nahradím
       novými. Grep potvrdí, že nezůstal mrtvý kód.
     - Focus ring: --focus-ring = --mocha, v .on-dark přepsaný na --link-dark.
     - Fonty: newsreader-500.woff2 a newsreader-600.woff2, font-display: swap,
       unicode-range podle zadání. Preload jen pro 600.
  2. Hero (Hero.tsx, CSS): espresso pás, masthead s dvojitou linkou, CTA .btn.
     Opravím .on-dark a:not(.btn), včetně :hover.
  3. EtfTable (EtfTable.tsx, CSS): karty do 40rem, od 40rem tabulka se zebrou.
     Nový štítek „TER" nad velkým číslem. Upozornění u VTI jako čárkovaný box s
     SVG „i".
  4. Calculator (Calculator.tsx, content.ts): pergamenový list, dynamická
     jednotka u pole let.
  5. LeadForm (LeadForm.tsx, CSS): pergamen a tvrdý stín, chyby pod polem, chyba
     odeslání s role="alert" nad tlačítkem.
  6. Footer (Footer.tsx): nadpis „Zdroje", číslování rizik 1–7 v serifu, třída
     .ph pro [PROVOZOVATEL …].
  7. Texty (docs/copy-cs.md a potom content.ts): nejdřív zapíšu 3 nové texty
     (štítek „TER", nadpis „Zdroje", jednotky u let) do copy-cs.md, potom do
     content.ts.
  8. Ověření: npm test, lint, build. Potom prohlížeč: 375 a 1440 px, kontrasty,
     CLS, velikosti.

  Rizika a otevřené body

  - Zdroj woff2. Ve designu jsou fonty jako Google Fonts latin/latin-ext, ne
    jako hotový subset. Potřebuju získat plné Newsreader soubory (npm
    @fontsource/newsreader nebo Google Fonts repo) a udělat subset na
    U+0000-017F atd. přes pyftsubset (fonttools). Nástroje a síť jsem zatím
    neověřoval. OFL.txt přiložím z téhož zdroje.
  - Fallback metriky. Design má size-adjust 96%, ascent 92%, descent 24%,
    line-gap 0%. Jsou to jen startovní hodnoty. Ověřím je výpočtem z metrik
    fontu (unitsPerEm, hhea, avgWidth proti Georgii) a změřím CLS. Pokud nepůjde
    zafixovat na 0, napíšu to tak, jak to je.
  - Pravidlo 8týdenního plánu. Podle globálních instrukcí nemám psát hotové
    soubory do tvých repozitářů. Tohle zadání je ale explicitní „aplikuj
    design", takže potřebuju tvé potvrzení, jak to dělat:
    - A) Napíšu to celé já (ty zkontroluješ diff a mutací). V NOTES.md pak bude,
      že styly napsal agent.
    - B) Dostaneš kostry s mezerami a píšeš sám.
    - Doporučuju A pro čistě vizuální CSS (nemá logiku k vysvětlování u
      pohovoru), ale test pro yearsForm a změny v komponentách můžeš psát ty.
      Rozhodnutí je tvoje.
  - Test pro jednotku let. yearsForm už testy má (calculator.test.ts, 1 / 2–4 /
    5+). Nová bude jen funkce, která z formy vrátí slovo (rok / roky / let).
    Dnes je v content.ts statické units.years: 'roky', což je chyba.
  - Container queries ve designu (container-type:inline-size) nahradím @media 
    (min-width: 40rem) podle zadání. Není to chyba, jen odchylka od designu.
    Výsledek bude stejný, protože stránka je na celou šířku.
  - Layout shift z fontu. Měřit budu přes PerformanceObserver (layout-shift) s
    throttlingem sítě. Prohlížeč musím spustit (dev server plus Chrome). Pokud
    nebude dostupný, napíšu, co jsem neověřil.
  - Texty v content.ts jinak nechám beze změny a kontrast CTA změřím z computed
    style (cíl espresso #411E0A na karamelu #D98E3F = 5,58:1).

  Potřebuju od tebe: A nebo B, a dál schválení plánu.

✻ Churned for 55s · done 8:20 PM

❯ Schvaluji plán, varianta A pro CSS a komponenty. Úpravy:                      
  - --tap nech 44px (jen tlačítka 48px), jak je v designu.                      
  - Žádná nová závislost v package.json. Fonty stáhni do dočasné složky mimo    
  repo (např. npm pack @fontsource/newsreader). Pokud mají hotové latin a       
  latin-ext woff2 pro váhy 500 a 600, použij je s unicode-range a pyftsubset    
  nepotřebuješ. Napiš velikosti souborů a přilož OFL.txt.                       
  - Funkci pro slovo u pole let (rok/roky/let) napíšu sám včetně testu. Ty jen  
  připrav místo: v content.ts ať je texty (rok, roky, let) a Calculator ať volá 
  funkci z modulu vedle yearsForm. Do té doby ať volání vrací stávající         
  chování, aby build prošel.                                                    
  - Texty nejdřív do docs/copy-cs.md, potom do content.ts.                      
  - Co se nepodaří ověřit (CLS, prohlížeč), napiš výslovně.                     
    Nic necommituj. Pokračuj.                                                   

  Ran 7 shell commands (ctrl+o to expand)

⏺ Fonty jsou stažené a v repu (public/fonts). Teď zapisuju nové texty do
  docs/copy-cs.md a pak do content.ts.

  Ran 5 shell commands (ctrl+o to expand)

⏺ Write(src/index.css)
  ⎿  Added 782 lines, removed 225 lines
        1 +/* Newsreader (SIL OFL, see public/fonts/OFL.txt), self-hosted
          +. Only the 600                                                
        2 +   latin file is preloaded (index.html); the other files load 
          +on demand through                                             
        3 +   unicode-range. Czech letters live in latin (U+0000-00FF) an
          +d latin-ext                                                   
        4 +   (U+0100-017F). */                                          
        5 +@font-face {                                                  
        6 +  font-family: 'Newsreader';                                  
        7 +  font-style: normal;                                         
        8 +  font-weight: 500;                                           
        9 +  font-display: swap;                                         
       10 +  src: url('/fonts/newsreader-latin-ext-500-normal.woff2') for
          +mat('woff2');                                                 
       11 +  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE
          +-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E0
          +0-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113,
          + U+2C60-2C7F, U+A720-A7FF;                                    
       12 +}                                                             
       13 +                                                              
       14 +@font-face {                                                  
       15 +  font-family: 'Newsreader';                                  
       16 +  font-style: normal;                                         
       17 +  font-weight: 500;                                           
       18 +  font-display: swap;                                         
       19 +  src: url('/fonts/newsreader-latin-500-normal.woff2') format(
          +'woff2');                                                     
       20 +  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC
          +, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F,
          + U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFF
          +D;                                                            
       21 +}                                                             
       22 +                                                              
       23 +@font-face {                                                  
       24 +  font-family: 'Newsreader';                                  
       25 +  font-style: normal;                                         
       26 +  font-weight: 600;                                           
       27 +  font-display: swap;                                         
       28 +  src: url('/fonts/newsreader-latin-ext-600-normal.woff2') for
          +mat('woff2');                                                 
       29 +  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE
          +-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E0
          +0-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113,
          + U+2C60-2C7F, U+A720-A7FF;                                    
       30 +}                                                             
       31 +                                                              
       32 +@font-face {                                                  
       33 +  font-family: 'Newsreader';                                  
       34 +  font-style: normal;                                         
       35 +  font-weight: 600;                                           
       36 +  font-display: swap;                                         
       37 +  src: url('/fonts/newsreader-latin-600-normal.woff2') format(
          +'woff2');                                                     
       38 +  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC
          +, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F,
          + U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFF
          +D;                                                            
       39 +}                                                             
       40 +                                                              
       41 +/* Metric-matched stand-ins for the swap period (values comput
          +ed from the font                                              
       42 +   files, see NOTES.md). One face per weight: Georgia Regular 
          +for 500, Georgia                                              
       43 +   Bold for 600, so the browser does not fake a bold. */      
       44 +@font-face {                                                  
       45 +  font-family: 'Newsreader Fallback';                         
       46 +  font-weight: 500;                                           
       47 +  src: local('Georgia');                                      
       48 +  size-adjust: 97.1%;                                         
       49 +  ascent-override: 75.7%;                                     
       50 +  descent-override: 27.3%;                                    
       51 +  line-gap-override: 0%;                                      
       52 +}                                                             
       53 +                                                              
       54 +@font-face {                                                  
       55 +  font-family: 'Newsreader Fallback';                         
       56 +  font-weight: 600;                                           
       57 +  src: local('Georgia Bold');                                 
       58 +  size-adjust: 86%;                                           
       59 +  ascent-override: 85.5%;                                     
       60 +  descent-override: 30.8%;                                    
       61 +  line-gap-override: 0%;                                      
       62 +}                                                             
       63 +                                                              
       64  :root {
        2 -  --bg: #fbfaf7;                                              
        3 -  --surface: #ffffff;                                         
        4 -  --text: #1c2024;                                            
        5 -  --muted: #565d66;                                           
        6 -  --border: #d8d4cb;                                          
        7 -  --accent: #0b5c4f;                                          
        8 -  --accent-text: #ffffff;                                     
       65 +  /* colour */                                                
       66 +  --paper: #fff9f2;                                           
       67 +  --parchment: #f5e9d8;                                       
       68 +  --latte: #e6d5be;                                           
       69 +  --espresso: #411e0a;                                        
       70 +  --ink: #2a1810;                                             
       71 +  --muted: #6b5444;                                           
       72 +  --mocha: #7a4a2b;                                           
       73 +  --caramel: #d98e3f;                                         
       74 +  --link-dark: #e7b77a;                                       
       75    --error: #a02a1c;
       76 +  --divider: #d2bea2;                                         
       77 +  --zebra: #fbf1e4;                                           
       78  
       11 -  --font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-s
          -erif;                                                         
       12 -  --gutter: 1rem;                                             
       13 -  --max-width: 64rem;                                         
       79 +  /* type */                                                  
       80 +  --font-serif: 'Newsreader', 'Newsreader Fallback', Georgia, 
          +'Times New Roman', serif;                                     
       81 +  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, '
          +Helvetica Neue', Arial, sans-serif;                           
       82 +  --font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monos
          +pace;                                                         
       83 +  --fs-xs: 0.8125rem;                                         
       84 +  --fs-sm: 0.875rem;                                          
       85 +  --fs-base: 1rem;                                            
       86 +  --fs-lg: 1.125rem;                                          
       87 +  --fs-h3: 1.25rem;                                           
       88 +  --fs-h2: 1.75rem;                                           
       89 +  --fs-h1: 2.25rem;                                           
       90  
       91 +  /* shape */                                                 
       92 +  --radius-sm: 4px;                                           
       93 +  --radius: 6px;                                              
       94 +  --radius-lg: 8px;                                           
       95 +  --border: 2px solid var(--espresso);                        
       96 +  --rule: 1px solid var(--espresso);                          
       97 +  --hair: 1px solid var(--divider);                           
       98 +  --shadow: 4px 4px 0 var(--espresso);                        
       99 +  --shadow-pressed: 2px 2px 0 var(--espresso);                
      100 +  --shadow-dark: 4px 4px 0 var(--latte);                      
      101 +  --shadow-dark-pressed: 2px 2px 0 var(--latte);              
      102 +                                                              
      103 +  /* layout */                                                
      104 +  --gutter: 16px;                                             
      105 +  --maxw: 64rem;                                              
      106 +  /* Minimum tap size for fields. Buttons are 48px (.btn). */ 
      107 +  --tap: 44px;                                                
      108 +                                                              
      109 +  --focus-ring: var(--mocha);                                 
      110 +                                                              
      111    color-scheme: light;
       16 -  font-family: var(--font);                                   
       17 -  font-size: 16px;                                            
       18 -  line-height: 1.5;                                           
       19 -  color: var(--text);                                         
       20 -  background: var(--bg);                                      
      112  }
      113  
      114  *,
     ...
      119  
      120  body {
      121    margin: 0;
       31 -  background: var(--bg);                                      
      122 +  background: var(--paper);                                   
      123 +  color: var(--ink);                                          
      124 +  font-family: var(--font-sans);                              
      125 +  font-size: 1rem;                                            
      126 +  line-height: 1.55;                                          
      127 +  -webkit-font-smoothing: antialiased;                        
      128  }
      129  
      130 +p {                                                           
      131 +  margin: 0;                                                  
      132 +}                                                             
      133 +                                                              
      134  /* Page blocks share one column and one gutter. */
       35 -.hero,                                                        
       36 -main,                                                         
       37 -footer {                                                      
       38 -  max-width: var(--max-width);                                
      135 +.wrap,                                                        
      136 +.section {                                                    
      137 +  max-width: var(--maxw);                                     
      138    margin-inline: auto;
      139    padding-inline: var(--gutter);
      140  }
      141  
      142 +.section {                                                    
      143 +  padding-block: 0 56px;                                      
      144 +}                                                             
      145 +                                                              
      146 +.num {                                                        
      147 +  font-variant-numeric: tabular-nums lining-nums;             
      148 +}                                                             
      149 +                                                              
      150 +a {                                                           
      151 +  color: var(--mocha);                                        
      152 +  text-decoration: underline;                                 
      153 +  text-underline-offset: 3px;                                 
      154 +  text-decoration-thickness: 1px;                             
      155 +}                                                             
      156 +                                                              
      157 +a:hover {                                                     
      158 +  color: var(--espresso);                                     
      159 +  text-decoration-thickness: 2px;                             
      160 +}                                                             
      161 +                                                              
      162 +:focus-visible {                                              
      163 +  outline: 3px solid var(--focus-ring);                       
      164 +  outline-offset: 3px;                                        
      165 +}                                                             
      166 +                                                              
      167 +/* Dark bands (hero, footer): light links, light focus ring. T
          +he .btn is                                                    
      168 +   excluded so its espresso-on-caramel text is not overridden 
          +(specificity). */                                             
      169 +.on-dark {                                                    
      170 +  --focus-ring: var(--link-dark);                             
      171 +}                                                             
      172 +                                                              
      173 +.on-dark a:not(.btn) {                                        
      174 +  color: var(--link-dark);                                    
      175 +}                                                             
      176 +                                                              
      177 +.on-dark a:not(.btn):hover {                                  
      178 +  color: var(--paper);                                        
      179 +}                                                             
      180 +                                                              
      181 +/* Placeholders for the operator's data. */                   
      182 +.ph {                                                         
      183 +  font-family: var(--font-mono);                              
      184 +  font-size: 0.86em;                                          
      185 +  background: var(--latte);                                   
      186 +  color: var(--ink);                                          
      187 +  border: 1px dashed var(--mocha);                            
      188 +  border-radius: 3px;                                         
      189 +  padding: 0 4px;                                             
      190 +  -webkit-box-decoration-break: clone;                        
      191 +  box-decoration-break: clone;                                
      192 +}                                                             
      193 +                                                              
      194 +.on-dark .ph {                                                
      195 +  background: transparent;                                    
      196 +  color: var(--link-dark);                                    
      197 +  border-color: var(--link-dark);                             
      198 +}                                                             
      199 +                                                              
      200 +.small {                                                      
      201 +  font-size: var(--fs-sm);                                    
      202 +  color: var(--muted);                                        
      203 +}                                                             
      204 +                                                              
      205  h1,
       44 -h2 {                                                          
       45 -  line-height: 1.2;                                           
       46 -  margin: 0 0 0.75rem;                                        
      206 +h2,                                                           
      207 +h3 {                                                          
      208 +  font-family: var(--font-serif);                             
      209 +  font-weight: 600;                                           
      210 +  margin: 0;                                                  
      211 +  text-wrap: balance;                                         
      212  }
      213  
      214  h1 {
       50 -  font-size: 1.75rem;                                         
      215 +  font-size: var(--fs-h1);                                    
      216 +  line-height: 1.1;                                           
      217 +  letter-spacing: -0.012em;                                   
      218  }
      219  
      220  h2 {
       54 -  font-size: 1.375rem;                                        
      221 +  font-size: var(--fs-h2);                                    
      222 +  line-height: 1.15;                                          
      223 +  letter-spacing: -0.005em;                                   
      224  }
      225  
       57 -p {                                                           
       58 -  margin: 0 0 0.75rem;                                        
      226 +h3 {                                                          
      227 +  font-size: var(--fs-h3);                                    
      228 +  line-height: 1.25;                                          
      229  }
      230  
       61 -a {                                                           
       62 -  color: var(--accent);                                       
      231 +/* Section heading with a double rule above. */               
      232 +.sec-head {                                                   
      233 +  border-top: 5px double var(--espresso);                     
      234 +  padding-top: 16px;                                          
      235 +  margin-bottom: 24px;                                        
      236  }
      237  
       65 -:focus-visible {                                              
       66 -  outline: 3px solid var(--accent);                           
       67 -  outline-offset: 3px;                                        
      238 +.sub {                                                        
      239 +  margin-top: 8px;                                            
      240 +  color: var(--muted);                                        
      241  }
      242  
      243 +/* Buttons: 48px, hard shadow, shadow shrinks when pressed. */
      244 +.btn {                                                        
      245 +  display: inline-flex;                                       
      246 +  align-items: center;                                        
      247 +  justify-content: center;                                    
      248 +  gap: 8px;                                                   
      249 +  min-height: 48px;                                           
      250 +  padding: 12px 22px;                                         
      251 +  font-family: var(--font-sans);                              
      252 +  font-size: 1rem;                                            
      253 +  font-weight: 650;                                           
      254 +  line-height: 1.2;                                           
      255 +  color: var(--espresso);                                     
      256 +  background: var(--caramel);                                 
      257 +  border: var(--border);                                      
      258 +  border-radius: var(--radius);                               
      259 +  box-shadow: var(--shadow);                                  
      260 +  text-decoration: none;                                      
      261 +  cursor: pointer;                                            
      262 +  transition:                                                 
      263 +    transform 0.08s ease,                                     
      264 +    box-shadow 0.08s ease;                                    
      265 +}                                                             
      266 +                                                              
      267 +.btn:hover {                                                  
      268 +  color: var(--espresso);                                     
      269 +  text-decoration: none;                                      
      270 +}                                                             
      271 +                                                              
      272 +.btn:active {                                                 
      273 +  transform: translate(2px, 2px);                             
      274 +  box-shadow: var(--shadow-pressed);                          
      275 +}                                                             
      276 +                                                              
      277 +.btn:disabled {                                               
      278 +  background: var(--latte);                                   
      279 +  color: var(--muted);                                        
      280 +  border-color: var(--muted);                                 
      281 +  box-shadow: none;                                           
      282 +  transform: none;                                            
      283 +  cursor: not-allowed;                                        
      284 +}                                                             
      285 +                                                              
      286 +.on-dark .btn {                                               
      287 +  box-shadow: var(--shadow-dark);                             
      288 +}                                                             
      289 +                                                              
      290 +.on-dark .btn:active {                                        
      291 +  box-shadow: var(--shadow-dark-pressed);                     
      292 +}                                                             
      293 +                                                              
      294 +.btn-wide {                                                   
      295 +  width: 100%;                                                
      296 +}                                                             
      297 +                                                              
      298 +/* Hero. */                                                   
      299  .hero {
       71 -  padding-block: 2rem 1.5rem;                                 
      300 +  background: var(--espresso);                                
      301 +  color: var(--paper);                                        
      302 +  padding-block: 20px 56px;                                   
      303  }
      304  
       74 -.hero-lead {                                                  
       75 -  font-size: 1.125rem;                                        
       76 -  max-width: 40rem;                                           
      305 +.masthead {                                                   
      306 +  height: 8px;                                                
      307 +  border-top: 3px solid var(--latte);                         
      308 +  border-bottom: 1px solid var(--latte);                      
      309  }
      310  
       79 -.button {                                                     
       80 -  display: inline-block;                                      
       81 -  padding: 0.75rem 1.25rem;                                   
       82 -  margin-block: 0.5rem 1rem;                                  
       83 -  background: var(--accent);                                  
       84 -  color: var(--accent-text);                                  
      311 +.hero-grid {                                                  
      312 +  display: grid;                                              
      313 +  gap: 24px;                                                  
      314 +  margin-top: 36px;                                           
      315 +}                                                             
      316 +                                                              
      317 +.hero-side {                                                  
      318 +  display: grid;                                              
      319 +  gap: 28px;                                                  
      320 +}                                                             
      321 +                                                              
      322 +.lead {                                                       
      323 +  font-size: var(--fs-lg);                                    
      324 +  line-height: 1.5;                                           
      325 +  color: var(--parchment);                                    
      326 +  max-width: 34rem;                                           
      327 +}                                                             
      328 +                                                              
      329 +.hero-note {                                                  
      330 +  font-size: var(--fs-sm);                                    
      331 +  line-height: 1.5;                                           
      332 +  color: var(--latte);                                        
      333 +  max-width: 32rem;                                           
      334 +}                                                             
      335 +                                                              
      336 +main {                                                        
      337 +  display: block;                                             
      338 +  padding-top: 56px;                                          
      339 +}                                                             
      340 +                                                              
      341 +/* Fund table. Cards below 40rem, a real table from 40rem. */ 
      342 +.caption {                                                    
      343 +  font-size: var(--fs-sm);                                    
      344 +  color: var(--muted);                                        
      345 +  margin-bottom: 20px;                                        
      346 +  max-width: 44rem;                                           
      347 +}                                                             
      348 +                                                              
      349 +.fund-list {                                                  
      350 +  list-style: none;                                           
      351 +  margin: 0;                                                  
      352 +  padding: 0;                                                 
      353 +  display: grid;                                              
      354 +  gap: 20px;                                                  
      355 +}                                                             
      356 +                                                              
      357 +.fund-card {                                                  
      358 +  background: var(--parchment);                               
      359 +  border: var(--border);                                      
      360 +  border-radius: var(--radius);                               
      361 +  box-shadow: var(--shadow);                                  
      362 +  padding: 18px 18px 6px;                                     
      363 +}                                                             
      364 +                                                              
      365 +.fund-top {                                                   
      366 +  display: flex;                                              
      367 +  justify-content: space-between;                             
      368 +  align-items: flex-start;                                    
      369 +  gap: 16px;                                                  
      370 +  padding-bottom: 14px;                                       
      371 +  border-bottom: var(--rule);                                 
      372 +}                                                             
      373 +                                                              
      374 +.ticker {                                                     
      375 +  font-family: var(--font-serif);                             
      376    font-weight: 600;
       86 -  text-decoration: none;                                      
       87 -  border-radius: 0.375rem;                                    
      377 +  font-size: 2rem;                                            
      378 +  line-height: 1;                                             
      379 +  letter-spacing: 0.01em;                                     
      380  }
      381  
       90 -.small {                                                      
      382 +.fund-name {                                                  
      383    display: block;
       92 -  font-size: 0.875rem;                                        
      384 +  font-size: var(--fs-sm);                                    
      385    color: var(--muted);
      386 +  margin-top: 6px;                                            
      387 +  line-height: 1.35;                                          
      388  }
      389  
       96 -main {                                                        
       97 -  padding-block: 1rem 2rem;                                   
      390 +.ter-big {                                                    
      391 +  font-family: var(--font-serif);                             
      392 +  font-weight: 500;                                           
      393 +  font-size: 1.75rem;                                         
      394 +  line-height: 1;                                             
      395 +  white-space: nowrap;                                        
      396 +  font-variant-numeric: tabular-nums lining-nums;             
      397  }
      398  
      100 -/* Table: stacked cards on narrow screens, a real table from 4
          -0rem. */                                                      
      101 -table,                                                        
      102 -tbody,                                                        
      103 -caption {                                                     
      399 +.ter-top {                                                    
      400 +  text-align: right;                                          
      401 +}                                                             
      402 +                                                              
      403 +.ter-label {                                                  
      404    display: block;
      405 +  font-size: var(--fs-xs);                                    
      406 +  font-weight: 700;                                           
      407 +  letter-spacing: 0.04em;                                     
      408 +  text-transform: uppercase;                                  
      409 +  color: var(--muted);                                        
      410 +  margin-bottom: 6px;                                         
      411  }
      412  
      107 -table {                                                       
      413 +.fund-dl {                                                    
      414 +  margin: 0;                                                  
      415 +}                                                             
      416 +                                                              
      417 +.fund-row {                                                   
      418 +  display: grid;                                              
      419 +  gap: 3px;                                                   
      420 +  padding-block: 12px;                                        
      421 +  border-bottom: var(--hair);                                 
      422 +}                                                             
      423 +                                                              
      424 +.fund-row:last-child {                                        
      425 +  border-bottom: 0;                                           
      426 +}                                                             
      427 +                                                              
      428 +.fund-row dt {                                                
      429 +  font-size: var(--fs-xs);                                    
      430 +  font-weight: 700;                                           
      431 +  letter-spacing: 0.04em;                                     
      432 +  text-transform: uppercase;                                  
      433 +  color: var(--muted);                                        
      434 +}                                                             
      435 +                                                              
      436 +.fund-row dd {                                                
      437 +  margin: 0;                                                  
      438 +}                                                             
      439 +                                                              
      440 +.src {                                                        
      441 +  display: block;                                             
      442 +  font-size: var(--fs-xs);                                    
      443 +  line-height: 1.45;                                          
      444 +  color: var(--muted);                                        
      445 +}                                                             
      446 +                                                              
      447 +.missing {                                                    
      448 +  font-style: italic;                                         
      449 +  color: var(--muted);                                        
      450 +}                                                             
      451 +                                                              
      452 +.caveat {                                                     
      453 +  display: flex;                                              
      454 +  gap: 6px;                                                   
      455 +  align-items: flex-start;                                    
      456 +  font-size: var(--fs-xs);                                    
      457 +  line-height: 1.4;                                           
      458 +  color: var(--ink);                                          
      459 +  background: var(--paper);                                   
      460 +  border: 1px dashed var(--mocha);                            
      461 +  border-radius: var(--radius-sm);                            
      462 +  padding: 5px 8px;                                           
      463 +  margin-block: 6px 2px;                                      
      464 +}                                                             
      465 +                                                              
      466 +.caveat svg {                                                 
      467 +  flex: none;                                                 
      468 +  margin-top: 1px;                                            
      469 +}                                                             
      470 +                                                              
      471 +.fund-table-box {                                             
      472 +  display: none;                                              
      473 +}                                                             
      474 +                                                              
      475 +.funds {                                                      
      476    width: 100%;
      477    border-collapse: collapse;
      478  }
      479  
      112 -caption {                                                     
      480 +.funds th {                                                   
      481    text-align: left;
      482 +  vertical-align: bottom;                                     
      483 +  font-size: var(--fs-xs);                                    
      484 +  font-weight: 700;                                           
      485 +  letter-spacing: 0.04em;                                     
      486 +  text-transform: uppercase;                                  
      487    color: var(--muted);
      115 -  font-size: 0.875rem;                                        
      116 -  padding-bottom: 0.75rem;                                    
      488 +  padding: 14px 20px;                                         
      489 +  background: var(--parchment);                               
      490 +  border-bottom: var(--border);                               
      491  }
      492  
      119 -thead {                                                       
      120 -  position: absolute;                                         
      121 -  width: 1px;                                                 
      122 -  height: 1px;                                                
      123 -  overflow: hidden;                                           
      124 -  clip-path: inset(50%);                                      
      493 +.funds tbody th {                                             
      494 +  vertical-align: top;                                        
      495 +  padding: 20px;                                              
      496 +  background: transparent;                                    
      497 +  border-bottom: var(--hair);                                 
      498 +  text-transform: none;                                       
      499 +  letter-spacing: 0;                                          
      500 +  color: var(--ink);                                          
      501  }
      502  
      127 -tr,                                                           
      128 -th,                                                           
      129 -td {                                                          
      130 -  display: block;                                             
      503 +.funds td {                                                   
      504 +  padding: 20px;                                              
      505 +  vertical-align: top;                                        
      506 +  border-bottom: var(--hair);                                 
      507  }
      508  
      133 -tbody tr {                                                    
      134 -  background: var(--surface);                                 
      135 -  border: 1px solid var(--border);                            
      136 -  border-radius: 0.5rem;                                      
      137 -  padding: 0.75rem 1rem;                                      
      138 -  margin-bottom: 0.75rem;                                     
      509 +.funds tbody tr:nth-child(even) th,                           
      510 +.funds tbody tr:nth-child(even) td {                          
      511 +  background: var(--zebra);                                   
      512  }
      513  
      141 -th,                                                           
      142 -td {                                                          
      143 -  text-align: left;                                           
      144 -  font-weight: 400;                                           
      145 -  padding: 0.25rem 0;                                         
      146 -  overflow-wrap: anywhere;                                    
      514 +.funds tbody tr:last-child th,                                
      515 +.funds tbody tr:last-child td {                               
      516 +  border-bottom: 0;                                           
      517  }
      518  
      149 -td::before {                                                  
      150 -  content: attr(data-label);                                  
      519 +.funds .ter-big {                                             
      520    display: block;
      152 -  font-size: 0.8125rem;                                       
      153 -  color: var(--muted);                                        
      521 +  margin-bottom: 8px;                                         
      522  }
      523  
      156 -.ticker {                                                     
      157 -  display: block;                                             
      158 -  font-size: 1.25rem;                                         
      159 -  font-weight: 700;                                           
      524 +.note {                                                       
      525 +  margin-top: 28px;                                           
      526 +  font-size: var(--fs-sm);                                    
      527 +  max-width: 44rem;                                           
      528 +  padding-top: 14px;                                          
      529 +  border-top: var(--rule);                                    
      530  }
      531  
      162 -.fund-name {                                                  
      163 -  display: block;                                             
      164 -  color: var(--muted);                                        
      532 +/* Calculator: a parchment sheet, no shadow. */               
      533 +.sheet {                                                      
      534 +  background: var(--parchment);                               
      535 +  border: var(--border);                                      
      536 +  border-radius: var(--radius-lg);                            
      537 +  padding: 24px 18px;                                         
      538  }
      539  
      167 -/* Calculator: fields stacked on narrow screens, side by side 
          -from 40rem. */                                                
      168 -#kalkulacka {                                                 
      169 -  margin-top: 2.5rem;                                         
      540 +.sheet .sec-head {                                            
      541 +  margin-bottom: 20px;                                        
      542  }
      543  
      172 -.calc-fields {                                                
      544 +.measure {                                                    
      545 +  max-width: 42rem;                                           
      546 +}                                                             
      547 +                                                              
      548 +.fields {                                                     
      549    display: grid;
      174 -  gap: 1rem;                                                  
      175 -  margin-bottom: 1rem;                                        
      550 +  gap: 20px;                                                  
      551 +  margin-top: 8px;                                            
      552  }
      553  
      178 -.calc-field label {                                           
      554 +.field label {                                                
      555    display: block;
      180 -  font-weight: 600;                                           
      181 -  margin-bottom: 0.25rem;                                     
      556 +  font-weight: 650;                                           
      557 +  margin-bottom: 8px;                                         
      558  }
      559  
      184 -.calc-input-row {                                             
      560 +.control {                                                    
      561 +  position: relative;                                         
      562    display: flex;
      186 -  align-items: center;                                        
      187 -  gap: 0.5rem;                                                
      563 +  align-items: stretch;                                       
      564 +  background: var(--paper);                                   
      565 +  border: var(--border);                                      
      566 +  border-radius: var(--radius);                               
      567  }
      568  
      190 -/* 16px font keeps iOS from zooming on focus. */              
      191 -.calc-field input,                                            
      192 -.calc-field select {                                          
      193 -  width: 100%;                                                
      569 +.control:focus-within {                                       
      570 +  outline: 3px solid var(--focus-ring);                       
      571 +  outline-offset: 3px;                                        
      572 +}                                                             
      573 +                                                              
      574 +.control input,                                               
      575 +.control select {                                             
      576 +  -webkit-appearance: none;                                   
      577 +  appearance: none;                                           
      578 +  border: 0;                                                  
      579 +  background: transparent;                                    
      580 +  /* 16px font keeps iOS from zooming on focus. */            
      581 +  font-family: inherit;                                       
      582 +  font-size: 1rem;                                            
      583 +  color: var(--ink);                                          
      584 +  padding: 0 14px;                                            
      585 +  flex: 1;                                                    
      586    min-width: 0;
      195 -  min-height: 2.75rem;                                        
      196 -  padding: 0.5rem 0.75rem;                                    
      197 -  font: inherit;                                              
      198 -  color: var(--text);                                         
      199 -  background: var(--surface);                                 
      200 -  border: 1px solid var(--muted);                             
      201 -  border-radius: 0.375rem;                                    
      587 +  height: var(--tap);                                         
      588 +  font-variant-numeric: tabular-nums;                         
      589  }
      590  
      204 -.calc-field input[aria-invalid='true'] {                      
      591 +.control input:focus-visible,                                 
      592 +.control select:focus-visible {                               
      593 +  outline: none;                                              
      594 +}                                                             
      595 +                                                              
      596 +.control input::placeholder {                                 
      597 +  color: var(--muted);                                        
      598 +  opacity: 1;                                                 
      599 +}                                                             
      600 +                                                              
      601 +.control select {                                             
      602 +  padding-right: 44px;                                        
      603 +  font-weight: 650;                                           
      604 +}                                                             
      605 +                                                              
      606 +.unit {                                                       
      607 +  display: flex;                                              
      608 +  align-items: center;                                        
      609 +  padding: 0 14px;                                            
      610 +  background: var(--latte);                                   
      611 +  border-left: var(--border);                                 
      612 +  font-weight: 650;                                           
      613 +  border-radius: 0 4px 4px 0;                                 
      614 +}                                                             
      615 +                                                              
      616 +.chev {                                                       
      617 +  position: absolute;                                         
      618 +  right: 14px;                                                
      619 +  top: 50%;                                                   
      620 +  transform: translateY(-50%);                                
      621 +  pointer-events: none;                                       
      622 +}                                                             
      623 +                                                              
      624 +.control.is-invalid {                                         
      625    border-color: var(--error);
      206 -  border-width: 2px;                                          
      626 +  box-shadow: inset 0 0 0 1px var(--error);                   
      627  }
      628  
      209 -.calc-error {                                                 
      210 -  margin: 0.25rem 0 0;                                        
      629 +.control.is-invalid .unit {                                   
      630 +  border-left-color: var(--error);                            
      631 +}                                                             
      632 +                                                              
      633 +.err {                                                        
      634 +  display: flex;                                              
      635 +  gap: 6px;                                                   
      636 +  align-items: flex-start;                                    
      637 +  margin-top: 8px;                                            
      638    color: var(--error);
      212 -  font-weight: 600;                                           
      639 +  font-size: var(--fs-sm);                                    
      640 +  font-weight: 650;                                           
      641 +  line-height: 1.4;                                           
      642  }
      643  
      215 -.calc-result {                                                
      216 -  background: var(--surface);                                 
      217 -  border: 1px solid var(--border);                            
      218 -  border-radius: 0.5rem;                                      
      219 -  padding: 0.75rem 1rem;                                      
      220 -  margin-bottom: 0.75rem;                                     
      644 +.err svg {                                                    
      645 +  flex: none;                                                 
      646 +  margin-top: 2px;                                            
      647  }
      648  
      223 -.calc-result-line {                                           
      224 -  font-size: 1.25rem;                                         
      225 -  font-weight: 700;                                           
      649 +.calc-out {                                                   
      650 +  display: grid;                                              
      651 +  gap: 20px;                                                  
      652 +  margin-top: 28px;                                           
      653  }
      654  
      228 -.calc-result p:last-child {                                   
      229 -  margin-bottom: 0;                                           
      655 +.calc-out > [aria-live]:empty {                               
      656 +  display: none;                                              
      657  }
      658  
      232 -/* Lead form. */                                              
      233 -#formular {                                                   
      234 -  margin-top: 2.5rem;                                         
      659 +.calc-side {                                                  
      660 +  display: grid;                                              
      661 +  gap: 20px;                                                  
      662  }
      663  
      237 -.lead-field {                                                 
      238 -  margin-bottom: 1rem;                                        
      664 +.result {                                                     
      665 +  background: var(--paper);                                   
      666 +  border: var(--border);                                      
      667 +  border-radius: var(--radius);                               
      668 +  padding: 20px;                                              
      669  }
      670  
      241 -.lead-field label {                                           
      671 +.result-line {                                                
      672 +  font-size: var(--fs-lg);                                    
      673 +  line-height: 1.4;                                           
      674 +}                                                             
      675 +                                                              
      676 +.result-num {                                                 
      677    display: block;
      243 -  font-weight: 600;                                           
      244 -  margin-bottom: 0.25rem;                                     
      678 +  font-family: var(--font-serif);                             
      679 +  font-weight: 500;                                           
      680 +  font-size: 2.5rem;                                          
      681 +  line-height: 1.1;                                           
      682 +  margin-block: 4px 6px;                                      
      683 +  font-variant-numeric: tabular-nums lining-nums;             
      684  }
      685  
      247 -/* 16px font keeps iOS from zooming on focus. */              
      248 -.lead-field input[type='email'] {                             
      249 -  width: 100%;                                                
      250 -  min-width: 0;                                               
      251 -  min-height: 2.75rem;                                        
      252 -  padding: 0.5rem 0.75rem;                                    
      253 -  font: inherit;                                              
      254 -  color: var(--text);                                         
      255 -  background: var(--surface);                                 
      256 -  border: 1px solid var(--muted);                             
      257 -  border-radius: 0.375rem;                                    
      686 +.result-foot {                                                
      687 +  margin-top: 16px;                                           
      688 +  padding-top: 14px;                                          
      689 +  border-top: var(--hair);                                    
      690 +  font-size: var(--fs-sm);                                    
      691  }
      692  
      260 -.lead-field input[aria-invalid='true'][type='email'] {        
      261 -  border-color: var(--error);                                 
      262 -  border-width: 2px;                                          
      693 +.assume {                                                     
      694 +  font-size: var(--fs-sm);                                    
      695 +  color: var(--muted);                                        
      696  }
      697  
      265 -/* Checkbox and its long consent text side by side. */        
      266 -.lead-consent {                                               
      698 +.example {                                                    
      699 +  padding-top: 18px;                                          
      700 +  border-top: 1px dashed var(--mocha);                        
      701 +}                                                             
      702 +                                                              
      703 +/* Lead form: parchment with a hard shadow, because it is the 
          +action. */                                                    
      704 +.form-card {                                                  
      705 +  background: var(--parchment);                               
      706 +  border: var(--border);                                      
      707 +  border-radius: var(--radius-lg);                            
      708 +  box-shadow: var(--shadow);                                  
      709 +  padding: 24px 18px;                                         
      710 +}                                                             
      711 +                                                              
      712 +.form-grid {                                                  
      713 +  display: grid;                                              
      714 +  gap: 24px;                                                  
      715 +}                                                             
      716 +                                                              
      717 +.form-stack {                                                 
      718 +  display: grid;                                              
      719 +  gap: 20px;                                                  
      720 +}                                                             
      721 +                                                              
      722 +.check {                                                      
      723    display: flex;
      724 +  gap: 12px;                                                  
      725    align-items: flex-start;
      269 -  gap: 0.75rem;                                               
      726 +  padding-block: 4px;                                         
      727  }
      728  
      272 -.lead-consent input {                                         
      729 +.check input {                                                
      730 +  width: 24px;                                                
      731 +  height: 24px;                                               
      732 +  margin: 0;                                                  
      733    flex: none;
      274 -  width: 1.5rem;                                              
      275 -  height: 1.5rem;                                             
      276 -  margin: 0.125rem 0 0;                                       
      277 -  accent-color: var(--accent);                                
      734 +  accent-color: var(--espresso);                              
      735  }
      736  
      280 -.lead-consent label {                                         
      281 -  font-weight: 400;                                           
      282 -  margin-bottom: 0;                                           
      737 +.check-text {                                                 
      738 +  font-size: var(--fs-sm);                                    
      739 +  line-height: 1.55;                                          
      740  }
      741  
      285 -.lead-error {                                                 
      286 -  margin: 0.25rem 0 0.75rem;                                  
      742 +.alert {                                                      
      743 +  display: flex;                                              
      744 +  gap: 10px;                                                  
      745 +  align-items: flex-start;                                    
      746 +  border: 2px solid var(--error);                             
      747 +  background: var(--paper);                                   
      748    color: var(--error);
      288 -  font-weight: 600;                                           
      749 +  border-radius: var(--radius);                               
      750 +  padding: 12px 14px;                                         
      751 +  font-weight: 650;                                           
      752 +  font-size: var(--fs-sm);                                    
      753 +  line-height: 1.45;                                          
      754  }
      755  
      756 +.alert svg {                                                  
      757 +  flex: none;                                                 
      758 +  margin-top: 2px;                                            
      759 +}                                                             
      760 +                                                              
      761  /* Honeypot: off screen, not display:none (some bots skip hidd
           en fields). */
      762  .lead-trap {
      763    position: absolute;
     ...
      767    overflow: hidden;
      768  }
      769  
      300 -.lead-submit {                                                
      301 -  min-height: 2.75rem;                                        
      302 -  padding: 0.75rem 1.25rem;                                   
      303 -  margin-block: 0.5rem 0.75rem;                               
      304 -  background: var(--accent);                                  
      305 -  color: var(--accent-text);                                  
      306 -  font: inherit;                                              
      770 +/* Risk notice: body size (16px), numbers in the serif. */    
      771 +.risk-list {                                                  
      772 +  list-style: none;                                           
      773 +  margin: 0;                                                  
      774 +  padding: 0;                                                 
      775 +  counter-reset: r;                                           
      776 +}                                                             
      777 +                                                              
      778 +.risk-list li {                                               
      779 +  display: grid;                                              
      780 +  grid-template-columns: 28px minmax(0, 1fr);                 
      781 +  gap: 10px;                                                  
      782 +  padding-block: 14px;                                        
      783 +  border-top: var(--hair);                                    
      784 +}                                                             
      785 +                                                              
      786 +.risk-list li::before {                                       
      787 +  counter-increment: r;                                       
      788 +  content: counter(r);                                        
      789 +  font-family: var(--font-serif);                             
      790    font-weight: 600;
      308 -  border: 0;                                                  
      309 -  border-radius: 0.375rem;                                    
      310 -  cursor: pointer;                                            
      791 +  font-size: 1.25rem;                                         
      792 +  line-height: 1.25;                                          
      793 +  color: var(--mocha);                                        
      794  }
      795  
      313 -.lead-submit:disabled {                                       
      314 -  opacity: 0.6;                                               
      315 -  cursor: not-allowed;                                        
      796 +.operator {                                                   
      797 +  margin-top: 4px;                                            
      798 +  padding-top: 16px;                                          
      799 +  border-top: var(--rule);                                    
      800 +  font-weight: 650;                                           
      801  }
      802  
      318 -footer {                                                      
      319 -  padding-block: 1.5rem 3rem;                                 
      320 -  border-top: 1px solid var(--border);                        
      803 +/* Footer. */                                                 
      804 +.footer {                                                     
      805 +  background: var(--espresso);                                
      806 +  color: var(--parchment);                                    
      807 +  padding-block: 20px 48px;                                   
      808  }
      809  
      323 -footer ul {                                                   
      324 -  margin: 0 0 1rem;                                           
      325 -  padding-left: 1.25rem;                                      
      810 +.footer .masthead {                                           
      811 +  margin-bottom: 32px;                                        
      812  }
      813  
      328 -footer li {                                                   
      329 -  margin-bottom: 0.5rem;                                      
      814 +.footer h2 {                                                  
      815 +  font-size: var(--fs-h3);                                    
      816 +  line-height: 1.25;                                          
      817 +  letter-spacing: 0;                                          
      818 +  color: var(--paper);                                        
      819  }
      820  
      821 +.src-list {                                                   
      822 +  list-style: none;                                           
      823 +  margin: 16px 0 0;                                           
      824 +  padding: 0;                                                 
      825 +  display: grid;                                              
      826 +  gap: 8px;                                                   
      827 +  font-size: var(--fs-sm);                                    
      828 +}                                                             
      829 +                                                              
      830 +.src-list b {                                                 
      831 +  font-family: var(--font-serif);                             
      832 +  font-weight: 600;                                           
      833 +  font-size: 1.0625rem;                                       
      834 +  color: var(--paper);                                        
      835 +  display: inline-block;                                      
      836 +  min-width: 3.4em;                                           
      837 +}                                                             
      838 +                                                              
      839 +.foot-op {                                                    
      840 +  margin-top: 28px;                                           
      841 +  padding-top: 16px;                                          
      842 +  border-top: 1px solid var(--muted);                         
      843 +  font-size: var(--fs-sm);                                    
      844 +}                                                             
      845 +                                                              
      846  @media (min-width: 40rem) {
      847    :root {
      334 -    --gutter: 1.5rem;                                         
      848 +    --gutter: 24px;                                           
      849    }
      850  
      851    h1 {
      338 -    font-size: 2.5rem;                                        
      852 +    font-size: 2.75rem;                                       
      853    }
      854  
      341 -  .hero {                                                     
      342 -    padding-block: 3rem 2rem;                                 
      855 +  .fund-list {                                                
      856 +    display: none;                                            
      857    }
      858  
      345 -  .calc-fields {                                              
      346 -    grid-template-columns: repeat(3, minmax(0, 1fr));         
      859 +  .fund-table-box {                                           
      860 +    display: block;                                           
      861 +    background: var(--paper);                                 
      862 +    border: var(--border);                                    
      863 +    border-radius: var(--radius-lg);                          
      864 +    box-shadow: var(--shadow);                                
      865 +    overflow-x: auto;                                         
      866    }
      867  
      349 -  table {                                                     
      350 -    display: table;                                           
      351 -    background: var(--surface);                               
      352 -    border: 1px solid var(--border);                          
      868 +  .sheet,                                                     
      869 +  .form-card {                                                
      870 +    padding: 36px;                                            
      871    }
      872  
      355 -  thead {                                                     
      356 -    position: static;                                         
      873 +  .fields {                                                   
      874 +    grid-template-columns: repeat(2, minmax(0, 1fr));         
      875 +  }                                                           
      876 +                                                              
      877 +  .fields .field:first-child {                                
      878 +    grid-column: 1 / -1;                                      
      879 +    max-width: 20rem;                                         
      880 +  }                                                           
      881 +                                                              
      882 +  .btn-wide {                                                 
      883      width: auto;
      358 -    height: auto;                                             
      359 -    overflow: visible;                                        
      360 -    clip-path: none;                                          
      361 -    display: table-header-group;                              
      884    }
      885  
      364 -  tbody {                                                     
      365 -    display: table-row-group;                                 
      886 +  .src-list {                                                 
      887 +    grid-template-columns: repeat(2, minmax(0, 1fr));         
      888 +    column-gap: 32px;                                         
      889    }
      890 +}                                                             
      891  
      368 -  caption {                                                   
      369 -    display: table-caption;                                   
      892 +@media (min-width: 60rem) {                                   
      893 +  h1 {                                                        
      894 +    font-size: 3.5rem;                                        
      895    }
      896  
      372 -  tr {                                                        
      373 -    display: table-row;                                       
      897 +  h2 {                                                        
      898 +    font-size: 2.25rem;                                       
      899    }
      900  
      376 -  th,                                                         
      377 -  td {                                                        
      378 -    display: table-cell;                                      
      379 -    padding: 0.75rem 1rem;                                    
      380 -    vertical-align: top;                                      
      381 -    border-top: 1px solid var(--border);                      
      901 +  .hero {                                                     
      902 +    padding-block: 24px 88px;                                 
      903    }
      904  
      384 -  thead th {                                                  
      385 -    font-size: 0.875rem;                                      
      386 -    font-weight: 600;                                         
      387 -    color: var(--muted);                                      
      388 -    border-top: 0;                                            
      905 +  .hero-grid {                                                
      906 +    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);   
      907 +    gap: 64px;                                                
      908 +    align-items: end;                                         
      909 +    margin-top: 64px;                                         
      910    }
      911  
      391 -  tbody tr {                                                  
      392 -    border: 0;                                                
      393 -    border-radius: 0;                                         
      394 -    padding: 0;                                               
      395 -    margin: 0;                                                
      912 +  main {                                                      
      913 +    padding-top: 88px;                                        
      914    }
      915  
      398 -  td::before {                                                
      399 -    content: none;                                            
      916 +  .section {                                                  
      917 +    padding-block: 0 88px;                                    
      918    }
      919 +                                                              
      920 +  .sheet,                                                     
      921 +  .form-card {                                                
      922 +    padding: 48px;                                            
      923 +  }                                                           
      924 +                                                              
      925 +  .fields {                                                   
      926 +    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr) m
          +inmax(0, 1fr);                                                
      927 +  }                                                           
      928 +                                                              
      929 +  .fields .field:first-child {                                
      930 +    grid-column: auto;                                        
      931 +    max-width: none;                                          
      932 +  }                                                           
      933 +                                                              
      934 +  .calc-out {                                                 
      935 +    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);     
      936 +    gap: 40px;                                                
      937 +    align-items: start;                                       
      938 +  }                                                           
      939 +                                                              
      940 +  .form-grid {                                                
      941 +    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);  
      942 +    gap: 56px;                                                
      943 +  }                                                           
      944 +                                                              
      945 +  .risk-wrap {                                                
      946 +    display: grid;                                            
      947 +    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);     
      948 +    gap: 56px;                                                
      949 +  }                                                           
      950 +                                                              
      951 +  .risk-wrap .sec-head {                                      
      952 +    margin-bottom: 0;                                         
      953 +  }                                                           
      954 +                                                              
      955 +  .src-list {                                                 
      956 +    grid-template-columns: repeat(3, minmax(0, 1fr));         
      957 +  }                                                           
      958  }

  Listed 1 directory, ran 4 shell commands (ctrl+o to expand)

⏺ Build a testy prošly (66 testů, lint čistý). Teď měřím v Chrome: scroll,
  kontrasty, computed style CTA a layout shift.

  Read 3 files, ran 5 shell commands (ctrl+o to expand)

⏺ Vizuální styl je aplikovaný, nic není commitnuté. npm test (66 testů), lint a
  build projdou. Neověřil jsem chybový stav formuláře ani to, jak jednotka u let
  vypadá po napsání tvé funkce.

  Co je hotové

  - Tokeny jsou v :root v src/index.css. Staré --bg, --surface, --text,
    --accent, --accent-text, --font, --max-width jsem odstranil, grep nenašel
    zbytky. --tap je 44px a tlačítka 48px.
  - Focus ring: 3px, offset 3px, --mocha na světlém. --focus-ring se přepisuje
    uvnitř .on-dark na --link-dark.
  - Komponenty:
    - Hero, EtfTable (karty do 40rem, tabulka se zebrou od 40rem, čárkovaný box
      s ikonou „i" u VTI) a Calculator (pergamenový list).
    - LeadForm (chyby pod polem, chyba odeslání s role="alert" nad tlačítkem) a
      rizika (nová komponenta Risks.tsx, číslování 1–7 v serifu).
    - Patička se zdroji (Footer dostal items) a .ph pro [PROVOZOVATEL …] přes
      Placeholders.tsx.
    - Čistá funkce splitPlaceholders má 4 nové testy, proto je testů 66
      místo 62.
  - Texty: nové štítky „TER" a „Zdroje" jsem nejdřív zapsal do docs/copy-cs.md,
    potom do content.ts. Statické units.years: 'roky' jsem z content.ts
    odstranil. Slova rok/roky/let už v yearsForms byla.
  - Místo pro tvou funkci: yearsUnit(years, words) v src/calculator.ts je zatím
    stub, který vrací words.few, tedy stávající „roky". Calculator ji volá,
    years je null při neplatném vstupu. Funkci i test napíšeš ty.

  Fonty

  - Použil jsem hotové latin a latin-ext woff2 z @fontsource/newsreader 5.3.0
    (stažené mimo repo), takže pyftsubset nebyl potřeba. Do package.json se nic
    nepřidalo.
  - Velikosti: latin 500 = 23 624 B, latin 600 = 23 876 B, latin-ext 500 = 15
    068 B, latin-ext 600 = 15 168 B (celkem 77 736 B). OFL.txt je v
    public/fonts/.
  - Preload je jen pro latin-600. Stránka nedělá žádný externí požadavek.
  - Čeština (ěščřžýáíéúůďťň) je v latin a latin-ext. Použil jsem unicode-range z
    Fontsource, ne tvůj užší rozsah. Plné rozsahy obou souborů jsou v CSS.
  - Fallback „Newsreader Fallback": startovní hodnoty z designu (96/92/24) jsem
    přepočítal, a protože 600 ve skutečnosti používá Georgii Bold, mám dvě
    fallback tváře.
    - Postup: jako tvar-reprezentativní vzorek jsem vzal průměrnou šířku znaků z
      vět ze stránky v souborech Newsreader a Georgia (fontTools v dočasném
      venv).
    - 500: size-adjust 97,1 %, ascent 75,7 %, descent 27,3 %.
    - 600: size-adjust 86 %, ascent 85,5 %, descent 30,8 %.
    - Ascent a descent: dělím je size-adjust, protože ho prohlížeč na override
      aplikuje taky.

  Naměřeno v Chrome (headless, vite preview na buildu)

  - Horizontální scroll: žádný při 375, 640, 960 i 1440 px (scrollWidth =
    clientWidth).
  - CTA v hero: computed color rgb(65,30,10) na rgb(217,142,63), kontrast
    5,58:1, výška 48px, stín latte 4px 4px 0. Oprava .on-dark a:not(.btn)
    funguje.
  - Kontrasty: u 32 unikátních dvojic text/pozadí (běžný stav, bez chybových
    stavů) je výsledek 0 selhání proti AA (4,5:1, u velkého textu 3:1). Nejnižší
    hodnota je 5,58:1 (CTA).
  - Layout shift: woff2 jsem zdržel o 1,5 s, takže stránka se nejdřív vykreslila
    s fallbackem. Při 375 i 1440 px vyšlo CLS 0 (PerformanceObserver
    layout-shift, žádný záznam). Výška dokumentu před a po načtení fontů je
    stejná (6048 px / 3782 px).
  - Velikost: CSS 12,73 kB (3,47 kB gzip), JS 239,56 kB (75,02 kB gzip), fonty
    77,7 kB celkem.

  Odchylky od designu

  1. Container queries: použil jsem @media (min-width: 40rem / 60rem), jak jsi
     chtěl. Layout je stejný, stránka je na celou šířku.
  2. min-width: 40rem na tabulce jsem vynechal. Buňky se zalamují,
     overflow-x:auto na boxu zůstal jen pro jistotu.
  3. Blok „Co uvádějí brokeři" (ve designu) jsem neudělal, je to session 07.
  4. Výsledek kalkulačky: content.result zůstává jedna věta beze změny textu.
     Číslo poplatku se jen vyřízne pro velké zobrazení, takže nemám samostatný
     štítek „Ilustrace, výpočet." (je to součást věty). Nebo to chceš rozdělit
     na části v content.ts? Je to tvoje volba.
  5. Tučné „Předpoklad výpočtu:" ani tučná částka v příkladu nejsou, protože by
     to vyžadovalo dělení textu.
  6. Zdroje v patičce jsou odkazy (jméno zdroje) kvůli pravidlu „každé číslo má
     zdroj". Design měl jen text „web emitenta".
  7. Operátor: řádek [PROVOZOVATEL …] je v rizikách i v patičce, jako ve
     designu.

  Neověřeno

  - Chybové stavy formuláře a kalkulačky (is-invalid, .err, .alert) jsem ve
    prohlížeči neprojel, jen jsou napsané a typově v pořádku.
  - Safari/iOS, vyhrazená klávesnice a screen reader.
  - Mutace testů pro splitPlaceholders neproběhla. Pro CSS testy nejsou.
  - Ověření fallbacku jen v Chrome na macOS, kde je Georgia. Na zařízení bez
    Georgie (Android) se použije Georgia/serif bez korekce.
  - npx prettier --check hlásí styl u 10 souborů, včetně mnoha, které jsem
    nezměnil, takže to není z této session. Ignoroval jsem to.

  Další kroky

  Napiš yearsUnit a test, a potom commit (já nic necommituju). Změněné soubory
  jsou ve git status, nové public/, Icons.tsx, Placeholders.tsx, Risks.tsx,
  placeholders.ts a placeholders.test.ts jsou untracked. Mám doplnit záznam do
  NOTES.md a ai-log/ (že CSS a komponenty napsal agent podle schváleného plánu)?

✻ Worked for 4m 32s · done 8:26 PM

※ recap: Cílem je aplikovat styl "klidná banka + editorial" na ETF landing bez změny textů. Hotovo je vše kromě tvé funkce `yearsUnit` s testem (zatím stub v `src/calculator.ts`); napiš ji, a pak nech commit na sobě.

❯ Dobře, díky. Před commitem ještě:                                             
  1) Mutační kontrola splitPlaceholders: rozbij funkci na 2-3 místech (např.    
  špatný regex, vynechání posledního kusu textu), ukaž, že testy zčervenají, a  
  vrať to zpět.                                                                 
  2) Spusť npx prettier --check src a napiš, které soubory selhávají. Zformátuj 
  jen soubory změněné v této session. Ostatní nech být a vyjmenuj je.           
  3) NOTES.md: přidej sekci "Session 06b: vizuální styl" (co se dělalo, měření: 
  CTA 5,58:1, CLS 0, velikosti, odchylky od designu, co nebylo ověřeno).        
  Stylopis označ jako napsaný agentem podle schváleného plánu. ai-log nech být, 
  export udělám já.                                                             
     Nic necommituj. yearsUnit a test napíšu já.                                

  Ran 3 shell commands (ctrl+o to expand)

⏺ Teď NOTES.md.

  Ran 1 shell command (ctrl+o to expand)

⏺ Mutační kontrola, formátování a záznam v NOTES.md jsou hotové. Nic není
  commitnuté.

  1) Mutační kontrola splitPlaceholders

  Zkusil jsem 5 mutantů a každý jsem vrátil. Soubor je byte-identický s
  originálem (kontrola diff a 4 zelené testy).

  ┌───────────────────────────────┬─────────────────────────────────────────┐
  │            Mutant             │                Výsledek                 │
  ├───────────────────────────────┼─────────────────────────────────────────┤
  │ Regex bere jakékoli [...]     │ červený test „does not treat other      │
  │ místo [PROVOZOVATEL ...]      │ brackets…" (1 selhal, 3 prošly)         │
  ├───────────────────────────────┼─────────────────────────────────────────┤
  │ Vynechaný poslední kus        │ 3 červené                               │
  │ (.slice(0, -1))               │                                         │
  ├───────────────────────────────┼─────────────────────────────────────────┤
  │ Příznak placeholder obrácený  │ 3 červené                               │
  ├───────────────────────────────┼─────────────────────────────────────────┤
  │ Vypuštěný filtr prázdných     │ červený test „empty string"             │
  │ částí                         │                                         │
  ├───────────────────────────────┼─────────────────────────────────────────┤
  │ Zkreslený regex při prvním    │ také červený, ale nebyl to zamýšlený    │
  │ pokusu (špatně napsaný sed)   │ mutant, proto jsem ho zopakoval přes    │
  │                               │ Python                                  │
  └───────────────────────────────┴─────────────────────────────────────────┘

  Žádný mutant nepřežil.

  2) Prettier

  Před formátováním selhávalo 10 souborů. Zformátoval jsem jen 4 z této session,
  Calculator.tsx, Icons.tsx, LeadForm.tsx a index.css.

  U Calculator.tsx a LeadForm.tsx má diff kvůli prettieru hodně řádků. Obě
  komponenty jsem ale v této session téměř celé přepsal, takže nic cizího jsem
  neztratil.

  Ponechané soubory, které jsem nezměnil a které prettier dál hlásí (6):
  - src/data/etfs.ts
  - src/leadForm.test.ts
  - src/lib/inserts.test.ts
  - src/lib/supabase.ts
  - src/tracker.test.ts
  - src/variant.test.ts

  Po formátování: 66 testů prochází, lint je čistý a build projde.

  3) NOTES.md

  Přidal jsem sekci „Session 06b: vizuální styl" (57 řádků):
  - co se dělalo,
  - měření: CTA 5,58:1, CLS 0, velikosti,
  - odchylky od designu,
  - co nebylo ověřeno.

  Stylopis, komponenty a splitPlaceholders jsou označené jako napsané agentem po
  schváleném plánu. yearsUnit a její test jsou označené jako tvoje (zatím
  stub). ai-log/ jsem nechal být.

  Další krok

  Až napíšeš yearsUnit a její test, jde zkontrolovat git status a commitnout.
  Nové soubory (public/, Icons.tsx, Placeholders.tsx, Risks.tsx,
  placeholders.ts, placeholders.test.ts) jsou untracked, ať je nezapomeneš
  přidat.

✻ Churned for 40s · done 8:32 PM

※ recap: Cílem je aplikovat vizuální styl "měkká káva" na ETF landing page; styly, mutační kontrola, prettier i NOTES.md jsou hotové a nic není commitnuté. Další krok: napiš `yearsUnit` a její test v `calculator.ts`, pak zkontroluj `git status` a commitni.