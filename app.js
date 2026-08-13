// Guard: verificar que la librería Supabase se cargó desde el CDN
if (!window.supabase) {
  console.error('La librería de Supabase no se cargó.');
  alert('No se pudo cargar la conexión. Recarga la página.');
  throw new Error('Supabase library unavailable');
}

const supabaseUrl = 'https://wkpxmvemcgkrydldquwl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcHhtdmVtY2drcnlkbGRxdXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2Mjk2MjIsImV4cCI6MjEwMjIwNTYyMn0.OPEUy-TjYFG-Xq-a62LS-hgc75eZAHAFUg9wFPR_efA';
// Se nombra `db` para no ocultar window.supabase con una constante local del mismo nombre
const db = window.supabase.createClient(supabaseUrl, supabaseKey);

const seedServices = [
  {id:'s1',name:'Anteproyecto arquitectónico',category:'Diseño arquitectónico',min_price:28000,max_price:45000,unit:'m²',time_estimate:'7–12 días',description:'Propuesta espacial preliminar, distribución y concepto de proyecto.',keywords:['anteproyecto','vivienda','casa','distribución','planos','construir']},
  {id:'s2',name:'Diseño arquitectónico completo',category:'Diseño arquitectónico',min_price:50000,max_price:85000,unit:'m²',time_estimate:'15–25 días',description:'Planos arquitectónicos, detalles y documentación para ejecución.',keywords:['diseño','arquitectónico','vivienda','casa','planos','construcción','niveles']},
  {id:'s3',name:'Diseño de interiores residencial',category:'Diseño de interiores',min_price:35000,max_price:65000,unit:'m²',time_estimate:'10–18 días',description:'Concepto, distribución, acabados y visualización de espacios interiores.',keywords:['interiores','sala','dormitorio','baño','cocina','acabados','muebles']},
  {id:'s4',name:'Remodelación integral',category:'Remodelación',min_price:1200000,max_price:2800000,unit:'proyecto',time_estimate:'3–8 semanas',description:'Planeación, diseño y renovación de espacios existentes.',keywords:['remodelar','remodelación','renovar','reforma','existente','acabados']},
  {id:'s5',name:'Diseño de cocina',category:'Diseño de interiores',min_price:950000,max_price:1800000,unit:'proyecto',time_estimate:'5–8 días',description:'Diseño funcional de cocina, mobiliario y especificaciones.',keywords:['cocina','gabinetes','mobiliario','isla']},
  {id:'s6',name:'Levantamiento arquitectónico',category:'Documentación',min_price:9000,max_price:15000,unit:'m²',time_estimate:'2–5 días',description:'Medición y planos de un inmueble existente.',keywords:['levantamiento','medición','medir','existente','planos']},
  {id:'s7',name:'Licencia de construcción',category:'Trámites',min_price:1800000,max_price:4500000,unit:'proyecto',time_estimate:'4–10 semanas',description:'Acompañamiento documental para trámite de licencia.',keywords:['licencia','trámite','curaduría','permiso','construcción']},
  {id:'s8',name:'Visita y diagnóstico técnico',category:'Construcción y obra',min_price:250000,max_price:450000,unit:'visita',time_estimate:'1 día',description:'Revisión inicial, diagnóstico y recomendaciones de intervención.',keywords:['visita','diagnóstico','revisión','obra','humedad','daños']},
  {id:'s9',name:'Planos técnicos y constructivos',category:'Documentación',min_price:30000,max_price:55000,unit:'m²',time_estimate:'8–15 días',description:'Planos de detalle, especificaciones y documentación para obra.',keywords:['planos','técnicos','constructivos','detalles','documentación','obra']},
  {id:'s10',name:'Modelado 3D y visualización',category:'Diseño arquitectónico',min_price:700000,max_price:1600000,unit:'proyecto',time_estimate:'4–10 días',description:'Modelado tridimensional y visualización de la propuesta.',keywords:['3d','render','renders','visualización','modelo','modelado']},
  {id:'s11',name:'Renders arquitectónicos',category:'Diseño arquitectónico',min_price:180000,max_price:450000,unit:'unidad',time_estimate:'2–5 días',description:'Imágenes de presentación para comunicar el diseño del proyecto.',keywords:['render','renders','imagen','visualización','fachada','interior']},
  {id:'s12',name:'Diseño de baño',category:'Diseño de interiores',min_price:550000,max_price:1200000,unit:'proyecto',time_estimate:'4–7 días',description:'Diseño funcional de baño, acabados, mobiliario y especificaciones.',keywords:['baño','baños','ducha','sanitario','enchape','grifería']},
  {id:'s13',name:'Diseño de fachada',category:'Diseño arquitectónico',min_price:1200000,max_price:2800000,unit:'proyecto',time_estimate:'7–12 días',description:'Propuesta estética y técnica para la imagen exterior del inmueble.',keywords:['fachada','exterior','frente','elevación','revestimiento']},
  {id:'s14',name:'Presupuesto de obra',category:'Construcción y obra',min_price:450000,max_price:950000,unit:'proyecto',time_estimate:'3–6 días',description:'Cálculo preliminar de cantidades, materiales y costos de ejecución.',keywords:['presupuesto','costos','cantidades','materiales','obra','precio']},
  {id:'s15',name:'Supervisión de obra',category:'Construcción y obra',min_price:350000,max_price:700000,unit:'visita',time_estimate:'Según obra',description:'Acompañamiento técnico para verificar avances, calidad y ejecución.',keywords:['supervisión','obra','interventoría','avance','calidad','construcción']},
  {id:'s16',name:'Diseño de iluminación',category:'Diseño de interiores',min_price:650000,max_price:1400000,unit:'proyecto',time_estimate:'4–8 días',description:'Propuesta de iluminación funcional, decorativa y especificaciones.',keywords:['iluminación','luces','lámparas','eléctrico','led']},
  {id:'s17',name:'Diseño de mobiliario a medida',category:'Diseño de interiores',min_price:480000,max_price:1100000,unit:'proyecto',time_estimate:'5–10 días',description:'Diseño de mobiliario personalizado y planos de fabricación.',keywords:['mobiliario','muebles','clóset','closet','carpintería','medida']},
  {id:'s18',name:'Estudio de factibilidad',category:'Trámites',min_price:900000,max_price:2200000,unit:'proyecto',time_estimate:'7–15 días',description:'Revisión inicial de viabilidad normativa, espacial y técnica.',keywords:['factibilidad','viabilidad','normativa','uso','suelo','lote','terreno']},
  {id:'s19',name:'Regularización de planos',category:'Trámites',min_price:1200000,max_price:3000000,unit:'proyecto',time_estimate:'3–7 semanas',description:'Actualización documental de un inmueble existente para trámites.',keywords:['regularización','legalización','planos','trámite','existente','licencia']},
  {id:'s20',name:'Diseño de paisajismo',category:'Diseño arquitectónico',min_price:30000,max_price:70000,unit:'m²',time_estimate:'6–12 días',description:'Diseño de jardines, exteriores y selección de vegetación.',keywords:['paisajismo','jardín','jardines','exterior','terraza','vegetación']}
  ,{id:'s21',name:'Diseño de sala y comedor',category:'Diseño de espacios',subcategory:'Diseño de interiores residencial',min_price:850,max_price:1900,unit:'proyecto',time_estimate:'5–9 días',description:'Diseño integral de áreas sociales, distribución, acabados y mobiliario.',keywords:['sala','comedor','área social','living','interiores']}
  ,{id:'s22',name:'Diseño de dormitorio',category:'Diseño de espacios',subcategory:'Diseño de interiores residencial',min_price:650,max_price:1500,unit:'proyecto',time_estimate:'4–7 días',description:'Propuesta de distribución, iluminación, mobiliario y acabados para dormitorio.',keywords:['dormitorio','habitación','cuarto','closet','interiores']}
  ,{id:'s23',name:'Diseño de departamento',category:'Diseño de espacios',subcategory:'Diseño de interiores residencial',min_price:55,max_price:100,unit:'m²',time_estimate:'12–20 días',description:'Proyecto de interiores integral para departamentos nuevos o existentes.',keywords:['departamento','apartamento','interiores','vivienda','residencial']}
  ,{id:'s24',name:'Diseño interior de casa',category:'Diseño de espacios',subcategory:'Diseño de interiores residencial',min_price:50,max_price:95,unit:'m²',time_estimate:'15–25 días',description:'Proyecto integral de interiores para vivienda unifamiliar.',keywords:['casa','vivienda','interiores','residencial','hogar']}
  ,{id:'s25',name:'Diseño de restaurante o cafetería',category:'Diseño de espacios',subcategory:'Diseño comercial',min_price:65,max_price:125,unit:'m²',time_estimate:'15–28 días',description:'Diseño de experiencia, distribución operativa, ambiente y acabados para gastronomía.',keywords:['restaurante','cafetería','café','gastronomía','comercial']}
  ,{id:'s26',name:'Diseño de hotel u hospedaje',category:'Diseño de espacios',subcategory:'Diseño comercial',min_price:70,max_price:140,unit:'m²',time_estimate:'20–35 días',description:'Diseño de habitaciones, áreas comunes y experiencia espacial para hospedaje.',keywords:['hotel','hostal','hospedaje','habitaciones','comercial']}
  ,{id:'s27',name:'Diseño de tienda y retail',category:'Diseño de espacios',subcategory:'Diseño comercial',min_price:60,max_price:120,unit:'m²',time_estimate:'12–24 días',description:'Diseño de espacios de venta, exhibición, circulación e identidad comercial.',keywords:['tienda','retail','local','exhibición','comercial']}
  ,{id:'s28',name:'Diseño de oficina',category:'Diseño de espacios',subcategory:'Diseño comercial',min_price:55,max_price:110,unit:'m²',time_estimate:'12–22 días',description:'Diseño de puestos de trabajo, salas de reunión y áreas colaborativas.',keywords:['oficina','oficinas','corporativo','trabajo','comercial']}
];

