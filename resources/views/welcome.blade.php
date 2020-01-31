<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'ThienBinh') }}</title>

    <!-- Scripts -->
    
    <!-- icon -->    
    <link rel="icon" href="{{asset('uploads/logo.png')}}">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('vendor/adminlte/vendor/font-awesome/css/font-awesome.min.css') }}">

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="{{asset('plugin/perfect_scrollbar/ps.min.css')}}">
    <script type="text/javascript" src="{{asset('plugin/perfect_scrollbar/ps.min.js')}}"></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/login/style.css') }}">
    <link rel="stylesheet" type="text/css" href="{{asset('plugin/sweet_alert/sweet_alert.min.css')}}">
    <script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
   <script src="{{ asset('js/jquery-ui.min.js') }}"></script>
    <script type="text/javascript" src="{{asset('plugin/sweet_alert/sweet_alert.min.js')}}"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.4/firebase.js"></script>
    <script src="{{ asset('vendor/adminlte/vendor/bootstrap/dist/js/bootstrap.js') }}"></script>
    <script type="text/javascript" src = "{{asset('js/login/script.js')}}">

    </script>
    

</head>
<body style="background-image: url('{{asset('uploads/bg-01.jpg')}}'); ">

    <div class="container-fluid main_content">
        <div class="row">
            <div class="col">
                <form action="register.php" method="POST" role="form" enctype="multipart/form-data" id="form">
                    {{csrf_field()}}

                    <legend>log in</legend>
                    <div class="form-group group-user" style="display: none;">
                        <div class="display"><i class="fa fa-user" aria-hidden="true"></i></div>
                        <input type="text" class="form-control" id="user" name="user" placeholder="User"> 
                        <div class="report">*User already exists</div>
                        <div class="report-required">*User field cann't be empty</div>
                    </div>

                    <div class="form-group" >
                        <div class="display"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Email"> 
                        <div class="report" id="report-email">*Email already exists</div>
                        <div class="report-required">*Email field cann't be empty</div>
                    </div>
                    <div class="form-group">
                        <div class="display"><i class="fa fa-lock" aria-hidden="true"></i></div>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password"><button class="display"><i class="fa fa-eye-slash"></i></button>
                        <div class="report">*User already exists</div>
                        <div class="report-required">*Password field cann't be empty</div>
                        <div class="report-password">*Password must be at least 6 characters.</div>
                    </div>

                    <div class="form-group group-register" style="display: none;">
                        <div class="display"><i class="fa fa-check-circle" aria-hidden="true"></i></div>
                        <input type="password" class="form-control" id="comfirm" name="comfirm" placeholder="Retype password"><button class="display"><i class="fa fa-eye-slash"></i></button>
                        <div class="report">*Retype password doesn't match</div>
                    </div>
                    <div id = "base" class="hidden" base = "{{route('login_chat')}}"></div>
                    <div id = "baseUrl" class="hidden" base = "{{asset('')}}"></div>    

                    <div class="btn-group justify-content-around" role="group">
                        <button type="submit" class="btn my_button success">Login</button>

                        <button type="button" class="btn my_button register">Register</button>
                    </div>

                    <div class="forgot">
                        <a href="">I forgot my password</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    


    
</body>
</html>
