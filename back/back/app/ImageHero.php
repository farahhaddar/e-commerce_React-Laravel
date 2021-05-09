<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImageHero extends Model
{

    public $timestamps = false;

    protected $table = "image_heroes";

    protected $fillable = [
        'id', 'image'
    ];


}
