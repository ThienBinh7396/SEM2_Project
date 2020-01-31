var base = $("#base_url").attr('base');
var base_public = $("#base_pub").attr('base');
var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

$(".right-main-content .message_content").load(base + 'ajax_load_message',function(){
	
})