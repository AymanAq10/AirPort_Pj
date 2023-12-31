<?php

use App\Models\Stagiaire_acc;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Intervention\Image\Facades\Image;

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

            $table->string('Fname', 20);
            $table->string('Lname', 20);
            $table->string('Domain', 20);
            $table->string('_Number', 13)->unique();
            $table->string('Acc_email');
            $table->string('CIN')->unique();
            $table->string('_Password');
            $table->longText('ImageProfile')->nullable();

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
