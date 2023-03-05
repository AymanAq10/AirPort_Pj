<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/adding/dio', function() {
    DB::table('stagires')->insert([
        'Fname' => 'Dio',
        'Lname' => 'Brando',
        'Domain' => 'Vampire',
        '_Number' => '4524352',
        'Acc_email' => 'zawarudo@time.stop',
        'CIN' => 'ch214068',
        '_Password' => 'BvvxEVhrZm6'
    ]);

    return response('added', 200);
});