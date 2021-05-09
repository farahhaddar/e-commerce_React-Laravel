<?php

namespace App;

use App\PackageProducts;
use Illuminate\Database\Eloquent\Model;

class PackageProducts extends Model
{
    public $timestamps = false;

    protected $table = "package_products";

    protected $fillable = [
        'id', 'quantity', 'package_id', 'product_id',
    ];

}
