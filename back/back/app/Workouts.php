<?php

namespace App;

use App\WorkoutCategories;
use App\WorkoutDatas;
use Illuminate\Database\Eloquent\Model;

class Workouts extends Model
{
    public $timestamps = false;

    protected $table = "workouts";

    protected $fillable = [
        'id', 'workout_category_id', 'title',
    ];

    public function data()
    {
        return $this->hasMany(WorkoutDatas::class, 'workout_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(WorkoutCategories::class, 'workout_category_id', 'id');
    }

}
