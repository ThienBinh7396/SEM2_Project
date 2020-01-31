<?php 
Route::group(['middleware' => ['auth']], function() {
	Route::group(['prefix' => 'admin'], function() {
		Route::get('/', function() {
			return view('home');
		})->name('tb_admin');


	});
});
Route::group(['middleware' => ['auth']], function() {
	Route::group(['prefix' => 'admin/icon'], function() {
		Route::get('/', 'Admin\AdminIconController@index')->name('tb_admin_icon');

		Route::post('add_category_icon', 'Admin\AdminIconController@add_category_icon');
		Route::post('edit_category_icon', 'Admin\AdminIconController@edit_category_icon');
		Route::post('remove_category_icon', 'Admin\AdminIconController@remove_category_icon');
		
		Route::post('add_icon', 'Admin\AdminIconController@add_icon');
		Route::post('tb_get_icon', 'Admin\AdminIconController@get_icon');
		Route::post('tb_remove_icon', 'Admin\AdminIconController@tb_remove_icon');
		Route::post('update_amount', 'Admin\AdminIconController@update_amount');

	});
});
?>