<?php

    header('Access-Control-Allow-Origin: http://localhost:3000');

    include('App.php');

    $req = new Requests();
    $type = $_POST['type'];

    if ($type == 'GetAllRequests') {
        header("Content-Type: JSON");
        echo json_encode($req -> GetAllRequests(), JSON_PRETTY_PRINT);
    }