<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <style>
        <?php echo file_get_contents("assets/css/cv.css"); ?>
        <?php echo file_get_contents("assets/css/theme-dark.css"); ?>
    </style>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <div class="sidebar-bg"></div>
    <table class="wrapper">
        <tr>
            <!-- SIDEBAR -->
            <td class="sidebar">
                <!-- Photo / Initiales -->
                <div class="initials-circle">
                    <table class="initials-center-table">
                        <tr>
                            <td>
                                <div class="photo-container">
                                    <?php if (!empty($photo_base64)): ?>
                                        <img src="<?php echo $photo_base64; ?>" alt="Photo de profil">
                                    <?php else: ?>
                                        <div class="initials-div">
                                            <?php echo strtoupper(substr($prenom ?? '', 0, 1) . substr($nom ?? '', 0, 1)); ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Nom -->
                <h1><?php echo htmlspecialchars(($_POST['prenom'] ?? '') . ' ' . ($_POST['nom'] ?? '')); ?></h1>

                <!-- Profil -->
                <h2>Profil</h2>
                <div class="sidebar-text">
                    <?php echo nl2br(htmlspecialchars($_POST['description'] ?? '')); ?>
                </div>

                <!-- Contact -->
                <h2>Contact</h2>
                <div class="contact-item">
                    <span style="color: #ffffffff;">&#9742;</span>
                    <?php echo htmlspecialchars($_POST['numero'] ?? ''); ?>
                </div>
                <div class="contact-item">
                    <span style="color: #ffffffff;">&#9993;</span>
                    <?php echo htmlspecialchars($_POST['email'] ?? ''); ?>
                </div>

                <!-- Compétences -->
                <h2>Compétences</h2>
                <?php
                if (isset($_POST['competence']) && is_array($_POST['competence'])):
                    foreach ($_POST['competence'] as $skill):
                        if (!empty(trim($skill))): ?>
                            <div class="skill-item">
                                <?php echo htmlspecialchars($skill); ?>
                            </div>
                        <?php endif;
                    endforeach;
                endif;
                ?>
            </td>

            <!-- MAIN CONTENT -->
            <td class="main">
                <!-- Headline -->
                <div class="headline">
                    <?php echo htmlspecialchars($_POST['headline'] ?? ''); ?>
                </div>

                <!-- Expériences Professionnelles -->
                <h2>Expériences Professionnelles</h2>
                <?php if (!empty($_POST['poste'])): ?>
                    <?php foreach ($_POST['poste'] as $idx => $poste): ?>
                        <div class="item">
                            <div class="item-title">
                                <?php echo htmlspecialchars($poste); ?>
                            </div>
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

                <!-- Formation -->
                <h2>Formation</h2>
                <?php if (!empty($_POST['formation'])): ?>
                    <?php foreach ($_POST['formation'] as $idx => $f): ?>
                        <div class="item">
                            <div class="item-title">
                                <?php echo htmlspecialchars($f); ?>
                            </div>
                            <div class="item-meta">
                                <?php echo htmlspecialchars($_POST['etablissement'][$idx] ?? ''); ?> |
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