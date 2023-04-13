<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Stagiaire_acc;

class Requests extends Model
{
    use HasFactory;

    public function Stagiaire_acc(){
        return $this->belongsTo(Stagiaire_acc::class);
    }

    protected $table = 'Requests';
    protected $primaryKey  = 'Acc_id';

    protected $fillable = [
        'Acc_id',
        'StagiaireCV',
        'Message',
        'RequDate'
    ];
}
