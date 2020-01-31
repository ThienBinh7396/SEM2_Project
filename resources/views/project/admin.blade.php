@extends('adminlte::page')

@section('title', 'AdminLTE')

@section('content_header')
<h1>Product</h1>
@stop

@section('css')
<link rel="stylesheet" type="text/css" href="{{ asset('css/project/admin.css') }}">	
@stop

@section('content')
<div class="container-fluid">
	<div class="row product">
		<div class="col-md-2 category">
			<ul>
				@php
				$index_category = 1;
				@endphp
				@foreach($category as $category_row)

				@if($index_category == 1)

				<li class="actived" id = "{{$category_row->id}}">
					<div class="text">
						{{$category_row->name}}
					</div>
					<div class="remove"><i class="fa fa-times" aria-hidden="true"></i></div>
				</li>
				@else
				<li id = "{{$category_row->id}}">
					<div class="text">
						{{$category_row->name}}
					</div>
					<div class='remove'><i class="fa fa-times" aria-hidden="true"></i></div>
				</li>

				@endif
				@php
				$index_category ++;
				@endphp
				@endforeach
			</ul>
			<div class="add_category tb_button"><i class="fa fa-plus" aria-hidden="true"></i> Add Category</div>
			<div id="base" base= "{{route('project')}}"></div>
			<div id="base_public" base="{{asset('')}}"></div>
		</div>
		<div class="col-md-3 container_product">	
			<ul class="show_product">
			</ul>
			<div class="add_product tb_button"><i class="fa fa-plus" aria-hidden="true"></i> Add product</div>
		</div>

		<div class="col-md-7 information">
			<div class="cover">
				<div class="form-group">
					<div class="form-group-item">
						<label for="name">Name: </label>
						<input type="text" name="name" id="product_name">
					</div>				
					<div class="form-group-item">
						<label for="cost">Cost:</label>
						<input type="number" min="0" id="product_cost">
					</div>	
				</div>
				<div class="form-group">
					<label for="">Thumbnail:</label>
					<div class="list">
						<div class="list_item" id="first_item">
							+
						</div>
						<div class="list_item" id="first_item">
							sadadasd
						</div>
						<div class="list_item" id="first_item">
							dasdasdsdasd
						</div>
					</div>
				</div>
				<input type="file" name="" id="thumbnail_product">
				
				<div class="form-group">
					<textarea name="" id="product_description" placeholder="Description of product"></textarea>

					<div class="note">
						<b>Note: </b> Backspace + <span>'laptop'</span>, <span>'iphone'</span>, <span>'tv'</span>,
						<span>'lorem'</span>  or <span>'car'</span> + Tab -> Sample data
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="container-fluid">

	<button type="button" class="btn btn-info btn-lg hidden" id="remove_category" data-toggle="modal" data-target="#myModal">Open Small Modal</button>

	<div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Notification</h4>
				</div>
				<div class="modal-body">
					<p>You want to remove this?</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger tb_yes" data-dismiss="modal">Yes</button>

					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</div>


@stop

@section('js')
<script  src = "{{asset('js/project/script.js')}}"></script>
@stop