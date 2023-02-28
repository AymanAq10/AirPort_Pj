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

        public function DeleteOneRequest(int $req_id)
        {
            $rem = $this -> connect -> prepare("DELETE FROM requests WHERE Acc_id = $req_id");
            $rem -> execute();
        }

        public function DeleteAllRequests()
        {
            $rem = $this -> connect -> prepare("DELETE FROM requests");
            $rem -> execute();
        }

        public function ViewPdfFile(int $id)
        {
            $stmt = $this -> connect -> prepare("SELECT StagiaireCV FROM Requests WHERE Acc_id = $id");
            $stmt -> execute();

            $pdfData = $stmt -> fetchColumn();
            header("Content-type: application/pdf");
            header("Content-Length: " . strlen($pdfData));
            echo $pdfData;
        }

        public function DownoaldPdfFile(int $id)
        {
            $stmt = $this -> connect -> prepare("SELECT StagiaireCV FROM Requests WHERE Acc_id = $id");
            $stmt->execute();
            $file = $stmt -> fetch(PDO::FETCH_ASSOC);

            header("Content-type: application/pdf");
            header("Content-Disposition: attachment; filename=" . (string) $id);
            header("Content-length: " . strlen($file['StagiaireCV']));

            echo $file['StagiaireCV'];
        }

        public function RemoveRequestsNotAccepte()
        {
            $stmt = $this -> connect -> prepare("CALL RemoveRequestsNotAccepte ();");
            $stmt->execute();

            return requestesaccepter :: GetAcc_id();
        }
    }

    class requestesaccepter
    {
        private $connect;
        private int $Acc_id;
        private $RequDateAcc;


        public function __construct(int $Acc_id)
        {
            $this -> connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
            $this -> RequDateAcc = date('Y-m-d');
            $this -> Acc_id = $Acc_id;

            $insert = $this -> connect -> prepare("INSERT INTO requestesaccepter VALUE(?, ?)");
            $insert -> execute(array($this -> Acc_id, $this -> RequDateAcc));
        }

        public static function GetAcc_id()
        {
            $conn = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
            $Get = $conn -> prepare("SELECT Acc_id FROM RequestesAccepter");
            $Get -> execute();
            $response = [];

            foreach ($Get as $id) {
                array_push($response, $id['Acc_id']);
            }

            return $response;
        }
    }