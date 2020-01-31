$(document).ready(function() {
	

	var base = $("#base_url").attr('base');
	var base_public = $("#base_pub").attr('base');
	var base_admin = $("#base_admin").attr('base');
	var animateScrollChat = false, slideIndex = 0;


	var current_friend = '0';
	var currentTypeContact = "friend";
	var list_member_in_room = [], list_wait_room = [];
	var current_mem_in_room = "";

	var ownerRoom = "";

	var tb_timer = [];

	var countdown_time, countdown_interval, checkInvite = true;

	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	var alert_new_message = document.getElementById('alert_new_message');
	alert_new_message.volume = 0.4;

	var tb_list_friend = JSON.parse($("#tb_list_friend").attr('val'));


	var tb_wait_request = JSON.parse($("#tb_wait_request").attr('val'));
	init();
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
	new PerfectScrollbar(".left-main-content .tb_cover  .tb_notify_body");
	new PerfectScrollbar(".left-main-content .tb_cover .friend_request .friend_request_body");
	new PerfectScrollbar(".left-main-content .tb_cover .menu");
	new PerfectScrollbar(".right-main-content .right_sidebar .list_search");
	new PerfectScrollbar(" .right-main-content .right_sidebar .list_contact");
	new PerfectScrollbar(".tb_dropdown");

	$("#create_game_caro").click(function(e){
		e.preventDefault();
		$(".invite_game_view").slideDown();
	})
	$(".invite_game_view_close").click(function(e){
		$(".invite_game_view").slideUp();
	})
	$("#btn_invite").click(function(e){
		if (!checkInvite) return;
		checkInvite = false;
		console.log($("#dropdownMenu2").attr('uid'));

		console.log(firebase.auth().currentUser.uid);
		firebase.database().ref('users/' + $("#dropdownMenu2").attr('uid') + '/notify/caro_' + firebase.auth().currentUser.uid).remove();
		firebase.database().ref('users/' + $("#dropdownMenu2").attr('uid') + '/notify/caro_' + firebase.auth().currentUser.uid).update({
			type: 'invite_caro',
			content: firebase.auth().currentUser.uid,
			avatar: $(".left-main-content .tb_cover .menu .user-details .image img").attr('src'),
			time: new Date().getTime(),
			name: $(".left-main-content .tb_cover .menu .user-details .name").attr('fullname')
		});
		$(".invite_game_view .invite_game_view_load").fadeIn();
		countdown_time = 30;
		$(".invite_game_view .invite_game_view_load .loading_countdown").text(countdown_time);
		countdown_interval = setInterval(function(){
			countdown_time--;
			$(".invite_game_view .invite_game_view_load .loading_countdown").text(countdown_time);
			if (countdown_time == 0) {
				clearInterval(countdown_interval);
				$(".invite_game_view .invite_game_view_load").fadeOut();
				checkInvite = true;
			}
		}, 1000);
	})


	$("#room").click(async function(e){e.preventDefault();const {value: nameRoom} = await swal({title:"Create room",type:"info",input:"text",inputPlaceholder:"Enter your room name",showCancelButton:!0,inputValidator:function(o){return!o&&"You need to write room name!"}});if(nameRoom){console.log(nameRoom),console.log(firebase.auth().currentUser.uid);var cuid=firebase.auth().currentUser.uid,details={name:nameRoom,owner:cuid,thumbnail:"https://res.cloudinary.com/thienbinh7396/image/upload/v1540353980/chathub/speaking2.png",time:(new Date).getTime()},members=[{uid:cuid,name:$(".left-main-content .tb_cover .menu .user-details .name").attr("fullname"),avatar:$(".left-main-content .tb_cover .menu .user-details .image img").attr("src")}];members={member:members=JSON.stringify(members)};var newKey=firebase.database().ref().child("rooms").push().key,updates={};updates["/rooms/"+newKey+"/details"]=details,updates["/rooms/"+newKey+"/members"]=members,updates["/users/"+cuid+"/rooms/"+newKey]=details,firebase.database().ref().update(updates);toastr["success"]("Create room successful!");}})

	$("#tb_cover_slide_close").click(function(){
		$(".tb_cover_slide").fadeOut();
	})
	$("#toggle-left-main").click(function(){
		var l = parseInt($(".left-main-content").css('left'));
		if (l == -220) {
			if($(".right-main-content .right_sidebar").css( 'position') != 'relative'){
				$(".right-main-content .right_sidebar").css('right', '-220px');
			}
			$(".left-main-content").css('left', '0');
			$(this).find('i').removeClass('fa-align-justify').addClass('fa-align-center');
		}else{
			$(".left-main-content").css('left', '-220px');
			$(this).find('i').addClass('fa-align-justify').removeClass('fa-align-center');
		}
	})
	$("#toggle-right-main").click(function(){
		var l = parseInt($(".right-main-content .right_sidebar").css('right'));
		if (l == -220) {
			$(".left-main-content").css('left', '-220px');
			$(".right-main-content .right_sidebar").css('right', '0');
		}else{
			$(".right-main-content .right_sidebar").css('right', '-220px');
		}
	})
	$(window).resize(function(){
		if ($(this).width() > 900) {
			$(".left-main-content").css('left', '0');
			$(".right-main-content .right_sidebar").css('right', '0');
		}else if ($(this).width() < 900) {
			$(".left-main-content").css('left', '-220px');
		}else if ($(this).width() > 768) {
			$(".left-main-content").css('left', '-220px');
			$(".right-main-content .right_sidebar").css('right', '0');
		}else if ($(this).width() < 768){
			$(".right-main-content .right_sidebar").css('right', '-220px');
		}
	})
	$('#tb_yes_controll').click(function(e){
		firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/notify").push({
			'content' : atob($("#tb_modal").attr('friend')),
			'type': $("#tb_modal").attr('type'),
			'time': getDateTimeNow(),
		})

	})
	for (var i = 0; i < 16; i++) {
		var left = (Math.random() * 9 + 10) * i + 10;
		var bottom = Math.random() * 300 + 250;
		var ranW = Math.random() * 45 + 40;
		var opacity = Math.random() / 4.4 + 0.5;
		var duration = Math.random() * 25 + 17;
		if (left > 96) { left = Math.random() * 63 + 10;}
		$("body").append('<div class="tb_bubbles" cur = "' + duration + '" style="opacity: ' + opacity  + ';bottom: -' + bottom +'px; left: calc('  + left + '% + 30px); width: ' + ranW +'px; height: ' + ranW +'px;animation-duration: ' + duration + 's"></div>');
	}
	$(".left-main-content .tb_cover .tb_notify, .left-main-content .tb_cover .friend_request").addClass('fast_animated');

	$("#tb_friend_request").click(function(e){
		e.preventDefault();
		$(".left-main-content .tb_cover .friend_request").css({
			'left' : $(this).offset().left - 50,
			'top' : $(this).offset().top + 48
		})
		if ($(".left-main-content .tb_cover .friend_request").css('display') == 'none') {
			$(".left-main-content .tb_cover .friend_request").show().addClass('fadeInLeft');
		}else{
			$(".left-main-content .tb_cover .friend_request").removeClass('fadeInLeft').hide({
				effect: 'slide',
				direction: 'left'
			})
		}
	})
	$("#tb_notify_controll").click(function(e){
		e.preventDefault();
		$(".left-main-content .tb_cover .tb_notify").css({
			'left' : $(this).offset().left - 50,
			'top' : $(this).offset().top + 48
		})
		if ($(".left-main-content .tb_cover .tb_notify").css('display') == 'none') {
			$(".left-main-content .tb_cover .tb_notify").show().addClass('fadeInLeft');
		}else{
			$(".left-main-content .tb_cover .tb_notify").removeClass('fadeInLeft').hide({
				effect: 'slide',
				direction: 'left'
			})
		}
	})

	$('[data-toggle="tooltip"]').tooltip({
		'placement' : 'bottom',
		'trigger' : 'hover',
		delay: { 
			"show": 200, 
			"hide": 160 
		}
	});


	$("#tb_chathub_logout").click(function(e){
		e.preventDefault();
		var that = $(this);
		firebase.auth().signOut().then(function() {
			location.href = that.attr('href');
		})
	})

	$(".left-main-content .menu .tb_gb").click(function(e){
		var that = $(this);
		if ($(this).siblings('.menu_child').css('display') == 'none') {
			$(this).siblings('.menu_child').slideDown();
			$(this).parent().find('.fa-angle-down').addClass('tb_down');
		}else{
			$(this).siblings('.menu_child').slideUp();
			$(this).parent().find('.fa-angle-down').removeClass('tb_down');

		}

	})
	
	function construct_notify(data){
		var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_notify_controll span.new_notify");
		t.text(data.length);
		var f = $(".tb_notify .tb_notify_header h6 span");
		f.text(data.length);
		checkEmpty();

		$(".tb_notify .tb_notify_body").html("");
		data.forEach(function(item){
			var arr = item.user.split(' ');
			if (item.type == "poke_friend") {
				$(".tb_notify .tb_notify_body").append(
					'<li class="d-flex " id="tb_notify_' + item.id + '" >'
					+ '<img src="'+  item.avatar + '" class="tb_round_image">' 
					+ '<div class="tb_notify_body_content poke" type="poke_friend">'
					+ '<div class="name">' +  arr[arr.length - 1] + ' poked you</div>'
					+ '<i class="fas fa-hand-point-right"></i><span class="fulltime">' + getFullTypeDate(item.created_at) +'</span>'
					+ '</div>'

					);
			}

		})
	}


	$(".fulltime").each(function(index, el) {
		$(this).text(" " + getFullTypeDate($(this).text().trim()));				
	});

	function display_message_in_room(friend,dataKey, val, first){
		if (val.type == 'send') {
			key = dataKey.substring(1, dataKey.length);
			if ($(".list_contact .list_contact_item").eq(0).html() == null) return;
			var current_contact = $(".list_contact .list_contact_item.actived .contact-img").attr('val');
			if (current_contact && friend == atob(current_contact) && !first) {
				if (val.for == firebase.auth().currentUser.uid) {
					if ($("#tb_send_friend_" + key).html() != null) return;
					var parent = $(".message_content .main-chat .chat-list");
					setTimeout(function(){
						if ($(".no-message") != null) {
							$(".no-message").slideUp();
							$(".no-message").siblings('hr').fadeOut();
						}	
						parent.append(
							'<li class="chat-item send-message" id="tb_send_friend_' + key + '" style = "display: none;">'
							+ '<div class="cover-content animated fadeInRight">' 
							+ '<img src="' + $(".user-details .image img").attr('src') + '" alt="" class="tb_round_image">'
							+ '<div class="content">'
							+ '<div class="text">'
							+ val.content
							+ '</div>'
							+ '<div class="time text-right " data-toggle="tooltip" data-placement="bottom" title="' + val.time +'">'
							+ change_type_date(val.time)		
							+'</div>'
							+'<div class="clearfix">'
							+'</div>'
							+'</div>'
							+ '</div>'
							+'</li>'
							)
						if (val.content.indexOf('type="tb_handle_background_js"') > 0) {
							$("#tb_send_friend_" + key + " .tb_handle_background_js").each(function() {
								get_size_and_amount_background_image($(this), 144, 'large');
							})
							$("#tb_send_friend_" + key + " .tb_handle_background_js").hover(function() {
								handle_hover_image($(this), 12, 144, 75);
							});
						}

						$(".chat-item.send-message").eq($(".chat-item.send-message").length - 1).slideDown(250);
						$("#tb_send_friend_" + key + "  .time").tooltip({'placement' : 'bottom'});

					}, 30)	

				}else{
					if(!check_member_in_room(val.for)){
						firebase.database().ref('rooms/' + friend + '/constructs/' + dataKey ).remove();
						return;
					}					
					if ($("#tb_request_friend_" + key).html() != null) return;

					var list_seen = JSON.parse(val.seen);
					if (list_seen == 0) {
						list_seen = [];
					}
					if (list_seen.indexOf(firebase.auth().currentUser.uid) < 0) {
						list_seen.push(firebase.auth().currentUser.uid);
						firebase.database().ref('rooms/' + friend + '/constructs/' + dataKey ).update({
							'seen' : JSON.stringify(list_seen),
						})
					}
					var parent = $(".message_content .main-chat .chat-list");

					setTimeout(function(){
						if ($(".no-message") != null) {
							$(".no-message").slideUp();
							$(".no-message").siblings('hr').fadeOut();
						}
						var current_mem = find_infor_member_in_room(val.for);
						parent.append(
							'<li class="chat-item request-message " id="tb_request_friend_' + key + '" style = "display: none;">'
							+ '<div class="cover-content animated fadeInLeft">' 
							+ '<img src="' + current_mem.avatar + '"  data-toggle="tooltip" data-placement="left" title="' + current_mem.name + '" alt="" class="tb_round_image">'
							+ '<div class="content">'
							+ '<div class="text">'
							+ '<p class="mess_from">' + current_mem.name + '</p>'
							+ val.content
							+ '</div>'
							+ '<div class="time text-right " data-toggle="tooltip" data-placement="bottom" title="' + val.time +'">'
							+ change_type_date(val.time)		
							+'</div>'
							+'</div>'
							+'</div>'
							+'</li>'
							)

						$("#tb_request_friend_" + key + " img").tooltip({
							'placement' : 'bottom'
						});
						if (val.content.indexOf('type="tb_handle_background_js"') > 0) {
							$("#tb_request_friend_" + key + " .tb_handle_background_js").each(function() {
								get_size_and_amount_background_image($(this), 144, 'large');
							})
							$("#tb_request_friend_" + key + " .tb_handle_background_js").hover(function() {
								handle_hover_image($(this), 12, 144, 75);
							});
						}

						$(".chat-item.request-message").eq($(".chat-item.request-message").length - 1).slideDown(250);

						if (val.content.indexOf("type='tb_send_image'") > 0) {
							$(".list_contact .list_contact_item.actived .contact-desc").html("Sent an image");
						}
						else if (val.content.indexOf('type="tb_handle_background_js"') > 0){
							$(".list_contact .list_contact_item.actived .contact-desc").html("Sent an sticker");
						}
						else {
							$(".list_contact .list_contact_item.actived .contact-desc").text(val.content);
						}
						$(".list_contact .list_contact_item.actived .time").text(change_type_date(val.time));

						truncat_message();
						$("#tb_request_friend_" + key + "  .time").tooltip({'placement' : 'bottom'});
					}, 30);
				}
				
				if (animateScrollChat) {
					setTimeout(function() {
						$(".right-main-content .message_content  .main-chat").animate({
							scrollTop: $(".right-main-content .message_content  .main-chat .chat-list").height() + 100
						}, 100);
					}, 280)

				}
			}else{
				if (val.type != 'send') return;
				var target = $(".list_contact .list_contact_item .contact-img[val = '" + window.btoa(friend) +  "']");
				var ct;
				if (val.content.indexOf("type='tb_send_image'") > 0) {
					ct = "Sent an image";
				}
				else if (val.content.indexOf('type="tb_handle_background_js"') > 0){
					ct = "Sent an sticker";
				}
				else {
					ct = val.content;
				}

				target.next().children('.contact-desc').html(ct);
				if (val.time != null) {
					target.next().children('.time').text(change_type_date(val.time));
				}
				truncat_message();
				var list_seen = JSON.parse(val.seen);
				if (list_seen == 0) {list_seen = []};
				if (val.for != firebase.auth().currentUser.uid && list_seen.indexOf(firebase.auth().currentUser.uid) < 0) {
					target.parent().addClass("flash");
					var count_message_target =  $("#tb_friend_" + friend + " .contact-content h5 span");
					var count_message = count_message_target.text();
					if (count_message) {
						count_message = parseInt(count_message.substr(1, count_message.length - 1));
					}else{
						count_message = 0;
					}	
					count_message++;
					if (count_message > 29) {
						count_message = '29+';
					}
					count_message_target.text("(" + count_message + ")");

					if (!target.parent().hasClass('notify')) {
						target.parent().addClass('notify');
					}
					setTimeout(function()  {
						target.parent().removeClass("flash");
					}, 1500);


					$("#alert_new_message").attr('src', base_public + 'music/alert.mp3');
					alert_new_message.play();
				}
			}
		}
	}
	function tb_getSeconds(time1, time2){
		return Math.abs(Math.floor((new Date(time1) - new Date(time2))/1000));
	}
	function load_room(room_id, room_name, thumbnail, role, time){
		animateScrollChat = false;
		currentTypeContact = 'room';
		current_friend = room_id;
		$.ajax({
			url: base + '/ajax_load_room',
			type: "POST",
			data: {
				id: room_id,
				name: room_name,
				thumbnail: thumbnail,
				role: role,
				time: time,
			},
			success: function(data){
				$(".right-main-content .message_content .center_cover").html(data);
				var ti = $(".right-main-content .message_content .tb_cover .card-header p.notify span");

				ti.text(getFullTypeDate(parseInt(time)));
				ownerRoom = $(".right-main-content .right_sidebar .list_contact_item .contact-img").attr('own');
				var first = 0;

				var getRoomMessage = tb_firebase.database.ref('rooms/' + room_id + '/constructs/');

				slideIndex = 0;
				$(".list_contact_item.actived .contact-content h5 span").text('');
				if ($(".right-main-content .right_sidebar .share_resoure").hasClass('slick-slider')) {
					$(".right-main-content .right_sidebar .share_resoure").slick('unslick');
				}
				$(".right-main-content .right_sidebar .share_resoure").html('');
				$(".right-main-content .right_sidebar .share_resoure").slick({
					slidesToShow: 2,
					slidesToScroll: 2,
					autoPlay: true,
					lazyLoad: 'ondemand',
					autoplay: true,
					autoplaySpeed: 12000,
					swipeToSlide: true,
				})

				if ($("#tb_show_slide").hasClass('slick-slider')) {
					$("#tb_show_slide").slick('unslick');
				}
				$("#tb_show_slide").html('');
				$("#tb_show_slide").slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows: true,
					autoplay: false,
					lazyLoad: 'ondemand',
					swipeToSlide: true,
					responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: true,
							slidesToShow: 1,
							lazyLoad: 'ondemand',
							swipeToSlide: true,
							dots: true,
						}
					},
					]
				});
				
				$(".send .send-content .cover #summernote-send").val('');

				var shareRef = tb_firebase.database.ref('rooms/' + room_id + '/share_image');
				shareRef.off();
				var callShareImage = function(snap){
					if ($(".right-main-content .right_sidebar .share_resoure").hasClass('slick-slider')) {
						var construct = '<img data-lazy="' +  snap.val().src  + '" alt="" />';
						slideIndex++;
						$(".right-main-content .right_sidebar .share_resoure").slick('slickAdd', 
							'<li class="share_resoure_item" val="' + slideIndex + '" id="tb_image_' + snap.key + '">' +  construct  + '</li>');
						$("#tb_show_slide").slick('slickAdd', '<li class="tb_show_slide_item" >' + construct + '</li>');
						$("#tb_image_" + snap.key).click(function(event) {
							$(".tb_cover_slide").fadeIn();
							$("#tb_show_slide").slick('slickGoTo', Number($(this).attr('data-slick-index')));
						});
					}
				}
				shareRef.on('child_added', callShareImage);

				var callbackMessage = function(snap){
					setTimeout(function(){
						display_message_in_room(room_id,snap.key, snap.val(), false);
					}, 30);
				}
				getRoomMessage.off();
				getRoomMessage.orderByChild('time').limitToLast(30).on('child_added', callbackMessage);


				var member =  tb_firebase.database.ref('rooms/' + room_id + '/members');
				var wait_member = tb_firebase.database.ref('rooms/' + room_id + '/wait_members');

				var calWaitMember = function(sp){
					list_wait_room = JSON.parse(sp.val());
					for (var i = 0; i < list_wait_room.length; i++) {
						$("#add_mem_" + list_wait_room[i]).parent().append('<i class="fas fa-reply" style="color: #ff8c00"></i>')
						$("#add_mem_" + list_wait_room[i]).remove();
					}
				}
				wait_member.off();
				wait_member.on('child_added', calWaitMember);
				wait_member.on('child_changed', calWaitMember);

				var calMember = function(data){
					list_member_in_room = JSON.parse(data.val());
					$(".right-main-content .message_content .tb_cover .card-header img").attr('val', data.val());
					var interval = function(){
						tb_timer = new Array(list_member_in_room.length);
						for (let h = 0; h < tb_timer.length; h++) {
							if (list_member_in_room[h].uid != firebase.auth().currentUser.uid) {
								tb_timer[h] = setInterval(function(){
									if (typeof list_member_in_room[h].uid === 'undefined' || currentTypeContact == 'friend') {return;}
									var ping = firebase.database().ref('users/' + list_member_in_room[h].uid + '/ping/' + current_friend);
									ping.off();
									ping.update({
										'from' : 'room',
										'time' : new Date().getTime(),
									}).then(function() {
										setTimeout(function(){
											var t_now = new Date().getTime();
											if (typeof list_member_in_room[h].uid === 'undefined') {return;}
											var getPong = firebase.database().ref('rooms/' + current_friend + '/pong/' + list_member_in_room[h].uid);

											var checkPong = function(snap){
												if (!list_member_in_room[h].uid) {return;}
												if(tb_getSeconds(t_now, snap.val()) == null || tb_getSeconds(t_now, snap.val()) > 5){
													$("#tb_member_in_room_" + list_member_in_room[h].uid).addClass('offline').removeClass('online');
													$("#tb_member_in_room_" + list_member_in_room[h].uid).find('.contact-status').addClass('offline').removeClass('online');
												}else{
													$("#tb_member_in_room_" + list_member_in_room[h].uid).addClass('online').removeClass('offline');
													$("#tb_member_in_room_" + list_member_in_room[h].uid).find('.contact-status').addClass('online').removeClass('offline');
												}
												getOnlineRoom();
											}
											getPong.off();
											getPong.on('child_added', checkPong);
											getPong.on('child_changed', checkPong);
										}, 2000)
									});

								}, 5500);
							}
						}

					}
					for (var j = 0; j < tb_timer.length; j++) {
						clearInterval(tb_timer[j]);
						if (j == tb_timer.length - 1) {
							interval();
						}
					}
					if (tb_timer.length == 0) {
						interval();
					}
					$(".right-main-content .message_content .tb_cover .member_in_room .card-body .list_member").html('');

					list_member_in_room.forEach(function(item) {
						var classMem = "offline";
						if (item.uid == firebase.auth().currentUser.uid) {
							classMem = "online"; 
						}
						var show = '<i class="fas fa-ellipsis-h"></i>';
						if (item.uid == firebase.auth().currentUser.uid || ownerRoom == item.uid) {
							show = ""; 
						}
						if (ownerRoom == item.uid) {
							$(".right-main-content .message_content .tb_cover .member_in_room .card-body .list_member").append(
								'<li class="list_member_item d-flex ' + classMem + '" id="tb_member_in_room_' + item.uid + '" val="' + btoa(item.uid) + '">'
								+ '<div class="contact_img">'
								+	'<img src="' + item.avatar + '" class="tb_round_image " alt="">'
								+ 	'<div class="contact-status ' + classMem + '">'
								+	'</div>'
								+ 	'</div>'
								+   '<h5 class="owner">' + item.name + '<span>Owner</span></h5>'
								+ show
								+ 	'</li>'
								)
						}else{
							var show = '<i class="fas fa-ellipsis-h"></i>';
							if (item.uid == firebase.auth().currentUser.uid) {
								var show = ""; 
							}
							$(".right-main-content .message_content .tb_cover .member_in_room .card-body .list_member").append(
								'<li class="list_member_item d-flex ' + classMem + '" id="tb_member_in_room_' + item.uid + '" val="' + btoa(item.uid) + '">'
								+ '<div class="contact_img">'
								+	'<img src="' + item.avatar + '" class="tb_round_image " alt="">'
								+ 	'<div class="contact-status ' + classMem + '">'
								+	'</div>'
								+ 	'</div>'
								+   '<h5>' + item.name + '</h5>'
								+  show
								+ 	'</li>'
								)
						}
						$("#tb_member_in_room_" + item.uid + " i").click(function(e){
							var tb_that = $(this);
							var real = atob($(this).parent().attr('val'));
							current_mem_in_room = real;
							if (tb_list_friend.indexOf(real) >= 0 || tb_wait_request >= 0) {
								$("#add_friend_in_room").hide();
								if (ownerRoom != firebase.auth().currentUser.uid ) {
									return;
								}
							}else{
								$("#add_friend_in_room").show();
							}
							if ($("#controll_in_room").css('display') == 'none') {
								var sT = $(".right-main-content .message_content .tb_cover .member_in_room .card-body").scrollTop();
								$(".right-main-content .message_content .tb_cover .member_in_room .card-body").attr('scroll', sT);
								$(".right-main-content .message_content .tb_cover .member_in_room .card-body").scroll(handleScrollTop);
								$("#controll_in_room").css({
									top: (e.clientY  + 18) + 'px',
									left: (e.clientX - 84) + 'px',
									bottom: 'none',
								})

								$("#controll_in_room").fadeIn();
							}else{
								$(".right-main-content .message_content .tb_cover .member_in_room .card-body").off('scroll',handleScrollTop);
								$("#controll_in_room").fadeOut();
							}
						})

					})
					getOnlineRoom();
					first++;
					if (first == 1) {
						$("#kick_out").click(function(e){
							swal({
								title: 'Are you sure?',
								text: "You want to kick " +  $("#tb_member_in_room_" + current_mem_in_room + " h5").text() + " of the room!",
								type: 'warning',
								showCancelButton: true,
								confirmButtonColor: 'rgb(221, 107, 85);',
								cancelButtonColor: '#aaa',
								confirmButtonText: 'Yes, kick out!',
								animation: false,
								customClass: 'animated fadeInDown fast_animated',
							}).then(function(result){
								if (result.value) {
									firebase.database().ref('rooms/' + room_id + "/members").update({
										member: JSON.stringify(remove_member_in_room(current_mem_in_room)),
									})
									firebase.database().ref('users/' + current_mem_in_room + '/rooms/' + room_id).remove();
									toastr["info"]("Kick out successful!");
								}
							})
						})
						$(".right-main-content .message_content .tb_cover .card-header .information #controll_button_target li").click(function(event) {
							if ($(this).attr('type') == 'leaveRoom') {
								swal({
									title: 'Are you sure?',
									text: "You want to leave room!",
									type: 'warning',
									showCancelButton: true,
									confirmButtonColor: 'rgb(221, 107, 85);',
									cancelButtonColor: '#aaa',
									confirmButtonText: 'Yes, leave room!',
									animation: false,
									customClass: 'animated fadeInDown fast_animated',
								}).then(function(result){
									if (result.value) {
										firebase.database().ref('rooms/' + room_id + "/members").update({
											member: JSON.stringify(remove_member_in_room(firebase.auth().currentUser.uid)),
										})
										firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/rooms/' + room_id).remove();
									}
								})
							}else if ($(this).attr('type') == 'removeRoom'){
								swal({
									title: 'Are you sure?',
									text: "You want to remove room!",
									type: 'warning',
									showCancelButton: true,
									confirmButtonColor: 'rgb(221, 107, 85);',
									cancelButtonColor: '#aaa',
									confirmButtonText: 'Yes, remove this room!',
									animation: false,
									customClass: 'animated fadeInDown fast_animated',
								}).then(function(result){
									if (result.value) {
										for (var i = 0; i < list_member_in_room.length; i++) {
											firebase.database().ref('users/' + list_member_in_room[i].uid + '/rooms/' + current_friend).remove();
											if (i == list_member_in_room.length - 1){
												firebase.database().ref('rooms/' + current_friend ).remove();
												toastr["info"]("Remove successful!");
											}
										}
									}
								})
							}else{
								$("#setting_btn").click();
							}
						});
					}
					$.ajax({
						url: base + "/search_friend",
						type: 'POST',
						data: {
							queryF: queryFriend + " and user like '%'",
						},
						success: function(data){
								// console.log(data);
								// console.log(list_member_in_room);
								$("#invite_button_search_target").html('');
								data.forEach(function(item){
									var icon = '<i class="add_member fas fa-plus-circle" id="add_mem_' + item.uid + '"></i>';
									if (check_member_in_room(item.uid)) {
										icon = '<i class="fas fa-check-circle"></i>';
									}
									if ( list_wait_room.indexOf(item.uid) >= 0) {
										icon = '<i class="fas fa-reply" style="color: #ff8c00"></i>';
									}
									$("#invite_button_search_target").append(
										'<li class="invite_button_search_target_item">'
										+	'<img src="' + item.avatar +  '" class="tb_round_image" alt="">'
										+	'<h5>' + item.user + '</h5>'
										+	icon
										+	'</li>'
										)

									$("#add_mem_" + item.uid).click(function(){
										var user_name = $(".left-main-content  .menu .user-details .name").attr('fullname').split(" ");
										list_wait_room.push(item.uid);
										tb_firebase.database.ref('rooms/' + room_id + '/wait_members').update({
											'wait' : JSON.stringify(list_wait_room)
										});

										tb_firebase.database.ref('users/' + item.uid + '/notify').push({
											content: room_id,
											name: room_name,
											avatar: $(".left-main-content .menu .user-details .image img").attr('src'),
											user: user_name[user_name.length - 1],
											time: getDateTimeNow(),
											type: 'invite_room',
										});
										$(this).parent().append('<i class="fas fa-reply" style="color: #ff8c00"></i>')
										$(this).remove();
									})
								})

							}
						})
				}
				member.off();

				member.on('child_added', calMember);
				member.on('child_changed', calMember);
				member.on('child_removed', calMember);

				var queryFriend = "";
				for (var i = 0; i < tb_list_friend.length; i++) {
					if (i==0) {
						queryFriend += " where ";
						queryFriend += " uid = '" + tb_list_friend[i] + "'";
					}
					else{
						queryFriend += " or uid = '" + tb_list_friend[i] + "'";
					}
				}
				setTimeout(function() {
					$(".right-main-content .message_content .tb_cover .main-chat").animate({
						scrollTop: $(".right-main-content .message_content .tb_cover .main-chat .chat-list").height() + 1000
					}, 0);
					setTimeout(function(){
						animateScrollChat = true;
					}, 430);
				}, 1100)

				$("#invite_button_search").keyup(function(e){
					var that = $(this);
					$("#invite_button_search_target li").each(function(index, el) {
						if ($(this).children('h5').text().trim().toLowerCase().indexOf(that.val().toLowerCase()) >= 0) {
							if ($(this).css('display') == 'none') {
								$(this).fadeIn();
							}
						}else{
							if ($(this).css('display') == 'flex') {
								$(this).fadeOut();
							}
						}							
					});

				})
			}
		})

}
function handleScrollTop(){
	$(".right-main-content .message_content .tb_cover .member_in_room .card-body").scrollTop(Number($(this).attr( 'scroll')));
}
function getOnlineRoom() {
	$(".right-main-content .message_content .member_in_room .card-header span").text($(".right-main-content .message_content .member_in_room .list_member_item.online").length + "/" + $(".right-main-content .message_content .member_in_room .list_member_item").length)
}
function find_infor_member_in_room(uid){
	for (var i = 0; i < list_member_in_room.length; i++) {
		if (list_member_in_room[i].uid == uid) {
			return list_member_in_room[i];
		}
	}
}
function remove_wait_member(uid){
	var x = list_wait_room.indexOf(uid);
	if (x >= 0) {
		list_wait_room.splice(x, 1);
	}
	return list_wait_room;
}
function check_member_in_room(uid){
	for (var i = 0; i < list_member_in_room.length; i++) {
		if (list_member_in_room[i].uid == uid) {
			return true;
		}
	}
	return false;
}
function remove_member_in_room(uid){
	for (var i = 0; i < list_member_in_room.length; i++) {
		if (list_member_in_room[i].uid == uid) {
			list_member_in_room.splice(i, 1);
			return list_member_in_room;
		}
	}
}
function load_message(id){
	current_friend = id;
	currentTypeContact = 'friend';
	animateScrollChat = false;
	for (var j = 0; j < tb_timer.length; j++) {
		clearInterval(tb_timer[j]);
	}
	$(".right-main-content .message_content .center_cover").load(base + '/ajax_load_message/' + id,function(){

		slideIndex = 0;
		$(".list_contact_item.actived .contact-content h5 span").text('');
		if ($(".right-main-content .right_sidebar .share_resoure").hasClass('slick-slider')) {
			$(".right-main-content .right_sidebar .share_resoure").slick('unslick');
		}
		$(".right-main-content .right_sidebar .share_resoure").html('');
		$(".right-main-content .right_sidebar .share_resoure").slick({
			slidesToShow: 2,
			slidesToScroll: 2,
			autoPlay: true,
			lazyLoad: 'ondemand',
			autoplay: true,
			autoplaySpeed: 12000,
			swipeToSlide: true,
		})

		if ($("#tb_show_slide").hasClass('slick-slider')) {
			$("#tb_show_slide").slick('unslick');
		}
		$("#tb_show_slide").html('');
		$("#tb_show_slide").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
			autoplay: false,
			lazyLoad: 'ondemand',
			swipeToSlide: true,
			responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: true,
					slidesToShow: 1,
					lazyLoad: 'ondemand',
					swipeToSlide: true,
					dots: true,
				}
			},
			]
		});
		
		$(".send .send-content .cover #summernote-send").val('');
		var shareRef = tb_firebase.database.ref('users/' + firebase.auth().currentUser.uid + '/friends/' + atob(id) + '/share_image');
		shareRef.off();
		var callShareImage = function(snap){
			if ($(".right-main-content .right_sidebar .share_resoure").hasClass('slick-slider')) {
				var construct = '<img data-lazy="' +  snap.val().src  + '" alt="" />';
				slideIndex++;
				$(".right-main-content .right_sidebar .share_resoure").slick('slickAdd', 
					'<li class="share_resoure_item" val="' + slideIndex + '" id="tb_image_' + snap.key + '">' +  construct  + '</li>');
				$("#tb_show_slide").slick('slickAdd', '<li class="tb_show_slide_item" >' + construct + '</li>');
				$("#tb_image_" + snap.key).click(function(event) {
					$(".tb_cover_slide").fadeIn();
					$("#tb_show_slide").slick('slickGoTo', Number($(this).attr('data-slick-index')));
				});
			}
		}
		shareRef.on('child_added', callShareImage);

		tb_firebase.getMessageFriend(id);
		$('#controll_button_target').attr('val', id);

		$(".right-main-content  .main-chat .chat-list .fulltime").text($(".list_contact .list_contact_item.actived .time").attr('time'));


		$(".right-main-content .message_content .time").each(function(index, el) {
			$(this).text(change_type_date($(this).text()));
		});
		$(".right-main-content .message_content .time").tooltip({'placement' : 'bottom'});

		$(".right-main-content .message_content .fulltime").each(function(index, el) {
			$(this).text(" " + getFullTypeDate($(this).text().trim()));				
		});
		setTimeout(function(){
			if (currentTypeContact == 'friend') {

				if ($(".right-main-content .become-friend.no-message").html() == null && $(".right-main-content  .main-chat .chat-list li.send-message").length == 0 && $(".right-main-content  .main-chat  .chat-list li.request-message").length == 0 ) {
					var n = $(".right-main-content .card-header .information h5").text();
					$(".right-main-content .message_content .tb_cover .main-chat .chat-list").append(
						'<li class="chat-item become-friend no-message">'
						+ '<div class="text text-center" style="color: #f1f1f1;">'
						+ '<p>You re no message with ' + n +'</p>'
						+ '<div class="wave_friend" style="background: url(' + base_public + '/uploads/icon2.png ) no-repeat;"></div>'
						+ '<p>Now, say "Hello" to ' + n + '</p>'

						+ '<button type="button" class="btn btn-primary " id = "btn-wave">Wave</button>'
						+ '</div>'
						+ '</li>'
						+ '<hr>'
						)
				}
				$("#btn-wave").click(function(){
					var that = $(this);
					var parent = that.parent().parent().parent();

					var tid = atob(current_friend); 
					var getTime = getDateTimeNow();
					var content = 'Hello';
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + tid + '/messages').push({
						'type' : 'send',
						'content' : content,
						'time' : getTime,
						'seen' : '0'
					})
					firebase.database().ref('users/' + tid + '/friends/' + firebase.auth().currentUser.uid + '/messages').push({
						'type' : 'request',
						'content' : content,
						'time' : getTime,
						'seen' : '0'
					})
					parent.children('hr').fadeOut();
					that.parent().parent().slideUp();

				})
			}
		}, 1000);

		$(".right-main-content .right_sidebar .no-friend a").click(function(e){
			e.preventDefault();
			$("#tb_search_friend").focus();
		})


		$(".send .send-content .cover #summernote-send").attr('btoa', id);
		setTimeout(function(){
			$(".right-main-content .message_content .tb_cover .main-chat").animate({
				scrollTop: $(".right-main-content .message_content .tb_cover .main-chat .chat-list").height() + 1000
			}, 0);
			setTimeout(function() {
				animateScrollChat = true;
			}, 400);
		}, 1100);

	})
}

