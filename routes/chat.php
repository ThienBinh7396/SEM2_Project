<?php 
Auth::routes();

Route::group(['middleware' => ['chat']], function() {
	Route::group(['prefix' => 'chathub'], function() {
		Route::get('load_caro/{friend}', 'Chat\Login\ChatController@load_caro')->name('load_caro');
		Route::get('load_main_view_caro', function() {
			return view('chathub.caro.main');
		});

		Route::get('/send', 'Chat\RedisController@index');
		Route::post('/send', 'Chat\RedisController@post')->name('send');
		Route::get('/', 'Chat\Login\ChatController@index')->name('chathub_index');
		Route::get('/cookie', 'Chat\Login\ChatController@cookie');
		Route::get('/logout', 'Chat\Login\LoginController@logout')->name('tb_chathub_logout');

		Route::get('/users', function() {
			return view("chathub\xxxx"); 
		});

		Route::get('/ajax_load_html', 'Chat\Login\ChatController@load_user')->name('ajax_load_html');

		Route::post('/update_infor', 'Chat\Login\ChatController@update');

		Route::post('update_full', 'Chat\Login\ChatController@update_full');

		Route::get('/delete_file', 'Chat\Login\ChatController@file_delete');

		Route::post('/upload_image', 'Chat\Login\ChatController@upload_image');

		Route::post('/post_new', 'Chat\Login\ChatController@post_new');

		Route::get('message_view', 'Chat\Login\ChatController@message_view')->name('message_view');

		Route::get('ajax_load_message/{id}', 'Chat\Login\ChatController@ajax_load_message')->name('ajax_load_message');

		Route::post('ajax_load_room', 'Chat\Login\ChatController@ajax_load_room');

		Route::post('post_message', 'Chat\Login\ChatController@post_message')->name('post_message');

		Route::get('search_user', 'Chat\Login\ChatController@search_user');

		Route::post('search_friend', 'Chat\Login\ChatController@search_friend');

		Route::post('tb_add_friend', 'Chat\RedisController@notify');

		Route::post('controll/request_friend', 'Chat\Login\ChatController@controll_request_friend');

		Route::post('delete_request_friend', 'Chat\Login\ChatController@delete_request_friend');

		Route::get('handle_with_friend', 'Chat\Login\ChatController@handle_with_friend')->name('handle_with_friend');

		Route::post('search_notify', 'Chat\Login\ChatController@search_notify');

		Route::post('send_image_message', 'Chat\Login\ChatController@send_image_message');

		Route::post('icon/tb_get_icon', 'Admin\AdminIconController@get_icon');

		Route::get('profile', 'Chat\Login\ChatController@profile')->name('profile');

	});
})
?>