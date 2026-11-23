/* Calendar Studio: Czech/US almanac, locale and independent calendar design.
   Czech namedays: czechdatasets.com (CC BY-SA 4.0), loaded from data/cz-names.js.
   US names are explicitly non-official daily name suggestions. */
(function(){'use strict';
const CS_MONTHS=['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'];
const EN_MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const CS_WEEK=['Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota','Neděle'];
const EN_WEEK=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const CS_SHORT=['PO','ÚT','ST','ČT','PÁ','SO','NE'];
const EN_SHORT=['SUN','MON','TUE','WED','THU','FRI','SAT'];
// Not a recognized US name-day calendar: inspirational common given names assigned by ordinal day.
const US_NAME_POOL=`Olivia,Noah,Emma,Liam,Charlotte,Oliver,Amelia,Elijah,Sophia,James,Isabella,William,Ava,Benjamin,Mia,Lucas,Evelyn,Henry,Luna,Theodore,Harper,Jack,Camila,Levi,Sofia,Alexander,Scarlett,Jackson,Elizabeth,Daniel,Victoria,Michael,Emily,Mason,Ella,Sebastian,Grace,Ethan,Chloe,Logan,Penelope,Owen,Layla,Samuel,Riley,Jacob,Nora,Asher,Lily,Aiden,Zoey,John,Hannah,Joseph,Aria,Wyatt,Ellie,David,Violet,Leo,Aurora,Luke,Hazel,Julian,Abigail,Hudson,Natalie,Grayson,Lucy,Matthew,Stella,Ezra,Leah,Gabriel,Ivy,Carter,Aubrey,Isaac,Willow,Jayden,Addison,Maverick,Audrey,Dylan,Elena,Lincoln,Naomi,Thomas,Paisley,Christopher,Claire,Josiah,Eliana,Andrew,Caroline,Joshua,Genesis,Nathan,Anna,Caleb,Allison,Ryan,Serenity,Adrian,Sarah,Miles,Ariana,Eli,Autumn,Nolan,Kennedy,Christian,Maya,Aaron,Alice,Cameron,Quinn,Ezekiel,Hailey,Colton,Elliana,Luca,Melody,Jonathan,Sadie,Isaiah,Julia,Charles,Ruby,Angel,Valentina,Cooper,Eva,Jeremiah,Clara,Easton,Adeline,Robert,Nevaeh,Jameson,Gianna,Brandon,Isla,Axel,Madelyn,Everett,Piper,Weston,Alexandra,Bennett,Emery,Silas,Lydia,Roman,Reagan,Jace,Josephine,Adriel,Sophie,Walker,Brielle,Carson,Madeline,George,Athena,Micah,Delilah,Rowan,Adalynn,Elias,Alaia,Connor,Raelynn,Nicholas,Kaylee,Declan,Ellery,Beau,Emerson,Adam,Melanie,Colin,Summer,Jason,Alina,Maxwell,Reese,Jasper,Adriana,Tristan,Juliette,Zachary,Elise,Jordan,Georgia,Tyler,Freya,Patrick,Margaret,Kevin,Cecilia,Brayden,Lucia,Diego,Juliana,Simon,Nina,Justin,Daisy,Brody,Ada,Chase,Olive,Emmett,June,Edward,Fiona,August,Amara,Cole,Maeve,Dean,Rose,Leonardo,Laila,Max,Remi,Victor,Eliza,Felix,Nyla,Peter,Hope,Grant,Blake,Oscar,Molly,Eric,Lucille,Timothy,Alana,Graham,Brooklyn,Arthur,Rebecca,Jude,Joanna,Bryce,Tessa,Dawson,Sienna,Emilio,Daniela,Beckett,Gabriella,Abraham,Jade,Alan,Nova,Steven,Bailey,Paul,Isabel,Camden,Faith,Leon,Jessica,Martin,Valerie,Richard,Callie,Joel,Trinity,Louis,Cora,Marcus,Alayna,Finn,Genevieve,Ericson,Rachel,Rafael,Kate,Anderson,Lola,Clayton,Annie,Jeremy,Marley,Derek,Celeste,Erick,Miriam,Kenneth,Sara,Leonel,Paige,Travis,Alison,Shawn,Rosalie,Raymond,Michelle,Jeffrey,Angela,Hector,Erin,Lawrence,Anastasia,Franklin,Morgan,Edgar,Alexis,Philip,Laura,Malcolm,Catherine,Spencer,Kimberly,Quentin,Andrea,Harvey,Bethany,Scott,Olga,Martin,Joyce,Dominic,Kristen,Cody,Melissa,Trenton,Vanessa,Brian,Whitney,Keith,Angela,Phillip,Candace,Albert,Bridget,Wayne,Veronica,Russell,Heather,Howard,Denise,Gerald,Janet,Roger,Sharon,Donald,Sandra,Anthony,Nancy,Kyle,Teresa,Wesley,Monica,Larry,Diana,Harold,Bonnie,Frederick,Amber,Leonard,April,Ray,Robin,Samuel,Judith,Bradley,Julie,Carl,Mary,Edwin,Jennifer,Bruce,Amy,Clifford,Nicole,Ronald,Stephanie,Patrick,Deborah,Lawrence,Patricia,Francis,Christine,Gregory,Carolyn,Robert,Christina,Andrew,Jacqueline,Timothy,Denise,Joseph,Victoria,Jonathan,Miranda,Daniel,Erica,Mason,Gloria,Frank,Marilyn,Sean,Cynthia,Neil,Elaine,Clinton,Joan,Stanley,Brenda,Nathaniel,Frances,Jeremy,Martha,George,Janice,Matthew,Linda`.split(',');
const pad=n=>String(n).padStart(2,'0');
const md=d=>`${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
const utc=(y,m,d)=>new Date(Date.UTC(y,m,d));
const plusDays=(d,n)=>new Date(d.getTime()+n*86400000);
const dayKey=d=>d.toISOString().slice(0,10);
const easterSunday=y=>{const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k+700)%7,m=Math.floor((a+11*h+22*l)/451),q=h+l-7*m+114;return utc(y,Math.floor(q/31)-1,(q%31)+1)};
const nth=(y,month,weekday,n)=>{const first=utc(y,month,1).getUTCDay();return utc(y,month,1+(7+weekday-first)%7+(n-1)*7)};
const last=(y,month,weekday)=>{const lastDate=utc(y,month+1,0);return utc(y,month+1,lastDate.getUTCDate()-(7+lastDate.getUTCDay()-weekday)%7)};
const event=(day,kind,cs,en)=>({day:dayKey(day),kind,cs,en});
const f=(y,m,d,kind,cs,en)=>event(utc(y,m-1,d),kind,cs,en);
const cache=new Map();
function buildYear(y){if(cache.has(y))return cache.get(y);const a=[];const add=(...args)=>a.push(f(y,...args));
// Czech public holidays in Law 245/2000 Sb.
add(1,1,'cz-holiday','Nový rok / Den obnovy samostatného českého státu','New Year / Czech Restoration Day');
add(5,1,'cz-holiday','Svátek práce','Labor Day');add(5,8,'cz-holiday','Den vítězství','Victory Day');
add(7,5,'cz-holiday','Cyril a Metoděj','Saints Cyril and Methodius Day');add(7,6,'cz-holiday','Den upálení mistra Jana Husa','Jan Hus Day');
add(9,28,'cz-holiday','Den české státnosti','Czech Statehood Day');add(10,28,'cz-holiday','Den vzniku samostatného československého státu','Czechoslovak Independence Day');
add(11,17,'cz-holiday','Den boje za svobodu a demokracii','Struggle for Freedom and Democracy Day');
add(12,24,'cz-holiday','Štědrý den','Christmas Eve');add(12,25,'cz-holiday','1. svátek vánoční','Christmas Day');add(12,26,'cz-holiday','2. svátek vánoční','St. Stephen’s Day');
const easter=easterSunday(y);a.push(event(plusDays(easter,-2),'cz-holiday','Velký pátek','Good Friday'),event(plusDays(easter,1),'cz-holiday','Velikonoční pondělí','Easter Monday'));
// Selected Czech cultural and memorial days; dates do not imply a public day off.
add(1,6,'cz-important','Tři králové','Epiphany');add(1,16,'cz-important','Den památky Jana Palacha','Jan Palach Remembrance Day');
add(1,27,'cz-important','Den památky obětí holocaustu','Holocaust Remembrance Day');add(2,2,'cz-important','Hromnice','Candlemas');
add(2,14,'cz-important','Valentýn','Valentine’s Day');add(3,8,'cz-important','Mezinárodní den žen','International Women’s Day');
add(3,28,'cz-important','Den učitelů','Teachers’ Day');add(4,22,'cz-important','Den Země','Earth Day');
add(4,30,'cz-important','Pálení čarodějnic','Walpurgis Night');add(5,5,'cz-important','Květnové povstání českého lidu','Prague Uprising Remembrance');
add(5,15,'cz-important','Den rodin','International Day of Families');add(6,1,'cz-important','Den dětí','Children’s Day');
add(6,10,'cz-important','Památka obětí vyhlazení Lidic','Lidice Remembrance Day');add(6,27,'cz-important','Den památky obětí komunistického režimu','Day of Remembrance for Victims of Communism');
add(8,21,'cz-important','Památka okupace v roce 1968','1968 Invasion Remembrance');add(10,8,'cz-important','Památný den sokolstva','Sokol Memorial Day');
add(11,2,'cz-important','Dušičky','All Souls’ Day');add(11,11,'cz-important','Den válečných veteránů','Veterans Remembrance Day');
a.push(event(easter,'cz-important','Velikonoční neděle','Easter Sunday'));
a.push(event(nth(y,4,0,2),'cz-important','Den matek','Mother’s Day'));
a.push(event(nth(y,5,0,3),'cz-important','Den otců','Father’s Day'));
// US federal holidays; public holiday is always tagged on its actual date.
add(1,1,'us-holiday','Nový rok','New Year’s Day');
add(6,19,'us-holiday','Juneteenth – den osvobození','Juneteenth National Independence Day');
add(7,4,'us-holiday','Den nezávislosti USA','Independence Day');
add(11,11,'us-holiday','Den veteránů USA','Veterans Day');
add(12,25,'us-holiday','Vánoce','Christmas Day');
a.push(event(nth(y,0,1,3),'us-holiday','Den Martina Luthera Kinga','Martin Luther King Jr. Day'));
a.push(event(nth(y,1,1,3),'us-holiday','Den prezidentů USA','Washington’s Birthday (Presidents’ Day)'));
a.push(event(last(y,4,1),'us-holiday','Den památky padlých','Memorial Day'));
a.push(event(nth(y,8,1,1),'us-holiday','Svátek práce USA','Labor Day'));
a.push(event(nth(y,9,1,2),'us-holiday','Kolumbův den / Den původních obyvatel','Columbus Day / Indigenous Peoples’ Day'));
a.push(event(nth(y,10,4,4),'us-holiday','Díkůvzdání','Thanksgiving Day'));
// Selected widely observed American cultural and commemorative days.
add(2,2,'us-important','Hromnice USA','Groundhog Day');add(2,14,'us-important','Valentýn','Valentine’s Day');
add(3,17,'us-important','Den sv. Patrika','St. Patrick’s Day');add(4,22,'us-important','Den Země','Earth Day');
add(5,5,'us-important','Cinco de Mayo','Cinco de Mayo');add(6,14,'us-important','Den vlajky USA','Flag Day');
add(9,11,'us-important','Vzpomínka na 11. září','Patriot Day');add(9,17,'us-important','Den ústavy USA','Constitution Day');
add(10,31,'us-important','Halloween','Halloween');add(12,31,'us-important','Silvestr','New Year’s Eve');
a.push(event(nth(y,4,0,2),'us-important','Den matek USA','Mother’s Day'));
a.push(event(nth(y,5,0,3),'us-important','Den otců USA','Father’s Day'));
a.push(event(plusDays(nth(y,10,4,4),1),'us-important','Černý pátek','Black Friday'));
a.push(event(easter,'us-important','Velikonoční neděle','Easter Sunday'));
a.push(event(plusDays(nth(y,10,1,1),1),'us-important','Volební den USA','Election Day'));
// Inauguration Day in presidential inauguration years, not nationwide federal holiday.
if(y>=1900 && (y-2025)%4===0)add(1,20,'us-important','Inaugurace prezidenta USA','Inauguration Day');
// Observed federal dates (when fixed-date US holidays fall on weekends).
for(const [mo,da,cs,en] of [[1,1,'Nový rok (náhradní den)','New Year’s Day (observed)'],[6,19,'Juneteenth (náhradní den)','Juneteenth (observed)'],[7,4,'Den nezávislosti (náhradní den)','Independence Day (observed)'],[11,11,'Den veteránů (náhradní den)','Veterans Day (observed)'],[12,25,'Vánoce (náhradní den)','Christmas Day (observed)']]){
 const x=utc(y,mo-1,da);const wd=x.getUTCDay();if(wd===6)a.push(event(plusDays(x,-1),'us-holiday',cs,en));else if(wd===0)a.push(event(plusDays(x,1),'us-holiday',cs,en));
}
// In some years Jan 1 of the *following* year is observed on Dec 31 of this year.
if(utc(y+1,0,1).getUTCDay()===6)a.push(event(utc(y,11,31),'us-holiday','Nový rok (náhradní den)','New Year’s Day (observed)'));
const m=new Map();for(const x of a){if(!m.has(x.day))m.set(x.day,[]);m.get(x.day).push(x)}cache.set(y,m);return m}
const isEn=s=>s.locale==='en-US';
function nameOfDay(d,s){const names=[];if(s.czNames){const cs=window.CALENDAR_CZ_NAMES?.[md(d)];if(cs)names.push({kind:'name-cz',text:isEn(s)?`CZ: ${cs}`:cs,title:isEn(s)?`Czech name day: ${cs}`:`Jmeniny: ${cs}`})}
 if(s.usNames){const y=d.getUTCFullYear(),idx=Math.floor((d-utc(y,0,1))/86400000);const name=US_NAME_POOL[idx%US_NAME_POOL.length];names.push({kind:'name-us',text:isEn(s)?`${name}*`:`US: ${name}*`,title:isEn(s)?`US name suggestion (unofficial): ${name}`:`Americké jméno dne (neoficiální): ${name}`})}return names}
function dayItems(d,s){const items=nameOfDay(d,s);const events=buildYear(d.getUTCFullYear()).get(dayKey(d))||[];
 const active={'cz-holiday':s.czHolidays,'us-holiday':s.usHolidays,'cz-important':s.czImportant,'us-important':s.usImportant};
 for(const event of events)if(active[event.kind]){const label=isEn(s)?event.en:event.cs;items.push({kind:event.kind,text:label,title:label})}return items}
function compactEventLabel(item,s){
 if(!/(holiday|important)$/.test(item.kind))return item.text;
 const cs={
  'Nový rok / Den obnovy samostatného českého státu':'Nový rok / Den ČR',
  'Den vzniku samostatného československého státu':'Vznik Československa',
  'Den boje za svobodu a demokracii':'Svoboda a demokracie',
  'Den upálení mistra Jana Husa':'Den mistra Jana Husa',
  'Den památky obětí komunistického režimu':'Oběti komunismu',
  'Kolumbův den / Den původních obyvatel':'Kolumbův den',
  'Nový rok (náhradní den)':'Nový rok (náhr.)',
  'Den nezávislosti (náhradní den)':'Nezávislost (náhr.)',
  'Vánoce (náhradní den)':'Vánoce (náhr.)',
  'Den veteránů (náhradní den)':'Den veteránů (náhr.)',
  'Juneteenth (náhradní den)':'Juneteenth (náhr.)'
 };
 const en={
  'Juneteenth National Independence Day':'Juneteenth',
  'Washington’s Birthday (Presidents’ Day)':'Presidents’ Day',
  'Martin Luther King Jr. Day':'MLK Day',
  'Columbus Day / Indigenous Peoples’ Day':'Columbus Day',
  'New Year’s Day (observed)':'New Year’s (obs.)',
  'Independence Day (observed)':'Independence Day (obs.)',
  'Christmas Day (observed)':'Christmas (obs.)',
  'Veterans Day (observed)':'Veterans (obs.)',
  'Juneteenth (observed)':'Juneteenth (obs.)',
  'Struggle for Freedom and Democracy Day':'Freedom & Democracy',
  'Czechoslovak Independence Day':'Czechoslovak Day',
  'New Year / Czech Restoration Day':'New Year (CZ)',
  'Jan Palach Remembrance Day':'Jan Palach Day',
  'Holocaust Remembrance Day':'Holocaust Memorial',
  'Prague Uprising Remembrance':'Prague Uprising',
  'Day of Remembrance for Victims of Communism':'Communism Victims',
  'Saints Cyril and Methodius Day':'Cyril & Methodius',
  'Czech Statehood Day':'Czech Statehood'
 };
 return (isEn(s)?en:cs)[item.text]||item.text;
}
function monthEventBudget(s,hasNote){
 let count=['A3','S30','W30'].includes(s.format)?3:s.format==='A5'?1:2;
 if(['split','editorial','poster'].includes(s.style))count=Math.max(1,count-1);
 if(s.orientation==='landscape'&&s.style==='split')count=Math.max(1,count-1);
 if(Number(s.fontSize)>=125||hasNote)count=Math.max(1,count-1);
 return count;
}
function extraHTML(d,s,esc,weekly=false,hasNote=false){
 const items=dayItems(d,s);if(!items.length)return '';
 const order={'cz-holiday':0,'us-holiday':0,'name-cz':1,'name-us':1,'cz-important':2,'us-important':2};
 const sorted=weekly?items:[...items].sort((a,b)=>(order[a.kind]??3)-(order[b.kind]??3));
 const budget=weekly?Infinity:monthEventBudget(s,hasNote);
 const selected=sorted.slice(0,budget);
 const more=sorted.length-selected.length;
 const title=sorted.map(x=>x.title).join(' • ');
 return `<span class="day-extras${weekly?' week-extras':''}" title="${esc(title)}">${selected.map(item=>`<span class="day-extra ${item.kind}" title="${esc(item.title)}">${esc(weekly?item.text:compactEventLabel(item,s))}</span>`).join('')} </span>${more&&!weekly?`<span class="more-events-counter" title="${esc(sorted.slice(selected.length).map(x=>x.title).join(' • '))}">+${more}</span>`:''}`;
}
function hasPublicHoliday(d,s){return dayItems(d,s).some(x=>x.kind==='cz-holiday'||x.kind==='us-holiday')}
function monthMarkup(s,month,esc,isoDate){const year=s.year,start=isEn(s)?utc(year,month,1).getUTCDay():(utc(year,month,1).getUTCDay()+6)%7;const short=isEn(s)?EN_SHORT:CS_SHORT;
const head=short.map((n,i)=>`<div class="day-label${(isEn(s)?[0,6].includes(i):i>4)?' weekend':''}">${n}</div>`).join('');
const weeks=Math.ceil((start+utc(year,month+1,0).getUTCDate())/7);
const cells=Array.from({length:weeks*7},(_,i)=>{const d=utc(year,month,1-start+i),within=d.getUTCMonth()===month,wd=d.getUTCDay(),weekend=wd===0||wd===6,note=s.notes[isoDate(d)]||'',data=isoDate(d),show=within||s.showOther;return `<div class="datecell ${within?'':'outside'} ${weekend?(wd===0?'sunday':'saturday'):''}${show&&hasPublicHoliday(d,s)?' has-holiday':''}" data-date="${data}">${show?`<span class="date-number">${d.getUTCDate()}</span>${extraHTML(d,s,esc,false,Boolean(note))}`:''}${show&&note?`<span class="note">${esc(note)}</span>`:''}</div>`}).join('');return `<div class="month-grid" style="--calendar-weeks:${weeks}">${head}${cells}</div>`}
function usStart(y){const jan1=utc(y,0,1);return plusDays(jan1,-jan1.getUTCDay())}
function usWeeksInYear(y){return Math.floor((utc(y,11,31).getTime()-usStart(y).getTime())/86400000/7)+1}
function weekStart(s,idx,isoWeekStart){return isEn(s)?plusDays(usStart(s.year),idx*7):isoWeekStart(s.year,idx+1)}
function weekMarkup(s,index,esc,isoDate,isoWeekStart){const start=weekStart(s,index,isoWeekStart),weekDays=isEn(s)?EN_WEEK:CS_WEEK;return `<div class="week-grid">${weekDays.map((name,i)=>{const d=plusDays(start,i),date=isoDate(d),wd=d.getUTCDay(),weekend=wd===0||wd===6,hasHoliday=hasPublicHoliday(d,s);return `<div class="week-day ${weekend?'weekend':''}${hasHoliday?' has-holiday':''}" data-date="${date}"><span class="week-no">${d.getUTCDate()}</span><span class="week-name">${name}<small style="display:block;font-size:.78em;opacity:.55;font-weight:600">${isEn(s)?`${d.getUTCMonth()+1}/${d.getUTCFullYear()}`:`${d.getUTCMonth()+1}. ${d.getUTCFullYear()}`}</small></span><span class="week-details">${extraHTML(d,s,esc,true)}${s.notes[date]?`<span class="week-note">${esc(s.notes[date])}</span>`:''}</span></div>`}).join('')}</div>`}
function pageTitle(s,index){return s.kind==='monthly'?(isEn(s)?EN_MONTHS:CS_MONTHS)[index]:isEn(s)?`Week ${index+1}`:`Týden ${index+1}`}
function fmtDate(d,s){if(isEn(s))return `${d.getUTCMonth()+1}/${d.getUTCDate()}`;return `${d.getUTCDate()}.${d.getUTCMonth()+1}.`}
function pageLabel(s,page,isoWeekStart){if(s.kind==='monthly')return `${pageTitle(s,page)} ${s.year}`;const d=weekStart(s,page,isoWeekStart),e=plusDays(d,6);return `${isEn(s)?'Week':'Týden'} ${page+1} · ${fmtDate(d,s)}–${fmtDate(e,s)}`}
function monthTag(s,index,isoWeekStart){if(s.kind==='monthly')return pad(index+1);const start=weekStart(s,index,isoWeekStart),end=plusDays(start,6);if(isEn(s))return `${EN_MONTHS[start.getUTCMonth()]} ${start.getUTCDate()} – ${EN_MONTHS[end.getUTCMonth()]} ${end.getUTCDate()}`;return `${start.getUTCDate()}. ${CS_MONTHS[start.getUTCMonth()].toLowerCase()} – ${end.getUTCDate()}. ${CS_MONTHS[end.getUTCMonth()].toLowerCase()}`}
const UI_EN={
 'VLASTNÍ NÁSTĚNNÝ KALENDÁŘ':'CUSTOM WALL CALENDAR','Připraveno':'Ready','↓ Projekt JSON':'↓ Project JSON','↑ Načíst projekt':'↑ Import project','▣ Exportovat PDF':'▣ Export PDF','Vzhled kalendáře':'Calendar editor',
 'Kalendář':'Calendar','Rok':'Year','Typ kalendáře':'Calendar type','Měsíční':'Monthly','Týdenní':'Weekly','Formát stránky':'Page size','Čtverec · 30 × 30 cm':'Square · 30 × 30 cm','Čtverec · 21 × 21 cm':'Square · 21 × 21 cm','Nástěnný · 30 × 42 cm':'Wall · 30 × 42 cm','Nástěnný · 21 × 30 cm':'Wall · 21 × 30 cm','Panoráma · 20 × 50 cm':'Panorama · 20 × 50 cm','Orientace':'Orientation','Na výšku':'Portrait','Na šířku':'Landscape','Název kalendáře':'Calendar title','Podtitul':'Subtitle',
 'Styl stránky':'Page layout','Rozložení stránky a fotografií':'Photo and page layout','Rozložení fotografií a vzhled kalendářové tabulky můžete kombinovat libovolně.':'Mix any photo layout with any calendar grid design.','Klasický':'Classic','Magazín':'Magazine','Rozdělený':'Split','Minimalistický':'Minimal','Fotokoláž':'Photo collage','Plakát':'Poster','Vzhled kalendářové tabulky':'Calendar grid design','Čistý':'Clean','Moderní':'Modern','Elegantní':'Elegant','Výrazný':'Bold','Písmo':'Font','Bezpatkové':'Sans serif','Patkové':'Serif','Ozdobné':'Display','Strojopisné':'Monospace','Velikost textu':'Text size','Síla mřížky':'Grid lines','Bez čar':'No lines','Jemné':'Fine','Běžné':'Normal','Silné':'Thick',
 'Barvy':'Colors','Zvýraznění':'Accent','Text':'Text','Pozadí':'Background','Další možnosti':'Additional options','Popisek fotografie (město)':'Photo caption (city)','Zobrazit sousední dny měsíce':'Show dates from adjacent months','Zobrazit spodní popisek':'Show footer','Jazyk a kalendářní zvyklosti':'Language and week start','Čeština (pondělí první)':'Czech (Monday first)','English (US, Sunday first)':'English (US, Sunday first)','Jmeniny, svátky a významné dny':'Names, holidays and special days','České jmeniny':'Czech name days','V USA neexistuje jednotný oficiální jmenný kalendář; americká jména jsou pouze inspirativní návrhy.':'The USA has no official universal name-day calendar. US names here are only daily inspiration.','Americká jména (neoficiální)':'American names (unofficial)','České státní svátky':'Czech public holidays','Americké federální svátky':'US federal holidays','České významné dny':'Czech special days','Americké významné dny':'US special days',
 'Tisk a záloha':'Printing and backup','Kliknutím na konkrétní den v náhledu můžete doplnit vlastní text.':'Click any date in the preview to add a note.','Obnovit ukázkové fotky':'Restore sample photos','Smazat poznámky':'Clear notes','ŽIVÝ NÁHLED':'LIVE PREVIEW','Fotografie':'Photos','Fotografie na stránce':'Photos on this page','▣ Vložit obrázek ze schránky':'▣ Paste image from clipboard','Vrátit ukázku':'Restore sample','Použít na všechny stránky':'Apply to all pages','Přidat obrázek':'Add an image','JPG, PNG, WEBP · nebo':'JPG, PNG, WEBP · or','zobrazuje přes iframe':'shown in an iframe','Klikněte nebo sem přetáhněte fotku':'Click or drag a photo here','NEBO ODKAZ NA WEBU':'OR WEB LINK','Adresa obrázku / stránky':'Image / page URL','Použít':'Use','Přímý obrázek':'Direct image','Iframe stránky':'Page iframe','↗ Hledat fotky na Googlu':'↗ Find images on Google','Zkusit ukázkové iframe':'Try sample iframe','Úpravy fotografie':'Photo adjustments','Popisek města / obrázku':'City / image caption','Přizpůsobení fotografie':'Image fitting','Vyplnit prostor (ořez)':'Fill (crop)','Zobrazit celou fotografii':'Show full image','Výřez vodorovně':'Horizontal crop','Výřez svisle':'Vertical crop','O kalendáři':'About this calendar','PDF: jen tato stránka':'PDF: this page only','PDF: celý kalendář':'PDF: full calendar','POZNÁMKA V KALENDÁŘI':'CALENDAR NOTE','Den':'Day','Zrušit':'Cancel','Uložit poznámku':'Save note','Fotografie se nyní zobrazuje přes iframe.':'Image is now displayed in an iframe.','Pro tisk použitelná ukázka.':'Printable sample.','Tři králové':'Epiphany','Z Obrázků Google použijte':'From Google Images choose','(nikoli odkaz na výsledky vyhledávání) nebo přímo':'(not the search result URL), or','a Ctrl+V. Weby jako Google často zakazují vložení do iframe.':'and Ctrl+V. Websites such as Google commonly block iframe embedding.','Výřez funguje při režimu obrázku. U běžných webových iframe jej řídí vložená stránka.':'Crop controls work for images. Embedded websites control their own framing.'};
const textOriginal=new WeakMap();
function localizeUI(s){const isUS=isEn(s);document.documentElement.lang=isUS?'en-US':'cs';document.title=isUS?'Calendar Studio — custom wall calendars':'Kalendář Studio — nástěnné kalendáře';
 const roots=[document.querySelector('.app-header'),document.querySelector('.workspace'),document.querySelector('#noteBackdrop')].filter(Boolean);
 for(const root of roots){const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walk.nextNode()){
 if(!textOriginal.has(node))textOriginal.set(node,node.nodeValue);
 const original=textOriginal.get(node),t=original.trim();if(!t||!UI_EN[t])continue;node.nodeValue=isUS?original.replace(t,UI_EN[t]):original;
 }}
 for(const el of document.querySelectorAll('#localeSeg [data-locale]'))el.classList.toggle('active',el.dataset.locale===s.locale);
 for(const el of document.querySelectorAll('#calendarStyleList [data-calendar-style]'))el.classList.toggle('active',el.dataset.calendarStyle===s.calendarStyle);
 const label=document.querySelector('#fontSizeLabel');if(label)label.textContent=`${s.fontSize||100}%`;
 const slotText=document.querySelector('#activeSlotText'),selectedSlot=document.querySelector('#slotList .slot-choice.selected');if(slotText)slotText.textContent=(isUS?'Selected photo ':'Vybraná fotografie ')+String(Number(selectedSlot?.dataset.slot||0)+1);
 const preview=document.querySelector('#previewType');if(preview)preview.textContent=isUS?(s.kind==='monthly'?'/ MONTHLY':'/ WEEKLY'):(s.kind==='monthly'?'/ MĚSÍČNÍ':'/ TÝDENNÍ');
 const note=document.querySelector('#noteBackdrop p');if(note)note.textContent=isUS?'The note appears on this date and in the PDF export.':'Text se zobrazí v daném dni i v exportovaném PDF.';
 const txt=document.querySelector('#noteArea');if(txt)txt.placeholder=isUS?'Enter your note…':'Napište poznámku…';
}
function styleVars(s){const fonts={sans:"'DM Sans',Arial,sans-serif",serif:"Georgia,'Times New Roman',serif",display:"'Playfair Display',Georgia,serif",mono:"'Courier New',monospace"};const stroke={none:'0px',fine:'.055cqi',normal:'.11cqi',thick:'.22cqi'};const widths={A3:297,A4:210,A5:148,S30:300,S21:210,W30:300,W21:210,P20:200};const heights={A3:420,A4:297,A5:210,S30:300,S21:210,W30:420,W21:300,P20:500};const w=s.orientation==='landscape'?Math.max(widths[s.format]||210,heights[s.format]||297):Math.min(widths[s.format]||210,heights[s.format]||297);const density=Math.max(.65,Math.min(1,210/w))/Math.max(1,(s.fontSize||100)/100);return `--calendar-font:${fonts[s.fontFamily]||fonts.sans};--cal-scale:${(s.fontSize||100)/100};--grid-stroke:${stroke[s.gridLines]||stroke.normal};--event-density:${density.toFixed(3)};`}
window.CalendarFeatures={monthMarkup,weekMarkup,weekStart,usWeeksInYear,pageTitle,pageLabel,monthTag,localizeUI,styleVars,dayItems,easterSunday,US_NAME_POOL};
})();