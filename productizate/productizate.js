/* Productízate · landing B2B del segundo cerebro (Soluciones Artificiales)
   Se sirve desde GitHub Pages (dvetencourt/sa-media/productizate) y se pinta dentro de la página de GHL
   solucionesartificiales.com/productizate con un solo bloque: <div id="pzhost"></div><script src=".../productizate.js"></script>
   Brandbook SA: papel, tinta, cobalto, coral; ventanas con barra cobalto, bordes y sombras sólidas, sin radios. */
(function () {
  if (window.__PZ_CARGADO) return; window.__PZ_CARGADO = true;

  var CFG = {
    PRECIO: true,        // Diego autorizó precio público solo en esta página (inst. desde USD 3.000) — confirmar
    NOMBRES: true,       // Diego, 18-oct: testimonios con nombre + Trustpilot + link a la lista de resultados
    FORM_ID: 'KCMtD2zwUa8HFxJJFnti', // «Productízate · Sí o No» → al enviar redirige al calendario «Llamada B2B» de Diego
    MEDIA: 'https://dvetencourt.github.io/sa-media/productizate/',
    VSL_A: 'productizate-vsl-oren.mp4',  // VSL HeyGen editado con Oren (versión A), aprobado por Diego 18-oct
    VSL_A_POSTER: 'productizate-vsl-oren-poster.jpg'
  };
  var SRC = (document.currentScript && document.currentScript.src) || '';
  if (/productizate\.js(\?.*)?$/.test(SRC)) CFG.MEDIA = SRC.replace(/productizate\.js(\?.*)?$/, '');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function win(titulo, cuerpo, extra) { return '<section class="win' + (extra ? ' ' + extra : '') + '"><div class="bar"><span>' + titulo + '</span><i aria-hidden="true"><b></b><b></b></i></div><div class="body">' + cuerpo + '</div></section>'; }

  var CSS = '#pz{--papel:#fffaf2;--blanco:#fff;--tinta:#202329;--cobalto:#234ddb;--coral:#bc442c;--azulp:#dce5ff;--coralp:#ffe3d9;--gris:#505966;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:var(--papel);color:var(--tinta);min-height:100vh;width:100vw;position:relative;left:50%;margin-left:-50vw;overflow-x:hidden;line-height:1.5}' +
    '#pz h1,#pz h2,#pz h3{font-family:inherit;font-weight:800;color:var(--tinta);text-transform:none}#pz a{font-family:inherit}' +
    '#pz *{box-sizing:border-box}#pz p{margin:0}#pz .wrap{max-width:1040px;margin:0 auto;padding:18px 16px 72px}' +
    '#pz .top{display:flex;justify-content:space-between;align-items:center;gap:12px}' +
    '#pz .brand{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:6px 12px 6px 6px;border:2px solid var(--tinta);background:var(--blanco);box-shadow:4px 4px 0 var(--tinta);text-decoration:none;color:var(--tinta);font:700 11px/1.05 "Courier New",monospace;text-transform:uppercase;letter-spacing:.04em}' +
    '#pz .mark{width:34px;height:34px;display:grid;place-items:center;border:2px solid var(--tinta);background:var(--coral);color:#fff;font:700 14px "Courier New",monospace}' +
    '#pz .ceja{display:inline-block;font:700 12px "Courier New",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}' +
    '#pz h1{font-size:clamp(36px,4.9vw,62px);line-height:1.04;margin:12px 0 16px;text-wrap:balance;letter-spacing:-.01em}#pz h1 em{font-style:normal;background:var(--azulp);padding:0 .12em;box-shadow:inset 0 -.12em 0 var(--cobalto)}' +
    '#pz h2{font-size:clamp(28px,3.6vw,44px);line-height:1.1;margin:0 0 14px;text-wrap:balance}#pz h3{font-size:21px;line-height:1.2;margin:0 0 6px}' +
    '#pz .sub{font-size:clamp(18px,1.9vw,21px);color:var(--gris);max-width:34ch}' +
    '#pz .btn{display:inline-block;min-height:56px;border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-size:19px;font-weight:700;cursor:pointer;box-shadow:5px 5px 0 var(--tinta);text-align:center;text-decoration:none;padding:15px 26px;transition:transform .15s ease-out,box-shadow .15s ease-out}' +
    '#pz .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--tinta)}#pz .btn.sec{background:var(--blanco);color:var(--tinta)}#pz .btn.chico{min-height:44px;font-size:15px;padding:10px 16px;box-shadow:4px 4px 0 var(--tinta)}' +
    '#pz .hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:40px;align-items:center;margin-top:36px;animation:pzin .55s ease-out both}' +
    '#pz .hero .acc{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:26px}#pz .hero .nota{font:700 12px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--gris)}' +
    '#pz .win{background:var(--blanco);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta)}' +
    '#pz .bar{display:flex;justify-content:space-between;align-items:center;gap:10px;background:var(--cobalto);color:#fff;font:700 12px "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase;padding:8px 14px;border-bottom:2px solid var(--tinta)}' +
    '#pz .bar i{display:inline-flex;gap:5px}#pz .bar i b{width:9px;height:9px;border:2px solid #fff;display:block}#pz .body{padding:20px 20px}' +
    '#pz .vwin{max-width:380px;justify-self:center;width:100%;box-shadow:10px 10px 0 var(--azulp),10px 10px 0 2px var(--tinta)}#pz .vwin .body{padding:0;background:#000}' +
    '#pz .vwin video{display:block;width:100%;aspect-ratio:9/16;background:#000;object-fit:cover}#pz .vwin.vancho{max-width:none}#pz .vwin video.ancho{aspect-ratio:16/9;object-fit:contain}#pz .hero.heroancho{grid-template-columns:minmax(0,1fr)}' +
    '#pz section.blq{margin-top:84px}#pz .intro{font-size:19px;color:var(--gris);max-width:60ch;margin-bottom:22px}' +
    '#pz ul.lista{margin:0;padding:0;list-style:none}#pz ul.lista li{padding:12px 0 12px 30px;position:relative;font-size:19px;line-height:1.45;border-bottom:1px dashed #d7d2c8}#pz ul.lista li:last-child{border-bottom:0}#pz ul.lista li:before{content:"→";position:absolute;left:0;color:var(--cobalto);font-weight:700}' +
    '#pz .dos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;align-items:start}#pz .tres{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}' +
    '#pz .tres .win{box-shadow:6px 6px 0 var(--tinta)}#pz .tres p,#pz .dos .win p{font-size:17px;color:var(--gris)}' +
    '#pz .num{font:700 13px "Courier New",monospace;color:var(--coral);letter-spacing:.08em;display:block;margin-bottom:8px}' +
    '#pz .cita{border-left:4px solid var(--cobalto);padding:4px 0 4px 18px;margin-top:22px}#pz .cita .f{font-size:clamp(20px,2.2vw,25px);font-weight:700;line-height:1.3}#pz .cita .q{font:700 12px/1.5 "Courier New",monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--gris);margin-top:8px}' +
    '#pz .voz{background:var(--coralp);border:2px solid var(--tinta);padding:16px 18px;box-shadow:5px 5px 0 var(--tinta)}#pz .voz .f{font-size:19px;font-weight:700;line-height:1.35}#pz .voz .q{font:700 11px/1.5 "Courier New",monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--gris);margin-top:8px}' +
    '#pz .caso .quien{font:700 12px/1.5 "Courier New",monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--coral);margin-bottom:10px}#pz .caso .f{font-size:22px;font-weight:700;line-height:1.3;margin:10px 0}#pz .caso p{font-size:17px;color:var(--gris);margin-top:8px}' +
    '#pz .tp{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;background:var(--blanco);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);padding:20px;text-decoration:none;color:var(--tinta);transition:transform .15s ease-out,box-shadow .15s ease-out}#pz .tp:hover{transform:translate(-2px,-2px);box-shadow:10px 10px 0 var(--tinta)}#pz .tpl{display:grid;gap:4px}#pz .tpe{color:#00b67a;font-size:24px;letter-spacing:2px}#pz .tp b{font-size:22px}#pz .tp small{font-size:16px;color:var(--gris)}#pz .tpb{border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-weight:700;padding:12px 18px;box-shadow:4px 4px 0 var(--tinta)}' +
    '#pz .cuatro{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}#pz .cuatro .win{box-shadow:6px 6px 0 var(--tinta)}#pz .cuatro p,#pz .pasos p{font-size:17px;color:var(--gris)}#pz .pasos{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}#pz .pasos .win{box-shadow:6px 6px 0 var(--tinta)}' +
    '#pz .tabla{overflow-x:auto;border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);background:var(--blanco)}#pz table{border-collapse:collapse;width:100%;min-width:560px}#pz th{background:var(--cobalto);color:#fff;font:700 12px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;text-align:left;padding:10px 14px}#pz td{padding:14px;border-top:1px dashed #d7d2c8;font-size:16px;vertical-align:top}#pz td:nth-child(2){color:var(--gris)}@media (max-width:600px){#pz .tabla{overflow:visible;border:0;box-shadow:none;background:transparent}#pz table{min-width:0}#pz thead{display:none}#pz tbody,#pz tr,#pz td{display:block}#pz tr{background:var(--blanco);border:2px solid var(--tinta);box-shadow:5px 5px 0 var(--tinta);margin-bottom:16px;padding:6px 0}#pz td{border:0;padding:6px 14px}#pz td:before{content:attr(data-label);display:block;font:700 11px \"Courier New\",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--coral);margin-bottom:2px}#pz td:first-child:before{display:none}#pz td:first-child{font-size:18px;border-bottom:1px dashed #d7d2c8;padding-bottom:10px}}' +
    '#pz .faq{display:grid;gap:14px}#pz details{background:var(--blanco);border:2px solid var(--tinta);box-shadow:5px 5px 0 var(--tinta)}#pz summary{cursor:pointer;padding:16px 18px;font-size:18px;font-weight:700;list-style:none}#pz summary::-webkit-details-marker{display:none}#pz summary:after{content:"+";float:right;color:var(--cobalto);font-weight:800}#pz details[open] summary:after{content:"–"}#pz details p{padding:0 18px 18px;font-size:17px;color:var(--gris);margin:0}' +
    '@media (max-width:860px){#pz .cuatro,#pz .pasos{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:520px){#pz .cuatro,#pz .pasos{grid-template-columns:minmax(0,1fr)}}' +
    '#pz .precio{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;margin:4px 0 10px}#pz .precio b{font-size:clamp(40px,5vw,58px);line-height:1;letter-spacing:-.02em}#pz .precio span{font:700 13px "Courier New",monospace;text-transform:uppercase;letter-spacing:.06em;color:var(--gris)}' +
    '#pz .form .body{padding:8px}#pz .form iframe{display:block;width:100%;min-height:760px;border:0}' +
    '#pz .final{margin-top:84px;text-align:center}#pz .final h2{margin-bottom:22px}' +
    '#pz .pie{margin-top:56px;padding-top:18px;border-top:2px solid var(--tinta);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font:700 12px "Courier New",monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--gris)}' +
    '@keyframes pzin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){#pz .hero{animation:none}#pz .btn{transition:none}}' +
    '@media (max-width:860px){#pz .hero{grid-template-columns:minmax(0,1fr);gap:30px;margin-top:26px}#pz .vwin{max-width:330px}#pz .tres,#pz .dos{grid-template-columns:minmax(0,1fr)}#pz section.blq{margin-top:64px}}' +
    '@media (max-width:520px){#pz .top .btn{display:none}#pz .hero .btn{width:100%}#pz .body{padding:18px 16px}#pz ul.lista li{font-size:18px}}';

  var T = { b: 'Violeta Parilli · su sistema se monta en sesiones en vivo con Diego desde el 7 de octubre' };

  // Prueba A/B (Diego, 18-oct): A = VSL de HeyGen editado con Oren · B = animación «Un solo tú».
  // ?v=a / ?v=b fuerza la versión. Mientras CFG.VSL_A esté vacío, todos ven B.
  var VAR = (function () {
    if (!CFG.VSL_A) return 'b';
    var q = (new URLSearchParams(location.search).get('v') || '').toLowerCase();
    if (q === 'a' || q === 'b') return q;
    var g = null; try { g = localStorage.getItem('pz_v'); } catch (e) { }
    if (g !== 'a' && g !== 'b') { g = Math.random() < 0.5 ? 'a' : 'b'; try { localStorage.setItem('pz_v', g); } catch (e) { } }
    return g;
  })();
  var VIDEO = VAR === 'a'
    ? win('Diego · 1 minuto', '<video class="ancho" src="' + CFG.MEDIA + CFG.VSL_A + '" poster="' + CFG.MEDIA + CFG.VSL_A_POSTER + '" controls playsinline preload="metadata" aria-label="Video de Diego: qué es productizarte"></video>', 'vwin vancho')
    : win('Un solo tú · 24 s', '<video src="' + CFG.MEDIA + 'productizate-animacion.mp4" poster="' + CFG.MEDIA + 'productizate-animacion-poster.jpg" autoplay muted loop playsinline preload="auto" aria-label="Animación: un solo tú que nunca se detiene"></video>', 'vwin');

  var html =
    '<div class="wrap">' +
    '<header class="top"><a class="brand" href="https://solucionesartificiales.com/" aria-label="Soluciones Artificiales, inicio"><span class="mark">SA</span><span>Soluciones<br>Artificiales</span></a><a class="btn chico" href="#llamada">Solicitar mi llamada</a></header>' +

    '<div class="hero' + (VAR === 'a' ? ' heroancho' : '') + '"><div>' +
      '<span class="ceja">Productízate · para dueños de negocio</span>' +
      '<h1>Tu propia agencia, <em>instalada</em> en tu negocio.</h1>' +
      '<p class="sub">Convertimos lo que sabes en un equipo de inteligencia artificial que vende, responde y publica por ti. Sin aprender tecnología. Sin depender de nadie, ni de mí.</p>' +
      '<div class="acc"><a class="btn" href="#llamada">Quiero mi segundo cerebro</a></div>' +
      '<p class="nota" style="margin-top:14px">Para profesionales que venden lo que saben y para empresas</p>' +
    '</div>' + VIDEO + '</div>' +

    '<section class="blq"><span class="ceja">El problema</span><h2>Tu negocio funciona. Mientras tú estés encima.</h2>' +
      '<div class="dos">' +
        win('¿Te suena?', '<ul class="lista"><li>Tu agenda se llena de referidos, pero gente nueva casi no llega.</li><li>Escribes tú, respondes tú, vendes tú.</li><li>Le pagaste a una agencia, a un curso o a un asistente, y otra vez terminaste haciéndolo tú.</li><li>Todo lo que sabes vive en tu cabeza. Solo trabaja cuando estás despierto.</li></ul>') +
        '<div style="display:grid;gap:22px">' +
          '<div class="voz"><p class="f">«Para que venga gente nueva me cuesta más.»</p><p class="q">Susana Wise · psicóloga clínica, práctica privada online</p></div>' +
          '<div class="voz"><p class="f">«Con diferentes agencias… hay un factor común y soy yo, quizás soy yo.»</p><p class="q">Susana Wise, en su llamada con Diego</p></div>' +
          '<div class="voz"><p class="f">«No tienes idea la cantidad de horas que he gastado.»</p><p class="q">Patrizia Cuggionni · coach</p></div>' +
        '</div>' +
      '</div></section>' +

    '<section class="blq"><span class="ceja">Por qué esto existe</span><h2>La gente no necesita aprender. Necesita agencia propia.</h2>' +
      '<div class="dos">' +
        '<div><p class="intro">Diego tuvo una agencia de automatización y una academia de inteligencia artificial. De las 534 personas que compraron su formación, solo 50 viven hoy de esto. No era falta de ganas: nadie tiene tiempo de aprenderlo todo encima de manejar su negocio.</p>' +
        '<p class="intro">Así que comprimió cuatro años de agencia y de clases en un equipo de agentes que se instala en tu negocio y trabaja contigo desde el primer día.</p></div>' +
        '<div class="cita" style="margin-top:0"><p class="f">«No contratar una agencia, sino agencia propia de poder hacerlo todo tú.»</p><p class="q">Diego Vetencourt</p></div>' +
      '</div></section>' +

    '<section class="blq"><span class="ceja">Qué no es</span><h2>No es lo que ya probaste.</h2>' +
      '<div class="cuatro">' +
        win('No es una agencia', '<p>No pagas un retainer para esperar resultados que no ves. Lo que se instala lo manejas tú.</p>') +
        win('No es un curso', '<p>No te pide ver clases. El equipo hace el trabajo contigo.</p>') +
        win('No es un diagnóstico de un mes', '<p>Sales de la primera sesión con todo instalado y andando.</p>') +
        win('No es un contrato', '<p>No dependes de Diego. «Esto es tuyo»: tu información y tu sistema.</p>') +
      '</div></section>' +

    '<section class="blq"><span class="ceja">Cómo funciona</span><h2>Una sesión para instalarlo. Tu negocio, de ahí en adelante.</h2>' +
      '<div class="pasos">' +
        win('Paso 1 · 1 hora en vivo', '<h3>Instalamos tu equipo</h3><p>Nos conectamos contigo y dejamos instalado tu segundo cerebro: cuatro años de agencia convertidos en habilidades listas para trabajar.</p>') +
        win('Paso 2 · a tu ritmo', '<h3>Te entrevista para conocerte</h3><p>No escribes nada: le hablas. Tu historia, tus clientes, tu forma de vender, lo que quieres lograr. Es privado y queda solo para ti.</p>') +
        win('Paso 3 · segunda sesión', '<h3>Armamos tu equipo y tu plan</h3><p>Contenido, anuncios, embudos, ventas y seguimiento. Cada uno con su tarea y con tus reglas.</p>') +
        win('Todos los días', '<h3>Te dice qué hacer y lo ejecuta contigo</h3><p>Cada mañana te deja las tareas del día. Responde, da seguimiento y publica a su hora. Y te reta cuando una idea no se sostiene.</p>') +
      '</div></section>' +

    '<section class="blq"><span class="ceja">Antes y después</span><h2>Lo que cambia en cada parte de tu negocio.</h2>' +
      '<div class="tabla"><table><thead><tr><th>Proceso</th><th>Hoy</th><th>Con tu segundo cerebro</th></tr></thead><tbody>' +
        '<tr><td data-label="Proceso"><b>Clientes nuevos</b></td><td data-label="Hoy">Dependes de referidos y del boca a boca.</td><td data-label="Con tu segundo cerebro">Anuncios y prospección corriendo cada día, con tu mensaje.</td></tr>' +
        '<tr><td data-label="Proceso"><b>Contenido</b></td><td data-label="Hoy">Publicas cuando te da tiempo, o no publicas.</td><td data-label="Con tu segundo cerebro">Piezas en tu voz, programadas semana tras semana.</td></tr>' +
        '<tr><td data-label="Proceso"><b>Seguimiento</b></td><td data-label="Hoy">Mensajes que se enfrían en Instagram y WhatsApp.</td><td data-label="Con tu segundo cerebro">Nadie se queda sin respuesta: responde y agenda a su hora.</td></tr>' +
        '<tr><td data-label="Proceso"><b>Embudo y página</b></td><td data-label="Hoy">Una agencia te cotiza miles y tarda semanas.</td><td data-label="Con tu segundo cerebro">Tu página, tu embudo y tus recordatorios, armados con tu equipo.</td></tr>' +
        '<tr><td data-label="Proceso"><b>Tus decisiones</b></td><td data-label="Hoy">Decides solo, con lo que te dice tu instinto.</td><td data-label="Con tu segundo cerebro">Asesores con datos reales de otros negocios que te discuten antes de decidir.</td></tr>' +
      '</tbody></table></div></section>' +

    '<section class="blq"><span class="ceja">Qué incluye</span><h2>Todo lo que hace falta para que trabaje por ti.</h2>' +
      win('Tu instalación', '<ul class="lista"><li><b>Tu segundo cerebro:</b> cuatro años de agencia y de clases convertidos en habilidades.</li><li><b>Tu equipo de agentes:</b> contenido, anuncios, embudos, ventas y seguimiento.</li><li><b>Tus asesores:</b> la experiencia real de otros negocios para retar tus ideas.</li><li><b>Tareas programadas:</b> trabajo que se hace solo, a su hora, todos los días.</li><li><b>USD 1.500 en créditos de inteligencia artificial</b> para empezar sin gastar en uso.</li><li><b>Tu CRM incluido</b> para tus contactos, agendas y recordatorios.</li><li><b>Dos sesiones en vivo con seguimiento</b>, y la comunidad de los miércoles para no quedarte atrás.</li></ul>') +
    '</section>' +

    '<section class="blq"><span class="ceja">Resultados reales</span><h2>Lo que pasa cuando ya está instalado.</h2>' +
      '<div class="dos">' +
        win('Psicoterapeuta · programa posparto', '<div class="caso"><p class="quien">Violeta Parilli · su sistema se monta en sesiones en vivo con Diego</p><p>Una agencia le cotizó <b>USD 5.500 recurrentes</b> por su proyecto. Su equipo de agentes se lo entregó <b>en una hora</b>.</p><p class="f">«Diego, yo no te puedo explicar de verdad lo que ha sido esto.»</p><p>«Yo sé que ni siquiera lo hemos terminado de montar, pero es que te tengo que contar.» Y una semana después: «Diego, he hecho tantas cosas.»</p></div>') +
        win('Clínica de cirugía estética · Venezuela', '<div class="caso"><p class="quien">José Luis · reseña pública en Trustpilot</p><p>«Necesitábamos que los leads se asignaran solos a las asesoras de preventa, que pasaran limpiamente a posventa al cerrar la venta y que se repartieran de forma equitativa.»</p><p class="f">«El equipo comercial ahora trabaja más organizado y con menos tareas manuales.»</p></div>') +
        win('Empresa · Estados Unidos', '<div class="caso"><p class="quien">Adam Stramwasser · reseña pública en Trustpilot</p><p class="f">«Trabajar con Diego y su equipo fue realmente impactante para nuestro negocio.»</p><p>«No solo por el poder de las soluciones sino la perspectiva estratégica que nos dieron del negocio en general.»</p></div>') +
        win('Caso cero · nuestro propio negocio', '<div class="caso"><p class="quien">Soluciones Artificiales · así opera hoy</p><p class="f">Lo que te instalamos es lo mismo que usamos.</p><p>Los agentes responden los WhatsApp, le escriben a cada persona que se registra, le dan seguimiento hasta la llamada y le arman a Diego el reporte del día.</p></div>') +
      '</div>' +
      '<a class="tp" style="margin-top:34px" href="https://www.trustpilot.com/review/solucionesartificiales.com" target="_blank" rel="noopener"><span class="tpl"><span class="tpe">★ ★ ★ ★ ★</span><b>Todas las reseñas en Trustpilot</b><small>Clientes y alumnos de Diego, sin filtro. Ábrelas y léelas tú.</small></span><span class="tpb">Ver reseñas →</span></a>' +
      '<p style="margin-top:26px"><a class="btn sec" href="https://solucionesartificiales.com/resultados" target="_blank" rel="noopener">Ver la lista de resultados →</a></p>' +
    '</section>' +

    '<section class="blq"><span class="ceja">Por qué vale la inversión</span><h2>No compras una herramienta. Recuperas tu tiempo.</h2>' +
      '<div class="dos">' +
        win('Autonomía desde el día uno', '<h3>Tu negocio deja de depender de que estés encima</h3><p>Desde la primera sesión, lo que solo tú sabías queda trabajando aunque no estés. Y es tuyo.</p>') +
        win('Más ingresos', '<h3>Ningún cliente se queda sin respuesta</h3><p>Responde, da seguimiento y agenda a su hora, también de noche y el fin de semana. Las ventas que hoy se escapan por no contestar a tiempo, dejan de escaparse.</p>') +
        win('Menos costos', '<h3>Menos agencias, menos tareas manuales</h3><p>Lo que hoy le pagas a otros o haces tú a mano, lo hace tu equipo. Tu gente se dedica a lo que solo una persona puede hacer.</p>') +
        win('Te cambia la vida', '<h3>Te vas y el otro tú sigue trabajando</h3><p>Viajas, descansas o te dedicas a tus clientes, y tu negocio no se apaga. Esa es la libertad que se compra aquí.</p>') +
      '</div>' +
      (CFG.PRECIO ? '<div style="margin-top:34px">' + win('Cuánto cuesta', '<div class="precio"><b>USD 3.000</b><span>la instalación arranca en</span></div><p style="font-size:18px;color:var(--gris);max-width:60ch">El monto exacto depende de tu negocio y lo defines en la llamada, antes de empezar. Sin sorpresas después.</p>') + '</div>' : '') +
    '</section>' +

    '<section class="blq"><span class="ceja">Preguntas de verdad</span><h2>Lo que nos preguntan antes de empezar.</h2>' +
      '<div class="faq">' +
        '<details><summary>No sé nada de tecnología. ¿Esto es para mí?</summary><p>Sí. Como dijo Violeta: «yo de tecnología no sé, pero no tengo por qué saber». La instalación la hacemos contigo, en vivo, y después le hablas a tu equipo como le hablarías a una persona.</p></details>' +
        '<details><summary>No tengo tiempo.</summary><p>Por eso existe. No hay clases que ver: necesitas una hora para la instalación y después le dictas, no le escribes. El trabajo lo hace tu equipo.</p></details>' +
        '<details><summary>¿Qué pasa con mi información?</summary><p>Vive en tu computadora y es tuya. Diego no tiene acceso a tu entrevista ni a tus datos. Tú decides a qué le das acceso.</p></details>' +
        '<details><summary>¿Y cuando la inteligencia artificial cambie?</summary><p>Tu equipo se actualiza, y todos los miércoles nos reunimos con la comunidad para ver qué cambió y qué hacer.</p></details>' +
        '<details><summary>¿Qué necesito para la instalación?</summary><p>Una computadora, una hora y ganas de que tu negocio deje de depender de ti. Lo demás lo ponemos nosotros.</p></details>' +
        '<details><summary>Tengo una empresa, no soy un profesional independiente.</summary><p>También aplica. En empresas empezamos por el proceso que más frena el crecimiento y lo mostramos antes y después, en tus propios números.</p></details>' +
      '</div></section>' +

    '<section class="blq" id="llamada"><span class="ceja">Siguiente paso</span><h2>¿Te lo instalamos?</h2>' +
      '<p class="intro">Respóndeme sí o no. Si tiene sentido para tu negocio, eliges tu hora en el paso siguiente y vemos juntos qué instalar primero. Si no lo tiene, te lo decimos.</p>' +
      win('Solicitar mi llamada', '<iframe src="https://api.leadconnectorhq.com/widget/form/' + CFG.FORM_ID + '?utm_source=productizate&utm_content=version-' + VAR + '" id="inline-' + CFG.FORM_ID + '" data-layout="{\'id\':\'INLINE\'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Productízate · Sí o No" data-height="760" data-layout-iframe-id="inline-' + CFG.FORM_ID + '" data-form-id="' + CFG.FORM_ID + '" title="Productízate · Sí o No"></iframe>', 'form') +
    '</section>' +

    '<div class="final"><h2>Tu negocio, trabajando sin ti encima.</h2><a class="btn" href="#llamada">Quiero mi segundo cerebro</a></div>' +
    '<footer class="pie"><span>Productízate es un servicio de Soluciones Artificiales</span><span>Diego Vetencourt</span></footer>' +
    '</div>';

  /* Píxel SA: usa el de la página; si no está, lo carga (sin duplicar). */
  function pixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '706725165238205'); window.fbq('track', 'PageView');
  }
  function fbv(nombre) { try { pixel(); window.fbq('trackCustom', nombre, { version: VAR }); } catch (e) { } }
  function montar() {
    var host = document.getElementById('pzhost');
    if (!host) { host = document.createElement('div'); host.id = 'pzhost'; document.body.insertBefore(host, document.body.firstChild); }
    if (document.getElementById('pz')) return;
    var st = document.createElement('style'); st.textContent = CSS + 'html,body{background:#fffaf2!important}'; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'pz'; d.setAttribute('data-version', VAR); d.innerHTML = html; host.appendChild(d);
    try { document.title = 'Productízate | Tu negocio trabajando sin ti encima'; } catch (e) { }
    var s = document.createElement('script'); s.src = 'https://link.msgsndr.com/js/form_embed.js'; s.async = true; document.body.appendChild(s);
    fbv('PZ_Version');
    var v = d.querySelector('video'); if (v) { if (VAR === 'b') { try { var pr = v.play(); if (pr && pr.catch) pr.catch(function () { }); } catch (e) { } } else v.addEventListener('play', function () { fbv('PZ_VideoPlay'); }, { once: true }); }
    d.querySelectorAll('a[href="#llamada"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); fbv('PZ_ClicLlamada'); document.getElementById('llamada').scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });
  }
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
