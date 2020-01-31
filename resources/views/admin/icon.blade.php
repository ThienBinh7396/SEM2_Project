@extends('adminlte::page')

@section('title', '')

@section('content_header')
<h1>Icon</h1>
@stop

@section('css')
<link rel="stylesheet" type="text/css" href="{{ asset('css/admin/admin.css') }}">	
@stop
@section('content')
<div class="container-fluid">
	<div class="row">
		<div class=" col-lg-6 col-md-6">
			<form class="form-horizontal panel panel-info" style="padding: 10px" action="/action_page.php">
				<div class="form-group">
					<label class="control-label col-sm-2" for="title">Title:</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="title" placeholder="Enter title" name="title">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="type_category">Type:</label>
					<div class="col-sm-10">          
						<select name="" id="type_category" class="form-control" style="width: 160px;">
							<option value="image">Image</option>
							<option value="text">Text</option>
							<option value="handle_background_js">Handle JS</option>
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-2" for="type">Icon:</label>
					<div class="col-sm-10">          
						<div class="image bg-success cover_image">
							<img src="" alt="" style="display: none;width: 90%; height: 90%; margin-left: 5%;margin-top: 5%">
						</div>
						<input type="file" style="display: none;"  name="" id="category_icon">
					</div>
				</div>
				<div class="form-group">        
					<div class="col-sm-offset-2 col-sm-10">
						<button type="button" class="btn btn-primary margin-top-10 add-category-btn"><i class="fa fa-plus-square">̃&nbsp;</i> Add</button>
						<button value="save" class="btn btn-success margin-top-10 edit-category" name="saveUpdate" disabled><i class="fa fa-edit">&nbsp;</i>Save</button>
						<button value="del" class="btn btn-danger margin-top-10 delete-category" disabled><i class="fa fa-trash">̃&nbsp;
						</i> Remove <span class="getDelNodeText"></span></button>
						<div id="base_url" base = "{{route('tb_admin_icon')}}" style="display: none;"></div>
					</div>
				</div>
			</form>
		</div>
		<div class="col-lg-6">
			<div class="cover_tb_table_dark">
				
				<table class=" table table-hover">
					<thead class="bg-primary">
						<tr>
							<th>Num</th>
							<th>Title</th>
							<th>Type</th>
							<th>Icon</th>
						</tr>
					</thead>
					<tbody class="bg-info">
						@php
						$i =1 ;
						@endphp 	
						@foreach($category as $value)
						<tr id='tb_category_{{$value->id}}' val = "{{$value->id}}">
							<td>{{$i++}}</td>
							<td class="cat_title">{{$value->title}}</td>
							<td class="cat_type">{{$value->type}}</td>
							<td class="cat_icon"><img src="{{asset(''.$value->icon)}}" style="width: 40px; height: 40px;" alt=""></td>	
						</tr>
						@endforeach
					</tbody>
					<tfoot class="bg-primary">
						<tr>
							<th>Num</th>
							<th>Title</th>
							<th>Type</th>
							<th>Icon</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
		
	</div>
	<div class="row" style="margin-top: 15px;">
		<div class="col-lg-6">
			<div class="panel panel-info">
				<div class="panel-heading" style="background: #b6e6fd">
					<ul class="cover_header_category">
						@foreach($category as $value)
						<li class="tb_inline show_icon_category"  id="tb_list_category_{{$value->id}}" type="{{$value->type}}" data-toggle="tooltip"  title="{{$value->title}}" value="{{$value->id}}">
							<img src="{{asset(''.$value->icon)}}" alt="">
						</li>
						@endforeach
					</ul>
				</div>
				<div class="panel-body" style="background: #fafafa">
					<div class="tb_controll">
						<div class="row">
							<div class="col-lg-3 col-sm-4">
								<div class="cover_button_image">	
									<button type="button" data-toggle="tooltip" title="Choose image" class="btn btn-info  add-image-btn" disabled><i class="fa fa-picture-o" aria-hidden="true" ></i> Image</button>
									<input type="file" style="display: none;" name="" id="input_icon">
								</div>
							</div>
							<div class="col-lg-6 col-sm-4" >
								<input type="text" placeholder="" name="" class="form-control add_url_btn" disabled >
							</div>
							<div class="col-lg-3 col-sm-4">
								<button type="button" data-toggle="tooltip" title="Add icon" class="btn btn-success  add-icon-btn" ><i class="fa fa-plus-square">̃&nbsp;</i> Add</button>
							</div>
						</div>
						<div class="cover_body_icon panel panel-info">
							<div class="cover_body_icon_item handle_background_js" checkFirst = "false" style="background-image: url('https://scontent.fhan5-6.fna.fbcdn.net/v/t39.1997-6/s600x600/28228300_184002512217404_8249610055003930624_n.png?_nc_cat=105&oh=c6e78827222a37d2913b3e1973cfacb1&oe=5C589573');">
							</div>
						</div>
					</div>
				</div>
				<div class="panel-footer"><b>Icon type</b>: <span style="color: #f72c2c; text-transform: capitalize; font-size: 20px;"></span></div>
			</div>
		</div>
		<div class="col-lg-6">
			
			
			<div class="test" checkFirst = "false" amount="" style="background-image: url('https://scontent.fhan5-4.fna.fbcdn.net/v/t39.1997-6/s720x720/17629507_1747081118936473_1871439605895528448_n.png?_nc_cat=1&oh=6bffdaa1d59a6598a322c3079d66392b&oe=5C14A79E');">
			</div>
			<div class="test" checkFirst = "false" amount="" style="background-image: url('https://scontent.fhan2-1.fna.fbcdn.net/v/t39.1997-6/19641777_131715464089728_6486436167934803968_n.png?_nc_cat=101&oh=970eb1d7e30fb3c8b731089ec88f4594&oe=5C583F74');">
			</div>

		</div>
	</div>
</div>
<style type="text/css" media="screen">
.test{
	
	cursor: pointer;
	height: 120px;
	width: 120px;
	background-position: -12px -12px;
	image-rendering: -webkit-optimize-contrast;
}
</style>
@stop
@section('js')
<script type="text/javascript" src="{{asset('js/admin/admin_icon.js')}}"></script>

<script>
	

</script>
@stop