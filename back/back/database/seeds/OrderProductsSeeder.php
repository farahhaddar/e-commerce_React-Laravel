<?php

use Illuminate\Database\Seeder;

class OrderProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('order_products')->insert([
            [
                'quantity'     => '1',
                'product_id'     => '1',
                'order_id'     => '1',
            ],
        ]);
    }
}
