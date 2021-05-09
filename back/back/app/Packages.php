<?php

namespace App;

use App\Products;
use Illuminate\Database\Eloquent\Model;

class Packages extends Model
{
    public $timestamps = false;

    protected $table = "packages";

    protected $fillable = [
        'id', 'name', 'price','quantity','description'
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'package_products', 'package_id', 'product_id')->withPivot('quantity');
    }
    

}
