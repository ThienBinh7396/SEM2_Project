@extends('chathub/master')

@section('css')
<link rel="stylesheet" type="text/css" href="{{asset('css/login/message.css')}}">
@stop

@section('js')
<script type="text/javascript" src = "{{asset('js/login/main.js')}}" defer></script>
<script type="text/javascript">
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(function(){
			$(".card-header .cover_header_category").slick({
				dots: false,
				infinite: false,
				slidesToShow: 6,
				slidesToScroll: 1,
				swipe: false,
			});

			setTimeout(function(){
				$(".card-header .cover_header_category1 .show_icon_category").eq(0).click()
				$(".card-header .cover_header_category2 .show_icon_category").eq(0).click()
			},300);
		}, 1000)
	})
	$(document).ready(function(){setTimeout(function(){$(".preload_screen .loading").fadeOut(100),$(".preload_screen .loading_left").addClass("slideOutLeft"),$(".preload_screen .loading_right").addClass("slideOutRight"),setTimeout(function(){$(".preload_screen").remove()},600)},3500)});var config={apiKey:"AIzaSyAtv8Mh3MczMYByAKz9YmWE5xkRKfhsYhU",authDomain:"chathub7396.firebaseapp.com",databaseURL:"https://chathub7396.firebaseio.com",projectId:"chathub7396",storageBucket:"chathub7396.appspot.com",messagingSenderId:"550031613509"};firebase.initializeApp(config);	
</script>
@stop
@section('main-content')
<style type="text/css" media="screen">
body.swal2-height-auto{
	height: 100vh !important;
}
</style>
<div class="row">

	<div class="message_content d-flex ">
		<div class="center_cover ">
			
		</div>
		<div class="extendsion">
			<div class="extendsion_image animated" active = "false">
				<img src="{{asset('uploads/avatar/avatar.jpg')}}" alt="" style="width: auto; height: 100px;">
			</div>
			<div class="send">
				<div class="row">
					<div class="send-content col-8" >
						<div class="cover">
							<textarea name="" class="form-control" id="summernote-send" ></textarea>
						</div>
						
					</div>
					<div class="send-button col-4">
						<div class="btn-group" role="group" aria-label="">
							<input type="file" name="" id="tb_send_file" class="d-none">
							<button type="tb" class="btn tb_round_image add_file" data-toggle="tooltip" data-placement="bottom" title="Image">
								<i class="fas fa-images" style="transform: translateX(-3.5px);"></i>
							</button>
							<button type="tb" class="btn tb_round_image add_sticker" data-toggle="tooltip" data-placement="bottom" title="Sticker">
								<i class="far fa-sticky-note"></i>
							</button>
							<button type="tb" class="btn tb_round_image add_emotion" data-toggle="tooltip" data-placement="bottom" title="Emotion" >
								<img src="{{asset('uploads/logo_emotion.ico')}}" style="width: 26px; height: 26px; margin-left: -8px;" alt="">

							</button>
							<div class="card tb_container_icon tb_sticker animated" >

								<div class="card-header ">
									<ul class="cover_header_category cover_header_category1">
										@foreach($tb_sticker as $val)
										<li class="show_icon_category" val="{{base64_encode($val->id)}}" type="{{$val->type}}">
											<img src="{{asset(''.$val->icon)}}" alt="">
										</li>
										@endforeach
									</ul>
								</div>
								<div class="card-body">
									<div class="cover_body_icon cover_body_icon1">
										
									</div>
								</div>
							</div>
							<div class="card tb_container_icon tb_emotion animated" >

								<div class="card-header ">
									<ul class="cover_header_category cover_header_category2">
										@foreach($tb_emotion as $val)
										<li class="show_icon_category" val="{{base64_encode($val->id)}}" type="{{$val->type}}">
											<img src="{{asset(''.$val->icon)}}" alt="">
										</li>
										@endforeach
									</ul>
								</div>
								<div class="card-body">
									<div class="cover_body_icon cover_body_icon2">
										
									</div>
								</div>
							</div>
							<button type="tb" class="btn tb_round_image add_message" data-toggle="tooltip" data-placement="bottom" title="Send">
								<i class="icon fa fa-paper-plane"></i>
							</button>
							<div id="tb_visual_message" style="display: none;"></div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="right_sidebar d-flex">
		<button id="toggle-right-main" class="btn tb_toggle_button" ><i class="fas fa-th-list"></i></button>
		<div class="search">
			<h5>
				Search Contact
			</h5>
			<div class="cover">
				<div class="icon">
					<i class="fa fa-search" aria-hidden="true"></i>
				</div>
				<input type="text" name="search" id="tb_search_friend" placeholder="Search friend" class="form-control">
			</div>
			<ul class="list_search animated fast_animated">
				
			</ul>
		</div>
		<hr style=" width: 100%; height: 1px;">

		<div class="right_cover animated fast_animated">
			<ul class="list_contact">
				@php
				$i = 0;

				$tb_list_friend = [];

				@endphp
				@if(count($friend) == 0)
				<li class=" text-center no-friend" style="color: #d1d1d1;">
					You have no message <br> Search friend by type on <br>
					<a href="">'Search Contact'</a> 
				</li>
				@endif

				<input type="hidden" name="" style="display: none;" id="tb_list_friend" val = "{{json_encode($tb_list_friend)}}">
				<input type="hidden" name="" style="display: none;" id="tb_wait_request" val = "{{json_encode($wait_request)}}">
			</ul>
			<div class="cover_share_resoure">
				<h6>Shared image</h6>
				<ul class="share_resoure">
				</ul>
				
			</div>
		</div>
	</div>
</div>



@stop

