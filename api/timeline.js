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
.back{color:rgba(255,255,255,.7);text-decoration:none;font-size:12px}
.back:hover{color:#fff}
.main{padding:20px 24px}
.tl-wrap{overflow-x:auto;padding-bottom:8px;min-width:0}
.tl-table{min-width:900px;width:100%}

/* Header rows */
.hdr-row{display:flex;height:22px}
.hdr-lbl{width:70px;flex-shrink:0}
.hdr-area{flex:1;display:flex}
.term-hdr{display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;border-radius:4px 4px 0 0}
.week-hdr{flex:1;font-size:7.5px;font-weight:600;color:#888;text-align:center;display:flex;align-items:center;justify-content:center;border-left:1px solid rgba(0,0,0,.04)}

/* Data rows */
.data-row{display:flex;border-bottom:1px solid #ECEAE6}
.row-lbl{width:70px;flex-shrink:0;padding:6px 6px 6px 0;display:flex;align-items:flex-start;font-size:8.5px;font-weight:600;color:#666;line-height:1.3;word-break:break-word;padding-top:10px}
.row-lbl.proj{color:#4a30a0;font-size:9px}
.row-area{flex:1;position:relative;min-height:60px}

/* term bands */
.band{position:absolute;top:0;bottom:0;pointer-events:none}
.wline{position:absolute;top:0;bottom:0;width:1px;background:rgba(0,0,0,.04);pointer-events:none}
.tline{position:absolute;top:0;bottom:0;width:2px;background:rgba(0,0,0,.09);pointer-events:none}

/* Drop zone (project row) */
.proj-drop{position:absolute;top:0;bottom:0;left:0;right:0}
.proj-drop.dov{background:rgba(46,117,182,.08)}

/* Block in project row */
.blk{position:absolute;top:5px;border-radius:6px;padding:5px 18px 5px 7px;border-width:1.5px;border-style:solid;cursor:grab;user-select:none;box-shadow:0 1px 3px rgba(0,0,0,.07);transition:opacity .1s;min-height:50px}
.blk:active{cursor:grabbing}
.blk.drag{opacity:.3}
.bt{font-size:9.5px;font-weight:600;line-height:1.3}
.bs{font-size:8px;opacity:.7;margin-top:2px;line-height:1.2}
.rm{position:absolute;top:3px;right:3px;width:14px;height:14px;border-radius:50%;border:none;cursor:pointer;font-size:8px;display:flex;align-items:center;justify-content:center;opacity:0;background:rgba(0,0,0,.2);color:#fff;padding:0;line-height:1}
.blk:hover .rm{opacity:1}

/* Discipline field */
.df{position:absolute;top:4px;bottom:4px;border-radius:6px;border-width:1.5px;border-style:solid;display:flex;flex-direction:column;overflow:hidden;min-width:0}
.df-hdr{display:flex;align-items:center;gap:4px;padding:3px 18px 3px 6px;flex-shrink:0}
.df-hdr input[type=checkbox]{width:10px;height:10px;cursor:pointer;flex-shrink:0;accent-color:#1F3864}
.df-hdr label{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.df-body{flex:1;padding:0 6px 4px;display:flex;min-height:0}
.df-body.hidden{display:none}
.df textarea{flex:1;font-size:9.5px;border:1px solid rgba(0,0,0,.12);border-radius:4px;padding:3px 4px;resize:none;font-family:inherit;background:rgba(255,255,255,.7);line-height:1.4;width:100%;color:#333;min-height:0}
.df textarea:focus{outline:none;border-color:#2E75B6;background:#fff}
/* resize handles */
.lh,.rh{position:absolute;top:0;bottom:0;width:6px;cursor:ew-resize;z-index:5;display:flex;align-items:center;justify-content:center}
.lh{left:0;border-radius:6px 0 0 6px}
.rh{right:0;border-radius:0 6px 6px 0}
.lh::after,.rh::after{content:'';width:2px;height:16px;background:rgba(0,0,0,.2);border-radius:1px}
.lh:hover::after,.rh:hover::after{background:rgba(0,0,0,.45)}

/* Pool */
.pool-section{margin-top:20px;padding-top:16px;border-top:1px solid #E5E3DE}
.pool-label{font-size:12px;font-weight:600;color:#555;margin-bottom:8px}
.pool{display:flex;flex-wrap:wrap;gap:6px;min-height:48px;padding:8px;border-radius:8px;border:1.5px dashed #C5C3BE;background:#F0EEE9}
.pool.dov{border-color:#2E75B6;background:#E6F1FB;border-style:solid}
.mn{padding:5px 10px;border-radius:5px;cursor:grab;font-size:10px;font-weight:600;white-space:nowrap;user-select:none;border-width:1.5px;border-style:solid;box-shadow:0 1px 3px rgba(0,0,0,.06);position:relative;transition:opacity .1s}
.mn:active{cursor:grabbing;opacity:.8}
.mn.drag{opacity:.3}
.mn .rm{opacity:0}
.mn:hover .rm{opacity:1}
.empty-pool{font-size:11px;color:#aaa;font-style:italic;padding:4px}
</style>
</head>
<body>
<header>
  <h1>5th Grade &middot; Curriculum Timeline</h1>
  <a class="back" href="/">&#8592; Planning Board</a>
</header>

<div class="main">
  <div class="tl-wrap">
    <div class="tl-table" id="tl"></div>
  </div>
  <div class="pool-section">
    <div class="pool-label">Unplaced units &mdash; drag onto the Project row above</div>
    <div class="pool" id="pool"></div>
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
  {bg:"#EEEDFE",bd:"#534AB7",tx:"#3C3489"},{bg:"#E1F5EE",bd:"#0F6E56",tx:"#085041"},
  {bg:"#FAECE7",bd:"#993C1D",tx:"#712B13"},{bg:"#FAEEDA",bd:"#854F0B",tx:"#633806"},
  {bg:"#F0EEE9",bd:"#5F5E5A",tx:"#333"},{bg:"#E6EFF9",bd:"#1F3864",tx:"#0C2D5E"},
  {bg:"#E4F2EC",bd:"#2A6B45",tx:"#1a4a2e"},{bg:"#FBEAF0",bd:"#993556",tx:"#72243E"},
  {bg:"#FEECEC",bd:"#A32D2D",tx:"#791F1F"},{bg:"#F2EAFF",bd:"#7030A0",tx:"#4B0082"},
  {bg:"#E0F7FA",bd:"#0097A7",tx:"#006064"},{bg:"#FFFDE7",bd:"#C8960C",tx:"#5D4037"},
  {bg:"#FCE4F3",bd:"#C2185B",tx:"#880E4F"},{bg:"#E8EAF6",bd:"#3949AB",tx:"#1A237E"},
  {bg:"#E8F5E9",bd:"#388E3C",tx:"#1B5E20"},{bg:"#FFF3E0",bd:"#E65100",tx:"#bf360c"},
  {bg:"#ECEFF1",bd:"#546E7A",tx:"#263238"},{bg:"#F3E5F5",bd:"#7B1FA2",tx:"#4A148C"},
];
const ORIG=[
  {id:"u1",title:"Poster Mosaic",sub:"Adobe Express",disc:["VA","CDL"],tools:"Adobe Express",skills:"Visual Design, Composition",notes:"B Block · Emmett",term:0,week:4,pal:0},
  {id:"u2",title:"Recipe Book",sub:"3-week project",disc:["VA","CDL","CL"],tools:"Adobe Express, Google Docs",skills:"Graphic Design, Expository Writing",notes:"B Block",term:0,week:6,pal:5},
  {id:"u3",title:"Wrinkled World",sub:"Laser cut boards",disc:["VA","CDL"],tools:"CDL laser cutter",skills:"Geography, 3D Design",notes:"A Block · Luke/Casey",term:0,week:7,pal:0},
  {id:"u4",title:"Future Self Voicemail",sub:"Audio recording",disc:["MU","DR","CDL"],tools:"SoundTrap",skills:"Audio Editing, Performance",notes:"~1 week",term:0,week:8,pal:1},
  {id:"u5",title:"Great Listen Podcast",sub:"Interview + cover art",disc:["MU","DR","VA","CDL"],tools:"SoundTrap, Adobe Express",skills:"Interviewing, Audio, Visual",notes:"Flagship integration unit",term:1,week:0,pal:2},
  {id:"u6",title:"Mesopotamia Rap",sub:"Flagship unit",disc:["MU","VA","CDL","CL"],tools:"SoundTrap, CDL",skills:"Music Production, SS",notes:"All disciplines · flagship",term:1,week:1,pal:6},
  {id:"u7",title:"Holiday Ornaments",sub:"3D design",disc:["VA","CDL"],tools:"CDL",skills:"Visual Art, 3D Design",notes:"December",term:1,week:2,pal:0},
  {id:"u8",title:"Declamations",sub:"Spoken word performance",disc:["DR","MU","VA"],tools:"CDL recording",skills:"Performance, Voice",notes:"Public performance event",term:1,week:3,pal:2},
  {id:"u9",title:"Visual Art Collab",sub:"Book club tie-in",disc:["VA","CL"],tools:"Various",skills:"Visual Art, Collaboration",notes:"January · Art class",term:1,week:4,pal:0},
  {id:"u10",title:"Ancient Egypt",sub:"Essays + art",disc:["VA","DR","MU","CDL"],tools:"CDL",skills:"SS, Research, Art",notes:"Laser-cut artifacts",term:1,week:7,pal:3},
  {id:"u11",title:"Esperanza Rising",sub:"Reader's theatre",disc:["DR","MU","VA"],tools:"Various",skills:"Performance, Literature",notes:"ERPG unit",term:1,week:7,pal:2},
  {id:"u12",title:"World Peace Project",sub:"Collaborative art",disc:["CL","VA"],tools:"Various",skills:"Global Studies, Art",notes:"Term 3 opener",term:2,week:0,pal:4},
  {id:"u13",title:"India + Mohenjedaro",sub:"Shadow puppets + dig",disc:["VA","DR","MU","CDL"],tools:"CDL, various",skills:"Geography, Ancient India",notes:"Coordinate art + dig roleplay",term:2,week:1,pal:3},
  {id:"u14",title:"World Religion: Hinduism",sub:"Flagship unit",disc:["VA","MU","DR","CDL"],tools:"CDL, SoundTrap",skills:"Mandala, Bhajan, Drama",notes:"Flagship — all disciplines",term:2,week:3,pal:9},
  {id:"u15",title:"World Religion: Buddhism",sub:"Silhouette + prayer card",disc:["VA","MU","DR","CDL"],tools:"CDL, various",skills:"Art, Music, Drama",notes:"Diwali sun catcher",term:2,week:5,pal:1},
  {id:"u16",title:"Board Games",sub:"Design + prototype",disc:["VA","DR","MU","CDL"],tools:"CDL",skills:"Game Design, Narrative",notes:"Showcase event for families",term:2,week:7,pal:6},
  {id:"u17",title:"End of Year Showcase",sub:"Culminating event",disc:["VA","MU","DR","CDL","CL"],tools:"All",skills:"All disciplines",notes:"Family showcase event",term:2,week:8,pal:7},
];

let units=ORIG.map(u=>({...u}));
let nid=200,drag=null,lastVersion=null,resizing=null;

// ── helpers ─────────────────────────────────────────────────────────
function pal(u){return PAL[u.pal||0];}
function colOf(u){
  if(u.term==null||u.week==null)return null;
  let c=0;for(let i=0;i<u.term;i++)c+=TERMS[i].weeks.length;
  return c+u.week;
}
function colToTW(col){
  let r=col;
  for(let i=0;i<TERMS.length;i++){
    if(r<TERMS[i].weeks.length)return{term:i,week:r};
    r-=TERMS[i].weeks.length;
  }
  return null;
}
function pct(col,span=1){return{l:(col/TOTAL*100)+'%',w:(span/TOTAL*100)+'%'};}
function ensureDF(u){
  if(!u.discFields)u.discFields={};
  DISCS.forEach(dk=>{
    if(!u.discFields[dk])u.discFields[dk]={
      enabled:!!(u.disc&&u.disc.includes(dk)),
      notes:'',offset:0,span:1
    };
  });
}

// ── area background ──────────────────────────────────────────────────
function buildBg(el){
  let off=0;
  TERMS.forEach((t,ti)=>{
    const w=t.weeks.length;
    const b=document.createElement('div');
    b.className='band';
    b.style.left=(off/TOTAL*100)+'%';
    b.style.width=(w/TOTAL*100)+'%';
    b.style.background=t.light;
    el.appendChild(b);
    for(let wi=1;wi<w;wi++){
      const l=document.createElement('div');
      l.className='wline';
      l.style.left=((off+wi)/TOTAL*100)+'%';
      el.appendChild(l);
    }
    if(ti>0){
      const tl=document.createElement('div');
      tl.className='tline';
      tl.style.left=(off/TOTAL*100)+'%';
      el.appendChild(tl);
    }
    off+=w;
  });
}

// ── save / load ──────────────────────────────────────────────────────
let saveTimer=null;
async function saveState(){
  const v=Date.now();
  try{
    await fetch('/api/state',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({units,nid,v})});
    lastVersion=v;
  }catch(_){}
}
function queueSave(){clearTimeout(saveTimer);saveTimer=setTimeout(saveState,400);}

// ── drag & drop ──────────────────────────────────────────────────────
function oDS(e,uid,fromPool){
  drag={uid,fromPool};
  e.dataTransfer.effectAllowed='move';
  setTimeout(()=>document.querySelectorAll('[data-uid="'+uid+'"]').forEach(el=>el.classList.add('drag')),0);
}
function oDE(){document.querySelectorAll('.drag').forEach(el=>el.classList.remove('drag'));drag=null;}

function getDropCol(e,areaEl){
  const r=areaEl.getBoundingClientRect();
  const pctX=(e.clientX-r.left)/r.width;
  return Math.max(0,Math.min(TOTAL-1,Math.floor(pctX*TOTAL)));
}

// ── render ───────────────────────────────────────────────────────────
function render(){
  buildTimeline();
  buildPool();
}

function buildTimeline(){
  const tl=document.getElementById('tl');
  tl.innerHTML='';

  // Term header
  const th=document.createElement('div');th.className='hdr-row';
  const thl=document.createElement('div');thl.className='hdr-lbl';th.appendChild(thl);
  const tha=document.createElement('div');tha.className='hdr-area';th.appendChild(tha);
  TERMS.forEach(t=>{
    const d=document.createElement('div');
    d.className='term-hdr';
    d.style.flex=t.weeks.length;
    d.style.color=t.color;
    d.style.background=t.light;
    d.textContent=t.label;
    tha.appendChild(d);
  });
  tl.appendChild(th);

  // Week header
  const wh=document.createElement('div');wh.className='hdr-row';
  const whl=document.createElement('div');whl.className='hdr-lbl';wh.appendChild(whl);
  const wha=document.createElement('div');wha.className='hdr-area';wh.appendChild(wha);
  TERMS.forEach(t=>t.weeks.forEach(w=>{
    const d=document.createElement('div');d.className='week-hdr';d.textContent=w;wha.appendChild(d);
  }));
  tl.appendChild(wh);

  // Project row
  const pr=document.createElement('div');pr.className='data-row';
  const prl=document.createElement('div');prl.className='row-lbl proj';prl.textContent='Project';pr.appendChild(prl);
  const pra=document.createElement('div');pra.className='row-area';pra.style.minHeight='70px';
  buildBg(pra);

  // drop zone
  const dz=document.createElement('div');dz.className='proj-drop';
  dz.addEventListener('dragover',e=>{e.preventDefault();dz.classList.add('dov');});
  dz.addEventListener('dragleave',()=>dz.classList.remove('dov'));
  dz.addEventListener('drop',e=>{
    e.preventDefault();dz.classList.remove('dov');
    if(!drag)return;
    const col=getDropCol(e,pra);
    const tw=colToTW(col);if(!tw)return;
    const u=units.find(x=>x.id===drag.uid);if(!u)return;
    u.term=tw.term;u.week=tw.week;
    ensureDF(u);
    render();saveState();
  });
  pra.appendChild(dz);

  // blocks
  units.forEach(u=>{
    if(u.term==null||u.week==null)return;
    const col=colOf(u);
    const c=pal(u);
    const p2=pct(col);
    const blk=document.createElement('div');
    blk.className='blk';blk.draggable=true;blk.dataset.uid=u.id;
    blk.style.left=p2.l;blk.style.width=p2.w;
    blk.style.background=c.bg;blk.style.borderColor=c.bd;
    blk.innerHTML='<div class="bt" style="color:'+c.tx+'">'+u.title+'</div>'
      +'<div class="bs" style="color:'+c.tx+'">'+u.sub+'</div>'
      +'<button class="rm" title="Remove">✕</button>';
    blk.querySelector('.rm').onclick=e=>{
      e.stopPropagation();
      u.term=undefined;u.week=undefined;
      render();saveState();
    };
    blk.addEventListener('dragstart',e=>oDS(e,u.id,false));
    blk.addEventListener('dragend',oDE);
    pra.appendChild(blk);
  });
  pr.appendChild(pra);
  tl.appendChild(pr);

  // Discipline rows
  DISCS.forEach(dk=>{
    const info=DC[dk];
    const row=document.createElement('div');row.className='data-row';
    const lbl=document.createElement('div');
    lbl.className='row-lbl';
    lbl.innerHTML='<span style="color:'+info.bd+'">'+info.label+'</span>';
    row.appendChild(lbl);

    const area=document.createElement('div');
    area.className='row-area';area.style.minHeight='80px';
    buildBg(area);

    // fields for each placed unit
    units.forEach(u=>{
      if(u.term==null||u.week==null)return;
      ensureDF(u);
      const df=u.discFields[dk];
      const uCol=colOf(u);
      const startCol=Math.max(0,uCol+(df.offset||0));
      const span=Math.max(1,df.span||1);
      const endCol=Math.min(TOTAL-1,startCol+span-1);
      const p2=pct(startCol,endCol-startCol+1);

      const wrap=document.createElement('div');
      wrap.className='df';
      wrap.style.left=p2.l;wrap.style.width=p2.w;
      wrap.style.background=info.bg;wrap.style.borderColor=info.bd;

      // left handle
      const lh=document.createElement('div');lh.className='lh';
      lh.addEventListener('mousedown',e=>startResize(e,'left',u,dk,uCol,area));
      wrap.appendChild(lh);

      // header with checkbox
      const hdr=document.createElement('div');hdr.className='df-hdr';
      const chk=document.createElement('input');chk.type='checkbox';chk.checked=df.enabled;
      const cbId='cb-'+u.id+'-'+dk;chk.id=cbId;
      chk.addEventListener('change',()=>{df.enabled=chk.checked;render();queueSave();});
      const lbl2=document.createElement('label');lbl2.htmlFor=cbId;
      lbl2.textContent=info.label;lbl2.style.color=info.tx;
      hdr.appendChild(chk);hdr.appendChild(lbl2);
      wrap.appendChild(hdr);

      // body with textarea
      const body=document.createElement('div');
      body.className='df-body'+(df.enabled?'':' hidden');
      const ta=document.createElement('textarea');
      ta.placeholder='Notes for '+info.label+'...';
      ta.value=df.notes||'';
      ta.style.color=info.tx;
      ta.addEventListener('input',()=>{df.notes=ta.value;});
      ta.addEventListener('blur',()=>queueSave());
      body.appendChild(ta);
      wrap.appendChild(body);

      // right handle
      const rh=document.createElement('div');rh.className='rh';
      rh.addEventListener('mousedown',e=>startResize(e,'right',u,dk,uCol,area));
      wrap.appendChild(rh);

      area.appendChild(wrap);
    });

    row.appendChild(area);
    tl.appendChild(row);
  });
}

// ── resize ───────────────────────────────────────────────────────────
function startResize(e,side,u,dk,uCol,areaEl){
  e.preventDefault();e.stopPropagation();
  const df=u.discFields[dk];
  resizing={side,u,dk,uCol,areaEl,origOffset:df.offset||0,origSpan:df.span||1};
}
window.addEventListener('mousemove',e=>{
  if(!resizing)return;
  const{side,u,dk,uCol,areaEl,origOffset,origSpan}=resizing;
  const r=areaEl.getBoundingClientRect();
  const col=Math.max(0,Math.min(TOTAL-1,Math.floor((e.clientX-r.left)/r.width*TOTAL)));
  const df=u.discFields[dk];
  const origStart=uCol+origOffset;
  const origEnd=origStart+origSpan-1;
  if(side==='right'){
    df.span=Math.max(1,col-origStart+1);
  }else{
    const newStart=Math.min(col,origEnd);
    df.offset=newStart-uCol;
    df.span=Math.max(1,origEnd-newStart+1);
  }
  render();
});
window.addEventListener('mouseup',()=>{
  if(resizing){resizing=null;saveState();}
});

// ── pool ─────────────────────────────────────────────────────────────
function buildPool(){
  const pool=document.getElementById('pool');pool.innerHTML='';
  const placed=new Set(units.filter(u=>u.term!=null&&u.week!=null).map(u=>u.id));
  const vis=units.filter(u=>!placed.has(u.id));
  if(!vis.length){
    const e=document.createElement('span');e.className='empty-pool';
    e.textContent='All units are placed on the timeline.';pool.appendChild(e);return;
  }
  vis.forEach(u=>{
    const c=pal(u);
    const m=document.createElement('div');
    m.className='mn';m.draggable=true;m.dataset.uid=u.id;
    m.style.background=c.bg;m.style.borderColor=c.bd;m.style.color=c.tx;
    m.innerHTML=u.title+'<button class="rm" title="Delete">✕</button>';
    m.querySelector('.rm').onclick=e=>{
      e.stopPropagation();
      if(confirm('Delete "'+u.title+'"?'))units=units.filter(x=>x.id!==u.id);
      render();saveState();
    };
    m.addEventListener('dragstart',e=>oDS(e,u.id,true));
    m.addEventListener('dragend',oDE);
    pool.appendChild(m);
  });
}

document.getElementById('pool').addEventListener('dragover',e=>{e.preventDefault();document.getElementById('pool').classList.add('dov');});
document.getElementById('pool').addEventListener('dragleave',()=>document.getElementById('pool').classList.remove('dov'));
document.getElementById('pool').addEventListener('drop',e=>{
  e.preventDefault();document.getElementById('pool').classList.remove('dov');
  if(!drag)return;
  const u=units.find(x=>x.id===drag.uid);if(!u)return;
  u.term=undefined;u.week=undefined;
  render();saveState();
});

// ── sync ─────────────────────────────────────────────────────────────
(async function init(){
  try{
    const r=await fetch('/api/state');
    if(r.ok){const d=await r.json();if(d&&d.units){units=d.units;nid=d.nid||200;lastVersion=d.v||null;}}
  }catch(_){}
  render();

  try{
    const cfg=await(await fetch('/api/config')).json();
    if(!cfg.key)return;
    const pusher=new Pusher(cfg.key,{cluster:cfg.cluster});
    const ch=pusher.subscribe('curriculum-board');
    ch.bind('state-update',function(data){
      if(data&&data.units&&data.v!==lastVersion){
        units=data.units;nid=data.nid||200;lastVersion=data.v;
        render();
      }
    });
  }catch(e){console.error('[timeline] Pusher failed:',e.message);}
})();
</script>
</body>
</html>`;
