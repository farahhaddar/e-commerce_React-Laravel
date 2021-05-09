<?php

use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('comments')->insert([
            [
                'user_id'     => '1',
                'comment'    => 'Comment 1',
            ],
            ]);
    }
}
