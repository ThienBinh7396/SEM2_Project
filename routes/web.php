<?php


Route::get('/', function () {
	return view('welcome');
})->middleware('logout');

Auth::routes();

// Route::get('/admin', 'HomeController@index')->name('admin');


Route::group(['prefix' => 'login_chat'], function() {
    Route::get('/', function() {
    })->name('login_chat');

    Route::get('/check_exists', 'Chat\Login\LoginController@check_exists');

    Route::post('/register_user', 'Chat\Login\LoginController@register_user');

    Route::get('/login_user', 'Chat\Login\LoginController@login_user');

    Route::post('/update_id', 'Chat\Login\LoginController@update_id');
});
