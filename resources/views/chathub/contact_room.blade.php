<div class="tb_cover card animated fadeIn h-100">
	<div class="card-header d-flex">
		<img src="{{$thumbnail}}" alt="" class="tb_round_image">
		<div class="information">
			<h5>{{$name}}</h5>
			<p class="notify">Create at <span>{{$time}}</span> 😄😄😄</p>
			<div id="controll_button" data-toggle="tooltip" data-placement="bottom" title="Controll"><i class="fas fa-ellipsis-h"></i>
			</div>
			<div id="invite_button" data-toggle="tooltip" data-placement="bottom" title="Invite friend"><i class="fas fa-plus"></i>
			</div>
			<ul id="controll_button_target" class = "animated fast_animated" val="{{base64_encode($id)}}">
				@if($role == 'owner')
				<li type="removeRoom">Remove room<i class="fas fa-times-circle"></i></li>
				<li type="settingRoom">Setting</li>
				@else
				<li type="leaveRoom">Leave room<i class="fas fa-sign-out-alt"></i></li>
				@endif

			</ul>
			<div id="invite_button_target" class = "animated fast_animated" >
				<div class="icon">
					<i class="fa fa-search" aria-hidden="true"></i>
				</div>
				<input type="text" name="" id="invite_button_search">
				<ul id="invite_button_search_target">
					
				</ul>
			</div>
		</div>
	</div>
	<div class="card-body main-chat" >
		<ul class="chat-list">
			
		</ul>
	</div>
	<div class="member_in_room">
		<div class="card">
			<div class="card-header">
				Member (<span>12/15</span>)
				<i class="fas fa-angle-up"></i>
			</div>
			<div class="card-body">
				<ul class="list_member">
					
				</ul>
			</div>
		</div>
	</div>
</div>
<ul id="controll_in_room" >
	@if($role == 'owner')
	<li class="controll_in_room_item" id="kick_out">Kick out</li>
	@endif
	<li class="controll_in_room_item" id="add_friend_in_room">Add friend</li>
</ul>
<button type="button" id="setting_btn" class="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Open modal for @getbootstrap</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Setting room</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form class="row">
					<div class="col-4">
						<div class="form-group">
							<label for="message-text" class="col-form-label">Thumbnail:</label>
							<input type="file" name="" class="d-none" id="thumbnail_room">
							<div class="cover_room_image tb_round_image" >
								<img src="{{$thumbnail}}" alt=""style="width: 100%;">
								<div class="hover">
									<i class="fa fa-camera" aria-hidden="true"></i>
								</div> 
							</div>
						</div>
					</div>
					<div class="col-8">
						<div class="form-group">
							<label for="room-name" class="col-form-label">Room name:</label>
							<input type="text" class="form-control" id="room-name" value="{{$name}}">
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal" id="close_setting_room">Close</button>
				<button type="button" class="btn btn-primary" id="save_setting_room">Save</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$('#invite_button, #controll_button').tooltip();
	new PerfectScrollbar(".right-main-content .message_content .tb_cover .main-chat");
	new PerfectScrollbar("#invite_button_search_target");
	new PerfectScrollbar(".right-main-content .message_content .tb_cover .member_in_room .card-body");

	$(".right-main-content .message_content .tb_cover .member_in_room .card-header").click(function(){
		if ($(".right-main-content .message_content .tb_cover .member_in_room .card-body").css('display') == 'none') {
			$(this).children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
			$(".right-main-content .message_content .tb_cover .member_in_room .card-body").slideDown();
		}else{
			$(this).children('i').addClass('fa-angle-up').removeClass('fa-angle-down');
			$(".right-main-content .message_content .tb_cover .member_in_room .card-body").slideUp();
		}	
	})
	$("#controll_button").click(function(){
		if ($("#controll_button_target").hasClass('fadeInDown')) {
			$("#controll_button_target").removeClass('fadeInDown').addClass('fadeOutUp');
			setTimeout(function(){
				$("#controll_button_target").hide();
			}, 500);
		}else{
			$("#controll_button_target").show().addClass('fadeInDown').removeClass('fadeOutUp');
		}
	})
	$("#invite_button").click(function(){
		if ($("#invite_button_target").hasClass('fadeInDown')) {
			$("#invite_button_target").removeClass('fadeInDown').addClass('fadeOutUp');
			setTimeout(function() {
				$("#invite_button_target").hide();
			}, 500);
		}else{
			$("#invite_button_target").show().addClass('fadeInDown').removeClass('fadeOutUp');
		}
	})
	$("#exampleModal .cover_room_image .hover").click(function(){
		$("#thumbnail_room").click();
		
	})	
	var roomFormData ;
	$("#thumbnail_room").change(function(e){
		if ($(this).val() != "") {
			if (e.target.files[0].type != "image/jpeg" && e.target.files[0].type != "image/jpg" && e.target.files[0].type != "image/png" && e.target.files[0].type != "image/ico") {
				swal({
					type: 'error',
					title: 'Oops...',
					text: 'Type of image not found !!!',
				})
				$(this).val('');
				return;
			}

			var path = URL.createObjectURL(e.target.files[0]);
			roomFormData = new FormData();
			roomFormData.append('file', e.target.files[0]);
			roomFormData.append('upload_preset', 'thienbinh');

			$("#exampleModal .cover_room_image img").attr('src', path);
		}
	})
	$("#save_setting_room").click(function(){
		var r_thumnail = "{{$thumbnail}}";
		if ($("#thumbnail_room").val()) {
			$.ajax({
				type: "POST",
				url : "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
				data: roomFormData,
				processData: false,
				contentType: false,
				success: function(data){
					var url = data.secure_url;
					url = url.substring(0, url.indexOf('upload/') + 7) + "c_scale,o_100,q_auto:eco,w_658,z_0.4/" + url.substring(url.indexOf('upload/') + 7, url.length);
					r_thumnail = url;
					upload_infor_room(r_thumnail, $("#room-name").val());
					$("#thumbnail_room").val('');
				}
			})	
		}else{
			
			upload_infor_room(r_thumnail, $("#room-name").val());
		}
		toastr["success"]("Edit successful!");
		$("#close_setting_room").click();
	})
	function upload_infor_room(thumbnail, name){
		var member = JSON.parse($(".right-main-content .message_content .tb_cover .card-header img").attr('val'));
		var detail = {
			'name': name,
			'owner': atob($(".right-main-content .message_content .tb_cover .card-header img").attr('own')),
			'thumbnail': thumbnail,
			'time': parseInt("{{$time}}"),
		}
		firebase.database().ref('rooms/' + "{{$id}}" + "/details").update(detail);

		for (var i = 0; i < member.length; i++) {
			firebase.database().ref('users/' + member[i].uid + "/rooms/" + "{{$id}}").update(detail);
			if (i == member.length - 1) {
				$(".right-main-content .message_content .tb_cover .card-header img").attr('src', thumbnail);
				$(".right-main-content .message_content .tb_cover .card-header h5").text(name);
				$(".right_sidebar .list_contact_item .contact-content h5").attr('full', name);
			}
		}

	}

</script>
