# Rendu de projet : Generateur de CV (Html, Css, Bootstrap, Php et Javascript)

Au cours de ce projet on nous a demandé de realisé un générateur de CV, dynamique avec une preview et que l'on peut exporter et télécharger en pdf avec DomPdf et en se servant du Php.

## Ce qu'il faut utiliser

Sommaire

* [Dompdf](#dompdf)
* [Node.js/Php](#nodejsphp)
* [Server Local](#server-local)


## Dompdf


### Prérequis

Dompdf nécessite **PHP 7.1+** et les extensions `mbstring`, `dom` et `gd` activées dans votre `php.ini`.  


### Installation
Pour installer Dompdf via Composer, lancez la commande suivante :

```bash
composer require dompdf/dompdf
```

## Node.js/Php

### Pré-requis
- PHP 8.1+ recommandé (extensions `mbstring`, `dom`, `gd`).
- Composer installé et disponible dans votre PATH.
- (Optionnel) Node.js >= 18 si vous souhaitez utiliser un bundler ou un linter JS/CSS.

### Installation du projet
```bash
git clone <url-du-repo>
cd projet-cv
composer install
# Optionnel : npm install (si vous ajoutez un outil front)
```

### Variables/chemins
- Aucun `.env` requis : les fichiers sont statiques, seul PHP est utilisé pour l’export PDF.
- Les assets sont servis depuis `assets/` et `vendor/` est géré par Composer.

## Server Local

### Démarrer un serveur PHP intégré
```bash
cd projet-cv
php -S localhost:8000
```
Puis ouvrez http://localhost:8000 dans votre navigateur.

### Export PDF
- Le formulaire envoie vers `export.php` qui utilise Dompdf. Assurez-vous que `vendor/` est présent (via `composer install`).
- Si les images ne sortent pas dans le PDF, vérifiez que l’option `isRemoteEnabled` est activée dans `export.php` ou que les chemins d’images sont relatifs et accessibles.

### Déploiement rapide (hébergeur mutualisé)
- Uploadez tout le dossier du projet (y compris `vendor/`).
- Configurez la racine web sur le dossier du projet.
- Vérifiez que PHP a les extensions requises et une limite mémoire suffisante pour Dompdf (ex. `memory_limit=256M`).
