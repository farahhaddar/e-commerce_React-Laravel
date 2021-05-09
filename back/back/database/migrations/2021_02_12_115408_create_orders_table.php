<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('date')->nullable();
            $table->string('address');
            $table->string('comment')->nullable();
            $table->float('price');
            $table->bigInteger('city_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->string('name');
            $table->integer('status')->nullable();
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
