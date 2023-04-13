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
            $table->string('Fname', 20);
            $table->string('Lname', 20);
            $table->string('Email', 30)->unique();
            $table->string('Tele', 13);
            $table->string('password', 20);
            
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
