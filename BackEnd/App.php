<?php

    class Stagiaire {
        private $connect;

        public function __construct()
        {
            $this -> connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        }

        public function GetAllStagiaires()
        {
            $data = $this -> connect -> prepare('SELECT * FROM Stagiaire_acc');
            $data -> execute();

            $response = [];

            foreach ($data as $value) {
                array_push($response, [
                    'idStiaire' => $value['Acc_id'],
                    'FirstName' => $value['Fname'],
                    'LastName' => $value['Lname'],
                    'Specialty' => $value['Domain'],
                    'Thel' => $value['_Number'],
                    'CIN' => $value['CIN'],
                    'Email' => $value['Acc_email'],
                    'Password' => $value['_Password']
                ]);
            };

            return $response;
        }

        public function DeleteStagiaire(int $stagiaireId)
        {
            $rem = $this -> connect -> prepare("DELETE FROM Stagiaire_acc WHERE Acc_id = $stagiaireId");
            $rem -> execute();
        }

        public function DeleteStagiaires(array $stagiaireArr)
        {
            foreach ($stagiaireArr as $item) {
                $id = (int) $item;
                $rem = $this -> connect -> prepare("DELETE FROM Stagiaire_acc WHERE Acc_id = $id");
                $rem -> execute();
            };
        }

        public function DeleteAll()
        {
            $rem = $this -> connect -> prepare("DELETE FROM Stagiaire_acc");
            $rem -> execute();
        }
    };


    class Requests {
        private $connect;

        public function __construct()
        {
            $this -> connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        }

        public function GetAllRequests()
        {
            $req = $this -> connect -> prepare("SELECT Acc_id, Message, RequDate FROM requests");
            $req -> execute();
            $response = [];

            foreach ($req as $value) {
                array_push($response, [
                    "Acc_id" => $value["Acc_id"],
                    "Message" => $value["Message"],
                    "RequDate" => $value["RequDate"]
                ]);
            }

            return $response;
        }
    }

    // $Req = new Requests();
    // print_r($Req -> GetAllRequests());