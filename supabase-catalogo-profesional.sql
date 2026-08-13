-- HOME MPORIUM · catálogo profesional de arquitectura
-- Ejecutar UNA SOLA VEZ en Supabase > SQL Editor.
-- Reorganiza nombres de categorías y agrega servicios faltantes.
-- No elimina servicios ni presupuestos existentes.

-- 1. Normalizar categorías existentes.
update public.services set category = 'Diseño de espacios', subcategory = 'Diseño de interiores residencial'
where category = 'Diseño de interiores';

update public.services set category = 'Documentación técnica'
where category = 'Documentación';

update public.services set category = 'Trámites y regularización'
where category = 'Trámites';

update public.services set category = 'Obra y consultoría'
where category in ('Construcción y obra', 'Remodelación');

-- 2. Ajustar títulos para que la oferta quede explícita.
update public.services set name = 'Gestión de trámites municipales', category = 'Trámites y regularización', subcategory = 'Licencias municipales'
where name = 'Licencia de construcción';

update public.services set name = 'Regularización de inmuebles y planos', category = 'Trámites y regularización', subcategory = 'Regularizaciones'
where name = 'Regularización de planos';

update public.services set name = 'Metrados y presupuesto de obra', category = 'Documentación técnica', subcategory = 'Metrados y presupuestos'
where name = 'Presupuesto de obra';

update public.services set category = 'Obra y consultoría', subcategory = 'Supervisión de obra'
where name = 'Supervisión de obra';

update public.services set category = 'Obra y consultoría', subcategory = 'Consultoría arquitectónica'
where name = 'Visita y diagnóstico técnico';

update public.services set category = 'Diseño arquitectónico', subcategory = 'Visualización arquitectónica'
where name in ('Modelado 3D y visualización', 'Renders arquitectónicos');

update public.services set category = 'Diseño arquitectónico', subcategory = 'Vivienda nueva'
where name in ('Anteproyecto arquitectónico', 'Diseño arquitectónico completo');

update public.services set category = 'Documentación técnica', subcategory = 'Levantamientos arquitectónicos'
where name = 'Levantamiento arquitectónico';

update public.services set category = 'Documentación técnica', subcategory = 'Planos y documentación técnica'
where name = 'Planos técnicos y constructivos';

-- 3. Agregar los servicios que faltaban. Los valores son iniciales y editables desde la web.
insert into public.services (id, name, category, subcategory, min_price, max_price, unit, time_estimate, description, keywords)
select v.id, v.name, v.category, v.subcategory, v.min_price, v.max_price, v.unit, v.time_estimate, v.description, v.keywords
from (values
  ('hm-ampliacion-vivienda', 'Ampliación y remodelación de vivienda', 'Diseño arquitectónico', 'Ampliaciones', 65, 115, 'm²', '12–25 días', 'Diseño y documentación para ampliar, redistribuir o renovar una vivienda existente.', array['ampliación','ampliar','remodelación','vivienda','casa']::text[]),
  ('hm-vivienda-nueva', 'Diseño de vivienda nueva', 'Diseño arquitectónico', 'Vivienda nueva', 70, 130, 'm²', '15–30 días', 'Proyecto arquitectónico integral para vivienda nueva, desde la distribución hasta la documentación base.', array['vivienda nueva','casa nueva','construir casa','residencial']::text[]),
  ('hm-recorrido-virtual', 'Recorrido virtual arquitectónico', 'Diseño arquitectónico', 'Visualización arquitectónica', 900, 2400, 'proyecto', '4–8 días', 'Recorrido virtual para comunicar espacios, circulación y atmósfera del proyecto.', array['recorrido virtual','tour virtual','video 3d','animación']::text[]),
  ('hm-independizacion', 'Independización de unidades inmobiliarias', 'Trámites y regularización', 'Independizaciones', 1800, 4500, 'proyecto', '3–8 semanas', 'Documentación técnica y acompañamiento para independizar unidades de un inmueble.', array['independización','independizar','unidades','propiedad']::text[]),
  ('hm-declaratoria-fabrica', 'Declaratoria de fábrica', 'Trámites y regularización', 'Declaratoria de fábrica', 1500, 4200, 'proyecto', '3–7 semanas', 'Gestión documental y técnica para formalizar una edificación existente.', array['declaratoria','fábrica','formalización','inmueble']::text[]),
  ('hm-direccion-obra', 'Dirección de obra', 'Obra y consultoría', 'Dirección de obra', 1200, 3500, 'mes', 'Según obra', 'Dirección técnica y coordinación general para la ejecución del proyecto.', array['dirección de obra','director de obra','ejecución','construcción']::text[]),
  ('hm-consultoria-arquitectonica', 'Consultoría arquitectónica', 'Obra y consultoría', 'Consultoría arquitectónica', 250, 650, 'visita', '1–3 días', 'Asesoría profesional para evaluar alternativas, alcance, normativa y decisiones de proyecto.', array['consultoría','asesoría','arquitecto','consulta']::text[]),
  ('hm-evaluacion-inmueble', 'Evaluación técnica de inmuebles', 'Obra y consultoría', 'Evaluación de inmuebles', 350, 900, 'visita', '1–3 días', 'Revisión técnica preliminar del estado, riesgos y oportunidades de un inmueble.', array['evaluación','inmueble','diagnóstico','inspección','propiedad']::text[])
) as v(id, name, category, subcategory, min_price, max_price, unit, time_estimate, description, keywords)
where not exists (select 1 from public.services s where s.name = v.name);

-- 4. Definir el orden inicial de categorías y subcategorías.
-- Requiere haber ejecutado antes supabase-estructura-catalogo.sql.
insert into public.catalog_structure (kind, name, parent_name, sort_order)
values
  ('category', 'Diseño arquitectónico', '', 1),
  ('category', 'Diseño de espacios', '', 2),
  ('category', 'Documentación técnica', '', 3),
  ('category', 'Trámites y regularización', '', 4),
  ('category', 'Obra y consultoría', '', 5),
  ('subcategory', 'Vivienda nueva', 'Diseño arquitectónico', 1),
  ('subcategory', 'Ampliaciones', 'Diseño arquitectónico', 2),
  ('subcategory', 'Visualización arquitectónica', 'Diseño arquitectónico', 3),
  ('subcategory', 'Diseño de interiores residencial', 'Diseño de espacios', 1),
  ('subcategory', 'Diseño comercial', 'Diseño de espacios', 2),
  ('subcategory', 'Levantamientos arquitectónicos', 'Documentación técnica', 1),
  ('subcategory', 'Planos y documentación técnica', 'Documentación técnica', 2),
  ('subcategory', 'Metrados y presupuestos', 'Documentación técnica', 3),
  ('subcategory', 'Licencias municipales', 'Trámites y regularización', 1),
  ('subcategory', 'Regularizaciones', 'Trámites y regularización', 2),
  ('subcategory', 'Independizaciones', 'Trámites y regularización', 3),
  ('subcategory', 'Declaratoria de fábrica', 'Trámites y regularización', 4),
  ('subcategory', 'Supervisión de obra', 'Obra y consultoría', 1),
  ('subcategory', 'Dirección de obra', 'Obra y consultoría', 2),
  ('subcategory', 'Consultoría arquitectónica', 'Obra y consultoría', 3),
  ('subcategory', 'Evaluación de inmuebles', 'Obra y consultoría', 4)
on conflict (kind, name, parent_name) do update set sort_order = excluded.sort_order, updated_at = now();