$(".time").each(function(index, el) {
	if ($(this).text().trim() != "...") {
		$(this).text(change_type_date($(this).text()));
	}
})	
function change_type_date(string_date){
	var d = new Date(string_date.trim());

	var hours ;
	var minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
	var seconds = d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds();
	if (d.getHours() > 12) {
		hours = (d.getHours() - 12) + ":" + minute + ":" + seconds  + " pm"
	}else{
		hours = d.getHours() + ":" + minute+ ":" + seconds + " am"
	}
	return hours;
}	
function getFullTypeDate(string_date){
	var d = new Date(string_date);

	var hours ;
	var minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
	if (d.getHours() > 12) {
		hours = (d.getHours() - 12) + ":" + minute   + "PM"
	}else{
		hours = d.getHours() + ":" + minute + "AM"
	}

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dt = d.getDate() + "";

	switch(dt[dt.length - 1]){
		case "1" :
		dt = dt + "st";
		break;
		case "2" :
		dt = dt + "nd";
		break;
		case "3" :
		dt = dt + "rd";
		break;
		default:
		dt = dt + "th";
		break;
	}

	return months[d.getMonth()].substring(0, 3) + " " + dt + ", " + hours;
}
function getDateTimeNow(){
	var d = new Date();

	return d.getFullYear() + "-" + updateType(d.getMonth() + 1)  + "-" + updateType(d.getDate()) + " " 
	+ updateType(d.getHours()) + ":" + updateType(d.getMinutes()) + ":" + updateType(d.getSeconds());
}