const toSoles = v => Math.max(1, Math.round(v * 0.0009));
const initialDataToMigrate = seedServices.map(s => {
    if(parseInt(s.id.substring(1)) <= 20) {
        s.min_price = toSoles(s.min_price);
        s.max_price = toSoles(s.max_price);
    }
    if(s.category === 'Diseño de interiores' || (s.category === 'Diseño de espacios' && s.subcategory === 'Diseño residencial')) {
        s.category = 'Diseño de espacios';
        s.subcategory = 'Diseño de interiores residencial';
    }
    return s;
});

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];

let services = [];
let quote = JSON.parse(localStorage.getItem('hm-quote') || '[]');
let user = null; 
let isEditor = false;
let lastSuggestions = [];
let openCategories = new Set();
let servicesChannel = null;
let clients = [];
let budgets = [];
let projects = [];
let activity = [];
let operationsReady = false;
let catalogStructure = JSON.parse(localStorage.getItem('hm-catalog-structure') || '[]');

const money = v => new Intl.NumberFormat('es-PE', {style: 'currency', currency: 'PEN', maximumFractionDigits: 0}).format(v);
const saveQuote = () => localStorage.setItem('hm-quote', JSON.stringify(quote));

function toast(msg) {
    const e = $('#toast');
    e.textContent = msg;
    e.classList.add('show');
    setTimeout(() => e.classList.remove('show'), 2600);
}

