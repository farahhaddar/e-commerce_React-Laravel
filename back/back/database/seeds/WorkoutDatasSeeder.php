<?php

use Illuminate\Database\Seeder;

class WorkoutDatasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('workout_datas')->insert([
            [
                'workout_id'     => '1',
                'image'     => 'image1',
                'video'     => 'video1',
            ],
        ]);
    }
}
