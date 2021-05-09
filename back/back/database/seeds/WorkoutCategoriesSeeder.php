<?php

use Illuminate\Database\Seeder;

class WorkoutCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('workout_categories')->insert([
            [
                'name'     => 'workoutCat1',
                'image'     => 'image 1',
            ],
        ]);
    }
}
