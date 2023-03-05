<?php

use App\Models\Admin_acc;
use App\Models\Stagiaire_acc;
use App\Models\Requests;
use App\Models\RequestesAccepter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

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














// -----------------------------------------------------------Stagire START

Route::get('/Stagires', function () {
    $dataStag = Stagiaire_acc::get();
    return response()->json($dataStag);
});

Route::get('/Stagires/{id}', function ($id) {
    $dataStag = Stagiaire_acc::findOrFail($id);
    return response()->json($dataStag);
});

Route::post('/Stagires', function () {

    $dataStag = Stagiaire_acc::create([
        'Fname'     => request('Fname'),
        'Lname'     => request('Lname'),
        'Domain'    => request('Domain'),
        '_Number'   => request('_Number'),
        'Acc_email' => request('Acc_email'),
        'CIN'       => request('CIN'),
        '_Password' => request('_Password'),
    ]);

    return response()->json($dataStag, 200);
});

Route::put('/Stagires/{id}', function ($id) {
    $dataStag = Stagiaire_acc::where('Acc_id', '=', $id)->update(
        [
            'Fname'     => request('Fname'),
            'Lname'     => request('Lname'),
            'Domain'    => request('Domain'),
            '_Number'   => request('_Number'),
            'Acc_email' => request('Acc_email'),
            'CIN'       => request('CIN'),
            '_Password' => request('_Password'),
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


// -----------------------------------------------------------Requeste START

Route::get('/Requestes', function () {
    $dataReq = Requests::all();
    return response()->json($dataReq);
});

Route::get('/Requestes/{id}', function ($id) {
    $dataReq = Requests::findOrFail($id);
    return response()->json($dataReq);
});

Route::post('/Requestes', function () {
    $dataReq = Requests::create(
        [
            'Acc_id'      => request('Acc_id'),
            'StagiaireCV' => request('StagiaireCV'),
            'Message'     => request('Message'),
            'RequDate'    => request('RequDate'),
        ]
    );

    return response()->json($dataReq, 200);
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
        $dataReqAcc = RequestesAccepter::create(
            [
                'Acc_id'      => $id,
                'RequDateAcc' => date('Y-m-d'),
            ]
        );
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
    $dataAdmin = Admin_acc::findOrFail($id);
    return response()->json($dataAdmin);
});

Route::post('/Admins', function () {
    $dataAdmin = Admin_acc::create(
        [
            'Fname'    => request('Fname'),
            'Lname'    => request('Lname'),
            'Email'    => request('Email'),
            'Tele'     => request('Tele'),
            'password' => request('password'),
        ]
    );

    return response()->json($dataAdmin);
});

Route::put('/Admins/{id}', function ($id) {
    $dataAdmin = Admin_acc::where('Acc_id', '=', $id)->update(
        [
            'Fname'    => request('Fname'),
            'Lname'    => request('Lname'),
            'Email'    => request('Email'),
            'Tele'     => request('Tele'),
            'password' => request('password'),
        ]
    );

    return response()->json($dataAdmin, 200);
});


Route::delete('/Admins/{Admin}', function (Admin_acc $Admin) {
    $success = $Admin->delete();

    return response()->json($success, 200);
});

// -----------------------------------------------------------Admin END


// -----------------------------------------------------------Login-Checker START 
Route::post('/Authentification', function (Request $request) {
    $stagire = Stagiaire_acc::where('Acc_email', $request->input('email'))
        ->where('_Password', $request->input('password'))
        ->first();

    $admin = Admin_acc::where('Email', $request->input('email'))
        ->where('password', $request->input('password'))
        ->first();

    if ($stagire) {
        return response()->json(['success' => $stagire]);
    } elseif ($admin) {
        return response()->json(['success' => true]);
    } else {
        return response()->json(['success' => false]);
    }
});
// -----------------------------------------------------------Login-Checker END 
