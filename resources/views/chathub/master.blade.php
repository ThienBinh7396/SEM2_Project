<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- CSRF Token -->
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>{{ config('app.name', 'ThienBinh') }}</title>

	<!-- Scripts -->

	<!-- icon -->    
	<link rel="icon" href="{{asset('uploads/logo_icon.png')}}">

	<!-- Fonts -->
	<link rel="dns-prefetch" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">

	<!-- Font Awesome -->
	<link rel="stylesheet" type="text/css" href="{{ asset('vendor/fontawesome-5.3.1/css/all.min.css') }}">
	
	<!-- Animate -->
	<link rel="stylesheet" type="text/css" href="{{asset('css/animate.css')}}">

	<!-- Styles -->
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">

	<!-- Sweet alert -->    
	<link rel="stylesheet" type="text/css" href="{{asset('plugin/sweet_alert/sweet_alert.min.css')}}">
	<!-- Slick_js -->    
	<link rel="stylesheet" type="text/css" href="{{asset('plugin/slick/slick.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('plugin/slick/slick-theme.css')}}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/login/main.css') }}">

	@yield('css')

	<script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
	<script src="{{asset('plugin/firebase/firebase.js')}}"></script>

	<link rel="stylesheet" type="text/css" href="{{asset('plugin/perfect_scrollbar/ps.min.css')}}">
	<script type="text/javascript" src="{{asset('plugin/perfect_scrollbar/ps.min.js')}}"></script>


	<script type="text/javascript" src="{{asset('plugin/sweet_alert/sweet_alert.min.js')}}"></script>
	<script src="{{asset('plugin/slick/slick.min.js')}}"></script>    	

	<script src="{{ asset('vendor/adminlte/vendor/bootstrap/dist/js/popper.min.js') }}"></script>
	<link rel="stylesheet" type="text/css" href="{{asset('plugin/toastr/toastr.css')}}">
	<script type="text/javascript" src="{{asset('plugin/toastr/toastr.min.js')}}"></script>
	<script src="{{ asset('vendor/adminlte/vendor/bootstrap/dist/js/bootstrap.js') }}"></script>
	
	
	@yield('js')
	
	<style type="text/css" media="screen">img[alt='www.000webhost.com']{display: none !important;}#loader:after,#loader:before{content:"";position:absolute}#loader{display:block;left:50%;top:50%;width:150px;height:150px;border-radius:50%;border:3px solid transparent;border-top-color:#9370DB;-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}#loader:before{top:5px;left:5px;right:5px;bottom:5px;border-radius:50%;border:3px solid transparent;border-top-color:#BA55D3;-webkit-animation:spin 3s linear infinite;animation:spin 3s linear infinite}#loader:after{top:15px;left:15px;right:15px;bottom:15px;border-radius:50%;border:3px solid transparent;border-top-color:#F0F;-webkit-animation:spin 1.5s linear infinite;animation:spin 1.5s linear infinite}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{0%{-webkit-transform:rotate(0);-ms-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);transform:rotate(360deg)}}.preload_screen{position:fixed;display:flex;width:100%;height:100%;z-index:1000}.preload_screen .loading{max-width:100%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1002}.preload_screen .loading_left,.preload_screen .loading_right{z-index:1001;width:50%;height:100%;background:#000;display:inline-block}</style>
	<script type="text/javascript">
		window.timeXXX = new Date().getTime();
	</script>
