const mode = document.getElementById("mode");
const iconMode = document.getElementById("icon");
const htmlElement = document.documentElement;

const form = document.getElementById("form");
const exp = document.getElementById("exp");
const comp = document.getElementById("comp");
const formation = document.getElementById("bloc-formation");
const experience = document.getElementById("bloc-exp");
const competence = document.getElementById("bloc-competence");
const addExp = document.getElementById("add-exp");
const addForm = document.getElementById("add-form");
const addComp = document.getElementById("add-comp");


addExp.addEventListener('click', function (event) {
    event.preventDefault();
    exp.remove(experience);
})

addForm.addEventListener('click', function (event) {
    event.preventDefault();
    form.r
})


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
