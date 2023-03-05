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
        Schema::create('Requests', function (Blueprint $table) {
            // $table->id();

            // $table->unsignedBigInteger('Acc_id');
            $table->bigIncrements('Acc_id');
            $table->binary('StagiaireCV');
            $table->longText('Message');
            $table->date('RequDate');
            $table->foreign('Acc_id')->references('Acc_id')->on('Stagiaire_acc')->onDelete('cascade')->onUpdate('cascade');
            
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
        Schema::dropIfExists('Requests');
    }
};
