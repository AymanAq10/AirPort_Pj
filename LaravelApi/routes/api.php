<?php

use App\Models\Admin_acc;
use App\Models\Stagiaire_acc;
use App\Models\Requests;
use App\Models\RequestesAccepter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// -----------------------------------------------------------Clear Tables START
Route::delete('/stagires/clear', function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    Requests::truncate();
    RequestesAccepter::truncate();
    Stagiaire_acc::truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
});
// -----------------------------------------------------------Clear Tables END


// -----------------------------------------------------------Clear requestes START
Route::delete('/requestes/clear', function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    Requests::truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
});
// -----------------------------------------------------------Clear requestes END


// -----------------------------------------------------------Clear Requeste_accepter START
Route::delete('/Requeste_accepter/clear', function () {
    DB::statement('SET FOREIGN_KEY_CHECKS=0;');
    RequestesAccepter::truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1;');
});
// -----------------------------------------------------------Clear Requeste_accepter END



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Route::get('/Stagires/Image_tracker/{id}', function ($id) {
    $dataStag = Stagiaire_acc::find($id);
    if ($dataStag) {
        $imagePath = $dataStag->ImageProfile;
        // $imageData = file_get_contents($imagePath);
        // $base64 = base64_encode($imageData);
        // return response()->json($base64);
        return response()->json($imagePath);
    } else {
        return response()->json(false);
    }
});
// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// This belongs to requeste accepters _>
Route::get('/Requeste_accepters/download-cv', function () {
    $accepters = RequestesAccepter::all();
    $zip = new ZipArchive;
    $filename = 'CVs.zip';
    $i = 0;
    if ($zip->open(public_path($filename), ZipArchive::CREATE) === TRUE) {
        foreach ($accepters as $accepter) {
            $request = Requests::find($accepter->Acc_id);
            $path = storage_path('app/public/' . $request->StagiaireCV);
            $zip->addFile($path, $request->StagiaireCV);
            $i++;
        }
        $zip->close();
        return response()->download(public_path($filename))->deleteFileAfterSend(true);
    }
});
// This belongs to requeste accepters _>






// -----------------------------------------------------------Stagire START

Route::get('/Stagires', function () {
    $dataStag = Stagiaire_acc::get();
    return response()->json($dataStag);
});

Route::get('/Stagires/{id}', function ($id) {
    Stagiaire_acc::findOrFail($id);
    return response()->json(['success' => true], 200);
});

Route::get('/Stagires/track/{id}', function ($id) {
    $dataStag = Stagiaire_acc::find($id);
    if ($dataStag) {
        return response()->json($dataStag);
    }
    else{
        return response()->json(false);
    }
});



Route::post('/Stagires', function () {
    $existingStagiaireEmail = Stagiaire_acc::where('Acc_email', request('Acc_email'))->first();
    $existingStagiaireNumber = Stagiaire_acc::where('_Number', request('_Number'))->first();
    $existingStagiaireCIN = Stagiaire_acc::where('CIN', request('CIN'))->first();

    if ($existingStagiaireEmail) {
        return response()->json(['message' => 'Email already exists']);
    } elseif ($existingStagiaireNumber) {
        return response()->json(['message' => 'Number already exists']);
    } elseif ($existingStagiaireCIN) {
        return response()->json(['message' => 'CIN already exists']);
    } else {
        $data = Stagiaire_acc::create([
            'Fname'         => request('Fname'),
            'Lname'         => request('Lname'),
            'Domain'        => request('Domain'),
            '_Number'       => request('_Number'),
            'Acc_email'     => request('Acc_email'),
            'CIN'           => request('CIN'),
            '_Password'     => request('_Password'),
            'ImageProfile'  => request('ImageProfile')
        ]);
        $data->save();
        if (!$data) {
            return response()->json(['message' => 'Error creating account']);
        }

        $dataStag = Stagiaire_acc::where('Acc_email', request('Acc_email'))->first();

        return response()->json($dataStag->Acc_id, 200);
    }
});