function updateType(num){
	return num > 9 ? num : '0' + num; 
}
truncat_message();
function truncat_message() {
	$(".tb_truncat_message").each(function(index, el) {
		if ($(this).text().trim().length > 18) {
			$(this).text($(this).text().trim().substring(0, 18) + "...");
		}
	});
}

$(".right_sidebar .list_contact_item").click(function(){
	var id = $(this).children(".contact-img").attr('val');
	$(".right_sidebar .list_contact_item").removeClass('actived');
	$(this).removeClass("flash").removeClass("notify").addClass('actived');
	if ($(this).attr('type') != 'room') {
		load_message(id);
	}
})	



$(".send .send-content .cover #summernote-send").keyup(function(e){
	if (e.key == 'Enter') {send_message();}
})

new PerfectScrollbar(".cover_body_icon1");
new PerfectScrollbar(".cover_body_icon2");

setTimeout(function() {
	$(".add_emotion").click();$(".add_sticker").click();
}, 3200)
$(".add_emotion").click(function(e){
	e.preventDefault();
	if ($(".tb_emotion").css('display') == 'none') {
		$(".tb_sticker").slideUp();
		$(".tb_emotion").slideDown();

	}else{
		$(".tb_emotion").slideUp();
	}
});
$(".add_sticker").click(function(e){
	e.preventDefault();
	if ($(".tb_sticker").css('display') == 'none') {
		$(".tb_emotion").slideUp();
		$(".tb_sticker").slideDown();
	}else{
		$(".tb_sticker").slideUp();
	}
});
$(".tb_emotion .show_icon_category").click(function(e){
	tb_get_icon($(this), 'emotion');
})
$(".tb_sticker .show_icon_category").click(function(e){
	tb_get_icon($(this), 'sticker');
})
function tb_get_icon(that, parent){
	if (parent == 'emotion') {
		$(".tb_emotion .card-body .cover_body_icon").html('');
	}else{
		$(".tb_sticker .card-body .cover_body_icon").html('');
	}

	$(".show_icon_category").removeClass('actived');
	that.addClass('actived');
	$.ajax({
		url: base + "/icon/tb_get_icon",
		type: "POST",
		data:{
			cat_id : atob(that.attr('val'))
		},
		success: function(data){
			var tid = 0, getTime = getDateTimeNow();
			if (current_friend != '0' ) {
				tid = current_friend;
			}
			if (that.attr('type') == 'text') {
				data.forEach(function(item) {
					$(".tb_emotion .card-body .cover_body_icon").append(
						'<div class="cover_body_icon_item animated bounceIn" id="tb_icon_' + item.id + '">'
						+ '<div class="cover_body_icon_text">' + decodeURI(item.content) + '</div>'
						+ '</div>'
						)
					$("#tb_icon_" + item.id).click(function(e){

						$(".send .send-content .cover .note-placeholder").fadeOut();
						$(".send .send-content .cover #summernote-send").val($(".send .send-content .cover #summernote-send").val() + $(this).text());
					})
				});

				$(".tb_emotion .card-body .cover_body_icon").animate({
					scrollTop: '1000px'	
				});
			}

			if (that.attr('type') == 'image') {
				data.forEach(function(item) {
					$(".tb_sticker .card-body .cover_body_icon").append(
						'<div class="cover_body_icon_item cover_body_icon_image animated bounceIn" id="tb_icon_' + item.id + '">'
						+ '<img src="' +  item.content + '" alt="">'
						+ '</div>'
						)
					$("#tb_icon_" + item.id).click(function(e){
						if (tid == 0) return;
						if (current_friend != '0' && currentTypeContact =='friend') {
							tid = atob(current_friend);
						}
						var c = "<p type='tb_send_image'><img class='tb_small_image' src= '" + $(this).children('img').attr('src') +  "' /></p>";

						if (currentTypeContact == 'friend') {
							firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + tid + '/messages').push({
								'type' : 'send',
								'content' : c,
								'time' : getTime,
								'seen' : '0'
							})
							firebase.database().ref('users/' + tid + '/friends/' + firebase.auth().currentUser.uid + '/messages').push({
								'type' : 'request',
								'content' : c,
								'time' : getTime,
								'seen' : '0'
							})
						}else{
							firebase.database().ref('rooms/' + current_friend + '/constructs/').push({
								'type' : 'send',
								'content' : c,
								'for' : firebase.auth().currentUser.uid,
								'time' : getTime,
								'seen' : '0'
							})
						}
					})

				});
				$(".tb_sticker .card-body .cover_body_icon").animate({
					scrollTop: '1000px'	
				});

			}
			if (that.attr('type') == 'handle_background_js') {

				data.forEach(function(item) {
					$(".tb_sticker .card-body .cover_body_icon").append(
						'<div class="cover_body_icon_item cover_body_icon_handlejs animated bounceIn" id="tb_icon_' + item.id + '" amount="' + item.amount + '" checkFirst = "false" tb_val ="' + btoa( item.content) + '" style="background-image: url('  + item.content +');">'
						+ '</div>'
						)
					$("#tb_icon_" + item.id).click(function(e){
						if (tid == 0) return;
						if (current_friend != '0' && currentTypeContact =='friend') {
							tid = atob(current_friend);
						}
						var c = '<div type="tb_handle_background_js" class="tb_handle_background_js " amount="' + $(this).attr('amount') + '" checkFirst = "false" style="background-image: url(' + atob($(this).attr('tb_val')) +');">'
						+ '</div>';

						if (currentTypeContact == 'friend') {
							firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + tid + '/messages').push({
								'type' : 'send',
								'content' : c,
								'time' : getTime,
								'seen' : '0'
							})
							firebase.database().ref('users/' + tid + '/friends/' + firebase.auth().currentUser.uid + '/messages').push({
								'type' : 'request',
								'content' : c,
								'time' : getTime,
								'seen' : '0'
							})
						}else{
							firebase.database().ref('rooms/' + current_friend + '/constructs/').push({
								'type' : 'send',
								'content' : c,
								'for' : firebase.auth().currentUser.uid,
								'time' : getTime,
								'seen' : '0'
							})
						}
					})
				});
				$(".tb_sticker .card-body .cover_body_icon").animate({
					scrollTop: '1000px'	
				});
				$(".tb_sticker .cover_body_icon_handlejs").each(function() {
					get_size_and_amount_background_image($(this), 144, 'small');
				})
				$(".tb_sticker .cover_body_icon_handlejs").hover(function() {
					handle_hover_image($(this),  6, 72, 85);
				});


			}

		}
	});
}
function getMeta(url, callback) {
	var img = new Image();
	img.src = url;
	img.onload = function() { callback(this.width, this.height); }
}

