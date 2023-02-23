<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Content-Type: JSON");

    include('App.php');

    $type = $_POST['type'];

    $StagiaireAccount = new StagiaireAccounts();

    if ($type == 'GetAccounts') {
        echo json_encode($StagiaireAccount -> GetAllAccountes(), JSON_PRETTY_PRINT);
    }

    elseif ($type == 'DeleteAccount') {
        $id = (int) $_POST['ItemId'];
        $StagiaireAccount -> DeleteAccount($id);
    }

    elseif ($type == 'DeleteAccounts') {
        $ItemsId = explode(',', $_POST['ItemsId']);
        $StagiaireAccount -> DeleteAccounts($ItemsId);
    }

    elseif ($type == 'DeleteAll') {
        $StagiaireAccount -> DeleteAll();
    }