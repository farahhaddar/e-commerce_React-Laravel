<?php

namespace App;

use App\Packages;
use App\ProductImages;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    public $timestamps = false;

    protected $table = "products";

    protected $fillable = [
        'id', 'name', 'price', 'product_category_id', 'description', 'quantity',
    ];

    public function packages()
    {
        return $this->belongsToMany(Packages::class, 'package_products', 'product_id', 'package_id');
    }
    public function productCategories()
    {
        return $this->belongsTo(ProductCategories::class, 'product_category_id', 'id');
    }
}
