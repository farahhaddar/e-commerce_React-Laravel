<?php

namespace App;

use App\Replies;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{

    protected $table = "comments";

    protected $fillable = [
        'id', 'user_id', 'comment', 'date',
    ];
    public $timestamps = false;
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function replies()
    {
        return $this->hasMany(Replies::class, 'comment_id', 'id');
    }

}
