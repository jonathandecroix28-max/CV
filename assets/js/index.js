
const htmlElement = document.documentElement;
const mode = document.getElementById("mode");
const iconMode = document.getElementById("icon");
let compteur = 0;


window.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Système prêt !");


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


    const formulaire = document.getElementById("my-form");
    if (formulaire) formulaire.reset();
});

function ajouterElement(type, champs, templateID) {

    lockInput(type);

    compteur++;
    const template = document.getElementById(templateID);

    if (!template) return console.error("Template introuvable :", templateID);

    const clone = template.content.cloneNode(true);
    const formBlock = clone.querySelector("." + type + "-item");
    const previewBlock = clone.querySelector(".preview-" + type + "-item");

    if (!formBlock || !previewBlock) return console.error("Structure du template incorrecte pour :", type);

    champs.forEach(element => {
        const cible = clone.querySelector(".p-" + element);
        const source = clone.querySelector("." + type + "-" + element);
        if (cible && source) {
            const uniqueId = "p-" + element + "-" + compteur;
            cible.id = uniqueId;
            source.dataset.target = "#" + uniqueId;
        }
    });
    const btnRemove = clone.querySelector(".remove-" + type);
    if (btnRemove) {
        btnRemove.style.border = "5px solid red";
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

// mise a jour de la preview + focus
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

// permet le focus sur la preview
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

    previewFullName.textContent = (!nom && !prenom) ? "NOM Prénom" : `${prenom} ${nom}`.trim();
}

if (nomInput && prenomInput) {
    nomInput.addEventListener('input', updateFullName);
    prenomInput.addEventListener('input', updateFullName);
}

function lockInput(type) {
    const anciensInputs = document.querySelectorAll(`.${type}-item input, .${type}-item textarea`);
    anciensInputs.forEach(input => {
        input.readOnly = true;
        input.classList.add('locked-style');
    });
}

function lockForm(parentSelector) {
    const container = document.querySelector(parentSelector);
    if (!container) return;
    const inputForm = document.querySelectorAll(".lock");
    inputForm.forEach(input => {
        input.readOnly = true;
        input.classList.add("locked-style");
    })
}


const previewPhoto = document.getElementById("p-photo");
const initialsCircle = document.getElementById("p-initials");
const btnRemovePhoto = document.getElementById("btn-remove-photo");

const photoInput = document.getElementById("photo");
const photoBase64 = document.getElementById("photo_base64");


if (photoInput) {
    photoInput.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            // C'est ici qu'on définit reader !
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = new Image();

                img.onload = function () {
                    console.log("Image chargée, début de la compression...");

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const size = 400;
                    canvas.width = size;
                    canvas.height = size;

                    const scale = Math.max(size / img.width, size / img.height);
                    const x = (size / 2) - (img.width / 2) * scale;
                    const y = (size / 2) - (img.height / 2) * scale;

                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);

                    // Mise à jour de la preview et du champ PHP
                    const pPhoto = document.getElementById("p-photo");
                    const pInitials = document.getElementById("p-initials");
                    const hiddenInput = document.getElementById("photo_base64");
                    const btnRemove = document.getElementById("btn-remove-photo");

                    if (pPhoto) {
                        pPhoto.src = compressedBase64;
                        pPhoto.classList.remove("d-none");
                    }
                    if (pInitials) pInitials.classList.add("d-none");
                    if (hiddenInput) hiddenInput.value = compressedBase64;
                    if (btnRemove) btnRemove.classList.remove("d-none");

                    console.log("Succès ! Taille :", compressedBase64.length);
                };

                img.src = e.target.result;
            };

            // On lance la lecture du fichier
            reader.readAsDataURL(file);
        }
    });
}

// Gestion de la suppression
if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener("click", () => {
        photoInput.value = "";
        previewPhoto.src = "";
        previewPhoto.classList.add("d-none");
        initialsCircle.classList.remove("d-none");
        btnRemovePhoto.classList.add("d-none");
    });
}