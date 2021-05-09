<?php

namespace App;

use App\ArticleCategories;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    public $timestamps = false;

    protected $table = "articles";

    protected $fillable = [
        'id', 'article_category_id', 'title', 'content','date'
    ];

    public function articleCategory()
    {
        // class,fk it has, it owner key ==primary key of the table
        return $this->belongsTo(ArticleCategories::class, 'article_category_id', 'id');
    }

}
