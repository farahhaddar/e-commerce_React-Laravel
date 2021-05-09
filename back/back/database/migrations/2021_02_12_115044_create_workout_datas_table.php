<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkoutDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workout_datas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('workout_id')->unsigned();
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->foreign('workout_id')->references('id')->on('workouts')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workout_datas');
    }
}
