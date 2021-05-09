<?php

use Illuminate\Database\Seeder;

class ArticlesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('articles')->insert([
            [
                'article_category_id'     => '1',
                'title'     => 'title',
                'content'     => 'content',
                'date'     => '1/1/2000',
            ],
        ]);
    }
}
