<?php
require 'vendor/autoload.php';
use Dompdf\Dompdf;
use Dompdf\Options;

$user = $_POST['nom'] . " " . $_POST['prenom'];
$user_propre = trim($user);
$user_final = preg_replace('/[^a-z0-9]/', '_', strtolower($user_propre));
$pseudo_cv = preg_replace('/_+/', '_', $user_final);

$options = new Options();
$options->set('isRemoteEnabled', true);
$options->set('defaultFont', 'Helvetica');
$options->set('isHtml5ParserEnabled', true);
$options->set('chroot', __DIR__);

$dompdf = new Dompdf($options);

$photo_base64 = $_POST['photo_base64'] ?? '';



ob_start();
include 'cv.php';
$html = ob_get_clean();
$html = trim($html); // Supprime les espaces parasites

$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();
// Nettoyage final du buffer pour éviter les pages blanches
while (ob_get_level()) {
    ob_end_clean();
}

$dompdf->stream("le_cv_de_{$pseudo_cv}.pdf", ["Attachment" => false]);

exit;