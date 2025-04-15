// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul.menu");

    // Alternar el estado del menú al hacer clic en el botón
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Cerrar el menú al hacer clic en un enlace (opcional)
    const menuLinks = document.querySelectorAll("nav ul.menu li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
})


// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const comentariosForm = document.getElementById("comentarios-form");
    const comentariosLista = document.getElementById("comentarios-lista");

    // Cargar comentarios desde localStorage
    const cargarComentarios = () => {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentariosLista.innerHTML = "";

        comentarios.forEach(({ nombre, comentario }, index) => {
            const comentarioDiv = document.createElement("div");
            comentarioDiv.classList.add("comentario");
            comentarioDiv.innerHTML = `
                <strong>${nombre}</strong>
                <p>${comentario}</p>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            `;
            comentariosLista.appendChild(comentarioDiv);
        });

        // Añadir eventos de eliminación
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                eliminarComentario(index);
            });
        });
    };

    // Guardar comentario en localStorage
    const guardarComentario = (nombre, comentario) => {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push({ nombre, comentario });
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
        cargarComentarios();
    };

    // Eliminar comentario de localStorage
    const eliminarComentario = (index) => {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.splice(index, 1);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
        cargarComentarios();
    };

    // Evento de envío del formulario
    comentariosForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const comentario = document.getElementById("comentario").value.trim();

        if (nombre && comentario) {
            guardarComentario(nombre, comentario);
            comentariosForm.reset();
            alert("Comentario agregado exitosamente.");
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Cargar comentarios al inicio
    cargarComentarios();
})

// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const suscripcionForm = document.getElementById("suscripcion-form");
    const suscripcionMensaje = document.getElementById("suscripcion-mensaje");

    // Función para guardar los datos en localStorage
    const guardarSuscripcion = (nombre, correo) => {
        const suscripciones = JSON.parse(localStorage.getItem("suscripciones")) || [];
        suscripciones.push({ nombre, correo });
        localStorage.setItem("suscripciones", JSON.stringify(suscripciones));
    };

    // Evento de envío del formulario
    suscripcionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();

        if (nombre && correo) {
            guardarSuscripcion(nombre, correo);
            suscripcionForm.reset();
            suscripcionMensaje.style.display = "block";

            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                suscripcionMensaje.style.display = "none";
            }, 5000);
        } else {
            alert("Por favor, completa todos los campos.");
        }
        if( nombre && correo){
            alert("gracias " + nombre + " usted se ha suscrito exitosamente! a DESINS C.A");
        }
       
    });
})


//prueva


/*
// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    // Función para agregar un mensaje al chat
    const agregarMensaje = (mensaje, clase) => {
        const mensajeDiv = document.createElement("div");
        mensajeDiv.classList.add("message", clase);
        mensajeDiv.textContent = mensaje;
        chatBox.appendChild(mensajeDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Hacer scroll hasta el final
    };

    // Función para enviar el mensaje al API de OpenAI
    const enviarMensajeAI = async (mensaje) => {
        try {
            const respuesta = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Bearer YOUR_API_KEY
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: mensaje }]
                })
            });

            const datos = await respuesta.json();
            const respuestaBot = datos.choices[0].message.content;
            agregarMensaje(respuestaBot, "bot");
        } catch (error) {
            agregarMensaje("Error al conectar con el asistente. Intenta nuevamente.", "bot");
            console.error("Error:", error);
        }
    };

    // Manejar el envío del formulario
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const mensaje = userInput.value.trim();
        if (mensaje) {
            agregarMensaje(mensaje, "user");
            enviarMensajeAI(mensaje);
            userInput.value = ""; // Limpiar el campo de entrada
        }
    });
});*/