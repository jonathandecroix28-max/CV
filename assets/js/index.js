const mode = document.getElementById("mode");
const iconMode = document.getElementById("icon");
const htmlElement = document.documentElement;
mode.addEventListener("click", function () {
    if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
        htmlElement.setAttribute('data-bs-theme', "light");
        iconMode.className = "bi bi-sun";
        mode.textContent = "Mode Clair"
        mode.classList.replace('btn-outline-light', 'btn-outline-dark');

    } else {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        iconMode.className = "bi bi-moon";
        mode.textContent = "Mode Sombre"
        mode.classList.replace('btn-outline-dark', 'btn-outline-light');
    }
})
