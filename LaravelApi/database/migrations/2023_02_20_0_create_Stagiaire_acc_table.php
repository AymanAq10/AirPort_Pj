<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Stagiaire_acc', function (Blueprint $table) {
            $table->bigIncrements('Acc_id');

            $table->string('Fname');
            $table->string('Lname');
            $table->string('Domain');
            $table->string('_Number')->unique();
            $table->string('Acc_email');
            $table->string('CIN')->unique();
            $table->string('_Password');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Stagiaire_acc');
    }
};
