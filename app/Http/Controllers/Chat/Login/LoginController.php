<?php

namespace App\Http\Controllers\Chat\Login;

use Cookie;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use DB;

class LoginController extends Controller
{
	public function check_exists(Request $request)
	{
		$response = DB::table('chatuser')
		->where('email', $request->check)
		->get();

		return $response;
	}
	public function register_user(Request $request)
	{
		if ($request->ajax()) {
			$pass = md5($request->password);
			DB::table('chatuser')->insert([
				'email'   => $request->email,
				'user' => $request->user,
				'password' => $pass
			]);
			return $request;
		}
		return "error";
	}
	public function login_user(Request $request)
	{
		if ($request->ajax()) {
			$pass = md5($request->password);
			$response = DB::table('chatuser')
			->where('email', $request->email)
			->where('password', $pass)
			->get();

			if (count($response)) {
				$minutes = 24*60*15;
				$rs = new Response();
				$rs->withCookie(cookie('chat', $response[0]->iduser, $minutes));
				return $rs;
			}
			return "error" ;
		}
		return "error";
	}
	public function update_id(Request $request)
	{
		if ($request->ajax()) {
			$response = DB::table('chatuser')
			->where('email', $request->email)
			->update(['uid' =>  $request->uid]);

			return "done";
		}
		return "error";
	}
	public function logout(Request $request)
	{
		return redirect('/')->withCookie(Cookie::forget('chat'));
	}
}
