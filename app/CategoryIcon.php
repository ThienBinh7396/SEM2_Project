<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryIcon extends Model
{
    protected $table = "category_icon";
	public $timestamps = false;
	protected $fillable = ['title', 'icon', 'type'];
}
