<?php

    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Content-Type: JSON");

    include('App.php');

    $reqAc = new requestesaccepter();
    $req = new Requests();

    $type = $_POST['type'];

    if ($type == 'GetRequestAccepte') {
        echo json_encode($reqAc -> GetData(), JSON_PRETTY_PRINT);
    }

    elseif ($type == 'RemoveAll') {
        $reqAc -> RemoveAll();
    }

    elseif ($type == 'RemoveSome') {
        $data = json_decode($_POST['data']);
        $reqAc -> RemoveSome($data);
    }

    elseif ($type == 'DownoaldAllCV') {
        $reqAc -> DownoaldAllPdfFiles();
    }