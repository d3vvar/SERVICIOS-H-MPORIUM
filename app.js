const supabaseUrl = 'https://wkpxmvemcgkrydldquwl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcHhtdmVtY2drcnlkbGRxdXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2Mjk2MjIsImV4cCI6MjEwMjIwNTYyMn0.OPEUy-TjYFG-Xq-a62LS-hgc75eZAHAFUg9wFPR_efA';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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

const money = v => new Intl.NumberFormat('es-PE', {style: 'currency', currency: 'PEN', maximumFractionDigits: 0}).format(v);
const saveQuote = () => localStorage.setItem('hm-quote', JSON.stringify(quote));

function toast(msg) {
    const e = $('#toast');
    e.textContent = msg;
    e.classList.add('show');
    setTimeout(() => e.classList.remove('show'), 2600);
}

function categories() {
    return [...new Set(services.map(s => s.category))].sort();
}

function setupCatalogOptions() {
    const opts = categories().map(c => `<option value="${c}">`).join('');
    const subs = [...new Set(services.map(s => s.subcategory).filter(Boolean))].sort().map(s => `<option value="${s}">`).join('');
    $('#category-options').innerHTML = opts;
    $('#subcategory-options').innerHTML = subs;
    $('#category-filter').innerHTML = '<option value="">Todas las categorías</option>' + categories().map(c => `<option>${c}</option>`).join('');
}

function renderDashboard() {
    $('#metric-services').textContent = services.length;
    $('#metric-categories').textContent = categories().length;
    const total = quote.reduce((a, q) => a + q.min_price * q.qty, 0);
    $('#metric-total').textContent = money(total);
    $('#metric-items').textContent = quote.length ? `${quote.length} servicio${quote.length !== 1 ? 's' : ''} seleccionado${quote.length !== 1 ? 's' : ''}` : 'sin servicios seleccionados';
    $('#featured-services').innerHTML = services.slice(0, 6).map(card).join('');
}

function card(s) {
    return `<article class="service-card"><span class="category">${s.category.toUpperCase()}</span><h4>${s.name}</h4><p>${s.description}</p><footer><b>${money(s.min_price)} – ${money(s.max_price)}</b><span>por ${s.unit}</span></footer></article>`;
}

function renderCatalog() {
    const query = $('#catalog-search').value.toLowerCase();
    const cat = $('#category-filter').value;
    const filtered = services.filter(s => !cat || s.category === cat).filter(s => [s.name, s.category, s.subcategory || '', s.description, ...(s.keywords || [])].join(' ').toLowerCase().includes(query));
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
        const content = Object.entries(bySub).map(([sub, subitems]) => `${sub ? `<div class="subcategory-heading"><span>${sub}</span><small>${subitems.length} servicio${subitems.length !== 1 ? 's' : ''}</small></div>` : ''}${subitems.map(row).join('')}`).join('');
        return `<section class="category-group ${expanded ? 'expanded' : ''}"><button class="category-toggle" data-category-toggle="${category}" aria-expanded="${expanded}"><span><small>ÁREA DE SERVICIO</small><b>${category}</b></span><em>${items.length} servicio${items.length !== 1 ? 's' : ''}</em><i>⌄</i></button><div class="category-services">${content}</div></section>`;
    }).join('');
}

function nav(view) {
    $$('.page').forEach(e => e.classList.remove('active-page'));
    $(`#${view}`).classList.add('active-page');
    $$('.nav-link').forEach(e => e.classList.toggle('active', e.dataset.view === view));
    const titles = { dashboard: 'Buenos días', catalog: 'Catálogo de servicios', estimate: 'Analizar una necesidad', quote: 'Estimación actual' };
    $('#page-title').textContent = titles[view];
    $('.sidebar').classList.remove('open');
    if (view === 'catalog') renderCatalog();
    if (view === 'quote') renderQuote();
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
    const { data, error } = await supabase.from('services').select('*').order('name');
    if (error) {
        toast('Error cargando catálogo');
        console.error(error);
        return;
    }
    
    // Si la BD está vacía y somos editores, migramos los datos locales iniciales
    if (data.length === 0 && isEditor) {
        const { error: insertError } = await supabase.from('services').insert(initialDataToMigrate);
        if (!insertError) {
            toast('Catálogo base migrado a Supabase');
            return fetchServices(); // Volver a consultar
        }
    }
    
    services = data;
    setupCatalogOptions();
    renderDashboard();
    renderCatalog();
    renderQuote();
}

// Authentication
$('#login-form').onsubmit = async e => {
    e.preventDefault();
    const email = $('#login-email').value.trim();
    const password = $('#login-password').value;
    
    $('#login-error').textContent = 'Conectando...';
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        $('#login-error').textContent = 'Credenciales incorrectas o error de conexión.';
        return;
    }
    await checkUserAndStart(data.user);
};

$('#visitor-btn').onclick = async () => {
    await supabase.auth.signOut();
    await checkUserAndStart(null);
};

async function checkUserAndStart(authUser) {
    user = authUser;
    isEditor = false;

    if (user) {
        const { data } = await supabase.from('editor_profiles').select('role').eq('user_id', user.id).single();
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
    
    fetchServices();

    // Suscripción Realtime
    supabase
      .channel('public:services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, payload => {
          fetchServices(); // Recargar todo de manera simple
      })
      .subscribe();
}

// UI Event Listeners
$$('.nav-link').forEach(e => e.onclick = () => nav(e.dataset.view));
$$('[data-go]').forEach(e => e.onclick = () => nav(e.dataset.go));
$('#catalog-search').oninput = renderCatalog;
$('#category-filter').onchange = renderCatalog;
$('#add-service').onclick = () => openService();
$('#analyze-button').onclick = analyze;
$('#mobile-menu').onclick = () => $('.sidebar').classList.toggle('open');
$('#logout-button').onclick = async () => {
    await supabase.auth.signOut();
    location.reload();
};
$('#theme-button').onclick = () => document.body.classList.toggle('dark');

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
        const { error } = await supabase.from('services').delete().eq('id', id);
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
        response = await supabase.from('services').update(data).eq('id', id);
    } else {
        data.id = `s${Date.now()}`;
        response = await supabase.from('services').insert([data]);
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

// Start
(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        await checkUserAndStart(session.user);
    }
})();