Route::put('/Stagires/{id}', function ($id) {
    $data = request()->all();
    $dataStag = Stagiaire_acc::where('Acc_id', '=', $id)->update(
        [
            'Fname'         => $data[0]['FirstName'],
            'Lname'         => $data[0]['LastName'],
            'Domain'        => $data[0]['Domain'],
            '_Number'       => $data[0]['Number'],
            'Acc_email'     => $data[0]['Email'],
            'CIN'           => $data[0]['CIN'],
            'ImageProfile'  => $data[0]['Profile'],
            '_Password'     => $data[0]['conPassword'],
        ]
    );

    return response()->json($dataStag, 200);
});


Route::delete('/Stagires/{stagire}', function (Stagiaire_acc $stagire) {
    $success = $stagire->delete();

    return response()->json($success, 200);
});


Route::delete('/Multi-Stagiaire_acc', function (Request $request) {
    $ids = json_decode($request->input('ItemsId'));

    foreach ($ids as $id) {
        $dataReqAcc = Stagiaire_acc::where('Acc_id', $id)->delete();
    }

    return response()->json($dataReqAcc, 200);
});

// -----------------------------------------------------------Stagire END

// ------------------------------- Stagiaire innerjoin requests START
Route::get('/Stagires/Requestes/Finder/{id}', function ($id) {

    $data = Stagiaire_acc::find($id);
    $Requests = $data->Requests;
    if ($Requests) {
        return response()->json(['success' => true]);
    }
    else{
        return response()->json(['success' => false]);
    };

});
// ------------------------------- Stagiaire innerjoin requests END


// -----------------------------------------------------------Requeste START

Route::get('/Requestes', function () {
    $dataReq = Requests::all();
    return response()->json($dataReq);
});

Route::get('/Requestes/{id}', function ($id) {
    $dataReq = Requests::findOrFail($id);
    return response()->json($dataReq);
});
Route::get('/Requestes/V-CV/{id}', function ($id) {
    $dataReq = Requests::find($id);
    $path = storage_path('app/public/' . $dataReq->StagiaireCV);
    
    return response()->file($path);
});


Route::post('/Requestes', function (Request $request) {
    ini_set('upload_max_filesize', '10M');
    ini_set('post_max_size', '10M');
    $dataReq = Requests::create([
        'Acc_id'        =>  $request->input('Acc_id'),
        'Message'       => $request->input('Message'),
        'StagiaireCV'   => $request->file('StagiaireCV')->store('cv', 'public'),
        'RequDate'      => date('Y-m-d'),
    ]);

    return response()->json(['success' => true, 200]);
});

Route::put('/Requestes/{id}', function ($id) {
    $dataReq = Requests::where('Acc_id', '=', $id)->update(
        [
            'Acc_id'      => request('Acc_id'),
            'StagiaireCV' => request('StagiaireCV'),
            'Message'     => request('Message'),
            'RequDate'    => request('RequDate'),
        ]
    );

    return response()->json($dataReq, 200);
});


Route::delete('/Requestes/{requeste}', function (Requests $requeste) {
    $success = $requeste->delete();

    return response()->json($success, 200);
});

Route::delete('/Multi-Requestes', function (Request $request) {
    $ids = $request->input('multiRequestDelete');

    foreach ($ids as $id) {
        $dataReqAcc = Requests::where('Acc_id', $id)->delete();
    }

    return response()->json($dataReqAcc, 200);
});


// -----------------------------------------------------------Requeste END


// -----------------------------------------------------------Requeste_accepters START


Route::get('/Requeste_accepters', function () {
    $data = DB::select('SELECT Stagiaire_acc.*, Requests.Message, Requests.RequDate, RequestesAccepter.RequDateAcc FROM Stagiaire_acc INNER JOIN Requests ON Stagiaire_acc.Acc_id = Requests.Acc_id INNER JOIN RequestesAccepter ON Stagiaire_acc.Acc_id = RequestesAccepter.Acc_id');
    // $dataReqAcc = RequestesAccepter::all();
    return response()->json($data);
});


Route::get('/Requeste_accepters/{id}', function ($id) {
    $dataReqAcc = RequestesAccepter::findOrFail($id);
    return response()->json($dataReqAcc);
});

