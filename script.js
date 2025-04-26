// scripts.js

// Clave de API de Gemini.
// ADVERTENCIA DE SEGURIDAD: Esta clave está visible públicamente en el código del lado del cliente.
// Esto NO es seguro para una aplicación en producción. La forma segura es usar un backend.
const API_KEY = "AIzaSyAIi9lemFB-izEQzt9Gk3lu5XnLteF1ZjQ";
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`; // Endpoint para generateContent

document.addEventListener("DOMContentLoaded", () => {
    // --- Código existente para el menú ---
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul.menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });

        const menuLinks = document.querySelectorAll("nav ul.menu li a");
        menuLinks.forEach(link => {
             // Opcional: cerrar menú al hacer click en un enlace si no usas navegación con loader
             // link.addEventListener("click", () => { menu.classList.remove("active"); });
        });
    }
    // --- Fin Código menú ---


   // --- Código MODIFICADO para comentarios ---
   const comentariosForm = document.getElementById("comentarios-form");
   const comentariosLista = document.getElementById("comentarios-lista");
   const nombreInputComentarios = comentariosForm ? comentariosForm.querySelector("#nombre") : null; // Input de nombre en comentarios
   const comentarioInput = comentariosForm ? comentariosForm.querySelector("#comentario") : null; // Input de comentario

   const isSubscribed = () => {
       const suscripciones = JSON.parse(localStorage.getItem("suscripciones")) || [];
       return suscripciones.length > 0;
   };

   const getSubscribedUser = () => {
       const suscripciones = JSON.parse(localStorage.getItem("suscripciones")) || [];
       // Devuelve el último suscriptor para simplificar, o podrías implementar un sistema de usuario logeado
       return suscripciones.length > 0 ? suscripciones[suscripciones.length - 1] : null;
   };

   const mostrarFormularioComentarios = () => {
       if (comentariosForm) {
           if (isSubscribed()) {
               comentariosForm.style.display = "flexbox"; // O el display que use tu CSS original para mostrar
               // Ocultar los campos de nombre y correo si el usuario está suscrito y usar los datos guardados
                if(nombreInputComentarios) nombreInputComentarios.style.display = "none";
                // El correo no se usa en el formulario de comentarios, solo el nombre y el comentario
           } else {
               comentariosForm.style.display = "none";
           }
       }
   };


   const cargarComentarios = () => {
       const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
       if (comentariosLista) { // Verifica si el elemento existe antes de manipularlo
            comentariosLista.innerHTML = "";

           comentarios.forEach(({ nombre, correo, comentario }, index) => { // Asegúrate de que 'correo' se carga si está guardado
               const comentarioDiv = document.createElement("div");
               comentarioDiv.classList.add("comentario");
               comentarioDiv.innerHTML = `
                   <strong>${nombre}</strong> (${correo})<br>
                   <p>${comentario}</p>
                   <button class="eliminar" data-index="${index}">Eliminar</button>
               `;
               comentariosLista.appendChild(comentarioDiv);
           });

           const botonesEliminar = comentariosLista.querySelectorAll(".eliminar"); // Busca botones dentro de la lista
           botonesEliminar.forEach((boton) => {
               boton.addEventListener("click", (e) => {
                   const index = e.target.getAttribute("data-index");
                   eliminarComentario(index);
               });
           });
       }
   };

   const guardarComentario = (nombre, correo, comentario) => {
       const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
       comentarios.push({ nombre, correo, comentario });
       localStorage.setItem("comentarios", JSON.stringify(comentarios));
       cargarComentarios();
   };

   if(comentariosForm) { // Asegúrate de que el formulario de comentarios exista
       comentariosForm.addEventListener("submit", (e) => {
           e.preventDefault();

           if (!isSubscribed()) {
               alert("Debes estar suscrito para dejar un comentario.");
               return;
           }

           const subscribedUser = getSubscribedUser();
           const nombre = subscribedUser.nombre;
           const correo = subscribedUser.correo;
           const comentario = comentarioInput ? comentarioInput.value.trim() : '';

           if (nombre && correo && comentario) {
               guardarComentario(nombre, correo, comentario);
               comentarioInput.value = ''; // Limpiar solo el campo de comentario
               alert("Comentario agregado exitosamente.");
           } else {
               alert("Por favor, escribe tu comentario.");
           }
       });
        // Cargar comentarios al inicio solo si el formulario existe
       cargarComentarios();
       mostrarFormularioComentarios(); // Mostrar u ocultar el formulario al cargar
   }
   // --- Fin Código MODIFICADO comentarios ---

    // --- Código MODIFICADO para suscripción ---
    const suscripcionForm = document.getElementById("suscripcion-form");
    const suscripcionMensaje = document.getElementById("suscripcion-mensaje");
    const nombreInputSuscripcion = suscripcionForm ? suscripcionForm.querySelector("#nombre") : null; // Input de nombre en suscripción
    const correoInputSuscripcion = suscripcionForm ? suscripcionForm.querySelector("#correo") : null; // Input de correo en suscripción


    const guardarSuscripcion = (nombre, correo) => {
        const suscripciones = JSON.parse(localStorage.getItem("suscripciones")) || [];
        // Verificar si el correo ya existe
        const yaSuscrito = suscripciones.some(suscripcion => suscripcion.correo === correo);

        if (yaSuscrito) {
            return false; // Indica que ya estaba suscrito
        }

        suscripciones.push({ nombre, correo });
        localStorage.setItem("suscripciones", JSON.stringify(suscripciones));
        return true; // Indica que la suscripción fue exitosa
    };

     if(suscripcionForm) { // Asegúrate de que el formulario de suscripción exista
        suscripcionForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = nombreInputSuscripcion ? nombreInputSuscripcion.value.trim() : '';
            const correo = correoInputSuscripcion ? correoInputSuscripcion.value.trim() : '';

            if (nombre && correo) {
                const suscripcionExitosa = guardarSuscripcion(nombre, correo);

                if (suscripcionExitosa) {
                    suscripcionForm.reset();
                    if(suscripcionMensaje) { // Asegúrate de que el elemento de mensaje exista
                        suscripcionMensaje.innerHTML = `¡Gracias por suscribirte, ${nombre}!`;
                        suscripcionMensaje.style.display = "block";

                        setTimeout(() => {
                            suscripcionMensaje.style.display = "none";
                             // Redirigir a la página de inicio después de un breve retraso
                            window.location.href = "index.html";
                        }, 3000); // Retraso de 3 segundos antes de redirigir
                    }
                     alert("Gracias " + nombre + ", usted se ha suscrito exitosamente a DESINGS C.A!"); // Mantener el alert existente
                     mostrarFormularioComentarios(); // Actualizar visibilidad del formulario de comentarios
                     mostrarSeccionIA(); // Actualizar visibilidad de la sección de IA
                } else {
                    alert("El correo electrónico ya está suscrito.");
                }
            } else {
                alert("Por favor, completa todos los campos.");
            }
        });
    }
    // --- Fin Código MODIFICADO suscripción ---


    // --- Código MODIFICADO para el asistente de IA con Gemini (Fetch API) ---
    // Solo ejecutar la lógica del chat si los elementos necesarios existen en la página (ia.html)
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const reiniciarChatBtn = document.getElementById("reiniciar-chat");
    const asistenteIaSection = document.getElementById("asistente-ia"); // La sección completa del asistente de IA

    const mostrarSeccionIA = () => {
         if (asistenteIaSection) {
            if (isSubscribed()) {
                asistenteIaSection.style.display = "block"; // O el display que use tu CSS original
            } else {
                asistenteIaSection.innerHTML = "<h2>Asistente de Inteligencia Artificial</h2><p>Debes estar suscrito para usar el asistente de IA. Suscríbete <a href='contacto.html'>aquí</a>.</p>";
                asistenteIaSection.style.textAlign = "center";
                asistenteIaSection.style.color = "#fff";
                asistenteIaSection.style.display = "block"; // Mostrar el mensaje aunque no esté suscrito
             }
        }
    };


    if (chatForm && userInput && chatBox && reiniciarChatBtn && asistenteIaSection) {

         // Mostrar u ocultar la sección de IA al cargar la página
        mostrarSeccionIA();

         // Si no está suscrito, no adjuntamos los event listeners del chat para evitar interacción.
        if (isSubscribed()) {

             // Función para agregar mensajes (ahora acepta HTML)
            const agregarMensaje = (htmlContent, clase) => {
                const mensajeDiv = document.createElement("div");
                mensajeDiv.classList.add("message", clase);
                // Usar innerHTML para renderizar contenido HTML (incluyendo <br> y el indicador)
                mensajeDiv.innerHTML = htmlContent;
                chatBox.appendChild(mensajeDiv);
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
            };

            // Función para enviar el mensaje a Gemini usando Fetch
            let isFirstMessage = true; // Variable para rastrear si es el primer mensaje


            const enviarMensajeAI = async (mensaje) => {
                const subscribedUser = getSubscribedUser();
                const userName = subscribedUser ? subscribedUser.nombre : "Usuario"; // Usar el nombre del suscriptor si existe

                // HTML para el mensaje "Pensando..." con el indicador de tipeo animado
                const thinkingMessageHtml = `
                    Pensando...
                    <span class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                `;
                agregarMensaje(thinkingMessageHtml, "bot"); // Añade el mensaje de pensando con indicador

                try {
                    // Realiza la llamada a la API de Gemini usando fetch
                    const systemInstruction = "Eres LoveStar, tu asistente de inteligencia artificial amigable y confiable. ";
                    const messageToSend = systemInstruction + "\\n\\n" + mensaje; // Añadir la instrucción al mensaje del usuario

                   
                    const response = await fetch(API_ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{ text: messageToSend }] // Envía el mensaje del usuario
                            }]
                            // Puedes añadir generationConfig, safetySettings, etc. aquí si los necesitas
                        })
                    });

                    if (!response.ok) {
                        // Manejar errores HTTP (ej: 400, 401, 403, 404, 500)
                        // Intentar leer el cuerpo del error si está disponible
                        const errorBody = await response.json().catch(() => null); // Intenta parsear el JSON del cuerpo del error
                        const errorMessage = errorBody && errorBody.error && errorBody.error.message ? errorBody.error.message : `Error HTTP: ${response.status}`;
                        throw new Error(`Error en la API: ${errorMessage}`);
                    }

                    const data = await response.json(); // Parsear la respuesta JSON

                    // La estructura de respuesta para generateContent es específica
                    // Necesitamos extraer el texto del primer candidato
                    const text = data && data.candidates && data.candidates.length > 0
                                 && data.candidates[0].content && data.candidates[0].content.parts
                                 && data.candidates[0].content.parts.length > 0
                                 ? data.candidates[0].content.parts[0].text
                                 : null;


                    // Elimina el mensaje "Pensando..." (que incluye el indicador)
                    // Verifica que exista antes de intentar remover
                    if (chatBox.lastChild) {
                        chatBox.lastChild.remove();
                    }

                    if (text) {
                         // Muestra la respuesta de Gemini con un mensaje personalizado al suscriptor
                         const fullResponse = `Aquí tienes tu respuesta ${userName} <br>${text.replace(/\n/g, '<br>')}`;
                         agregarMensaje(fullResponse, "bot");
                    } else {
                        agregarMensaje("No se recibió una respuesta de texto válida del asistente.", "bot");
                         console.error("Estructura de respuesta de la API inesperada:", data);
                    }

                } catch (error) {
                    // Maneja errores generales (red, parsing, error de la API, etc.)
                     // Intenta actualizar el último mensaje (el de pensando) si existe
                    if (chatBox.lastChild) {
                         chatBox.lastChild.innerHTML = `Error: ${error.message}. Intenta nuevamente.`;
                         // Si quieres quitar el indicador animado al mostrar el error,
                         // tendrías que modificar el innerHTML para que no incluya el span .typing-indicator
                     } else {
                        // Si por alguna razón el mensaje de pensando no estaba, añade un nuevo mensaje de error
                        agregarMensaje(`Error: ${error.message}. Intenta nuevamente.`, "bot");
                     }

                    console.error("Error durante la llamada a la API:", error);
                     // Opcional: agregar mensaje con detalle del error si estás depurando
                     // agregarMensaje(`Detalle del error: ${error.message}`, "bot");
                }
            };

            // Evento de envío del formulario de chat
            chatForm.addEventListener("submit", (e) => {
                e.preventDefault(); // Evita que el formulario se recargue
                const mensaje = userInput.value.trim();

                if (mensaje) { // Asegúrate de que hay mensaje
                    agregarMensaje(mensaje, "user"); // Muestra el mensaje del usuario
                    enviarMensajeAI(mensaje); // Envía el mensaje a Gemini
                    userInput.value = ""; // Limpia el input
                }
            });

            // Evento para reiniciar el chat
            reiniciarChatBtn.addEventListener("click", () => {
                chatBox.innerHTML = ""; // Limpia la caja de chat visualmente
                agregarMensaje("Chat reiniciado.", "bot");
                 // Nota: Al usar generateContent directamente, no hay una instancia de chat con historial incorporado
                 // como con el SDK. Si necesitas mantener el contexto de la conversación a lo largo de múltiples
                 // mensajes, necesitarías gestionar el historial manualmente enviándolo en cada llamada a la API
                 // en la estructura 'contents' (similar a cómo se define el historial inicial en el SDK).
            });

        }

    }

    
    // --- Fin Código MODIFICADO para el asistente de IA ---


    // --- Código existente para el loader dinámico ---
    const dynamicLoaderOverlay = document.getElementById('dynamic-loader-overlay');
    // Selecciona solo los enlaces con el atributo data-link que están en la navegación
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"])');


    function showDynamicLoader() {
        if(dynamicLoaderOverlay) {
             dynamicLoaderOverlay.style.display = 'flex';
        }
    }

    function hideDynamicLoader() {
         if(dynamicLoaderOverlay) {
            dynamicLoaderOverlay.style.display = 'none';
        }
    }

    // Ocultar el loader al inicio solo si existe
    hideDynamicLoader();

    // Añadir listener a cada enlace con data-link
    if (links) { // Verifica si hay enlaces con data-link
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Previene la navegación por defecto
                showDynamicLoader(); // Muestra el loader
                const href = this.getAttribute('href');
                // Pequeño retraso para que se vea el loader antes de navegar
                setTimeout(() => {
                     window.location.href = href; // Navega a la nueva página
                }, 100); // Retraso de 100ms, puedes ajustarlo
            });
        });
    }


    // Ocultar el loader cuando la página termine de cargar
    window.addEventListener('load', hideDynamicLoader);
    // También para DOMContentLoaded, en caso de que 'load' sea demasiado tarde
    window.addEventListener('DOMContentLoaded', hideDynamicLoader);

    // Si la página ya cargó cuando se ejecuta este script (por ejemplo, si el script está al final del body)
    // y el DOM ya está listo, ocultar el loader inmediatamente.
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        hideDynamicLoader();
    }

    // --- Fin Código loader ---

}); // Fin del evento DOMContentLoaded


// --- Código para los botones de compra ---
const comprarButtons = document.querySelectorAll(".compra");

if (comprarButtons) {
    comprarButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Añadir clase para la animación
            button.classList.add("comprado");

            // Mostrar mensaje de éxito (puedes ajustar el mensaje si quieres)
            const originalText = button.textContent;
            button.textContent = "¡Comprado exitosamente!";

            // Opcional: deshabilitar el botón temporalmente para evitar clics múltiples
            button.disabled = true;

            // Eliminar la clase de animación y restaurar el texto original después de un tiempo
            setTimeout(() => {
                button.classList.remove("comprado");
                button.textContent = originalText;
                button.disabled = false; // Habilitar el botón de nuevo
            }, 2000); // 2000 milisegundos = 2 segundos
        });
    });
}
// --- Fin Código botones de compra ---