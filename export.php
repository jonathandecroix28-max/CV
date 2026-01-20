<?php
require 'vendor/autoload.php';
use Dompdf\Dompdf;
use Dompdf\Options;

// 1. Configuration des options
$options = new Options();
$options->set('isRemoteEnabled', true);
$options->set('defaultFont', 'Helvetica'); // Helvetica est souvent plus propre que Arial sur Dompdf

// 2. Initialisation UNIQUE de Dompdf avec les options
$dompdf = new Dompdf($options);

// 3. Récupération du contenu HTML
ob_start();
include 'cv.php';
$html = ob_get_clean();

// 4. Chargement et rendu
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// 5. Envoi au navigateur (le paramètre 'Attachment' => false permet d'ouvrir au lieu de télécharger)
$dompdf->stream("mon_cv.pdf", ["Attachment" => false]);
?>