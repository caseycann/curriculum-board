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
.toolbar{background:#fff;border-bottom:1px solid #E5E3DE;padding:10px 24px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;position:sticky;top:0;z-index:100}
button{font-size:11px;padding:5px 12px;border:1px solid #D5D3CE;background:#fff;border-radius:6px;cursor:pointer;color:#333;transition:all .12s;font-family:inherit}
button:hover{background:#F0EEE9;border-color:#bbb}
button.add{background:#2A6B45;color:#fff;border-color:#2A6B45;font-weight:600}
button.add:hover{background:#1d4f31}
.main{padding:20px 24px}
.tl-wrap{overflow-x:auto;padding-bottom:8px;min-width:0}
.tl-table{min-width:900px;width:100%}
.hdr-row{display:flex;height:22px}
.hdr-lbl{width:70px;flex-shrink:0}
.hdr-area{flex:1;display:flex}
.term-hdr{display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;border-radius:4px 4px 0 0}
.week-hdr{flex:1;font-size:7.5px;font-weight:600;color:#888;text-align:center;display:flex;align-items:center;justify-content:center;border-left:1px solid rgba(0,0,0,.04)}
.data-row{display:flex;border-bottom:1px solid #ECEAE6}
.row-lbl{width:70px;flex-shrink:0;padding:6px 6px 6px 0;display:flex;align-items:flex-start;font-size:8.5px;font-weight:600;color:#666;line-height:1.3;word-break:break-word;padding-top:10px}
.row-lbl.proj{color:#4a30a0;font-size:9px}
.row-area{flex:1;position:relative;min-height:60px}
.band{position:absolute;top:0;bottom:0;pointer-events:none}
.wline{position:absolute;top:0;bottom:0;width:1px;background:rgba(0,0,0,.04);pointer-events:none}
.tline{position:absolute;top:0;bottom:0;width:2px;background:rgba(0,0,0,.09);pointer-events:none}
.proj-drop{position:absolute;top:0;bottom:0;left:0;right:0}
.proj-drop.dov{background:rgba(46,117,182,.08)}
.blk{position:absolute;top:5px;border-radius:6px;padding:5px 18px 5px 7px;border-width:1.5px;border-style:solid;cursor:grab;user-select:none;box-shadow:0 1px 3px rgba(0,0,0,.07);transition:opacity .1s;min-height:50px}
.blk:active{cursor:grabbing}.blk.drag{opacity:.3}
.bt{font-size:9.5px;font-weight:600;line-height:1.3}
.bs{font-size:8px;opacity:.7;margin-top:2px;line-height:1.2}
.rm{position:absolute;top:3px;right:3px;width:14px;height:14px;border-radius:50%;border:none;cursor:pointer;font-size:8px;display:flex;align-items:center;justify-content:center;opacity:0;background:rgba(0,0,0,.2);color:#fff;padding:0;line-height:1}
.blk:hover .rm{opacity:1}
.df{position:absolute;top:4px;bottom:4px;border-radius:6px;border-width:1.5px;border-style:solid;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.df-hdr{display:flex;align-items:center;gap:4px;padding:3px 14px 3px 12px;flex-shrink:0}
.df-hdr input[type=checkbox]{width:10px;height:10px;cursor:pointer;flex-shrink:0;accent-color:#1F3864}
.df-hdr label{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.df-body{flex:1;padding:0 6px 4px;display:flex;min-height:0}
.df-body.hidden{display:none}
.df textarea{flex:1;font-size:9.5px;border:1px solid rgba(0,0,0,.12);border-radius:4px;padding:3px 4px;resize:none;font-family:inherit;background:rgba(255,255,255,.7);line-height:1.4;width:100%;color:#333;min-height:0}
.df textarea:focus{outline:none;border-color:#2E75B6;background:#fff}
.lh,.rh{position:absolute;top:0;bottom:0;width:8px;cursor:ew-resize;z-index:5;display:flex;align-items:center;justify-content:center}
.lh{left:0}.rh{right:0}
.lh::after,.rh::after{content:'';width:2px;height:16px;background:rgba(0,0,0,.25);border-radius:1px}
.lh:hover::after,.rh:hover::after{background:rgba(0,0,0,.5)}
.pool-section{margin-top:20px;padding-top:16px;border-top:1px solid #E5E3DE}
.pool-label{font-size:12px;font-weight:600;color:#555;margin-bottom:8px}
.pool{display:flex;flex-wrap:wrap;gap:6px;min-height:48px;padding:8px;border-radius:8px;border:1.5px dashed #C5C3BE;background:#F0EEE9}
.pool.dov{border-color:#2E75B6;background:#E6F1FB;border-style:solid}
.mn{padding:5px 10px;border-radius:5px;cursor:grab;font-size:10px;font-weight:600;white-space:nowrap;user-select:none;border-width:1.5px;border-style:solid;box-shadow:0 1px 3px rgba(0,0,0,.06);position:relative;transition:opacity .1s}
.mn:active{cursor:grabbing;opacity:.8}.mn.drag{opacity:.3}
.mn .rm{opacity:0}.mn:hover .rm{opacity:1}
.empty-pool{font-size:11px;color:#aaa;font-style:italic;padding:4px}
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(2px)}
.modal-bg.op{display:flex}
.modal{background:#fff;border-radius:14px;padding:24px;width:360px;max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,.18)}
.modal h3{font-size:16px;font-weight:700;margin-bottom:16px;color:#1F3864}
.fr{margin-bottom:12px}
.fr label{display:block;font-size:11px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
.fr input,.fr textarea,.fr select{width:100%;font-size:12px;padding:7px 10px;border:1px solid #D5D3CE;border-radius:7px;background:#FAFAF8;color:#222;font-family:inherit;transition:border-color .12s}
.fr input:focus,.fr textarea:focus{outline:none;border-color:#2E75B6;background:#fff}
.fr textarea{height:56px;resize:vertical}
.cg{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:6px}
.sw{aspect-ratio:1;border-radius:6px;cursor:pointer;transition:transform .1s,box-shadow .1s;position:relative}
.sw:hover{transform:scale(1.08)}
.sw.sel::after{content:'\\2713';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:rgba(0,0,0,.5)}
.sw.sel{box-shadow:0 0 0 2.5px #1F3864,0 0 0 4px #fff inset}
.dtags{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px}
.dtag{padding:4px 9px;border-radius:5px;font-size:10.5px;cursor:pointer;border:1.5px solid #D5D3CE;background:#F5F3EF;color:#555;transition:all .1s;font-weight:500}
.dtag.sel{font-weight:700}
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
  <div class="pool-section">
    <div class="pool-label">Unplaced units &mdash; drag onto the Project row above</div>
    <div class="pool" id="pool"></div>
  </div>
</div>
<div class="modal-bg" id="mbg">
  <div class="modal">
    <h3 id="mtitle">New unit block</h3>
    <div class="fr"><label>Title *</label><input id="ft" type="text" placeholder="e.g. Mesopotamia Rap"></div>
    <div class="fr"><label>Subtitle</label><input id="fs" type="text" placeholder="e.g. 3-week flagship unit"></div>
    <div class="fr"><label>Skills</label><input id="fsk" type="text" placeholder="e.g. Audio editing, collaboration"></div>
    <div class="fr"><label>Tools</label><input id="fto" type="text" placeholder="e.g. SoundTrap, Adobe Express"></div>
    <div class="fr"><label>Notes</label><textarea id="fn" placeholder="Block schedule, co-teachers, logistics..."></textarea></div>
    <div class="fr"><label>Disciplines</label><div class="dtags" id="dtags"></div></div>
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
let nid=200,drag=null,lastVersion=null,resizing=null;
let editId=null,selPal=0,selDiscs=[];

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
function pct(col,span){span=span||1;return{l:(col/TOTAL*100)+'%',w:(span/TOTAL*100)+'%'};}
function ensureDF(u){
  if(!u.discFields)u.discFields={};
  DISCS.forEach(dk=>{
    if(!u.discFields[dk])u.discFields[dk]={enabled:!!(u.disc&&u.disc.includes(dk)),notes:'',offset:0,span:1};
  });
}
function dfPos(u,dk){
  const df=u.discFields[dk],uCol=colOf(u);
  const sc=Math.max(0,uCol+(df.offset||0));
  const ec=Math.min(TOTAL-1,sc+(df.span||1)-1);
  return{sc,ec,span:ec-sc+1};
}

function buildBg(el){
  let off=0;
  TERMS.forEach((t,ti)=>{
    const w=t.weeks.length;
    const b=document.createElement('div');b.className='band';
    b.style.left=(off/TOTAL*100)+'%';b.style.width=(w/TOTAL*100)+'%';b.style.background=t.light;
    el.appendChild(b);
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

function render(){buildTimeline();buildPool();}

function buildTimeline(){
  const tl=document.getElementById('tl');tl.innerHTML='';

  // Term header
  const th=document.createElement('div');th.className='hdr-row';
  const thl=document.createElement('div');thl.className='hdr-lbl';th.appendChild(thl);
  const tha=document.createElement('div');tha.className='hdr-area';
  TERMS.forEach(t=>{
    const d=document.createElement('div');d.className='term-hdr';d.style.flex=t.weeks.length;
    d.style.color=t.color;d.style.background=t.light;d.textContent=t.label;tha.appendChild(d);
  });
  th.appendChild(tha);tl.appendChild(th);

  // Week header
  const wh=document.createElement('div');wh.className='hdr-row';
  const whl=document.createElement('div');whl.className='hdr-lbl';wh.appendChild(whl);
  const wha=document.createElement('div');wha.className='hdr-area';
  TERMS.forEach(t=>t.weeks.forEach(w=>{
    const d=document.createElement('div');d.className='week-hdr';d.textContent=w;wha.appendChild(d);
  }));
  wh.appendChild(wha);tl.appendChild(wh);

  // Project row
  const pr=document.createElement('div');pr.className='data-row';
  const prl=document.createElement('div');prl.className='row-lbl proj';prl.textContent='Project';pr.appendChild(prl);
  const pra=document.createElement('div');pra.className='row-area';pra.style.minHeight='70px';
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
    const col=colOf(u),c=pal(u),p2=pct(col);
    const blk=document.createElement('div');
    blk.className='blk';blk.draggable=true;blk.dataset.uid=u.id;
    blk.style.left=p2.l;blk.style.width=p2.w;blk.style.background=c.bg;blk.style.borderColor=c.bd;
    blk.innerHTML='<div class="bt" style="color:'+c.tx+'">'+u.title+'</div><div class="bs" style="color:'+c.tx+'">'+u.sub+'</div><button class="rm">&#x2715;</button>';
    blk.querySelector('.rm').onclick=e=>{e.stopPropagation();u.term=undefined;u.week=undefined;render();saveState();};
    blk.addEventListener('dragstart',e=>oDS(e,u.id));blk.addEventListener('dragend',oDE);
    pra.appendChild(blk);
  });
  pr.appendChild(pra);tl.appendChild(pr);

  // Discipline rows
  DISCS.forEach(dk=>{
    const info=DC[dk];
    const row=document.createElement('div');row.className='data-row';
    const lbl=document.createElement('div');lbl.className='row-lbl';
    lbl.innerHTML='<span style="color:'+info.bd+'">'+info.label+'</span>';
    row.appendChild(lbl);
    const area=document.createElement('div');area.className='row-area';area.style.minHeight='80px';
    area.dataset.dk=dk; // key: lets resize find fresh reference by data-dk
    buildBg(area);

    units.forEach(u=>{
      if(u.term==null||u.week==null)return;
      ensureDF(u);
      const df=u.discFields[dk],uCol=colOf(u),pos=dfPos(u,dk),p2=pct(pos.sc,pos.span);
      const wrap=document.createElement('div');
      wrap.className='df';
      wrap.dataset.uid=u.id; // key: lets resize update position directly
      wrap.dataset.dk=dk;
      wrap.style.left=p2.l;wrap.style.width=p2.w;wrap.style.background=info.bg;wrap.style.borderColor=info.bd;

      const lh=document.createElement('div');lh.className='lh';
      lh.addEventListener('mousedown',e=>{
        e.preventDefault();e.stopPropagation();
        resizing={side:'left',uid:u.id,dk,uCol,origOffset:df.offset||0,origSpan:df.span||1};
      });
      wrap.appendChild(lh);

      const hdr=document.createElement('div');hdr.className='df-hdr';
      const chk=document.createElement('input');chk.type='checkbox';chk.checked=df.enabled;
      const cbId='cb-'+u.id+'-'+dk;chk.id=cbId;
      chk.addEventListener('change',()=>{df.enabled=chk.checked;render();queueSave();});
      const lbl2=document.createElement('label');lbl2.htmlFor=cbId;lbl2.textContent=info.label;lbl2.style.color=info.tx;
      hdr.appendChild(chk);hdr.appendChild(lbl2);wrap.appendChild(hdr);

      const body=document.createElement('div');body.className='df-body'+(df.enabled?'':' hidden');
      const ta=document.createElement('textarea');
      ta.placeholder='Notes for '+info.label+'...';ta.value=df.notes||'';ta.style.color=info.tx;
      ta.addEventListener('input',()=>{df.notes=ta.value;});ta.addEventListener('blur',()=>queueSave());
      body.appendChild(ta);wrap.appendChild(body);

      const rh=document.createElement('div');rh.className='rh';
      rh.addEventListener('mousedown',e=>{
        e.preventDefault();e.stopPropagation();
        resizing={side:'right',uid:u.id,dk,uCol,origOffset:df.offset||0,origSpan:df.span||1};
      });
      wrap.appendChild(rh);
      area.appendChild(wrap);
    });
    row.appendChild(area);tl.appendChild(row);
  });
}

// Resize: use fresh DOM lookup each mousemove to avoid stale-reference bug
window.addEventListener('mousemove',e=>{
  if(!resizing)return;
  const{side,uid,dk,uCol,origOffset,origSpan}=resizing;
  const areaEl=document.querySelector('.row-area[data-dk="'+dk+'"]');
  if(!areaEl)return;
  const r=areaEl.getBoundingClientRect();
  if(!r.width)return;
  const col=Math.max(0,Math.min(TOTAL-1,Math.floor((e.clientX-r.left)/r.width*TOTAL)));
  const origStart=uCol+origOffset,origEnd=origStart+origSpan-1;
  let newStart,newSpan;
  if(side==='right'){
    newStart=origStart;newSpan=Math.max(1,col-origStart+1);
  }else{
    newStart=Math.min(col,origEnd);newSpan=Math.max(1,origEnd-newStart+1);
  }
  const u=units.find(x=>x.id===uid);if(!u||!u.discFields)return;
  const df=u.discFields[dk];df.offset=newStart-uCol;df.span=newSpan;
  // Update element position directly — no full render() during drag
  const dfEl=document.querySelector('.df[data-uid="'+uid+'"][data-dk="'+dk+'"]');
  if(dfEl){
    const sc=Math.max(0,uCol+df.offset),ec=Math.min(TOTAL-1,sc+df.span-1);
    const p2=pct(sc,ec-sc+1);dfEl.style.left=p2.l;dfEl.style.width=p2.w;
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
  document.getElementById('ft').value=u?u.title:'';document.getElementById('fs').value=u?u.sub:'';
  document.getElementById('fsk').value=u?u.skills:'';document.getElementById('fto').value=u?u.tools:'';
  document.getElementById('fn').value=u?u.notes:'';
  document.getElementById('savebtn').textContent=u?'Save changes':'Add block';
  selPal=u?(u.pal||0):0;selDiscs=u?[...u.disc]:[];
  const dt=document.getElementById('dtags');dt.innerHTML='';
  Object.entries(DC).forEach(([k,v])=>{
    const tag=document.createElement('div');const sel=selDiscs.includes(k);
    tag.className='dtag'+(sel?' sel':'');tag.textContent=v.label;
    if(sel){tag.style.background=v.bg;tag.style.borderColor=v.bd;tag.style.color=v.tx;}
    tag.onclick=()=>{selDiscs=selDiscs.includes(k)?selDiscs.filter(d=>d!==k):[...selDiscs,k];openMod(editId);};
    dt.appendChild(tag);
  });
  const cg=document.getElementById('cg');cg.innerHTML='';
  PAL.forEach((c,i)=>{
    const sw=document.createElement('div');sw.className='sw'+(i===selPal?' sel':'');
    sw.style.background=c.bg;sw.style.border='2px solid '+c.bd;sw.title=c.name;
    sw.onclick=()=>{selPal=i;openMod(editId);};cg.appendChild(sw);
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
    disc:selDiscs.length?selDiscs:["CL"],pal:selPal};
  if(editId){const u=units.find(x=>x.id===editId);if(u)Object.assign(u,data);}
  else units.push({id:'u'+(++nid),...data,term:undefined,week:undefined});
  closeMod();render();saveState();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMod();});

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
