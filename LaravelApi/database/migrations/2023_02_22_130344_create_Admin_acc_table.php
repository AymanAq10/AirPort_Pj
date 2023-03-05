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
        Schema::create('Admin_acc', function (Blueprint $table) {
            // $table->id();
            $table->bigIncrements('AdminId');
            $table->string('Fname');
            $table->string('Lname');
            $table->string('Email');
            $table->string('Tele');
            $table->string('password');
            
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
        Schema::dropIfExists('Admin_acc');
    }
};
