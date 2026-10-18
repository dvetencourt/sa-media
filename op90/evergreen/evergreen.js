/* Operador 90 · Webinar Evergreen (clase programada) · Soluciones Artificiales
   Un solo script para las 4 páginas. En GHL va un bloque Custom HTML con:
     <div id="evhost" data-pagina="registro|confirmada|sala|replay"></div>
     <script src="https://dvetencourt.github.io/sa-media/op90/evergreen/evergreen.js"></script>
   Reglas: sin precio ni garantía en la página; sin asistentes inventados ni contador de asistentes.
   Chat de la sala: solo comentarios REALES del vivo del 30-sep (chat-30sep.json, sacado del chat de YouTube) a su minuto,
   más lo que escribe el espectador, que se manda a GHL (webhook de señales, evento «chat») para que responda el equipo.
   La fecha de la clase: registro + 5 días a las 7:00 PM America/New_York; si cae sábado o domingo, lunes.
   (Misma regla que el workflow «Evergreen · registro» en GHL, que es la fuente oficial: campo fecha_webinar). */
(function () {
  'use strict';
  var SRC = (document.currentScript && document.currentScript.src) || '';

  /* ---------- Configuración (lo único que se toca para cambiar video, días u oferta) ---------- */
  var CFG = {
    DIAS: 5,                 // fijo: 5 días exactos (Diego, 12-oct). Si cambia, cambiar también el workflow de registro en GHL.
    HORA_NY: 19,             // 7:00 PM Miami
    YT_ID: 'IXvH718CN8g',    // Clase evergreen final (14-oct): vivo del 30-sep sin promesas de agentes regalados + cierre del clon. No listado.
    // El video ya viene cortado: se reproduce entero (1:30:50). Cierre del clon desde 4848 s.
    TRAMOS: [[0, 5450.8]],
    AGENDA_EN: 2725,         // mitad de la clase: aparece el botón de agenda y el equipo lo escribe en el chat (Diego, 17-oct)
    CHAT_AGENDA: [2725, 3900, 4878], // segundos donde «Equipo de Diego» escribe el link de agenda en el chat
    OFERTA_EN: 4848,         // segundo donde empieza el cierre con la oferta (botón de agenda)
    REPLAY_HORAS: 48,
    HOOK_REGISTRO: 'https://services.leadconnectorhq.com/hooks/IawpuuJf69E9JJDhPPZi/webhook-trigger/edfd3d36-fb3c-4efc-8080-8b1dc7462aae',
    HOOK_SENALES: 'https://services.leadconnectorhq.com/hooks/IawpuuJf69E9JJDhPPZi/webhook-trigger/2c2820d8-dbcd-47f7-9895-afae7faea809',
    AGENDA: 'https://api.leadconnectorhq.com/widget/booking/8Z9iAYTNJYKMyPNXaOIw', // calendario W (Diego, 17-oct)
    PIXEL: '706725165238205',
    BASE: 'https://solucionesartificiales.com',
    // Chat de la sala: comentarios reales del vivo del 30-sep, remapeados al video final del 14-oct (trabajo/tramos-30fps.json).
    CHAT_URL: 'https://dvetencourt.github.io/sa-media/op90/evergreen/chat-30sep.json',
    CHAT_MAX: 60,            // mensajes visibles a la vez
    CHAT_AL_ENTRAR: 8,       // al entrar tarde solo se ven los últimos 8 (como un chat en vivo real), luego se va llenando
    // Vista previa de GHL (embudo f1ZXlgaalQCwpoF6uyxt, sin dominio): ids de página para navegar entre pasos al probar.
    PREVIEW: { masterclass: 'cnweu7KmGn7VcqN5DDV1', 'masterclass-confirmada': 'QIGk1D36HKexzmZ8Gpa3', 'masterclass-sala': '8z1L3ObiK4e7W1vC0eDd', 'masterclass-replay': 'v7s8rUBzZaBcunhNez51' }
  };
  function url(ruta) { // en el dominio real: /ruta ; en la vista previa de GHL: /preview/<id>
    if (/\/preview\//.test(location.pathname) && CFG.PREVIEW[ruta]) return location.origin + '/preview/' + CFG.PREVIEW[ruta];
    return CFG.BASE + '/' + ruta;
  }

  var host = document.getElementById('evhost');
  if (!host) { host = document.createElement('div'); host.id = 'evhost'; document.body.appendChild(host); }
  var PAGINA = (host.getAttribute('data-pagina') || window.EV_PAGINA || 'registro').toLowerCase();
  if (PAGINA !== 'prueba' && document.body && document.body.firstChild !== host) { try { document.body.insertBefore(host, document.body.firstChild); } catch (e) { } }
  try { document.title = { registro: 'Clase gratuita · Diego Vetencourt', confirmada: 'Tu lugar está confirmado · Diego Vetencourt', sala: 'Tu clase · Diego Vetencourt', replay: 'Repetición de la clase · Diego Vetencourt' }[PAGINA] || document.title; } catch (e) { }
  var qs = new URLSearchParams(location.search);

  /* ---------- Utilidades ---------- */
  var DIAS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MESES_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var MESES_EN = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function partesNY(ms) { // {y,m,d,h,mi,dow} en America/New_York
    var f = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23', weekday: 'short' });
    var o = {}; f.formatToParts(new Date(ms)).forEach(function (p) { o[p.type] = p.value; });
    var dows = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { y: +o.year, m: +o.month, d: +o.day, h: +o.hour % 24, mi: +o.minute, dow: dows[o.weekday] };
  }
  function instanteNY(y, m, d, h) { // ms UTC del instante y-m-d h:00 en New York (respeta horario de verano)
    var objetivo = Date.UTC(y, m - 1, d, h), r = objetivo;
    for (var i = 0; i < 3; i++) { var p = partesNY(r); var dif = Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi) - objetivo; if (!dif) break; r -= dif; }
    return r;
  }
  function sumarDias(y, m, d, n) { var t = new Date(Date.UTC(y, m - 1, d + n)); return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate(), dow: t.getUTCDay() }; }
  function calcularClase(ahora) { // regla de Diego (12-oct, 7:45 PM): «5 días hasta el webinar, punto y final». Registro + 5, también sábado o domingo.
    var hoy = partesNY(ahora);
    return sumarDias(hoy.y, hoy.m, hoy.d, CFG.DIAS);
  }
  function iso(f) { return f.y + '-' + pad(f.m) + '-' + pad(f.d); }
  function textoFecha(f) { return DIAS_ES[f.dow] + ' ' + f.d + ' de ' + MESES_ES[f.m - 1]; }
  function parseFecha(s) { // acepta 2026-10-16, 10/16/2026, 16-10-2026, Oct 16th 2026, October 16, 2026
    if (!s) return null; s = String(s).trim().toLowerCase();
    var r = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/); if (r) return mk(+r[1], +r[2], +r[3]);
    r = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/); if (r) return mk(+r[3], +r[1], +r[2]);
    r = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})/); if (r) return mk(+r[3], +r[2], +r[1]);
    r = s.match(/^([a-z]{3})[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/); if (r && MESES_EN.indexOf(r[1]) > -1) return mk(+r[3], MESES_EN.indexOf(r[1]) + 1, +r[2]);
    return null;
    function mk(y, m, d) { if (!y || m < 1 || m > 12 || d < 1 || d > 31) return null; var t = new Date(Date.UTC(y, m - 1, d)); return { y: y, m: m, d: d, dow: t.getUTCDay() }; }
  }
  function horaLocal(ms) { try { return new Intl.DateTimeFormat('es', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' }).format(new Date(ms)); } catch (e) { return ''; } }
  function zonaLocal() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; } }

  /* Píxel: usa el del embudo; si la página no lo tiene, lo carga (sin duplicar). */
  function pixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CFG.PIXEL); window.fbq('track', 'PageView');
  }
  function fb(tipo, nombre, datos) { try { pixel(); window.fbq(tipo, nombre, datos || {}); } catch (e) { } }
  function senal(evento, extra) { // a GHL (Evergreen · señales de la sala), una vez por contacto y evento
    var c = qs.get('c') || ls('ev_c'); if (!c || !/^[A-Za-z0-9]{8,40}$/.test(c)) return;
    var k = 'ev_s_' + evento + '_' + c; if (ls(k)) return; ls(k, '1');
    var d = new URLSearchParams({ contact_id: c, evento: evento, pagina: PAGINA });
    if (extra) Object.keys(extra).forEach(function (x) { d.set(x, extra[x]); });
    try { fetch(CFG.HOOK_SENALES, { method: 'POST', mode: 'no-cors', body: d }); } catch (e) { }
  }

  /* ---------- Estilos (brandbook SA: papel, tinta, cobalto, coral; bordes y sombras sólidas) ---------- */
  var CSS = '#ev{--papel:#fffaf2;--blanco:#fff;--tinta:#202329;--cobalto:#234ddb;--coral:#bc442c;--azulp:#dce5ff;--coralp:#ffe3d9;--gris:#505966;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:var(--papel);color:var(--tinta);min-height:100vh;width:100vw;position:relative;left:50%;margin-left:-50vw;overflow-x:hidden}' +
    '#ev *{box-sizing:border-box}#ev .wrap{max-width:820px;margin:0 auto;padding:18px 16px 64px}' +
    '#ev .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;gap:12px}' +
    '#ev .brand{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:6px 12px 6px 6px;border:2px solid var(--tinta);background:var(--blanco);box-shadow:4px 4px 0 var(--tinta);text-decoration:none;color:var(--tinta);font:700 11px/1.05 "Courier New",monospace;text-transform:uppercase;letter-spacing:.04em}' +
    '#ev .mark{width:34px;height:34px;display:grid;place-items:center;border:2px solid var(--tinta);background:var(--coral);color:#fff;font:700 14px "Courier New",monospace}' +
    '#ev .ceja{display:inline-block;font:700 12px "Courier New",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}' +
    '#ev h1{font-size:clamp(34px,5.6vw,56px);line-height:1.05;margin:10px 0 12px;text-wrap:balance}' +
    '#ev h2{font-size:clamp(24px,3.6vw,32px);line-height:1.15;margin:0 0 12px}' +
    '#ev .sub{font-size:19px;line-height:1.5;color:var(--gris);margin:0 0 22px}' +
    '#ev .win{margin-top:24px;background:var(--blanco);border:2px solid var(--tinta);box-shadow:6px 6px 0 var(--tinta)}' +
    '#ev .bar{display:flex;justify-content:space-between;align-items:center;background:var(--cobalto);color:#fff;font:700 12px "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase;padding:8px 14px;border-bottom:2px solid var(--tinta)}' +
    '#ev .bar i{display:inline-flex;gap:5px}#ev .bar i b{width:9px;height:9px;border:2px solid #fff;display:block}' +
    '#ev .body{padding:20px 18px}#ev ul.lista{margin:0;padding:0;list-style:none}#ev ul.lista li{padding:10px 0 10px 28px;position:relative;font-size:18px;line-height:1.45;border-bottom:1px dashed #d7d2c8}#ev ul.lista li:last-child{border-bottom:0}#ev ul.lista li:before{content:"→";position:absolute;left:0;color:var(--cobalto);font-weight:700}' +
    '#ev label{display:block;font:700 12px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--gris);margin:14px 0 6px}' +
    '#ev input,#ev select{width:100%;min-height:52px;border:2px solid var(--tinta);background:var(--papel);color:var(--tinta);font-size:17px;padding:0 14px;border-radius:0}' +
    '#ev .tel{display:flex;gap:8px}#ev .tel select{max-width:46%;font-size:16px;padding:0 6px}#ev .tel input{flex:1;min-width:0}' +
    '#ev input:focus,#ev select:focus{outline:3px solid var(--azulp)}' +
    '#ev .btn{display:block;width:100%;margin-top:18px;min-height:58px;border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-size:19px;font-weight:700;cursor:pointer;box-shadow:5px 5px 0 var(--tinta);text-align:center;text-decoration:none;padding:16px;transition:transform .15s ease-out,box-shadow .15s ease-out}' +
    '#ev .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--tinta)}#ev .btn.sec{background:var(--blanco);color:var(--tinta)}' +
    '#ev .err{color:var(--coral);font-size:15px;min-height:18px;margin:10px 0 0}#ev .chico{font-size:14px;line-height:1.5;color:var(--gris);margin:12px 0 0}' +
    '#ev .aviso{margin-top:32px;font-size:13px;color:var(--gris);text-align:center;line-height:1.5}' +
    '#ev .fecha{font-size:clamp(26px,4.4vw,40px);font-weight:800;line-height:1.1;margin:6px 0}#ev .local{font-size:17px;color:var(--gris)}' +
    '#ev .video{position:relative;width:100%;aspect-ratio:16/9;background:#000;border:3px solid var(--tinta);box-shadow:8px 8px 0 var(--azulp);overflow:hidden}#ev .video>div,#ev .video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}#ev .video #ev-yt,#ev .video iframe#ev-yt{top:-62px;height:calc(100% + 124px)}#ev .escudo{position:absolute;inset:0;z-index:3;background:transparent;cursor:default}#ev .controles{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0 0}#ev .controles button{font:inherit;font-weight:700;padding:8px 14px;border:2px solid var(--tinta);background:#fff;cursor:pointer}#ev .controles .t{font-variant-numeric:tabular-nums;color:var(--gris,#505966);margin-left:auto}' +
    '#ev .tapa{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:rgba(32,35,41,.82);color:#fff;text-align:center;padding:20px;z-index:3}#ev .tapa .btn{width:auto;display:inline-block;padding:14px 22px}' +
    '#ev .cuenta{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}#ev .cuenta div{min-width:74px;border:2px solid #fff;padding:8px 6px;font:700 28px "Courier New",monospace}#ev .cuenta small{display:block;font-size:11px;letter-spacing:.08em}' +
    '#ev .estado{display:inline-flex;align-items:center;gap:8px;font:700 12px "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase}#ev .punto{width:10px;height:10px;background:var(--coral);display:inline-block}' +
    '#ev .cal iframe{width:100%;min-height:900px;border:0;display:block;background:#fff}#ev .oculto{display:none}' +
    '@media (max-width:520px){#ev .tapa{gap:6px;padding:10px}#ev .tapa p{font-size:14px!important}#ev .cuenta{gap:6px;flex-wrap:nowrap}#ev .cuenta div{min-width:0;flex:1;font-size:18px;padding:4px 2px}#ev .cuenta small{font-size:9px}#ev .tapa .btn{font-size:16px;padding:10px 14px;min-height:0;margin-top:4px}}' +
    '#ev.conchat .wrap{max-width:1180px}#ev .sala{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:24px;align-items:start}#ev .sala.sinchat{grid-template-columns:minmax(0,1fr)}#ev .sala.sinchat .chat{display:none}' +
    '#ev .chat{display:flex;flex-direction:column;height:520px;background:var(--blanco);border:2px solid var(--tinta);box-shadow:6px 6px 0 var(--tinta)}#ev .chat .bar{flex:none}' +
    '#ev .rotulo{flex:none;margin:0;padding:6px 12px;font:700 11px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--gris);border-bottom:1px dashed #d7d2c8}' +
    '#ev .msgs{flex:1;min-height:0;overflow-y:auto;padding:8px 12px;overscroll-behavior:contain}#ev .msg{margin:0;padding:5px 0;font-size:15px;line-height:1.4;overflow-wrap:anywhere}#ev .msg b{margin-right:6px}' +
    '#ev .msg.equipo{background:var(--cobalto);color:#fff;margin:6px -6px;padding:8px 10px}#ev .msg.equipo b{color:#fff}#ev .msg.equipo button{display:block;margin-top:8px;width:100%;min-height:44px;border:2px solid var(--tinta);background:#fff;color:var(--tinta);font-weight:700;font-size:15px;cursor:pointer}' +
    '#ev .volver{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(32,35,41,.86);color:#fff;text-align:center;padding:16px}#ev .volver.oculto{display:none}#ev .volver .btn{width:auto;display:inline-block;padding:12px 20px;margin-top:0}#ev .avisomovil{font-size:13px;color:var(--gris,#505966);margin:8px 0 0}' +
    '#ev .msg.yo{background:var(--azulp);margin:4px -6px;padding:6px}#ev .msg.yo b{color:var(--cobalto)}#ev .msg.nota{font-size:13px;color:var(--gris);font-style:italic}#ev .vacio{font-size:14px;color:var(--gris);margin:8px 0}' +
    '#ev .escribir{flex:none;display:flex;gap:8px;padding:10px;border-top:2px solid var(--tinta);background:var(--papel)}#ev .escribir input{flex:1;min-width:0;min-height:44px;font-size:16px;background:var(--blanco)}' +
    '#ev .escribir button{flex:none;min-height:44px;padding:0 14px;border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-weight:700;font-size:15px;cursor:pointer}' +
    '@media (max-width:900px){#ev .sala{grid-template-columns:minmax(0,1fr)}#ev .chat{height:420px}}@media (max-width:520px){#ev .chat{height:380px}}' +
    '@media (prefers-reduced-motion:reduce){#ev .btn{transition:none}}';

  function marco(contenido) {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    host.innerHTML = '<div id="ev"><div class="wrap"><div class="top"><a class="brand" href="' + CFG.BASE + '/" aria-label="Soluciones Artificiales, ir al inicio"><span class="mark" aria-hidden="true">SA</span><span>Soluciones<br>Artificiales</span></a><span class="ceja">Clase · Operador 90</span></div>' + contenido + '<p class="aviso">Clase grabada en vivo que se transmite a una hora fija. Resultados individuales, no típicos. Esta clase no promete ingresos.</p></div></div>';
  }
  function win(titulo, cuerpo, id) { return '<section class="win"' + (id ? ' id="' + id + '"' : '') + '><div class="bar"><span>' + titulo + '</span><i aria-hidden="true"><b></b><b></b></i></div><div class="body">' + cuerpo + '</div></section>'; }

  /* ---------- Página: registro (/masterclass) ---------- */
  function registro() {
    pixel();
    var f = calcularClase(Date.now()), inicio = instanteNY(f.y, f.m, f.d, CFG.HORA_NY);
    var paises = [['+1', '+1 EE. UU. / Canadá'], ['+52', '+52 México'], ['+58', '+58 Venezuela'], ['+57', '+57 Colombia'], ['+54', '+54 Argentina'], ['+56', '+56 Chile'], ['+51', '+51 Perú'], ['+593', '+593 Ecuador'], ['+503', '+503 El Salvador'], ['+502', '+502 Guatemala'], ['+504', '+504 Honduras'], ['+505', '+505 Nicaragua'], ['+506', '+506 Costa Rica'], ['+507', '+507 Panamá'], ['+1809', '+1 Rep. Dominicana'], ['+591', '+591 Bolivia'], ['+595', '+595 Paraguay'], ['+598', '+598 Uruguay'], ['+34', '+34 España'], ['+0', 'Otro (escribe +código)']];
    marco(
      '<span class="ceja">Clase gratuita · ' + esc(textoFecha(f)) + ' · 7:00 PM Miami</span>' +
      '<h1>Mira cómo se instala y se vende un agente de IA a un negocio real</h1>' +
      '<p class="sub">Te muestro mis agentes trabajando sobre un negocio de verdad y cómo ese trabajo se convierte en un servicio que ofreces tú, sin programar y desde donde estés.</p>' +
      win('Reserva tu lugar', '<form id="ev-form" novalidate>' +
        '<p style="margin:0 0 4px;font-size:17px">Tu clase es el <b>' + esc(textoFecha(f)) + ' a las 7:00 PM hora de Miami</b>' + (horaLocal(inicio) ? ' <span class="local">(en tu zona: ' + esc(horaLocal(inicio)) + ')</span>' : '') + '.</p>' +
        '<label for="ev-n">Tu nombre</label><input id="ev-n" autocomplete="given-name" required>' +
        '<label for="ev-e">Tu correo</label><input id="ev-e" type="email" autocomplete="email" required>' +
        '<label for="ev-w">Tu WhatsApp</label><div class="tel"><select id="ev-cc" aria-label="Código de país">' + paises.map(function (p) { return '<option value="' + p[0] + '">' + esc(p[1]) + '</option>'; }).join('') + '</select><input id="ev-w" type="tel" autocomplete="tel-national" placeholder="305 000 0000" required></div>' +
        '<p class="err" id="ev-err" role="alert"></p>' +
        '<button class="btn" type="submit">Reservar mi lugar</button>' +
        '<p class="chico">Clase sin costo. Te mando el acceso por correo y WhatsApp. Puedes darte de baja cuando quieras.</p></form>', 'ev-reserva') +
      win('Lo que vas a ver', '<ul class="lista"><li><b>Los agentes trabajando, no explicados.</b> Diagnóstico de un negocio, su página y la búsqueda de clientes, en pantalla.</li><li><b>Cómo se convierte en un servicio.</b> A quién le duele el problema y cómo se lo presentas con su propio caso.</li><li><b>Cómo se entrega desde donde estés.</b> Sin programar y sin vivir en la ciudad del cliente.</li></ul>') +
      win('Quién te la da', '<p style="margin:0;font-size:17px;line-height:1.5">Soy Diego Vetencourt. Instalo agentes de IA en negocios y enseño a otras personas a ofrecerlos como servicio con Soluciones Artificiales.</p>')
    );
    document.getElementById('ev-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('ev-n').value.trim(), em = document.getElementById('ev-e').value.trim();
      var w = document.getElementById('ev-w').value.trim().replace(/[^0-9+]/g, ''), cc = document.getElementById('ev-cc').value, err = document.getElementById('ev-err');
      if (cc !== '+0' && w[0] !== '+') { var nd = w.replace(/\D/g, ''); if (cc === '+1' && nd.length === 11 && nd[0] === '1') nd = nd.slice(1); if (cc === '+1809') { cc = '+1'; if (nd.length === 7) nd = '809' + nd; } w = cc + nd; }
      if (!n) { err.textContent = 'Escribe tu nombre.'; return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { err.textContent = 'Revisa tu correo.'; return; }
      var dg = w.replace(/\D/g, ''); if (w[0] !== '+' || dg.length < 9 || dg.length > 15) { err.textContent = 'Revisa tu WhatsApp: elige el país y escribe el número completo.'; return; }
      w = '+' + dg; err.textContent = '';
      var f2 = calcularClase(Date.now());
      var d = new URLSearchParams({ nombre: n, correo: em, whatsapp: w, fecha_calc: iso(f2), fecha_texto: textoFecha(f2), variante: 'evergreen', zona: zonaLocal(), utm_source: qs.get('utm_source') || '', utm_medium: qs.get('utm_medium') || '', utm_campaign: qs.get('utm_campaign') || '', utm_content: qs.get('utm_content') || '', pagina: location.origin + location.pathname });
      var btn = e.target.querySelector('button'); btn.disabled = true; btn.textContent = 'Reservando…';
      try { fetch(CFG.HOOK_REGISTRO, { method: 'POST', mode: 'no-cors', body: d }); } catch (x) { }
      ls('ev_datos', JSON.stringify({ nombre: n, correo: em, whatsapp: w, d: iso(f2) }));
      if (!ls('ev_lead_' + iso(f2))) { fb('track', 'Lead', { content_name: 'Webinar evergreen OP90' }); ls('ev_lead_' + iso(f2), '1'); }
      setTimeout(function () { location.href = url('masterclass-confirmada') + '?d=' + iso(f2); }, 700);
    });
  }

  /* ---------- Página: confirmada (/masterclass-confirmada) ---------- */
  function confirmada() {
    pixel();
    var f = parseFecha(qs.get('d')) || (function () { try { return parseFecha(JSON.parse(ls('ev_datos')).d); } catch (e) { return null; } })() || calcularClase(Date.now());
    var inicio = instanteNY(f.y, f.m, f.d, CFG.HORA_NY), fin = inicio + 2 * 3600000;
    // El evento del calendario lleva el link de la sala (Diego, 18-oct: «debería incluir el link de la sala»)
    var cSala = qs.get('c') || ls('ev_c'), salaLink = CFG.BASE + '/masterclass-sala?d=' + iso(f) + (cSala && /^[A-Za-z0-9]{8,40}$/.test(cSala) ? '&c=' + cSala : '');
    var detalle = 'Entra a tu clase aquí, a la hora exacta:\n' + salaLink + '\n\nGuarda este link. También te llega por correo y WhatsApp.';
    var gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent('Clase con Diego Vetencourt · Agentes de IA') + '&dates=' + new Date(inicio).toISOString().replace(/[-:]|\.\d{3}/g, '') + '/' + new Date(fin).toISOString().replace(/[-:]|\.\d{3}/g, '') + '&details=' + encodeURIComponent(detalle) + '&location=' + encodeURIComponent(salaLink);
    var ics = 'data:text/calendar;charset=utf-8,' + encodeURIComponent('BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Soluciones Artificiales//Clase//ES\r\nBEGIN:VEVENT\r\nUID:ev-' + iso(f) + '@solucionesartificiales.com\r\nDTSTAMP:' + new Date().toISOString().replace(/[-:]|\.\d{3}/g, '') + '\r\nDTSTART:' + new Date(inicio).toISOString().replace(/[-:]|\.\d{3}/g, '') + '\r\nDTEND:' + new Date(fin).toISOString().replace(/[-:]|\.\d{3}/g, '') + '\r\nSUMMARY:Clase con Diego Vetencourt · Agentes de IA\r\nDESCRIPTION:' + detalle.replace(/\n/g, '\\n') + '\r\nLOCATION:' + salaLink + '\r\nURL:' + salaLink + '\r\nEND:VEVENT\r\nEND:VCALENDAR');
    marco(
      '<h1>Listo, tu lugar quedó confirmado</h1>' +
      win('Tu clase', '<p class="fecha">' + esc(textoFecha(f)) + '<br>7:00 PM hora de Miami</p>' + (horaLocal(inicio) ? '<p class="local">En tu zona horaria: ' + esc(horaLocal(inicio)) + '.</p>' : '') +
        '<a class="btn" href="' + gcal + '" target="_blank" rel="noopener">Agregar a Google Calendar</a><a class="btn sec" href="' + ics + '" download="clase-diego.ics">Agregar a otro calendario (.ics)</a>') +
      win('Antes de la clase', '<ul class="lista"><li>Te acabo de mandar el acceso por correo y por WhatsApp. Si no ves el correo, revisa Promociones o Spam y muévelo a Principal.</li><li>La clase empieza a la hora exacta y no se adelanta. Entra unos minutos antes.</li><li>Piensa en un negocio que conozcas que responda tarde a sus clientes. Lo vas a ver distinto después de la clase.</li></ul>')
    );
  }

  /* ---------- Línea de tiempo del programa (tramos del video) ---------- */
  var TR = CFG.TRAMOS && CFG.TRAMOS.length ? CFG.TRAMOS : [[0, 7200]];
  var DUR = TR.reduce(function (a, t) { return a + (t[1] - t[0]); }, 0);
  var OFERTA = CFG.OFERTA_EN == null ? DUR : CFG.OFERTA_EN;
  function aFuente(p) { var acc = 0; for (var i = 0; i < TR.length; i++) { var l = TR[i][1] - TR[i][0]; if (p < acc + l) return TR[i][0] + (p - acc); acc += l; } return TR[TR.length - 1][1]; }
  function aPrograma(s) { var acc = 0; for (var i = 0; i < TR.length; i++) { if (s < TR[i][0]) return acc; if (s < TR[i][1]) return acc + (s - TR[i][0]); acc += TR[i][1] - TR[i][0]; } return DUR; }

  /* ---------- Página: sala y replay ---------- */
  function sala(esReplay) {
    pixel();
    var c = qs.get('c'); if (c) ls('ev_c', c);
    var f = parseFecha(qs.get('d')) || (function () { try { return parseFecha(JSON.parse(ls('ev_datos')).d); } catch (e) { return null; } })();
    var datos = {}; try { datos = JSON.parse(ls('ev_datos')) || {}; } catch (e) { }
    if (!f) {
      marco('<h1>No encontramos la fecha de tu clase</h1>' + win('Qué hacer', '<p style="font-size:18px;margin:0 0 8px">Entra desde el link personal que te llegó por correo o WhatsApp. Si no lo tienes, reserva tu lugar otra vez.</p><a class="btn" href="' + url('masterclass') + '">Reservar mi lugar</a>'));
      return;
    }
    var horaQA = /^\d{1,2}$/.test(qs.get('h') || '') ? +qs.get('h') : CFG.HORA_NY; // solo para pruebas de QA
    var inicio = instanteNY(f.y, f.m, f.d, horaQA), finProg = inicio + DUR * 1000, cierreReplay = inicio + CFG.REPLAY_HORAS * 3600000;
    var agendaSrc = CFG.AGENDA + (datos.nombre ? '?first_name=' + encodeURIComponent(datos.nombre) + '&email=' + encodeURIComponent(datos.correo || '') + '&phone=' + encodeURIComponent(datos.whatsapp || '') : '');
    marco(
      '<span class="estado" id="ev-estado"><span class="punto"></span> ' + (esReplay ? 'Repetición' : 'Clase programada') + '</span>' +
      '<h1>' + (esReplay ? 'La clase completa, disponible 48 horas' : 'Tu clase: ' + esc(textoFecha(f)) + ', 7:00 PM Miami') + '</h1>' +
      '<p class="sub">' + (esReplay ? 'Es la misma clase que se transmitió a tu hora. Al final te explico el siguiente paso.' : 'Es una clase grabada en vivo que se transmite a esta hora, como una clase con horario. Si llegas tarde, entras en el minuto en que va.') + '</p>' +
      '<div class="sala" id="ev-sala"><div class="col">' +
      '<div class="video" id="ev-video"><div id="ev-yt"></div><div class="escudo oculto" id="ev-escudo" aria-hidden="true"></div><div class="tapa" id="ev-tapa"></div><div class="volver oculto" id="ev-volver"><p style="margin:0;font-size:17px">La clase sigue en vivo</p><button class="btn" type="button" id="ev-volver-btn">▶ Volver a la clase</button></div></div><div class="controles oculto" id="ev-ctrl"></div>' + (!esReplay && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent || '') ? '<p class="avisomovil">Deja esta pantalla abierta. Si sales a otra app, al volver te llevo al minuto en vivo.</p>' : '') +
      '<div id="ev-oferta" class="oculto">' + win('Siguiente paso', '<h2>Agenda tu llamada con mi equipo</h2><p style="font-size:18px;line-height:1.5;margin:0 0 6px">Vemos tu caso, qué quieres lograr en los próximos 90 días y si Operador 90 tiene sentido para ti. Si no lo tiene, te lo decimos.</p><button class="btn" type="button" id="ev-agendar">Agendar mi llamada con el equipo</button><div class="cal oculto" id="ev-cal"><iframe title="Agenda" scrolling="no" id="j5jRGE57xpyhMZtXuix7_ev"></iframe></div>') + '</div>' +
      '</div><aside class="chat" id="ev-chat" aria-label="Chat de la clase"><div class="bar"><span>Chat de la clase</span><i aria-hidden="true"><b></b><b></b></i></div>' +
      '<p class="rotulo">Comentarios de la clase en vivo</p><div class="msgs" id="ev-msgs" role="log" aria-live="off"></div>' +
      '<form class="escribir" id="ev-escribir" autocomplete="off"><input id="ev-texto" maxlength="300" placeholder="Escribe tu pregunta o comentario" aria-label="Tu mensaje"><button type="submit">Enviar</button></form></aside></div>'
    );
    try { document.getElementById('ev').classList.add('conchat'); } catch (e) { }
    var tapa = document.getElementById('ev-tapa'), oferta = document.getElementById('ev-oferta');
    var ofertaVista = false;
    function verAgenda() { if (!oferta.classList.contains('oculto')) return; oferta.classList.remove('oculto'); fb('trackCustom', 'OP90_WebinarAgendaVisible', { modo: esReplay ? 'replay' : 'sala' }); }
    function verOferta() { verAgenda(); if (ofertaVista) return; ofertaVista = true; senal('oferta'); fb('trackCustom', 'OP90_WebinarOferta', { modo: esReplay ? 'replay' : 'sala' }); }
    function abrirAgenda(origen) { // botón bajo el video o botón del chat: abre el calendario W debajo del video, sin salir de la clase
      verAgenda(); senal('clic_agenda'); fb('trackCustom', 'OP90_WebinarClicAgenda', { origen: origen || 'boton' });
      var cal = document.getElementById('ev-cal'), ifr = cal.querySelector('iframe');
      if (!ifr.src) { ifr.src = agendaSrc; var s = document.createElement('script'); s.src = 'https://link.msgsndr.com/js/form_embed.js'; document.body.appendChild(s); }
      cal.classList.remove('oculto'); document.getElementById('ev-agendar').classList.add('oculto'); try { cal.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { }
    }
    document.getElementById('ev-agendar').addEventListener('click', function () { abrirAgenda('boton'); });
    window.addEventListener('message', function (e) { if (e && e.data && e.data.op90 === 'agendo') senal('agendo_pagina'); });

    // Estado según la hora
    var player = null, listo = false, timer = null, vistos = 0, ultimo = null, pausaTicks = 0;
    function ahoraProg() { return (Date.now() - inicio) / 1000; }
    function pintar() {
      var now = Date.now();
      if (esReplay) {
        if (now < finProg && now >= inicio) { tapa.innerHTML = '<p style="font-size:20px;margin:0">Tu clase se está transmitiendo ahora.</p><a class="btn" href="' + url('masterclass-sala') + location.search + '">Ir a la clase en curso</a>'; return; }
        if (now < inicio) { tapa.innerHTML = '<p style="font-size:20px;margin:0">La repetición se abre después de tu clase.</p>'; return; }
        if (now > cierreReplay) { tapa.innerHTML = '<p style="font-size:20px;margin:0">La repetición ya cerró.</p><p style="margin:0">Si quieres ver tu caso con mi equipo, todavía puedes agendar.</p>'; verOferta(); return; }
        tapa.innerHTML = '<button class="btn" type="button" id="ev-play">▶ Ver la clase</button>'; document.getElementById('ev-play').onclick = function () { arrancar(0); senal('replay'); };
        return;
      }
      if (now < inicio) {
        var s = Math.max(0, Math.floor((inicio - now) / 1000)), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
        tapa.innerHTML = '<p style="font-size:18px;margin:0">Empieza en</p><div class="cuenta"><div>' + d + '<small>DÍAS</small></div><div>' + pad(h) + '<small>HORAS</small></div><div>' + pad(m) + '<small>MIN</small></div><div>' + pad(ss) + '<small>SEG</small></div></div><p style="margin:0">' + esc(horaLocal(inicio)) + ' (tu hora)</p>';
        return;
      }
      if (now >= finProg) {
        clearInterval(timer);
        tapa.innerHTML = '<p style="font-size:20px;margin:0">La clase de hoy ya terminó.</p>' + (now < cierreReplay ? '<a class="btn" href="' + url('masterclass-replay') + location.search + '">Ver la repetición (48 horas)</a>' : '');
        verOferta(); return;
      }
      if (!listo) { tapa.innerHTML = '<p style="font-size:20px;margin:0"><span class="punto"></span> La clase está en curso</p><button class="btn" type="button" id="ev-play">▶ Entrar a la clase con sonido</button>'; document.getElementById('ev-play').onclick = function () { fb('trackCustom', 'OP90_WebinarAsistio', { minuto: Math.floor(ahoraProg() / 60) }); arrancar(ahoraProg()); }; clearInterval(timer); }
    }
    // Controles propios: el video de YouTube queda recortado y tapado para que no se pueda abrir YouTube ni ver el título.
    function montarControles() {
      var esc = document.getElementById('ev-escudo'), c = document.getElementById('ev-ctrl'), caja = document.getElementById('ev-video');
      esc.classList.remove('oculto'); c.classList.remove('oculto');
      function b(txt, fn2, id) { var x = document.createElement('button'); x.type = 'button'; x.textContent = txt; if (id) x.id = id; x.onclick = fn2; c.appendChild(x); return x; }
      function mm(t) { t = Math.max(0, Math.floor(t)); return Math.floor(t / 60) + ':' + pad(t % 60); }
      if (esReplay) {
        var bp = b('❚❚ Pausa', function () { var st = player.getPlayerState(); if (st === 1) { player.pauseVideo(); bp.textContent = '▶ Seguir'; } else { player.playVideo(); bp.textContent = '❚❚ Pausa'; } });
        b('« 15 s', function () { player.seekTo(Math.max(0, player.getCurrentTime() - 15), true); });
        b('15 s »', function () { player.seekTo(player.getCurrentTime() + 15, true); });
      }
      var bs = b('🔊 Sonido', function () { if (player.isMuted()) { player.unMute(); bs.textContent = '🔊 Sonido'; } else { player.mute(); bs.textContent = '🔇 Sin sonido'; } });
      if (caja.requestFullscreen) b('⛶ Pantalla completa', function () { if (document.fullscreenElement) document.exitFullscreen(); else caja.requestFullscreen().catch(function () { }); });
      var t = document.createElement('span'); t.className = 't'; c.appendChild(t);
      setInterval(function () { try { t.textContent = mm(aPrograma(player.getCurrentTime())) + ' / ' + mm(DUR); } catch (e) { } }, 1000);
    }
    function arrancar(prog) {
      tapa.innerHTML = '<p>Cargando la clase…</p>';
      cargarYT(function () {
        player = new YT.Player('ev-yt', {
          videoId: CFG.YT_ID, playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1, start: Math.floor(aFuente(Math.max(0, prog))) },
          events: {
            onReady: function (ev) { listo = true; tapa.style.display = 'none'; montarControles(); ev.target.seekTo(aFuente(Math.max(0, esReplay ? prog : ahoraProg())), true); ev.target.playVideo(); setInterval(vigilar, 1000); },
            onStateChange: function (ev) { if (!esReplay && ev.data === 2) { /* pausa: al volver se resincroniza con la hora */ } if (!esReplay && ev.data === 1) { var p = ahoraProg(); if (Math.abs(aPrograma(player.getCurrentTime()) - p) > 8) player.seekTo(aFuente(p), true); } }
          }
        });
      });
    }
    function vigilar() {
      if (!player || !player.getCurrentTime) return;
      var s = player.getCurrentTime(), p = aPrograma(s), estado = player.getPlayerState ? player.getPlayerState() : -1;
      // Saltar lo que está fuera de los tramos
      var dentro = TR.some(function (t) { return s >= t[0] - 0.5 && s < t[1]; });
      if (!dentro && estado === 1) { if (p >= DUR - 1) { player.pauseVideo(); verOferta(); } else player.seekTo(aFuente(p), true); }
      if (estado === 1) { if (ultimo != null && s - ultimo > 0 && s - ultimo < 3) vistos += s - ultimo; ultimo = s; } else ultimo = null;
      if (!esReplay && vistos >= 60) senal('asistio', { minuto: Math.floor(p / 60) });
      if (p >= DUR * 0.5) senal('vio50');
      if (p >= CFG.AGENDA_EN) verAgenda();
      if (p >= OFERTA - 2) verOferta();
      if (!esReplay) { pausaTicks = (estado === 2 || estado === 5 || estado === -1) && p < DUR - 1 ? pausaTicks + 1 : 0; var vv = document.getElementById('ev-volver'); if (vv) vv.classList.toggle('oculto', pausaTicks < 3); }
    }
    // Celular: si la persona sale a otra app, YouTube se pausa. Al volver, la llevo al minuto en vivo; si el teléfono no deja seguir solo, aparece «Volver a la clase».
    function alVivo() { if (!player || !listo || esReplay) return; var p = ahoraProg(); if (p >= DUR) return; try { player.seekTo(aFuente(p), true); player.playVideo(); } catch (e) { } }
    document.addEventListener('visibilitychange', function () { if (!document.hidden) alVivo(); });
    window.addEventListener('pageshow', function () { alVivo(); });
    document.getElementById('ev-volver-btn').addEventListener('click', function () { try { player.unMute(); } catch (e) { } alVivo(); document.getElementById('ev-volver').classList.add('oculto'); });
    /* ---------- Chat de la sala ----------
       Muestra los comentarios REALES del vivo del 30-sep (chat-30sep.json) cuando el programa llega a su segundo «t».
       Lo que escribe el espectador se ve en su chat y va a GHL (webhook de señales) como evento «chat» para que responda el equipo.
       No hay contador de personas: la página no tiene una forma segura de leer los registrados reales. */
    function iniciarChat() {
      var caja = document.getElementById('ev-msgs'), salaEl = document.getElementById('ev-sala'), form = document.getElementById('ev-escribir'), campo = document.getElementById('ev-texto');
      if (!caja || !salaEl || !form) return;
      var CHAT_URL = /evergreen\.js(\?.*)?$/.test(SRC) ? SRC.replace(/evergreen\.js(\?.*)?$/, 'chat-30sep.json') : CFG.CHAT_URL;
      var EQ = (CFG.CHAT_AGENDA || []).map(function (t, i) { return { t: t, eq: 1, m: i === 0 ? 'Si ya sabes que quieres que los agentes trabajen por ti, agenda aquí tu llamada con mi equipo. La clase sigue mientras eliges tu horario.' : 'El calendario para hablar con mi equipo está abierto. Toca el botón y elige tu horario sin salir de la clase.' }; });
      var LISTA = EQ.slice(), propios = [], mostrado = -1, idx = 0, avisado = false, ultimoEnvio = 0;
      var cC = qs.get('c') || ls('ev_c'), cOK = !!(cC && /^[A-Za-z0-9]{8,40}$/.test(cC));
      var yo = cOK ? 'Tú' : (datos.nombre ? String(datos.nombre).split(' ')[0] : 'Tú');
      var kPropios = 'ev_chat_' + (cOK ? cC : 'anon') + '_' + iso(f);
      try { propios = JSON.parse(ls(kPropios) || '[]') || []; } catch (e) { propios = []; }
      function hms(x) { x = Math.max(0, Math.floor(x)); return Math.floor(x / 3600) + ':' + pad(Math.floor(x % 3600 / 60)) + ':' + pad(x % 60); }
      function prog() { // segundo del programa que toca mostrar; -1 = todavía no empieza
        if (player && listo && player.getCurrentTime) { var st = player.getPlayerState ? player.getPlayerState() : -1; if (esReplay || st === 1 || st === 3) return Math.min(DUR, aPrograma(player.getCurrentTime())); }
        if (esReplay || Date.now() < inicio) return -1;
        return Math.min(DUR, (Date.now() - inicio) / 1000);
      }
      function nodo(o, clase) {
        var p = document.createElement('p');
        if (o.eq) { p.className = 'msg equipo'; p.innerHTML = '<b>Equipo de Diego</b>' + esc(o.m); var bt = document.createElement('button'); bt.type = 'button'; bt.textContent = 'Agendar mi llamada'; bt.onclick = function () { abrirAgenda('chat'); }; p.appendChild(bt); return p; }
        p.className = 'msg' + (clase ? ' ' + clase : ''); p.innerHTML = (o.n ? '<b>' + esc(o.n) + '</b>' : '') + esc(o.m); return p;
      }
      function recortar() { var ms = caja.querySelectorAll('.msg'); for (var i = 0; i < ms.length - CFG.CHAT_MAX; i++) caja.removeChild(ms[i]); }
      function abajo() { caja.scrollTop = caja.scrollHeight; }
      function reconstruir(p) { // pinta de una vez lo que ya pasó (al entrar tarde o al saltar en la repetición)
        caja.innerHTML = '';
        var arr = [];
        LISTA.forEach(function (o) { if (o.t <= p) arr.push(o); });
        propios.forEach(function (o) { if (p < 0 || o.t <= p) arr.push({ t: o.t, n: yo, m: o.m, yo: 1 }); });
        arr.sort(function (a, b) { return a.t - b.t; });
        if (p < 0) { var v = document.createElement('p'); v.className = 'vacio'; v.textContent = esReplay ? 'Los comentarios de la clase aparecen a su minuto cuando le das play.' : 'Los comentarios de la clase aparecen cuando empiece.'; caja.appendChild(v); }
        arr.slice(-CFG.CHAT_AL_ENTRAR).forEach(function (o) { caja.appendChild(nodo(o, o.yo ? 'yo' : '')); });
        var ultEq = null; LISTA.forEach(function (o) { if (o.eq && o.t <= p) ultEq = o; }); // el aviso de agenda no se pierde al entrar tarde
        if (ultEq && arr.slice(-CFG.CHAT_AL_ENTRAR).indexOf(ultEq) < 0) caja.appendChild(nodo(ultEq));
        idx = 0; while (idx < LISTA.length && LISTA[idx].t <= p) idx++;
        abajo();
      }
      function tick() {
        var now = Date.now(), visible = !esReplay || (now >= finProg && now <= cierreReplay);
        salaEl.classList.toggle('sinchat', !visible); if (!visible) return;
        var p = prog();
        if (p < 0) { if (mostrado !== -2) { reconstruir(-1); mostrado = -2; } return; }
        if (mostrado < 0 || p < mostrado - 3 || p > mostrado + 30) { reconstruir(p); mostrado = p; return; }
        var pegado = caja.scrollHeight - caja.scrollTop - caja.clientHeight < 80, hubo = false;
        while (idx < LISTA.length && LISTA[idx].t <= p) { caja.appendChild(nodo(LISTA[idx])); idx++; hubo = true; }
        if (hubo) { recortar(); if (pegado) abajo(); }
        mostrado = p;
      }
      function mandar(texto, p) { // a GHL: Evergreen · señales de la sala (mismo webhook), evento «chat»
        var d = new URLSearchParams({ evento: 'chat', c: cOK ? cC : '', contact_id: cOK ? cC : '', texto: texto, t: String(p < 0 ? 0 : Math.round(p)), minuto: p < 0 ? 'antes de empezar' : hms(p), video_en: p < 0 ? '' : hms(aFuente(p)), pagina: PAGINA, fecha_clase: iso(f) });
        if (!cOK) { if (!datos.correo && !datos.whatsapp) return false; d.set('nombre', datos.nombre || ''); d.set('correo', datos.correo || ''); d.set('whatsapp', datos.whatsapp || ''); }
        try { fetch(CFG.HOOK_SENALES, { method: 'POST', mode: 'no-cors', body: d }); return true; } catch (e) { return false; }
      }
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var texto = campo.value.replace(/\s+/g, ' ').trim().slice(0, 300); if (!texto) return;
        var ahora = Date.now(); if (ahora - ultimoEnvio < 2500) return; ultimoEnvio = ahora;
        var p = prog();
        propios.push({ t: p < 0 ? 0 : Math.round(p), m: texto }); if (propios.length > 30) propios = propios.slice(-30); ls(kPropios, JSON.stringify(propios));
        caja.appendChild(nodo({ n: yo, m: texto }, 'yo')); recortar(); campo.value = '';
        var ok = mandar(texto, p);
        if (!avisado || !ok) { avisado = true; caja.appendChild(nodo({ m: ok ? 'Tu mensaje le llegó al equipo de Diego. Te responden por WhatsApp.' : 'Para que el equipo te responda, entra desde el link personal que te llegó por correo o WhatsApp.' }, 'nota')); }
        abajo();
      });
      try { fetch(CHAT_URL).then(function (r) { return r.ok ? r.json() : []; }).then(function (a) { if (Array.isArray(a)) { LISTA = a.filter(function (o) { return o && typeof o.t === 'number' && o.m; }).concat(EQ).sort(function (x, y) { return x.t - y.t; }); mostrado = -1; tick(); } }).catch(function () { }); } catch (e) { }
      tick(); setInterval(tick, 1000);
    }
    iniciarChat();
    pintar(); timer = setInterval(pintar, 1000);
  }
  function cargarYT(cb) {
    if (window.YT && window.YT.Player) return cb();
    var prev = window.onYouTubeIframeAPIReady; window.onYouTubeIframeAPIReady = function () { if (prev) try { prev(); } catch (e) { } cb(); };
    var s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
  }

  // Exponer para pruebas (sin datos personales)
  window.__evergreen = { calcularClase: calcularClase, instanteNY: instanteNY, parseFecha: parseFecha, textoFecha: textoFecha, iso: iso, aFuente: aFuente, aPrograma: aPrograma, DUR: DUR };

  if (PAGINA === 'prueba') { /* solo expone funciones */ }
  else if (PAGINA === 'confirmada') confirmada();
  else if (PAGINA === 'sala') sala(false);
  else if (PAGINA === 'replay') sala(true);
  else registro();
})();
