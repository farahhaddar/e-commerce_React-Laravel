<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackageProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('package_products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('quantity');
            $table->bigInteger('package_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->foreign('package_id')->references('id')->on('packages')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->unique(['package_id', 'product_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('package_products');
    }
}
