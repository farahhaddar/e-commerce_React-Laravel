<?php

namespace App;

use App\Comments;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Replies extends Model
{
    public $timestamps = false;

    protected $table = "replies";

    protected $fillable = [
        'id', 'comment_id', 'user_id', 'reply', 'date',
    ];

    public function comments()
    {
        // class,fk it has, it owner key ==primary key of the table
        return $this->belongsTo(Comments::class, 'comment_id', 'id');

    }

    public function users()
    {
        // class,fk it has, it owner key ==primary key of the table
        return $this->belongsTo(User::class, 'user_id', 'id');

    }

}
