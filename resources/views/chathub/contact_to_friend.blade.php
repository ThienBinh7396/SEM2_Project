<div class="tb_cover card animated fadeIn h-100">
	<div class="card-header d-flex">
		<img src="{{$current_contact_friend->avatar}}" alt="" class="tb_round_image">
		<div class="information">
			<h5>{{$current_contact_friend->user}}</h5>
			<p class="notify">You're friends 😍😍😍</p>
			<div id="controll_button" data-toggle="tooltip" data-placement="bottom" title="Controll"><i class="fas fa-ellipsis-h"></i>
			</div>
			<ul id="controll_button_target" class = "animated fast_animated" val="{{base64_encode($current_contact_friend->iduser)}}">
				<li type="unfriend"><i class="fas fa-user-times" ></i>Cancel request</li>
				<li type="infor"><i class="far fa-user" style="font-size: 17px;right: 4px;"></i>Friend infor</li>
			</ul>
		</div>
	</div>
	<div class="card-body main-chat" >
		<ul class="chat-list">
			<li class="chat-item become-friend">
				<div class="image d-flex justify-content-center">
					<img class="tb_round_image" src="{{$user[0]->avatar}}" class="tb_round_image" alt="" style="width: 40px; height: 40px;">
					<img src="{{$current_contact_friend->avatar}}" class="tb_round_image" alt="" >
				</div>
				<div class="text d-flex justify-content-center">
					You become to friends from  <span class="fulltime" style="margin-left: 5px;"> </span>
				</div>
			</li>
			<hr>
			
		</ul>
	</div>
</div>
<button type="button" id="btn_show_infor" class="btn btn-primary d-none" data-toggle="modal" data-target="#show_infor">
	Launch demo modal
</button>
<style type="text/css" media="screen">
#show_infor .modal-body ul{
	list-style: none;
	padding: 0.15rem 1rem;
	color: #737476;
	margin: 0; 
}
#show_infor .modal-body ul li{
	display: inline-block;
	padding: 8px 10px;
	cursor: pointer;
}	
#show_infor .modal-body ul li.actived{
	color: #fbfbfc
}
#show_infor .modal-content,
#show_infor .modal-header{
	border: none;
}
#show_infor .modal-body{
	padding: 0;
}
#show_infor .card{
	background: #2f3136;
	color: #aeb1c1;
}
#show_infor .form-controll{

}
</style>
<div class="modal fade" id="show_infor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header" style="    background: #202225;color: #f6f6f7;border-bottom: 1px solid #44443c">
				<img class="tb_round_image" src="{{$current_contact_friend->avatar}}" style="width: 40px;height: 40px" alt="">
				<h5 style="    position: absolute;top: 25px;left: 70px;font-size: 0.9rem">{{$current_contact_friend->user}}</h5>
				<button type="button" style="color: inherit;" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="background: #202225; min-height: 424px;">
				<ul>
					<li class="actived" to="infor">User infor</li>
					<li to="about">About</li>
				</ul>
				<script type="text/javascript">
					$("#show_infor ul li").click(function(e){
						$("#show_infor ul li").removeClass('actived');
						$(this).addClass('actived');
						var to = $(this).attr('to');
						$("#show_infor .modal-body .card").each(function(index, el) {
							if ($(this).attr('target') == to) {
								$(this).show()
							}else{
								$(this).hide()								
							}
						});
					})
				</script>
				<div class="card" target="infor">
					<div class="card-body">
						<div class="form-group">
							<label for="name">Full name: </label>
							<input type="text" class="form-control" id="name" name="user" disabled="" value="{{$current_contact_friend->user}}">
						</div>
						<div class="form-group">
							<label for="address">Address: </label>
							<input type="text" class="form-control" id="address" name="address"  disabled="" value="{{$current_contact_friend->address}}">
						</div>
						<div class="form-group">
							<label for="birthday">Date of Birth: </label>
							<input type="date" class="form-control" id="birthday" style="width: 180px !important" name="birthday"  disabled="" value="{{$current_contact_friend->birthday}}">
						</div>
						<div class="form-group gender">
							<label for="gender">Gender: </label>
							<div class="dropdown open">
								<button class="btn btn-secondary dropdown-toggle" type="button" id="gender" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									{{$current_contact_friend->gender}}
								</button>
								
							</div>
						</div>
						<div class="form-group ">
						</div>
					</div>
				</div>
				<div class="card" target="about" style="display: none;">
					<div class="card-body">
						@if($current_contact_friend->about_you == null)
						<p class="text-center">...</p>
						@else
						{!!urldecode($current_contact_friend->about_you)!!}
						@endif
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>
<script type="text/javascript">
	$('[data-toggle="tooltip"]').tooltip();
	new PerfectScrollbar(".right-main-content .message_content .tb_cover .main-chat");
	$("#controll_button").click(function(){
		if ($("#controll_button_target").hasClass('fadeInDown')) {
			$("#controll_button_target").removeClass('fadeInDown').addClass('fadeOutUp');
			setTimeout(function() {
				$("#controll_button_target").hide();
			}, 500);
		}else{
			$("#controll_button_target").show().addClass('fadeInDown').removeClass('fadeOutUp');
		}
	})

	var friend , type;
	$(".right-main-content .message_content .tb_cover .card-header .information #controll_button_target li").click(function(e){
		$("#controll_button_target").removeClass('fadeInDown').addClass('fadeOutUp');
		setTimeout(function(){
			$("#controll_button_target").hide();
		}, 500);
		if ($(this).attr('type') == 'unfriend') {

			var name = $(".message_content .card-header .information h5").text().split(' ');
			friend = $(this).parent().attr('val');
			type = $(this).attr('type');

			$("#tb_modal").attr('type', type);
			$("#tb_modal").attr('friend', friend);

			if (type == 'unfriend'){
				$("#tb_modal .modal-content .content").text('Cancel request friend with ' + name[name.length - 1]);
			}
			$("#tb_modal_controll").click();
		}else{
			$("#btn_show_infor").click();
		}

	})
	
</script>
