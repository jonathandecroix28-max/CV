<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <style>
        /* RESET & BASE */
        @page {
            margin: 0;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            width: 595pt;
            height: 842pt;
        }

        /* On force le tableau à une largeur fixe absolue */
        .wrapper {
            width: 595pt !important;
            border-collapse: collapse;
            table-layout: fixed !important;
            margin: 0;
            padding: 0;
        }

        /* Sidebar : Largeur verrouillée */
        .sidebar {
            width: 140pt !important;
            background-color: #1e272e;
            color: #ffffff;
            vertical-align: top;
            padding: 30pt 15pt;
            /* Empêche le texte de pousser les murs */
            word-wrap: break-word;
            overflow: hidden;
        }

        /* Main : Largeur verrouillée */
        .main {
            width: 455pt !important;
            background-color: #ffffff;
            vertical-align: top;
            padding: 30pt 25pt;
        }

        /* Correction pour les images qui pourraient forcer la largeur */
        img {
            max-width: 100%;
            height: auto;
        }


        .sidebar h2 {
            color: #0fbcf9;
            border-bottom: 1.5pt solid #3d4852;
            font-size: 12pt;
            /* Réduit de 14pt à 12pt */
            margin-top: 25pt;
            text-transform: uppercase;
            padding-bottom: 5pt;
        }

        .sidebar-text {
            color: #ffffff;
            font-size: 9pt;
            text-align: justify;
            margin-top: 10pt;
            line-height: 1.4;
        }

        /* MAIN CONTENT */
        .main {
            background-color: #ffffff;
            color: #2d3436;
            vertical-align: top;
            padding: 40pt 30pt;
        }

        .main h2 {
            color: #1e272e;
            border-bottom: 1.5pt solid #0fbcf9;
            font-size: 16pt;
            margin-top: 25pt;
            text-transform: uppercase;
            padding-bottom: 5pt;
            width: 100%;
        }

        /* TYPOGRAPHIE */
        h1 {
            font-size: 26pt;
            margin: 0;
            text-transform: uppercase;
            color: #1e272e;
            font-weight: bold;
        }

        .headline {
            font-size: 14pt;
            color: #0fbcf9;
            font-weight: bold;
            margin-bottom: 20pt;
        }

        /* ITEMS EXP & FORM */
        .item {
            margin-bottom: 15pt;
        }

        .item-title {
            font-weight: bold;
            font-size: 11pt;
            color: #1e272e;
        }

        .item-meta {
            color: #0fbcf9;
            font-weight: bold;
            font-size: 9pt;
            margin-bottom: 3pt;
        }

        .item-desc-main {
            color: #636e72;
            font-size: 10pt;
            text-align: justify;
            line-height: 1.3;
        }

        /* CONTACT & SKILLS */
        .contact-item {
            margin-bottom: 8pt;
            font-size: 9pt;
            color: #ffffff;
        }

        .skill-item {
            margin-bottom: 6pt;
            font-size: 9pt;
            border-left: 2pt solid #0fbcf9;
            padding-left: 8pt;
            color: #ffffff;
        }

        /* CERCLE INITIALES */
        .initials-circle {
            width: 70pt;
            height: 70pt;
            border: 2pt solid #0fbcf9;
            border-radius: 50%;
            line-height: 70pt;
            font-size: 25pt;
            margin: 0 auto 20pt auto;
            color: #0fbcf9;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <table class="wrapper" width="595" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="sidebar" width="140" style="width: 140pt;">
                <div class="initials-circle">
                    <?php echo strtoupper(substr($_POST['prenom'] ?? 'J', 0, 1) . substr($_POST['nom'] ?? 'T', 0, 1)); ?>
                </div>

                <h2>Profil</h2>
                <div class="sidebar-text">
                    <?php echo nl2br(htmlspecialchars($_POST['description'] ?? 'Votre profil ici...')); ?>
                </div>

                <h2>Contact</h2>
                <div class="contact-item"><img src="https://img.icons8.com/ios-filled/50/ffffff/phone.png" width="10"
                        style="vertical-align: middle;">
                    <?php echo htmlspecialchars($_POST['numero'] ?? '06XXXXXXXX'); ?></div>
                <div class="contact-item"><img src="https://img.icons8.com/ios-filled/50/ffffff/mail.png" width="10"
                        style="vertical-align: middle;">
                    <?php echo htmlspecialchars($_POST['email'] ?? 'exemple@mail.com'); ?>
                </div>

                <h2>Compétences</h2>
                <?php if (!empty($_POST['competence'])): ?>
                    <?php foreach ($_POST['competence'] as $skill): ?>
                        <div class="skill-item"><?php echo htmlspecialchars($skill); ?></div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </td>

            <td class="main" width="455" style="width: 455pt;">
                <h1><?php echo htmlspecialchars(($_POST['prenom'] ?? 'Prénom') . ' ' . ($_POST['nom'] ?? 'NOM')); ?>
                </h1>
                <div class="headline"><?php echo htmlspecialchars($_POST['headline'] ?? 'Développeur Web'); ?></div>

                <h2>Expériences Professionnelles</h2>
                <?php if (!empty($_POST['poste'])): ?>
                    <?php foreach ($_POST['poste'] as $idx => $poste): ?>
                        <div class="item">
                            <div class="item-title"><?php echo htmlspecialchars($poste); ?></div>
                            <div class="item-meta">
                                <?php echo htmlspecialchars($_POST['entreprise'][$idx] ?? 'Entreprise'); ?> |
                                <?php echo htmlspecialchars($_POST['date'][$idx] ?? ''); ?> —
                                <?php echo htmlspecialchars($_POST['fin'][$idx] ?? 'Présent'); ?>
                            </div>
                            <div class="item-desc-main">
                                <?php echo nl2br(htmlspecialchars($_POST['description-mission'][$idx] ?? 'Détails des missions...')); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>

                <h2>Formation</h2>
                <?php if (!empty($_POST['formation'])): ?>
                    <?php foreach ($_POST['formation'] as $idx => $f): ?>
                        <div class="item">
                            <div class="item-title"><?php echo htmlspecialchars($f); ?></div>
                            <div class="item-meta">
                                <?php echo htmlspecialchars($_POST['etablissement'][$idx] ?? 'École'); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </td>
        </tr>
    </table>
</body>

</html>