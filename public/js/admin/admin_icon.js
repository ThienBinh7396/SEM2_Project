$(document).ready(function() {
  var base = $("#base_url").attr('base');
  var base_public = $("#base_pub").attr('base');
  var current_friend = 0;


  var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
   }
});

  $('[data-toggle="tooltip"]').tooltip();   

  $(".cover_tb_table_dark").slimScroll({
    width: '100%',
    height: '240px',
    size: '6px'
 });
  $(".cover_body_icon").slimScroll({
    width: '100%',
    height: '140px',
    size: '6px'
 });

  $(".cover_header_category").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 1,
 })
  $(".form-control").click(function(e){
    $(this).css({
      'background' : "#fff",
   });
 })

  $(".cover_image").click(function(e){
    $(this).css({
      'border-color': 'blue',
      'background' : "#dff0d8",
   });
    $("#category_icon").click();  
 })
  var form_category ; 
  $("#category_icon").change(function(e){
    if ($(this).val() != "") {
      if (e.target.files[0].type != "image/jpeg" && e.target.files[0].type != "image/jpg" && e.target.files[0].type != "image/png" && e.target.files[0].type != "image/ico") {
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Type of image not found !!!',
       })
        $(this).val('')
        return;
     }

     form_category = new FormData();
     var pathCategory = URL.createObjectURL(e.target.files[0]);
     form_category.append('image', e.target.files[0]);

     $(".cover_image img").fadeIn().attr('src', pathCategory);
  }else{
     $(".cover_image img").fadeOut();
  }
})
  $(".add-category-btn").click(function(e){
    e.preventDefault();  
    if ($("#title").val() == "") {
      $("#title").css({
        'background' : "#daeafa",
     });
      return;
   }
   if ($("#category_icon").val() == "") {
      $(".cover_image").css({
        'border-color': 'red',
        'background' : "rgba(255,0,0,0.1)",
     });
      return;
   }
   form_category.append('title', $("#title").val());
   form_category.append('type', $("#type_category").val());
   var new_form = new FormData();
   new_form.append('file', form_category.get('image'));
   new_form.append('upload_preset', 'thienbinh');
   $.ajax({
     url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
     type: "POST",
     data: new_form,
     processData: false,
     contentType: false,
     success: function(data){
       var url = data.secure_url;

       form_category.append('url', url);
       $.ajax({
         url: base + "/add_category_icon",
         type: "POST",
         data: form_category,
         processData: false,
         contentType: false,
         success: function(data){
           $("tbody").append(
             '<tr id="tb_category_' + data.id + '" val=' + data.id + ' class="animated fadeInUp">'
             + '<td>' + ($("tbody tr").length + 1) + '</td>'
             + '<td class="cat_title">' + data.title + '</td>'
             + '<td class="cat_type">' + data.type + '</td>'
             + '<td class="cat_icon"><img src="' + data.icon + '" style="width: 40px; height: 40px;" alt=""></td>'  
             + '</tr>'
             );

           $('.cover_header_category').slick('slickAdd',
             '<li class="tb_inline show_icon_category" id="tb_list_category_' + data.id + '" type="' + data.type + '"  title="'+ data.title +'" value="' + data.id + '">'
             + '<img src="' + data.icon + '" alt="">'
             + '</li>'

             );

           $("#tb_list_category_" + data.id).click(function(){
             show_icon($(this));
          })
           $(".cover_tb_table_dark").slimScroll({ scrollTo: $(".cover_tb_table_dark table").height() + 50 });

           category_reset();
           $("#tb_category_" + data.id).click(function(){
             $("table tbody tr").removeClass('actived');
             $(this).addClass('actived');
             category_edit($(this));
          })
        }
     })
    }
 })

})
  function category_reset(){
    $(".cover_image img").fadeOut();
    $("#category_icon").val('');
    $("#title").val('');

 }
 $("table tbody tr").click(function(){
    $("table tbody tr").removeClass('actived');
    $(this).addClass('actived');
    category_edit($(this));
 })
 function category_edit(that){
    $("#title").val(that.find('.cat_title').text());
    $("#type_category").val(that.children('.cat_type').text());
    $(".cover_image img").fadeIn().attr('src', that.children('.cat_icon').children('img').attr('src'));

    $(".edit-category, .delete-category").attr('disabled', false);
    $(".add-category-btn").attr('disabled', true);
 }
 $(".edit-category").click(function(e){
    e.preventDefault();
    var cat_id =  $("table tbody tr.actived").attr('val');

    if ($("#category_icon").val() == '') {
      form_category = new FormData();
      form_category.append('url', $("table tbody tr.actived .cat_icon img").attr('src'));
   }else{
      var new_form = new FormData();
      new_form.append('file', form_category.get('image'));
      new_form.append('upload_preset', 'thienbinh');
      $.ajax({
        url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
        type: "POST",
        data: new_form,
        processData: false,
        contentType: false,
        success: function(data){
          var url = data.secure_url;

          form_category.append('url', url);
          form_category.append('title', $("#title").val());
          form_category.append('type', $("#type_category").val());
          form_category.append('id', cat_id);
          $.ajax({
           url: base + "/edit_category_icon",
           data: form_category,
           type: "POST",
           processData: false,
           contentType: false,
           success: function(data){
             var that= $("#tb_category_" + data.id);
             that.find('.cat_title').text(data.title);
             that.children('.cat_type').text(data.type);
             that.children('.cat_icon').children('img').attr('src',  data.icon);


             $("#tb_list_category_" + data.id).children('img').attr('src',  data.icon);

             category_reset();
             $(".edit-category, .delete-category").attr('disabled', true);
             $(".add-category-btn").attr('disabled', false);
          }
       })
       }
    })
      return;
   }
   form_category.append('title', $("#title").val());
   form_category.append('type', $("#type_category").val());
   form_category.append('id', cat_id);

   $.ajax({
     url: base + "/edit_category_icon",
     data: form_category,
     type: "POST",
     processData: false,
     contentType: false,
     success: function(data){
       var that= $("#tb_category_" + data.id);
       that.find('.cat_title').text(data.title);
       that.children('.cat_type').text(data.type);
       that.children('.cat_icon').children('img').attr('src',  data.icon);

       $("#tb_list_category_" + data.id).children('img').attr('src',  data.icon);

       category_reset();
       $(".edit-category, .delete-category").attr('disabled', true);
       $(".add-category-btn").attr('disabled', false);
    }
 })

})
 $(".delete-category").click(function(e){
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: "It will be remove all icon belong to this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
   }).then(function(result){
      if (result.value) {
        $(".edit-category, .delete-category").attr('disabled', true);
        $(".add-category-btn").attr('disabled', false);
        var cat_id =  $("table tbody tr.actived").attr('val');
        swal(
          'Deleted!',
          'Your category has been deleted.',
          'success'
          )
        $.ajax({
          url: base + "/remove_category_icon",
          type: "POST",
          data: {
            id: cat_id,
         },
         success: function(data){
            $("#tb_category_" + cat_id).slideUp();
            if ($("#tb_list_category_" + cat_id).hasClass('actived')) {
              show_icon($(".show_icon_category").eq(0));
           }
           $('.cover_header_category').slick('slickRemove', $(".show_icon_category").length - 1);
           setTimeout(function() {
              $("#tb_category_" + cat_id).remove();
              category_reset();
           }, 300)

        } 

     })
     }
  })
})
 $(".show_icon_category").click(function(e){
    show_icon($(this));
 })

 function show_icon(that){
    $(".add_url_btn").val('');
    $('.add_url_btn').attr('disabled', false);

    $(".show_icon_category").removeClass('actived');
    that.addClass('actived');
    $(".cover_body_icon .cover_body_icon_item").hide();

    setTimeout(function() {
      $(".cover_body_icon .cover_body_icon_item").remove();
   }, 100);

    $(".panel-footer span").text(that.attr('type'));
    if (that.attr('type') == 'text'){
      $('.cover_button_image').fadeOut();

      $('.add_url_btn').attr('placeholder', 'Copy and paste text icon');

      $('.add-image-btn').attr('disabled', true);
      $.ajax({
        url: base + "/tb_get_icon",
        type: "POST",
        data:{
          cat_id : that.attr('value')
       },
       success: function(data){

          data.forEach(function(item) {
            $(".cover_body_icon").append(
              '<div class="cover_body_icon_item animated bounceIn">'
              + '<div class="cover_body_icon_text">' + decodeURI(item.content) + '</div>'
              + '<i id="tb_remove' + item.id + '" value="' + item.id + '" class="fa fa-times tb_remove_icon" ></i>'
              + '</div>'
              )
         });
          $(".cover_body_icon").slimScroll({
            scrollTo: '1000px'   
         });
          $(".tb_remove_icon").click(function(){
            remove_icon($(this));
         })
       }
    })

   }else{
      $('.cover_button_image').fadeIn();
      $('.add-image-btn').attr('disabled', false);

      $('.add_url_btn').attr('placeholder', 'Type url icon here');

      if (that.attr('type') == 'image'){
        $.ajax({
          url: base + "/tb_get_icon",
          type: "POST",
          data:{
            cat_id : that.attr('value')
         },
         success: function(data){

            data.forEach(function(item) {
              $(".cover_body_icon").append(
                '<div class="cover_body_icon_item animated bounceIn">'
                + '<img src="' + item.content + '" alt="">'
                + '<i id="tb_remove' + item.id + '" value="' + item.id + '" class="fa fa-times tb_remove_icon" ></i>'
                + '</div>'
                );
           });
            $(".cover_body_icon").slimScroll({
              scrollTo: '1000px'   
           });
            $(".tb_remove_icon").click(function(){
              remove_icon($(this));
           })
         }
      })
     }
     if (that.attr('type') == 'handle_background_js') {
        $.ajax({
          url: base + "/tb_get_icon",
          type: "POST",
          data:{
            cat_id : that.attr('value')
         },
         success: function(data){

            data.forEach(function(item) {
              $(".cover_body_icon").append(

                '<div class="cover_body_icon_item handle_background_js animated bounceIn" checkFirst = "false" style="background-image: url('+  item.content +');">'
                + '<i id="tb_remove' + item.id + '" value="' + item.id + '" class="fa fa-times tb_remove_icon" ></i>'
                + '</div>'
                );

           });
            $(".cover_body_icon").slimScroll({
              scrollTo: '1000px'   
           });
            $(".tb_remove_icon").click(function(){
              remove_icon($(this));
           })
            $(".handle_background_js").each(function() {
              get_size_and_amount_background_image($(this), 144, 'small');
           })
            $(".handle_background_js").hover(function() {
              handle_hover_image($(this), 6, 72, 85);
           });
         }
      })
     }
  }
  current_type = that.attr('type');
}
function remove_icon(that){
 $.ajax({
   url: base + "/tb_remove_icon",
   type: "POST",
   data:{
     id: that.attr('value'),
     type: $(".show_icon_category.actived").attr('type'),
  },
  success: function(data){
     if (data == 'done') {
       that.parent().addClass('fadeOut');
       setTimeout(function() {
         that.parent().remove();
      }, 300)
    }
 } 
})
}


