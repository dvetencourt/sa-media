/* Cerebro · landings de tráfico frío para Productízate (Soluciones Artificiales)
   Tres páginas, un solo script. El ángulo sale de la ruta:
     solucionesartificiales.com/cerebro-clon      → clon
     solucionesartificiales.com/cerebro-libertad  → libertad
     solucionesartificiales.com/cerebro-agencia   → agencia
   Respaldo: ?a=clon|libertad|agencia. Por defecto: clon.
   En cada página de GHL va un solo bloque: <div id="cbhost"></div><script src=".../cerebro.js"></script>
   Sin precio. Brandbook SA: papel, tinta, cobalto, coral; ventanas con barra cobalto, sin radios, sombras sólidas.
   Revisión interna: ?revision=1 muestra el hueco del video cuando todavía no hay video cargado. */
(function () {
  if (window.__CB_CARGADO) return; window.__CB_CARGADO = true;

  var CFG = {
    FORM_ID: 'KCMtD2zwUa8HFxJJFnti',   // formulario GHL actual («Productízate · Sí o No»). Cambiar por el de aplicación cuando exista (ver FORMULARIO-APLICACION.md)
    FORM_ALTO: 900,
    PIXEL: '706725165238205',
    BONO_ACTIVO: false,                // falta confirmar cuántos códigos de créditos quedan. No prender sin el sí de Diego
    BONO_TITULO: 'USD 1.500 en créditos de inteligencia',
    GARANTIA: 'Si en 90 días no recuperas tu inversión y tu tiempo con tu cerebro, te devolvemos tu dinero.', // Diego, 22-oct
    BONO_TEXTO: 'Créditos de inteligencia (Muse) para que tu equipo trabaje desde el día uno sin gastar en uso, y tu CRM incluido por un año: contactos, agendas y recordatorios en un solo lugar.',
    MEDIA: 'https://dvetencourt.github.io/sa-media/cerebro/',
    // Video por ángulo. src vacío = sin video (la página se acomoda sola). formato: '9:16' o '16:9'.
    VIDEO: {
      clon:     { src: 'media/clon.mp4', poster: 'media/clon.jpg', formato: '9:16', etiqueta: 'Diego · 30 segundos' },
      libertad: { src: 'media/libertad.mp4', poster: 'media/libertad.jpg', formato: '9:16', etiqueta: 'Diego · 40 segundos' },
      agencia:  { src: 'media/agencia.mp4', poster: 'media/agencia.jpg', formato: '9:16', etiqueta: 'Diego · 45 segundos' }
    }
  };
  var SRC = (document.currentScript && document.currentScript.src) || '';
  if (/cerebro\.js(\?.*)?$/.test(SRC)) CFG.MEDIA = SRC.replace(/cerebro\.js(\?.*)?$/, '');

  /* ---------- ángulo ---------- */
  var A = (function () {
    var ruta = (location.pathname || '').toLowerCase();
    if (ruta.indexOf('libertad') > -1) return 'libertad';
    if (ruta.indexOf('agencia') > -1) return 'agencia';
    if (ruta.indexOf('clon') > -1) return 'clon';
    var q = '';
    try { q = (new URLSearchParams(location.search).get('a') || '').toLowerCase(); } catch (e) { }
    return (q === 'libertad' || q === 'agencia' || q === 'clon') ? q : 'clon';
  })();
  var REVISION = /[?&]revision=1/.test(location.search);

  function win(titulo, cuerpo, extra) { return '<section class="win' + (extra ? ' ' + extra : '') + '"><div class="bar"><span>' + titulo + '</span><i aria-hidden="true"><b></b><b></b></i></div><div class="body">' + cuerpo + '</div></section>'; }
  function lista(items) { return '<ul class="lista">' + items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>'; }

  /* ---------- pruebas (solo nombre de pila; permiso de Violeta y Ponciano, 22-oct) ---------- */
  var PRUEBAS = {
    psico: {
      barra: 'Caso · psicoterapeuta',
      quien: 'Violeta · programa posparto · trabajaba sola',
      texto: 'Una agencia le cotizó su proyecto completo, con cobro todos los meses: estrategia, contenido, página de venta, correos. Le pasé esa propuesta a mis agentes, los mismos que vas a tener tú, y <b>en una hora</b> le entregué todo lo que la agencia le ofrecía. Hoy opera su negocio sin empleados.',
      f: {
        clon: '«Lo que necesita es un sistema que le permita llegar a esas conclusiones ella sola.»',
        libertad: '«La gente te pide el recurso y se desaparece. Y tú no vas a estar encima de cada uno.»',
        agencia: '«No se lo dije. Se lo di.»'
      }
    },
    mx: {
      barra: 'Caso · empresa en México',
      quien: 'Ponciano · más de 120 personas · 10 vendedores',
      texto: 'Diez vendedores y un CRM que nadie había leído a fondo. El dueño tenía todo el contexto en su cabeza y todas las decisiones pasaban por él. Con el cerebro, los agentes leen el CRM con las reglas que él pone, le traen un destilado de dónde se pierden las oportunidades y le preparan a cada vendedor la ficha del prospecto antes de la llamada.',
      f: {
        clon: '«Tú manejas todo el contexto en tu cabeza, pero no tienes un par que te rete.»',
        libertad: '«Mientras te vas a tomar una cerveza con tu familia, ya te trajo toda la data.»',
        agencia: '«Pones un agente que te haga un diagnóstico y te lo hizo en un día. ¿Para qué necesitas un mes?»'
      }
    },
    sa: {
      barra: 'Caso cero · mi propio negocio',
      quien: 'Soluciones Artificiales · así opera hoy',
      texto: 'Lo que te instalo es lo mismo que uso. Mis agentes le escriben a cada persona que se registra, le dan seguimiento hasta la llamada, hacen mi contenido y me arman el reporte del día.',
      f: {
        clon: '«Pude productizar todo para que la entrega del servicio no dependiera de mí ni de nadie.»',
        libertad: '«Cuando me levanto, lo primero que hago es contarle cómo me siento. Porque sé que todo lo demás está cubierto.»',
        agencia: '«Yo no tercerizo con nadie ya. Ni mi contenido ni nada.»'
      }
    }
  };

  /* ---------- qué NO es ---------- */
  var NOES = {
    agencia: win('No es una agencia', '<p>No pagas un retainer para esperar resultados que no ves. Lo que se instala lo manejas tú.</p>'),
    curso: win('No es un curso', '<p>No te pide ver clases. Le hablas a tu equipo en español y el equipo hace el trabajo contigo.</p>'),
    contrato: win('No es un contrato', '<p>Vive en tu computadora y es tuyo. «Yo no voy a tener acceso a esto.» No vas a depender de mí.</p>'),
    todos: win('No es para todos', '<p>Es para dueños de negocio que ya facturan. Si estás empezando, o buscas que alguien lo haga todo por ti para siempre, esto no es para ti, y te lo digo en la llamada.</p>')
  };

  /* ---------- los tres ángulos ---------- */
  var ANG = {
    clon: {
      doc: 'Tu conocimiento, clonado | Soluciones Artificiales',
      ceja: 'Productízate · para dueños de negocio que ya facturan',
      h1: 'Todo lo que sabes, <em>clonado</em> en un equipo que trabaja por ti.',
      sub: 'Tomo tu conocimiento y lo instalo en un equipo de inteligencia artificial que vive en tu computadora. Contesta, vende y publica con tu criterio. Y es tuyo.',
      nota: 'Una hora de instalación · en vivo · en tu computadora',
      cta: 'Aplica: quiero clonar lo que sé',
      hero: 'der',
      orden: ['bloque', 'pruebas', 'llevas', 'bono', 'noes', 'garantia', 'form'],
      pruebas: ['sa', 'psico', 'mx'],
      noes: ['curso', 'contrato', 'agencia', 'todos'],
      bloque: function () {
        return '<section class="blq"><span class="ceja">Cómo se clona lo que sabes</span><h2>Tu cerebro primero te conoce. Después trabaja.</h2>' +
          '<div class="tres">' +
          win('Sesión 1 · una hora', '<span class="num">01</span><h3>Lo instalamos juntos</h3><p>En vivo, compartiendo pantalla. Te instalo cuatro años de agencia comprimidos en un equipo de agentes, en tu computadora.</p>') +
          win('Tu semana · en privado', '<span class="num">02</span><h3>Le hablas de ti</h3><p>Le cuentas quién eres, cómo trabajas, qué sabes y qué quieres. No escribes: le hablas. Nadie más lo lee.</p>') +
          win('Sesión 2 · tu equipo', '<span class="num">03</span><h3>Tu conocimiento empieza a trabajar</h3><p>Armamos tu equipo y tu plan: contenido con tu voz, ventas, seguimiento y anuncios, con tus reglas.</p>') +
          '</div>' +
          '<div class="cita"><p class="f">«Todo lo que tú no sabes hacer, él lo sabe hacer. Pero no lo va a saber hacer si tú no se lo pides.»</p><p class="q">Diego Vetencourt</p></div>' +
          '</section>';
      },
      llevasH: 'Lo que te llevas: tú, multiplicado.',
      llevas: [
        '<b>Un cerebro que te conoce.</b> Tu historia, tu negocio y tu visión, contados por ti en privado.',
        '<b>Tu conocimiento en una carpeta tuya.</b> Lo bajas, le pones tu nombre y vive contigo para siempre.',
        '<b>Un equipo que habla como tú.</b> Contenido, guiones, carruseles y respuestas con tu criterio.',
        '<b>Asesores que te retan.</b> Datos reales de otros negocios para que no decidas solo.',
        '<b>Cuatro años de agencia comprimidos</b> en habilidades listas para trabajar desde el día uno.',
        '<b>Dos sesiones en vivo conmigo</b> y seguimiento después.'
      ],
      cierreH: 'Lo que sabes no tiene por qué dormir cuando tú duermes.',
      cierreP: 'Cuéntame de tu negocio en el formulario. Si tiene sentido, eliges tu hora. Si no lo tiene, te lo digo.'
    },

    libertad: {
      doc: 'Tu negocio sin ti encima | Soluciones Artificiales',
      ceja: 'Para dueños de negocio que ya facturan',
      h1: 'Tu negocio funciona. <em>Mientras tú estés encima.</em>',
      sub: 'Te instalo un equipo de inteligencia artificial que contesta, da seguimiento y te dice qué hacer cada mañana. Para que tu negocio deje de depender de que estés presente.',
      nota: 'Sin contrato · sin aprender tecnología',
      cta: 'Aplica: quiero soltar el negocio',
      hero: 'izq',
      orden: ['bloque', 'llevas', 'pruebas', 'bono', 'noes', 'garantia', 'form'],
      pruebas: ['psico', 'sa', 'mx'],
      noes: ['contrato', 'agencia', 'curso', 'todos'],
      bloque: function () {
        return '<section class="blq"><span class="ceja">¿Te suena?</span><h2>Escribes tú, respondes tú, vendes tú.</h2>' +
          '<div class="dos">' +
          win('Hoy', lista([
            'Tu agenda se llena de referidos, pero gente nueva casi no llega.',
            'Los mensajes se enfrían porque no alcanzas a contestar.',
            'Contrataste a alguien más y volviste al mismo problema.',
            'Si tú paras un día, el negocio para contigo.'
          ])) +
          '<div class="cita" style="margin-top:0"><p class="f">«El reloj está corriendo y tú dices: no he llenado la agenda. ¿Qué hago? ¿Me pongo a contratar? Contrato otro más y vuelvo al mismo problema de antes.»</p><p class="q">Diego Vetencourt</p></div>' +
          '</div>' +
          '<h2 style="margin-top:56px">Tu día, con tu cerebro instalado.</h2>' +
          '<div class="dia">' +
          '<div class="hora"><span class="num">7:30 AM</span><p>Te llega un mensaje: esto es lo que hay que hacer hoy.</p></div>' +
          '<div class="hora"><span class="num">Durante el día</span><p>Contesta, da seguimiento y deja las conversaciones listas para que tú solo cierres.</p></div>' +
          '<div class="hora"><span class="num">En la tarde</span><p>Tú estás con tu familia. Él te trae un destilado de qué está pasando en tu negocio.</p></div>' +
          '<div class="hora"><span class="num">De noche</span><p>Quien escribe tarde no se queda sin respuesta.</p></div>' +
          '</div></section>';
      },
      llevasH: 'Lo que te llevas: tu tiempo de vuelta.',
      llevas: [
        '<b>Un plan cada mañana.</b> Tu cerebro te dice qué hacer hoy, a primera hora.',
        '<b>Seguimiento que no se cae.</b> Responde y da seguimiento aunque estés dormido.',
        '<b>Clientes nuevos sin perseguirlos tú.</b> Busca prospectos, les escribe y te deja las conversaciones listas.',
        '<b>Tareas que se hacen solas</b>, a su hora, todos los días.',
        '<b>Un reporte claro</b> de tu negocio sin tener que abrir diez pantallas.',
        '<b>Dos sesiones en vivo conmigo.</b> Después, no me necesitas.'
      ],
      cierreH: 'Que tu negocio no se apague cuando tú descansas.',
      cierreP: 'Contesta unas preguntas sobre tu negocio. Si tiene sentido, eliges tu hora. Si no lo tiene, te lo decimos.'
    },

    agencia: {
      doc: 'Ten agencia propia | Soluciones Artificiales',
      ceja: 'Para dueños de negocio que ya facturan',
      h1: 'No contrates una agencia. <em>Ten agencia propia.</em>',
      sub: 'Página, embudo, contenido, publicidad y seguimiento, hechos por tu propio equipo de inteligencia artificial. Escala sin depender de nadie. Ni de mí.',
      nota: 'Lo que se instala es tuyo · sin retainer',
      cta: 'Aplica: quiero mi agencia propia',
      hero: 'abajo',
      orden: ['bloque', 'pruebas', 'noes', 'llevas', 'bono', 'garantia', 'form'],
      pruebas: ['psico', 'mx', 'sa'],
      noes: ['agencia', 'contrato', 'curso', 'todos'],
      bloque: function () {
        var filas = [
          ['Cómo pagas', 'Un cobro todos los meses.', 'Se instala una vez y es tuyo.'],
          ['Tu conocimiento', 'Se queda con ellos.', 'Se queda contigo, en tu computadora.'],
          ['Cuánto tarda', 'Semanas para arrancar.', 'Sales de la primera sesión con todo instalado.'],
          ['Quién decide', 'Ellos, a su ritmo.', 'Tú, con datos y a tu ritmo.'],
          ['Si se acaba', 'Te quedas sin nada.', 'Sigue trabajando. No me necesitas.']
        ];
        return '<section class="blq"><span class="ceja">Agencia o agencia propia</span><h2>He estado de los dos lados.</h2>' +
          '<p class="intro">He contratado agencias y he sido la agencia. Y hoy sé que ninguna de las dos es necesaria.</p>' +
          '<div class="tabla"><table><thead><tr><th></th><th>Una agencia</th><th>Tu agencia propia</th></tr></thead><tbody>' +
          filas.map(function (r) { return '<tr><td data-label=""><b>' + r[0] + '</b></td><td data-label="Una agencia">' + r[1] + '</td><td data-label="Tu agencia propia">' + r[2] + '</td></tr>'; }).join('') +
          '</tbody></table></div>' +
          '<div class="cita"><p class="f">«Sé lo frustrante que es decirte: págame un retainer y yo te hago todo. Y luego de un mes tú no estás viendo los resultados que buscabas.»</p><p class="q">Diego Vetencourt</p></div>' +
          '</section>';
      },
      llevasH: 'Lo que te llevas: el equipo completo, en casa.',
      llevas: [
        '<b>Tu página y tu embudo:</b> página, formulario, agenda y recordatorios.',
        '<b>Tu contenido:</b> guiones, carruseles y tu clon hablando en video.',
        '<b>Tu publicidad:</b> el equipo te la prepara y la maneja contigo.',
        '<b>Tu prospección y tus ventas:</b> busca clientes, escribe y da seguimiento.',
        '<b>Tus asesores:</b> te retan antes de que gastes en la idea equivocada.',
        '<b>Actualizaciones cada semana</b> y dos sesiones en vivo conmigo. Sin contrato.'
      ],
      cierreH: 'La agencia que necesitas ya puede ser tuya.',
      cierreP: 'Contesta unas preguntas. Si tiene sentido, eliges tu hora y vemos qué instalar primero. Si no lo tiene, te lo decimos.'
    }
  };
  var P = ANG[A];

  /* ---------- estilos ---------- */
  var CSS = '#cb{--papel:#fffaf2;--blanco:#fff;--tinta:#202329;--cobalto:#234ddb;--coral:#bc442c;--azulp:#dce5ff;--coralp:#ffe3d9;--gris:#505966;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;background:var(--papel);color:var(--tinta);min-height:100vh;width:100vw;position:relative;left:50%;margin-left:-50vw;overflow-x:hidden;line-height:1.5}' +
    '#cb h1,#cb h2,#cb h3{font-family:inherit;font-weight:800;color:var(--tinta);text-transform:none}#cb a{font-family:inherit}' +
    '#cb *{box-sizing:border-box}#cb p{margin:0}#cb .wrap{max-width:1040px;margin:0 auto;padding:18px 16px 72px}' +
    '#cb .top{display:flex;justify-content:space-between;align-items:center;gap:12px}' +
    '#cb .brand{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:6px 12px 6px 6px;border:2px solid var(--tinta);background:var(--blanco);box-shadow:4px 4px 0 var(--tinta);text-decoration:none;color:var(--tinta);font:700 11px/1.05 "Courier New",monospace;text-transform:uppercase;letter-spacing:.04em}' +
    '#cb .mark{width:34px;height:34px;display:grid;place-items:center;border:2px solid var(--tinta);background:var(--coral);color:#fff;font:700 14px "Courier New",monospace}' +
    '#cb .ceja{display:inline-block;font:700 12px "Courier New",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}' +
    '#cb h1{font-size:clamp(34px,4.9vw,62px);line-height:1.04;margin:12px 0 16px;text-wrap:balance;letter-spacing:-.01em}#cb h1 em{font-style:normal;background:var(--azulp);padding:0 .12em;box-shadow:inset 0 -.12em 0 var(--cobalto)}' +
    '#cb h2{font-size:clamp(28px,3.6vw,44px);line-height:1.1;margin:0 0 14px;text-wrap:balance}#cb h3{font-size:21px;line-height:1.2;margin:0 0 6px}' +
    '#cb .sub{font-size:clamp(18px,1.9vw,21px);color:var(--gris);max-width:40ch}' +
    '#cb .btn{display:inline-block;min-height:56px;border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-size:19px;font-weight:700;cursor:pointer;box-shadow:5px 5px 0 var(--tinta);text-align:center;text-decoration:none;padding:15px 26px;transition:transform .15s ease-out,box-shadow .15s ease-out}' +
    '#cb .tp{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;background:var(--blanco);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);padding:20px;text-decoration:none;color:var(--tinta);transition:transform .15s ease-out,box-shadow .15s ease-out}#cb .tp:hover{transform:translate(-2px,-2px);box-shadow:10px 10px 0 var(--tinta)}#cb .tpl{display:grid;gap:4px}#cb .tpe{color:#00b67a;font-size:24px;letter-spacing:2px}#cb .tp b{font-size:22px}#cb .tp small{font-size:16px;color:var(--gris)}#cb .tpb{border:2px solid var(--tinta);background:var(--cobalto);color:#fff;font-weight:700;padding:12px 18px;box-shadow:4px 4px 0 var(--tinta)}#cb .btn.sec{background:var(--blanco);color:var(--tinta)}' +
    '#cb .btn:hover{transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--tinta)}#cb .btn.chico{min-height:44px;font-size:15px;padding:10px 16px;box-shadow:4px 4px 0 var(--tinta)}' +
    '#cb .hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:40px;align-items:center;margin-top:36px;animation:cbin .55s ease-out both}' +
    '#cb .hero.izq{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}#cb .hero.izq .vwin{order:-1}' +
    '#cb .hero.abajo,#cb .hero.solo{grid-template-columns:minmax(0,1fr)}#cb .hero.abajo .txt{max-width:820px}#cb .hero.abajo .sub{max-width:52ch}' +
    '#cb .hero .acc{display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:26px}#cb .nota{font:700 12px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--gris);margin-top:14px}' +
    '#cb .win{background:var(--blanco);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta)}' +
    '#cb .bar{display:flex;justify-content:space-between;align-items:center;gap:10px;background:var(--cobalto);color:#fff;font:700 12px "Courier New",monospace;letter-spacing:.08em;text-transform:uppercase;padding:8px 14px;border-bottom:2px solid var(--tinta)}' +
    '#cb .bar i{display:inline-flex;gap:5px}#cb .bar i b{width:9px;height:9px;border:2px solid #fff;display:block}#cb .body{padding:20px}' +
    '#cb .vwin{max-width:380px;justify-self:center;width:100%;box-shadow:10px 10px 0 var(--azulp),10px 10px 0 2px var(--tinta)}#cb .vwin .body{padding:0;background:#000}' +
    '#cb .vwin video{display:block;width:100%;aspect-ratio:9/16;background:#000;object-fit:cover}#cb .vwin.ancho{max-width:none}#cb .vwin.ancho video{aspect-ratio:16/9;object-fit:contain}' +
    '#cb .hueco{display:grid;place-items:center;aspect-ratio:9/16;background:var(--azulp);color:var(--tinta);font:700 13px "Courier New",monospace;text-transform:uppercase;letter-spacing:.06em;text-align:center;padding:20px}#cb .vwin.ancho .hueco{aspect-ratio:16/9}' +
    '#cb section.blq{margin-top:84px}#cb .intro{font-size:19px;color:var(--gris);max-width:60ch;margin-bottom:22px}' +
    '#cb ul.lista{margin:0;padding:0;list-style:none}#cb ul.lista li{padding:12px 0 12px 30px;position:relative;font-size:19px;line-height:1.45;border-bottom:1px dashed #d7d2c8}#cb ul.lista li:last-child{border-bottom:0}#cb ul.lista li:before{content:"→";position:absolute;left:0;color:var(--cobalto);font-weight:700}' +
    '#cb .dos{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;align-items:start}#cb .tres{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;align-items:start}#cb .cuatro{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}' +
    '#cb .tres .win,#cb .cuatro .win{box-shadow:6px 6px 0 var(--tinta)}#cb .tres p,#cb .cuatro p{font-size:17px;color:var(--gris)}' +
    '#cb .num{font:700 13px "Courier New",monospace;color:var(--coral);letter-spacing:.08em;display:block;margin-bottom:8px;text-transform:uppercase}' +
    '#cb .cita{border-left:4px solid var(--cobalto);padding:4px 0 4px 18px;margin-top:30px}#cb .cita .f{font-size:clamp(20px,2.2vw,25px);font-weight:700;line-height:1.3}#cb .cita .q{font:700 12px/1.5 "Courier New",monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--gris);margin-top:8px}' +
    '#cb .caso .quien{font:700 12px/1.5 "Courier New",monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--coral);margin-bottom:10px}#cb .caso p{font-size:17px;color:var(--gris)}#cb .caso .f{font-size:20px;font-weight:700;line-height:1.3;color:var(--tinta);margin-top:14px;padding-top:14px;border-top:1px dashed #d7d2c8}#cb .caso .q{font:700 11px "Courier New",monospace;text-transform:uppercase;letter-spacing:.05em;color:var(--gris);margin-top:6px}' +
    '#cb .dia{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);background:var(--blanco)}#cb .hora{padding:18px;border-right:2px solid var(--tinta)}#cb .hora:last-child{border-right:0}#cb .hora p{font-size:17px;color:var(--gris)}' +
    '#cb .tabla{overflow-x:auto;border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);background:var(--blanco)}#cb table{border-collapse:collapse;width:100%;min-width:560px}#cb th{background:var(--cobalto);color:#fff;font:700 12px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;text-align:left;padding:10px 14px}#cb td{padding:14px;border-top:1px dashed #d7d2c8;font-size:17px;vertical-align:top}#cb td:nth-child(2){color:var(--gris)}#cb td:nth-child(3){font-weight:700}' +
    '#cb .bono{background:var(--coralp);border:2px solid var(--tinta);box-shadow:8px 8px 0 var(--tinta);padding:22px}#cb .bono b{display:block;font-size:clamp(24px,3vw,34px);line-height:1.1;margin:6px 0 8px}#cb .bono p{font-size:18px;color:var(--gris);max-width:62ch}' +
    '#cb .form .body{padding:8px}#cb .form iframe{display:block;width:100%;border:0}' +
    '#cb .final{margin-top:84px;text-align:center}#cb .final h2{margin-bottom:12px}#cb .final p{font-size:19px;color:var(--gris);max-width:52ch;margin:0 auto 24px}' +
    '#cb .pie{margin-top:56px;padding-top:18px;border-top:2px solid var(--tinta);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font:700 12px "Courier New",monospace;letter-spacing:.04em;text-transform:uppercase;color:var(--gris)}' +
    '@keyframes cbin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){#cb .hero{animation:none}#cb .btn{transition:none}}' +
    '@media (max-width:860px){#cb .hero,#cb .hero.izq{grid-template-columns:minmax(0,1fr);gap:30px;margin-top:26px}#cb .vwin{max-width:330px}#cb .vwin.ancho{max-width:none}#cb .tres,#cb .dos{grid-template-columns:minmax(0,1fr)}#cb .cuatro,#cb .dia{grid-template-columns:repeat(2,minmax(0,1fr))}#cb .hora:nth-child(2){border-right:0}#cb .hora:nth-child(-n+2){border-bottom:2px solid var(--tinta)}#cb section.blq{margin-top:64px}}' +
    '@media (max-width:600px){#cb .tabla{overflow:visible;border:0;box-shadow:none;background:transparent}#cb table{min-width:0}#cb thead{display:none}#cb tbody,#cb tr,#cb td{display:block}#cb tr{background:var(--blanco);border:2px solid var(--tinta);box-shadow:5px 5px 0 var(--tinta);margin-bottom:16px;padding:6px 0}#cb td{border:0;padding:6px 14px}#cb td:before{content:attr(data-label);display:block;font:700 11px "Courier New",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--coral);margin-bottom:2px}#cb td:first-child:before{display:none}#cb td:first-child{font-size:18px;border-bottom:1px dashed #d7d2c8;padding-bottom:10px}}' +
    '@media (max-width:520px){#cb .top .btn{display:none}#cb .hero .btn,#cb .final .btn{width:100%}#cb .body{padding:18px 16px}#cb ul.lista li{font-size:18px}#cb .cuatro,#cb .dia{grid-template-columns:minmax(0,1fr)}#cb .hora{border-right:0;border-bottom:2px solid var(--tinta)}#cb .hora:last-child{border-bottom:0}}';

  /* ---------- piezas ---------- */
  function videoHTML() {
    var v = CFG.VIDEO[A] || {};
    var ancho = v.formato === '16:9';
    if (!v.src) {
      if (!REVISION) return '';
      return win(v.etiqueta || 'Video', '<div class="hueco">Aquí va el video del ángulo «' + A + '» (' + (v.formato || '9:16') + ')</div>', 'vwin' + (ancho ? ' ancho' : ''));
    }
    var src = /^https?:/.test(v.src) ? v.src : CFG.MEDIA + v.src;
    var poster = v.poster ? (/^https?:/.test(v.poster) ? v.poster : CFG.MEDIA + v.poster) : '';
    return win(v.etiqueta || 'Video', '<video src="' + src + '"' + (poster ? ' poster="' + poster + '"' : '') + ' controls playsinline preload="metadata" aria-label="Video de Diego Vetencourt"></video>', 'vwin' + (ancho ? ' ancho' : ''));
  }

  function heroHTML() {
    var vid = videoHTML();
    var modo = vid ? P.hero : 'solo';
    var txt = '<div class="txt"><span class="ceja">' + P.ceja + '</span><h1>' + P.h1 + '</h1><p class="sub">' + P.sub + '</p>' +
      '<div class="acc"><a class="btn" href="#aplica" data-aplicar="hero">' + P.cta + '</a></div><p class="nota">' + P.nota + '</p></div>';
    return '<div class="hero ' + modo + '">' + txt + vid + '</div>';
  }

  function pruebasHTML() {
    var cajas = P.pruebas.map(function (k) {
      var c = PRUEBAS[k];
      return win(c.barra, '<div class="caso"><p class="quien">' + c.quien + '</p><p>' + c.texto + '</p><p class="f">' + c.f[A] + '</p><p class="q">Diego Vetencourt</p></div>');
    }).join('');
    // Diego, 23-oct: también aquí, como en /productizate, el widget de Trustpilot y el link a la lista de resultados
    var tp = '<a class="tp" style="margin-top:34px" href="https://www.trustpilot.com/review/solucionesartificiales.com" target="_blank" rel="noopener"><span class="tpl"><span class="tpe">★ ★ ★ ★ ★</span><b>Todas las reseñas en Trustpilot</b><small>Clientes y alumnos de Diego, sin filtro. Ábrelas y léelas tú.</small></span><span class="tpb">Ver reseñas →</span></a>' +
      '<p style="margin-top:26px"><a class="btn sec" href="https://solucionesartificiales.com/resultados" target="_blank" rel="noopener">Ver la lista de resultados →</a></p>';
    return '<section class="blq"><span class="ceja">Pruebas reales</span><h2>Esto ya está pasando.</h2><div class="tres">' + cajas + '</div>' + tp + '</section>';
  }

  function llevasHTML() {
    return '<section class="blq"><span class="ceja">Qué te llevas</span><h2>' + P.llevasH + '</h2>' + win('Tu instalación', lista(P.llevas)) + '</section>';
  }

  function garantiaHTML() {
    return '<section class="blq"><div class="bono" style="background:var(--azulp,#dce5ff)"><span class="ceja">Garantía</span><b>90 días</b><p>' + CFG.GARANTIA + '</p></div></section>';
  }
  function bonoHTML() {
    if (!CFG.BONO_ACTIVO) return '';
    return '<section class="blq"><div class="bono"><span class="ceja">Bono para dueños de negocio</span><b>' + CFG.BONO_TITULO + '</b><p>' + CFG.BONO_TEXTO + '</p></div></section>';
  }

  function noesHTML() {
    return '<section class="blq"><span class="ceja">Qué NO es</span><h2>Te digo de una vez lo que no es.</h2><div class="cuatro">' + P.noes.map(function (k) { return NOES[k]; }).join('') + '</div></section>';
  }

  function formSrc() {
    var p; try { p = new URLSearchParams(location.search); } catch (e) { p = { get: function () { return null; } }; }
    var par = {
      utm_source: p.get('utm_source') || 'cerebro',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || ('cerebro-' + A),
      utm_content: p.get('utm_content') || A,
      utm_term: p.get('utm_term') || '',
      fbclid: p.get('fbclid') || '',
      angulo: A
    };
    var qs = Object.keys(par).filter(function (k) { return par[k]; }).map(function (k) { return k + '=' + encodeURIComponent(par[k]); }).join('&');
    return 'https://api.leadconnectorhq.com/widget/form/' + CFG.FORM_ID + '?' + qs;
  }

  function formHTML() {
    var id = CFG.FORM_ID;
    return '<section class="blq" id="aplica"><span class="ceja">Aplica para una llamada</span><h2>Cuéntame de tu negocio.</h2>' +
      '<p class="intro">Son seis preguntas. Las leemos antes de darte una hora, para no hacerte perder el tiempo. No es para todos, y si no es para ti, te lo decimos.</p>' +
      win('Aplica para una llamada', '<iframe src="' + formSrc() + '" id="inline-' + id + '" style="min-height:' + CFG.FORM_ALTO + 'px" data-layout="{\'id\':\'INLINE\'}" data-trigger-type="alwaysShow" data-trigger-value="" data-activation-type="alwaysActivated" data-activation-value="" data-deactivation-type="neverDeactivate" data-deactivation-value="" data-form-name="Cerebro · Aplicación" data-height="' + CFG.FORM_ALTO + '" data-layout-iframe-id="inline-' + id + '" data-form-id="' + id + '" title="Aplica para una llamada"></iframe>', 'form') +
      '</section>';
  }

  var PIEZAS = { bloque: P.bloque, pruebas: pruebasHTML, llevas: llevasHTML, bono: bonoHTML, garantia: garantiaHTML, noes: noesHTML, form: formHTML };

  var html = '<div class="wrap">' +
    '<header class="top"><a class="brand" href="https://solucionesartificiales.com/" aria-label="Soluciones Artificiales, inicio"><span class="mark">SA</span><span>Soluciones<br>Artificiales</span></a><a class="btn chico" href="#aplica" data-aplicar="cabecera">Aplica para una llamada</a></header>' +
    heroHTML() +
    P.orden.map(function (k) { return PIEZAS[k](); }).join('') +
    '<div class="final"><h2>' + P.cierreH + '</h2><p>' + P.cierreP + '</p><a class="btn" href="#aplica" data-aplicar="cierre">' + P.cta + '</a></div>' +
    '<footer class="pie"><span>Productízate es un servicio de Soluciones Artificiales</span><span>Diego Vetencourt</span></footer>' +
    '</div>';

  /* ---------- píxel ---------- */
  var PREVIEW_HOST = /github\.io$|^localhost$|^127\.0\.0\.1$|^$/.test(location.hostname); // en vista previa no se manda nada al píxel real
  function pixel() {
    if (window.fbq) return;
    if (PREVIEW_HOST) { window.fbq = function () { try { console.log('[píxel simulado]', [].slice.call(arguments)); } catch (e) { } }; return; }
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CFG.PIXEL); window.fbq('track', 'PageView');
  }
  function fbv(nombre, extra) {
    try {
      pixel();
      var d = { angulo: A }; if (extra) for (var k in extra) d[k] = extra[k];
      window.fbq('trackCustom', nombre, d);
    } catch (e) { }
  }

  // Aplicación enviada: el formulario de GHL vive en un iframe y su píxel no queda atribuido al anuncio.
  // Se marca desde esta página (que sí tiene el clic del anuncio): mensajes «set-sticky-contacts» o «modify-parent-url» que el formulario manda al enviarse (el iframe se recarga solo al iniciar, así que no se cuentan cargas).
  var enviada = false;
  function aplicacionEnviada(via) {
    if (enviada) return; enviada = true;
    try { pixel(); window.fbq('track', 'SubmitApplication', { angulo: A, via: via }); } catch (e) { }
  }
  window.addEventListener('message', function (ev) {
    if (!/leadconnectorhq\.com|msgsndr\.com|solucionesartificiales\.com/.test(ev.origin || '')) return;
    var t = ev.data; if (typeof t === 'string') { try { t = JSON.parse(t); } catch (e) { } }
    if (Array.isArray(t) && (t[0] === 'set-sticky-contacts' || t[0] === 'modify-parent-url')) aplicacionEnviada(t[0]);
  });

  function montar() {
    var host = document.getElementById('cbhost');
    if (!host) { host = document.createElement('div'); host.id = 'cbhost'; document.body.insertBefore(host, document.body.firstChild); }
    if (document.getElementById('cb')) return;
    var st = document.createElement('style'); st.textContent = CSS + 'html,body{background:#fffaf2!important}'; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'cb'; d.setAttribute('data-angulo', A); d.innerHTML = html; host.appendChild(d);
    try { document.title = P.doc; } catch (e) { }
    var s = document.createElement('script'); s.src = 'https://link.msgsndr.com/js/form_embed.js'; s.async = true; document.body.appendChild(s);
    fbv('CB_Vista');
    var v = d.querySelector('video'); if (v) v.addEventListener('play', function () { fbv('CB_Video'); }, { once: true });
    var botones = d.querySelectorAll('a[data-aplicar]');
    for (var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function (e) {
        e.preventDefault();
        fbv('CB_Aplicar', { boton: this.getAttribute('data-aplicar') });
        var f = document.getElementById('aplica'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
