<?php

namespace App;
use App\Products;
use Illuminate\Database\Eloquent\Model;

class ProductCategories extends Model
{
    public $timestamps = false;

    protected $table = "product_categories";

    protected $fillable = [
        'id', 'name',
    ];

    public function products(){
        return $this->hasMany(Products::class,"product_category_id","id");
    }

}
