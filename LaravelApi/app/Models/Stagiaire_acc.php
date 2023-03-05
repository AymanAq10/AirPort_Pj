<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stagiaire_acc extends Model
{
    use HasFactory;

    protected $table = 'Stagiaire_acc';
    protected $primaryKey = 'Acc_id';

    // public function Requeste(){
    //     return $this->hasOne(Requeste::class);
    // }

    // public function Requeste_accepters(){
    //     return $this->hasOne(Requeste_accepter::class);
    // }
    
    protected $fillable = [
        'Fname',
        'Lname',
        'Domain',
        '_Number',
        'Acc_email',
        'CIN',
        '_Password'
    ];
}
