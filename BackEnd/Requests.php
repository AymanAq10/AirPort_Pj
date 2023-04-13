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
        $arr = [];

        foreach ($ItemsId as $value) {
            $id = (int) $value;

            if (!((int) requestesaccepter::SearchRequ($id))) {
                new requestesaccepter($id);
            } else {
                array_push($arr, $id);
            };
        };

        header("Content-Type: JSON");
        echo json_encode($arr, JSON_PRETTY_PRINT);
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

    elseif ($type == 'AddRequest') {
        ini_set('upload_max_filesize', '64M');
        ini_set('post_max_size', '100M');
        $id = (int) json_decode($_POST['data'])[0];
        $message = json_decode($_POST['data'])[1];
        $PdfFile = file_get_contents($_FILES['pdf_file']['tmp_name']);
        $date = date('Y-m-d');

        new Requests($id, $PdfFile, $message, $date);
    }

    elseif ($type == 'CheckRequest') {
        $id = (int) $_POST['ItemId'];

        header("Content-Type: JSON");
        echo json_encode($req -> CheckRequest($id), JSON_PRETTY_PRINT);
    }