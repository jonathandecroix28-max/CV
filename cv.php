

<style>
    /* Configuration de la page */
    @page {
        margin: 0;
    }

    body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        font-size: 11pt;
        line-height: 1.4;
        color: #333;
        margin: 0;
        padding: 0;
    }

    /* Layout principal */
    .cv-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        /* Force le respect des largeurs */
    }

    /* Colonne Gauche (Colorée) */
    .sidebar {
        width: 35%;
        background-color: #2c3e50;
        color: white;
        padding: 30px 20px;
        vertical-align: top;
        height: 100%;
    }

    /* Colonne Droite (Contenu) */
    .main-content {
        width: 65%;
        padding: 40px 30px;
        vertical-align: top;
    }

    /* Typographie */
    h1 {
        font-size: 24pt;
        margin-bottom: 5px;
        text-transform: uppercase;
    }

    h2 {
        font-size: 14pt;
        border-bottom: 2px solid #27ae60;
        padding-bottom: 5px;
        margin-top: 25px;
    }

    .job-title {
        font-size: 14pt;
        color: #27ae60;
        margin-bottom: 20px;
    }

    /* Blocs d'expérience */
    .item {
        margin-bottom: 15px;
        page-break-inside: avoid;
    }

    .date {
        font-weight: bold;
        font-size: 10pt;
        color: #7f8c8d;
    }

    .company {
        font-weight: bold;
        font-style: italic;
    }
</style>

<table class="cv-table">
    <tr>
        <td class="sidebar">
            <h1>
                <?php echo $_POST['prenom'] . ' ' . $_POST['nom']; ?>
            </h1>
            <p class="job-title">
                <?php echo $_POST['headline']; ?>
            </p>

            <h2>CONTACT</h2>
            <p>Email:
                <?php echo $_POST['email']; ?>
            </p>
            <p>Tel:
                <?php echo $_POST['numero']; ?>
            </p>

            <h2>COMPÉTENCES</h2>
        </td>

        <td class="main-content">
            <h2>EXPÉRIENCES PROFESSIONNELLES</h2>
            <div class="item">
                <div class="date">Jan 2020 - Déc 2023</div>
                <div class="company">Nom de l'entreprise</div>
                <p>Description des missions...</p>
            </div>

            <h2>FORMATIONS</h2>
        </td>
    </tr>
</table>