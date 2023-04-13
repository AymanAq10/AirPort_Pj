<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    include('App.php');

    $type = $_POST['type'];

    $Stagiaire = new Stagiaire();

    if ($type == 'GetData') {
        header("Content-Type: JSON");
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

    elseif ($type == 'AddStagiaire') {
        $data = json_decode($_POST['Sta_Data']);
        new Stagiaire($data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6]);
    }

    elseif ($type == 'SearchStagiaire') {
        $StagiaireId = (int) $_POST['id'];
        header("Content-Type: JSON");
        if ($Stagiaire -> GetStagiaire($StagiaireId)) {
            echo json_encode(true, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(false, JSON_PRETTY_PRINT);
        };
    }

    elseif ($type == 'GetProfile') {
        $id = (int) $_POST['id'];
        $data = $Stagiaire -> GetStagiaire($id);
        $data['ImageProfile'] = base64_encode($data['ImageProfile']);
        header("Content-Type: JSON");
        echo json_encode(['ImageProfile' => $data['ImageProfile']], JSON_PRETTY_PRINT);
    }

    elseif ($type == 'GetUserData') {
        $id = (int) $_POST['id'];
        $data = $Stagiaire -> GetStagiaire($id);
        $data['ImageProfile'] = base64_encode($data['ImageProfile']);
        header("Content-Type: JSON");
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    elseif ($type == 'UpdateData') {
        $data = json_decode($_POST['data']);

        $data[6] = file_get_contents($data[6]);

        $Stagiaire -> UpdateData($data);
    }