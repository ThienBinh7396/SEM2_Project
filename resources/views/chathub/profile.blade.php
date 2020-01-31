@extends('chathub/master')
@section('css')
<link rel="stylesheet" type="text/css" href="{{asset('js/summernote/summernote-bs4.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('plugin/crop/croppie.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/login/message.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('css/login/profile.css')}}">
@stop
@section('js')
<script type="text/javascript" src="{{asset('plugin/crop/croppie.min.js')}}"></script>

<script type="text/javascript" src="{{asset('js/summernote/summernote-bs4.min.js')}}"></script>
<script type="text/javascript" src = "{{asset('js/login/profile.js')}}" defer></script>
<style type="text/css" media="screen">
.preload_screen{
	display: none !important;
}
</style>
<script type="text/javascript">
	$(document).ready(function(){setTimeout(function(){$(".preload_screen .loading").fadeOut(100),$(".preload_screen .loading_left").addClass("slideOutLeft"),$(".preload_screen .loading_right").addClass("slideOutRight"),setTimeout(function(){$(".preload_screen").remove()},600)},1500)

		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": true,
			"rtl": false,
			"positionClass": "toast-top-right",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": 300,
			"hideDuration": 1000,
			"timeOut": 2000,
			"extendedTimeOut": 1000,
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
	});
	var config={apiKey:"AIzaSyAtv8Mh3MczMYByAKz9YmWE5xkRKfhsYhU",authDomain:"chathub7396.firebaseapp.com",databaseURL:"https://chathub7396.firebaseio.com",projectId:"chathub7396",storageBucket:"chathub7396.appspot.com",messagingSenderId:"550031613509"};firebase.initializeApp(config);	
	
</script>
@stop
@section('main-content')
<ol class="breadcrumb">
	<li>
		<a href="{{route('message_view')}}" class="mr-10"> <i class="fas fa-home"></i>Home <span class="ml-10">/</span></a>
	</li>
	<li>
		<a href=""> Setting</a>
	</li>
	<li id="active-link" class="active">
		My Details
	</li>
</ol>
@php
$current_user = $user[0];
@endphp
<div class="profile_content d-flex ">
	<form action="" method="get" accept-charset="utf-8" class="row">
		<div class="mt-4 col-lg-3 col-md-4">
			<div class="tb_round_image cover_change ">
				<div class="hover_change">
					<i class="fas fa-camera-retro"></i>
				</div>
				<input type="file" class="d-none" id="input_change_avatar" name="">
				<img src="{{$current_user->avatar}}" alt="" class="tb_round_image" id="img_change_avatar">
			</div>
		</div>
		<div class="mt-4 col-lg-6 col-md-6">
			<div class="form-group">
				<label for="name">Full name: </label>
				<input type="text" class="form-control" id="name" name="user" value="{{$current_user->user}}">
			</div>
			<div class="form-group">
				<label for="address">Address: </label>
				<input type="text" class="form-control" id="address" name="address" value="{{$current_user->address}}">
			</div>
			<div class="form-group">
				<label for="birthday">Date of Birth: </label>
				<input type="date" class="form-control" id="birthday" style="width: 180px !important" name="birthday" value="{{$current_user->birthday}}">
			</div>
			
			<div class="form-group gender">
				<label for="gender">Gender: </label>
				<div class="dropdown open">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="gender" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{$current_user->gender}}
					</button>
					<div class="dropdown-menu gender" aria-labelledby="dropdownMenu1">
						<a class="dropdown-item" href="">Male</a>
						<a class="dropdown-item" href="">Female</a>
					</div>
				</div>
			</div>
			<div class="form-group ">
			</div>
			<div class="form-group ">
				<label for="about">About: </label>
				<textarea name="" id="about">{{urldecode($current_user->about_you)}}</textarea>
			</div>
			<div class="form-group ">
				<label for="" id="change_password">+ Change password</label>
			</div>
			<div class="form-group" id="cover_change_password">
				<label for="old_password">Existing password</label>
				<input type="password" class="form-control" id="old_password" placeholder="Type old password" name="address" value="">
				<br>
				<label for="new_password">New password</label>
				<input type="password" class="form-control" id="new_password" placeholder="Type new password" name="address" value="">
			</div>				
			<div class="form-group text-right">
				<button type="button" class="btn btn-dark mr-2">Cancel</button>
				<button type="button" class="btn btn-success" id="save_infor">Save</button>
			</div>
		</div>
	</form>
</div>

<div class="modal" id="crop">
	<div class="modal-content card">
		<div class="modal-header">
			<h5 class="modal-title" id="exampleModalLabel">Cropping Profile Picture</h5>
			<button type="button" class="close close_crop" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="row">
				<div class="col">
					<div id="preview"></div>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" id="close_crop">Close</button>
			<button type="button" class="btn btn-primary mr-4" id="save_crop">Save</button>
		</div>
	</div>
</div>

@stop