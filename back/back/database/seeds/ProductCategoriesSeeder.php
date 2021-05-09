<?php

use Illuminate\Database\Seeder;

class ProductCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('product_categories')->insert([
            [
                'name'     => 'productCat1', 
            ],
            [
                'name'     => 'productCat2',
            ],
            [
                'name'     => 'productCat3',
            ],
        
    
            ]);
    }
}