function setAppStatus(message, tone = 'ready') {
    let status = $('#app-status');
    if (!status) {
        status = document.createElement('span');
        status.id = 'app-status';
        status.className = 'app-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        $('.topbar-actions')?.prepend(status);
    }
    status.textContent = message;
    status.dataset.tone = tone;
}

function categories() {
    const names = [...new Set(services.map(s => s.category))];
    return names.sort((a, b) => structureOrder('category', a) - structureOrder('category', b) || a.localeCompare(b));
}

function structureOrder(kind, name, parent = '') {
    const item = catalogStructure.find(x => x.kind === kind && x.name === name && (x.parent_name || '') === parent);
    return item ? item.sort_order : 9999;
}

function syncStructureFromServices() {
    const current = [];
    categories().forEach((category, index) => {
        current.push({ kind: 'category', name: category, parent_name: '', sort_order: structureOrder('category', category) === 9999 ? index : structureOrder('category', category) });
        [...new Set(services.filter(s => s.category === category).map(s => s.subcategory).filter(Boolean))].forEach((name, subIndex) => current.push({ kind: 'subcategory', name, parent_name: category, sort_order: structureOrder('subcategory', name, category) === 9999 ? subIndex : structureOrder('subcategory', name, category) }));
    });
    catalogStructure = current;
    localStorage.setItem('hm-catalog-structure', JSON.stringify(catalogStructure));
}

function renderStructure() {
    syncStructureFromServices();
    $('#structure-list').innerHTML = categories().map(category => {
        const subs = catalogStructure.filter(x => x.kind === 'subcategory' && x.parent_name === category).sort((a,b) => a.sort_order - b.sort_order);
        return `<section class="structure-group"><div class="structure-row"><strong>${category}</strong><div><button data-structure="rename-category" data-name="${category}">Renombrar</button><button data-structure="up-category" data-name="${category}">↑</button><button data-structure="down-category" data-name="${category}">↓</button></div></div>${subs.map(sub => `<div class="structure-row sub"><span>${sub.name}</span><div><button data-structure="rename-sub" data-name="${sub.name}" data-parent="${category}">Renombrar</button><button data-structure="up-sub" data-name="${sub.name}" data-parent="${category}">↑</button><button data-structure="down-sub" data-name="${sub.name}" data-parent="${category}">↓</button></div></div>`).join('')}<button class="add-subcategory" data-add-sub="${category}">+ Subcategoría</button></section>`;
    }).join('');
}

async function persistStructure() {
    localStorage.setItem('hm-catalog-structure', JSON.stringify(catalogStructure));
    const { error } = await db.from('catalog_structure').upsert(catalogStructure, { onConflict: 'kind,name,parent_name' });
    if (error) console.warn('Estructura guardada solo en este navegador hasta activar SQL:', error.message);
}

function setupCatalogOptions() {
    const opts = categories().map(c => `<option value="${c}">`).join('');
    const subs = [...new Set(services.map(s => s.subcategory).filter(Boolean))].sort().map(s => `<option value="${s}">`).join('');
    $('#category-options').innerHTML = opts;
    $('#subcategory-options').innerHTML = subs;
    $('#category-filter').innerHTML = '<option value="">Todas las categorías</option>' + categories().map(c => `<option>${c}</option>`).join('');
}

function renderDashboard() {
    const total = quote.reduce((a, q) => a + q.min_price * q.qty, 0);
    $('#metric-total').textContent = money(total);
    $('#metric-items').textContent = quote.length ? `${quote.length} servicio${quote.length !== 1 ? 's' : ''} seleccionado${quote.length !== 1 ? 's' : ''}` : 'sin servicios seleccionados';
    const editorView = isEditor && operationsReady;
    $('#metric-one-label').textContent = editorView ? 'Presupuestos por decidir' : 'Servicios activos';
    $('#metric-services').textContent = editorView ? budgets.filter(b => ['draft', 'sent', 'review'].includes(b.status)).length : services.length;
    $('#metric-one-detail').textContent = editorView ? 'requieren seguimiento' : 'en el catálogo';
    $('#metric-two-label').textContent = editorView ? 'Proyectos activos' : 'Categorías';
    $('#metric-categories').textContent = editorView ? projects.filter(p => ['in_progress', 'waiting_client'].includes(p.status)).length : categories().length;
    $('#metric-two-detail').textContent = editorView ? 'en ejecución o espera' : 'áreas de trabajo';
    $('#dashboard-section-label').textContent = editorView ? 'PRÓXIMOS PASOS' : 'CATÁLOGO';
    $('#dashboard-section-title').textContent = editorView ? 'Seguimiento reciente' : 'Servicios frecuentes';
    $('#dashboard-section-action').textContent = editorView ? 'Ver presupuestos →' : 'Ver catálogo completo →';
    $('#dashboard-section-action').dataset.go = editorView ? 'budgets' : 'catalog';
    $('#featured-services').innerHTML = editorView ? renderFollowUpCards() : services.slice(0, 6).map(card).join('');
}

function renderFollowUpCards() {
    const recent = [...budgets].filter(b => !['rejected', 'cancelled'].includes(b.status)).slice(0, 3);
    if (!recent.length) return '<div class="empty-state dashboard-empty"><span>→</span><h3>Tu primer presupuesto empieza aquí</h3><p>Analiza una necesidad, añade servicios y guárdalo para poder darle seguimiento.</p><button class="button primary" data-go="estimate">Crear presupuesto</button></div>';
    return recent.map(b => `<article class="service-card follow-up-card"><span class="category">${statusLabel[b.status]}</span><h4>${b.title}</h4><p>${b.clients?.name || 'Cliente sin asignar'}</p><footer><b>${money(b.total_min || 0)} — ${money(b.total_max || 0)}</b><span>${b.code}</span></footer></article>`).join('');
}

