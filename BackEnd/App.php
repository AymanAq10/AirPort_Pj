<?php

class Stagiaire
{
    private $connect;
    private $FirstName;
    private $LastName;
    private $Thel;
    private $CIN;
    private $Speciality;
    private $Email;
    private $Password;

    public function __construct(
        string $FirstName = null,
        string $LastName = null,
        string $Speciality = null,
        string $Thel = null,
        string $Email = null,
        string $CIN = null,
        string $Password = null
    ) {
        $this->connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');

        if ($FirstName && $LastName && $Thel && $CIN && $Speciality && $Email && $Password) {
            $this->FirstName = $FirstName;
            $this->LastName = $LastName;
            $this->Thel = $Thel;
            $this->CIN = $CIN;
            $this->Speciality = $Speciality;
            $this->Email = $Email;
            $this->Password = $Password;

            $insert = $this->connect->prepare("INSERT INTO Stagiaire_acc(Fname, Lname, Domain, 
                    _Number, Acc_email, CIN, _Password) VALUE(?, ?, ?, ?, ?, ?, ?)");

            $insert->execute([
                $this->FirstName, $this->LastName, $this->Speciality,
                $this->Thel, $this->Email, $this->CIN, $this->Password
            ]);
        }
    }

    public function GetAllStagiaires()
    {
        $data = $this->connect->prepare('SELECT * FROM Stagiaire_acc');
        $data->execute();

        $response = [];

        foreach ($data as $value) {
            array_push($response, [
                'Acc_id' => $value['Acc_id'],
                'Fname' => $value['Fname'],
                'Lname' => $value['Lname'],
                'Domain' => $value['Domain'],
                '_Number' => $value['_Number'],
                'CIN' => $value['CIN'],
                'Acc_email' => $value['Acc_email'],
                '_Password' => $value['_Password']
            ]);
        };

        return $response;
    }

    public function DeleteStagiaire(int $stagiaireId)
    {
        $rem = $this->connect->prepare("DELETE FROM Stagiaire_acc WHERE Acc_id = $stagiaireId");
        $rem->execute();
    }

    public function DeleteStagiaires(array $stagiaireArr)
    {
        foreach ($stagiaireArr as $item) {
            $id = (int) $item;
            $rem = $this->connect->prepare("DELETE FROM Stagiaire_acc WHERE Acc_id = $id");
            $rem->execute();
        };
    }

    public function DeleteAll()
    {
        $rem = $this->connect->prepare("DELETE FROM Stagiaire_acc");
        $rem->execute();
    }

    public function GetStagiaire (int $id)
    {
        $data = $this->connect->prepare("SELECT * FROM Stagiaire_acc WHERE Acc_id = $id");
        $data->execute();

        $response = [];

        foreach ($data as $value) {
            array_push($response, [
                'Acc_id' => $value['Acc_id'],
                'Fname' => $value['Fname'],
                'Lname' => $value['Lname'],
                'Domain' => $value['Domain'],
                '_Number' => $value['_Number'],
                'CIN' => $value['CIN'],
                'Acc_email' => $value['Acc_email'],
                '_Password' => $value['_Password'],
                'ImageProfile' => $value['ImageProfile']
            ]);
        };
        return $response[0];
    }

    public function UpdateData(array $obj)
    {
        $update = $this->connect->prepare("UPDATE Stagiaire_acc SET Fname=?, Lname=?, Domain=?,
            _Number=?, CIN=?, Acc_email=?, ImageProfile=? WHERE Acc_id = ?");
        $update -> execute($obj);
    }
};


class Requests
{
    private $connect;
    private $Acc_id;
    private $StagiaireCV;
    private $Message;
    private $RequDate;

    public function __construct(int $Acc_id = null, string $StagiaireCV = null,
        string $Message = null, string $RequDate = null)
    {
        $this -> connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');

        if ($Acc_id && $StagiaireCV && $Message && $RequDate) {
            $this->Acc_id = $Acc_id;
            $this->StagiaireCV = $StagiaireCV;
            $this->Message = $Message;
            $this->RequDate = $RequDate;

            $insert = $this -> connect -> prepare("INSERT INTO Requests(Acc_id, StagiaireCV, Message, RequDate)
                VALUE (?, ?, ?, ?)");

            $insert -> execute([$this->Acc_id, $this->StagiaireCV, $this->Message, $this->RequDate]);
        }
    }

    public function GetAllRequests()
    {
        $req = $this->connect->prepare("SELECT Acc_id, Message, RequDate FROM requests");
        $req->execute();
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
        $rem = $this->connect->prepare("DELETE FROM requests WHERE Acc_id = $req_id");
        $rem->execute();
    }

    public function DeleteAllRequests()
    {
        $rem = $this->connect->prepare("DELETE FROM requests");
        $rem->execute();
    }

    public function ViewPdfFile(int $id)
    {
        $stmt = $this->connect->prepare("SELECT StagiaireCV FROM Requests WHERE Acc_id = $id");
        $stmt->execute();

        $pdfData = $stmt->fetchColumn();
        header("Content-type: application/pdf");
        header("Content-Length: " . strlen($pdfData));
        echo $pdfData;
    }

    public function DownoaldPdfFile(int $id)
    {
        $stmt = $this->connect->prepare("SELECT StagiaireCV FROM Requests WHERE Acc_id = $id");
        $stmt->execute();
        $file = $stmt->fetch(PDO::FETCH_ASSOC);

        header("Content-type: application/pdf");
        header("Content-Disposition: attachment; filename=" . (string) $id);
        header("Content-length: " . strlen($file['StagiaireCV']));

        echo $file['StagiaireCV'];
    }

    public function RemoveRequestsNotAccepte()
    {
        $stmt = $this->connect->prepare("CALL RemoveRequestsNotAccepte ();");
        $stmt->execute();

        return requestesaccepter::GetAcc_id();
    }

    public function CheckRequest(int $id)
    {
        $Check = $this -> connect -> prepare("SELECT $id IN (SELECT Acc_id FROM Requests) AS result;");
        $Check -> execute();

        $result = $Check -> fetch(PDO::FETCH_ASSOC);
        return $result['result'];
    }
}

class requestesaccepter
{
    private $connect;
    private int $Acc_id;
    private $RequDateAcc;