Route::delete('/Requestes_accepter', function (Request $request) {

    $ids = $request->input('ItemsId');

    foreach ($ids as $id) {
        if (!RequestesAccepter::find($id)) {
            $dataReqAcc = RequestesAccepter::create(
                [
                    'Acc_id'      => $id,
                    'RequDateAcc' => date('Y-m-d'),
                ]
            );
        }
    }

    return response()->json($dataReqAcc, 200);
});


Route::put('/Requeste_accepters/{id}', function ($id) {
    $dataReqAcc = RequestesAccepter::where('Acc_id', '=', $id)->update(
        [
            'Acc_id'      => request('Acc_id'),
            'RequDateAcc' => date('Y-m-d'),
        ]
    );

    return response()->json($dataReqAcc, 200);
});

Route::delete('/Requeste_accepters/{Requeste_accepter}', function (RequestesAccepter $Requeste_accepter) {
    $success = $Requeste_accepter->delete();

    return response()->json($success, 200);
});


Route::delete('/Multi-Requestes-acc', function (Request $request) {
    $ids = $request->input('ItemId');

    foreach ($ids as $id) {
        $dataReqAcc = RequestesAccepter::where('Acc_id', $id)->delete();
    }

    return response()->json($dataReqAcc, 200);
});


Route :: delete('/RemoveRequestNotAccepte', function ()
{
    $variable = DB::select("CALL RemoveRequestsNotAccepte ()");
    $data = '';
    return response()->json($variable, 200);
});


// -----------------------------------------------------------Requeste_accepters END

// -----------------------------------------------------------Admin START

Route::get('/Admins', function () {
    $dataAdmin = Admin_acc::all();
    return response()->json($dataAdmin);
});

Route::get('/Admins/{id}', function ($id) {
    $data = Admin_acc::findOrFail($id);
    return response()->json([$data->Fname, $data->Lname]);
});

Route::get('/Admin-D/{id}', function ($id) {
    $data = Admin_acc::findOrFail($id);
    $data = [
        'Fname'     =>$data->Fname,
        'Lname'     =>$data->Lname,
        'Acc_email' =>$data->Email,
        'Tele'      =>$data->Tele,
        '_Password' =>$data->password,
    ];
    return response()->json($data);
});

Route::post('/Admins', function () {
    $data = request()->all();
    $firstAdmin = $data[0];
    $checker = Admin_acc::where('Email', $firstAdmin['Email'])->first();
    
    if ($checker) {
        return response()->json(['success' => false]);
    }
    else{
        Admin_acc::create([
            'Fname'    => $firstAdmin['Fname'],
            'Lname'    => $firstAdmin['Lname'],
            'Email'    => $firstAdmin['Email'],
            'Tele'     => $firstAdmin['Tele'],
            'password' => $firstAdmin['password'],
        ]);
        return response()->json(['success' => true]);
    }
});

Route::put('/Admins/{id}', function ($id) {
    $data = request()->all();

    Admin_acc::where('AdminId', $id)->update(
        [
            'Fname'    => $data[0]['Fname'],
            'Lname'    => $data[0]['Lname'],
            'Email'    => $data[0]['Email'],
            'Tele'     => $data[0]['Tele'],
            'password' => $data[0]['password'],
        ]
    );
    
    return response()->json(['success' => true], 200);  
    
    
});


Route::delete('/Admins/{Admin}', function (Admin_acc $Admin) {
    $success = $Admin->delete();

    return response()->json($success, 200);
});

// -----------------------------------------------------------Admin END


// -----------------------------------------------------------Login-Checker START 
Route::post('/Authentification', function (Request $request) {
    
    $stagire = Stagiaire_acc::where('Acc_email', $request->input('Email'))
        ->where('_Password', $request->input('Password'))
        ->first();

    $admin = Admin_acc::where('Email', $request->input('Email'))
        ->where('password', $request->input('Password'))
        ->first();

    if ($admin) {
        return response()->json(['Admin' , $admin->AdminId]);
    } elseif ($stagire) {
        return response()->json(['Stagiaire' , $stagire->Acc_id]);
    } else {
        return response()->json(['success' => false]);
    }
});
// -----------------------------------------------------------Login-Checker END 