const statusLabel = { draft: 'Borrador', sent: 'Enviado', review: 'En revisión', approved: 'Aprobado', rejected: 'Rechazado', in_progress: 'En ejecución', waiting_client: 'Esperando cliente', completed: 'Finalizado', cancelled: 'Cancelado' };
const budgetStatusOptions = status => ['draft', 'sent', 'review', 'approved', 'rejected', 'cancelled'].map(value => `<option value="${value}" ${value === status ? 'selected' : ''}>${statusLabel[value]}</option>`).join('');
const projectStatusOptions = status => ['in_progress', 'waiting_client', 'completed', 'cancelled'].map(value => `<option value="${value}" ${value === status ? 'selected' : ''}>${statusLabel[value] || (value === 'waiting_client' ? 'Esperando cliente' : value)}</option>`).join('');
const emptyOperations = text => `<div class="empty-state operations-empty"><span>◌</span><h3>${text}</h3><p>Cuando lo registres, aparecerá aquí con su historial.</p></div>`;

function renderOperations() {
    if (!isEditor) return;
    $('#clients-list').innerHTML = clients.length ? clients.map(c => `<article class="operation-card"><div class="operation-symbol">◉</div><div><p class="eyebrow">CLIENTE</p><h3>${c.name}</h3><p>${[c.phone, c.email, c.location].filter(Boolean).join(' · ') || 'Sin datos de contacto'}</p></div><small>${budgets.filter(b => b.client_id === c.id).length} presupuestos</small></article>`).join('') : emptyOperations('Aún no hay clientes registrados');
    $('#budgets-list').innerHTML = budgets.length ? budgets.map(b => `<article class="operation-card budget-card"><div><p class="eyebrow">${b.code || 'PRESUPUESTO'}</p><h3>${b.title}</h3><p>${b.clients?.name || 'Cliente sin asignar'} · ${money(b.total_min || 0)} — ${money(b.total_max || 0)}</p></div><div class="status-control"><select data-budget-status="${b.id}">${budgetStatusOptions(b.status)}</select><small>${b.valid_until ? `Vigente hasta ${b.valid_until}` : 'Sin fecha de vigencia'}</small></div></article>`).join('') : emptyOperations('Aún no hay presupuestos guardados');
    $('#projects-list').innerHTML = projects.length ? projects.map(p => `<article class="operation-card project-card"><div class="operation-symbol">◫</div><div><p class="eyebrow">${p.budgets?.code || 'PROYECTO'}</p><h3>${p.title}</h3><p>${p.clients?.name || 'Cliente sin asignar'} · ${p.start_date || 'Sin fecha de inicio'}</p></div><div class="status-control"><select data-project-status="${p.id}">${projectStatusOptions(p.status)}</select></div></article>`).join('') : emptyOperations('Aún no hay proyectos en ejecución');
    $('#history-list').innerHTML = activity.length ? activity.map(a => `<article class="timeline-item"><span></span><div><p class="eyebrow">${new Date(a.created_at).toLocaleDateString('es-PE')}</p><h3>${a.action}</h3><p>${a.detail || 'Actualización registrada en el flujo operativo.'}</p></div></article>`).join('') : emptyOperations('El historial aparecerá aquí');
}

async function fetchOperations() {
    if (!isEditor) return;
    const [clientResult, budgetResult, projectResult, activityResult] = await Promise.all([
        db.from('clients').select('*').order('created_at', { ascending: false }),
        db.from('budgets').select('*, clients(name)').order('created_at', { ascending: false }),
        db.from('projects').select('*, clients(name), budgets(code)').order('created_at', { ascending: false }),
        db.from('activity_log').select('*').order('created_at', { ascending: false }).limit(60)
    ]);
    const errors = [clientResult.error, budgetResult.error, projectResult.error, activityResult.error].filter(Boolean);
    if (errors.length) {
        operationsReady = false;
        ['#clients-list', '#budgets-list', '#projects-list', '#history-list'].forEach(selector => {
            const target = $(selector);
            if (target) target.innerHTML = '<div class="empty-state operations-empty"><span>⌁</span><h3>Activa el módulo operativo</h3><p>Ejecuta el archivo SQL incluido una sola vez en el SQL Editor de tu Supabase.</p></div>';
        });
        console.warn('Módulo operativo pendiente:', errors[0].message);
        return;
    }
    operationsReady = true;
    clients = clientResult.data || [];
    budgets = budgetResult.data || [];
    projects = projectResult.data || [];
    activity = activityResult.data || [];
    renderOperations();
    renderDashboard();
}

async function logActivity(action, detail, entityType, entityId) {
    return db.from('activity_log').insert({ action, detail, entity_type: entityType, entity_id: entityId, created_by: user?.id || null });
}

function card(s) {
    return `<article class="service-card"><span class="category">${s.category.toUpperCase()}</span><h4>${s.name}</h4><p>${s.description}</p><footer><b>${money(s.min_price)} – ${money(s.max_price)}</b><span>por ${s.unit}</span></footer></article>`;
}

