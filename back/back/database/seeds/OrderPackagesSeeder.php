<?php

use Illuminate\Database\Seeder;

class OrderPackagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('order_packages')->insert([
            [
                'quantity'     => '30',
                'package_id'     => '1',
                'order_id'     => '1',
            ],
        ]);
    }
}
