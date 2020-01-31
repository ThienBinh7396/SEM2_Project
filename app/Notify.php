<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notify extends Model
{
    protected $table = "notify";
    public $timestamps = false;
    protected $fillable = ['id_user', 'type', 'content', 'created_at'];
}