function get_size_and_amount_background_image(that, cell_background_size, type_size){
	var src_bg = that.css('background-image').substring(5, that.css('background-image').length -2);
	getMeta(src_bg,function(width, height) { 

		new_width = parseInt(width / cell_background_size) * cell_background_size;
		new_height = parseInt(height / cell_background_size) * cell_background_size;
		if (type_size == 'small'  && width < 1800) {
			that.css('background-size', new_width / 2 + 'px ' + new_height / 2 + 'px'); 
		}
		else if (type_size == 'small' && width > 1800){
			that.css('background-size', new_width / 4 + 'px ' + new_height / 4 + 'px'); 
		}
		else{
			if (width > 1800) {
				that.css('background-size', new_width /2 + 'px ' + new_height /2 + 'px'); 

			}else{
				that.css('background-size', new_width + 'px ' + new_height + 'px'); 

			}
		}
	});
}
function handle_hover_image(that, first_background_pos, decrement_pos, speed, time){
	if (that.attr('checkFirst') == 'false') {
		that.attr('checkFirst', 'true');
		if(time == null){
			that.attr('time', '5');
		}else{
			that.attr('time', time);
		}

		var timer = setInterval(function() {
			var x = parseFloat(that.css('background-position').split(' ')[0]);

			var y = parseFloat(that.css('background-position').split(' ')[1]);

			var sizeX = parseFloat(that.css('background-size').split(' ')[0]);

			var sizeY = parseFloat(that.css('background-size').split(' ')[1]);

			x -= decrement_pos;
			if (x <= -sizeX) {
				y -= decrement_pos;
				x = -first_background_pos;
			}
			if (y <= -sizeY) {
				y = -first_background_pos;
			}
			if ((Math.abs(Math.round((y / decrement_pos) - 1)) == (sizeY / decrement_pos)) && Math.abs(Math.round((x / decrement_pos) - 1)) == (Number(that.attr('amount')) - (sizeX / decrement_pos) * (sizeY / decrement_pos - 1)))  {
				x = -first_background_pos;
				y = -first_background_pos;

				var c = parseInt(that.attr('time'));
				c--;
				that.attr('time', c);
			}

			if (that.attr('time') == '0') {
				that.css({
					'background-position': -first_background_pos + "px " + -first_background_pos + "px", 
				});
				that.attr('checkFirst', 'false');
				clearInterval(timer);

			}
			that.css({
				'background-position': x + "px " + y + "px", 
			})
		}, speed);
	}

}

