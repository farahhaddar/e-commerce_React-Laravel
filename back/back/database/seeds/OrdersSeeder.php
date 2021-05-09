<?php

use Illuminate\Database\Seeder;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('orders')->insert([
            [
                'address'     => 'Beirut location',
                'comment'     => 'Comment',
                'price'     => '50000',
                'city_id'     => '1',
                'user_id'     => '1',
                'name'     => 'name',
            ],
        ]);
    }
}
