//-----------------Dark-Mode--------------------\\
const mode = document.getElementById("mode");
const iconMode = document.getElementById("icon");
const htmlElement = document.documentElement;
//-----------------Buttons Adds----------------------\\
const form = document.getElementById("form");
const exp = document.getElementById("exp");
const comp = document.getElementById("comp");
const formation = document.getElementById("bloc-formation");
const experience = document.getElementById("bloc-exp");
const competence = document.getElementById("bloc-competence");
const addExp = document.getElementById("add-exp");
const addForm = document.getElementById("add-form");
const addComp = document.getElementById("add-comp");
//--------------Preview------------------\\
const fullName = document.getElementById("p-full-name");
const titre = document.getElementById("p-headline")
const email = document.getElementById("p-email");
const telephone = document.getElementById("p-numero");
//------------Clonage---------------------\\
const template = document.getElementById("temp-exp");
const array = ['poste', 'entreprise', 'missions', 'debut', 'fin'];
let compteur = 0;
function ajouterExperience() {
    compteur++;
    const clone = template.content.cloneNode(true);


    const formBlock = clone.querySelector(".experience-item");
    const previewBlock = clone.querySelector(".preview-exp-item");


    array.forEach(element => {
        const cible = clone.querySelector(".p-" + element);
        const source = clone.querySelector(".exp-" + element);

        if (cible && source) {
            const uniqueId = "p-" + element + "-" + compteur;
            cible.id = uniqueId;
            source.dataset.target = "#" + uniqueId;
        } else {
            console.warn(`Attention : l'élément .p-${element} ou .exp-${element} est introuvable dans le template.`);
        }

    });


    document.getElementById("experience-form-list").appendChild(formBlock);

    document.getElementById("experience-preview-list").appendChild(previewBlock);

    initPreview(formBlock);
}


const nomInput = document.getElementById("nom");
const titreInput = document.getElementById("headline")
const prenomInput = document.getElementById("prenom");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("numero");

//const selectAnnee = document.querySelectorAll("select[name=year]")
/*selectAnnee.forEach(y => {
    if (y) {
        let optionsHTML = '<option value="">Année</option>';
        const annee = new Date().getFullYear();

        for (let i = annee; i >= 1980; i--) {
            optionsHTML += `<option value="${i}">${i}</option>`;
        }
        y.innerHTML = optionsHTML;
    }
})*/


/*const allInputs = document.querySelectorAll('[data-target]');
allInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (input.dataset.target === "#p-full-name") {
            return;
        }
        const target = document.querySelector(input.dataset.target);

        if (target) {
            target.textContent = input.value || target.getAttribute('data-default') || "";
        }
    })
})

const allTextareas = document.querySelectorAll('[data-target2]');
allTextareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        const target = document.querySelector(textarea.dataset.target2);

        if (target) {
            target.textContent = textarea.value || target.getAttribute('data-default2') || "";
        }
    })
})*/
const previewFullName = document.getElementById('p-full-name');

function updateFullName() {

    const nom = nomInput.value.toUpperCase();
    const prenom = prenomInput.value;


    if (!nom && !prenom) {
        previewFullName.textContent = "PRÉNOM NOM";
    } else {

        previewFullName.textContent = `${prenom} ${nom}`.trim();
    }
}

nomInput.addEventListener('input', updateFullName);
prenomInput.addEventListener('input', updateFullName);
//------------------------------------------------------
addExp.addEventListener('click', function (event) {
    event.preventDefault();
    ajouterExperience();
})

addForm.addEventListener('click', function (event) {
    event.preventDefault();
    form.r
})

//--------------Dark-mode---------------------------
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

function resetFormulaire() {
    const formulaire = document.getElementById("my-form");
    formulaire.reset();
}



/**
 * @param {HTMLElement|Document} conteneur
 */
function initPreview(conteneur) {

    const inputs = conteneur.querySelectorAll('input[data-target], textarea[data-target]');

    inputs.forEach(input => {
        input.addEventListener('input', () => {

            const selector = input.dataset.target;
            const cible = document.querySelector(selector);

            if (cible) {
                cible.innerText = input.value || cible.getAttribute('data-default') || "";
            }
        });
    });
}

initPreview(document);
resetFormulaire();

