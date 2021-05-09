<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Testimonials extends Model
{
    public $timestamps = false;

    protected $table = "testimonials";

    protected $fillable = [
        'id','name','image','content',
    ];

}
