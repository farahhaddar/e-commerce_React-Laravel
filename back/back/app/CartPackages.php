<?php

namespace App;
use App\Packages;
use App\User;
use Illuminate\Database\Eloquent\Model;

class CartPackages extends Model
{
    //
    public $timestamps = false;
    
    protected $table = "cart_packages";
    
    protected $fillable = [
        'id', 'user_id', 'package_id','quantity',
    ];

    public function packages()
    {
        return $this->belongsTo(Packages::class, 'package_id', 'id');
    }
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