function renderCatalog() {
    const query = $('#catalog-search').value.toLowerCase();
    const cat = $('#category-filter').value;
    const filtered = services.filter(s => !cat || s.category === cat).filter(s => [s.name, s.category, s.subcategory || '', s.description, ...(s.keywords || [])].join(' ').toLowerCase().includes(query));
    const catalogCount = $('#catalog-count');
    if (catalogCount) catalogCount.textContent = filtered.length;
    if (!filtered.length) {
        $('#catalog-list').innerHTML = '<div class="empty-state"><h3>No encontramos servicios</h3><p>Prueba otra búsqueda o crea uno nuevo.</p></div>';
        return;
    }
    const grouped = filtered.reduce((all, s) => {
        (all[s.category] ??= []).push(s);
        return all;
    }, {});
    const row = s => `<article class="catalog-row"><div><span class="cat">${s.subcategory || s.category}</span><h3>${s.name}</h3></div><p>${s.description}</p><div><label>VALOR ORIENTATIVO</label><b>${money(s.min_price)} – ${money(s.max_price)}</b><small>por ${s.unit}</small></div><div><label>TIEMPO</label><b>${s.time_estimate}</b></div><div class="row-actions">${isEditor ? `<button data-edit="${s.id}">Editar</button><button class="delete" data-delete="${s.id}">Eliminar</button>` : '<span class="role-badge">Consulta</span>'}</div></article>`;
    $('#catalog-list').innerHTML = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([category, items]) => {
        const expanded = Boolean(query || cat || openCategories.has(category));
        const bySub = items.reduce((all, s) => {
            const key = s.subcategory || '';
            (all[key] ??= []).push(s);
            return all;
        }, {});
        const content = Object.entries(bySub).sort(([a], [b]) => structureOrder('subcategory', a, category) - structureOrder('subcategory', b, category) || a.localeCompare(b)).map(([sub, subitems]) => `${sub ? `<div class="subcategory-heading"><span>${sub}</span><small>${subitems.length} servicio${subitems.length !== 1 ? 's' : ''}</small></div>` : ''}${subitems.map(row).join('')}`).join('');
        return `<section class="category-group ${expanded ? 'expanded' : ''}"><button class="category-toggle" data-category-toggle="${category}" aria-expanded="${expanded}"><span><small>ÁREA DE SERVICIO</small><b>${category}</b></span><em>${items.length} servicio${items.length !== 1 ? 's' : ''}</em><i>⌄</i></button><div class="category-services">${content}</div></section>`;
    }).join('');
}

function nav(view) {
    $$('.page').forEach(e => e.classList.remove('active-page'));
    $(`#${view}`).classList.add('active-page');
    $$('.nav-link').forEach(e => e.classList.toggle('active', e.dataset.view === view));
    const titles = { dashboard: 'Buenos días', clients: 'Clientes', budgets: 'Presupuestos', projects: 'Proyectos', catalog: 'Catálogo de servicios', estimate: 'Analizar una necesidad', quote: 'Estimación actual', history: 'Historial' };
    $('#page-title').textContent = titles[view];
    $('.sidebar').classList.remove('open');
    if (view === 'catalog') renderCatalog();
    if (view === 'quote') renderQuote();
    if (['clients', 'budgets', 'projects', 'history'].includes(view)) fetchOperations();
}

function addQuote(s, qty = 1) {
    if (!quote.some(i => i.id === s.id)) quote.push({ ...s, qty: Number(qty) || 1 });
    saveQuote();
    renderDashboard();
    renderQuote();
    toast('Servicio añadido a la estimación');
}

