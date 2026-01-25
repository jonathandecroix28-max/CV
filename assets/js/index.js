const htmlElement = document.documentElement;
const mode = document.getElementById("mode");
const iconMode = document.getElementById("icon");
let compteur = 0;
let niveauCompteur = 0;


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

    const formulaire = document.getElementById("my-form");
    if (formulaire) formulaire.reset();
});

/*function lockInputsInSection(type) {
    let sectionId = '';

    // Déterminer l'ID de la section selon le type
    if (type === 'exp') {
        sectionId = '#exp';
    } else if (type === 'formation') {
        sectionId = '#form';
    } else if (type === 'comp') {
        sectionId = '#section-competence';
    }

    if (!sectionId) return;

    const section = document.querySelector(sectionId);
    if (!section) return;

    // Lock seulement les inputs du bloc initial (pas les ajoutés)
    const blocId = `#bloc-${type === 'exp' ? 'exp' : type === 'formation' ? 'fomation' : 'saisie-comp'}`;
    const bloc = section.querySelector(blocId);

    if (bloc) {
        const inputs = bloc.querySelectorAll('input:not(.lock), textarea:not(.lock)');
        inputs.forEach(input => {
            input.readOnly = true;
            input.classList.add('locked-style');
            input.classList.add('lock');
        });
    }
}*/
function ajouterElement(type, champs, templateID) {

    niveauCompteur++;
    compteur++;
    const template = document.getElementById(templateID);

    if (!template) return console.error("Template introuvable :", templateID);

    const clone = template.content.cloneNode(true);
    const formBlock = clone.querySelector("." + type + "-item");
    const previewBlock = clone.querySelector(".preview-" + type + "-item");

    if (!formBlock || !previewBlock) return console.error("Structure du template incorrecte pour :", type);

    // ✅ CRÉER DES IDS UNIQUES POUR CHAQUE ÉLÉMENT AJOUTÉ
    champs.forEach(element => {
        const cible = clone.querySelector(".p-" + element);
        const source = clone.querySelector("." + type + "-" + element);
        if (cible && source) {
            const uniqueId = "p-" + element + "-" + compteur;
            cible.id = uniqueId;
            source.dataset.target = "#" + uniqueId;
        }
    });

    // ✅ SPÉCIAL POUR LES COMPÉTENCES - Créer aussi l'ID du niveau
    if (type === 'comp') {
        const niveauCible = clone.querySelector(".p-niveau");
        const niveauSource = clone.querySelector(".comp-niveau");
        if (niveauCible && niveauSource) {
            const uniqueId = "p-niveau-" + niveauCompteur;
            niveauCible.id = uniqueId;
            niveauSource.dataset.target = "#" + uniqueId;
        }
    }

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

function initPreview(conteneur) {
    const inputs = conteneur.querySelectorAll('input[data-target], textarea[data-target], select[data-target]');

    inputs.forEach(input => {
        const selector = input.dataset.target;
        if (!selector) return;

        const cible = document.querySelector(selector);
        if (!cible) return;

        // ✅ FOCUS - Ajouter la classe et scroll
        input.addEventListener('focus', () => {
            document.querySelectorAll('.preview-focus').forEach(el => el.classList.remove('preview-focus'));
            cible.classList.add("preview-focus");
            cible.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        // ✅ BLUR - RETIRER la classe (LE FIX PRINCIPAL)
        input.addEventListener('blur', () => {
            cible.classList.remove("preview-focus");
        });

        // ✅ INPUT - Mettre à jour SANS appeler scrollIntoView
        const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
        input.addEventListener(eventType, () => {
            if (cible) {
                cible.innerText = input.value || cible.getAttribute('data-default') || "";
            }
        });
    });
}


if (mode) {
    mode.addEventListener("click", function () {
        const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark';
        htmlElement.setAttribute('data-bs-theme', isDark ? "light" : "dark");

        // ✅ FIX : Changer l'icône et le texte correctement
        const iconElement = document.getElementById("icon");
        const textElement = document.getElementById("mode-text");

        if (isDark) {
            // Passage au mode clair
            iconElement.className = "bi bi-sun";
            textElement.textContent = " Mode Clair";
            mode.classList.remove('btn-outline-light');
            mode.classList.add('btn-outline-dark');
        } else {
            // Passage au mode sombre
            iconElement.className = "bi bi-moon";
            textElement.textContent = " Mode Sombre";
            mode.classList.add('btn-outline-light');
            mode.classList.remove('btn-outline-dark');
        }
    });
}

// ✅ GESTION SPÉCIALE NOM/PRÉNOM
const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");
const previewFullName = document.getElementById('p-full-name');

function updateFullName() {
    const nom = nomInput.value.trim().toUpperCase();
    let prenom = prenomInput.value.trim();
    if (prenom) prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();

    previewFullName.textContent = (!nom && !prenom) ? "NOM Prénom" : `${prenom} ${nom}`.trim();
}

if (nomInput && prenomInput && previewFullName) {
    // ✅ INPUT - Mettre à jour
    nomInput.addEventListener('input', updateFullName);
    prenomInput.addEventListener('input', updateFullName);

    // ✅ FOCUS sur nom
    nomInput.addEventListener('focus', () => {
        document.querySelectorAll('.preview-focus').forEach(el => el.classList.remove('preview-focus'));
        previewFullName.classList.add("preview-focus");
        previewFullName.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // ✅ BLUR sur nom
    nomInput.addEventListener('blur', () => {
        previewFullName.classList.remove("preview-focus");
    });

    // ✅ FOCUS sur prenom
    prenomInput.addEventListener('focus', () => {
        document.querySelectorAll('.preview-focus').forEach(el => el.classList.remove('preview-focus'));
        previewFullName.classList.add("preview-focus");
        previewFullName.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // ✅ BLUR sur prenom
    prenomInput.addEventListener('blur', () => {
        previewFullName.classList.remove("preview-focus");
    });
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

                    console.log("Succès !  Taille :", compressedBase64.length);
                };

                img.src = e.target.result;
            };

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



// ✅ GESTION DES THÈMES
const themeRadios = document.querySelectorAll('input[name="cv-theme"]');
const cvThemeInput = document.getElementById("cv_theme");
const previewea = document.getElementById("previewea");

themeRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        const selectedTheme = this.value;

        // Enregistrer le thème choisi
        cvThemeInput.value = selectedTheme;

        // Appliquer le thème à la preview
        applyTheme(selectedTheme);

        console.log("🎨 Thème changé en :", selectedTheme);
    });
});

function applyTheme(theme) {
    // Retirer tous les thèmes
    previewea.classList.remove('theme-dark', 'theme-blue', 'theme-modern');

    // Ajouter le thème sélectionné
    previewea.classList.add(`theme-${theme}`);
}

// ✅ GESTION DES TABS MOBILE - CORRECT
const viewRadios = document.querySelectorAll('input[name="view-mobile"]');
const sectionForm = document.getElementById('section-form');
const sectionPreview = document.getElementById('section-preview');

viewRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        const selectedView = this.value;

        // Sur mobile seulement
        if (window.innerWidth <= 991) {
            if (selectedView === 'form') {
                sectionForm.style.display = 'block';
                sectionPreview.style.display = 'none';
            } else if (selectedView === 'preview') {
                sectionForm.style.display = 'none';
                sectionPreview.style.display = 'block';
            }
        }
    });
});

// ✅ Au resize de la fenêtre, réafficher les deux sur desktop
window.addEventListener('resize', function () {
    if (window.innerWidth > 991) {
        sectionForm.style.display = 'block';
        sectionPreview.style.display = 'block';
    }
});

// ✅ Au chargement, vérifier la taille
window.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth > 991) {
        sectionForm.style.display = 'block';
        sectionPreview.style.display = 'block';
    }
});

// Initialiser avec le thème par défaut
applyTheme('dark');