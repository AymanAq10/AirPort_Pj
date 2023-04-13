<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestesAccepter extends Model
{
    use HasFactory;
    
    public function Stagiaire_acc(){
        return $this->belongsTo(Stagiaire_acc::class);
    }

    protected $table = 'RequestesAccepter';
    protected $primaryKey  = 'Acc_id';
    
    protected $fillable = [
        'Acc_id',
        'RequDateAcc',
    ];
}
