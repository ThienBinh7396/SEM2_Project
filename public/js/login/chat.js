$(document).ready(function() {
	
	var base = $("#base_url").attr('base');
	var base_public = $("#base_pub").attr('base');
	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$(".profile_user").load(base + "/ajax_load_html", function(){
		start();
		update_format_time();
		wrapImage();
	});

	$("#main-content .left_header .setting").click(function(e){
		if ($("#main-content .main-menu").css('display') == "none") {
			$("#main-content .main-menu").slideDown();
		}else{
			$("#main-content .main-menu").slideUp();

		}
	});
	function wrapImage(){
		$(".content_post img").each(function(index, el) {
			if (!$(this).parent().hasClass("wrapper-image")) {
				$(this).wrap('<div class="wrapper-image"></div>');
				$(this).parent().css({
					width: 'auto',
				// 	height: $(this).height(),
			})
				console.log($(this).width())
			}
		});
	}

	function start() {
		var checkFirst = false;

		var config = {
			images : {
				editing : {
					preferredWidth: 420
				}
			}
		};

		$(".profile_user #profile_up_posts").click(function(event) {
			$(".profile_user").animate({
				scrollTop : 100
			}, 550);

			setTimeout(() => {
				$(".tb_full_width").show({
					effect: "fold",
				});
			}, 280);
			if (!checkFirst) 
			{
				var xxx = textboxio.replace('#textboxio_post',config);
				$(".tb_full_width .button").click(function(){
					$(".tb_full_width").hide({
						effect: "blind",
					});
					$(".visual_cover").html(xxx.content.get());
					var tb_content_post = upload_image_to_server();
					var d = getDateTimeNow();
					if (tb_content_post == "") return; 
					$.ajax({
						url: base + "/post_new",
						type: "post",
						data: {
							content : tb_content_post,
							current_time : d
						}, 
						success: function(data){
							$(".profile_user .profile_body .profile_information #item_information_2 > ul").prepend(
								'<li><div class="top"><div class="center"></div></div>'
								+ '<div class="image">'
								+ '<h3 class="time time_post">' + dateToDDMY(new Date(d))  + '</h3>'
								+ '<div class="content_post">'
								+ tb_content_post
								+ '</div>'
								+ '</div>'
								+ '<div class="bottom"></div>'
								+ '</li>'
								);
							console.log("post: " + data);
						}
					})
				});

			}		
		});


		$(".profile_user .tb_fs_edit").append('<div class="form-control edit edit_content"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>');
		checkEmpty("", "");
		
		$(".profile_menu .top li").click(function(){
			var item = $(this).attr('for');

			if (item == "item_information_1") {
				$(".profile_page .profile_body .profile_up_posts").fadeOut();
			}else{
				$(".profile_page .profile_body .profile_up_posts").fadeIn();
			}
			$(".profile_menu .top li").removeClass('actived');
			$(this).addClass("actived");
			$(".profile_information .content .item").each(function(index, el) {
				if ($(this).attr('id') == item) {
					$(this).show({effect: 'slide', director: 'left'});
				}else{
					$(this).hide({effect: 'slide', director: 'right'});

				}
			});
		})

		$(".main-menu #user").click(function(){
			$(".profile_user").slideDown();
		});
		$('.profile_user .profile_close').click(function(){
			$(".profile_user").hide({effect: 'slide', director: 'left'});

		});
		$(".profile_user .change_avatar").click(function(e){
			$(this).siblings('#update_avatar').click();
		});

		$(".profile_user #update_avatar").change(function(e){
			e.preventDefault();
			if ($(this).val() != "") {
				console.log(e.target.files[0].type);
				if (e.target.files[0].type != "image/jpeg" && e.target.files[0].type != "image/jpg" && e.target.files[0].type != "image/png" && e.target.files[0].type != "image/ico") {
					alert('Type of image not found !!!');
					return;
				}

				pathAvatar = URL.createObjectURL(e.target.files[0]);
				var form_data = new FormData();
				form_data.append('avatar', e.target.files[0]);


				$.ajax({
					type: "POST",
					url : base + "/update_infor",
					data: form_data,
					processData: false,
					contentType: false,
					success: function(data){
						console.log(data);
					}
				})		
				$("img.thumbnail_user").attr("src", pathAvatar);
			}

		})


		var checkHeight = false, heightCur;
		$(".profile_user .tb_fs_edit .edit_content").click(function(e){
			var infor = $(this).siblings('.lb_infor');
			var v = infor.text().trim();
			if (infor.children(".loading").text() != "") {
				console.log(infor.html());
				
				v = "";
			}
			var curHeight = infor.height();

			console.log($(this).siblings('label').attr('field') + " " + $(this).siblings('.lb_infor').attr('type'));
			if (infor.attr('type') == "text") {
				$(".profile_page .content").animate({
					scrollTop : $(".profile_page .content").scrollTop() + 50
				}, 150);

				infor.parent().append('<div class="form-control edit save_edit" field = "' + $(this).siblings('label').attr('field') + '"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>');
				infor.parent().children('.edit_content').css('display', 'none');

				infor.summernote({
					focus: true,
					codemirror: { // codemirror options
						theme: 'sandstone'
					}
				});
				$(".note-editor").hide();
				$(".note-editor").slideDown();
				if (v == "") {
					$(".note-editable").html("");
				}
			}else if (infor.attr('type') == "date"){ 
				var date = new Date(v);
				console.log(dateToYMD(date));
				infor.append("<input class = 'modify' type = 'date' field = '" + $(this).siblings('label').attr('field') + "'>");
				if (v != "" && v != null) {
					console.log("test: " + v)
					infor.children('.modify').val(dateToYMD(date)).change();
				}
				infor.animate({
					height: '22px'
				}, 300);
				infor.children('.modify').animate({
					height: '22px',
				}, 280);
			}else{
				infor.append(
					"<select class = 'modify' field ='" + $(this).siblings('label').attr('field') + "' >"
					+ "<option value = 'Male'>Male</option>"
					+ "<option value = 'Female'>Female</option>"
					+ "<option value = 'Orther'>Orther</option>"
					+ "</select>"
					);
				infor.children('.modify').css({
					width: '120px'
				})
				console.log(infor.text());
				infor.children('.modify').val(v).change();
				infor.animate({
					height: '22px'
				}, 300);
				infor.children('.modify').animate({
					height: '22px',
				}, 280);
			}
			infor.children('.modify').focus();
			infor.siblings('.save_edit').click(function(event) {
				var markup = infor.summernote('code');
				infor.siblings('.note-editor').animate({
					height: 0
				}, 250);
				markup = markup.replace(/(<p><br><\/p>)/g,"");
				setTimeout(() => {
					infor.summernote('destroy');
					if (markup == "") {
						infor.html("");
					}
				}, 180)
				$(this).fadeOut();
				infor.siblings('.edit_content').fadeIn();
				setTimeout(() => {
					checkEmpty(infor, markup);
				}, 200)
				$.ajax({
					url: base + "/update_infor",
					type: "POST",
					data: {
						field : $(this).attr('field'),
						data: markup,
						"_token": CSRF_TOKEN
					},
					success: function(data){
					}
				})
			});
			infor.children('.modify').blur(function(){
				console.log("blur: " + $(this).val() + "...." + $(this).attr('field'));
				var dt = $(this).val();
				if ($(this).attr('type') == "text") {
					dt = dt.replace(/(^|\r\n|\n)([^*]|$)/g, "$1<br>$2");
					dt = dt.replace("<br>", "");
				}
				$.ajax({
					url: base + "/update_infor",
					type: "POST",
					data: {
						field : $(this).attr('field'),
						data: dt,
						"_token": CSRF_TOKEN
					},
					success: function(data){
						infor.html(dt);
						checkEmpty(infor, dt);
					}
				})

				if (checkHeight) {
					infor.animate({
						height: heightCur
					}, 280);	
				}
				infor.children('.modify').animate({
					height: 0
				}, 280);
				setTimeout(() => {
					infor.children('.modify').remove();
				}, 200)
			});
		})


		// $(".profile_user .profile_information .edit_content").click(function(){
		// 	$(this).parent().siblings(".infor-content").summernote({focus: true});
		// 	$(".note-editor").hide();
		// 	$(".note-editor").slideDown();

		// 	$(this).siblings('.save_edit').fadeIn();
		// 	$(this).siblings('.save_edit').css('display', 'inline-block');
		// })

		// $(".profile_user .profile_information .save_edit").click(function(){
		// 	var markup = $(this).parent().siblings(".infor-content").summernote('code');
		// 	$(this).parent().siblings(".infor-content").summernote('destroy');
		// 	$(this).fadeOut();
		// 	if (markup == "<p><br></p>") return;
		// 	$.ajax({
		// 		url : base + "/update",
		// 		type : "POST",
		// 		data : {
		// 			field : $(this).attr('field'),
		// 			data: markup,
		// 			"_token": CSRF_TOKEN
		// 		},
		// 		success: function(data){
		// 			console.log("rq: " + data);
		// 		}

		// 	})

		// })
	}
	function checkEmpty(target, val){
		if (target == "") {
			$(".lb_infor").each(function(index, el) {
				if ($(this).text().trim() == ""  && $(this).children(".loading").text() == "") {
					$(this).append('<div class="loading" >'
						+'<img src="' + base_public + "uploads/Spinner.gif" + '" alt="">'
						+ ' <div class="text">Update this field!!!</div> '
						+ '</div>');
				}else{
					$(this).children(".loading").remove();
				}
			});
		}else{
			if (val == "") {
				target.children(".loading").remove();
				target.append('<div class="loading" >'
					+'<img src="' + base_public + "uploads/Spinner.gif" + '" alt="">'
					+ ' <div class="text">Update this field</div> '
					+ '</div>');
			}
		}
	}
	function dateToYMD(date) {
		var d = date.getDate();
		var m = date.getMonth() + 1; 
		var y = date.getFullYear();
		return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
	}
	function update_format_time(){
		$(".time_post").each(function(index, el) {
			$(this).text(dateToDDMY($(this).text()));		
		});
	}
	function dateToDDMY(string_date){
		var d = new Date(string_date);
		var hours ;
		var minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
		var seconds = d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds();
		if (d.getHours() > 12) {
			hours = (d.getHours() - 12) + ":" + minute + ":" + seconds  + " pm"
		}else{
			hours = d.getHours() + ":" + minute+ ":" + seconds + " am"
		}
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

		return days[d.getDay()] + ", " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + hours;
	}
	function getDateTimeNow(){
		var d = new Date();
		return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " 
		+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	}
	function upload_image_to_server(){
		if ($(".visual_cover img").length > 0) {
			$(".visual_cover img").each(function(index, el) {
				var extension = getExtensionImage($(this).attr("src"));
				
				var name = window.btoa(encodeURI($(".profile_user .profile_name").text().trim())) + "_" + Date.now() 
				+ "."+ extension.substring(extension.indexOf("/") + 1, extension.length);
				var oldSrc = $(this).attr("src");
				var newSrc = base_public + "uploads/post_image/" + name;

				upload_image(oldSrc, name, extension);
				$(this).attr("src", newSrc);
			});
		}
		return $(".visual_cover").html().trim().replace(/<p><br><\/p>/g, "");
	}
	function upload_image(oldSrc, name, extension){
		srcToFile(oldSrc, name, extension).then(function(file){
			var form_data = new FormData();
			form_data.append('image', file);
			console.log(extension);
			$.ajax({
				type: "POST",
				url : base + "/upload_image",
				data: form_data,
				processData: false,
				contentType: false,
				success: function(data){
					console.log(data);
				}
			})	
			
		});
	}
	function srcToFile(src, fileName, mimeType){
		return (fetch(src)
			.then(function(res){return res.arrayBuffer();})
			.then(function(buf){return new File([buf], fileName, {type:mimeType});})
			);
	}
	function getExtensionImage(srcImage){
		var start = srcImage.indexOf(":");
		var end = srcImage.indexOf(";");
		return srcImage.substring(start  + 1, end);
	}
	
});