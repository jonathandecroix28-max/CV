# Rendu de projet : Générateur de CV (Html, Css, Bootstrap, Php et Javascript)

Au cours de ce projet on nous a demandé de réaliser un générateur de CV, dynamique avec une preview et que l'on peut exporter et télécharger en pdf avec DomPdf et en se servant du Php.

## Ce qu'il faut utiliser

Sommaire

* [Dompdf](#dompdf)
* [Fichiers Important](#les-fichiers-important)
* [Bootstrap](#bootstrap)
* [Node.js/Php](#nodejsphp)
* [Server Local](#server-local)
* [Structure du Projet](#structure-du-projet)
* [Fonctionnalités](#fonctionnalités)
* [Utilisation](#utilisation)
* [Thèmes](#thèmes)


## Dompdf

Dompdf est un convertisseur Html en Pdf, mais limité au Css 2.1, ce qui rend compliqué l'usage de Bootstrap sur la partie Php.  

D'ailleurs création d'un .gitgnore pour le dossier vendor et le fichier composer.lock pour éviter tout probléme lors du push

### Prérequis

- Dompdf nécessite **PHP 7.1+** et les extensions `mbstring`, `dom` et `gd` activées dans votre `php.ini`. 
- Composer installé et disponible dans votre PATH.

### Installation

Pour installer Dompdf via Composer, lancez la commande suivante :

```bash
composer require dompdf/dompdf
```

Cela va créer le dossier `vendor/` qui contient tout le code de Dompdf et ses dépendances.

### Variables/Chemins

- Les assets sont servis depuis `assets/` 
- `vendor/` est géré par Composer et contient les dépendances
- Les fichiers PHP pour l'export sont à la racine du projet


## Les fichiers importants

### cv.php  
Le fichier php de base qui génère le contunue du cv simple. C'est ici que le contenu du formulaire est injecté pour être converti en PDF.

### cv-dark.php / cv-blue.php / cv-modern.php (bonus)
Fichiers templates PHP qui génèrent le contenu du CV selon le thème choisi. Ils contiennent la structure HTML et le style CSS intégré. C'est ici que le contenu du formulaire est injecté pour être converti en PDF.

### export.php
C'est ici que s'établit le paramétrage de la conversion en PDF. Voici comment cela fonctionne :

```php
require 'vendor/autoload.php';
use Dompdf\Dompdf;

$theme = $_POST['theme'] ?? 'dark'; // Récupère le thème sélectionné
ob_start();
//include "cv.php" si on a pas fait le bonus
include "cv-{$theme}.php"; // Inclut le template du thème (bonus)
$html = ob_get_clean(); // Le contenu est inséré dans la variable html

$pdf = new Dompdf(); // Création du pdf
$pdf->loadHtml($html); // Chargement du contenu dans Dompdf
$pdf->setPaper('A4'); // Configuration du format
$pdf->render(); // Rendu du pdf
$pdf->stream("cv.pdf"); // Envoi au navigateur
```

### index.html
Fichier principal contenant :
- Le **formulaire** pour saisir les informations du CV
- La **preview dynamique** qui se met à jour en temps réel avec JavaScript
- Les **templates cachés** pour générer les items (expériences, formations, compétences, loisirs)
- Usage des attributs pour l'envoi des donnée en Php via $_POST

### assets/css/

- **preview.css** : Styles pour la preview du CV
- **theme-{$color}.css** : Styles thématiques pour la preview (couleurs selon le thème)
- **cv.css** : Styles pour le rendu PDF (compatible Dompdf)
- **index.css** : Styles du formulaire et de la mise en page générale

### assets/js/


- **main.js** :
  - Gestion du formulaire
  - Mise à jour dynamique de la preview en temps réel
  - Ajout/suppression d'items (expériences, formations, compétences, loisirs)
  - Gestion des thèmes (sombre, bleu, moderne)
  - Récupération des données du formulaire
  - Mode jour/nuit
  -Systeme de focus sur la preview


#### Fonctionnement de l'export


- Les templates PHP (`cv-dark.php`, `cv-blue.php`, `cv-modern.php`) contiennent la structure du CV
- Le Php va chercher mes attributs Html "name" grace au $_POST
- `export.php` inclut le template approprié et utilise Dompdf pour la conversion
- Le PDF est généré et téléchargé automatiquement


## Bootstrap

Bootstrap est utilisé pour :
- **Mise en page** : Grille, flexbox pour la disposition
- **Composants** : Boutons, formulaires, inputs
- **Responsive design** : Adaptation mobile et desktop
- **Utilitaires** : Classes d'espacement, de couleur, etc.

**Note** : Bootstrap n'est pas utilisé dans les fichiers PHP pour éviter les incompatibilités avec Dompdf (Css 2.1 seulement).


## Node.js/Php

Pour ce projet, vous avez besoin de PHP et JavaScript.

### Installation de PHP et ses extensions

```bash
sudo apt update

sudo apt install php libapache2-mod-php php-xml php-gd php-mbstring php-curl php-zip -y

php -v
```

Extensions requises :
- `php-xml` : Pour le traitement XML
- `php-gd` : Pour la manipulation d'images
- `php-mbstring` : Pour les chaînes multi-octets
- `php-curl` : Pour les requêtes HTTP
- `php-zip` : Pour la compression

### Installation de Node.js

```bash
sudo apt update

sudo apt install nodejs npm -y

node -v
npm -v
```

**Note** : Node.js n'est pas obligatoire pour ce projet, mais peut être utilisé pour des outils de build ou de développement.


## Server Local

### Démarrer un serveur PHP intégré

```bash
cd projet-cv
php -S localhost:8000
```

Puis ouvrez http://localhost:8000 dans votre navigateur.

### Export PDF

- Le formulaire envoie vers `export.php` qui utilise Dompdf
- Assurez-vous que `vendor/` est présent (via `composer install`)
- Les images sont intégrées en base64 pour éviter les problèmes de chemins
- Vérifiez que `php-gd` est activée pour la manipulation d'images

**Troubleshooting** :
- Si les images ne s'affichent pas, vérifiez que `php-gd` est installé
- Si Dompdf ne trouve pas les fichiers, assurez-vous que les chemins sont relatifs
- Pour les problèmes d'encodage UTF-8, vérifiez la déclaration `<meta charset="UTF-8">`


## Fonctionnalités

 **Formulaire dynamique** :
- Champs personnels (nom, prénom, email, téléphone)
- Description/profil
- Expériences professionnelles
- Formation
- Compétences
- Loisirs
- Possibilité d'ajouter/supprimer des items

  **Preview en temps réel** :
- Mise à jour instantanée pendant la saisie
- Affichage du CV au format PDF
- Hauteur de préview adaptée

  **Thèmes** :
- **Thème Sombre** : Couleur cyan/bleu clair sur fond sombre
- **Thème Bleu** : Ton bleu foncé professionnel
- **Thème Moderne** : Design moderne avec couleurs épurées

  **Export PDF** :
- Téléchargement du CV en format PDF
- Conservation des thèmes visuels
- Support des images
- Format A4 optimisé


## Utilisation

### 1. Remplir le formulaire

Complétez tous les champs du formulaire :
- Informations personnelles
- Expériences professionnelles (bouton "Ajouter une expérience")
- Formations (bouton "Ajouter une formation")
- Compétences (bouton "Ajouter une compétence")
- Loisirs (bouton "Ajouter un loisir")

### 2. Voir la preview

La preview à droite se met à jour en temps réel au fur et à mesure que vous tapez.

### 3. Choisir un thème

Sélectionnez le thème souhaité :
- Sombre
- Bleu
- Moderne

La preview et le PDF exported utiliseront ce thème.

### 4. Exporter en PDF

Cliquez sur le bouton "Télécharger PDF" pour générer et télécharger votre CV en format PDF.


## Thèmes

### Thème Sombre (défaut)
- **Couleur principale** : Cyan (#0fbcf9)
- **Couleur secondaire** : Gris (#636e72)
- **Fond sidebar** : Noir très foncé (#1e272e)
- **Fond main** : Blanc

### Thème Bleu
- **Couleur principale** : Bleu professionnel (#0066cc)
- **Couleur secondaire** : Gris (#636e72)
- **Fond sidebar** : Bleu très foncé (#003d82)
- **Fond main** : Blanc

### Thème Moderne
- **Couleur principale** : Rouge moderne (#e74c3c)
- **Couleur secondaire** : Gris (#636e72)
- **Fond sidebar** : Gris-bleu (#2c3e50)
- **Fond main** : Blanc



## Configurations Dompdf

Dans `export.php`, vous pouvez personnaliser :

```php
$pdf = new Dompdf();

// Options
$options = new Options();
$options->set('isRemoteEnabled', true); // Activer les images distantes
$options->set('isHtml5ParserEnabled', true);
$pdf->setOptions($options);

$pdf->loadHtml($html);
$pdf->setPaper('A4', 'portrait'); // Format et orientation
$pdf->render();
$pdf->stream("mon-cv.pdf");
```


## Dépannage

### Le PDF ne se génère pas
- Vérifiez que `vendor/autoload.php` existe
- Lancez `composer install` si le dossier vendor est manquant
- Vérifiez que PHP 7.1+ est installé

### Les images n'apparaissent pas
- Assurez-vous que `php-gd` est installé
- Les images doivent être en base64 ou en chemin absolu
- Activez `isRemoteEnabled` dans Dompdf si vous utilisez des URLs

### Le texte s'affiche mal
- Vérifiez que `php-mbstring` est activée
- Ajoutez `<meta charset="UTF-8">` dans l'en-tête HTML
- Testez avec des caractères simples d'abord

### La sidebar écrase le contenu
- Limitez la largeur avec `max-width: 200px` en CSS
- Réduisez la taille du texte sidebar
- Utilisez `word-wrap: break-word` pour les textes longs

### Les emojis ne s'affichent pas
- Utilisez des caractères HTML (`&#128231;` au lieu de 📧)
- Ou remplacez par du texte simple (Email:, Téléphone:)
- Vérifiez l'encodage UTF-8


## Notes de développement

- **Dompdf** n'est pas compatible avec le Flexbox avancé ou Grid CSS


