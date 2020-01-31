<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
	protected $table = "message";
	public $timestamps = false;
	protected $fillable = ['id_from', 'id_to', 'content', 'time'];
}