function analyze() {
    const t = $('#client-need').value.trim().toLowerCase();
    if (!t) { toast('Describe primero la necesidad del cliente'); return; }
    const detected = [];
    const area = [...t.matchAll(/(\d+(?:[.,]\d+)?)\s*(m²|m2|metros cuadrados)/g)].map(x => x[1].replace(',', '.'));
    if (area.length) detected.push(['Área', area.map(a => `${a} m²`).join(' · ')]);
    const levels = t.match(/(\d+|un|una|dos|tres)\s*(niveles?|pisos?|plantas?)/);
    if (levels) detected.push(['Niveles', levels[1] + ' ' + levels[2]]);
    const rooms = t.match(/(\d+)\s*(dormitorios?|habitaciones?|cuartos?)/);
    if (rooms) detected.push(['Habitaciones', rooms[1]]);
    const baths = t.match(/(\d+)\s*baños?/);
    if (baths) detected.push(['Baños', baths[1]]);
    const types = [['Vivienda', /vivienda|casa|residencial/], ['Remodelación', /remodel|renovar|reforma/], ['Cocina', /cocina/], ['Construcción', /construir|construcción|obra/], ['Trámite', /licencia|curaduría|permiso/]];
    types.forEach(([n, r]) => { if (r.test(t)) detected.push(['Tipo / alcance', n]) });
    const score = s => (s.keywords||[]).reduce((n, k) => n + (t.includes(k) ? 1 : 0), 0) + (t.includes(s.category.toLowerCase()) ? 1 : 0);
    lastSuggestions = services.map(s => ({ ...s, score: score(s) })).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
    if (!lastSuggestions.length) lastSuggestions = services.filter(s => ['Diseño arquitectónico', 'Visita y diagnóstico técnico'].includes(s.name));
    const missing = [];
    if (!area.length) missing.push('Área aproximada a intervenir o construir.');
    if (!detected.some(x => x[0] === 'Tipo / alcance')) missing.push('Tipo de proyecto o intervención requerida.');
    if (!t.includes('presupuesto')) missing.push('Presupuesto objetivo o nivel de acabados.');
    if (!t.includes('ciudad') && !t.includes('bogotá')) missing.push('Ubicación del proyecto.');
    $('#analysis-results').className = 'analysis-results result-grid';
    $('#analysis-results').innerHTML = `<article class="result-panel"><p class="eyebrow">LECTURA DEL TEXTO</p><h3>Datos detectados</h3><div class="detected-list">${detected.length ? detected.map(x => `<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join('') : '<p>No se detectaron datos medibles; se usará el contexto escrito.</p>'}</div><div class="missing"><p class="eyebrow">FALTA POR DEFINIR</p><p>${missing.map(x => '• ' + x).join('<br>')}</p></div></article><article class="result-panel"><p class="eyebrow">COINCIDENCIAS DEL CATÁLOGO</p><h3>Servicios sugeridos</h3>${lastSuggestions.map(s => `<label class="suggestion"><input type="checkbox" value="${s.id}" checked><div><b>${s.name}</b><small>${s.category} · ${money(s.min_price)} – ${money(s.max_price)} por ${s.unit}</small></div><em>${s.score > 1 ? 'Alta' : 'Media'} afinidad</em></label>`).join('')}<button id="add-suggestions" class="button primary add-suggestions">Añadir seleccionados a la estimación →</button></article>`;
    $('#add-suggestions').onclick = () => {
        $$('#analysis-results input:checked').forEach(i => {
            const s = services.find(x => x.id === i.value);
            if (s) addQuote(s, area[0] && s.unit === 'm²' ? area[area.length - 1] : 1);
        });
        nav('quote');
    };
}

function renderQuote() {
    const holder = $('#quote-items');
    holder.innerHTML = quote.length ? quote.map(q => `<article class="quote-item"><div><h3>${q.name}</h3><p>${q.category} · ${q.time_estimate}</p></div><label>CANTIDAD<input type="number" min="1" data-qty="${q.id}" value="${q.qty}"></label><label>VALOR UNITARIO<input type="number" min="0" data-price="${q.id}" value="${q.min_price}"></label><button class="remove" data-remove="${q.id}" aria-label="Quitar">×</button></article>`).join('') : '<div class="empty-state"><span>◫</span><h3>Aún no hay servicios</h3><p>Analiza una necesidad o selecciona servicios desde el catálogo.</p></div>';
    holder.querySelectorAll('[data-qty]').forEach(e => e.onchange = () => {
        quote.find(q => q.id === e.dataset.qty).qty = Math.max(1, +e.value || 1);
        saveQuote();
        renderQuote();
        renderDashboard();
    });
    holder.querySelectorAll('[data-price]').forEach(e => e.onchange = () => {
        let q = quote.find(q => q.id === e.dataset.price);
        q.min_price = Math.max(0, +e.value || 0);
        q.max_price = Math.max(q.min_price, q.max_price);
        saveQuote();
        renderQuote();
        renderDashboard();
    });
    holder.querySelectorAll('[data-remove]').forEach(e => e.onclick = () => {
        quote = quote.filter(q => q.id !== e.dataset.remove);
        saveQuote();
        renderQuote();
        renderDashboard();
    });
    const min = quote.reduce((a, q) => a + q.min_price * q.qty, 0), max = quote.reduce((a, q) => a + q.max_price * q.qty, 0);
    $('#summary-services').textContent = quote.length;
    $('#summary-total').textContent = `${money(min)} — ${money(max)}`;
    $('#summary-time').textContent = quote.length ? 'Por confirmar' : '—';
    $('#quote-count').textContent = quote.length;
}

function openService(s) {
    if (!s && !isEditor) return;
    $('#service-form').reset();
    $('#dialog-title').textContent = s ? 'Editar servicio' : 'Nuevo servicio';
    $('#service-id').value = s?.id || '';
    $('#service-name').value = s?.name || '';
    $('#service-category').value = s?.category || '';
    $('#service-subcategory').value = s?.subcategory || '';
    $('#service-min').value = s?.min_price || '';
    $('#service-max').value = s?.max_price || '';
    $('#service-unit').value = s?.unit || 'm²';
    $('#service-time').value = s?.time_estimate || '';
    $('#service-description').value = s?.description || '';
    $('#service-keywords').value = s?.keywords?.join(', ') || '';
    $('#service-dialog').showModal();
}

async function fetchServices() {
    setAppStatus('Actualizando catálogo…', 'loading');
    const { data, error } = await db.from('services').select('*').order('name');
    if (error) {
        toast('Error de conexión o permisos en Supabase (Revisar RLS)');
        console.error("Error cargando servicios:", error);
        services = []; // Fallback para que la app no se congele
        setupCatalogOptions();
        renderDashboard();
        renderCatalog();
        renderQuote();
        setAppStatus('No se pudo actualizar', 'error');
        return;
    }
    
    // Si la BD está vacía y somos editores, migramos los datos locales iniciales
    if (data.length === 0 && isEditor) {
        const { error: insertError } = await db.from('services').insert(seedServices);
        if (!insertError) {
            toast('Catálogo base migrado a Supabase');
            return fetchServices(); // Volver a consultar
        }
    }
    
    services = data;
    if (isEditor) {
        const { data: structureData, error: structureError } = await db.from('catalog_structure').select('kind,name,parent_name,sort_order');
        if (!structureError && structureData?.length) catalogStructure = structureData;
    }
    setupCatalogOptions();
    renderDashboard();
    renderCatalog();
    renderQuote();
    setAppStatus(`${services.length} servicios disponibles`, 'ready');
}

// Authentication
$('#login-form').onsubmit = async e => {
    e.preventDefault();
    const email = $('#login-email').value.trim();
    const password = $('#login-password').value;
    
    const submit = $('#editor-login-button');
    submit.disabled = true;
    submit.textContent = 'Ingresando…';
    $('#login-error').textContent = 'Verificando acceso…';
    const { data, error } = await db.auth.signInWithPassword({ email, password });
    
    if (error) {
        $('#login-error').textContent = 'Credenciales incorrectas o error de conexión.';
        submit.disabled = false;
        submit.textContent = 'Ingresar como editor';
        return;
    }
    $('#login-error').textContent = '';
    submit.disabled = false;
    submit.textContent = 'Ingresar como editor';
    await checkUserAndStart(data.user);
};

$('#visitor-btn').onclick = async () => {
    const button = $('#visitor-btn');
    button.disabled = true;
    button.textContent = 'Abriendo catálogo…';
    try {
        await db.auth.signOut();
        await checkUserAndStart(null);
    } finally {
        button.disabled = false;
        button.textContent = 'Ver catálogo como visitante';
    }
};

async function checkUserAndStart(authUser) {
    user = authUser;
    isEditor = false;

    if (user) {
        const { data, error } = await db.from('editor_profiles').select('role').eq('user_id', user.id).single();
        if (error) {
            console.warn("No se pudo verificar el perfil de editor (¿Falta política RLS?):", error.message);
        }
        if (data) {
            isEditor = true;
        }
    }

    startApp();
}

function startApp() {
    $('#login-view').classList.add('hidden');
    $('#app-view').classList.remove('hidden');
    $('#user-name').textContent = user ? (user.email.split('@')[0]) : 'Visitante';
    $('#user-role').textContent = isEditor ? 'Editor' : 'Solo lectura';
    $('#user-initial').textContent = user ? user.email[0].toUpperCase() : 'V';
    $('#role-badge').textContent = isEditor ? 'Editor' : 'Visitante';
    $$('.admin-only').forEach(x => x.classList.toggle('hidden', !isEditor));
    
    setAppStatus('Cargando catálogo…', 'loading');
    fetchServices();
    fetchOperations();

    // Suscripción Realtime
    if (servicesChannel) db.removeChannel(servicesChannel);
    servicesChannel = db
      .channel('public:services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, payload => {
          fetchServices(); // Recargar todo de manera simple
      })
      .subscribe();
}

// UI Event Listeners
$$('.nav-link').forEach(e => e.onclick = () => nav(e.dataset.view));
$$('[data-go]').forEach(e => e.onclick = () => nav(e.dataset.go));
$('#featured-services').onclick = e => {
    const button = e.target.closest('[data-go]');
    if (button) nav(button.dataset.go);
};
$('#catalog-search').oninput = renderCatalog;
$('#category-filter').onchange = renderCatalog;
$('#add-service').onclick = () => openService();
$('#manage-structure').onclick = () => { renderStructure(); $('#structure-dialog').showModal(); };
$$('.close-structure').forEach(button => button.onclick = () => $('#structure-dialog').close());
$('#add-category').onclick = async () => {
    const name = prompt('Nombre de la nueva categoría:')?.trim();
    if (!name || categories().includes(name)) return;
    catalogStructure.push({ kind: 'category', name, parent_name: '', sort_order: catalogStructure.filter(x => x.kind === 'category').length });
    await persistStructure(); renderStructure(); toast('Categoría creada. Podrás asignarle servicios al editar uno.');
};
$('#structure-list').onclick = async e => {
    const add = e.target.dataset.addSub;
    if (add) {
        const name = prompt(`Nueva subcategoría para ${add}:`)?.trim();
        if (name) { catalogStructure.push({ kind: 'subcategory', name, parent_name: add, sort_order: catalogStructure.filter(x => x.kind === 'subcategory' && x.parent_name === add).length }); await persistStructure(); renderStructure(); }
        return;
    }
    const action = e.target.dataset.structure;
    if (!action) return;
    const name = e.target.dataset.name, parent = e.target.dataset.parent || '';
    const isCategory = action.includes('category');
    if (action.startsWith('rename')) {
        const renamed = prompt('Nuevo nombre:', name)?.trim();
        if (!renamed || renamed === name) return;
        const column = isCategory ? 'category' : 'subcategory';
        let query = db.from('services').update({ [column]: renamed }).eq(column, name);
        if (!isCategory) query = query.eq('category', parent);
        const { error } = await query;
        if (error) { toast('No se pudo renombrar en Supabase'); return; }
        catalogStructure.forEach(item => { if (item.kind === (isCategory ? 'category' : 'subcategory') && item.name === name && (!parent || item.parent_name === parent)) item.name = renamed; if (isCategory && item.kind === 'subcategory' && item.parent_name === name) item.parent_name = renamed; });
        await persistStructure(); await fetchServices(); renderStructure(); toast('Nombre actualizado'); return;
    }
    const kind = isCategory ? 'category' : 'subcategory';
    const items = catalogStructure.filter(x => x.kind === kind && (isCategory || x.parent_name === parent)).sort((a,b) => a.sort_order - b.sort_order);
    const index = items.findIndex(x => x.name === name);
    const target = action.startsWith('up') ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    [items[index].sort_order, items[target].sort_order] = [items[target].sort_order, items[index].sort_order];
    await persistStructure(); renderStructure(); renderCatalog();
};
$('#analyze-button').onclick = analyze;
$('#add-client').onclick = () => $('#client-dialog').showModal();
$('#save-budget').onclick = () => {
    if (!quote.length) { toast('Agrega servicios antes de guardar un presupuesto'); return; }
    if (!operationsReady) { toast('Primero activa el módulo operativo con el SQL incluido'); return; }
    $('#budget-client').innerHTML = '<option value="">Selecciona un cliente</option>' + clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    $('#budget-title').value = $('#client-need').value.trim().slice(0, 80) || 'Nuevo presupuesto';
    $('#budget-dialog').showModal();
};
$('#mobile-menu').onclick = () => $('.sidebar').classList.toggle('open');
$('#logout-button').onclick = async () => {
    await db.auth.signOut();
    location.reload();
};
$('#theme-button').onclick = () => document.body.classList.toggle('dark');

$('#client-form').onsubmit = async e => {
    e.preventDefault();
    const record = { name: $('#client-name').value.trim(), phone: $('#client-phone').value.trim(), email: $('#client-email').value.trim(), location: $('#client-location').value.trim(), notes: $('#client-notes').value.trim(), created_by: user.id };
    const { error } = await db.from('clients').insert(record);
    if (error) { toast('No se pudo guardar el cliente'); console.error(error); return; }
    $('#client-dialog').close();
    $('#client-form').reset();
    toast('Cliente registrado');
    await fetchOperations();
};

$('#budget-form').onsubmit = async e => {
    e.preventDefault();
    const min = quote.reduce((sum, item) => sum + item.min_price * item.qty, 0);
    const max = quote.reduce((sum, item) => sum + item.max_price * item.qty, 0);
    const code = `HM-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
    const record = { code, client_id: $('#budget-client').value, title: $('#budget-title').value.trim(), notes: $('#budget-notes').value.trim(), valid_until: $('#budget-valid-until').value || null, status: $('#budget-status').value, total_min: min, total_max: max, created_by: user.id };
    const { data, error } = await db.from('budgets').insert(record).select().single();
    if (error) { toast('No se pudo guardar el presupuesto'); console.error(error); return; }
    const items = quote.map(item => ({ budget_id: data.id, service_id: item.id, service_name: item.name, quantity: item.qty, unit: item.unit, unit_min_price: item.min_price, unit_max_price: item.max_price, total_min: item.min_price * item.qty, total_max: item.max_price * item.qty }));
    const { error: itemsError } = await db.from('budget_items').insert(items);
    if (itemsError) { toast('Presupuesto guardado, pero faltan sus servicios'); console.error(itemsError); } else { await logActivity('Presupuesto creado', `${code} · ${record.title}`, 'budget', data.id); toast('Presupuesto guardado en el historial'); }
    $('#budget-dialog').close();
    await fetchOperations();
    nav('budgets');
};

