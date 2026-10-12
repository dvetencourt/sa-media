# OP90 · Webinar evergreen

- `evergreen.js`: script único de las 4 páginas del embudo «SA · Operador 90 · Evergreen» en GHL (registro, confirmada, sala y repetición).
- `chat-30sep.json`: comentarios reales del chat del vivo del 30-sep-2026 que la sala muestra a su minuto.

## chat-30sep.json

**De dónde sale:** el chat en vivo de YouTube del video `IlKhr02PMJg` («Así se vende un agente de IA (masterclass en vivo)», 2:05:23), descargado el 12-oct-2026 con `yt-dlp --skip-download --write-subs --sub-langs live_chat`. Cada mensaje trae su segundo en el video.

**Cuántos quedaron:** **453 de 764** mensajes, de 89 personas.

**Formato:** lista de `{ "t": segundo del PROGRAMA de la sala, "n": nombre, "m": mensaje }`, en orden.
- `t` ya está convertido con la misma tabla `TRAMOS` de `evergreen.js`: segundo del video → segundo del programa. Lo que cae en un tramo que la sala salta se descartó. **Si cambian `TRAMOS` o el video, hay que regenerar este archivo.**
- `n` es nombre de pila + inicial cuando el usuario de YouTube lo deja ver; si el usuario no tiene nombre, va su alias público sin números.

**Qué se descartó (311):**
| Motivo | Mensajes |
|---|---|
| Caen en tramos que la sala salta (espera inicial, cortes y todo lo que va desde la oferta del 30-sep hasta el final) | 265 |
| Personas del equipo (Diego, moderadores, Lu, Selene) y una cuenta con el apellido de la familia de Diego, por prudencia | 16 |
| Piden agentes gratis, la carpeta o el WhatsApp (oferta que ya no existe) | 12 |
| Nombran a un tercero o le piden sus datos | 6 |
| Cuenta o negocio propio del asistente que Diego no lee en el video | 4 |
| Avisos técnicos del vivo a los que Diego no responde en el video | 4 |
| Insulto, dato migratorio, dato de la casa de Diego, texto sin sentido | 4 |
Links, teléfonos y correos: ninguno quedó (los únicos eran de Diego).

**Sin inventar nada:** no se agregó ni se reescribió ningún mensaje. Los únicos cambios dentro del texto: nombres completos recortados a nombre + inicial, menciones `@usuario` cambiadas por ese nombre corto y tres emojis propios de YouTube pasados a emoji normal.
Se dejaron los avisos de «no se ve la pantalla» de 30:00 a 32:50 y «está con eco» porque Diego los responde en voz alta en el video.
