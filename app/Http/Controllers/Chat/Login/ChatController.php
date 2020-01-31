<?php

namespace App\Http\Controllers\Chat\Login;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;	
use File;
use App\Chat_User;
use App\Message;
use App\Events\RedisEvent;
use App\Notify;
use App\Events\NotifyEvent;
use App\CategoryIcon;
use App\Icon;

class ChatController extends Controller
{
	public function index(Request $request)
	{
		$rs = DB::table('chatuser')
		->where('iduser', $request->cookie('chat'))
		->get();

		

		return view('chathub.index')->with([
			'user' => $rs,
		]);
	}
	public function update(Request $request)
	{
		if ($request->ajax()) {
			$dt = $request->data;

			if ($dt == "") {
				$dt = null;
			}
			$response = DB::table('chatuser')
			->where('iduser', $request->cookie('chat'))
			->update([
				$request->field => $dt
			]);
			return $request->data;
		}
		return "";
	}
	public function update_full(Request $request)
	{
		if ($request->ajax()) {
			$error = [];
			if (strlen($request->user) < 6) {
				$error[] = 'Name must be at least 6 characters';
			}
			if ($request->change_password == 'false') {
				$rs = Chat_User::where('iduser', $request->cookie('chat'))
				->update([
					'user' => $request->user,
					'address' => $request->address,
					'gender' => $request->gender,
					'about_you' => $request->about,
					'birthday' => $request->birthday,
				]);
				return $error;
			}else{
				$user = Chat_User::where('iduser', $request->cookie('chat'))->get();
				$password = "";
				if (md5($request->old_password) != $user[0]->password) {
					$error[] = 'Existing password incorrect';
					$password = $user[0]->password;	
				}else{
					if (strlen($request->new_password) < 6) {
						$error[] = 'New password must be at least 6 characters';
						$password = $user[0]->password;	
					}else{
						$password = md5($request->new_password);
					}	
				}

				Chat_User::where('iduser', $request->cookie('chat'))
				->update([
					'user' => $request->user,
					'address' => $request->address,
					'gender' => $request->gender,
					'about_you' => $request->about,
					'password' => $password,
				]);
				return $error;
			}
		}
		return "";
	}
	public function load_user(Request $request)
	{
		$rs = DB::table('chatuser')
		->where('iduser', $request->cookie('chat'))
		->get();

		$rs_post = DB::table('post_user')
		->where('iduser', $request->cookie('chat'))
		->orderByRaw('time DESC')	
		->get();

		return view('chathub.profile_user')->with([
			'user' => $rs[0],
			'post' => $rs_post
		]);		
	}
	public function file_delete(Request $request)
	{
		File::Delete('uploads/avatar/avatar.jpg');
		return "xxx";
	}
	public function upload_image(Request $request)
	{
		if ($request->ajax()) {
			if ($request->hasFile('image')) {
				
				$file = $request->file('image');
				$extensionFile = strtolower($file->getClientOriginalExtension('file'));
				if (preg_match("/(png$)|(jpg$)|(jpeg$)|(ico$)|(gif$)/", $extensionFile)) {
					$fileName = $file->getClientOriginalName('file');
					$file->move('uploads/post_image',$fileName);
					return "done";
				}
			}
		}
		return "";
	}
	public function post_new(Request $request)
	{
		if ($request->ajax()) {
			$response = DB::table('post_user')
			->insert([
				'iduser' => $request->cookie('chat'),
				'time'   => $request->current_time, 
				'content'=> $request->content
			]);
			return "done";
		}
		return "";
	}

