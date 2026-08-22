const state={
  production:[
    {line:'Line A',product:'Basic Tee',target:1200,actual:1148,oee:91,status:'Running'},
    {line:'Line B',product:'Polo Shirt',target:980,actual:861,oee:84,status:'Running'},
    {line:'Line C',product:'Hoodie',target:760,actual:792,oee:88,status:'Running'},
    {line:'Line D',product:'Denim Jacket',target:540,actual:401,oee:72,status:'Attention'}
  ],
  inventory:[
    {sku:'FAB-COT-001',name:'Cotton 100%',stock:12400,reorder:5000,unit:'kg',status:'Healthy'},
    {sku:'FAB-POL-004',name:'Polyester',stock:3200,reorder:4500,unit:'kg',status:'Low'},
    {sku:'ZIP-003',name:'Metal zipper 8in',stock:18400,reorder:8000,unit:'pcs',status:'Healthy'},
    {sku:'THR-018',name:'Sewing thread',stock:4100,reorder:6000,unit:'cones',status:'Low'}
  ],
  maintenance:[
    {machine:'Sewing-24',line:'Line D',event:'Vibration above baseline',due:'Today',severity:'High'},
    {machine:'Cutter-07',line:'Line A',event:'Blade service',due:'Tomorrow',severity:'Medium'},
    {machine:'Press-12',line:'Line C',event:'Routine inspection',due:'Aug 25',severity:'Low'}
  ],
  documents:[
    {title:'SOP — Sewing Machine Setup',type:'SOP',updated:'2 days ago',text:'Thread tension, needle selection, machine setup and first-piece inspection procedure.'},
    {title:'Maintenance Manual — Juki DDL Series',type:'Manual',updated:'5 days ago',text:'Lubrication intervals, common faults, vibration checks and service procedures.'},
    {title:'Quality Standard — Basic Tee',type:'Quality',updated:'1 week ago',text:'Measurement tolerances, seam quality, fabric defects and final inspection criteria.'},
    {title:'Production Plan — August 2026',type:'Plan',updated:'Today',text:'Daily targets, line assignments, order priorities and planned downtime.'}
  ]
};

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badge=(value,kind='')=>`<span class="badge ${kind}">${esc(value)}</span>`;
const toast=msg=>{const el=$('#toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)};

function kpi(label,value,trend){return `<div class="card"><div class="muted">${label}</div><div class="metric-row"><div class="metric">${value}</div><div class="trend">${trend}</div></div></div>`}

function renderOverview(){
  const lineOutput=state.production.reduce((a,x)=>a+x.actual,0), lineTarget=state.production.reduce((a,x)=>a+x.target,0);
  $('#view-overview').innerHTML=`
    <div class="grid kpis">${kpi('Production today',lineOutput.toLocaleString(),'↑ 4.8%')}${kpi('Plan attainment',Math.round(lineOutput/lineTarget*100)+'%','↑ 2.1%')}${kpi('Average OEE','83.8%','↑ 1.7%')}${kpi('Open maintenance','3','1 high priority')}</div>
    <div class="grid two" style="margin-top:16px">
      <div class="card"><h2>Production output by line</h2><div class="bar-list">${state.production.map(x=>`<div><div class="bar-label"><span>${esc(x.line)} · ${esc(x.product)}</span><strong>${x.actual.toLocaleString()} / ${x.target.toLocaleString()}</strong></div><div class="bar"><span style="width:${Math.min(100,Math.round(x.actual/x.target*100))}%"></span></div></div>`).join('')}</div></div>
      <div class="card"><h2>Operational alerts</h2>${state.maintenance.map(x=>`<div class="alert"><div>${x.severity==='High'?'⚠':'•'}</div><div><strong>${esc(x.machine)} · ${badge(x.severity,x.severity==='High'?'danger':'warn')}</strong><p>${esc(x.event)} · ${esc(x.due)}</p></div></div>`).join('')}</div>
    </div>
    <div class="grid two"><div class="card"><div class="section-head"><h2>Production trend</h2><span class="muted">Last 8 shifts</span></div><div class="spark">${[62,71,68,76,73,82,88,91].map(v=>`<span style="height:${v}%"></span>`).join('')}</div></div>
    <div class="card"><h2>Inventory risk</h2><div class="bar-list">${state.inventory.map(x=>{const pct=Math.min(100,Math.round(x.stock/x.reorder*100));return `<div><div class="bar-label"><span>${esc(x.name)}</span>${badge(x.status,x.status==='Low'?'warn':'')}</div><div class="bar"><span style="width:${pct}%"></span></div></div>`}).join('')}</div></div></div>`;
}

function renderProduction(){
  $('#view-production').innerHTML=`<div class="section-head"><div><h2>Production control</h2><div class="muted">Live line performance and shift targets</div></div><button class="btn primary" id="addProduction">＋ Log output</button></div><div class="grid kpis">${kpi('Units produced',state.production.reduce((a,x)=>a+x.actual,0).toLocaleString(),'Today')}${kpi('Target',state.production.reduce((a,x)=>a+x.target,0).toLocaleString(),'Today')}${kpi('Avg. OEE','83.8%','4 lines')}${kpi('Downtime','42 min','Today')}</div><div class="card" style="margin-top:16px"><div class="table-wrap"><table class="table"><thead><tr><th>Line</th><th>Product</th><th>Target</th><th>Actual</th><th>Attainment</th><th>OEE</th><th>Status</th></tr></thead><tbody>${state.production.map(x=>`<tr><td><strong>${x.line}</strong></td><td>${x.product}</td><td>${x.target.toLocaleString()}</td><td>${x.actual.toLocaleString()}</td><td>${Math.round(x.actual/x.target*100)}%</td><td>${x.oee}%</td><td>${badge(x.status,x.status==='Attention'?'warn':'')}</td></tr>`).join('')}</tbody></table></div></div>`;
  $('#addProduction').onclick=()=>{state.production[0].actual+=25;renderProduction();toast('25 units logged to Line A')};
}

function renderInventory(){
  $('#view-inventory').innerHTML=`<div class="section-head"><div><h2>Inventory intelligence</h2><div class="muted">Materials, reorder points and supply risk</div></div><button class="btn" id="refreshInventory">↻ Refresh</button></div><div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>SKU</th><th>Material</th><th>On hand</th><th>Reorder point</th><th>Coverage</th><th>Status</th></tr></thead><tbody>${state.inventory.map(x=>`<tr><td>${x.sku}</td><td><strong>${x.name}</strong></td><td>${x.stock.toLocaleString()} ${x.unit}</td><td>${x.reorder.toLocaleString()} ${x.unit}</td><td>${Math.round(x.stock/x.reorder*100)}%</td><td>${badge(x.status,x.status==='Low'?'warn':'')}</td></tr>`).join('')}</tbody></table></div></div><div class="grid three"><div class="card"><h2>At risk</h2><div class="metric">${state.inventory.filter(x=>x.status==='Low').length}</div><div class="muted">materials below reorder point</div></div><div class="card"><h2>Estimated stock value</h2><div class="metric">৳8.4M</div><div class="muted">demo valuation</div></div><div class="card"><h2>Next inbound</h2><div class="metric">2.4T</div><div class="muted">cotton · Aug 24</div></div></div>`;
  $('#refreshInventory').onclick=()=>toast('Inventory snapshot refreshed');
}

function renderMaintenance(){
  $('#view-maintenance').innerHTML=`<div class="section-head"><div><h2>Maintenance command center</h2><div class="muted">Exceptions first. Preventive work second.</div></div><button class="btn primary" id="resolve">Mark high priority resolved</button></div><div class="grid three">${state.maintenance.map(x=>`<div class="card"><div class="muted">${x.line}</div><h2 style="margin-top:7px">${x.machine}</h2>${badge(x.severity,x.severity==='High'?'danger':x.severity==='Medium'?'warn':'')}<p>${x.event}</p><div class="muted">Due ${x.due}</div></div>`).join('')}</div><div class="card" style="margin-top:16px"><h2>Maintenance logic</h2><p class="muted">The MVP surfaces maintenance exceptions from the operational dataset. A production version should replace these rules with sensor ingestion, work orders and predictive models.</p></div>`;
  $('#resolve').onclick=()=>{state.maintenance=state.maintenance.filter(x=>x.severity!=='High');renderMaintenance();toast('High-priority event marked resolved')};
}

function answerQuestion(query){
  const q=query.toLowerCase();
  if(q.includes('production')||q.includes('output')){const x=state.production.reduce((a,b)=>a+b.actual,0);return `Today's production output is <strong>${x.toLocaleString()} units</strong> across four lines. Line A is leading at 95.7% of target, while Line D is the main exception at 74.3%.`}
  if(q.includes('inventory')||q.includes('stock')||q.includes('material')){const low=state.inventory.filter(x=>x.status==='Low');return `<strong>${low.length} materials</strong> are below their reorder points: ${low.map(x=>x.name).join(' and ')}. Polyester is the most immediate shortage at ${low[0].stock.toLocaleString()} ${low[0].unit} on hand.`}
  if(q.includes('maintenance')||q.includes('machine')){return `There are <strong>${state.maintenance.length} open maintenance events</strong>. The highest priority is ${state.maintenance[0]?.machine||'none'} on ${state.maintenance[0]?.line||'the floor'}, triggered by ${state.maintenance[0]?.event.toLowerCase()||'an exception'}.`}
  if(q.includes('oee')||q.includes('efficient'))return `Average line OEE is <strong>83.8%</strong>. Line A is strongest at 91%, while Line D needs attention at 72%.`;
  return `I found the factory dataset, but the demo knowledge layer does not have a grounded answer for that question yet. Try asking about production, inventory, maintenance or OEE.`;
}

function renderKnowledge(){
  $('#view-knowledge').innerHTML=`<div class="section-head"><div><h2>Factory knowledge</h2><div class="muted">Ask questions across operational records and documents</div></div></div><div class="card"><div class="knowledge-search"><input id="question" placeholder="e.g. Which line is underperforming today?"/><button class="btn primary" id="ask">Ask factory</button></div><div id="answer"></div></div><div class="section-head"><h2>Indexed documents</h2><span class="muted">${state.documents.length} sources</span></div><div class="card">${state.documents.map(d=>`<div class="doc"><div class="doc-title">${esc(d.title)}</div><div class="doc-meta">${esc(d.type)} · Updated ${esc(d.updated)} · ${esc(d.text)}</div></div>`).join('')}</div>`;
  const ask=()=>{const q=$('#question').value.trim();if(!q)return toast('Enter a factory question');$('#answer').innerHTML=`<div class="answer"><strong>FactoryOS answer</strong><p>${answerQuestion(q)}</p><small class="muted">Source: demo production, inventory and maintenance records</small></div>`};
  $('#ask').onclick=ask;$('#question').onkeydown=e=>{if(e.key==='Enter')ask()};
}

const renderers={overview:renderOverview,production:renderProduction,inventory:renderInventory,maintenance:renderMaintenance,knowledge:renderKnowledge};
function switchView(view){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));$('#view-'+view).classList.add('active');document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===view));$('#pageTitle').textContent={overview:'Operations overview',production:'Production control',inventory:'Inventory intelligence',maintenance:'Maintenance command center',knowledge:'Factory knowledge'}[view];renderers[view]();$('#sidebar').classList.remove('open')}
document.querySelectorAll('.nav-item').forEach(btn=>btn.onclick=()=>switchView(btn.dataset.view));$('#mobileMenu').onclick=()=>$('#sidebar').classList.toggle('open');
renderOverview();
