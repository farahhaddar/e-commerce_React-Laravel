<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('products')->insert([
        [
            'name'     => 'product1',
            'image'     => 'image1',
            'price'     => '50000',
            'product_category_id'     => '1',
            'description'     => 'description',
            'quantity'     => '30',
        ],
        ]);
    }
}
