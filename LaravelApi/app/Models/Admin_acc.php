<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin_acc extends Model
{
    use HasFactory;


    protected $table = 'Admin_acc';
    protected $primaryKey = 'AdminId';

    protected $fillable = [
        'Fname',
        'Lname',
        'Email',
        'Tele',
        'password',
    ];
    // protected $hidden = ['password'];

}