    public function __construct(int $Acc_id = null)
    {
        $this->connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        if ($Acc_id) {
            $this->RequDateAcc = date('Y-m-d');
            $this->Acc_id = $Acc_id;

            $insert = $this->connect->prepare("INSERT INTO requestesaccepter(Acc_id, RequDateAcc) VALUE(?, ?)");
            $insert->execute(array($this->Acc_id, $this->RequDateAcc));
        }
    }

    public static function GetAcc_id()
    {
        $conn = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        $Get = $conn->prepare("SELECT Acc_id FROM RequestesAccepter");
        $Get->execute();
        $response = [];

        foreach ($Get as $id) {
            array_push($response, $id['Acc_id']);
        }

        return $response;
    }

    public function GetData()
    {
        $data = $this->connect->prepare("SELECT Stagiaire_acc.*, Requests.Message, Requests.RequDate, RequestesAccepter.RequDateAcc FROM Stagiaire_acc INNER JOIN Requests ON Stagiaire_acc.Acc_id = Requests.Acc_id INNER JOIN RequestesAccepter ON Stagiaire_acc.Acc_id = RequestesAccepter.Acc_id");
        $data->execute();

        $response = [];

        foreach ($data as $data) {
            array_push($response, [
                'Acc_id' => $data['Acc_id'],
                'Fname' => $data['Fname'],
                'Lname' => $data['Lname'],
                'Domain' => $data['Domain'],
                '_Number' => $data['_Number'],
                'Acc_email' => $data['Acc_email'],
                'CIN' => $data['CIN'],
                '_Password' => $data['_Password'],
                'Message' => $data['Message'],
                'RequDate' => $data['RequDate'],
                'RequDateAcc' => $data['RequDateAcc']
            ]);
        }

        return $response;
    }

    public function RemoveAll()
    {
        $data = $this->connect->prepare("DELETE FROM RequestesAccepter");
        $data->execute();
    }

    public function RemoveSome(array $itemsId)
    {
        foreach ($itemsId as $id) {
            $rem = $this->connect->prepare("DELETE FROM RequestesAccepter WHERE Acc_id = $id");
            $rem->execute();
        };
    }

    public function DownoaldAllPdfFiles()
    {
        $stmt = $this->connect->query("SELECT StagiaireCV FROM Requests");
        $pdf_files = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($pdf_files as $pdf) {
            $file_path = "C:/Users/brahim\\ azirar/Desktop/CV" . $pdf['StagiaireCV'];

            header('Content-Type: application/pdf');
            header('Content-Disposition: attachment; filename="' . str_replace("\0", "", $pdf['StagiaireCV']) . '"');
            readfile($file_path);
        }
    }

    public static function SearchRequ(int $id)
    {
        $conn = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');
        $Sea = $conn -> prepare("SELECT ($id IN (SELECT Acc_id FROM requestesaccepter)) AS result;");
        $Sea -> execute();
    
        $result = $Sea->fetch(PDO::FETCH_ASSOC);
        return $result['result'];
    }
}

class Admin
{
    private $connect;
    private $FirstName;
    private $LastName;
    private $Thel;
    private $Email;
    private $Password;

    public function __construct(
        string $FirstName = null,
        string $LastName = null,
        string $Thel = null,
        string $Email = null,
        string $Password = null
    ) {
        $this->connect = new PDO("mysql:host=localhost:3306;dbname=airport;", 'root', '26022002');

        if ($FirstName && $LastName && $Thel && $Email && $Password) {
            $this->FirstName = $FirstName;
            $this->LastName = $LastName;
            $this->Thel = $Thel;
            $this->Email = $Email;
            $this->Password = $Password;

            $insert = $this->connect->prepare("INSERT INTO Admin_acc(Fname, Lname, Tele, Acc_email, _Password)
                    VALUE(?, ?, ?, ?, ?)");
            $insert->execute([$this->FirstName, $this->LastName, $this->Thel, $this->Email, $this->Password]);
        };
    }

    public function GetAdmin(int $id)
    {
        $admin = $this->connect->prepare("SELECT * FROM Admin_acc WHERE AdminId = $id");
        $admin->execute();

        $response = [];

        foreach ($admin as $value) {
            array_push($response, [
                'Fname' => $value['Fname'],
                'Lname' => $value['Lname'],
                'Tele' => $value['Tele'],
                'Acc_email' => $value['Acc_email'],
                '_Password' => $value['_Password']
            ]);
        };

        return $response[0];
    }

    public function UpdateAdmin(array $obj)
    {
        $update = $this->connect->prepare("UPDATE Admin_acc SET Fname = ?, Lname = ?,
                Tele = ?, Acc_email = ?, _Password = ? WHERE AdminId = ?");

        $update->execute($obj);
    }
}