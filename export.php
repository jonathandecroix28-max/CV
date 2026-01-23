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

$theme = $_POST['cv_theme'] ?? 'dark';
$validThemes = ['dark', 'blue', 'modern'];
if (!in_array($theme, $validThemes)) {
    $theme = 'dark';
}

error_log("Thème reçu : " . $theme);

ob_start();

include "cv-{$theme}.php";
$html = ob_get_clean();
$html = trim($html);

$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

$canvas = $dompdf->getCanvas();
$font = $dompdf->getFontMetrics()->getFont('Helvetica', 'normal');
$fontSize = 10;
//$canvas->page_text(520, 820, "Page {PAGE_NUM} sur {PAGE_COUNT}", $font, $fontSize, [0, 0, 0]);

while (ob_get_level()) {
    ob_end_clean();
}

$dompdf->stream("le_cv_de_{$pseudo_cv}.pdf", ["Attachment" => true]);

exit;