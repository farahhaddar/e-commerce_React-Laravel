<?php

namespace App;

use App\Orders;
use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    public $timestamps = false;

    protected $table = "cities";

    protected $fillable = [
        'id', 'name', 'delivery_fees',

    ];

    public function orders()
    {
        return $this->hasMany(Orders::class, 'city_id', 'id');
    }
    public function users()
    {
        return $this->hasMany(User::class, 'city_id', 'id');
    }


}