</head>
<body>
	
	<div class="preload_screen">
		<div  class="loading"><div id="loader"></div></div>
		<div class="loading_left animated "></div>
		<div class="loading_right animated "></div>
	</div>
	<div class="tb_notify_container alert alert-success animated" style="">
		<div class="left"></div>
		<div class="right"></div>
		<div class="tb_notify_container_content">
			<img src="{{asset('uploads/logo.png')}}" alt="" style="position: absolute; top: 50%; left:10px; transform: translateY(-50%);width: 40px; height: 30px;">
			<div class="cover">
				<marquee  scrollamount= '10'  truespeed= '10' scrolldelay = '100'> You and Hoang vawn Binh become a friend</marquee>
			</div>
		</div>

	</div>
	<!-- Button trigger modal -->
	<button type="button" class="btn btn-primary d-none" id="tb_modal_controll" data-toggle="modal" data-target="#tb_modal">
		Launch demo modal
	</button>

	<!-- Modal -->
	<div class="modal fade" id="tb_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" type="" friend="">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-body text-center">
					<div class="icon">
						<i class="fas fa-exclamation" style="font-size: 2.75em;"></i>
					</div>
					<div class="text">
						<div class="label">
							Are you sure?
						</div>
						<p class="content">Cancel request friend width</p>
					</div>
				</div>
				<div class="modal-footer d-flex justify-content-center" style="border: none;">
					<button type="button" id="tb_yes_controll" class="btn btn-danger" data-dismiss="modal" style="background-color: rgb(221, 107, 85);">Yes, continue</button>
					<button type="button" class="btn btn-dark" style="background-color: #aaa" data-dismiss="modal">No, cancel</button>
				</div>
			</div>
		</div>
	</div>
	<div class="tb_cover_slide" >
		<div id="tb_cover_slide_close">X</div>
		<ul id="tb_show_slide"></ul>
		<ul id="tb_show_slide_nav"></ul>
	</div>
	<div class="container-fluid main">
		<div class="row">
			<div class="left-main-content">
				<button id="toggle-left-main" class="btn tb_toggle_button" ><i class="fas fa-align-justify"></i></button>
				<div class="d-flex tb_cover">
					<div class="logo">
						<img src="{{asset('uploads/logo.png')}}" alt="logo.png" tb = "{{base64_encode($user[0]->iduser)}}" tb_uid = "{{$user[0]->uid}}">
						<div class="text d-inline-block">
							Thienbinh
						</div>
						<div id="base_url" base = "{{route('chathub_index')}}" style="display: none;"></div>
						<div id="base_admin" base = "{{route('tb_admin')}}" style="display: none;"></div>
						<div id="base_pub" base = "{{asset('')}}" style="display: none;"></div>
					</div>
					<div class=" menu">
						<div class="user-details">
							<div class="image">
								@if($user[0]->avatar != "uploads/avatar/default.jpg")
								<img src="{{$user[0]->avatar}}" alt="">
								@else
								<img src="{{asset('uploads/avatar/default.jpg')}}" alt="">
								@endif
								
							</div>
							<div class="name text-center" fullname = "{{$user[0]->user}}">
								@php
								$lastName = explode(" ", $user[0]->user)[count(explode(" ", $user[0]->user)) - 1];
								echo 'Hello, '.$lastName.'!';
								@endphp
							</div>
							<ul class="shortcut-controll">
								<li data-toggle="tooltip" data-placement="bottom" title="Setting">
									<a href="{{route('profile')}}" title=""><i class="fa fa-cog" aria-hidden="true"></i></a>
									<audio src="{{asset('music/alert.mp3')}}" preload="none" volume="0.3" style="display: none;" id="alert_new_message">
									</audio>
								</li>
								<li data-toggle="tooltip" data-placement="bottom" title="Friend Requests" id="tb_friend_request">
									<a href="" title=""><i class="fa fa-users" aria-hidden="true"></i></a>
									<span class="new_notify">0</span>
								</li>
								<li data-toggle="tooltip" data-placement="bottom" title="Notifications" id="tb_notify_controll">
									<a href="" title=""><i class="fas fa-bell"></i></a>
									<span class="new_notify">0</span>
								</li>
								<li data-toggle="tooltip" data-placement="bottom" title="Logout">
									<a href="{{route('tb_chathub_logout')}}" title="" id="tb_chathub_logout"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
								</li>
							</ul>
							<ul class="menu-controll">
								<li>
									<a href="" title=""><i class="fa fa-home" aria-hidden="true"></i>Home</a>
									<div class="tb_gb"><a href="{{route('message_view')}}" title=""><i class="fa fa-home" aria-hidden="true"></i>Home</a></div>
								</li>
								<li>
									<div class="tb_gb" ><a href="#" title=""><i class="far fa-comments"></i>Room<b class="fa fa-angle-down"></b></a></div>

									<a href="#" title=""><i class="far fa-comments"></i>Room<b class="fa fa-angle-down"></b></a>
									
									<ul class="menu_child">
										<li>
											<a href="" id="room">Create room</a>
										</li>
									</ul>
								</li>
								<li>
									<div class="tb_gb actived"><a href="#" title="" class="actived"><i class="fas fa-gamepad"></i>Game<b class="fa fa-angle-down"></b></a></div>
									<a href="#" title="" class="actived"><i class="fas fa-gamepad"></i>Game<b class="fa fa-angle-down"></b></a>
									<ul class="menu_child">
										<li>
											<a href="" id="create_game_caro">Caro</a>
										</li>
									</ul>
								</li>
							</ul>

							<a href="{{route('message_view')}}" data-toggle="tooltip" data-placement="bottom" title="Message" class="a-live-chat">Live chat</a>
						</div>
					</div>
					<div class="invite_game_view">
						<div class="form-group">
							<label for="">Friend: </label>
							<div class="invite_game_view_close">x</div>
							<div class="cover d-flex">
								<div class="dropdown open">
									<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Select
									</button>
									<div class="dropdown-menu tb_dropdown" style="height: 120px" aria-labelledby="dropdownMenu2">
									</div>
								</div>
								<button type="button" class="btn btn-info" id="btn_invite">Invite</button>
							</div>
						</div>
						<div class="invite_game_view_load">
							<div  class="loading"><div class="loading_countdown">12</div><div class="load" id="loader"></div></div>
						</div>
					</div>
					<div class=" friend_request animated ">
						<div class="friend_request_header" >
							<div class="img" style="background: url('{{asset('uploads/request.png')}}') no-repeat; background-size: cover;"></div>
							<h6 style="font-size: 18px;"><span style="color: pink">0</span> NEW</h6>
							<p style="margin-bottom: 0; font-weight: 300; font-size: 0.875rem">Friend request </p>
						</div>
						<div class="cover">
							
							<ul class="friend_request_body">
								
							</ul>
						</div>
					</div>
					<div class=" tb_notify  animated ">
						<div class="tb_notify_header" >
							<div class="img" style="background: url('{{asset('uploads/request.png')}}') no-repeat; background-size: cover;"></div>
							<h6 style="font-size: 18px;"><span style="color: #fff">0</span> NEW</h6>
							<p style="margin-bottom: 0; font-weight: 300; font-size: 0.875rem">Notifications </p>
						</div>
						<div class="cover">
							
							<ul class="tb_notify_body">
								
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="right-main-content" >
				@yield('main-content')
			</div>
		</div>
	</div>

	@yield('js_footer')
</body>
</html>
