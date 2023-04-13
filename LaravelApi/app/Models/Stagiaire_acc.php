<?php

namespace App\Models;

use App\Models\Requests;
use App\Models\RequestesAccepter;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stagiaire_acc extends Model
{
    use HasFactory;

    protected $table = 'Stagiaire_acc';
    protected $primaryKey = 'Acc_id';

    public function Requests(){
        return $this->hasOne(Requests::class, 'Acc_id');
    }

    public function RequestesAccepter(){
        return $this->hasOne(RequestesAccepter::class, 'Acc_id');
    }
    
    protected $fillable = [
        'Fname',
        'Lname',
        'Domain',
        '_Number',
        'Acc_email',
        'CIN',
        '_Password',
        'ImageProfile'
    ];
    
    // protected $hidden = ['_Password'];

}
