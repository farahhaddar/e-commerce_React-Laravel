<?php

namespace App;
use App\Packages;
use Illuminate\Database\Eloquent\Model;

class OrderPackages extends Model
{
    public $timestamps = false;

    protected $table = "order_packages";

    protected $fillable = [

        'id', 'quantity', 'package_id', 'order_id',
    ];
    public function packages()
    {
        return $this->belongsTo(Packages::class,'package_id', 'id');
    }

}
