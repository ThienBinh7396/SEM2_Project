$(document).ready(function() {
	var leng = $(".animation .animation-item").length;
	var item_out = 0, item_in = 1;
	var base = $("#base").attr('base');
	var base_pub = $("#base_public").attr('base');

	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});

	var timer1 = setInterval(() => {
		$(".animation .animation-item").eq(item_out).hide({
			effect: "scale",
			duration: 400
		});
		$(".animation .animation-item").eq(item_in).show();
		item_out = item_in;
		item_in ++;
		if (item_in >= leng) {
			item_in = 0
		}
	}, 3500)
	$('.carousel').carousel({
		interval: 3500,
		pause: false
	})
	$("#categories li").click(function(e){
		location.href = base + "/show_product/" + $(this).attr('val');
	})


	$(".product .category ul li").click(function(){
		click_category($(this));
	})
	$(".product .category ul li").dblclick(function(event) {
		dbclick_caterory($(this));
	});
	function click_category(that){
		if ($(".product .information .cover").css('display') == 'block') {
			$(".product .information .cover").hide({
				effect: 'clip',
			})
		}

		$(".product .category ul li").removeClass("actived");
		that.addClass('actived');
		$.ajax({
			url: base + "/select_product",
			type: "GET",
			data: {
				id_category: that.attr('id')
			},
			success: function(data){
				console.log(data)
				$(".container_product .show_product").html(data);
				$(".show_product li").click(function(event) {
					click_product($(this));
				});
				$(".show_product li .remove").click(function(e){
					remove($(this).parent());
					type = "product";
				})
			}

		})
	}
	function dbclick_caterory(that){
		var name_category = that.children('.text').text().trim();
		that.append('<input class= "edit" type="text" >');
		that.children('.edit').val(that.children('.text').text().trim()).focus();
		event.preventDefault();
		that.children('.edit').blur(function(event) {
			console.log(that.html());
			$(this).remove();
			that.children('.text').text($(this).val());
			$.ajax({
				url: base + "/update_category",
				type: "GET",
				data: {
					id: that.attr('id'),
					name: $(this).val()
				},
				success: function(data){
					console.log(data)
				}		
			})
		});

	}
	$(".product ul li .remove").click(function(e){
		remove($(this).parent());
		type = "category";
	})
	var current_id, current_category_element, type, current_product_element;
	function remove(that){
		current_id = that.attr('id');
		current_category_element = that;
		current_product_element = that;
		$("#remove_category").click();
	}
	$(".modal-footer .tb_yes").click(function(){
		if (type=="category") {
			current_category_element.fadeOut();
			setTimeout(() => {
				current_category_element.remove();
			}, 600)

			$.ajax({
				url: base + "/remove_category",
				type: "GET",
				data: {
					id: current_id
				},
				success: function(data){
					console.log(data);
					$(".product .category ul li").eq(0).click();
				}
			})
		}else{
			current_product_element.fadeOut();
			setTimeout(() => {
				current_product_element.remove();
			}, 600);

			$.ajax({
				url: base + "/remove_product",
				type: "GET",
				data: {
					id_category: $(".product .category ul li.actived").attr('id'),
					id_product: current_id
				},
				success: function(data){
					console.log(data);
					$(".product .show_product li").eq(0).click();
					$(".product .show_product ul").scrollTop(0);
				}
			})
		}
	})
	$(".product .category ul li").eq(0).click();
	$(".product .category .add_category").click(function(){
		var l = $(".product .category ul li").length;
		$(this).prev().append('<li class = "animated fadeInUp"><div class = "text">New Category ' + l +'</div><div class="remove"><i class="fa fa-times" aria-hidden="true"></i></div></li>');

		var last_li = $(this).prev().children('li').eq($(".product .category ul li").length - 1);

		last_li.dblclick(function(e){
			dbclick_caterory($(this));
		});
		last_li.click(function(e){
			click_category($(this));
		});
		$(".product ul li .remove").click(function(e){
			remove($(this).parent());
			type = "category";
		})
		$.ajax({
			url: base + "/add_category",
			type: "GET",
			data: {
				name: 'New Product ' + l
			},
			success: function(data){
				last_li.attr('id', data);
			} 
		})
	})

	$(".product .add_product").click(function(event) {
		var parent = $(this).prev();
		var new_product = $(".category ul .actived").text() + " " +  (parent.children("li").length + 1);
		parent.append("<li class = 'animated fadeInUp'>" + new_product + "<div class='remove'><i class='fa fa-minus-circle'></i></div></li>");
		$(".product .show_product").animate({scrollTop:800}, 500, 'swing');

		$.ajax({
			url: base + '/add_product',
			type: 'GET',
			data: {
				id_category: $(".product .category .actived").attr('id'),
				name: new_product
			},
			success: function(data) {
				parent.children("li").eq(parent.children("li").length - 1).attr('id', data);
				$(".show_product li").eq(parent.children("li").length - 1).click(function(event) {
					click_product($(this));
				});
				$(".show_product li").eq(parent.children("li").length - 1).children(".remove").click(function(e){
					remove($(this).parent());
					type = "product";
				})
			}
		});

	});
	function click_product(that){
		if ($(".product .information .cover").css('display') == 'none') {
			$(".product .information .cover").show({
				effect: 'clip',
			})
		}
		$(".show_product li").removeClass("actived");
		that.addClass('actived');

		$.ajax({
			url: base + "/select_introduce",
			type: "GET",
			data: {
				id_product: that.attr('id')
			},
			success: function(data){
				console.log(data);
				$("#product_name").val(data[0].name.trim());
				$("#product_cost").val(data[0].cost.trim());
				$("#product_description").val(data[0].description.trim());
			}
		})

		$.ajax({
			url: base + "/select_information",
			type: "GET",
			data: {
				id_product: that.attr('id')
			},
			success: function(data){
				console.log(data);
				$(".product .information .cover .form-group .list .list_item").each(function(index, el) {
					console.log(index);
					if (index != 0) {
						$(this).fadeOut(150);
						setTimeout(() => {
							$(this).remove();
						}, 150)
					}
				});
				data.forEach((item) => {
					$(".product .information .cover .form-group .list").append(
						'<div class="list_item animated  zoomIn" id="first_item">'
						+ '<img src="' + base_pub + item.path_thumbnail + '" />'
						+ '<div class="remove" parent = "' + $(".container_product .show_product li.actived").attr('id') 
						+ '" id = "' + item.id + '"><i class="fa fa-ban" aria-hidden="true"></i></div>'
						+ '</div>'
						)
				})
			}
		})
	}

	$("#first_item").click(function(e){
		$("#thumbnail_product").click();
	})

	var pathThumbnail;
	$("#thumbnail_product").change(function(e){
		if ($(this).val() != "") {
			var file = e.target.files[0];

			if (file.type != "image/jpeg" && file.type != "image/jpg" && file.type != "image/png" && file.type != "image/ico") {
				alert('Type of image not found !!!');
				return;
			}
			pathThumbnail = URL.createObjectURL(file);


			var formData = new FormData();
			formData.append('file', file);
			formData.append('id', $(".container_product .show_product li.actived").attr('id'));
			$.ajax({
				url: base + "/upload_image",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(data){
					console.log(data);
					$(".product .information .cover .form-group .list").append(
						'<div class="list_item" id="first_item">'
						+ '<img src="' + pathThumbnail + '" />'
						+ '<div class="remove" parent = "' + $(".container_product .show_product li.actived").attr('id') 
						+ '" id = "' + data + '"><i class="fa fa-ban" aria-hidden="true"></i></div>'
						+ '</div>'
						)

					$(".product .information .cover .form-group .list .remove").click(function(){
						var that = $(this).parent();
						$.ajax({
							url: base + "/remove_image",
							type: "POST",
							data: {
								id_product: $(this).attr('parent'),
								id_thumbnail: $(this).attr('id')
							},
							success: function(data){
								if (data == "done") {
									that.fadeOut();
									setTimeout(() => {
										that.remove();
									}, 300);
								}
							}

						})
					})
					
				}
			})
		}
	});

	$("#product_cost").blur(function(e){
		console.log("blur: ");
		console.log($(".product .container_product .actived").attr('id'), $(this).val());
		var value = $(this).val();
		$.ajax({
			url: base + "/update_product",
			type: "GET",
			data: {
				id_product: $(".product .container_product .actived").attr('id'),
				field: "cost",
				value: $(this).val()
			},
			success: function(data){
			}
		})
	})

	$("#product_name").blur(function(e){
		console.log("blur: ");
		console.log($(".product .container_product .actived").attr('id'), $(this).val());
		var value = $(this).val();
		$.ajax({
			url: base + "/update_product",
			type: "GET",
			data: {
				id_product: $(".product .container_product .actived").attr('id'),
				field: "name",
				value: $(this).val()
			},
			success: function(data){
				if (data == "1") {
					$(".product .container_product .actived .text").text(value);
				}
			}
		})	
	})
	$("#product_description").blur(function(e){
		var value = $(this).val();
		$.ajax({
			url: base + "/update_product",
			type: "GET",
			data: {
				id_product: $(".product .container_product .actived").attr('id'),
				field: "description",
				value: $(this).val()
			},
			success: function(data){
				if (data == "1") {
				}
			}
		})	
	})
	$("#product_description").keydown(function(e){
		if (e.which == 9) {
			e.preventDefault();
			// console.log("val: " + $(this).val());
			var string = $(this).val();
			for (var i = string.length - 1; i >= 0; i--) {
				if (string[i] == " ") {
					break;
				}
			}
			console.log(string.substring(i + 1, string.length));
			if (string.substring(i + 1, string.length) == "lorem") {
				$(this).val(string.substring(0, i + 1) 
					+"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
					+ "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
					+ "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
					+ "consequat.\n Duis aute irure dolor in reprehenderit in voluptate velit esse"
					+ "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"
					+ "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."				
					);
			}
			if (string.substring(i + 1, string.length) == "iphone") {
				$(this).val(string.substring(0, i + 1) 
					+'iPhone (/ˈaɪfoʊn/ EYE-fone) is a line of smartphones designed and marketed by Apple Inc. The iPhone line of products use Apples iOS mobile operating system software. The first-generation iPhone was released on June 29, 2007, and multiple new hardware iterations with new iOS releases have been released since. \n The user interface is built around the devices multi-touch screen, including a virtual keyboard. The iPhone has Wi-Fi and can connect to cellular networks.'
					);
			}
			if (string.substring(i + 1, string.length) == "laptop") {
				$(this).val(string.substring(0, i + 1) 
					+ 'A laptop, also called a notebook computer or just notebook, is a small, portable personal computer with a "clamshell" form factor, having, typically, a thin LCD or LED computer screen mounted on the inside of the upper lid of the "clamshell" and an alphanumeric keyboard on the inside of the lower lid.\n The "clamshell" is opened up to use the computer. Laptops are folded shut for transportation, and thus are suitable for mobile use.'
					);
			}
			if (string.substring(i + 1, string.length) == "tv") {
				$(this).val(string.substring(0, i + 1) 
					+ 'Television (TV) is a telecommunication medium used for transmitting moving images in monochrome (black and white), or in colour, and in two or three dimensions and sound. The term can refer to a television set, a television program ("TV show"), or the medium of television transmission. Television is a mass medium for advertising, entertainment and news. \n Television became available in crude experimental forms in the late 1920s, but it would still be several years before the new technology would be marketed to consumers.'
					);
			}
			if (string.substring(i + 1, string.length) == "car") {
				$(this).val(string.substring(0, i + 1) 
					+ 'A car (or automobile) is a wheeled motor vehicle used for transportation. Most definitions of car say they run primarily on roads, seat one to eight people, have four tires, and mainly transport people rather than goods.\n  Cars came into global use during the 20th century, and developed economies depend on them. The year 1886 is regarded as the birth year of the modern car when German inventor Karl Benz patented his Benz Patent-Motorwagen.'
					);
			}
			$(this).scrollTop(10000);
		}
	})
	$(".rate").each(function(index, el) {
		console.log($(this).attr('rate'));
		if ($(this).attr('rate') != "" && $(this).attr('rate') != null) {
			$(this).html(
				'<div class="rate_cover" style="background-image: url(' +  base_pub + '/uploads/project/st.png' + ')">'
				+ '<div class="rate_user" style="width: '+ (Number($(this).attr('rate')/5) * 100) 
				+'%;background-image: url(' + base_pub + '/uploads/project/star.png' + ');"></div>'
				+ '</div>'
				)
		}
	});
});