<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        <?php
        $css = file_get_contents("assets/css/cv.css");
        // on remplace les couleurs du thème sombre par bleu
        $css = str_replace('#1e272e', '#003d82', $css);
        $css = str_replace('#0fbcf9', '#0066cc', $css);
        $css = str_replace('background-color: #1e272e', 'background: linear-gradient(135deg, #003d82 0%, #0066cc 100%)', $css);
        echo $css;
        ?>
    </style>
</head>

<body>
    <div class="sidebar-bg"></div>
    <table class="wrapper">
        <tr>
            <td class="sidebar">
                <div class="initials-circle">
                    <table class="initials-center-table">
                        <tr>
                            <td>
                                <?php if (!empty($photo_base64)): ?>
                                    <div class="photo-container">
                                        <img src="<?php echo $photo_base64; ?>" alt="Photo de profil">
                                    </div>
                                <?php else: ?>
                                    <div style="font-size: 30px; color: #0066cc;">
                                        <?php echo strtoupper(substr($prenom ?? '', 0, 1) . substr($nom ?? '', 0, 1)); ?>
                                    </div>
                                <?php endif; ?>
                            </td>
                        </tr>
                    </table>
                </div>
                <h1>
                    <?php echo htmlspecialchars(($_POST['prenom'] ?? '') . ' ' . ($_POST['nom'] ?? '')); ?>
                </h1>
                <h2>Profil</h2>
                <div class="sidebar-text"><?php echo nl2br(htmlspecialchars($_POST['description'] ?? '')); ?></div>
                <h2>Contact</h2>
                <div class="contact-item">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" width="12">
                    <?php echo htmlspecialchars($_POST['numero'] ?? ''); ?>
                </div>
                <div class="contact-item">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/mail.png" width="12">
                    <?php echo htmlspecialchars($_POST['email'] ?? ''); ?>
                </div>
                <h2>Compétences</h2>
                <?php
                if (isset($_POST['competence']) && is_array($_POST['competence'])):
                    foreach ($_POST['competence'] as $skill):
                        if (!empty(trim($skill))): ?>
                            <div class="skill-item"><?php echo htmlspecialchars($skill); ?></div>
                        <?php endif;
                    endforeach;
                endif;
                ?>
            </td>
            <td class="main">

                <div class="headline"><?php echo htmlspecialchars($_POST['headline'] ?? ''); ?></div>

                <h2>Expériences Professionnelles</h2>
                <?php if (!empty($_POST['poste'])): ?>
                    <?php foreach ($_POST['poste'] as $idx => $poste): ?>
                        <div class="item">
                            <div class="item-title"><?php echo htmlspecialchars($poste); ?></div>
                            <div class="item-meta">
                                <?php echo htmlspecialchars($_POST['entreprise'][$idx] ?? ''); ?> |
                                <?php echo htmlspecialchars($_POST['date'][$idx] ?? ''); ?> au
                                <?php echo htmlspecialchars($_POST['fin'][$idx] ?? ''); ?>
                            </div>
                            <div class="item-desc-main">
                                <?php echo nl2br(htmlspecialchars($_POST['description-mission'][$idx] ?? '')); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>

                <h2>Formation</h2>
                <?php if (!empty($_POST['formation'])): ?>
                    <?php foreach ($_POST['formation'] as $idx => $f): ?>
                        <div class="item">
                            <div class="item-title"><?php echo htmlspecialchars($f); ?></div>
                            <div class="item-meta"><?php echo htmlspecialchars($_POST['etablissement'][$idx] ?? ''); ?> |
                                <?php echo htmlspecialchars($_POST['datef'][$idx] ?? ''); ?> au
                                <?php echo htmlspecialchars($_POST['finf'][$idx] ?? ''); ?>
                            </div>
                            <div class="item-desc-main">
                                <?php echo nl2br(htmlspecialchars($_POST['description-formation'][$idx] ?? '')); ?>
                            </div>

                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </td>
        </tr>
    </table>

</body>

</html>