<?php

namespace App;

use App\Workouts;
use Illuminate\Database\Eloquent\Model;

class WorkoutDatas extends Model
{
    public $timestamps = false;

    protected $table = "workout_datas";

    protected $fillable = [
        'id', 'workout_id', 'image','video','title'
    ];

    public function workout()
    {
        return $this->belongsTo(Workouts::class, 'workout_id', 'id');
    }

}