function copyToClipboard(string) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(string).select();
	document.execCommand("copy");
	$temp.remove();
}
$(".right-main-content .message_content .send .send-button button[type='tb']").click(function(){
	var that = $(this);
	that.css({
		'transform': 'scale(0.95)',
	});
	setTimeout(function() {
		that.css({
			'transform': 'scale(1)',
		});
	}, 300)

	if ($(this).hasClass('add_message')) {
		send_message();
	}
})

function send_message(){
	if(current_friend == '0') return;

	var tid;
	if (currentTypeContact == 'friend') {
		tid = atob(current_friend); 
	}
	var getTime = getDateTimeNow();
	if ($(".right-main-content .message_content  .extendsion_image").attr('active') == "true") {
		$(".right-main-content .message_content  .extendsion_image").attr('active', 'false').removeClass('slideInUp').slideUp();
		setTimeout(function() {
			$(".right-main-content .message_content  .extendsion_image").hide();
		}, 300);
		$(".right-main-content .message_content .center_cover").css({
			'height' : 'calc(100% - 80px)'
		});


		$.ajax({
			url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
			type: "POST",
			data: send_image_form_data,
			processData: false,
			contentType: false,
			success: function(data){
				var url = data.secure_url;
				url = url.substring(0, url.indexOf('upload/') + 7) + "c_scale,o_100,q_auto:eco,w_658,z_0.4/" 
				+ url.substring(url.indexOf('upload/') + 7, url.length) ;
				var c = "<p type='tb_send_image'><img src= '" + url +  "' /></p>";


				if (currentTypeContact == 'friend') {
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + tid + '/messages').push({
						'type' : 'send',
						'content' : c,
						'time' : getTime,
						'seen' : '0'
					})
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + tid + '/share_image').push({
						src: url,
					})
					firebase.database().ref('users/' + tid + '/friends/' + firebase.auth().currentUser.uid + '/messages').push({
						'type' : 'request',
						'content' : c,
						'time' : getTime,
						'seen' : '0'
					})
					firebase.database().ref('users/' + tid + '/friends/' + firebase.auth().currentUser.uid + '/share_image').push({
						src: url,
					})
				}else{
					firebase.database().ref('rooms/' + current_friend + '/constructs/').push({
						'type' : 'send',
						'content' : c,
						'for' : firebase.auth().currentUser.uid,
						'time' : getTime,
						'seen' : '0'
					})
					firebase.database().ref('rooms/' + current_friend + '/share_image/').push({
						src: url,
					})
				}

			}
		})

	}

	var content = $(".send .send-content .cover #summernote-send").val();
	content = content.trim();
	content = content.replace(/(<p><br><\/p>)|(<p>)|(<\p>)/gi, '');
	content = content.replace(/<br>/gi, '');
	content = content.replace(/(<script>)|(<\/script>)/gi, '');

	setTimeout(function() {
		$(".send .send-content .cover #summernote-send").val( '');
	}, 0);

	if (content == '') {
		return;
	}
	$("#tb_visual_message").html(content);

	content = getLink($("#tb_visual_message").text()).trim();
	content = content.replace(/(&gt;)|(&lt;)/gi, '');
	if (content == '' || content == ' ') {
		return;
	}
	if (currentTypeContact == 'friend') {

		firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + tid + '/messages').push({
			'type' : 'send',
			'content' : content,
			'time' : getTime,
			'seen' : '0'
		})
		firebase.database().ref('users/' + tid + '/friends/' + firebase.auth().currentUser.uid + '/messages').push({
			'type' : 'request',
			'content' : content,
			'time' : getTime,
			'seen' : '0'
		})
	}else{
		firebase.database().ref('rooms/' + current_friend + '/constructs/').push({
			'type' : 'send',
			'content' : content,
			'for' : firebase.auth().currentUser.uid,
			'time' : getTime,
			'seen' : '0'
		})
	}

}

