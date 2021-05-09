<?php

namespace App;
use App\Products;
use App\User;
use Illuminate\Database\Eloquent\Model;

class CartProducts extends Model
{
    public $timestamps = false;
    
    protected $table = "cart_products";
    
    protected $fillable = [
        'id', 'user_id', 'product_id','quantity',
    ];

    public function products()
    {
        return $this->belongsTo(products::class, 'product_id', 'id');
    }
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
