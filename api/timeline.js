module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(HTML);
};

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>5th Grade · Curriculum Timeline</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#F8F7F4;color:#1a1a1a;min-height:100vh}
header{background:#1F3864;color:#fff;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px}
header h1{font-size:16px;font-weight:600}
.back{color:rgba(255,255,255,.7);text-decoration:none;font-size:12px}.back:hover{color:#fff}
.toolbar{background:#fff;border-bottom:1px solid #E5E3DE;padding:10px 24px;display:flex;gap:8px;align-items:center;position:sticky;top:0;z-index:100}
button{font-size:11px;padding:5px 12px;border:1px solid #D5D3CE;background:#fff;border-radius:6px;cursor:pointer;color:#333;transition:all .12s;font-family:inherit}
button:hover{background:#F0EEE9;border-color:#bbb}
button.add{background:#2A6B45;color:#fff;border-color:#2A6B45;font-weight:600}
button.add:hover{background:#1d4f31}
.main{padding:20px 24px}
.tl-wrap{overflow-x:auto;padding-bottom:4px;min-width:0}
.tl-table{width:100%}
.hdr-row{display:flex;height:22px}
.hdr-lbl{width:70px;flex-shrink:0}
.hdr-area{flex:1;display:flex}
.term-hdr{display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;border-radius:4px 4px 0 0}
.week-hdr{flex:1;font-size:7.5px;font-weight:600;color:#888;text-align:center;display:flex;align-items:center;justify-content:center;border-left:1px solid rgba(0,0,0,.04)}
.data-row{display:flex;border-bottom:1px solid #ECEAE6}
.row-lbl{width:70px;flex-shrink:0;padding:6px 6px 6px 0;display:flex;align-items:center;font-size:8.5px;font-weight:600;color:#666;line-height:1.3;word-break:break-word}
.row-lbl.proj{color:#4a30a0;font-size:9px}
.row-area{flex:1;position:relative;min-height:60px}
.band{position:absolute;top:0;bottom:0;pointer-events:none}
.dline{position:absolute;top:0;bottom:0;width:1px;background:rgba(0,0,0,.02);pointer-events:none}
.wline{position:absolute;top:0;bottom:0;width:1px;background:rgba(0,0,0,.06);pointer-events:none}
.tline{position:absolute;top:0;bottom:0;width:2px;background:rgba(0,0,0,.09);pointer-events:none}
.proj-drop{position:absolute;top:0;bottom:0;left:0;right:0}
.proj-drop.dov{background:rgba(46,117,182,.08)}
/* Project blocks */
/* Project blocks use flex so handles sit flush on left/right with no position conflicts */
.blk{position:absolute;top:5px;display:flex;align-items:stretch;border-radius:6px;border-width:1.5px;border-style:solid;cursor:pointer;user-select:none;box-shadow:0 1px 3px rgba(0,0,0,.07);transition:opacity .1s,box-shadow .1s;overflow:hidden}
.blk:hover{box-shadow:0 2px 8px rgba(0,0,0,.14)}
.blk.drag{opacity:.3;cursor:grabbing}
.blk.active{box-shadow:0 0 0 2.5px #1F3864,0 2px 8px rgba(0,0,0,.12)}
/* Project block resize handles — flex children, always full height, no conflicts */
.plh,.prh{width:9px;flex-shrink:0;cursor:ew-resize;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.07)}
.plh{border-radius:5px 0 0 5px}.prh{border-radius:0 5px 5px 0}
.plh::after,.prh::after{content:'';width:2px;height:16px;background:rgba(0,0,0,.22);border-radius:1px}
.plh:hover,.prh:hover{background:rgba(0,0,0,.14)}
/* Block content body */
.blk-body{flex:1;min-width:0;padding:5px 20px 5px 4px;position:relative}
.bt{font-size:9.5px;font-weight:600;line-height:1.3}
.bs{font-size:8px;opacity:.7;margin-top:1px;line-height:1.2}
.blk-dates{display:flex;align-items:center;gap:3px;margin-top:4px}
.blk-dates input{font-size:8px;border:none;background:rgba(0,0,0,.08);border-radius:3px;padding:1px 4px;width:43px;font-family:inherit;color:inherit;cursor:text}
.blk-dates input:focus{outline:none;background:rgba(0,0,0,.14)}
.blk-dates .dsep{font-size:8px;opacity:.5;flex-shrink:0}
.rm{position:absolute;top:3px;right:3px;width:14px;height:14px;border-radius:50%;border:none;cursor:pointer;font-size:8px;display:flex;align-items:center;justify-content:center;opacity:0;background:rgba(0,0,0,.2);color:#fff;padding:0;line-height:1}
.blk:hover .rm{opacity:1}
/* Discipline fields */
.df{position:absolute;top:5px;bottom:5px;border-radius:6px;border-width:1.5px;border-style:solid;display:flex;align-items:stretch;overflow:hidden;z-index:1}
.df textarea{flex:1;font-size:9.5px;border:none;padding:4px 4px 4px 8px;font-family:inherit;background:transparent;line-height:1.4;resize:none;color:inherit;min-width:0}
.df textarea:focus{outline:none;background:rgba(255,255,255,.5)}
.lh,.rh{flex-shrink:0;width:8px;cursor:ew-resize;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.05)}
.lh::after,.rh::after{content:'';width:2px;height:14px;background:rgba(0,0,0,.25);border-radius:1px}
.lh:hover,.rh:hover{background:rgba(0,0,0,.1)}
.df-proj{font-size:7.5px;font-weight:700;padding:1px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0;opacity:.7;border-bottom:1px solid rgba(0,0,0,.08)}
/* Detail panel */
.det{display:none;background:#fff;border-radius:10px;border:1px solid #E0DED9;padding:16px 20px;margin-top:14px;box-shadow:0 2px 10px rgba(0,0,0,.08);font-size:12px}
.det.op{display:block}
.det-hdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;gap:12px}
.det-title{font-size:14px;font-weight:700}
.det-sub{font-size:11px;color:#888;margin-top:2px}
.det-row{display:flex;gap:10px;margin-bottom:4px;font-size:11.5px;align-items:baseline}
.det-key{font-size:9.5px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:.06em;min-width:52px;flex-shrink:0}
.det-val{color:#444}
.det-discs{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;padding-top:10px;border-top:1px solid #F0EEE9}
.disc-chip{display:flex;align-items:center;gap:5px;padding:5px 11px;border-radius:20px;border-width:1.5px;border-style:solid;cursor:pointer;font-size:10.5px;font-weight:600;user-select:none;transition:opacity .12s}
.disc-chip input[type=checkbox]{cursor:pointer;width:11px;height:11px;flex-shrink:0}
.disc-chip.off{opacity:.45}
.det-btns{display:flex;gap:6px;margin-top:12px;padding-top:10px;border-top:1px solid #F0EEE9}
/* Pool */
.pool-section{margin-top:20px;padding-top:16px;border-top:1px solid #E5E3DE}
.pool-label{font-size:12px;font-weight:600;color:#555;margin-bottom:8px}
.pool{display:flex;flex-wrap:wrap;gap:6px;min-height:48px;padding:8px;border-radius:8px;border:1.5px dashed #C5C3BE;background:#F0EEE9}
.pool.dov{border-color:#2E75B6;background:#E6F1FB;border-style:solid}
.mn{padding:5px 10px;border-radius:5px;cursor:grab;font-size:10px;font-weight:600;white-space:nowrap;user-select:none;border-width:1.5px;border-style:solid;box-shadow:0 1px 3px rgba(0,0,0,.06);position:relative;transition:opacity .1s}
.mn:active{cursor:grabbing;opacity:.8}.mn.drag{opacity:.3}
.mn .rm{opacity:0}.mn:hover .rm{opacity:1}
.empty-pool{font-size:11px;color:#aaa;font-style:italic;padding:4px}
/* Modal */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(2px)}
.modal-bg.op{display:flex}
.modal{background:#fff;border-radius:14px;padding:24px;width:360px;max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18)}
.modal h3{font-size:16px;font-weight:700;margin-bottom:16px;color:#1F3864}
.fr{margin-bottom:12px}
.fr label{display:block;font-size:11px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.fr input,.fr textarea{width:100%;font-size:12px;padding:7px 10px;border:1px solid #D5D3CE;border-radius:7px;background:#FAFAF8;color:#222;font-family:inherit;transition:border-color .12s}
.fr input:focus,.fr textarea:focus{outline:none;border-color:#2E75B6;background:#fff}
.fr textarea{height:56px;resize:vertical}
.cg{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:6px}
.sw{aspect-ratio:1;border-radius:6px;cursor:pointer;transition:transform .1s,box-shadow .1s;position:relative}
.sw:hover{transform:scale(1.08)}
.sw.sel::after{content:'\\2713';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:rgba(0,0,0,.5)}
.sw.sel{box-shadow:0 0 0 2.5px #1F3864,0 0 0 4px #fff inset}
.mbtns{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;padding-top:12px;border-top:1px solid #EEE}
.mbtns button{font-size:12px;padding:7px 16px}
.mbtns .pri{background:#2A6B45;color:#fff;border-color:#2A6B45;font-weight:600}
.mbtns .pri:hover{background:#1d4f31}
</style>
</head>
<body>
<header>
  <h1>5th Grade &middot; Curriculum Timeline</h1>
  <a class="back" href="/">&#8592; Planning Board</a>
</header>
<div class="toolbar">
  <button class="add" id="newbtn">+ New block</button>
</div>
<div class="main">
  <div class="tl-wrap"><div class="tl-table" id="tl"></div></div>
  <div class="det" id="det"></div>
  <div class="pool-section">
    <div class="pool-label">Unplaced units &mdash; drag onto the Project row above</div>
    <div class="pool" id="pool"></div>
  </div>
</div>
<datalist id="tl-weeks"></datalist>
<div class="modal-bg" id="mbg">
  <div class="modal">
    <h3 id="mtitle">New unit block</h3>
    <div class="fr"><label>Title *</label><input id="ft" type="text" placeholder="e.g. Mesopotamia Rap"></div>
    <div class="fr"><label>Subtitle</label><input id="fs" type="text" placeholder="e.g. 3-week flagship unit"></div>
    <div class="fr"><label>Skills</label><input id="fsk" type="text" placeholder="e.g. Audio editing, collaboration"></div>
    <div class="fr"><label>Tools</label><input id="fto" type="text" placeholder="e.g. SoundTrap, Adobe Express"></div>
    <div class="fr"><label>Notes</label><textarea id="fn" placeholder="Block schedule, co-teachers, logistics..."></textarea></div>
    <div class="fr"><label>Block color</label><div class="cg" id="cg"></div></div>
    <div class="mbtns">
      <button id="cancelbtn">Cancel</button>
      <button class="pri" id="savebtn">Add block</button>
    </div>
  </div>
</div>
<script src="/api/pusher"></script>
<script>
const TERMS=[
  {label:"Term 1",weeks:["Sep 1","Sep 8","Sep 15","Sep 22","Sep 29","Oct 6","Oct 13","Oct 20","Oct 27","Nov 3","Nov 10","Nov 17"],color:"#1F3864",light:"#E6EFF9"},
  {label:"Term 2",weeks:["Dec 1","Dec 8","Dec 15","Jan 5","Jan 12","Jan 19","Jan 26","Feb 2","Feb 9","Feb 16","Feb 23","Mar 2"],color:"#2A6B45",light:"#E4F2EC"},
  {label:"Term 3",weeks:["Mar 30","Apr 6","Apr 13","Apr 20","Apr 27","May 4","May 11","May 18","May 25","Jun 1"],color:"#7B3500",light:"#F5EBE4"},
];
const TOTAL=TERMS.reduce((a,t)=>a+t.weeks.length,0);
const DC={
  VA:{bg:"#EEEDFE",bd:"#534AB7",tx:"#3C3489",label:"Visual Arts"},
  MU:{bg:"#E1F5EE",bd:"#0F6E56",tx:"#085041",label:"Music"},
  DR:{bg:"#FAECE7",bd:"#993C1D",tx:"#712B13",label:"Drama"},
  CDL:{bg:"#FAEEDA",bd:"#854F0B",tx:"#633806",label:"CDL"},
  CL:{bg:"#F0EEE9",bd:"#5F5E5A",tx:"#333",label:"Classroom"},
};
const DISCS=["VA","MU","DR","CDL","CL"];
const PAL=[
  {bg:"#EEEDFE",bd:"#534AB7",tx:"#3C3489",name:"Purple"},{bg:"#E1F5EE",bd:"#0F6E56",tx:"#085041",name:"Teal"},
  {bg:"#FAECE7",bd:"#993C1D",tx:"#712B13",name:"Coral"},{bg:"#FAEEDA",bd:"#854F0B",tx:"#633806",name:"Amber"},
  {bg:"#F0EEE9",bd:"#5F5E5A",tx:"#333",name:"Gray"},{bg:"#E6EFF9",bd:"#1F3864",tx:"#0C2D5E",name:"Navy"},
  {bg:"#E4F2EC",bd:"#2A6B45",tx:"#1a4a2e",name:"Forest"},{bg:"#FBEAF0",bd:"#993556",tx:"#72243E",name:"Rose"},
  {bg:"#FEECEC",bd:"#A32D2D",tx:"#791F1F",name:"Red"},{bg:"#F2EAFF",bd:"#7030A0",tx:"#4B0082",name:"Violet"},
  {bg:"#E0F7FA",bd:"#0097A7",tx:"#006064",name:"Cyan"},{bg:"#FFFDE7",bd:"#C8960C",tx:"#5D4037",name:"Yellow"},
  {bg:"#FCE4F3",bd:"#C2185B",tx:"#880E4F",name:"Pink"},{bg:"#E8EAF6",bd:"#3949AB",tx:"#1A237E",name:"Indigo"},
  {bg:"#E8F5E9",bd:"#388E3C",tx:"#1B5E20",name:"Lime"},{bg:"#FFF3E0",bd:"#E65100",tx:"#bf360c",name:"Orange"},
  {bg:"#ECEFF1",bd:"#546E7A",tx:"#263238",name:"Steel"},{bg:"#F3E5F5",bd:"#7B1FA2",tx:"#4A148C",name:"Mauve"},
];
const ORIG=[
  {id:"u1",title:"Poster Mosaic",sub:"Adobe Express",disc:["VA","CDL"],tools:"Adobe Express",skills:"Visual Design, Composition",notes:"B Block",term:0,week:4,pal:0},
  {id:"u2",title:"Recipe Book",sub:"3-week project",disc:["VA","CDL","CL"],tools:"Adobe Express, Google Docs",skills:"Graphic Design, Expository Writing",notes:"B Block",term:0,week:6,pal:5},
  {id:"u3",title:"Wrinkled World",sub:"Laser cut boards",disc:["VA","CDL"],tools:"CDL laser cutter",skills:"Geography, 3D Design",notes:"A Block",term:0,week:7,pal:0},
  {id:"u4",title:"Future Self Voicemail",sub:"Audio recording",disc:["MU","DR","CDL"],tools:"SoundTrap",skills:"Audio Editing, Performance",notes:"~1 week",term:0,week:8,pal:1},
  {id:"u5",title:"Great Listen Podcast",sub:"Interview + cover art",disc:["MU","DR","VA","CDL"],tools:"SoundTrap, Adobe Express",skills:"Interviewing, Audio, Visual",notes:"Flagship",term:1,week:0,pal:2},
  {id:"u6",title:"Mesopotamia Rap",sub:"Flagship unit",disc:["MU","VA","CDL","CL"],tools:"SoundTrap, CDL",skills:"Music Production, SS",notes:"All disciplines",term:1,week:1,pal:6},
  {id:"u7",title:"Holiday Ornaments",sub:"3D design",disc:["VA","CDL"],tools:"CDL",skills:"Visual Art, 3D Design",notes:"December",term:1,week:2,pal:0},
  {id:"u8",title:"Declamations",sub:"Spoken word performance",disc:["DR","MU","VA"],tools:"CDL recording",skills:"Performance, Voice",notes:"Public event",term:1,week:3,pal:2},
  {id:"u9",title:"Visual Art Collab",sub:"Book club tie-in",disc:["VA","CL"],tools:"Various",skills:"Visual Art, Collaboration",notes:"January",term:1,week:4,pal:0},
  {id:"u10",title:"Ancient Egypt",sub:"Essays + art",disc:["VA","DR","MU","CDL"],tools:"CDL",skills:"SS, Research, Art",notes:"Laser-cut artifacts",term:1,week:7,pal:3},
  {id:"u11",title:"Esperanza Rising",sub:"Reader's theatre",disc:["DR","MU","VA"],tools:"Various",skills:"Performance, Literature",notes:"ERPG unit",term:1,week:7,pal:2},
  {id:"u12",title:"World Peace Project",sub:"Collaborative art",disc:["CL","VA"],tools:"Various",skills:"Global Studies, Art",notes:"Term 3 opener",term:2,week:0,pal:4},
  {id:"u13",title:"India + Mohenjedaro",sub:"Shadow puppets + dig",disc:["VA","DR","MU","CDL"],tools:"CDL, various",skills:"Geography, Ancient India",notes:"Coordinate art + dig roleplay",term:2,week:1,pal:3},
  {id:"u14",title:"World Religion: Hinduism",sub:"Flagship unit",disc:["VA","MU","DR","CDL"],tools:"CDL, SoundTrap",skills:"Mandala, Bhajan, Drama",notes:"All disciplines",term:2,week:3,pal:9},
  {id:"u15",title:"World Religion: Buddhism",sub:"Silhouette + prayer card",disc:["VA","MU","DR","CDL"],tools:"CDL, various",skills:"Art, Music, Drama",notes:"Diwali sun catcher",term:2,week:5,pal:1},
  {id:"u16",title:"Board Games",sub:"Design + prototype",disc:["VA","DR","MU","CDL"],tools:"CDL",skills:"Game Design, Narrative",notes:"Showcase event",term:2,week:7,pal:6},
  {id:"u17",title:"End of Year Showcase",sub:"Culminating event",disc:["VA","MU","DR","CDL","CL"],tools:"All",skills:"All disciplines",notes:"Family showcase",term:2,week:8,pal:7},
];

let units=ORIG.map(u=>({...u}));
let nid=200,drag=null,lastVersion=null,resizing=null,detUid=null;
let editId=null,selPal=0;

function pal(u){return PAL[u.pal||0];}
function colOf(u){
  if(u.term==null||u.week==null)return null;
  let c=0;for(let i=0;i<u.term;i++)c+=TERMS[i].weeks.length;
  return c+u.week;
}
function colToTW(col){
  let r=col;
  for(let i=0;i<TERMS.length;i++){if(r<TERMS[i].weeks.length)return{term:i,week:r};r-=TERMS[i].weeks.length;}
  return null;
}
const TOTAL_DAYS=TOTAL*7; // 238 day-columns for sub-week precision
function pct(col,span){span=span||1;return{l:(col/TOTAL*100)+'%',w:(span/TOTAL*100)+'%'};}
function pctD(dayCol,daySpan){daySpan=daySpan||7;return{l:(dayCol/TOTAL_DAYS*100)+'%',w:(daySpan/TOTAL_DAYS*100)+'%'};}
// Week label <-> day-index maps
const WEEK_DAY={};const DAY_WEEK=[];
(function(){let d=0;TERMS.forEach(t=>t.weeks.forEach(w=>{WEEK_DAY[w]=d;DAY_WEEK.push(w);d+=7;}));})();
function dayToWeek(day){return DAY_WEEK[Math.max(0,Math.min(DAY_WEEK.length-1,Math.floor(day/7)))]||'';}
function ensureDF(u){
  if(!u.discFields)u.discFields={};
  DISCS.forEach(dk=>{
    if(!u.discFields[dk])u.discFields[dk]={enabled:!!(u.disc&&u.disc.includes(dk)),notes:'',offset:0,span:7};
  });
}
function dfPos(u,dk){
  const df=u.discFields[dk],uDayCol=colOf(u)*7;
  const sc=Math.max(0,uDayCol+(df.offset||0));
  const ec=Math.min(TOTAL_DAYS-1,sc+(df.span||7)-1);
  return{sc,ec,span:ec-sc+1};
}

function buildBg(el){
  let off=0;
  TERMS.forEach((t,ti)=>{
    const w=t.weeks.length;
    const b=document.createElement('div');b.className='band';
    b.style.left=(off/TOTAL*100)+'%';b.style.width=(w/TOTAL*100)+'%';b.style.background=t.light;
    el.appendChild(b);
    // Day tick marks within each week (faint)
    for(let wi=0;wi<w;wi++){
      for(let di=1;di<7;di++){
        const dl=document.createElement('div');dl.className='dline';
        dl.style.left=((off+wi+di/7)/TOTAL*100)+'%';el.appendChild(dl);
      }
    }
    // Week boundary lines
    for(let wi=1;wi<w;wi++){
      const l=document.createElement('div');l.className='wline';l.style.left=((off+wi)/TOTAL*100)+'%';el.appendChild(l);
    }
    if(ti>0){const tl=document.createElement('div');tl.className='tline';tl.style.left=(off/TOTAL*100)+'%';el.appendChild(tl);}
    off+=w;
  });
}

let saveTimer=null;
async function saveState(){
  const v=Date.now();
  try{await fetch('/api/state',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({units,nid,v})});lastVersion=v;}catch(_){}
}
function queueSave(){clearTimeout(saveTimer);saveTimer=setTimeout(saveState,400);}

function oDS(e,uid){
  drag={uid};e.dataTransfer.effectAllowed='move';
  setTimeout(()=>document.querySelectorAll('[data-uid="'+uid+'"]').forEach(el=>el.classList.add('drag')),0);
}
function oDE(){document.querySelectorAll('.drag').forEach(el=>el.classList.remove('drag'));drag=null;}

function render(){buildTimeline();buildPool();if(detUid){const u=units.find(x=>x.id===detUid);if(u)showDet(u);else closeDet();}}

function buildTimeline(){
  const tl=document.getElementById('tl');tl.innerHTML='';
  // 70px for row labels + 65px per week column → each block always has readable width
  tl.style.minWidth=(70+TOTAL*65)+'px';

  const th=document.createElement('div');th.className='hdr-row';
  th.appendChild(Object.assign(document.createElement('div'),{className:'hdr-lbl'}));
  const tha=document.createElement('div');tha.className='hdr-area';
  TERMS.forEach(t=>{
    const d=document.createElement('div');d.className='term-hdr';d.style.flex=t.weeks.length;
    d.style.color=t.color;d.style.background=t.light;d.textContent=t.label;tha.appendChild(d);
  });
  th.appendChild(tha);tl.appendChild(th);

  const wh=document.createElement('div');wh.className='hdr-row';
  wh.appendChild(Object.assign(document.createElement('div'),{className:'hdr-lbl'}));
  const wha=document.createElement('div');wha.className='hdr-area';
  TERMS.forEach(t=>t.weeks.forEach(w=>{
    const d=document.createElement('div');d.className='week-hdr';d.textContent=w;wha.appendChild(d);
  }));
  wh.appendChild(wha);tl.appendChild(wh);

  // Project row
  const pr=document.createElement('div');pr.className='data-row';
  pr.appendChild(Object.assign(document.createElement('div'),{className:'row-lbl proj',textContent:'Project'}));
  const pra=document.createElement('div');pra.className='row-area';pra.style.minHeight='108px';
  pra.dataset.type='project';
  buildBg(pra);
  const dz=document.createElement('div');dz.className='proj-drop';
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dov');});
  dz.addEventListener('dragleave',()=>dz.classList.remove('dov'));
  dz.addEventListener('drop',e=>{
    e.preventDefault();dz.classList.remove('dov');if(!drag)return;
    const r=pra.getBoundingClientRect();
    const col=Math.max(0,Math.min(TOTAL-1,Math.floor((e.clientX-r.left)/r.width*TOTAL)));
    const tw=colToTW(col);if(!tw)return;
    const u=units.find(x=>x.id===drag.uid);if(!u)return;
    u.term=tw.term;u.week=tw.week;ensureDF(u);render();saveState();
  });
  pra.appendChild(dz);
  units.forEach(u=>{
    if(u.term==null||u.week==null)return;
    const col=colOf(u),c=pal(u);
    const uDayCol=col*7,tlOff=u.tlOffset||0,tlSpan=u.tlSpan||7;
    const p2=pctD(uDayCol+tlOff,tlSpan);
    const startDay=uDayCol+tlOff, endDay=startDay+tlSpan-7;

    const blk=document.createElement('div');
    blk.className='blk'+(detUid===u.id?' active':'');
    blk.draggable=true;blk.dataset.uid=u.id;
    blk.style.left=p2.l;blk.style.width=p2.w;
    blk.style.background=c.bg;blk.style.borderColor=c.bd;

    // Left resize handle (flex child — no position conflicts)
    const plh=document.createElement('div');plh.className='plh';
    plh.addEventListener('mousedown',e=>{e.preventDefault();e.stopPropagation();resizing={type:'proj',side:'left',uid:u.id,uDayCol,origOffset:tlOff,origSpan:tlSpan};});
    plh.addEventListener('click',e=>e.stopPropagation());
    blk.appendChild(plh);

    // Content body
    const body=document.createElement('div');body.className='blk-body';
    body.innerHTML='<div class="bt" style="color:'+c.tx+'">'+u.title+'</div>'
      +'<div class="bs" style="color:'+c.tx+'">'+(u.sub||'')+'</div>';
    const rm=document.createElement('button');rm.className='rm';rm.innerHTML='&#x2715;';
    rm.onclick=e=>{e.stopPropagation();u.term=undefined;u.week=undefined;if(detUid===u.id)closeDet();render();saveState();};
    body.appendChild(rm);

    // Date range inputs
    const dv=document.createElement('div');dv.className='blk-dates';
    const si=document.createElement('input');si.type='text';si.setAttribute('list','tl-weeks');
    si.value=dayToWeek(startDay);si.placeholder='Start';si.style.color=c.tx;
    const sep2=document.createElement('span');sep2.className='dsep';sep2.textContent='→';sep2.style.color=c.tx;
    const ei=document.createElement('input');ei.type='text';ei.setAttribute('list','tl-weeks');
    ei.value=dayToWeek(Math.max(startDay,endDay));ei.placeholder='End';ei.style.color=c.tx;
    function applyDates(){
      const sv=WEEK_DAY[si.value.trim()],ev=WEEK_DAY[ei.value.trim()];
      if(sv!=null&&ev!=null&&ev>=sv){
        u.tlOffset=sv-uDayCol;u.tlSpan=ev-sv+7;render();saveState();
      }
    }
    [si,ei].forEach(inp=>{
      inp.addEventListener('blur',applyDates);
      inp.addEventListener('keydown',e=>{if(e.key==='Enter')applyDates();});
      inp.addEventListener('click',e=>e.stopPropagation());
      inp.addEventListener('mousedown',e=>e.stopPropagation());
    });
    dv.appendChild(si);dv.appendChild(sep2);dv.appendChild(ei);
    body.appendChild(dv);
    blk.appendChild(body);

    // Right resize handle (flex child — sits flush at right edge)
    const prh=document.createElement('div');prh.className='prh';
    prh.addEventListener('mousedown',e=>{e.preventDefault();e.stopPropagation();resizing={type:'proj',side:'right',uid:u.id,uDayCol,origOffset:tlOff,origSpan:tlSpan};});
    prh.addEventListener('click',e=>e.stopPropagation());
    blk.appendChild(prh);

    blk.addEventListener('dragstart',e=>{oDS(e,u.id);});
    blk.addEventListener('dragend',oDE);
    blk.addEventListener('click',e=>{
      if(['rm','plh','prh'].some(cl=>e.target.classList.contains(cl)))return;
      if(e.target.tagName==='INPUT'||e.target.tagName==='SPAN')return;
      showDet(u);
    });
    pra.appendChild(blk);
  });
  pr.appendChild(pra);tl.appendChild(pr);

  // Discipline rows — only show .df for enabled disciplines
  DISCS.forEach(dk=>{
    const info=DC[dk];
    const row=document.createElement('div');row.className='data-row';
    const lbl=document.createElement('div');lbl.className='row-lbl';
    lbl.innerHTML='<span style="color:'+info.bd+'">'+info.label+'</span>';
    row.appendChild(lbl);
    const area=document.createElement('div');area.className='row-area';area.style.minHeight='72px';
    area.dataset.dk=dk;
    buildBg(area);

    units.forEach(u=>{
      if(u.term==null||u.week==null)return;
      ensureDF(u);
      const df=u.discFields[dk];
      if(!df.enabled)return; // only show enabled disciplines
      const uCol=colOf(u),c=pal(u),pos=dfPos(u,dk),p2=pctD(pos.sc,pos.span);
      const wrap=document.createElement('div');
      wrap.className='df';wrap.dataset.uid=u.id;wrap.dataset.dk=dk;
      wrap.style.left=p2.l;wrap.style.width=p2.w;
      wrap.style.background=info.bg;wrap.style.borderColor=info.bd;wrap.style.color=info.tx;
      wrap.style.zIndex='1';
      wrap.addEventListener('mousedown',()=>{
        document.querySelectorAll('.df[data-dk="'+dk+'"]').forEach(el=>el.style.zIndex='1');
        wrap.style.zIndex='20';
      });

      const lh=document.createElement('div');lh.className='lh';
      lh.addEventListener('mousedown',e=>{
        e.preventDefault();e.stopPropagation();
        resizing={type:'disc',side:'left',uid:u.id,dk,uCol,origOffset:df.offset||0,origSpan:df.span||7};
      });
      wrap.appendChild(lh);

      // Project identifier label
      const projLbl=document.createElement('div');projLbl.className='df-proj';
      projLbl.textContent=u.title;projLbl.style.color=c.tx;
      wrap.appendChild(projLbl);

      const ta=document.createElement('textarea');
      ta.placeholder='Notes...';ta.value=df.notes||'';
      ta.addEventListener('input',()=>{df.notes=ta.value;});
      ta.addEventListener('blur',()=>queueSave());
      ta.addEventListener('focus',()=>{
        document.querySelectorAll('.df[data-dk="'+dk+'"]').forEach(el=>el.style.zIndex='1');
        wrap.style.zIndex='20';
      });
      wrap.appendChild(ta);

      const rh=document.createElement('div');rh.className='rh';
      rh.addEventListener('mousedown',e=>{
        e.preventDefault();e.stopPropagation();
        resizing={type:'disc',side:'right',uid:u.id,dk,uCol,origOffset:df.offset||0,origSpan:df.span||7};
      });
      wrap.appendChild(rh);
      area.appendChild(wrap);
    });
    row.appendChild(area);tl.appendChild(row);
  });
}

// Detail panel
function showDet(u){
  detUid=u.id;
  ensureDF(u);
  const c=pal(u);
  const det=document.getElementById('det');
  det.className='det op';
  det.innerHTML=
    '<div class="det-hdr">'
    +'<div><div class="det-title" style="color:'+c.tx+'">'+u.title+'</div>'
    +(u.sub?'<div class="det-sub">'+u.sub+'</div>':'')+'</div>'
    +'<button onclick="closeDet()">&#x2715; Close</button></div>'
    +(u.skills?'<div class="det-row"><span class="det-key">Skills</span><span class="det-val">'+u.skills+'</span></div>':'')
    +(u.tools?'<div class="det-row"><span class="det-key">Tools</span><span class="det-val">'+u.tools+'</span></div>':'')
    +(u.notes?'<div class="det-row"><span class="det-key">Notes</span><span class="det-val">'+u.notes+'</span></div>':'')
    +'<div class="det-discs" id="det-discs"></div>'
    +'<div class="det-btns"><button id="det-edit-btn">&#x270F; Edit block</button>'
    +'<button style="margin-left:auto" onclick="closeDet()">Close</button></div>';

  // Attach edit handler via listener (avoids quote-escaping issues with inline onclick)
  document.getElementById('det-edit-btn').addEventListener('click', function(){openMod(u.id);});

  const discsEl=document.getElementById('det-discs');
  DISCS.forEach(dk=>{
    const info=DC[dk];
    const df=u.discFields[dk];
    const chip=document.createElement('label');
    chip.className='disc-chip'+(df.enabled?'':' off');
    chip.style.background=info.bg;chip.style.borderColor=info.bd;chip.style.color=info.tx;
    const chk=document.createElement('input');chk.type='checkbox';chk.checked=df.enabled;
    chk.addEventListener('change',()=>{
      df.enabled=chk.checked;
      chip.classList.toggle('off',!chk.checked);
      render(); // rebuilds timeline rows; panel re-renders via detUid
      queueSave();
    });
    chip.appendChild(chk);
    chip.appendChild(document.createTextNode(info.label));
    discsEl.appendChild(chip);
  });

  // Highlight the active block
  document.querySelectorAll('.blk').forEach(el=>el.classList.toggle('active',el.dataset.uid===u.id));
}
function closeDet(){
  detUid=null;
  document.getElementById('det').className='det';
  document.querySelectorAll('.blk.active').forEach(el=>el.classList.remove('active'));
}

// Resize (project blocks and discipline fields)
window.addEventListener('mousemove',e=>{
  if(!resizing)return;
  const{type,side,uid,origOffset,origSpan}=resizing;

  if(type==='proj'){
    const areaEl=document.querySelector('.row-area[data-type="project"]');
    if(!areaEl)return;
    const r=areaEl.getBoundingClientRect();if(!r.width)return;
    const col=Math.max(0,Math.min(TOTAL_DAYS-1,Math.floor((e.clientX-r.left)/r.width*TOTAL_DAYS)));
    const uDayCol=resizing.uDayCol;
    const origStart=uDayCol+origOffset,origEnd=origStart+origSpan-1;
    let newStart,newSpan;
    if(side==='right'){newStart=origStart;newSpan=Math.max(1,col-origStart+1);}
    else{newStart=Math.min(col,origEnd);newSpan=Math.max(1,origEnd-newStart+1);}
    const u=units.find(x=>x.id===uid);if(!u)return;
    u.tlOffset=newStart-uDayCol;u.tlSpan=newSpan;
    const blkEl=document.querySelector('.blk[data-uid="'+uid+'"]');
    if(blkEl){
      const sc=Math.max(0,uDayCol+u.tlOffset),ec=Math.min(TOTAL_DAYS-1,sc+u.tlSpan-1);
      const p2=pctD(sc,ec-sc+1);blkEl.style.left=p2.l;blkEl.style.width=p2.w;
    }
  } else {
    const{dk,uCol}=resizing;
    const areaEl=document.querySelector('.row-area[data-dk="'+dk+'"]');
    if(!areaEl)return;
    const r=areaEl.getBoundingClientRect();if(!r.width)return;
    const col=Math.max(0,Math.min(TOTAL_DAYS-1,Math.floor((e.clientX-r.left)/r.width*TOTAL_DAYS)));
    const uDayCol=uCol*7;
    const origStart=uDayCol+origOffset,origEnd=origStart+origSpan-1;
    let newStart,newSpan;
    if(side==='right'){newStart=origStart;newSpan=Math.max(1,col-origStart+1);}
    else{newStart=Math.min(col,origEnd);newSpan=Math.max(1,origEnd-newStart+1);}
    const u=units.find(x=>x.id===uid);if(!u||!u.discFields)return;
    const df=u.discFields[dk];df.offset=newStart-uDayCol;df.span=newSpan;
    const dfEl=document.querySelector('.df[data-uid="'+uid+'"][data-dk="'+dk+'"]');
    if(dfEl){
      const sc=Math.max(0,uDayCol+df.offset),ec=Math.min(TOTAL_DAYS-1,sc+df.span-1);
      const p2=pctD(sc,ec-sc+1);dfEl.style.left=p2.l;dfEl.style.width=p2.w;
    }
  }
});
window.addEventListener('mouseup',()=>{if(resizing){resizing=null;saveState();render();}});

function buildPool(){
  const pool=document.getElementById('pool');pool.innerHTML='';
  const placed=new Set(units.filter(u=>u.term!=null&&u.week!=null).map(u=>u.id));
  const vis=units.filter(u=>!placed.has(u.id));
  if(!vis.length){
    const e=document.createElement('span');e.className='empty-pool';e.textContent='All units are placed.';pool.appendChild(e);return;
  }
  vis.forEach(u=>{
    const c=pal(u);
    const m=document.createElement('div');m.className='mn';m.draggable=true;m.dataset.uid=u.id;
    m.style.background=c.bg;m.style.borderColor=c.bd;m.style.color=c.tx;
    m.innerHTML=u.title+'<button class="rm">&#x2715;</button>';
    m.querySelector('.rm').onclick=e=>{
      e.stopPropagation();if(confirm('Delete "'+u.title+'"?')){units=units.filter(x=>x.id!==u.id);render();saveState();}
    };
    m.addEventListener('dragstart',e=>oDS(e,u.id));m.addEventListener('dragend',oDE);
    pool.appendChild(m);
  });
}
const poolEl=document.getElementById('pool');
poolEl.addEventListener('dragover',e=>{e.preventDefault();poolEl.classList.add('dov');});
poolEl.addEventListener('dragleave',()=>poolEl.classList.remove('dov'));
poolEl.addEventListener('drop',e=>{
  e.preventDefault();poolEl.classList.remove('dov');if(!drag)return;
  const u=units.find(x=>x.id===drag.uid);if(!u)return;
  u.term=undefined;u.week=undefined;render();saveState();
});

// Modal
function openMod(uid){
  editId=uid||null;const u=uid?units.find(x=>x.id===uid):null;
  document.getElementById('mtitle').textContent=u?'Edit block':'New unit block';
  document.getElementById('ft').value=u?u.title:'';document.getElementById('fs').value=u?(u.sub||''):'';
  document.getElementById('fsk').value=u?(u.skills||''):'';document.getElementById('fto').value=u?(u.tools||''):'';
  document.getElementById('fn').value=u?(u.notes||''):'';
  document.getElementById('savebtn').textContent=u?'Save changes':'Add block';
  selPal=u?(u.pal||0):0;
  const cg=document.getElementById('cg');cg.innerHTML='';
  PAL.forEach((c,i)=>{
    const sw=document.createElement('div');sw.className='sw'+(i===selPal?' sel':'');
    sw.style.background=c.bg;sw.style.border='2px solid '+c.bd;sw.title=c.name;
    sw.onclick=()=>{selPal=i;cg.querySelectorAll('.sw').forEach((s,j)=>s.classList.toggle('sel',j===i));};
    cg.appendChild(sw);
  });
  document.getElementById('mbg').className='modal-bg op';
  setTimeout(()=>document.getElementById('ft').focus(),100);
}
function closeMod(){document.getElementById('mbg').className='modal-bg';editId=null;}
document.getElementById('mbg').addEventListener('click',e=>{if(e.target===e.currentTarget)closeMod();});
document.getElementById('cancelbtn').addEventListener('click',closeMod);
document.getElementById('newbtn').addEventListener('click',()=>openMod());
document.getElementById('savebtn').addEventListener('click',()=>{
  const title=document.getElementById('ft').value.trim();if(!title){document.getElementById('ft').focus();return;}
  const data={title,sub:document.getElementById('fs').value.trim(),skills:document.getElementById('fsk').value.trim(),
    tools:document.getElementById('fto').value.trim(),notes:document.getElementById('fn').value.trim(),
    disc:DISCS,pal:selPal};
  if(editId){const u=units.find(x=>x.id===editId);if(u){Object.assign(u,data);if(detUid===u.id)showDet(u);}}
  else units.push({id:'u'+(++nid),...data,term:undefined,week:undefined});
  closeMod();render();saveState();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMod();closeDet();}});

// Populate week datalist for date inputs
(function(){const dl=document.getElementById('tl-weeks');if(dl)DAY_WEEK.forEach(w=>{const o=document.createElement('option');o.value=w;dl.appendChild(o);});})();

(async function init(){
  try{const r=await fetch('/api/state');if(r.ok){const d=await r.json();if(d&&d.units){units=d.units;nid=d.nid||200;lastVersion=d.v||null;}}}catch(_){}
  render();
  try{
    const cfg=await(await fetch('/api/config')).json();if(!cfg.key)return;
    const pusher=new Pusher(cfg.key,{cluster:cfg.cluster});
    const ch=pusher.subscribe('curriculum-board');
    ch.bind('state-update',function(data){
      if(data&&data.units&&data.v!==lastVersion){units=data.units;nid=data.nid||200;lastVersion=data.v;render();}
    });
  }catch(e){console.error('[timeline]',e.message);}
})();
</script>
</body>
</html>`;
