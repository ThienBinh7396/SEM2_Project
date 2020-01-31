$(document).ready(function() {

	$(".ui-dialog-titlebar-close").append('<i class="fa fa-times" aria-hidden="true"></i>');
	var baseUrl = $("#base").attr("base");
	var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	init();
	new PerfectScrollbar('.main_content')
	$(".form-group button.display").click(function(e) {
		e.preventDefault();
		if ($(this).siblings('input').attr('type') == "password") {
			$(this).siblings('input').attr('type', 'text');
			$(this).children("i").removeClass('fa-eye-slash').addClass('fa-eye');
		} else {
			$(this).siblings('input').attr('type', 'password');
			$(this).children("i").addClass('fa-eye-slash').removeClass('fa-eye');
		}
	})
	$(".register").click(function(e) {
		e.preventDefault();
		$("#ComfirmPassword").val("");
		if ($(this).text() == "Register") {
			$(".group-user").slideDown();
			$(".group-register").slideDown();
			$("button[type='submit']").text("Save");
			$("button.register").text("Cancel");
			$("#email").trigger('keyup');
		} else {
			$(".form-group .report").fadeOut();
			$(".group-register").slideUp();
			$(".group-user").slideUp();
			$("button[type='submit']").text("Login");
			$("button.register").text("Register");
		}
	});
	$("input").focus(function() {
		$(this).select();
		$(this).removeClass("error");
		$(this).siblings('.report-required').slideUp();
		$(this).siblings('.report-password').slideUp();
		if ($(this).attr('id') == "email") {
			return;
		}
		$(this).siblings(".report").slideUp();
	});
	$("#email").keyup(function(e) {
		e.preventDefault();
		if ($(".success").text() == "Login" || $(this).val() == "") return;
		$.get(baseUrl + "/check_exists", {
			check: $(this).val(),
	        // "_token": CSRF_TOKEN
	    }, function(data) {
	    	if (data.length > 0) {
	    		$("#email").next().slideDown();
	    	} else {
	    		$("#email").next().slideUp();
	    	}
	    })
	});
	var  checkRegister = false;
	$(".success").click(function(e) {
		e.preventDefault();
		if ($(this).text() == "Save") {
			var check = false;
			$("input").removeClass("error");
			$("input").each(function(index, el) {
				if ($(this).val() == "") {
					$(this).addClass("error");
					$(this).siblings('.report-required').slideDown();
					check = true;
				}
			});
			if (!validateEmail($("input#email").val())) {
				$("input#email").addClass("error");
				$("input#email").siblings('.report-required').text('* ' + $("input#email").val() + " is not valid").slideDown();
				check = true;
			}
			if (check) {
				return;
			}
			if ($("#report-email").css('display') != "none") {
				$("#report-email").siblings('input').addClass('error');
				return;
			}
			if ($("#password").val().length < 6) {
				$("#password").addClass("error");
				$("#password").siblings('.report-password').slideDown();
				return;
			}
			if ($("#comfirm").val() != $("#password").val()) {
				$("#comfirm").addClass('error');
				$("#comfirm").siblings('.report').slideDown();
				return;
			}
			var form_data = new FormData($("#form")[0]);
			$.ajax({
				type: "POST",
				url: baseUrl + "/register_user",
				data: form_data,
				processData: false,
				contentType: false,
				success: function(request) {
					console.log(request);
					if (request == "error") {
						swal({
							type: 'error',
							title: 'Oops...',
							text: 'Register failure!',
						})

					} else {
						swal({
							type: 'success',
							title: 'Your account has been saved',
							timer: 500
						})	

						$(".group-register").slideUp();
						$(".group-user").slideUp();
						$("button[type='submit']").text("Login");
						$("button.register").text("Register");
						
						checkRegister = true;
						firebase.auth().createUserWithEmailAndPassword(request.email, request.password)
						.then(function(){
							$.ajax({
								url: baseUrl + "/update_id", 
								type: "POST",
								data: {
									uid: firebase.auth().currentUser.uid,
									email: request.email
								}
							})

							firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/details').update({
								'id' : firebase.auth().currentUser.uid
							})
						})
						.catch(function(error) {
							var errorCode = error.code;
							var errorMessage = error.message;
							swal({
								type: 'error',
								title: 'Oops...',
								text: 'Register failure!'
							})
						});
					}
				}
			});
		} else {
			var check = false;
			$("input#email").each(function(index, el) {
				if ($(this).val() == "") {
					$(this).addClass("error");
					$(this).siblings('.report-required').text("*Email field cann't be empty").slideDown();
					check = true;
				}
				if (!validateEmail($(this).val())) {
					$(this).addClass("error");
					$(this).siblings('.report-required').text('* ' + $(this).val() + " is not valid").slideDown();
					check = true;
				}
			});
			$("input#password").each(function(index, el) {
				if ($(this).val() == "") {
					$(this).addClass("error");
					$(this).siblings('.report-required').slideDown();
					check = true;
				}
			});
			if (check) {return;}
			$.ajax({
				url: baseUrl + "/login_user", 
				data: {
					password: $("#password").val(),
					email: $("#email").val()
				},
				type: "get",
				success: function(request) {
					if (request == "error") {
						swal({
							type: 'error',
							title: 'Oops...',
							text: 'Email or password incorrect!',
						})
					} else {
						firebase.auth().signInWithEmailAndPassword($("#form #email").val(), $("#form #password").val()).then(function(){
							location.href = $("#baseUrl").attr('base') + "chathub/message_view";
						});
					}
				}
			})
		}
	})
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function init() {
		var config = {
			apiKey: "AIzaSyAtv8Mh3MczMYByAKz9YmWE5xkRKfhsYhU",
			authDomain: "chathub7396.firebaseapp.com",
			databaseURL: "https://chathub7396.firebaseio.com",
			projectId: "chathub7396",
			storageBucket: "chathub7396.appspot.com",
			messagingSenderId: "550031613509"
		};
		firebase.initializeApp(config);

		firebase.auth().onAuthStateChanged(function(user){
			if (user ) {
				
				// var timerInterval;
				// swal({
				// 	title: 'You have been logged in!',
				// 	type: 'warning',
				// 	html: 'Window will direct in <strong></strong> seconds.',
				// 	timer: 600,
				// 	onOpen: function() {
				// 		swal.showLoading()
				// 		timerInterval = setInterval(function() {
				// 			swal.getContent().querySelector('strong')
				// 			textContent = swal.getTimerLeft()
				// 		}, 400)
				// 	},
				// 	onClose: function() {
				// 		if (checkRegister) {
				// 			$("button.success").click();
				// 		}else{
				// 			location.reload();
				// 		}
				// 	}
				// })
			}
		})
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
})
