/* Productízate · landing B2B del segundo cerebro (Soluciones Artificiales)
   Se sirve desde GitHub Pages (dvetencourt/sa-media/productizate) y se pinta dentro de la página de GHL
   solucionesartificiales.com/productizate con un solo bloque: <div id="pzhost"></div><script src=".../productizate.js"></script>
   Brandbook SA: papel, tinta, cobalto, coral; ventanas con barra cobalto, bordes y sombras sólidas, sin radios. */
(function () {
  if (window.__PZ_CARGADO) return; window.__PZ_CARGADO = true;

  var CFG = {
    PRECIO: true,        // Diego autorizó precio público solo en esta página (inst. desde USD 3.000) — confirmar
    NOMBRES: false,      // testimonios con nombre real solo con permiso de cada cliente; mientras tanto, anónimos
    FORM_ID: 'KCMtD2zwUa8HFxJJFnti', // «Productízate · Sí o No» → al enviar redirige al calendario «Llamada B2B» de Diego
    MEDIA: 'https://dvetencourt.github.io/sa-media/productizate/'
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
    '#pz .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--tinta)}#pz .btn.chico{min-height:44px;font-size:15px;padding:10px 16px;box-shadow:4px 4px 0 var(--tinta)}' +
    '#pz .hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:40px;align-items:center;margin-top:36px;animation:pzin .55s ease-out both}' +
    '#pz .hero .acc{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:26px}#pz .hero .nota{font:700 12px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--gris)}' +
    '#pz .win{background:var(--blanco);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta)}' +
    '#pz .bar{display:flex;justify-content:space-between;align-items:center;gap:10px;background:var(--cobalto);color:#fff;font:700 12px "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase;padding:8px 14px;border-bottom:2px solid var(--tinta)}' +
    '#pz .bar i{display:inline-flex;gap:5px}#pz .bar i b{width:9px;height:9px;border:2px solid #fff;display:block}#pz .body{padding:20px 20px}' +
    '#pz .vwin{max-width:380px;justify-self:center;width:100%;box-shadow:10px 10px 0 var(--azulp),10px 10px 0 2px var(--tinta)}#pz .vwin .body{padding:0;background:#000}' +
    '#pz .vwin video{display:block;width:100%;aspect-ratio:9/16;background:#000;object-fit:cover}' +
    '#pz section.blq{margin-top:84px}#pz .intro{font-size:19px;color:var(--gris);max-width:60ch;margin-bottom:22px}' +
    '#pz ul.lista{margin:0;padding:0;list-style:none}#pz ul.lista li{padding:12px 0 12px 30px;position:relative;font-size:19px;line-height:1.45;border-bottom:1px dashed #d7d2c8}#pz ul.lista li:last-child{border-bottom:0}#pz ul.lista li:before{content:"→";position:absolute;left:0;color:var(--cobalto);font-weight:700}' +
    '#pz .dos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;align-items:start}#pz .tres{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}' +
    '#pz .tres .win{box-shadow:6px 6px 0 var(--tinta)}#pz .tres p,#pz .dos .win p{font-size:17px;color:var(--gris)}' +
    '#pz .num{font:700 13px "Courier New",monospace;color:var(--coral);letter-spacing:.08em;display:block;margin-bottom:8px}' +
    '#pz .cita{border-left:4px solid var(--cobalto);padding:4px 0 4px 18px;margin-top:22px}#pz .cita .f{font-size:clamp(20px,2.2vw,25px);font-weight:700;line-height:1.3}#pz .cita .q{font:700 12px/1.5 "Courier New",monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--gris);margin-top:8px}' +
    '#pz .voz{background:var(--coralp);border:2px solid var(--tinta);padding:16px 18px;box-shadow:5px 5px 0 var(--tinta)}#pz .voz .f{font-size:19px;font-weight:700;line-height:1.35}#pz .voz .q{font:700 11px/1.5 "Courier New",monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--gris);margin-top:8px}' +
    '#pz .caso .quien{font:700 12px/1.5 "Courier New",monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--coral);margin-bottom:10px}#pz .caso .f{font-size:22px;font-weight:700;line-height:1.3;margin:10px 0}#pz .caso p{font-size:17px;color:var(--gris)}' +
    '#pz .tp{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;background:var(--blanco);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);padding:20px;text-decoration:none;color:var(--tinta);transition:transform .15s ease-out,box-shadow .15s ease-out}#pz .tp:hover{transform:translate(-2px,-2px);box-shadow:10px 10px 0 var(--tinta)}#pz .tpl{display:grid;gap:4px}#pz .tpe{color:#00b67a;font-size:24px;letter-spacing:2px}#pz .tp b{font-size:22px}#pz .tp small{font-size:16px;color:var(--gris)}#pz .tpb{border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-weight:700;padding:12px 18px;box-shadow:4px 4px 0 var(--tinta)}' +
    '#pz .precio{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 14px;margin:4px 0 10px}#pz .precio b{font-size:clamp(40px,5vw,58px);line-height:1;letter-spacing:-.02em}#pz .precio span{font:700 13px "Courier New",monospace;text-transform:uppercase;letter-spacing:.06em;color:var(--gris)}' +
    '#pz .form .body{padding:8px}#pz .form iframe{display:block;width:100%;min-height:760px;border:0}' +
    '#pz .final{margin-top:84px;text-align:center}#pz .final h2{margin-bottom:22px}' +
    '#pz .pie{margin-top:56px;padding-top:18px;border-top:2px solid var(--tinta);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font:700 12px "Courier New",monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--gris)}' +
    '@keyframes pzin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){#pz .hero{animation:none}#pz .btn{transition:none}}' +
    '@media (max-width:860px){#pz .hero{grid-template-columns:minmax(0,1fr);gap:30px;margin-top:26px}#pz .vwin{max-width:330px}#pz .tres,#pz .dos{grid-template-columns:minmax(0,1fr)}#pz section.blq{margin-top:64px}}' +
    '@media (max-width:520px){#pz .top .btn{display:none}#pz .hero .btn{width:100%}#pz .body{padding:18px 16px}#pz ul.lista li{font-size:18px}}';

  var T = CFG.NOMBRES ? {
    a: 'Ponciano Betancourt · dueño de Fortia, software, 120 personas, México',
    b: 'Violeta Parilli · instalación en sesiones en vivo con Diego desde el 7 de octubre',
    c: 'Susana Wise · psicóloga con consulta privada online'
  } : {
    a: 'Dueño de una empresa de software · 120 personas · México',
    b: 'Emprendedora · su sistema se monta en sesiones en vivo con Diego',
    c: 'Psicóloga con consulta privada online'
  };

  var html =
    '<div class="wrap">' +
    '<header class="top"><a class="brand" href="https://solucionesartificiales.com/" aria-label="Soluciones Artificiales, inicio"><span class="mark">SA</span><span>Soluciones<br>Artificiales</span></a><a class="btn chico" href="#llamada">Solicitar mi llamada</a></header>' +

    '<div class="hero"><div>' +
      '<span class="ceja">Productízate · para dueños de negocio</span>' +
      '<h1>Te instalamos <em>a ti</em> en una inteligencia artificial.</h1>' +
      '<p class="sub">Lo que sabes de tu negocio sale de tu cabeza y queda trabajando con tus reglas, a su hora. Aunque tú no estés.</p>' +
      '<div class="acc"><a class="btn" href="#llamada">Quiero mi segundo cerebro</a><span class="nota">Mira el video · 47 s</span></div>' +
    '</div>' +
    win('Diego · 47 segundos', '<video src="' + CFG.MEDIA + 'productizate-vsl.mp4" poster="' + CFG.MEDIA + 'productizate-poster.jpg" controls playsinline preload="metadata" aria-label="Video de Diego: qué es productizarte"></video>', 'vwin') +
    '</div>' +

    '<section class="blq"><span class="ceja">El problema</span><h2>Si tú no estás, tu negocio se apaga.</h2>' +
      '<div class="dos">' +
        win('¿Te pasa esto?', '<ul class="lista"><li>Si tú no estás, nada se mueve.</li><li>Escribes tú, respondes tú, vendes tú.</li><li>Tu equipo no piensa como tú y no tienes a nadie que te rete.</li><li>Todo lo que sabes vive en tu memoria. Solo funciona cuando estás despierto.</li></ul>') +
        '<div style="display:grid;gap:22px">' +
          '<div class="voz"><p class="f">«Yo escribo todo, yo escribo todo.»</p><p class="q">' + esc(T.c) + '</p></div>' +
          '<div class="voz"><p class="f">«Tengo un dominio muy superior a lo que tiene el resto de mis equipos de trabajo en la compañía, y ese es mi siguiente paso, ya transferirles conocimiento.»</p><p class="q">' + esc(T.a) + '</p></div>' +
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

    '<section class="blq"><span class="ceja">Ya lo estamos instalando</span><h2>Lo que dicen y lo que pasó.</h2>' +
      '<a class="tp" href="https://www.trustpilot.com/review/solucionesartificiales.com" target="_blank" rel="noopener"><span class="tpl"><span class="tpe">★ ★ ★ ★ ★</span><b>Reseñas reales en Trustpilot</b><small>De quienes ya trabajaron con Diego. Ábrelas y léelas tú.</small></span><span class="tpb">Ver reseñas →</span></a>' +
      '<p class="intro" style="margin-top:34px">Y los primeros dueños de negocio que ya lo están instalando, sin nombres:</p>' +
      '<div class="dos">' +
        win('Implementación · software', '<div class="caso"><p class="quien">' + esc(T.a) + '</p><p class="f">«Necesito pasar del creo al me consta.»</p><p>Cuando el concepto le hizo clic, el 8 de octubre: «Me gusta el concepto. Yo creo que pago por verlo.» Contrató su instalación.</p></div>') +
        win('Implementación · en curso', '<div class="caso"><p class="quien">' + esc(T.b) + '</p><p class="f">«Creo que no se me nota, pero yo estoy muy emocionada que le estamos haciendo esto.»</p><p>Y después, por mensaje: «Yo sé que ni siquiera lo hemos terminado de montar, pero es que te tengo que contar, porque es increíble además la sincronía.»</p></div>') +
      '</div></section>' +

    (CFG.PRECIO ? '<section class="blq"><span class="ceja">Inversión</span>' +
      win('Cuánto cuesta', '<div class="precio"><b>USD 3.000</b><span>la instalación arranca en</span></div><p style="font-size:18px;color:var(--gris);max-width:60ch">El monto exacto depende de tu negocio y lo defines con Diego en la llamada, antes de empezar. Sin sorpresas después.</p>') +
    '</section>' : '') +

    '<section class="blq" id="llamada"><span class="ceja">Siguiente paso</span><h2>¿Te lo instalamos?</h2>' +
      '<p class="intro">Respóndeme sí o no. Si tiene sentido para tu negocio, eliges tu hora con Diego en el paso siguiente. Si no lo tiene, te lo decimos.</p>' +
      win('Solicitar mi llamada', '<iframe src="https://api.leadconnectorhq.com/widget/form/' + CFG.FORM_ID + '" id="inline-' + CFG.FORM_ID + '" data-layout="{\'id\':\'INLINE\'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Productízate · Sí o No" data-height="760" data-layout-iframe-id="inline-' + CFG.FORM_ID + '" data-form-id="' + CFG.FORM_ID + '" title="Productízate · Sí o No"></iframe>', 'form') +
    '</section>' +

    '<div class="final"><h2>Tu negocio, trabajando sin ti encima.</h2><a class="btn" href="#llamada">Quiero mi segundo cerebro</a></div>' +
    '<footer class="pie"><span>Productízate es un servicio de Soluciones Artificiales</span><span>Diego Vetencourt</span></footer>' +
    '</div>';

  function montar() {
    var host = document.getElementById('pzhost');
    if (!host) { host = document.createElement('div'); host.id = 'pzhost'; document.body.insertBefore(host, document.body.firstChild); }
    if (document.getElementById('pz')) return;
    var st = document.createElement('style'); st.textContent = CSS + 'html,body{background:#fffaf2!important}'; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'pz'; d.innerHTML = html; host.appendChild(d);
    try { document.title = 'Productízate | Tu negocio trabajando sin ti encima'; } catch (e) { }
    var s = document.createElement('script'); s.src = 'https://link.msgsndr.com/js/form_embed.js'; s.async = true; document.body.appendChild(s);
    var v = d.querySelector('video'); if (v) v.addEventListener('play', function () { try { if (window.fbq) window.fbq('trackCustom', 'PZ_VideoPlay'); } catch (e) { } }, { once: true });
    d.querySelectorAll('a[href="#llamada"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); try { if (window.fbq) window.fbq('trackCustom', 'PZ_ClicLlamada'); } catch (x) { } document.getElementById('llamada').scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });
  }
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