function getLink(string){

	string = string.replace(/<p>/gi, '');

	string = string.replace(/<\/p>/gi, '');
	string = string.replace(/\s/gi, '&nbsp;');


	var arr = string.split('&nbsp;');

	for (var i = 0; i < arr.length; i++) {
		var res = arr[i].match(/^(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		if (res != null) {
			arr[i] = " <a href ='" + arr[i] + "'>" + arr[i] + "</a> ";
		}
	}
	return arr.join(' ') ;
}
$("#tb_search_friend").keyup(function(e){
	if ($(this).val().trim() != "") {
		$.ajax({
			url: base + "/search_user",
			type: 'GET',
			data: {
				like: $(this).val().trim(),
				field: 'name'
			},
			success: function(data){

				var contruct = "";

				if (data.length == 0) {
					$(".right-main-content .right_sidebar .list_search").html(
						'<li class="list_search_item animated fadeInUp" >'
						+'<div class="contact-content">'
						+'<h5 class="message-title" style="width: 152px;text-align: center;">No result found</h5>'

						);
					return;
				}
				data.forEach(function(item) {
					if (firebase.auth().currentUser.uid && item.uid == firebase.auth().currentUser.uid) return;
					if (item.avatar == "uploads/avatar/default.jpg") { 
						item.avatar = base_public + item.avatar;
					}
					contruct += 
					'<li class="list_search_item animated fadeInUp" >'
					+ '<span class="contact-img">'
					+'<img src="' +  item.avatar   + '" alt="user" class="tb_round_image">'
					+'</span>'
					+'<div class="contact-content">'
					+'<h5 class="message-title">' + item.user + '</h5>';

					if (tb_list_friend.indexOf(item.uid) < 0) {
						if (tb_wait_request.indexOf(item.uid) >= 0) {
							contruct  += '<i class="fa fa-reply-all wait-request" val = "' + btoa(item.uid) + '" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Waiting accept"></i>';
						}else{
							contruct  += '<i class="fa fa-user-plus tb_add_friend" val = "' + btoa(item.uid) + '" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Add friend"></i>';
						}
					}else{
						contruct  += '<i class="fa fa-check" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Friend" style="color: #29ea10"></i>';
					}
					contruct +=
					'</div>'
					+'</li>';
				});

				$(".right-main-content .right_sidebar .list_search").html(contruct);
				$('.right-main-content .right_sidebar .list_search [data-toggle="tooltip"]').tooltip({'placement' : 'bottom'});

				$(".right-main-content .right_sidebar .list_search .tb_add_friend").click(function(event) {
					that = $(this);
					that.removeClass('tb_add_friend').removeClass('fa-user-plus').addClass('fa-reply-all').addClass('wait-request')
					.attr('data-original-title', 'Waiting accept');	
					var time = getDateTimeNow();
					var f = window.atob(that.attr('val'));
					var u = firebase.auth().currentUser.uid;

					firebase.database().ref('users/' + f +"/notify").push({
						'type' : 'request_friend',
						'content': u,
						'time': time,
					});

					firebase.database().ref('users/' + u +"/notify").push({
						'type' : 'send_request_friend',
						'content': f,
						'time': time,
					});
				});
			}
		})

		if ($(".right-main-content .right_sidebar .list_search").css('display') == 'block') return;
		$(".right-main-content .right_sidebar .right_cover").hide();
		setTimeout(function() {
			$(".right-main-content .right_sidebar .list_search").show();
		}, 330)
	}else{
		$(".right-main-content .right_sidebar .list_search").hide();
		setTimeout(function() {
			$(".right-main-content .right_sidebar .right_cover").show();
		}, 330)
	}
})


function controll_request_friend(that, tp){
	var type, u = firebase.auth().currentUser.uid, f = atob(that.attr('data'));
	if (tp == 'deny') {
		type = 'deny_request_friend';
	}else{
		type = 'accept_request_friend';
	}
	firebase.database().ref('users/' + f + '/notify').push({
		'content': u,
		'time' : getDateTimeNow(),	
		'type': type,
		'name': that.find('.name').text()
	})
	firebase.database().ref('users/' + u + '/notify').push({
		'content': f,
		'time' : getDateTimeNow(),	
		'type': type,
		'name': that.find('.name').text()
	})
	var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_friend_request span.new_notify");

	if (Number(t.text()) > 0) {
		t.text(Number(t.text()) - 1);

		var f = $(".friend_request .friend_request_header h6 span");
		f.text(Number(f.text()) - 1);
		checkEmpty();
	}


	that.fadeOut(300);
	setTimeout(function() {
		that.remove();
	}, 300)
}
checkEmpty();
function checkEmpty(){
	$(".left-main-content .tb_cover .menu .user-details .shortcut-controll li span.new_notify").each(function(index, el) {
		if ($(this).text() == '0') {
			$(this).removeClass('not-empty');
		}else{
			$(this).addClass('not-empty');
		}		
	}); 
}

$(".right-main-content .message_content  .send .add_file").click(function(e){
	$("#tb_send_file").click();
})
var send_image_form_data;

$("#tb_send_file").change(function(e){
	e.preventDefault();
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

		send_image_form_data = new FormData();
		pathAvatar = URL.createObjectURL(e.target.files[0]);
		send_image_form_data.append('file', e.target.files[0]);
		send_image_form_data.append('upload_preset', 'thienbinh');

		$(".right-main-content .message_content  .extendsion_image img").attr("src", pathAvatar);
		$(".right-main-content .message_content  .extendsion_image").attr('active', 'true').show().removeClass('slideOutDown').addClass('slideInUp');
		$(".right-main-content .message_content .center_cover").css({
			'height' : 'calc(100% - 180px)'
		});
		$(this).val('');

	}else{
		$(".right-main-content .message_content  .extendsion_image").attr('active', 'false').removeClass('slideInUp').slideUp();
		setTimeout(function() {
			$(".right-main-content .message_content  .extendsion_image").hide();
		}, 300);
		$(".right-main-content .message_content .center_cover").css({
			'height' : 'calc(100% - 80px)'
		});
	}
})


function init() {
	console.log(Math.abs(Math.floor((new Date().getTime() - timeXXX))));
	tb_firebase.prototype.checkSetup = function(){
		if (!window.firebase || !(firebase.app instanceof Function) ) {
			swal({
				type: 'error',
				title: 'Oops...',
				text: 'You have not configured and imported the Firebase SDK.',
				footer: 'Make sure you go through the codelab setup instructions!!!',
			})
		}
	}
	tb_firebase.prototype.triggerAuthStateChange = function(user){

		if (user == null) {
			// var timerInterval;
			// swal({
			// 	title: 'You have been logged out!',
			// 	type: 'warning',
			// 	html: 'Window will direct in <strong></strong> seconds.',
			// 	timer: 1500,
			// 	onOpen: function()  {
			// 		swal.showLoading()
			// 		timerInterval = setInterval(function() {
			// 			swal.getContent().querySelector('strong')
			// 			.textContent = swal.getTimerLeft()
			// 		}, 600)
			// 	},
			// 	onClose: function() {
			// 		if (typeof(base) != "undefined") {
			// 			location.href = base + '/logout';
			// 		}else{
			// 			location.reload();
			// 		}
			// 	}
			// })
		}else{
			console.log(Math.abs(Math.floor((new Date().getTime() - timeXXX))));

			this.friendRef();
			this.getRoom();
			this.notifyUser();
			this.ping();
			this.pong();
		}
	}
	tb_firebase.prototype.initFirebase = function(){
		this.auth = firebase.auth();
		this.database = firebase.database();
		this.storage = firebase.storage();

		this.auth.onAuthStateChanged(this.triggerAuthStateChange.bind(this));


	}

	function displayMessage(friend,dataKey, val){
		key = dataKey.substring(1, dataKey.length);
		if ($(".list_contact .list_contact_item").eq(0).html() == null) return;
		if (friend == atob($(".list_contact .list_contact_item.actived .contact-img").attr('val'))) {

			if (val.type == 'send') {
				if ($("#tb_send_friend_" + key).html() != null) return;
				var parent = $(".message_content .main-chat .chat-list");
				setTimeout(function(){
					if ($(".no-message") != null) {
						$(".no-message").slideUp();
						$(".no-message").siblings('hr').fadeOut();
					}	
					parent.append(
						'<li class="chat-item send-message" id="tb_send_friend_' + key + '" style = "display: none;">'
						+ '<div class="cover-content animated fadeInRight">' 
						+ '<img src="' + $(".user-details .image img").attr('src') + '" alt="" class="tb_round_image">'
						+ '<div class="content">'
						+ '<div class="text">'
						+ val.content
						+ '</div>'
						+ '<div class="time text-right " data-toggle="tooltip" data-placement="bottom" title="' + val.time +'">'
						+ change_type_date(val.time)		
						+'</div>'
						+'<div class="clearfix">'
						+'</div>'
						+'</div>'
						+ '</div>'
						+'</li>'
						)
					if (val.content.indexOf('type="tb_handle_background_js"') > 0) {
						$("#tb_send_friend_" + key + " .tb_handle_background_js").each(function() {
							get_size_and_amount_background_image($(this), 144, 'large');
						})
						$("#tb_send_friend_" + key + " .tb_handle_background_js").hover(function() {
							handle_hover_image($(this), 12, 144, 75);
						});
					}

					$(".chat-item.send-message").eq($(".chat-item.send-message").length - 1).slideDown(250);
					$("#tb_send_friend_" + key + "  .time").tooltip({'placement' : 'bottom'});

				}, 30)	

			}else{
				if ($("#tb_request_friend_" + key).html() != null) return;

				if (val.seen != '1') {
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + friend + '/messages/' + dataKey).update({
						'seen' : '1'
					})
				}
				var parent = $(".message_content .main-chat .chat-list");

				setTimeout(function(){
					if ($(".no-message") != null) {
						$(".no-message").slideUp();
						$(".no-message").siblings('hr').fadeOut();
					}

					parent.append(
						'<li class="chat-item request-message " id="tb_request_friend_' + key + '" style = "display: none;">'
						+ '<div class="cover-content animated fadeInLeft">' 
						+ '<img src="' + $(".list_contact .list_contact_item.actived .contact-img img").attr('src') + '" alt="" class="tb_round_image">'
						+ '<div class="content">'
						+ '<div class="text">'
						+ val.content
						+ '</div>'
						+ '<div class="time text-right " data-toggle="tooltip" data-placement="bottom" title="' + val.time +'">'
						+ change_type_date(val.time)		
						+'</div>'
						+'</div>'
						+'</div>'
						+'</li>'
						)
					if (val.content.indexOf('type="tb_handle_background_js"') > 0) {
						$("#tb_request_friend_" + key + " .tb_handle_background_js").each(function() {
							get_size_and_amount_background_image($(this), 144, 'large');
						})
						$("#tb_request_friend_" + key + " .tb_handle_background_js").hover(function() {
							handle_hover_image($(this), 12, 144, 75);
						});
					}

					$(".chat-item.request-message").eq($(".chat-item.request-message").length - 1).slideDown(250);

					if (val.content.indexOf("type='tb_send_image'") > 0) {
						$(".list_contact .list_contact_item.actived .contact-desc").html("Sent an image");
					}
					else if (val.content.indexOf('type="tb_handle_background_js"') > 0){
						$(".list_contact .list_contact_item.actived .contact-desc").html("Sent an sticker");
					}
					else {
						$(".list_contact .list_contact_item.actived .contact-desc").text(val.content);
					}
					$(".list_contact .list_contact_item.actived .time").text(change_type_date(val.time));

					truncat_message();

					$("#tb_request_friend_" + key + " .time").tooltip({'placement' : 'bottom'});
				}, 30);
			}
			
			if (animateScrollChat) {
				setTimeout(function() {
					$(".right-main-content .message_content  .main-chat").animate({
						scrollTop: $(".right-main-content .message_content  .main-chat .chat-list").height() + 100
					}, 100);
				}, 280)

			}
		}else{
			if (val.type == 'send') return;
			var target = $(".list_contact .list_contact_item .contact-img[val = '" + window.btoa(friend) +  "']");
			var ct;
			if (val.content.indexOf("type='tb_send_image'") > 0) {
				ct = "Sent an image";
			}
			else if (val.content.indexOf('type="tb_handle_background_js"') > 0){
				ct = "Sent an sticker";
			}
			else {
				ct = val.content;
			}

			target.next().children('.contact-desc').html(ct);
			if (val.time != null) {
				target.next().children('.time').text(change_type_date(val.time));
			}
			truncat_message();

			if (val.seen != '1') {
				target.parent().addClass("flash");
				var count_message_target =  $("#tb_friend_" + friend + " .contact-content h5 span");
				var count_message = count_message_target.text();
				if (count_message) {
					count_message = parseInt(count_message.substr(1, count_message.length - 1));
				}else{
					count_message = 0;
				}	
				count_message++;
				count_message_target.text("(" + count_message + ")");

				if (!target.parent().hasClass('notify')) {
					target.parent().addClass('notify');
				}
				setTimeout(function()  {
					target.parent().removeClass("flash");
				}, 1500);


				$("#alert_new_message").attr('src', base_public + 'music/alert.mp3');
				alert_new_message.play();
			}
		}
	}
	tb_firebase.prototype.ping = function(){
		var p = this.database.ref('users/' + this.auth.currentUser.uid + '/ping');
		p.off();

		var responsePing = function(snapShot){
			if (!snapShot.val().from) {
				firebase.database().ref('users/' + snapShot.key + '/pong/' + firebase.auth().currentUser.uid).update({
					time: new Date().getTime()
				});
			}else{
				if(getSeconds(new Date().getTime(), snapShot.val().time) > 120){
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/ping/' + snapShot.key).remove();
					return;
				};
				firebase.database().ref('rooms/' + snapShot.key + '/pong/' + firebase.auth().currentUser.uid).update({
					time: new Date().getTime()
				});
			}
		}

		p.on('child_added',responsePing);
		p.on('child_changed',responsePing);
	}
	tb_firebase.prototype.pong = function(){
		var p = this.database.ref('users/' + this.auth.currentUser.uid + '/pong');
		p.off();

		var responsePong = function(snapShot){
			$("#tb_friend_" + snapShot.key).find('.contact-status').removeClass('offline').addClass('online');
		}

		p.on('child_added',responsePong);
		p.on('child_changed',responsePong);
	}
	function displayRoom(dataEvent, type){
		var data = dataEvent.val();
		if (type == 'change') {
			$("#tb_friend_" + dataEvent.key + " .contact-img img").attr('src', data.thumbnail);
			$("#tb_friend_" + dataEvent.key + " .contact-content h5").text(data.name);

		}
		if (type == 'add') {
			var role = "member";

			if (data.owner == firebase.auth().currentUser.uid) {
				role = "owner";
			}
			$("ul.list_contact").append(
				'<li class="animated list_contact_item fadeInUp"  type="room" role = "' + role + '" id = "tb_friend_' + dataEvent.key + '">'
				+'<span class="contact-img" own="' + data.owner + '" val = "' + btoa(dataEvent.key) + '">'
				+'	<img src="' +  data.thumbnail + '" alt="user" class="tb_round_image">'
				+'	<span class="contact-status online"></span>'
				+ '</span>'
				+'<div class="contact-content">'
				+	'<h5 class="message-title" full="' + data.name +  '">' + data.name + '<span></span></h5>'
				+	'<span class="contact-desc">No message</span>'
				+	'<span class="time" time= "">...</span>'
				+'</div></li>'	
				);

			$("#tb_friend_" + dataEvent.key).click(function(){
				$(".right-main-content .right_sidebar .list_contact_item").removeClass('actived');
				$(this).removeClass('notify').addClass('actived');
				load_room(dataEvent.key, $("#tb_friend_" + dataEvent.key + " h5").attr('full'), $("#tb_friend_" + dataEvent.key + " .contact-img img").attr('src'), role, data.time);
			})

			var refRoom = firebase.database().ref('rooms/' + dataEvent.key + '/constructs');
			var loadFirstRoomMess = function(snap){
				setTimeout(function(){
					display_message_in_room(dataEvent.key,snap.key, snap.val(), true);
				}, 40)
			}
			refRoom.off();
			refRoom.orderByChild('time').limitToLast(30).on('child_added', loadFirstRoomMess);

			var updateInformationRef = firebase.database().ref('rooms/' + dataEvent.key + '/members');
			updateInformationRef.off();

			var updateInformationCallback = function(data){
				var memberss = JSON.parse(data.val());
				for (var i = 0; i < memberss.length; i++) {
					if (memberss[i].uid == firebase.auth().currentUser.uid) {
						memberss[i] = {
							uid: firebase.auth().currentUser.uid,
							avatar: $(".left-main-content .tb_cover .menu .user-details .image img").attr( 'src'),
							name: $(".left-main-content .tb_cover .menu .user-details .name").attr('fullname'),
						}
					}
				}
				firebase.database().ref('rooms/' + dataEvent.key + '/members').update({
					member : JSON.stringify(memberss),
				})
			}
			updateInformationRef.on('child_added', updateInformationCallback);

		}
		if (type== 'remove') {
			var checkActived = false;
			if ($("#tb_friend_" + dataEvent.key).hasClass('actived')) {
				checkActived = true;
			}
			$("#tb_friend_" + dataEvent.key).fadeOut();

			setTimeout(function(){
				$("#tb_friend_" + dataEvent.key).remove();
				if ($(".list_contact li.list_contact_item").length == 0 && checkActived) {
					$(".list_contact").append(
						'<li class=" text-center no-friend" style="color: #d1d1d1;">'
						+ 'You have no message <br> Search friend by type on <br>'
						+ '<a href="">"Search Contact"</a>' 
						+ '</li>'
						)
					$(".right-main-content .right_sidebar .no-friend a").click(function(e){
						e.preventDefault();
						$("#tb_search_friend").focus();
					})
				}else if (checkActived) {
					$(".list_contact li.list_contact_item").eq(0).click();
				}

			}, 300);
		}
	}
	tb_firebase.prototype.getRoom = function(){
		var rooms = this.database.ref('users/' + this.auth.currentUser.uid + '/rooms');
		rooms.off();
		var call = function(data){
			displayRoom(data, 'add');
		}
		var call1 = function(data){
			displayRoom(data, 'change');
		}
		var call2 = function(data){
			displayRoom(data, 'remove');
		}
		rooms.on('child_added', call);
		rooms.on('child_changed', call1);
		rooms.on('child_removed', call2);	

	}
	tb_firebase.prototype.getMessageFriend = function(friend){
		var ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + atob(friend) + '/messages/');
		ref.off();
		var callback = function(data){
			setTimeout(function(){
				displayMessage(atob(friend), data.key, data.val());

			}, 70);
		}
		ref.orderByChild('time').limitToLast(40).on('child_added', callback);


	}
	tb_firebase.prototype.friendRef = function(){
		var uid = this.auth.currentUser.uid;
		var friendRef = this.database.ref('users/' + uid + "/friends");
		friendRef.off();
		var callback1 = function(data){
			handleFriend(data, 'add', uid);

		}
		var callback3 = function(data){
			handleFriend(data, 'remove', uid);
		}
		friendRef.on('child_added', callback1);
		friendRef.on('child_removed', callback3);


	}
	function handleFriend(dataEvent, type, uid){
		var val = dataEvent.val();

		if (type == 'remove') {
			$("#tb_friend_" + dataEvent.key).fadeOut();
			setTimeout(function() {
				$("#tb_friend_" + dataEvent.key).remove();
				if ($(".list_contact li.list_contact_item").length == 0) {
					$(".list_contact").append(
						'<li class=" text-center no-friend" style="color: #d1d1d1;">'
						+ 'You have no message <br> Search friend by type on <br>'
						+ '<a href="">"Search Contact"</a>' 
						+ '</li>'
						)
					$(".right-main-content .right_sidebar .no-friend a").click(function(e){
						e.preventDefault();
						$("#tb_search_friend").focus();
					})
				}

				$("#dropdown_" + dataEvent.key).remove();

				if ($(".list_contact li.list_contact_item").length == 0) {
					load_message('new');
				}else{
					$(".list_contact li.list_contact_item").eq(0).click();
				}
				var x = tb_list_friend.indexOf(dataEvent.key);
				if (x >= 0) {
					tb_list_friend.splice(x, 1);
				}

				var y = tb_wait_request.indexOf(val.content);
				if (y >= 0) {
					tb_wait_request.splice(y, 1);
				}
			}, 300);
			return;
		}
		if ($("#tb_friend_" + dataEvent.key).html() != null) return;
		if (tb_list_friend.indexOf(dataEvent.key) < 0) {
			tb_list_friend.push(dataEvent.key);
		}

		$("ul.list_contact .no-friend").remove();
		$.ajax({
			url: base + "/search_user",
			type: 'GET',
			data: {
				like: btoa(dataEvent.key),
				field: 'uid'
			},
			success: function(data){

				if (data[0].avatar == "uploads/avatar/default.jpg") { 
					data[0].avatar = base_public + data[0].avatar;
				}

				$("ul.list_contact").append(
					'<li class="animated list_contact_item fadeInUp" id = "tb_friend_' + dataEvent.key + '">'
					+'<span class="contact-img" val = "' + btoa(dataEvent.key) + '">'
					+'	<img src="' +  data[0].avatar + '" alt="user" class="tb_round_image">'
					+'	<span class="contact-status offline"></span>'
					+ '</span>'
					+'<div class="contact-content">'
					+	'<h5 class="message-title">' + data[0].user + '<span></span></h5>'
					+	'<span class="contact-desc">No message</span>'
					+	'<span class="time" time= "">...</span>'
					+'</div></li>'	
					);

				$(".tb_dropdown").append(
					'<a class="dropdown-item" href="#" id="dropdown_' + data[0].uid + '" val="' + data[0].uid + '">'
					+ '<img src="' + data[0].avatar + '" class="tb_round_image" alt=""><p>' + data[0].user + '</p>'
					+ '</a>'
					)
				$("#dropdown_" + data[0].uid).click(function(e){
					$("#dropdownMenu2").text($(this).children('p').text().trim());
					$("#dropdownMenu2").attr('uid', $(this).attr('val'));
				})

				setInterval(function(){
					var ping = firebase.database().ref('users/' + dataEvent.key + '/ping/' + firebase.auth().currentUser.uid);
					ping.off();
					ping.update({
						'time' : new Date().getTime(),
					}).then(function() {
						setTimeout(function(){
							var t_now = new Date().getTime();
							var getPong = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pong/' + dataEvent.key);

							var checkPong = function(snap){
								if(getSeconds(t_now, snap.val()) == null || getSeconds(t_now, snap.val()) > 5){
									$("#tb_friend_" + dataEvent.key).find('.contact-status').addClass('offline').removeClass('online');
								};
							}
							getPong.off();
							getPong.on('child_added', checkPong);
							getPong.on('child_changed', checkPong);
						}, 2000)
					});

				}, 5500);

				var call = function(snap){
					if (snap.key == 'time') {
						$("#tb_friend_" + dataEvent.key + " .time").attr('time', snap.val());
					}
				}
				firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/friends/" + dataEvent.key + "/details/").on('child_added', call);
				if ($(".right-main-content .right_sidebar .list_contact_item.actived").html() == null) {
					$("#tb_friend_" + dataEvent.key).addClass('actived');
					var id = $(".list_contact_item.actived .contact-img").attr('val');
					load_message(id);
				}
				$(".right_sidebar #tb_friend_" + dataEvent.key).click(function(){
					var id = $(this).children(".contact-img").attr('val');
					$(".right_sidebar .list_contact_item").removeClass('actived');
					$(this).removeClass("flash").removeClass("notify").addClass('actived');
					if ($(this).attr('type') != 'room') {
						load_message(id);

					}
				})	
				getLastMessage(dataEvent.key, uid);
			}
		})
	}
	function getSeconds(time1, time2){
		return Math.abs(Math.floor((new Date(time1) - new Date(time2))/1000));
	}
	function getLastMessage(key, uid){
		var messageRef = firebase.database().ref('users/' + uid + '/friends/' + key + '/messages');

		var callback = function(snapShot){
			setTimeout(function(){
				displayMessage(key, snapShot.key, snapShot.val());
			}, 70);
		}
		messageRef.orderByChild('time').limitToLast(10).on('child_added', callback);
	}
	tb_firebase.prototype.notifyUser = function(){
		var uid = this.auth.currentUser.uid;
		this.notifyRef = this.database.ref('users/' + uid +"/notify");

		var callback1 = function(data){
			handleNotify(data, 'add', uid);
		}
		var callback2 = function(data){
			handleNotify(data, 'change', uid);
		}
		var callback3 = function(data){
			handleNotify(data, 'remove', uid);
		}
		this.notifyRef.on('child_added', callback1);
		this.notifyRef.on('child_changed', callback2);
		this.notifyRef.on('child_removed', callback3);
	}

	function handleNotify(data, eventType, uid){
		var key = data.key;
		var val = data.val();
		var canRemove = false;
		var type = val.type;



		if (val.type == 'send_request_friend') {
			if (tb_wait_request.indexOf(val.content) < 0 && eventType == 'add') {
				tb_wait_request.push(val.content);
			}
		}

		if (type == 'unfriend') {
			firebase.database().ref('users/' + uid +"/friends/" + val.content).remove();
			firebase.database().ref('users/' + val.content +"/friends/" + uid).remove();
			canRemove = true;
			if ($(".list_contact").html() != null) {
				var t = $(".list_contact .list_contact_item .contact-img[val = '" + btoa(val.content) + "']").parent();
				t.fadeOut();
				setTimeout(function() {
					t.remove();

					if ($(".list_contact li").length == 0) {
						$(".list_contact").append(
							'<li class=" text-center no-friend" style="color: #d1d1d1;">'
							+ 'You have no message <br> Search friend by type on <br>'
							+ '<a href="">"Search Contact"</a>' 
							+ '</li>'
							)
						$(".right-main-content .right_sidebar .no-friend a").click(function(e){
							e.preventDefault();
							$("#tb_search_friend").focus();
						})
					}

					if ($(".list_contact li.list_contact_item").length == 0) {
						load_message('new');
					}else{
						$(".list_contact li.list_contact_item").eq(0).click();
					}
					var x = tb_list_friend.indexOf(val.content);
					if (x >= 0) {
						tb_list_friend.splice(x, 1);
					}
				}, 300);

			}
			$.ajax({
				url: base + "/search_user",
				type: 'GET',
				data: {
					like: btoa(val.content),
					field: 'uid'
				},
				success: function(data){
					$(".tb_notify_container").addClass("bounceInDown").show().removeClass("bounceOutUp").find('.cover').html("You and " + data[0].user + " cancel request friend with " );
					setTimeout(function()  {
						$(".tb_notify_container").removeClass("bounceInDown").addClass("bounceOutUp")

						$.ajax({
							url: base + "/search_notify",
							type: "POST",
							data: {
								tb: "hihi"
							},
							success: function(data){
								construct_notify(data);
							}
						})
					}, 1000);
				}
			});

		}

		if (type == 'accept_request_friend' && eventType == 'add') {
			canRemove = true;
			if ($("#tb_request_friend_" + val.content).html() != null) {
				$("#tb_request_friend_" + val.content).fadeOut(300);
				setTimeout(function() {
					$("#tb_request_friend_" + val.content).remove();
					var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_friend_request span.new_notify");
					if (Number(t.text()) > 0) {
						t.text(Number(t.text()) - 1);
						var f = $(".friend_request .friend_request_header h6 span");
						f.text(Number(f.text()) - 1);
					}
					checkEmpty();
				}, 300)
			}
			var x = tb_wait_request.indexOf(val.content);
			if (x >= 0) {
				tb_wait_request.splice(x, 1);
			}

			tb_list_friend.push(val.content);
			var cal = function(data){
				if (data.val().content == val.content && (data.val().type == 'send_request_friend' ||  data.val().type == 'request_friend')) {
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify/'  + data.key).remove();
				}
			}
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify').on('child_added', cal);


			var time = getDateTimeNow();

			firebase.database().ref('users/'  + firebase.auth().currentUser.uid + '/friends/' + val.content + "/details").update({
				'time' : time,
				'name' : val.name,

			})
			firebase.database().ref('users/'  + val.content + '/friends/' + firebase.auth().currentUser.uid + "/details").update({
				'time' : time,
				'name' : $(".left-main-content .user-details .name").attr('fullname'),
			})

			$(".tb_notify_container").addClass("bounceInDown").show().removeClass("bounceOutUp").find('.cover').html("You and " + val.name  + " become a friend");
			setTimeout(function() {
				$(".tb_notify_container").removeClass("bounceInDown").addClass("bounceOutUp")
			}, 1500);
		}

		if (type == 'deny_request_friend' && eventType == 'add') {
			canRemove = true;

			var x = tb_wait_request.indexOf(val.content);
			if (x >= 0) {
				tb_wait_request.splice(x, 1);

			}

			var cal = function(data){
				if (data.val().content == val.content && (data.val().type == 'send_request_friend' ||  data.val().type == 'request_friend')) {
					firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify/'  + data.key).remove();
				}
			}
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify').on('child_added', cal);


			var that = $("#tb_request_friend_" + val.content);
			if (that.html() != null) {
				that.fadeOut(300);
				setTimeout(function() {
					that.remove();
				}, 300)

				var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_friend_request span.new_notify");
				if (Number(t.text()) > 0) {
					t.text(Number(t.text()) - 1);
					var f = $(".friend_request .friend_request_header h6 span");
					f.text(Number(f.text()) - 1);
				}
				checkEmpty();
			}

		}

		if (type == 'request_friend' && eventType == 'add') {
			$.ajax({
				url: base + "/search_user",
				type: 'GET',
				data: {
					like: btoa(val.content),
					field: 'uid'
				},
				success: function(data){
					if (data[0].avatar == "uploads/avatar/default.jpg") { 
						data[0].avatar = base_public + data[0].avatar;
					}
					if ($("#tb_request_friend_" + val.content).html() != null) return;
					$(".left-main-content .tb_cover .friend_request .friend_request_body").append(
						'<li class="d-flex" id="tb_request_friend_' + val.content + '" data = "' + btoa(val.content) + '">'
						+	'<img src="' + data[0].avatar + '" class="tb_round_image">'
						+   '<div class="name">' + data[0].user + '</div>'
						+ 	'<i class="fa fa-check accept" aria-hidden="true"></i>'
						+	'<i class="fa fa-times deny" aria-hidden="true"></i>'
						+   '</li>'
						)

					var target = $("#tb_request_friend_" + val.content);

					$("#tb_request_friend_" + val.content + ' i.accept').click(function(){
						controll_request_friend($(this).parent(), 'accept');
					})
					$("#tb_request_friend_" + val.content + ' i.deny').click(function(){
						controll_request_friend($(this).parent(), 'deny');
					})

					var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_friend_request span.new_notify");
					t.text(Number(t.text()) + 1);

					var f = $(".friend_request .friend_request_header h6 span");
					f.text(Number(f.text()) + 1);
					checkEmpty();
					$("#alert_new_message").attr('src', base_public + 'music/notify.mp3');
					alert_new_message.play();
				}
			});
		}
		if (val.type == 'invite_caro' && eventType == 'add'){
			if(getSeconds(new Date().getTime(), val.time) > 30){
				firebase.database().ref('users/' + uid + "/notify/" + key).remove();
				return;
			}
			if ($("#tb_invite_caro_" + val.content).html() != null) return;
			toastr["info"]("You have an invitation from " + val.name);
			$(".left-main-content .tb_cover .tb_notify .tb_notify_body").append(
				'<li class="d-flex room" id="tb_invite_caro_' + val.content + '"  data = "' + btoa(val.content) + '">' +
				'<img src="' + val.avatar + '" class="tb_round_image">' +
				'<div class="invite">' + val.name + ' invite you play caro</div>' +
				'<i class="fa fa-check accept" aria-hidden="true"></i>' +
				'<i class="fa fa-times deny" aria-hidden="true"></i>' +
				'</li>'
				)

			$("#tb_invite_caro_" + val.content + " .accept").click(function() {
				controll_invite_caro(val.content, 'accept', key);
			})
			$("#tb_invite_caro_" + val.content + " .deny").click(function() {
				controll_invite_caro(val.content, 'deny', key);
			})
			var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_notify_controll span.new_notify");
			t.text(Number(t.text()) + 1);

			var f = $(".tb_notify .tb_notify_header h6 span");
			f.text(Number(f.text()) + 1);
			checkEmpty();
			$("#alert_new_message").attr('src', base_public + 'music/notify.mp3');
			alert_new_message.play();
		}
		if (val.type == 'invite_caro' && eventType == 'remove') {
			$("#tb_invite_caro_" + val.content).remove();
			var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_notify_controll span.new_notify");
			if (Number(t.text()) > 0) {
				t.text(Number(t.text()) - 1);

				var f = $(".tb_notify .tb_notify_header h6 span");
				f.text(Number(f.text()) - 1);
				checkEmpty();
			}
		}
		if (val.type == 'deny_caro' && eventType == 'add' ) {
			canRemove = true;
			alert(val.content);
			if(getSeconds(new Date().getTime(), val.time) < 30){
				$(".invite_game_view .invite_game_view_load").fadeOut();
			}
			toastr["warning"]("Your friend is busy!");
		}
		if (val.type == 'remove_caro' && eventType == 'add' || eventType == 'change') {
			canRemove = true;
			$("#icon_game_" + val.from ).parent().remove();
			$(".icon_game[target='icon_game_" + val.from + "']").remove();
			if (val.content != firebase.auth().currentUser.uid ) {
				toastr["warning"]("Your friend lost the connection!!!");
			}
		}


		if (val.type == 'accept_caro' && eventType == 'add') {
			canRemove = true;
			alert(val.content);
			clearInterval(countdown_interval);
			$(".invite_game_view .invite_game_view_load").fadeOut();
			$(".invite_game_view").slideUp();
			checkInvite = true;
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/caro/' + val.content).remove();
			firebase.database().ref('users/' + val.content + '/caro/' + firebase.auth().currentUser.uid).remove();
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/caro/' + val.content + '/first').update({
				first: firebase.auth().currentUser.uid
			});
			firebase.database().ref('users/' + val.content + '/caro/' + firebase.auth().currentUser.uid + '/first').update({
				first: firebase.auth().currentUser.uid
			});
			var display = 'block';
			if ($(".caro").length > 0) {
				display = 'none';
			}

			$("body").append(
				'<div class="card caro" style="display: ' + display + 'px">'
				+ '<i class="fas fa-minus caro_minify" id="icon_game_' + val.content + '"></i>'
				+ '<div class="card-body">'
				+ '<iframe src="' + base + "/load_caro/" + val.content + '" style="border:none;width: 320px;height: 350px;"></iframe>'
				+ '</div>'
				+ '</div>'

				)
			$("#icon_game_" + val.content).click(function(e){
				$(this).parent().fadeOut();
				$(".icon_game[target='icon_game_" + val.content + "']").fadeIn();
			})
			var right = $(".icon_game").length * 55 + 20;
			$("body").append(
				'<div class="icon_game tb_round_image" style="right: ' + right + 'px;background: url(' + $("#dropdown_" + val.content  + " img").attr('src') + ')" target="icon_game_' + val.content  + '">'
				+ '<div class="icon_game_cover" style="background: url(' + $("#dropdown_" + val.content  + " img").attr('src') + ')"></div>'	
				+ '</div>'
				)
			$(".icon_game[target='icon_game_" + val.content  + "']").click(function(event) {
				$(".caro").fadeOut();
				$("#icon_game_" + val.content ).parent().fadeIn();
			});

		}


		if (val.type == 'invite_room' && eventType == 'add') {
			if ($("#tb_invite_room_" + val.content).html() != null) return;
			$(".left-main-content .tb_cover .tb_notify .tb_notify_body").append(
				'<li class="d-flex room" id="tb_invite_room_' + val.content + '"  data = "' + btoa(val.content) + '">'
				+	'<img src="' + val.avatar + '" class="tb_round_image">'
				+   '<div class="invite">' + val.user + " invite you to join room " + val.name + '</div>'
				+ 	'<i class="fa fa-check accept" aria-hidden="true"></i>'
				+	'<i class="fa fa-times deny" aria-hidden="true"></i>'
				+   '</li>'
				)

			$("#tb_invite_room_" + val.content + " .accept").click(function(){
				controll_invite_room(val.content, 'accept', key);
			})
			$("#tb_invite_room_" + val.content + " .deny").click(function(){
				controll_invite_room(val.content, 'deny', key);
			})
			var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_notify_controll span.new_notify");
			t.text(Number(t.text()) + 1);

			var f = $(".tb_notify .tb_notify_header h6 span");
			f.text(Number(f.text()) + 1);
			checkEmpty();
			$("#alert_new_message").attr('src', base_public + 'music/notify.mp3');
			alert_new_message.play();
		}	
		if (val.type == 'invite_room' && eventType == 'remove') {
			$("#tb_invite_room_" + val.content).remove();
			var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_notify_controll span.new_notify");
			if (Number(t.text()) > 0) {
				t.text(Number(t.text()) - 1);

				var f = $(".tb_notify .tb_notify_header h6 span");
				f.text(Number(f.text()) - 1);
				checkEmpty();
			}
		}

		if (canRemove) {
			firebase.database().ref('users/' + uid +"/notify/" + key).remove();
		}
	}
	function controll_invite_caro(friendKey, type, key) {
		firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/notify/" + key).remove();

		if (type == 'accept') {
			firebase.database().ref('users/' + friendKey + "/notify").push({
				type: 'accept_caro',
				content: firebase.auth().currentUser.uid,
				time: new Date().getTime()
			})
			var display = 'block';
			if ($(".caro").length > 0) {
				display = 'none';
			}
			$("body").append(
				'<div class="card caro" style="display: ' + display + 'px">'
				+ '<i class="fas fa-minus caro_minify" id="icon_game_' + friendKey + '"></i>'
				+ '<div class="card-body">'
				+ '<iframe src="' + base + "/load_caro/" + friendKey + '" style="border:none;width: 320px;height: 350px;"></iframe>'
				+ '</div>'
				+ '</div>'
				)
			$("#icon_game_" + friendKey).click(function(e){
				$(this).parent().fadeOut();
				$(".icon_game[target='icon_game_" + friendKey + "']").fadeIn();
			})
			var right = $(".icon_game").length * 55 + 20;
			$("body").append(
				'<div class="icon_game tb_round_image" style="right: ' + right + 'px;background: url(' + $("#dropdown_" + friendKey + " img").attr('src') + ')" target="icon_game_' + friendKey + '">'
				+ '<div class="icon_game_cover" style="background: url(' + $("#dropdown_" + friendKey + " img").attr('src') + ')"></div>'	
				+ '</div>'
				)
			$(".icon_game[target='icon_game_" + friendKey + "']").click(function(event) {
				$(".caro").fadeOut();
				$("#icon_game_" + friendKey).parent().fadeIn();
			});
		}

	}
	function controll_invite_room(roomKey, type, key){
		firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/notify/" + key).remove();
		if (type == 'accept') {
			firebase.database().ref('rooms/' + roomKey + "/members").on('child_added', function(snap){
				var mem = snap.val();	
				mem = JSON.parse(mem);
				var newMem = {
					avatar: $(".left-main-content .menu .user-details .image img").attr('src'),
					name: $(".left-main-content  .menu .user-details .name").attr( 'fullname'),
					uid: firebase.auth().currentUser.uid,
					time: new Date().getTime(),
				}
				mem.push(newMem);
				firebase.database().ref('rooms/' + roomKey + "/members").update({
					member: JSON.stringify(mem),
				})
				var details = {};
				firebase.database().ref('rooms/' + roomKey + "/details").on('child_added', function(snapShot){
					details[snapShot.key] = snapShot.val();
					if (snapShot.key == 'time') {
						firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/rooms/" + roomKey).update(details);
					}
				})
			});
			firebase.database().ref('rooms/' + roomKey + "/wait_members").on('child_added', function(snap){
				var wait_mem = snap.val();	
				wait_mem = JSON.parse(wait_mem);
				var x = wait_mem.indexOf(firebase.auth().currentUser.uid);
				if (x >= 0) {
					wait_mem.splice(x, 1);
				}
				firebase.database().ref('rooms/' + roomKey + "/wait_members").update({
					wait: JSON.stringify(wait_mem),
				})
				
			});
		}else{
			firebase.database().ref('rooms/' + roomKey + "/wait_members").on('child_added', function(snap){
				var wait_mem = snap.val();	
				wait_mem = JSON.parse(wait_mem);
				var x = wait_mem.indexOf(firebase.auth().currentUser.uid);
				if (x >= 0) {
					wait_mem.splice(x, 1);
				}
				firebase.database().ref('rooms/' + roomKey + "/wait_members").update({
					wait: JSON.stringify(wait_mem),
				})
				
			});
		}
	}
	function tb_firebase() {
		this.checkSetup();

		this.initFirebase();
	}
	window.tb_firebase = new tb_firebase();

}

});
