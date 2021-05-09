<?php

use Illuminate\Database\Seeder;

class ArticleCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('article_categories')->insert([
            [
                'name'     => 'name',
                'image'     => 'image1',
            ],
        ]);
    }
}
