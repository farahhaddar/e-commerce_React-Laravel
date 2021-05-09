<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderPackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_packages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('quantity');
            $table->bigInteger('package_id')->unsigned();
            $table->bigInteger('order_id')->unsigned();
            $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->unique(['package_id', 'order_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_packages');
    }
}
