<?php

namespace App;

use App\Articles;
use Illuminate\Database\Eloquent\Model;

class ArticleCategories extends Model
{
    public $timestamps = false;

    protected $table = "article_categories";

    protected $fillable = [
        'id', 'name', 'image',
    ];

    public function articles()
    {
        // class,fk of second ,localkey
        return $this->hasMany(Articles::class, 'article_category_id', 'id');
    }

}
