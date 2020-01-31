
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Page Title</title>

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="{{asset('plugin/p5/caro.css')}}">
	<script src="{{asset('plugin/firebase/firebase.js')}}"></script>
	<style type="text/css" media="screen">
	canvas{
		border: 1px solid rgba(0,0,0,.125);
		margin-top: 3px;
	}
	.d-none{
		display: none;
	}
	.caro_remove{
		position: absolute;
		right: 0px;
		top: 0px;
		cursor: pointer;
		font-size: 18px;
		width: 28px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		color: #111;
		transition: 0.3s;
		background-color: transparent;
		font-family: cursive;
		font-weight: bold;
	}
	.caro_remove:hover{
		background: rgba(244, 44, 44, 0.85);
		color: #fff;
	}
	#re-start{
		display: none;
		top: 234px;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		border: 1px solid #327E04;
		background: #327E04 url("{{asset('uploads/ui-bg.png')}}") 50% 50% repeat-x;
		padding: .4em 0.8em;
		cursor: pointer;
		opacity: 0.85;
	}
	#re-start span{
		margin-right: 10px;
	}
	img{
		width: 27px;
		height: 27px;
		border-radius: 100%;
	}
	.name{
		position: absolute;
		left: 32px;
		top: 3px;
		font-size: 17px;
		font-family: cursive;
		color: #694b4b;
	}
</style>
</head>
<body style="margin: 0; user-select: none;">
	<div class="">
		<div class="card-header caro_header" style="height: 30px;padding: 0; position: relative;">
			<img src="{{$user[0]->avatar}}"  alt=""> <span class="name">{{$user[0]->user}}</span> <button id="re-start"><span>↺</span>Restart</button><i class="caro_remove">X</i>
		</div>
	</div>
	<input type="text" value="{{$friend}}" class="d-none" id="friend" name="">
	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->

	<script>
		var config = {
			apiKey: "AIzaSyAtv8Mh3MczMYByAKz9YmWE5xkRKfhsYhU",
			authDomain: "chathub7396.firebaseapp.com",
			databaseURL: "https://chathub7396.firebaseio.com",
			projectId: "chathub7396",
			storageBucket: "chathub7396.appspot.com",
			messagingSenderId: "550031613509"
		};
		firebase.initializeApp(config);
	</script>
	<script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
	<script type="text/javascript" src="{{asset('plugin/p5/p5.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('plugin/p5/p5.play.js')}}"></script>
	<script type="text/javascript" src="{{asset('plugin/p5/caro.js')}}"></script>
</body>
</html>