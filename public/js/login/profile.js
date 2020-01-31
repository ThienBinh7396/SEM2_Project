$(document).ready(function() {
	var base = $("#base_url").attr('base');
	var base_public = $("#base_pub").attr('base');
	var base_admin = $("#base_admin").attr('base');
	var animateScrollChat = false;
	var pathAvatar;


	var current_friend = '0';
	var currentTypeContact = "friend";
	var list_member_in_room = [], tb_list_friend = [];
	var current_mem_in_room = "";

	var ownerRoom = "";

	var tb_timer = [];
	var countdown_time;
	var countdown_interval, checkInvite = true;

	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	var alert_new_message = document.getElementById('alert_new_message');
	alert_new_message.volume = 0.4;

	init();
	new PerfectScrollbar(".left-main-content .tb_cover  .tb_notify_body");
	new PerfectScrollbar(".left-main-content .tb_cover .friend_request .friend_request_body");
	new PerfectScrollbar(".left-main-content .tb_cover .menu");
	new PerfectScrollbar(".right-main-content");
	new PerfectScrollbar(".tb_dropdown");
	mainSetting();

	function mainSetting() {
		$(".left-main-content .tb_cover .menu .user-details .image .change_avatar").remove();
		$("#room").click(function(e) {
			e.preventDefault();
			location.href = base + "/message_view";
		});
	}

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
				firebase.database().ref('users/' + $("#dropdownMenu2").attr('uid') + '/notify/caro_' + firebase.auth().currentUser.uid).remove();
				$(".invite_game_view .invite_game_view_load").fadeOut();
				checkInvite = true;
			}
		}, 1000);
	})
	$(".gender a").click(function(e) {
		e.preventDefault();
		$("#gender").text($(this).text());
	});
	$("#change_password").click(function(){
		if ($("#cover_change_password").css('display') == 'none') {
			$("#cover_change_password").slideDown();
			$(this).text('+ Hide change password');
		}else{
			$("#cover_change_password").slideUp();
			$(this).text('+ Change password');
		}
	})
	
	

	$("#about").summernote({
		height: 200,
		focus: true,
		placeholder: 'Type about you...',
		disableDragAndDrop: true,
		shortcuts: false,
		codemirror: { 
			theme: 'monokai'
		},
		toolbar: [
		['style', ['bold', 'italic', 'underline', 'clear']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['fontsize', ['fontsize']],
		['color', ['color']],
		['para', ['ul', 'ol', 'paragraph']],
		['height', ['height']]
		],
		callbacks: {
			onPaste: function(e){
				e.preventDefault();
				$("#about").summernote('editor.insertText', e.originalEvent.clipboardData.getData('text'));
				return;
			},
			onDrop: function(e){
				return;
				
			},

		}
	});

	$(".right-main-content .cover_change .hover_change ").click(function() {
		$("#input_change_avatar").click();
	})
	var basic, imageName;
	var pre = document.getElementById('preview');
	basic =  new Croppie(pre, {
		enableExif: true,
		viewport: {
			width: 200,
			height: 200,
			type: 'circle'
		},
		boundary: {
			width: 300,
			height: 300
		}
	});
	$("#input_change_avatar").change(function(e) {
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
			imageName = e.target.files[0].name;
			console.log(e.target.files[0]);
			imageName = imageName.substring(0, imageName.indexOf(".")) + new Date().getTime() + ".png";	
			pathAvatar = URL.createObjectURL(e.target.files[0]);

			basic.bind({
				url: pathAvatar,
			});
			$("#crop").fadeIn();

		}
	});
	$("#save_crop").click(function(){
		basic.result({type: 'blob'}).then(function(blob) {
			var file = new File([blob], imageName, {type: blob.type, lastModified: Date.now()});
			console.log(file);	
			var form_data = new FormData();
			form_data.append('file', file);
			form_data.append('upload_preset', 'thienbinh');
			$.ajax({
				url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
				type: "POST",
				data: form_data,
				processData: false,
				contentType: false,
				success: function(data){
					var url = data.secure_url;

					url = url.substring(0, url.indexOf('upload/') + 7) + "c_scale,o_100,q_auto:eco,w_658,z_0.4/" 
					+ url.substring(url.indexOf('upload/') + 7, url.length) ;
					$("#img_change_avatar, .left-main-content .tb_cover .menu .user-details .image img").attr('src', url);
					$("#input_change_avatar").val('');
					$("#crop").fadeOut();
					toastr["success"]("Edit successful!");
					$.ajax({
						url: base + "/update_infor",
						type: "POST",
						data: {
							field: "avatar",
							data: url,
						}
					})
				}
			})
		});
	})
	$(".close_crop, #close_crop").click(function(){
		$("#crop").fadeOut();

	})
	$("#tb_cover_slide_close").click(function() {
		$(".tb_cover_slide").fadeOut();
	})

	$("#save_infor").click(function(){
		
		var update = {
			user: $("#name").val(),
			address: $("#address").val(),
			gender: $("#gender").text().trim(),
			birthday: $("#birthday").val(),
			about:  encodeURI($("#about").summernote('code').trim()),
			change_password: false
		}
		if($("#cover_change_password").css('display') != 'none'){
			update.change_password = true;
			update.old_password = $("#old_password").val();
			update.new_password = $("#new_password").val();
		}
		$.ajax({
			url: base + '/update_full',
			type: "POST",
			data: update,
			success: function(data){
				if (data.length == 0) {
					toastr["success"]("Edit successful!");
					var arr = update.user.split(' ');
					$(".left-main-content .tb_cover .menu .user-details .name").text('Hello, ' + arr[arr.length - 1]);
					if($("#cover_change_password").css('display') != 'none'){
						$("#change_password").click();	
						tb_firebase.auth.currentUser.updatePassword(update.new_password).then(function() {
						}).catch(function(error) {
							console.log(error)
						});;
					}

				}else{
					for (var i = 0; i < data.length; i++) {
						toastr["error"](data[0]);
					}
				}
			}
		})
	})
	$("#toggle-left-main").click(function() {
		var l = parseInt($(".left-main-content").css('left'));
		if (l == -220) {
			if ($(".right-main-content .right_sidebar").css('position') != 'relative') {
				$(".right-main-content .right_sidebar").css('right', '-220px');
			}
			$(".left-main-content").css('left', '0');
			$(this).find('i').removeClass('fa-align-justify').addClass('fa-align-center');
		} else {
			$(".left-main-content").css('left', '-220px');
			$(this).find('i').addClass('fa-align-justify').removeClass('fa-align-center');
		}
	})
	$("#toggle-right-main").click(function() {
		var l = parseInt($(".right-main-content .right_sidebar").css('right'));
		if (l == -220) {
			$(".left-main-content").css('left', '-220px');
			$(".right-main-content .right_sidebar").css('right', '0');
		} else {
			$(".right-main-content .right_sidebar").css('right', '-220px');
		}
	})
	$(window).resize(function() {
		if ($(this).width() > 900) {
			$(".left-main-content").css('left', '0');
			$(".right-main-content .right_sidebar").css('right', '0');
		} else if ($(this).width() < 900) {
			$(".left-main-content").css('left', '-220px');
		} else if ($(this).width() > 768) {
			$(".left-main-content").css('left', '-220px');
			$(".right-main-content .right_sidebar").css('right', '0');
		} else if ($(this).width() < 768) {
			$(".right-main-content .right_sidebar").css('right', '-220px');
		}
	})

	for (var i = 0; i < 16; i++) {
		var left = (Math.random() * 9 + 10) * i + 10;
		var bottom = Math.random() * 300 + 250;
		var ranW = Math.random() * 45 + 40;
		var opacity = Math.random() / 4.4 + 0.5;
		var duration = Math.random() * 25 + 17;
		if (left > 96) {
			left = Math.random() * 63 + 10;
		}
		$("body").append('<div class="tb_bubbles" cur = "' + duration + '" style="opacity: ' + opacity + ';bottom: -' + bottom + 'px; left: calc(' + left + '% + 30px); width: ' + ranW + 'px; height: ' + ranW + 'px;animation-duration: ' + duration + 's"></div>');
	}

	$("#tb_friend_request").click(function(e) {
		e.preventDefault();
		$(".left-main-content .tb_cover .friend_request").css({
			'left': $(this).offset().left - 50,
			'top': $(this).offset().top + 48
		})
		if ($(".left-main-content .tb_cover .friend_request").css('display') == 'none') {
			$(".left-main-content .tb_cover .friend_request").show().addClass('fadeInLeft');
		} else {
			$(".left-main-content .tb_cover .friend_request").removeClass('fadeInLeft').hide({
				effect: 'slide',
				direction: 'left'
			})
		}
	})
	$(".left-main-content .tb_cover .tb_notify, .left-main-content .tb_cover .friend_request").addClass('fast_animated');
	$("#tb_notify_controll").click(function(e) {
		e.preventDefault();
		$(".left-main-content .tb_cover .tb_notify").css({
			'left': $(this).offset().left - 50,
			'top': $(this).offset().top + 48
		})
		if ($(".left-main-content .tb_cover .tb_notify").css('display') == 'none') {
			$(".left-main-content .tb_cover .tb_notify").show().addClass('fadeInLeft');
		} else {
			$(".left-main-content .tb_cover .tb_notify").removeClass('fadeInLeft').hide({
				effect: 'slide',
				direction: 'left'
			})
		}
	})

	$('[data-toggle="tooltip"]').tooltip({
		'placement': 'bottom',
		'trigger': 'hover',
		delay: {
			"show": 200,
			"hide": 160
		}
	});


	$("#tb_chathub_logout").click(function(e) {
		e.preventDefault();
		var that = $(this);
		firebase.auth().signOut().then(function() {
			location.href = that.attr('href');
		})
	})

	$(".left-main-content .menu .tb_gb").click(function(e) {
		var that = $(this);
		if ($(this).siblings('.menu_child').css('display') == 'none') {
			$(this).siblings('.menu_child').slideDown();
			$(this).parent().find('.fa-angle-down').addClass('tb_down');
		} else {
			$(this).siblings('.menu_child').slideUp();
			$(this).parent().find('.fa-angle-down').removeClass('tb_down');

		}

	})
	$(".menu #update_avatar").change(function(e) {
		e.preventDefault();
		if ($(this).val() != "") {
			if (e.target.files[0].type != "image/jpeg" && e.target.files[0].type != "image/jpg" && e.target.files[0].type != "image/png" && e.target.files[0].type != "image/ico") {
				swal({
					type: 'error',
					title: 'Oops...',
					text: 'Type of image not found !!!',
				})
				return;
			}

			pathAvatar = URL.createObjectURL(e.target.files[0]);
			var form_data = new FormData();
			form_data.append('file', e.target.files[0]);
			form_data.append('upload_preset', 'thienbinh');

			$.ajax({
				type: "POST",
				url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
				data: form_data,
				processData: false,
				contentType: false,
				success: function(data) {
					var url = data.secure_url;
					url = url.substring(0, url.indexOf('upload/') + 7) + "c_scale,o_100,q_auto:eco,w_658,z_0.4/" + url.substring(url.indexOf('upload/') + 7, url.length);

					$.ajax({
						type: "POST",
						url: base + "/update_infor",
						data: {
							field: "avatar",
							data: url
						}
					})
				}
			})
			$(".left-main-content .menu .user-details .image img").attr("src", pathAvatar);
		}

	})


	function construct_notify(data) {
		var t = $(".left-main-content .tb_cover .menu .user-details .shortcut-controll #tb_notify_controll span.new_notify");
		t.text(data.length);
		var f = $(".tb_notify .tb_notify_header h6 span");
		f.text(data.length);
		checkEmpty();

		$(".tb_notify .tb_notify_body").html("");
		data.forEach(function(item) {
			var arr = item.user.split(' ');
			if (item.type == "poke_friend") {
				$(".tb_notify .tb_notify_body").append(
					'<li class="d-flex " id="tb_notify_' + item.id + '" >' +
					'<img src="' + item.avatar + '" class="tb_round_image">' +
					'<div class="tb_notify_body_content poke" type="poke_friend">' +
					'<div class="name">' + arr[arr.length - 1] + ' poked you</div>' +
					'<i class="fas fa-hand-point-right"></i><span class="fulltime">' + getFullTypeDate(item.created_at) + '</span>' +
					'</div>'

					);
			}

		})
	}


	$(".fulltime").each(function(index, el) {
		$(this).text(" " + getFullTypeDate($(this).text().trim()));
	});


	function tb_getSeconds(time1, time2) {
		return Math.abs(Math.floor((new Date(time1) - new Date(time2)) / 1000));
	}

	$(".time").each(function(index, el) {
		if ($(this).text().trim() != "...") {
			$(this).text(change_type_date($(this).text()));
		}
	})

	function change_type_date(string_date) {
		var d = new Date(string_date.trim());

		var hours;
		var minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
		var seconds = d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds();
		if (d.getHours() > 12) {
			hours = (d.getHours() - 12) + ":" + minute + ":" + seconds + " pm"
		} else {
			hours = d.getHours() + ":" + minute + ":" + seconds + " am"
		}
		return hours;
	}

	function getFullTypeDate(string_date) {
		var d = new Date(string_date);

		var hours;
		var minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
		if (d.getHours() > 12) {
			hours = (d.getHours() - 12) + ":" + minute + "PM"
		} else {
			hours = d.getHours() + ":" + minute + "AM"
		}

		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var dt = d.getDate() + "";

		switch (dt[dt.length - 1]) {
			case "1":
			dt = dt + "st";
			break;
			case "2":
			dt = dt + "nd";
			break;
			case "3":
			dt = dt + "rd";
			break;
			default:
			dt = dt + "th";
			break;
		}

		return months[d.getMonth()].substring(0, 3) + " " + dt + ", " + hours;
	}

	function getDateTimeNow() {
		var d = new Date();

		return d.getFullYear() + "-" + updateType(d.getMonth() + 1) + "-" + updateType(d.getDate()) + " " +
		updateType(d.getHours()) + ":" + updateType(d.getMinutes()) + ":" + updateType(d.getSeconds());
	}

	function updateType(num) {
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




	function getMeta(url, callback) {
		var img = new Image();
		img.src = url;
		img.onload = function() {
			callback(this.width, this.height);
		}
	}

	function copyToClipboard(string) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(string).select();
		document.execCommand("copy");
		$temp.remove();
	}

	function getLink(string) {

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
		return arr.join(' ');
	}

	function controll_request_friend(that, tp) {
		var type, u = firebase.auth().currentUser.uid,
		f = atob(that.attr('data'));
		if (tp == 'deny') {
			type = 'deny_request_friend';
		} else {
			type = 'accept_request_friend';
		}
		firebase.database().ref('users/' + f + '/notify').push({
			'content': u,
			'time': getDateTimeNow(),
			'type': type,
			'name': that.find('.name').text()
		})
		firebase.database().ref('users/' + u + '/notify').push({
			'content': f,
			'time': getDateTimeNow(),
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

	function checkEmpty() {
		$(".left-main-content .tb_cover .menu .user-details .shortcut-controll li span.new_notify").each(function(index, el) {
			if ($(this).text() == '0') {
				$(this).removeClass('not-empty');
			} else {
				$(this).addClass('not-empty');
			}
		});
	}

	var send_image_form_data;

	function init() {
		console.log(Math.abs(Math.floor((new Date().getTime() - timeXXX))));
		tb_firebase.prototype.checkSetup = function() {
			if (!window.firebase || !(firebase.app instanceof Function)) {
				swal({
					type: 'error',
					title: 'Oops...',
					text: 'You have not configured and imported the Firebase SDK.',
					footer: 'Make sure you go through the codelab setup instructions!!!',
				})
			}
		}
		tb_firebase.prototype.triggerAuthStateChange = function(user) {

			if (user == null) {
				
			} else {
				console.log(Math.abs(Math.floor((new Date().getTime() - timeXXX))));

				this.friendRef();
				this.notifyUser();
				this.ping();
				this.pong();
			}
		}
		tb_firebase.prototype.initFirebase = function() {
			this.auth = firebase.auth();
			this.database = firebase.database();
			this.storage = firebase.storage();

			this.auth.onAuthStateChanged(this.triggerAuthStateChange.bind(this));


		}
		function handleFriend(dataEvent, type, uid){
			var val = dataEvent.val();

			if (type == 'remove') {
				var x = tb_list_friend.indexOf(dataEvent.key);
				if (x >= 0) {
					tb_list_friend.splice(x, 1);
				}
				$("#dropdown_" + dataEvent.key).remove();
				return;
			}else{
				if (tb_list_friend.indexOf(dataEvent.key) < 0) {
					tb_list_friend.push(dataEvent.key);
				}
				$.ajax({
					url: base + "/search_user",
					type: 'GET',
					data: {
						like: btoa(dataEvent.key),
						field: 'uid'
					},
					success: function(data){
						$(".tb_dropdown").append(
							'<a class="dropdown-item" href="#" id="dropdown_' + data[0].uid + '" val="' + data[0].uid + '">'
							+ '<img src="' + data[0].avatar + '" class="tb_round_image" alt=""><p>' + data[0].user + '</p>'
							+ '</a>'
							)
						$("#dropdown_" + data[0].uid).click(function(e){
							$("#dropdownMenu2").text($(this).children('p').text().trim());
							$("#dropdownMenu2").attr('uid', $(this).attr('val'));
						})
					}
				});
			}
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

		tb_firebase.prototype.ping = function() {
			var p = this.database.ref('users/' + this.auth.currentUser.uid + '/ping');
			p.off();

			var responsePing = function(snapShot) {
				if (!snapShot.val().from) {
					firebase.database().ref('users/' + snapShot.key + '/pong/' + firebase.auth().currentUser.uid).update({
						time: new Date().getTime()
					});
				} else {
					firebase.database().ref('rooms/' + snapShot.key + '/pong/' + firebase.auth().currentUser.uid).update({
						time: new Date().getTime()
					});
				}
			}

			p.on('child_added', responsePing);
			p.on('child_changed', responsePing);
		}
		tb_firebase.prototype.pong = function() {
			var p = this.database.ref('users/' + this.auth.currentUser.uid + '/pong');
			p.off();

			var responsePong = function(snapShot) {
				$("#tb_friend_" + snapShot.key).find('.contact-status').removeClass('offline').addClass('online');
			}

			p.on('child_added', responsePong);
			p.on('child_changed', responsePong);
		}




		function getSeconds(time1, time2) {
			return Math.abs(Math.floor((new Date(time1) - new Date(time2)) / 1000));
		}

		tb_firebase.prototype.notifyUser = function() {
			var uid = this.auth.currentUser.uid;
			this.notifyRef = this.database.ref('users/' + uid + "/notify");

			var callback1 = function(data) {
				handleNotify(data, 'add', uid);
			}
			var callback2 = function(data) {
				handleNotify(data, 'change', uid);
			}
			var callback3 = function(data) {
				handleNotify(data, 'remove', uid);
			}
			this.notifyRef.on('child_added', callback1);
			this.notifyRef.on('child_changed', callback2);
			this.notifyRef.on('child_removed', callback3);
		}

		function handleNotify(data, eventType, uid) {
			var key = data.key;
			var val = data.val();
			var canRemove = false;
			var type = val.type;



			if (val.type == 'send_request_friend') {

			}

			if (type == 'unfriend') {
				firebase.database().ref('users/' + uid + "/friends/" + val.content).remove();
				firebase.database().ref('users/' + val.content + "/friends/" + uid).remove();
				canRemove = true;
				if ($(".list_contact").html() != null) {
					var t = $(".list_contact .list_contact_item .contact-img[val = '" + btoa(val.content) + "']").parent();
					t.fadeOut();
					setTimeout(function() {
						t.remove();

						if ($(".list_contact li").length == 0) {
							$(".list_contact").append(
								'<li class=" text-center no-friend" style="color: #d1d1d1;">' +
								'You have no message <br> Search friend by type on <br>' +
								'<a href="">"Search Contact"</a>' +
								'</li>'
								)
							$(".right-main-content .right_sidebar .no-friend a").click(function(e) {
								e.preventDefault();
								$("#tb_search_friend").focus();
							})
						}

						if ($(".list_contact li.list_contact_item").length == 0) {
							load_message('new');
						} else {
							$(".list_contact li.list_contact_item").eq(0).click();
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
					success: function(data) {
						$(".tb_notify_container").addClass("bounceInDown").show().removeClass("bounceOutUp").find('.cover').html("You and " + data[0].user + " cancel request friend with ");
						setTimeout(function() {
							$(".tb_notify_container").removeClass("bounceInDown").addClass("bounceOutUp")

							$.ajax({
								url: base + "/search_notify",
								type: "POST",
								data: {
									tb: "hihi"
								},
								success: function(data) {
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

				var cal = function(data) {
					if (data.val().content == val.content && (data.val().type == 'send_request_friend' || data.val().type == 'request_friend')) {
						firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify/' + data.key).remove();
					}
				}
				firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify').on('child_added', cal);


				var time = getDateTimeNow();

				firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/friends/' + val.content + "/details").update({
					'time': time,
					'name': val.name,

				})
				firebase.database().ref('users/' + val.content + '/friends/' + firebase.auth().currentUser.uid + "/details").update({
					'time': time,
					'name': $(".left-main-content .user-details .name").attr('fullname'),
				})

				$(".tb_notify_container").addClass("bounceInDown").show().removeClass("bounceOutUp").find('.cover').html("You and " + val.name + " become a friend");
				setTimeout(function() {
					$(".tb_notify_container").removeClass("bounceInDown").addClass("bounceOutUp")
				}, 1500);
			}

			if (type == 'deny_request_friend' && eventType == 'add') {
				canRemove = true;


				var cal = function(data) {
					if (data.val().content == val.content && (data.val().type == 'send_request_friend' || data.val().type == 'request_friend')) {
						firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/notify/' + data.key).remove();
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
					success: function(data) {
						if (data[0].avatar == "uploads/avatar/default.jpg") {
							data[0].avatar = base_public + data[0].avatar;
						}
						if ($("#tb_request_friend_" + val.content).html() != null) return;
						$(".left-main-content .tb_cover .friend_request .friend_request_body").append(
							'<li class="d-flex" id="tb_request_friend_' + val.content + '" data = "' + btoa(val.content) + '">' +
							'<img src="' + data[0].avatar + '" class="tb_round_image">' +
							'<div class="name">' + data[0].user + '</div>' +
							'<i class="fa fa-check accept" aria-hidden="true"></i>' +
							'<i class="fa fa-times deny" aria-hidden="true"></i>' +
							'</li>'
							)

						var target = $("#tb_request_friend_" + val.content);

						$("#tb_request_friend_" + val.content + ' i.accept').click(function() {
							controll_request_friend($(this).parent(), 'accept');
						})
						$("#tb_request_friend_" + val.content + ' i.deny').click(function() {
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
			if (val.type == 'invite_caro' && eventType == 'add') {
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
			if (val.type == 'deny_caro' && eventType == 'add') {
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
					'<li class="d-flex room" id="tb_invite_room_' + val.content + '"  data = "' + btoa(val.content) + '">' +
					'<img src="' + val.avatar + '" class="tb_round_image">' +
					'<div class="invite">' + val.user + " invite you to join room " + val.name + '</div>' +
					'<i class="fa fa-check accept" aria-hidden="true"></i>' +
					'<i class="fa fa-times deny" aria-hidden="true"></i>' +
					'</li>'
					)

				$("#tb_invite_room_" + val.content + " .accept").click(function() {
					controll_invite_room(val.content, 'accept', key);
				})
				$("#tb_invite_room_" + val.content + " .deny").click(function() {
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
				firebase.database().ref('users/' + uid + "/notify/" + key).remove();
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

			}else{
				firebase.database().ref('users/' + friendKey + "/notify").push({
					type: 'deny_caro',
					content: firebase.auth().currentUser.uid,
					time: new Date().getTime()
				})
			}

		}
		function controll_invite_room(roomKey, type, key) {
			firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/notify/" + key).remove();
			if (type == 'accept') {
				firebase.database().ref('rooms/' + roomKey + "/members").on('child_added', function(snap) {
					var mem = snap.val();
					mem = JSON.parse(mem);
					var newMem = {
						avatar: $(".left-main-content .menu .user-details .image img").attr('src'),
						name: $(".left-main-content  .menu .user-details .name").attr('fullname'),
						uid: firebase.auth().currentUser.uid,
						time: new Date().getTime(),
					}
					mem.push(newMem);
					firebase.database().ref('rooms/' + roomKey + "/members").update({
						member: JSON.stringify(mem),
					})
					var details = {};
					firebase.database().ref('rooms/' + roomKey + "/details").on('child_added', function(snapShot) {
						details[snapShot.key] = snapShot.val();
						if (snapShot.key == 'time') {
							firebase.database().ref('users/' + firebase.auth().currentUser.uid + "/rooms/" + roomKey).update(details);
						}
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