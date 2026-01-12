<?php

ob_start();
include 'cv . php ';
$html = ob_get_clean(); // le contenu de cv . php est inséré dans la variable html
$pdf = new Dompdf(); // création du pdf
$pdf->loadHtml($html); // chargement du contenu dans Dompdf
$pdf->setPaper('A4 '); // configuration du format
$pdf->render(); // rendu du pdf
$pdf->stream(" cv . pdf "); // envoi au navigateu

?>