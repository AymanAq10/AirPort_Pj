<?php

    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Content-Type: JSON");

    include('App.php');

    $reqAc = new requestesaccepter();

    $type = $_POST['type'];

    if ($type == 'GetRequestAccepte') {
        echo json_encode($reqAc -> GetData(), JSON_PRETTY_PRINT);
    }