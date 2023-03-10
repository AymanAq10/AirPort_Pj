<?php

    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Content-Type: JSON");

    include('App.php');

    $type = $_POST['type'];
    $Admin = new Admin();

    if ($type == 'GetAdmin') {
        $id = (int) $_POST['Adminid'];
        echo json_encode($Admin -> GetAdmin($id), JSON_PRETTY_PRINT);
    }

    elseif ($type == 'UpdateAdmin') {
        $ArrData = json_decode($_POST['ArrData']);
        $Admin -> UpdateAdmin($ArrData);
    }

?>