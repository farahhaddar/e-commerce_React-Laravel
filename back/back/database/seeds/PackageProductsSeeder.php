<?php

use Illuminate\Database\Seeder;

class PackageProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('package_products')->insert([
            [
                'quantity'     => '1',
                'package_id'     => '1',
                'product_id'     => '1',
            ],
        ]);
    }
}
