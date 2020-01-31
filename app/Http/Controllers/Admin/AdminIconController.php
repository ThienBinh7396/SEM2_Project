<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use File;
use App\CategoryIcon;
use App\Icon;

class AdminIconController extends Controller
{
	public function index(Request $request)
	{
		return view('admin.icon')->with([
			'category' => CategoryIcon::all(),

		]);
	}
	public function add_category_icon(Request $request)
	{
		if ($request->ajax()) {
			
			$rs = CategoryIcon::create([
				'title' => $request->title,
				'icon'  => $request->url,
				'type'  => $request->type,
			]);

			return $rs;
		}
		return "faild";
	}
	public function edit_category_icon(Request $request)
	{
		if ($request->ajax()) {

			$oldCat = CategoryIcon::find($request->id);
			
			$oldCat->icon = $request->url; 
			$oldCat->title = $request->title;
			$oldCat->type  = $request->type;
			$oldCat->save();

			return $oldCat;
		}
		return "faild";
	}
	public function remove_category_icon(Request $request)
	{
		if ($request->ajax()) {
			$cat = CategoryIcon::find($request->id);
			File::Delete($cat->icon);
			$cat->delete();
			
			Icon::where('category_id', $request->id)->delete();
			return "done";  

		}
		return "faild";
	}
	public function add_icon(Request $request)
	{
		if ($request->ajax()) {
			$t = "";
			$time = time();
			if ($request->title != null) {
				$t = $request->title;	
			}
			if ($request->type == 'text') {
				preg_match_all('/./u', $request->content, $arr);
				$return_arr = [];
				foreach ($arr[0] as $value) {
					$icon = Icon::create([
						'title' => $t,
						'content' => urlencode($value),
						'category_id' => $request->cat_id,
					]);
					$return_arr[] = $icon;
				}
				return $return_arr;
			}else{
				$icon = Icon::create([
					'title' => $t,
					'content' => $request->url,
					'category_id' => $request->cat_id,
				]);
				return $icon;
			}

		}
	}
	public function update_amount(Request $request)
	{
		if ($request->ajax()) {
			DB::table('icon')
			->where('id', $request->id)
			->update([
				'amount' => $request->amount
			]);
			return "done";
		}
		return "faild";
	}
	public function get_icon(Request $request)
	{
		if ($request->ajax()) {
			$icon = DB::table('icon')
			->join('category_icon', 'icon.category_id', 'category_icon.id')
			->where('category_icon.id', $request->cat_id)
			->select('category_icon.type', 'icon.*')
			->get();
			return $icon;
		}
		return "faild";
	}
	public function tb_remove_icon(Request $request)
	{
		if ($request->ajax()) {
			if ($request->type == 'text') {
				Icon::find($request->id)->delete();

				return "done";
			}else{
				$icon = Icon::find($request->id);
				// File::Delete($icon->content);
				$icon->delete();

				return "done";
			}
		}
		return "faild";
	}
}