	public function message_view(Request $request)
	{
		$user = Chat_User::where('iduser', $request->cookie('chat'))->get();

		$friend = DB::table('friend')
		->join('chatuser', 'chatuser.iduser', 'friend.idfriend')
		->where('friend.id_user', $request->cookie('chat'))
		->where('approved', 1)
		->select('friend.idfriend', 'chatuser.avatar', 'chatuser.iduser', 'chatuser.user')
		->get();

		$last_message = (object)['property' => []];
		foreach ($friend as $value) {
			$last = DB::table('message')
			->where('id_to', $request->cookie('chat'))
			->where('id_from', $value->iduser)
			->orderBy('time', 'desc')
			->limit(1)
			->get();

			$last_message->property[] = $last;
		}

		$wait_request = DB::table('friend')
		->where('id_user', $request->cookie('chat'))
		->where('approved', 0)
		->get();

		$tb_wait_request = [];

		foreach ($wait_request as $value) {
			$tb_wait_request[] = $value->idfriend;
		}

		$tb_notify_request_friend = DB::table('notify')
		->where('type', 'request_friend')
		->where('id_user', $request->cookie('chat'))
		->join('chatuser', 'chatuser.iduser', '=', 'notify.content')
		->select('chatuser.iduser', 'chatuser.avatar', 'chatuser.user')
		->get();

		$tb_notify_all = DB::table('notify')
		->where('type', 'poke_friend')
		->where('id_user', $request->cookie('chat'))
		->join('chatuser', 'chatuser.iduser', '=', 'notify.content')
		->orderBy('notify.created_at', 'desc')
		->select('chatuser.iduser', 'chatuser.avatar', 'chatuser.user', 'notify.id','notify.type', 'notify.created_at')
		->get();	

		$tb_emotion = CategoryIcon::where('type', 'text')->get();

		$tb_sticker = CategoryIcon::where('type', '!=','text')->get();

		return view('chathub.message')->with([
			'user' => $user, 
			'friend' => $friend,
			'last_message' => $last_message,
			'wait_request' => $tb_wait_request,
			'tb_notify_request_friend' => $tb_notify_request_friend,
			'tb_notify_all' => $tb_notify_all,
			'tb_emotion'  => $tb_emotion,
			'tb_sticker' => $tb_sticker,
		]);
	}

	public function ajax_load_message(Request $request)
	{
		if ($request->id != 'new') {
			
			$id =  base64_decode($request->id);	

			$current_contact_friend = DB::table('chatuser')
			->where('uid', $id)
			->get();

			$user = DB::table('chatuser')
			->where('iduser', $request->cookie('chat'))
			->select('iduser', 'avatar', 'user')
			->get();

			

			return view('chathub.contact_to_friend')->with([
				'current_contact_friend' => $current_contact_friend[0],
				'user' => $user,
			]);
		}
	}
	public function ajax_load_room(Request $request)
	{
		if ($request->id != 'new') {
			return view('chathub.contact_room')->with([
				'id' => $request->id,
				'role' => $request->role,
				'name' => $request->name,
				'thumbnail' => $request->thumbnail,
				'time' => $request->time,
			]);
		}
	}
	public function post_message(Request $request)
	{
		if ($request->ajax()) {
			$messages = Message::create([
				'id_from' => $request->cookie('chat'),
				'id_to' => base64_decode($request->id_friend),
				'content' =>  $request->content,
				'time'    => $request->time,
			]);

			$id = Message::where('id_from' , $request->cookie('chat'))
			->where('id_to' , base64_decode($request->id_friend))
			->where('content' ,  $request->content)
			->where('time'    , $request->time)
			->get();

			event(
				$e = new RedisEvent($messages)
			);
			return $id[0]->id;
		}
		return "faild";
	}

	public function search_user(Request $request)
	{
		if ($request->ajax()) {
			if ($request->field == 'name') {
				$user = Chat_User::where('user', 'like', '%'.$request->like.'%')->get();
			}

			if ($request->field == 'id') {
				$user = Chat_User::where('iduser', base64_decode($request->like))->get();
			}

			if ($request->field == 'uid') {
				$user = Chat_User::where('uid', base64_decode($request->like))->get();
			}
			return $user;
		}
		return "faild";
	}
	public function search_friend(Request $request)
	{
		if ($request->ajax()) {
			$user = DB::select(DB::raw("select * from chatuser ".$request->queryF));
			return $user;
		}
		return "Faild";	
	}

