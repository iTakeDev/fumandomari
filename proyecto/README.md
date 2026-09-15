# FumandoMari — Staff & SS Manager

Remake independiente del portfolio de Minecraft, con su avatar y experiencia en BunderCraft, Eskmc, Lunarbox y Nightbox. Los cuatro servidores muestran 100+ usuarios según la información facilitada. No se han atribuido a FumandoMari las reseñas, fechas ni contactos del portfolio anterior.

## Uso

El sitio funciona como HTML, CSS y JavaScript estáticos. `web/index.html` contiene la página y `web/assets/` sus recursos locales. También puede abrirse directamente sin instalación.

Para desarrollo: `npm ci`, después `npm run dev`. Para generar el sitio: `npm run build`; el resultado queda en `dist/`. `npm test` comprueba la secuencia de cuatro objetos, el progreso, la introducción y las preferencias de animación.

La versión descargable incluye `index.html` en la raíz, con todos sus recursos, y una carpeta `proyecto/` con el código de desarrollo y las pruebas.

## Últimos ajustes (solo código)

- Logos de Lunarbox y Nightbox integrados con transparencia.
- “Siempre pendiente” alineado a la izquierda, debajo de “Todo bajo control”.
- Luna pixelada con movimiento suave a la derecha de esa misma fila.
- Esta entrega no se ha publicado ni enviado al repositorio del sitio.

## Comportamiento

- Español y tema oscuro al cargar. Selector español/inglés y cambio circular de tema.
- Introducción del rayo, aparición progresiva del texto, menú y diálogos desplegables.
- Título rotatorio con altura fija; panel y cuadrículas limitados al ancho disponible.
- Cuatro objetos al deslizar, con progreso morado visible únicamente durante la secuencia. En pantallas extremadamente bajas, la lectura conserva el desplazamiento normal.
- Línea de servidores y flores ilustradas que aparecen al avanzar.
- Animaciones activadas por defecto. La opción del menú permite desactivarlas y recuerda esa elección en el dispositivo.

## Datos del portfolio

Discord configurado: `1139699831128985650`. Los botones de contacto abren ese perfil. El formulario permite copiar una propuesta y no envía mensajes.

Rangos: BunderCraft — Mod y SS Coordinator; Eskmc — SS Manager; Lunarbox y Nightbox — Helper. Reseñas de Chelo, lanoche22, Patrick y Diff, con las imágenes y textos facilitados por el usuario. Solo se ajustó la ortografía y puntuación; el selector inglés muestra una traducción. La imagen original de Chelo se conserva intacta y se recorta visualmente al círculo mediante CSS.

Se integró el logo encontrado de BunderCraft y los logos de Eskmc, Lunarbox y Nightbox facilitados por el usuario. Lunarbox y Nightbox incluyen fondo transparente.

## Fuentes

La ScreenShare se presenta como una revisión acordada por pantalla compartida, con documentación y coordinación del equipo de SS. Referencia práctica consultada: [Headed — How To Screenshare (Basics)](https://www.youtube.com/watch?v=7bc4rtFwwZA). Los límites de privacidad, el consentimiento y la revisión de pruebas expresan el enfoque de trabajo de este portfolio; no son una política universal de todos los servidores.

- BunderCraft: [ficha de Medal](https://medal.tv/games/minecraft/servers/40LB2M6rBL1Ytm/bundercraft-network). El logo muestra BUNDERCRAFT NETWORK; la ficha publica actualmente otra dirección de servidor.
- Eskmc: archivo `IMG_0581.png` facilitado por el usuario.
- Paisajes: [Complementary](https://www.complementary.dev/shaders/).
- Detalles de imágenes y licencias disponibles: `assets/image-sources.json` y `assets/logo-provenance.json` en la versión lista para abrir.

## Verificación

Las pruebas de lógica y las comprobaciones de sintaxis y recursos no sustituyen una revisión visual. La apertura de la vista de prueba en navegador fue rechazada por permisos; queda pendiente confirmar visualmente PC y móvil.
