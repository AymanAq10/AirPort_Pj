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

        $connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        $var = $connect -> prepare('DELETE FROM RequestesAccepter');
        $var -> execute();

        foreach ($ItemsId as $value) {
            $id = (int) $value;

            new requestesaccepter($id);
        }
    }

    elseif ($type == 'viewPdfFile') {
        $id = (int) $_POST['id'];
        $req -> ViewPdfFile($id);
    }

    elseif ($type == 'DawnoaldPdfFile') {
        $id = (int) $_POST['id'];
        $req -> DownoaldPdfFile($id);
    }

    elseif ($type == 'DeleteRequestsNotAccepte') {
        header("Content-Type: JSON");
        echo json_encode($req -> RemoveRequestsNotAccepte(), JSON_PRETTY_PRINT);
    }