	public function controll_request_friend(Request $request)
	{
		if ($request->ajax()) {

			$type = "";
			$time = date("Y-m-d H:i:s", time());

			if ($request->type == 'accept') {
				DB::table('friend')
				->insert([
					'id_user' => $request->cookie('chat'),
					'idfriend' => base64_decode($request->id),
					'approved' => '1',
					'time' => $time, 
				]);
				DB::table('friend')
				->where('idfriend' , $request->cookie('chat'))
				->where('id_user', base64_decode($request->id))
				->update([
					'approved' => '1',
					'time'   => $time, 
				]);
				DB::table('notify')
				->where('id_user' , $request->cookie('chat'))
				->where('content', base64_decode($request->id))
				->where('type', 'request_friend')
				->delete();

				$type = 'accept_request_friend';
			}
			if ($request->type == 'deny') {
				DB::table('friend')
				->where('idfriend' , $request->cookie('chat'))
				->where('id_user', base64_decode($request->id))
				->delete();

				DB::table('notify')
				->where('id_user' , $request->cookie('chat'))
				->where('content', base64_decode($request->id))
				->where('type', 'request_friend')
				->delete();

				$type = 'deny_request_friend';
			}
			$notify = Notify::create([
				'id_user' =>  base64_decode($request->id),
				'content' =>   $request->cookie('chat'),
				'type' => $type,
				'created_at'    => $time,
			]);
			$notify2 = Notify::create([
				'content' =>  base64_decode($request->id),
				'id_user'   =>   $request->cookie('chat'),
				'type' => $type,
				'created_at'    => $time,
			]);

			event(
				$e = new NotifyEvent($notify)
			);
			event(
				$e2 = new NotifyEvent($notify2)
			);
			return "done";  
		}

	}
	public function delete_request_friend(Request $request)
	{
		if ($request->ajax()) {
			DB::table('notify')
			->where('type', 'deny_request_friend')
			->orWhere('type', 'accept_request_friend')
			->where('id_user', $request->cookie('chat'))
			->where('content', $request->idfriend)
			->delete();

			DB::table('notify')
			->where('type', 'deny_request_friend')
			->orWhere('type', 'accept_request_friend')
			->where('content', $request->cookie('chat'))
			->where('id_user', $request->idfriend)
			->delete();
			return 'done';
		}
		return 'faild';
	}

	public function handle_with_friend(Request $request)
	{
		if($request->ajax()){

			$time = date("Y-m-d H:i:s", time());
			if ($request->tp == 'unfriend') {
				DB::table('friend')
				->where('id_user', '=', base64_decode($request->id) , 'and', 'idfriend', '=' , $request->cookie('chat'))
				->orWhere('idfriend', '=', base64_decode($request->id) , 'and', 'id_user', '=' , $request->cookie('chat'))
				->delete();
				
				DB::table('message')
				->where('id_from', '=', base64_decode($request->id) , 'and', 'id_to', '=' , $request->cookie('chat'))
				->orWhere('id_to', '=', base64_decode($request->id) , 'and', 'id_from', '=' , $request->cookie('chat'))
				->delete();

				DB::table('notify')
				->where('id_user', '=', base64_decode($request->id) , 'and', 'content', '=' , $request->cookie('chat'))
				->orWhere('content', '=', base64_decode($request->id) , 'and', 'id_user', '=' , $request->cookie('chat'))
				->delete();


			}

			$notify = Notify::create([
				'id_user' =>  base64_decode($request->id),
				'content' =>   $request->cookie('chat'),
				'type' => $request->tp,
				'created_at'    => $time,
			]);
			event(
				$e = new NotifyEvent($notify)
			);
			return "done";
		}
		return "faild";
	}
	public function search_notify(Request $request)
	{
		if ($request->ajax()) {
			$tb_notify_all = DB::table('notify')
			->where('type', 'poke_friend')
			->where('id_user', $request->cookie('chat'))
			->join('chatuser', 'chatuser.iduser', '=', 'notify.content')
			->orderBy('notify.created_at', 'desc')	
			->select('chatuser.iduser', 'chatuser.avatar', 'chatuser.user', 'notify.id','notify.type', 'notify.created_at')
			->get();

			return $tb_notify_all;
		}
		return "faild";
	}
	public function send_image_message(Request $request)
	{
		if ($request->ajax()) {
			if ($request->hasFile('image')) {
				$file = $request->file('image');
				$extensionFile = strtolower($file->getClientOriginalExtension('file'));
				if (preg_match("/(png$)|(jpg$)|(jpeg$)|(ico$)|(gif$)/", $extensionFile)) {
					$fileName = $file->getClientOriginalName('file');
					$file->move('uploads/message_friend/',$fileName);
					return asset('uploads/message_friend')."/".$fileName;
				}
			}
		}
		return "";
	}
	public function profile(Request $request)
	{

		return view('chathub.profile')->with([
			'user' => Chat_User::where('iduser', $request->cookie('chat'))->get(),
		]);
	}
	public function load_caro(Request $request, $friend)
	{

		return view('chathub.caro.load')->with([
			'friend' => $friend,
			'user' => Chat_User::where('uid', $friend)->get(),
		]);
	}
}
