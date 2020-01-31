	<div class="cover_first"></div>
	<div class="cover" style="background-image: url('{{asset('uploads/bg-02.jpg')}}');">
		<div class="profile_head" >
			<div class="profile_close tb_absolute"><i class="fa fa-times-circle d-block tb_absolute_center " aria-hidden="true"></i></div>
			<div class="profile_thumbnail">
				<div class="change_avatar">
					<i class="fa fa-camera" aria-hidden="true"></i>
				</div>
				<input type="file" name="avatar" style="display: none;" id="update_avatar">

				<img src="{{asset(''.$user->avatar)}}" alt="" class="thumbnail_user">
			</div>
			<div class="profile_name text-center">
				{!!$user->user!!}
			</div>
			<div class="profile_controll">
				<button type="" class="add_friend"><i class="fa fa-user-plus" aria-hidden="true"></i> Add friend</button>
				<button type="" class="send_message"><i class="fa fa-comments-o" aria-hidden="true"></i> Message</button>						
			</div>
		</div>
	</div>
	<div class="profile_body">
		<div class="profile_up_posts" id="profile_up_posts">
			<div class="text">Make Post</div>
			<div class="icon"><i class="fa fa-pencil" aria-hidden="true"></i></div>
		</div>
		<div class="profile_menu">
			<ul class="top">
				<li class="actived" for="item_information_1">Information</li>
				<li for="item_information_2">Post</li>
			</ul>
		</div>
		<div class="profile_information">
			<div class="content">
				<div class="item actived tb_infor"  id="item_information_1">
					<ul>
						<li class="">
							<div class="top">
								<div class="center"></div>
							</div>
							<h3>Introduce 

								<div class="form-control edit save_edit tb_relative" field="introduce"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>
							</h3>
							<div class="infor-content">
								<ul>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="fullname">Fullname :</label>
											<div class="lb_infor d-inline-block for_lb_const_width" type="text" >
												{!!$user->fullname!!}
											</div>

										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="gender">Gender :</label>
											<div class="lb_infor d-inline-block for_lb_const_width" type="select">{{$user->gender}}</div>
										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="company">Company :</label>
											<div class="lb_infor d-inline-block for_lb_const_width" type="text">{!!$user->company!!}</div>
										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="about_you">About you :</label>
											<div class="lb_infor d-inline-block for_lb_const_width" type="text">{!!$user->about_you!!}</div>
										</fieldset>
									</li>
								</ul>
							</div>
							<div class="bottom"></div>

						</li>
						<li>
							<div class="top">
								<div class="center"></div>
							</div>
							<h3>Work and Education 
								<div class="form-control edit save_edit tb_relative" field="work_education"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>
							</h3>
							<div class="infor-content">
								<ul>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="workplace">Work Place</label>
											<div class="lb_infor d-inline-block for_lb_const_width" type="text" >{!!$user->workplace!!}</div>

										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="college">College</label>
											<div class="lb_infor d-inline-block for_lb_const_width" type="text">{!!$user->college!!}</div>
										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="highshool">Highschool</label>
											<div class="lb_infor d-inline-block for_lb_const_width	" type="text">{!!$user->highshool!!}</div>
										</fieldset>
									</li>
								</ul>
							</div>
							<div class="bottom"></div>
						</li>
						<li>
							<div class="top">
								<div class="center"></div>
							</div>
							<h3>Places Lived
								<div class="form-control edit save_edit tb_relative"field="places"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>
							</h3>
							<div class="infor-content">
								<ul>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_block" field="address">current city and home town</label>
											<div class="lb_infor" type="text" >{!!$user->address!!}</div>

										</fieldset>
									</li>
									
								</ul>

							</div>
							<div class="bottom"></div>
						</li>
						<li>
							<div class="top">
								<div class="center"></div>
							</div>
							<h3>Contact and Basic Infor	 
								<div class="form-control edit save_edit tb_relative"field="contact"><i class="fa fa-arrow-down" aria-hidden="true"></i></div>
							</h3>
							<div class="infor-content contact_infor">
								<ul>
									<li>
										<fieldset class="form-group ">
											<label for="" class="lb_block" field="contact">contact information</label>

										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="email_contact">Email :</label>
											<div class="lb_infor d-inline-block for_lb_const_width ta100" type="text" >
												{!!$user->email_contact!!}
											</div>
										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="phone">Phone :</label>
											<div class="lb_infor d-inline-block for_lb_const_width ta100" type="text" >
												{!!$user->phone!!}
											</div>

										</fieldset>
									</li>
									<li>
										<fieldset class="form-group ">
											<label for="" class="lb_block" field="contact">basic information</label>

										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="birthday">Birthday :</label>
											<div class="lb_infor d-inline-block for_lb_const_width ta100" type="date" >
												{{$user->birthday}}
											</div>

										</fieldset>
									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">

											<label for="" class="lb_const_width" field="interested_in">Interested in :</label>
											<div class="lb_infor d-inline-block for_lb_const_width ta100" type="text" >
												{!!$user->interested_in!!}
											</div>
										</fieldset>

									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="languages">Languages :</label>
											<div class="lb_infor d-inline-block for_lb_const_width ta100" type="text" >
												{!!$user->languages!!}
											</div>
										</fieldset>

									</li>
									<li>
										<fieldset class="form-group tb_fs_edit">
											<label for="" class="lb_const_width" field="religious">Religious View :</label>
											<div class="lb_infor d-inline-block for_lb_const_width ta100" type="text" >
												{!!$user->religious!!}
											</div>
										</fieldset>

									</li>
									

								</ul>
							</div>
						</li>

					</ul>
				</div>
				<div class="item tb_infor" id="item_information_2" style="display: none">
					<ul>
						@foreach($post as $post_row)
						<li>
							<div class="top">
								<div class="center"></div>
							</div>
							<div class="image">
								<h3 class="time time_post">{{$post_row->time}}</h3>
								<div class="content_post">
									{!!$post_row->content!!}
								</div>
							</div>
							<div class="bottom"></div>
							
						</li>
						@endforeach
					</ul>
				</div>
			</div>
		</div>
	</div>

