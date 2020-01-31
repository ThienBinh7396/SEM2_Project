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
	<link rel="icon" href="{{asset('uploads/logo.jpg')}}">

	<!-- Fonts -->
	<link rel="dns-prefetch" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

	<!-- Font Awesome -->
	<link rel="stylesheet" href="{{ asset('vendor/adminlte/vendor/font-awesome/css/font-awesome.min.css') }}">

	<!-- Styles -->
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"> -->
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">

	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/global.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/login/chat.css') }}">

	<script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
	<script src="{{ asset('js/jquery-ui.min.js') }}"></script>

	<script src="{{ asset('vendor/adminlte/vendor/bootstrap/dist/js/popper.min.js') }}"></script>
	
	<script src="{{ asset('vendor/adminlte/vendor/bootstrap/dist/js/bootstrap.js') }}"></script>
	

	<!-- include summernote css/js -->

	<link rel="stylesheet" type="text/css" href="{{asset('js/summernote/summernote-bs4.css')}}">
	<script type="text/javascript" src="{{asset('js/summernote/summernote-bs4.min.js')}}"></script>
	
	<script type="text/javascript" src="{{asset('js/textboxio/textboxio.js')}}"></script>	

	<script type="text/javascript" src = "{{asset('js/login/chat.js')}}">
	</script>
	

</head>
<body>

	<section id="main-content" class="container-fluid">
		<div class="row">
			<div class="col-3 left_side">
				<div class="row tb_relative tb_clear_margin_bs">
					<div class="col d-flex left_header">
						<div class="setting d-inline-block tb_pointer">
							<i class="fa fa-cog" aria-hidden="true"></i>
						</div>
						<div class="logo text-center">
							<div class="content">
								<span contenteditable="true">Thien</span>
								<span contenteditable="true" class="text-uppercase">Binh</span>
							</div>
						</div>
						<div class="main-menu">
							<ul>
								<li id="user">
									<img src="{{asset(''.$user[0]->avatar)}}" alt="" class="thumbnail_user">
									<div class="user-name d-inline">{{$user[0]->user}}</div>
								</li>
								<li onclick="xxx()">
									Logout
								</li>
								<li id="friend">
									Friend
								</li>
							</ul>
						</div>
					</div>
					
				</div>
				<div class="row left_row tb_clear_margin_bs">
					<div class= " col search">
						<div class="icon">
							<i class="fa fa-search" aria-hidden="true"></i>
						</div>
						<input type="text" name="search" id="tb_search_friend" class="form-control">
					</div>
					<div class="list_friend">
					</div>
					<div class="live_search">
						
						<div class="loading" >
							<img src="{{asset('uploads/Spinner.gif')}}" alt="">
							<div class="text">Update this field</div>
						</div>
					</div>
					
				</div>
			</div>
			<div class="col-9 right_side">
				<div class="row">
					<div class="col-8 right_side_content_center">
						<div class="profile_page profile_user" >
							

						</div>

					</div>
					<div class="col right_side_content_right">
						
					</div>
				</div>
			</div>
		</div>
	</section>
	<div id="base_url" base = "{{route('chathub_index')}}" style="display: none;"></div>
	<div id="base_pub" base = "{{asset('')}}" style="display: none;"></div>
	<div class="tb_full_width">
		<div class="cover">
			<div class="textboxio">
				<textarea name="" id="textboxio_post" style="height:480px;" placeholder="What do you feel today?"></textarea>
			</div>
			<div class="button">
				<div class="share">Share</div>
				<div class="cancel">Cancel</div>
			</div>
		</div>
	</div>
	<div class="visual_cover" style="display: none;">
	</div>
	<script type="text/javascript">
		function xxx(){
			location.href = "http://localhost/thienbinh/public/chathub/logout"
		}
	</script>
</body>
</html>
