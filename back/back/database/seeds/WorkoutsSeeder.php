<?php

use Illuminate\Database\Seeder;

class WorkoutsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('workouts')->insert([
            [
                'workout_category_id'     => '1',
                'title'     => 'Title 1',
            ],
        ]);
    }
}
