<?php

namespace App;
use App\Products;
use Illuminate\Database\Eloquent\Model;

class OrderProducts extends Model
{
    public $timestamps = false;

    protected $table = "order_products";

    protected $fillable = [
        'id', 'quantity', 'product_id', 'order_id',

    ];
    public function products()
    {
        return $this->belongsTo(Products::class,'product_id', 'id');
    }

}
