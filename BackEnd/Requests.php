<?php

    header('Access-Control-Allow-Origin: http://localhost:3000');

    include('App.php');

    $req = new Requests();
    $type = $_POST['type'];

    if ($type == 'GetAllRequests') {
        header("Content-Type: JSON");
        echo json_encode($req -> GetAllRequests(), JSON_PRETTY_PRINT);
    }

    elseif ($type == 'DeleteRequest') {
        $req -> DeleteOneRequest($_POST['ItemId']);
    }

    elseif ($type == 'DeleteAllRequests') {
        $req -> DeleteAllRequests();
    }

    elseif ($type == 'AccepteReq') {
        $ItemsId = explode(',', $_POST['ItemsId']);

        foreach ($ItemsId as $value) {
            $id = (int) $value;

            new requestesaccepter($id);
        }
    }