<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Icon extends Model
{
    protected $table = "icon";
	public $timestamps = false;
	protected $fillable = ['title', 'content', 'category_id'];
}
