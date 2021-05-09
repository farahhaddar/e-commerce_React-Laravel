<?php

use Illuminate\Database\Seeder;

class PackagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('packages')->insert([
            [
                'image'     => 'image1',
                'name'     => 'name',
                'price'     => '50000',
            ],
        ]);
    }
}
