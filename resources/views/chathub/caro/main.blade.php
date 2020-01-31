<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title></title>
	<link rel="stylesheet" href="">
	<style type="text/css" media="screen">
	</style>
</head>
<body>
	<button type="">Get</button>
	<div class="cover" >
	</div>
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	@php
	$friend = 'PEK7povoJ1aPlnSLMJX6H5AzXfq1';
	@endphp
	<script type="text/javascript">
		$("button").click(function(event) {
			$(".cover").append(
				'<iframe src="' + "{{route('load_caro', $friend)}}" + '" style="border:none;width: 460px;height: 410px;"></iframe>'
				)
		});
	</script>
</body>
</html>