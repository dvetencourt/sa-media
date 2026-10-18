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
    VSL_A: '',          // VSL de HeyGen editado con Oren (versión A): se llena cuando Diego lo aprueba
    VSL_A_POSTER: ''
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
    ? win('Diego · el video completo', '<video class="ancho" src="' + CFG.VSL_A + '" poster="' + CFG.VSL_A_POSTER + '" controls playsinline preload="metadata" aria-label="Video de Diego: qué es productizarte"></video>', 'vwin vancho')
    : win('Un solo tú · 24 s', '<video src="' + CFG.MEDIA + 'productizate-animacion.mp4" poster="' + CFG.MEDIA + 'productizate-animacion-poster.jpg" autoplay muted loop playsinline preload="auto" aria-label="Animación: un solo tú que nunca se detiene"></video>', 'vwin');

  var html =
    '<div class="wrap">' +
    '<header class="top"><a class="brand" href="https://solucionesartificiales.com/" aria-label="Soluciones Artificiales, inicio"><span class="mark">SA</span><span>Soluciones<br>Artificiales</span></a><a class="btn chico" href="#llamada">Solicitar mi llamada</a></header>' +

    '<div class="hero' + (VAR === 'a' ? ' heroancho' : '') + '"><div>' +
      '<span class="ceja">Productízate · para dueños de negocio</span>' +
      '<h1>Te instalamos <em>a ti</em> en una inteligencia artificial.</h1>' +
      '<p class="sub">Lo que sabes de tu negocio sale de tu cabeza y queda trabajando con tus reglas, a su hora. Aunque tú no estés.</p>' +
      '<div class="acc"><a class="btn" href="#llamada">Quiero mi segundo cerebro</a></div>' +
    '</div>' + VIDEO + '</div>' +

    '<section class="blq"><span class="ceja">El problema</span><h2>Si tú no estás, tu negocio se apaga.</h2>' +
      '<div class="dos">' +
        win('¿Te pasa esto?', '<ul class="lista"><li>Si tú no estás, nada se mueve.</li><li>Escribes tú, respondes tú, vendes tú.</li><li>Tu equipo no piensa como tú y no tienes a nadie que te rete.</li><li>Todo lo que sabes vive en tu memoria. Solo funciona cuando estás despierto.</li></ul>') +
        '<div style="display:grid;gap:22px">' +
          '<div class="voz"><p class="f">«Yo escribo todo, yo escribo todo.»</p><p class="q">Susana Wise · psicóloga con práctica privada online</p></div>' +
          '<div class="voz"><p class="f">«Ha sido muy pesado vender los cursos. Muy pesado.»</p><p class="q">Susana Wise, en su llamada con Diego</p></div>' +
        '</div>' +
      '</div></section>' +

    '<section class="blq"><span class="ceja">Qué es</span><h2>Un segundo cerebro. Uno solo: tú.</h2>' +
      '<p class="intro">No son mil versiones de ti ni una colección de herramientas. Es tu forma de pensar, de vender y de decidir, instalada y trabajando sin que se lo pidas.</p>' +
      '<div class="tres">' +
        win('01 · Piensa', '<h3>Piensa como tú</h3><p>Tus decisiones, tus reglas, tu forma de vender. Le preguntas lo que sea y te responde como tú.</p>') +
        win('02 · Habla', '<h3>Habla como tú</h3><p>Escribe y responde en tu voz, con tus palabras. Nada suena a robot.</p>') +
        win('03 · Te reta', '<h3>Te reta como un socio</h3><p>No es un espejo. Conoce tus números y te discute las decisiones antes de que las tomes.</p>') +
      '</div></section>' +

    '<section class="blq"><span class="ceja">Qué hace solo</span><h2>Trabaja a su hora. Tú decides qué.</h2>' +
      win('Tu negocio, sin ti encima', '<ul class="lista"><li><b>Tu Instagram:</b> responde, da seguimiento y consigue citas.</li><li><b>Tu contenido:</b> programado semana tras semana.</li><li><b>Tus tareas:</b> dirigidas y revisadas sin que estés encima.</li><li><b>Tu gente:</b> atendida como la atenderías tú, a cualquier hora.</li></ul>') +
    '</section>' +

    '<section class="blq"><span class="ceja">Cómo lo instalamos</span><h2>Tres pasos. Contigo, no por ti.</h2>' +
      '<div class="tres">' +
        win('Paso 1', '<span class="num">REC ●</span><h3>Grabamos cómo lo haces</h3><p>Cómo vendes, cómo respondes y cómo decides sale de tu cabeza y entra al sistema.</p>') +
        win('Paso 2', '<span class="num">habilidades.md</span><h3>Lo volvemos habilidades</h3><p>Lo que haces todos los días queda convertido en habilidades que la IA ejecuta con tus reglas.</p>') +
        win('Paso 3', '<span class="num">⏱ programado</span><h3>Le ponemos un reloj</h3><p>Responde, da seguimiento y publica solo, a su hora. Tú revisas y ajustas.</p>') +
      '</div>' +
      '<div class="cita"><p class="f">«Yo estoy cansado de ser una agencia. Yo no soy una agencia.»</p><p class="q">Diego Vetencourt · cerró su agencia y su academia antes de construir esto</p></div>' +
      '<p class="intro" style="margin-top:18px">No es un curso que te pide aprenderlo todo encima de manejar tu negocio. Tampoco una agencia que lo hace por ti y se queda con lo que sabe. Lo que se instala es tuyo y se queda trabajando para ti.</p>' +
    '</section>' +

    '<section class="blq"><span class="ceja">Resultados reales</span><h2>Lo que pasa cuando ya está instalado.</h2>' +
      '<div class="dos">' +
        win('Clínica de cirugía estética · Venezuela', '<div class="caso"><p class="quien">José Luis · reseña pública en Trustpilot</p><p>«Necesitábamos que los leads se asignaran solos a las asesoras de preventa, que pasaran limpiamente a posventa al cerrar la venta y que se repartieran de forma equitativa.»</p><p class="f">«El equipo comercial ahora trabaja más organizado y con menos tareas manuales.»</p><p>«Diego entendió rápido cómo funciona nuestro negocio… y cumple lo que promete.»</p></div>') +
        win('Instalación en curso · sesiones en vivo', '<div class="caso"><p class="quien">' + esc(T.b) + '</p><p class="f">«Diego, yo no te puedo explicar de verdad lo que ha sido esto.»</p><p>«Yo sé que ni siquiera lo hemos terminado de montar, pero es que te tengo que contar, porque es increíble además la sincronía.»</p><p>Durante la instalación: «Creo que no se me nota, pero yo estoy muy emocionada que le estamos haciendo esto.»</p></div>') +
        win('Empresa · Estados Unidos', '<div class="caso"><p class="quien">Adam Stramwasser · reseña pública en Trustpilot</p><p class="f">«Trabajar con Diego y su equipo fue realmente impactante para nuestro negocio.»</p><p>«No solo por el poder de las soluciones sino la perspectiva estratégica que nos dieron del negocio en general.»</p></div>') +
        win('Caso cero · nuestro propio negocio', '<div class="caso"><p class="quien">Soluciones Artificiales · así opera hoy</p><p class="f">Diego cerró su agencia y convirtió cuatro años de trabajo en agentes.</p><p>Hoy los agentes responden los WhatsApp, le escriben a cada persona que se registra, le dan seguimiento hasta la llamada y le arman a Diego el reporte del día. Lo que te instalamos es lo mismo que usamos.</p></div>') +
      '</div>' +
      '<a class="tp" style="margin-top:34px" href="https://www.trustpilot.com/review/solucionesartificiales.com" target="_blank" rel="noopener"><span class="tpl"><span class="tpe">★ ★ ★ ★ ★</span><b>Todas las reseñas en Trustpilot</b><small>Clientes y alumnos de Diego, sin filtro. Ábrelas y léelas tú.</small></span><span class="tpb">Ver reseñas →</span></a>' +
      '<p style="margin-top:26px"><a class="btn sec" href="https://solucionesartificiales.com/resultados" target="_blank" rel="noopener">Ver la lista de resultados →</a></p>' +
    '</section>' +

    '<section class="blq"><span class="ceja">Por qué vale la inversión</span><h2>No compras una herramienta. Recuperas tu tiempo.</h2>' +
      '<div class="dos">' +
        win('Autonomía desde el día uno', '<h3>Tu negocio deja de depender de que estés encima</h3><p>Desde la primera sesión sacamos de tu cabeza lo que solo tú sabes. Lo que se instala trabaja aunque no estés, y es tuyo.</p>') +
        win('Más ingresos', '<h3>Ningún cliente se queda sin respuesta</h3><p>Tu sistema responde, da seguimiento y agenda a su hora, también de noche y el fin de semana. Las ventas que hoy se te escapan por no contestar a tiempo, dejan de escaparse.</p>') +
        win('Menos costos', '<h3>Menos tareas manuales, menos gente para lo repetitivo</h3><p>Responder, dar seguimiento, programar contenido y revisar tareas lo hace el sistema. Tu equipo se dedica a lo que solo una persona puede hacer.</p>') +
        win('Te cambia la vida', '<h3>Te vas y el otro tú sigue trabajando</h3><p>Viajas, te enfermas o simplemente duermes, y tu negocio no se apaga. Esa es la libertad que se compra aquí.</p>') +
      '</div>' +
      (CFG.PRECIO ? '<div style="margin-top:34px">' + win('Cuánto cuesta', '<div class="precio"><b>USD 3.000</b><span>la instalación arranca en</span></div><p style="font-size:18px;color:var(--gris);max-width:60ch">El monto exacto depende de tu negocio y lo defines con Diego en la llamada, antes de empezar. Sin sorpresas después.</p>') + '</div>' : '') +
    '</section>' +

    '<section class="blq" id="llamada"><span class="ceja">Siguiente paso</span><h2>¿Te lo instalamos?</h2>' +
      '<p class="intro">Respóndeme sí o no. Si tiene sentido para tu negocio, eliges tu hora con Diego en el paso siguiente. Si no lo tiene, te lo decimos.</p>' +
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
