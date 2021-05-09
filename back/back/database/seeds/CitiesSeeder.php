<?php

use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('cities')->insert([
            [
                'name'     => 'Beirut',
                'delivery_fees'     => '5000',
            ],
            [
                'name'     => 'Jbeil',
                'delivery_fees'     => '7000',
            ],
        ]);
    }
}
