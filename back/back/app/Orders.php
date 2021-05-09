<?php

namespace App;

use App\User;
use App\Cities;
use App\Products;
use App\Packages;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    public $timestamps = false;

    protected $table = "orders";

    protected $fillable = [
        'id','date', 'address', 'comment', 'price', 'city_id', 'user_id','name'
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class, 'order_products', 'order_id', 'product_id');
    }

    public function packages()
    {
        return $this->belongsToMany(Packages::class, 'order_packages', 'order_id', 'package_id');
    }

    public function city()
    {
        return $this->belongsTo(Cities::class, 'city_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }


}
