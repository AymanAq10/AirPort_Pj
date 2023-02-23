<?php

    class Stagiaire {
        private $connect;

        public function __construct()
        {
            $this -> connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        }

        public function GetAllStagiaires()
        {
            $data = $this -> connect -> prepare('SELECT * FROM stagiaire');
            $data -> execute();

            $response = [];

            foreach ($data as $value) {
                array_push($response, [
                    'idStiaire' => $value['idStiaire'],
                    'FirstName' => $value['Fname'],
                    'LastName' => $value['Lname'],
                    'Specialty' => $value['Domain'],
                    'Thel' => $value['_Number'],
                    'CIN' => $value['CIN']
                ]);
            };

            return $response;
        }

        public function DeleteStagiaire(int $stagiaireId)
        {
            $rem = $this -> connect -> prepare("DELETE FROM stagiaire WHERE idStiaire = $stagiaireId");
            $rem -> execute();
        }

        public function DeleteStagiaires(array $stagiaireArr)
        {
            foreach ($stagiaireArr as $item) {
                $id = (int) $item;
                $rem = $this -> connect -> prepare("DELETE FROM stagiaire WHERE idStiaire = $id");
                $rem -> execute();
            };
        }

        public function DeleteAll()
        {
            $rem = $this -> connect -> prepare("DELETE FROM stagiaire");
            $rem -> execute();
        }
    };

    class StagiaireAccounts {
        private $connect;

        public function __construct()
        {
            $this -> connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        }

        public function GetAllAccountes()
        {
            $Get = $this -> connect -> prepare('SELECT * FROM stagiaire_acc');
            $Get -> execute();

            $response = [];

            foreach ($Get as $value) {
                array_push($response, [
                    'Acc_id' => $value['Acc_id'],
                    'idStiaire' => $value['idStiaire'],
                    'Acc_Email' => $value['Acc_Email'],
                    'Acc_Password' => $value['Acc_Password'],
                ]);
            };

            return $response;
        }

        public function DeleteAccount($id)
        {
            $Get = $this -> connect -> prepare("DELETE FROM stagiaire_acc WHERE Acc_id = $id");
            $Get -> execute();
        }

        public function DeleteAccounts(array $arr_id)
        {
            foreach ($arr_id as $item) {
                $id = (int) $item;
                $Get = $this -> connect -> prepare("DELETE FROM stagiaire_acc WHERE Acc_id = $id");
                $Get -> execute();
            }
        }

        public function DeleteAll()
        {
            $rem = $this -> connect -> prepare("DELETE FROM stagiaire_acc");
            $rem -> execute();
        }
    };

    // $sta = new Stagiaire();

    // $sta -> DeleteStagiaire();

    // $acc = new StagiaireAccounts();

    // $acc -> GetAllAccountes();