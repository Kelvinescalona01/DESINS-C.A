document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active");
    });

    // Acción de compra exitosa
    const buyButtons = document.querySelectorAll(".compra");
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.innerText = "¡Compra realizada con éxito!";

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {
            button.parentElement.appendChild(successMessage);
            successMessage.classList.add("show-success");

            setTimeout(() => {
                successMessage.classList.remove("show-success");
            }, 3000);
        });
    });
});