$('#budgets-list').onchange = async e => {
    const id = e.target.dataset.budgetStatus;
    if (!id) return;
    const status = e.target.value;
    const budget = budgets.find(item => item.id === id);
    const { error } = await db.from('budgets').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) { toast('No se pudo actualizar el estado'); return; }
    await logActivity(`Presupuesto ${statusLabel[status].toLowerCase()}`, `${budget?.code || ''} · ${budget?.title || ''}`, 'budget', id);
    if (status === 'approved' && budget) {
        const exists = projects.some(project => project.budget_id === id);
        if (!exists) {
            const { error: projectError } = await db.from('projects').insert({ budget_id: id, client_id: budget.client_id, title: budget.title, status: 'in_progress', start_date: new Date().toISOString().slice(0, 10), created_by: user.id });
            if (!projectError) await logActivity('Proyecto iniciado', `${budget.code} fue aprobado y pasó a ejecución.`, 'project', id);
        }
    }
    toast('Estado actualizado');
    await fetchOperations();
};

$('#projects-list').onchange = async e => {
    const id = e.target.dataset.projectStatus;
    if (!id) return;
    const status = e.target.value;
    const project = projects.find(item => item.id === id);
    const { error } = await db.from('projects').update({ status, completed_at: status === 'completed' ? new Date().toISOString() : null, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) { toast('No se pudo actualizar el proyecto'); return; }
    await logActivity(`Proyecto ${statusLabel[status].toLowerCase()}`, project?.title || '', 'project', id);
    toast('Estado del proyecto actualizado');
    await fetchOperations();
};

$('#catalog-list').onclick = async e => {
    const toggle = e.target.closest('[data-category-toggle]');
    if (toggle) {
        const category = toggle.dataset.categoryToggle;
        openCategories.has(category) ? openCategories.delete(category) : openCategories.add(category);
        renderCatalog();
        return;
    }
    const id = e.target.dataset.edit || e.target.dataset.delete;
    if (!id) return;
    
    if (e.target.dataset.edit) {
        openService(services.find(s => s.id === id));
    }
    if (e.target.dataset.delete && confirm('¿Eliminar este servicio de la base de datos de forma permanente?')) {
        const { error } = await db.from('services').delete().eq('id', id);
        if (error) {
            toast('Error al eliminar');
            console.error(error);
        } else {
            toast('Servicio eliminado');
            fetchServices();
        }
    }
};

$('#service-form').onsubmit = async e => {
    e.preventDefault();
    if (!isEditor) return;

    const id = $('#service-id').value;
    const data = {
        name: $('#service-name').value.trim(),
        category: $('#service-category').value.trim(),
        subcategory: $('#service-subcategory').value.trim(),
        min_price: +$('#service-min').value,
        max_price: +$('#service-max').value,
        unit: $('#service-unit').value,
        time_estimate: $('#service-time').value.trim(),
        description: $('#service-description').value.trim(),
        keywords: $('#service-keywords').value.split(',').map(x => x.trim().toLowerCase()).filter(Boolean)
    };

    if (data.max_price < data.min_price) {
        toast('El precio máximo debe ser mayor o igual al mínimo');
        return;
    }

    let response;
    if (id) {
        response = await db.from('services').update(data).eq('id', id);
    } else {
        data.id = `s${Date.now()}`;
        response = await db.from('services').insert([data]);
    }

    if (response.error) {
        toast('Error al guardar: ' + response.error.message);
        console.error(response.error);
    } else {
        $('#service-dialog').close();
        toast(id ? 'Servicio actualizado' : 'Servicio creado');
        fetchServices();
    }
};

$('#export-quote').onclick = () => {
    if (!quote.length) { toast('Agrega servicios antes de exportar'); return; }
    const min = quote.reduce((a, q) => a + q.min_price * q.qty, 0), max = quote.reduce((a, q) => a + q.max_price * q.qty, 0);
    const text = `HOME MPORIUM\nESTIMACIÓN PRELIMINAR\n\n${quote.map(q => `• ${q.name}: ${q.qty} ${q.unit} · ${money(q.min_price * q.qty)} – ${money(q.max_price * q.qty)}`).join('\n')}\n\nRANGO TOTAL: ${money(min)} – ${money(max)}\n\nValores orientativos en PEN. Sujeto a revisión técnica.`;
    navigator.clipboard?.writeText(text).then(() => toast('Resumen copiado al portapapeles')).catch(() => { prompt('Copia el resumen:', text) });
};

// Start: verificar sesión existente al cargar
(async () => {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
        await checkUserAndStart(session.user);
    }
})();