var form_icon, current_type;


$(".add-icon-btn").click(function(e){
 e.preventDefault();
 form_icon = new FormData();
 if ($("#input_icon").val() == "" && $(".add_url_btn").val() == "") {
   swal({
     type: 'error',
     title: 'Oops...',
     text: 'Fill on required field!',
  })
   return;
}

form_icon.append('title', '');
form_icon.append('cat_id', $(".show_icon_category.actived").attr('value'));

if($(".show_icon_category.actived").attr('type') == 'text'){
   form_icon.append('type', 'text');
   form_icon.append('content', $(".add_url_btn").val());
}
if($(".show_icon_category.actived").attr('type') != 'text'){
   form_icon.append('type', 'image');
   if ($(".add_url_btn").val() != '') {
     fetch($(".add_url_btn").val())
     .then(res => {
       if(res.ok) {
         return res.blob();
      }     
      swal({
         type: 'error',
         title: 'Oops...',
         text: 'Failed to load this url',
      });
   })
     .catch(error => {
       console.log('There has been a problem with your fetch operation: ', error.message);
    })
     .then(blob => {
       var file = new File([blob], new Date().getTime() + blob.type.replace(/\//gm,"."), {type: blob.type, lastModified: Date.now()});
       var new_form = new FormData();
       new_form.append('file', file);
       new_form.append('upload_preset', 'thienbinh');
       $(".add_url_btn").val('');
       $("#input_icon").val('');
       $.ajax({
         url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
         type: "POST",
         data: new_form,
         processData: false,
         contentType: false,
         success: function(data){
           var url = data.secure_url;
           url = url.substring(0, url.indexOf('upload/') + 7) + "c_scale,o_100,q_auto:eco,w_658,z_0.4/"  + url.substring(url.indexOf('upload/') + 7, url.length)
           form_icon.append('url', url);
           $.ajax({
             url: base + "/add_icon",
             type: 'POST',
             data: form_icon,
             processData: false,
             contentType: false,
             success: function(data){

               if ($(".show_icon_category.actived").attr('type') == 'image') {
                 $(".cover_body_icon").append(
                   '<div class="cover_body_icon_item">'
                   + '<img src="' + data.content + '" alt="">'
                   + '<i id="tb_remove' + data.id + '" value="' + data.id + '" class="fa fa-times tb_remove_icon" aria-hidden="true"></i>'                
                   + '</div>'
                   );
              }else{
                 $(".cover_body_icon").append(
                   '<div id="tb_handle_background_' +  data.id  + '" class="cover_body_icon_item handle_background_js animated bounceIn" checkFirst = "false" style="background-image: url('+ data.content +');">'
                   + '<i id="tb_remove' + data.id + '" value="' + data.id + '" class="fa fa-times tb_remove_icon" ></i>'
                   + '</div>'
                   );

                 $("#tb_handle_background_" + data.id).each(function() {
                   get_size_and_amount_background_image($(this), 144, 'small', 'first');
                })
                 $("#tb_handle_background_" + data.id).hover(function() {
                   handle_hover_image($(this),  6, 72, 85);
                });
              }

              $(".cover_body_icon").slimScroll({
                 scrollTo: '1000px'   
              });
              $(".tb_remove_icon").click(function(){
                 remove_icon($(this));
              })
           }
        });
        }
     });
    });
     return ;
  }else{
     $(".add_url_btn").val('');
     $("#input_icon").val('');
     var new_form2 = new FormData();
     new_form2.append('file', current_target_icon_file);
     new_form2.append('upload_preset', 'thienbinh');
     $.ajax({
      url: "https://api.cloudinary.com/v1_1/thienbinh7396/image/upload",
      type: "POST",
      data: new_form2,
      processData: false,
      contentType: false,
      success: function(data){
        var url = data.secure_url;
        url = url.substring(0, url.indexOf('upload/') + 7) + "c_scale,o_100,q_auto:eco,w_658,z_0.4/"  + url.substring(url.indexOf('upload/') + 7, url.length)
        form_icon.append('url', url);
        $.ajax({
          url: base + "/add_icon",
          type: 'POST',
          data: form_icon,
          processData: false,
          contentType: false,
          success: function(data){

            if ($(".show_icon_category.actived").attr('type') == 'image') {
              $(".cover_body_icon").append(
                '<div class="cover_body_icon_item">'
                + '<img src="' + data.content + '" alt="">'
                + '<i id="tb_remove' + data.id + '" value="' + data.id + '" class="fa fa-times tb_remove_icon" aria-hidden="true"></i>'                
                + '</div>'
                );
           }else{
              $(".cover_body_icon").append(
                '<div id="tb_handle_background_' +  data.id  + '" class="cover_body_icon_item handle_background_js animated bounceIn" checkFirst = "false" style="background-image: url('+ data.content +');">'
                + '<i id="tb_remove' + data.id + '" value="' + data.id + '" class="fa fa-times tb_remove_icon" ></i>'
                + '</div>'
                );

              $("#tb_handle_background_" + data.id).each(function() {
                get_size_and_amount_background_image($(this), 144, 'small', 'first');
             })
              $("#tb_handle_background_" + data.id).hover(function() {
                handle_hover_image($(this),  6, 72, 85);
             });
           }

           $(".cover_body_icon").slimScroll({
              scrollTo: '1000px'   
           });
           $(".tb_remove_icon").click(function(){
              remove_icon($(this));
           })
        }
     });
     }
  });
     return;
  }

}
$(".add_url_btn").val('');
$("#input_icon").val('');
$.ajax({
  url: base + "/add_icon",
  type: 'POST',
  data: form_icon,
  processData: false,
  contentType: false,
  success: function(data){

    if (current_type == 'text') {
      data.forEach((item) => {
        $(".cover_body_icon").append(
          '<div class="cover_body_icon_item animated bounceIn">'
          + '<div class="cover_body_icon_text">' + decodeURI(item.content) + '</div>'
          + '<i id="tb_remove' + item.id + '" value="' + item.id + '" class="fa fa-times tb_remove_icon" aria-hidden="true"></i>'
          + '</div>'
          )
     })
            /* alert('msg');
            $(".show_icon_category.actived").click();*/
         }

         $(".cover_body_icon").slimScroll({
            scrollTo: '1000px'   
         });
         $(".tb_remove_icon").click(function(){
            remove_icon($(this));
         })
      }
   })
})
function blobToFile(theBlob, fileName){
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
var current_target_icon_file ; 
$(".add-image-btn").click(function(e){
  $(".add_url_btn").val('');
  $("#input_icon").click();
})
$("#input_icon").change(function(e){
  if ($(this).val() != "") {
    if (e.target.files[0].type != "image/jpeg" && e.target.files[0].type != "image/jpg" && e.target.files[0].type != "image/png" && e.target.files[0].type != "image/ico" && e.target.files[0].type != "image/gif") {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Type of image not found !!!',
     })
      return;
   }

   current_target_icon_file = e.target.files[0];
   $(".add-icon-btn").click();
}
})


function getMeta(url, callback) {
  var img = new Image();
  img.src = url;
  img.onload = function() { callback(this.width, this.height); }
}
$(".handle_background_js").each(function() {
  get_size_and_amount_background_image($(this), 144, 'small');
})
$(".handle_background_js").hover(function() {
  handle_hover_image($(this), 6, 72, 100);
});

$(".test").each(function() {
  get_size_and_amount_background_image($(this), 144, 'large');
})

$(".test").hover(function() {
  handle_hover_image($(this), 12, 144, 80);
});

function get_size_and_amount_background_image(that, cell_background_size, type_size, first){
  var src_bg = that.css('background-image').substring(5, that.css('background-image').length -2);
  getMeta(src_bg,function(width, height) { 
    var image = new MarvinImage();
    image.load(src_bg, imageLoaded);

    function imageLoaded(){

      if (width > 1800) {
        cell_background_size = cell_background_size * 2;
     }
     var count = parseInt(width / cell_background_size);
     var amount_cell = parseInt(width / cell_background_size) * parseInt(height / cell_background_size);


     var cell_width = width / parseInt(width / cell_background_size);
     var cell_height = height / parseInt(height / cell_background_size);

     var check_transparent = false;   
     var check_y = parseInt(height - cell_height/2.5);
     var check_y2 = parseInt(height - cell_height/2);

     for (var i = 0; i < count; i++) {
        var check_cell = false;

        for (var h = i * cell_width ; h < (i + 1) * cell_width ; h++) {
          if (image.getAlphaComponent(h,check_y) > 0) {
            check_cell = true;
            break;
         }
      }
      if (!check_cell) {
         break;
      }

   }
   for (var j = 0; j < count; j++) {
    var check_cell = false;

    for (var h = j * cell_width; h < j * cell_width + cell_width / 2 + 100; h++) {
      if (image.getAlphaComponent(h,check_y2) > 0) {
        check_cell = true;
        break;
     }
  }
  if (!check_cell) {
     break;
  }

}
var last = i >= j ? i : j; 
that.attr('amount', amount_cell - (count - last));
if (first == 'first') {
 $.ajax({
   url: base + "/update_amount",
   type: "POST",
   data: {
     id: that.children('i').attr( 'value'),
     amount: amount_cell - (count - last)
  }
})
}
}


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

   var timer = setInterval(() => {
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
});