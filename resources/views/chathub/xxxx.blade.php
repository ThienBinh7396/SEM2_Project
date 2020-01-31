<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>bootstrap4</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>
  
  <!-- include codemirror (codemirror.css, codemirror.js, xml.js, formatting.js) -->
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css">
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/theme/monokai.css">
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.js"></script>

  <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-bs4.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote-bs4.js"></script>
  <script type="text/javascript" src="{{asset('js/textboxio/textboxio.js')}}"></script>
</head>
<body>
  <!-- <div id="summernote"></div> -->

  <div class="create_posts" style="position: fixed;top: 0; width: 100%; height: 100%; background: rgba(0,0,0, 0.6);">

    <div class="cover" style="width: 520px; height: 480px;  margin: auto; padding-top: 20px;">
      <div class="summernote_post">
        <textarea name="" id="summernote_post" style="height:200px;"></textarea>
      </div>
      <div class="post_image" style="background: #fff;">
        <div class="post_image cover_input" style="width: 150px; height: 150px; border: 1px dotted red;">
          <input type="file" id="file" style="width: 150px; height: 150px; opacity: 0;">
        </div>
        <div class="list_file"></div> 
      </div>
    </div>
  </div>
  <div class="container"></div>
  <div class="container">
    <div class="row">
      <div class="col-3">lorem</div>
      <div class="col-3">lorem</div>
      <div class="col-3">lorem</div>
      <div class="col-3">lorem</div>
    </div>
  </div>
  <script>
//     $('#summernote').summernote({
//       placeholder: 'Hello bootstrap 4',
//   height: 150,   //set editable area's height
//   codemirror: { // codemirror options
//     theme: 'darkly'
//   }
// })

$("#file").change(function(e) {
  /* Act on the event */
  var path = URL.createObjectURL(e.target.files[0]);
  $(".list_file").append("<img src = '" + path + "' style = 'width: 100px; height: 100px'>");
});

var xxx = textboxio.replace('#summernote_post');

$(document).ready(function() {

});
</script>
</body>
</html>