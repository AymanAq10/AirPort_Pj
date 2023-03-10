<?php

    header('Access-Control-Allow-Origin: http://localhost:3000');
    header("Content-Type: JSON");
    $connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');

    function ToArray(string $TableName, string $email, string $password, array $columns)
    {
        global $connect;
        $Check = $connect -> prepare("SELECT * FROM $TableName WHERE Acc_email = '$email' AND _Password = '$password'");
        $Check -> execute();

        $response = array();

        foreach ($Check as $data) {
            foreach ($columns as $name) {
                $response[$name] = $data[$name];
            };
        };

        return $response;
    };


    $email = $_POST['Email'];
    $password = $_POST['Password'];

    $Columns = [
        'Stagiaire' => ['Acc_id', 'Fname', 'Lname', 'Domain', '_Number', 'Acc_email', 'CIN', '_Password'],
        'Admin' => ['AdminId', 'Fname', 'Lname', 'Acc_email', 'Tele', '_Password']
    ];

    if (ToArray('Admin_acc', $email, $password, $Columns['Admin'])) {

        $data = ToArray('Admin_acc', $email, $password, $Columns['Admin']);
        echo json_encode([$data, "Admin"], JSON_PRETTY_PRINT);

    } elseif (ToArray('Stagiaire_acc', $email, $password, $Columns['Stagiaire'])) {

        $data = ToArray('Stagiaire_acc', $email, $password, $Columns['Stagiaire']);
        echo json_encode([$data, "Stagiaire"], JSON_PRETTY_PRINT);

    } else {

        echo json_encode([], JSON_PRETTY_PRINT);

    };
?>