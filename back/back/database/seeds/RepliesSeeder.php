<?php

use Illuminate\Database\Seeder;

class RepliesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('replies')->insert([
            [
                'user_id'     => '1',
                'comment_id'     => '1',
                'reply'    => 'Reply 1',
            ],
        ]);
    }
}
