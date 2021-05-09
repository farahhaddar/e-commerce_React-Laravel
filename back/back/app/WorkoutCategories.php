<?php

namespace App;

use App\Workouts;
use Illuminate\Database\Eloquent\Model;

class WorkoutCategories extends Model
{
    public $timestamps = false;

    protected $table = "workout_categories";

    protected $fillable = [
        'id', 'name', 'image',
    ];

    public function workout()
    {
        return $this->hasMany(Workouts::class, 'workout_category_id', 'id');
    }

}
