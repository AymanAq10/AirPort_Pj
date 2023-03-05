<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requests extends Model
{
    use HasFactory;

    // public function Stagire(){
    //     return $this->belongsTo(Stagire::class);
    // }

    protected $table = 'Requests';
    protected $primaryKey  = 'Acc_id';

    protected $fillable = [
        'Acc_id',
        'StagiaireCV',
        'Message',
        'RequDate'
    ];
}
