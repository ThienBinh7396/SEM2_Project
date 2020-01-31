<?php

namespace App\Http\Controllers\Chat;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Notify;
use App\Events\NotifyEvent;
use DB;

class RedisController extends Controller
{

    public function notify(Request $request)
    {
        if ($request->ajax()) {

            DB::table('friend')
            ->insert([
                'id_user' => $request->cookie('chat'),
                'idfriend' => base64_decode($request->id_friend),
                'time'  => $request->time,
                'approved' => 0
            ]);

            $notify = Notify::create([
                'id_user' =>  base64_decode($request->id_friend),
                'content' =>   $request->cookie('chat'),
                'type' => 'request_friend',
                'created_at'    => $request->time,
            ]);


            event(
                $e = new NotifyEvent($notify)
            );
             return "done";   
        }
    }

}
