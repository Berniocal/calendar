# Calendar Studio – nástěnný kalendář

Editor pro sestavení vlastního měsíčního nebo týdenního nástěnného kalendáře v češtině či americké angličtině. Funguje v prohlížeči, podporuje fotografie z URL, souborů, iframe a schránky, ukládání projektu v prohlížeči, export/import JSON a tisk/export celého kalendáře do PDF.

## Nastavení

- **Kalendář**: libovolný rok 1900–2100, měsíční nebo týdenní zobrazení, běžné rozměry a orientace.
- **Jazyk**: Čeština (týden od pondělí) / English (US) (týden od neděle). Změní se názvy dnů a měsíců, formát dat i návaznost týdnů.
- **Rozložení stránky**: šest variant fotografie a kalendáře.
- **Samostatný vzhled tabulky**: pět stylů, čtyři fonty, velikost písma, hustota mřížky a barvy. Obě nastavení lze kombinovat nezávisle.
- **Jména a svátky**: samostatná zatržítka pro české jmeniny, americká jména, české svátky, americké federální svátky a významné dny obou zemí.
- **Export PDF**: otevřít tisk a vybrat „Uložit jako PDF“, zapnout tisk grafiky na pozadí a dodržet měřítko 100 %; možné pro jednu stránku i celý rok.

## Důležité upřesnění k USA jménům

V USA neexistuje jednotný oficiální jmenný kalendář. Americká jména jsou proto **neoficiální inspirativní návrhy** pro jednotlivé dny, nikoliv skutečné federální či národní jmeniny.

## Zdroje

- České jmeniny: [czechdatasets](https://czechdatasets.com/otevrena-data/jmeniny) (z dat Wikipedie, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)). U některých vydavatelů se data jmenin mohou drobně lišit.
- Česká státní sváteční data: [zákon č. 245/2000 Sb.](https://e-sbirka.gov.cz/eli/cz/sb/2000/245); vybrané tradiční a významné dny.
- Americké federální svátky: [U.S. Office of Personnel Management](https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/). Vybrané americké kulturní a významné dny nejsou automaticky dny pracovního volna.

## Spuštění

Aplikace: [https://berniocal.github.io/calendar/](https://berniocal.github.io/calendar/) (po aktivaci GitHub Pages v repozitáři).

GitHub Pages zapneš v **Settings → Pages → Deploy from a branch → main → /(root)**. Soubor `index.html` načítá `calendar-features.js`, `calendar-features.css` a `data/cz-names.js`; při přesouvání projektu musí zůstat všechny vedle sebe v uvedených cestách.

Vložené obrázky a vlastní poznámky se ukládají lokálně do prohlížeče. Pro přenos mezi zařízeními použij JSON export/import.
