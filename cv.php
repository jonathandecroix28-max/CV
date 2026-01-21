<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <style>
        <?php echo file_get_contents(filename: "assets/css/cv.css"); ?>
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
                                <?php echo strtoupper(substr($_POST['prenom'] ?? 'J', 0, 1) . substr($_POST['nom'] ?? 'T', 0, 1)); ?>
                            </td>
                        </tr>
                    </table>
                </div>
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
                // On vérifie si la variable existe et n'est pas vide
                if (isset($_POST['competence']) && is_array($_POST['competence'])):
                    foreach ($_POST['competence'] as $skill):
                        // On vérifie que la compétence n'est pas une chaîne vide
                        if (!empty(trim($skill))): ?>
                            <div class="skill-item"><?php echo htmlspecialchars($skill); ?></div>
                        <?php endif;
                    endforeach;
                endif;
                ?>
            </td>
            <td class="main">
                <h1><?php echo htmlspecialchars(($_POST['prenom'] ?? '') . ' ' . ($_POST['nom'] ?? '')); ?></h1>
                <div class="headline"><?php echo htmlspecialchars($_POST['headline'] ?? ''); ?></div>

                <h2>Expériences Professionnelles</h2>
                <?php if (!empty($_POST['poste'])): ?>
                    <?php foreach ($_POST['poste'] as $idx => $poste): ?>
                        <div class="item">
                            <div class="item-title"><?php echo htmlspecialchars($poste); ?></div>
                            <div class="item-meta">
                                <?php echo htmlspecialchars($_POST['entreprise'][$idx] ?? ''); ?> |
                                <?php echo htmlspecialchars($_POST['date'][$idx] ?? ''); ?>
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
                            <div class="item-meta"><?php echo htmlspecialchars($_POST['etablissement'][$idx] ?? ''); ?></div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </td>
        </tr>
    </table>

</body>

</html>