<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Content-Type: JSON");

    include('App.php');

    $type = $_POST['type'];

    $Stagiaire = new Stagiaire();

    if ($type == 'GetData') {
        echo json_encode($Stagiaire -> GetAllStagiaires(), JSON_PRETTY_PRINT);
    }

    elseif ($type == 'DeleteItem') {
        $ItemId = (int) $_POST['ItemId'];
        $Stagiaire -> DeleteStagiaire($ItemId);
    }

    elseif ($type == 'DeleteItems') {
        $ItemsId = explode(',', $_POST['ItemsId']);
        $Stagiaire -> DeleteStagiaires($ItemsId);
    }

    elseif ($type == 'DeleteAll') {
        $Stagiaire -> DeleteAll();
    }