// 1. DÉCLARATIONS DES VARIABLES GLOBALES (Nettoyées)
const htmlElement = document.documentElement;
const mode = document.getElementById("mode");
const iconMode = document.getElementById("icon");
let compteur = 0;

// 2. INITIALISATION GÉNÉRALE (Le cerveau du script)
window.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Système prêt !");

    // Écouteurs pour les boutons "Ajouter"
    const boutonsAjout = document.querySelectorAll(".btn-add");
    console.log("Boutons .btn-add trouvés :", boutonsAjout.length);

    boutonsAjout.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            const type = btn.dataset.type;
            const templateID = btn.dataset.template;
            const champs = btn.dataset.fields ? btn.dataset.fields.split(',') : [];

            console.log("➕ Ajout d'un élément type :", type);
            ajouterElement(type, champs, templateID);
        });
    });

    // Lancement de la preview sur les éléments déjà présents au chargement
    initPreview(document);
    previewFocus();

    // Reset du formulaire au chargement
    const formulaire = document.getElementById("my-form");
    if (formulaire) formulaire.reset();
});

// 3. FONCTION D'AJOUT DYNAMIQUE (Template)
function ajouterElement(type, champs, templateID) {
    compteur++;
    const template = document.getElementById(templateID);
    if (!template) return console.error("Template introuvable :", templateID);

    const clone = template.content.cloneNode(true);
    const formBlock = clone.querySelector("." + type + "-item");
    const previewBlock = clone.querySelector(".preview-" + type + "-item");

    if (!formBlock || !previewBlock) return console.error("Structure du template incorrecte pour :", type);

    // Liaison des champs
    champs.forEach(element => {
        const cible = clone.querySelector(".p-" + element);
        const source = clone.querySelector("." + type + "-" + element);

        if (cible && source) {
            const uniqueId = "p-" + element + "-" + compteur;
            cible.id = uniqueId;
            source.dataset.target = "#" + uniqueId;
        }
    });

    // Gestion de la suppression
    const btnRemove = clone.querySelector(".remove-" + type);
    if (btnRemove) {
        btnRemove.style.border = "5px solid red"; // Pour voir s'il est bien détecté
        btnRemove.addEventListener("click", () => {
            alert("Clic détecté sur la suppression de " + type);
            formBlock.remove();
            previewBlock.remove();
        });
    }

    // Injection dans le DOM
    const formList = document.getElementById(type + "-form-list");
    const previewList = document.getElementById(type + "-preview-list");

    if (formList && previewList) {
        formList.appendChild(formBlock);
        previewList.appendChild(previewBlock);
        // On active la preview sur le nouveau bloc
        initPreview(formBlock);
    } else {
        console.error("Listes de réception introuvables pour :", type);
    }
}

// 4. FONCTION PREVIEW (Mise à jour texte + focus)
function initPreview(conteneur) {
    const inputs = conteneur.querySelectorAll('input[data-target], textarea[data-target], select[data-target]');

    inputs.forEach(input => {
        const selector = input.dataset.target;
        if (!selector) return;

        const updateFocus = () => {
            const cible = document.querySelector(selector);
            if (cible) {
                document.querySelectorAll('.preview-focus').forEach(el => el.classList.remove('preview-focus'));
                cible.classList.add("preview-focus");
                cible.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        };

        input.addEventListener('focus', updateFocus);

        const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            const cible = document.querySelector(selector);
            if (cible) {
                cible.innerText = input.value || cible.getAttribute('data-default') || "";
                updateFocus();
            }
        });
    });
}

// 5. FONCTION FOCUS GLOBAL
function previewFocus() {
    const formulaire = document.getElementById("my-form");
    if (!formulaire) return;

    formulaire.addEventListener("focusin", (event) => {
        const targetSelector = event.target.dataset.target;
        if (!targetSelector) return;

        setTimeout(() => {
            const cible = document.querySelector(targetSelector);
            if (cible) {
                cible.scrollIntoView({ behavior: "smooth", block: "center" });
                document.querySelectorAll('.preview-focus').forEach(el => el.classList.remove('preview-focus'));
                cible.classList.add("preview-focus");
            }
        }, 0);
    });
}

// 6. MODE SOMBRE & FULLNAME (Gardés tels quels)
if (mode) {
    mode.addEventListener("click", function () {
        const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark';
        htmlElement.setAttribute('data-bs-theme', isDark ? "light" : "dark");
        iconMode.className = isDark ? "bi bi-sun" : "bi bi-moon";
        mode.textContent = isDark ? "Mode Clair" : "Mode Sombre";
        mode.classList.toggle('btn-outline-light');
        mode.classList.toggle('btn-outline-dark');
    });
}

const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");
const previewFullName = document.getElementById('p-full-name');

function updateFullName() {
    const nom = nomInput.value.trim().toUpperCase();
    let prenom = prenomInput.value.trim();
    if (prenom) prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();

    previewFullName.textContent = (!nom && !prenom) ? "Prénom NOM" : `${prenom} ${nom}`.trim();
}

if (nomInput && prenomInput) {
    nomInput.addEventListener('input', updateFullName);
    prenomInput.addEventListener('input', updateFullName);
}