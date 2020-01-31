var check = false;
var big_map_w = 900;
var big_map_h = 720;
var canvasX , canvasY ;
var caro_map;
var caro_map_win;
var incrementX, incrementY;
var move_1;
var current_uid, friend_uid = $("#friend").val();
var over = false, checkWinner;
var type_end_game;
var boolean_turn = false, current_first;

function setup() {
	console.log(friend_uid, current_uid);
	canvasX = windowWidth - 5;
	canvasY = windowHeight - 40;
	createCanvas(canvasX, canvasY);
	init();
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			check = true;
			current_uid = user.uid;
			firebase.database().ref('users/' + current_uid + '/caro/' + friend_uid + '/first').on('child_added', function(data){
				if (data.val() == current_uid) {
					current_first = data.val();
					boolean_turn = true;
				}
				
			})

			$(".caro_remove").click(function(event) {
				firebase.database().ref('users/' + current_uid + "/notify/remove_caro_" + friend_uid).update({
					type: 'remove_caro',
					content: current_uid,
					time: new Date().getTime(),
					from: friend_uid
				})
				firebase.database().ref('users/' + friend_uid + "/notify/remove_caro_" + current_uid).update({
					type: 'remove_caro',
					content: current_uid,
					time: new Date().getTime(),
					from: current_uid
				})
			});
			listenTurnFriend();
			listenYouTurn();
			listenWinner();
			listenRestart();
		}
	});
	$("canvas").hover(function(event) {
		over = true;
	}, function(e){
		over = false;
	});


}
function init(){
	checkWinner = false;
	caro_map_win = [];
	move_1 = [];

	caro_map = new Array(big_map_h/30);
	for (var i = 0; i < caro_map.length; i++) {
		caro_map[i] = new Array(big_map_w/30);
	}
	clear();
	camera.position.x = big_map_w / 2;
	camera.position.y = big_map_h / 2;
	camera.off();
	console.log('init: ' + current_uid + " , " + current_first);
	if (current_first == current_uid && current_first != null) {
		boolean_turn = true;
	}else{
		boolean_turn = false;
	}
}
function draw() {
	clear();
	smooth();
	stroke('rgba(66, 55, 55, 0.2)');
	fill('rgba(175, 170, 170, 0.13)');
	for (var i = 0; i < caro_map.length; i++) {
		for (var j = 0; j < caro_map[i].length; j++) {

			rect(j * 30, i * 30, 30, 30);
		}
	}
	push();
	fill('rgba(136, 247, 239, 0.2)');
	stroke('rgb(136, 247, 239)');
	rect(camera.position.x - canvasX/2 + 3, camera.position.y - canvasY/2 + 3, 120, 30);
	textAlign(CENTER);
	if (boolean_turn) {
		fill('rgba(255, 0, 0, 0.7)');
		textSize(18);
		textStyle(BOLD);
		text('You turn: ✘',camera.position.x - canvasX/2  + 60,camera.position.y - canvasY/2 + 23);
		
	}else{
		fill('rgba(38, 242, 82, 0.7)');
		textStyle(BOLD);
		textSize(18);
		text('Friend turn: o', camera.position.x - canvasX/2 + 60,camera.position.y - canvasY/2 + 23);
	}
	pop();

	var x = mouseX;
	var y = mouseY;
	incrementX = incrementY = 0;
	push();
	fill('rgba(255, 48, 0, 0.25)');
	textSize(24);
	text('⮜',camera.position.x - canvasX / 2 , camera.position.y );
	text('⮞',camera.position.x + canvasX / 2 - 18, camera.position.y + 7);
	text('⮝',camera.position.x - 1, camera.position.y - canvasY/ 2 + 17);
	text('⮟',camera.position.x - 1, camera.position.y + canvasY / 2 - 2);
	pop();
	if (over) {
		push();
		textSize(24);
		fill('rgb(19, 242, 34)');
		if (mouseX < canvasX / 6 && mouseY > 3 * canvasY / 7 && mouseY < canvasY / 7 * 5) {
			incrementX = -2;
			text('⮜',camera.position.x - canvasX / 2 , camera.position.y );
		}
		if (mouseX >  5 * canvasX / 6 && mouseY > 3 * canvasY / 7 && mouseY < canvasY / 7 * 5) {
			incrementX = 2;
			text('⮞',camera.position.x + canvasX / 2 - 18, camera.position.y + 7);
		}
		if (mouseY < canvasY / 6 && mouseX >3 * canvasX / 7 && mouseX < canvasX / 7 * 5) {
			incrementY = -2;
			text('⮝',camera.position.x - 1, camera.position.y - canvasY/ 2 + 17);

		}
		if (mouseY >  5 * canvasY / 6 && mouseX > 3 * canvasX / 7 && mouseX < canvasX / 7 * 5) {
			incrementY = 2;
			text('⮟',camera.position.x - 1, camera.position.y + canvasY / 2 - 2);
		}
		pop();
	}
	camera.position.x += incrementX;
	camera.position.y += incrementY;
	if (camera.position.x < canvasX / 2) {
		camera.position.x = canvasX / 2;
	} 
	if (camera.position.x > big_map_w - canvasX / 2) {
		camera.position.x = big_map_w - canvasX / 2;
	} 
	if (camera.position.y < canvasY / 2) {
		camera.position.y = canvasY / 2;
	} 
	if (camera.position.y > big_map_h - canvasY / 2) {
		camera.position.y = big_map_h - canvasY / 2;
	} 
	for (var i = 0; i < move_1.length; i++) {
		textAlign(CENTER);
		if (move_1[i].type == 'x') {
			fill('#f9132e');
			textSize(30);
			textStyle(BOLD);
			text('✘',( move_1[i].x ) * 30 + 15, move_1[i].y * 30 + 27);
		}else{
			fill('#26f252');
			textStyle(BOLD);
			textSize(34);
			text('o', move_1[i].x * 30  + 15, move_1[i].y * 30 + 25);

		}
	}
	if (checkWinner) {
		// strokeWeight(3);
		for (var i = 0; i < caro_map_win.length; i++) {
			fill('rgba(70, 170, 135, 0.2)');
			stroke('#00f6ff');
			rect(caro_map_win[i].x * 30, caro_map_win[i].y * 30, 30, 30);
			if (type_end_game == 'win') {
				fill('#f9132e');
				textSize(30);
				textStyle(BOLD);
				text('✘', caro_map_win[i].x* 30 + 15, caro_map_win[i].y * 30 + 27);
			}else{
				fill('#26f252');
				textStyle(BOLD);
				textSize(34);
				text('o', caro_map_win[i].x * 30  + 15, caro_map_win[i].y * 30 + 25);
			}
		}
		// line(caro_map_win[0].x * 30 , caro_map_win[0].y * 30, caro_map_win[4].x * 30 + 30, caro_map_win[4].y * 30 + 30);
		camera.position.x = caro_map_win[4].x * 30 + 60;
		camera.position.y = caro_map_win[4].y * 30 + 30;
		
		if (type_end_game == 'win') {
			fill('rgb(255, 0, 0)');
		}else{
			fill('rgb(255, 138, 1)');
		}
		strokeWeight(8);
		textSize(80);		
		textAlign(CENTER);
		textFont('cursive');
		text(type_end_game.toUpperCase(), camera.position.x, camera.position.y + 5);
		$("#re-start").fadeIn();
	}
	camera.off();
}
function windowResized(){
	resizeCanvas(windowWidth - 10, windowHeight - 35);
}
function display(m, type){
	// console.log(caro_map[m.x][m.y], type)
	if (caro_map[m.y][m.x] == null) {
		if (type == 'o') {
			camera.position.x = m.x * 30;
			camera.position.y = m.y * 30;
			caro_map[m.y][m.x] = 0;
		}else{
			caro_map[m.y][m.x] = 1;
			if (checkWin(m.x, m.y)){
				var w = {
					winner: current_uid,
					map: JSON.stringify(caro_map_win)
				}
				firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid + '/win').update({
					infor: JSON.stringify(w)
				});
				firebase.database().ref('users/' + friend_uid + "/caro/" + current_uid + '/win').update({
					infor: JSON.stringify(w)
				});
			};

		}
		move_1.push({
			x: m.x,
			y: m.y,
			type: type,
		});

	}
}
function checkWin(x, y){
	var start = {},  end = {}, center = {};
	start.x = x - 4 >= 0 ? x - 4 : 0;
	start.y = y - 4 >= 0 ? y - 4 : 0;

	console.log(start.x, start.y);
	if (start.x > start.y) {
		start.x  = x - (y - start.y) ;
	} else{
		start.y = y - (	x - start.x);
	}

	center.x = x - start.x;
	center.y = y - start.y;
	console.log(caro_map.length, caro_map[0].length)

	end.x = x + 4 <= caro_map[0].length - 1 ? x + 4 : caro_map[0].length - 1;
	end.y = y + 4 <= caro_map.length - 1 ? y + 4 : caro_map.length - 1;

	if (-x + end.x > end.y - y) {
		end.x = x + end.y - y;
	}else{
		end.y = y + end.x - x;
	}
	console.log(end);
	console.log(start, end, x, y);
	if (end.x - start.x < 4 || end.y - start.y < 4) {return false;}

	var l = end.x - start.x;
	
	var boolean_win;
	for (var i = 0; i <= l - 4; i++) {
		boolean_win = true;
		for (var j = i; j <= l; j++) {
			if (j - i == 5) {
				boolean_win = true;
				break;
			}	
			if (caro_map[start.y + j][start.x + l - j] == null || caro_map[start.y + j][start.x + l - j] == 0) {
				boolean_win = false;
				break;
			}
		}
		if (boolean_win) {
			for (var h = i; h < i + 5; h++) {
				caro_map_win.push({
					x: start.x + i + 4 - h,
					y: start.y + h,
				});
			}
			console.log(caro_map_win);
			return boolean_win;
		}
	}
	for (var i = 0; i <= l - 4; i++) {
		boolean_win = true;
		for (var j = i; j <= l; j++) {
			if (j - i == 5) {
				boolean_win = true;
				break;
			}	
			if (caro_map[start.y + j][start.x + j] == null || caro_map[start.y + j][start.x + j] == 0) {
				boolean_win = false;
				break;
			}
		}
		if (boolean_win) {
			for (var h = i; h < i + 5; h++) {
				caro_map_win.push({
					x: start.x + h,
					y: start.y + h,
				});
			}
			console.log(caro_map_win);
			return boolean_win;
		}
	}
	for (var i = 0; i <= l - 4; i++) {
		boolean_win = true;
		for (var j = i; j <= l; j++) {
			if (j - i == 5) {
				boolean_win = true;
				break;
			}	
			if (caro_map[start.y + j][start.x + center.x] == null || caro_map[start.y + j][start.x + center.x] == 0) {
				boolean_win = false;
				break;
			}
		}
		if (boolean_win) {
			for (var h = i; h < i + 5; h++) {
				caro_map_win.push({
					x: start.x + center.x,
					y: start.y + h,
				});
			}
			console.log(caro_map_win);
			return boolean_win;
		}
	}
	for (var i = 0; i <= l - 4; i++) {
		boolean_win = true;
		for (var j = i; j <= l; j++) {
			if (j - i == 5) {
				boolean_win = true;
				break;
			}	
			if (caro_map[start.y + center.y][start.x + j] == null || caro_map[start.y + center.y][start.x + j] == 0) {
				boolean_win = false;
				break;
			}
		}
		if (boolean_win) {
			for (var h = i; h < i + 5; h++) {
				caro_map_win.push({
					x: start.x + h,
					y: start.y + center.y,
				});
			}
			console.log(caro_map_win);
			return boolean_win;
		}
	}

}
function listenTurnFriend(){

	var ref_f = firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid + '/friendTurn');
	ref_f.off();
	var turnFriend = function(data){
		// console.log(data.val());
		display(data.val(), 'o');
		boolean_turn = true;
	}
	ref_f.on('child_added', turnFriend);

}
function listenYouTurn(){
	var ref_u= firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid + '/youTurn');
	ref_u.off();
	var turnUser = function(data){
		// console.log(data.val());
		display(data.val(), 'x');
		
		boolean_turn = false;	
	}
	ref_u.on('child_added', turnUser);

}
function listenWinner(){
	var ref_w= firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid + '/win');
	ref_w.off();
	var turnUser = function(data){
		console.log(data.val());
		var x = JSON.parse(data.val());
		caro_map_win = [];
		caro_map_win = JSON.parse(x.map);
		if (x.winner == current_uid) {
			type_end_game = 'win';
		}else{
			type_end_game = 'lose';
		}
		checkWinner = true;
		$("#re-start").click(function(e){
			firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid ).remove();
			firebase.database().ref('users/' + friend_uid + "/caro/" + current_uid ).remove();
			$(this).fadeOut();

		})
	}
	ref_w.on('child_added', turnUser);
}
function listenRestart(){
	var ref_r= firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid );
	ref_r.off();
	var restart = function(data){
		$("#re-start").fadeOut();
		init();
	}
	ref_r.on('child_removed', restart);
}
function mousePressed(){
	if (mouseX < 0 || mouseY < 0 || mouseX > canvasX || mouseY >canvasY) {return;}
	var realX = camera.position.x - canvasX / 2 + mouseX;
	var realY = camera.position.y - canvasY / 2 + mouseY;
	realX = Math.floor(realX / 30) ;
	realY = Math.floor(realY / 30) ;
	if(caro_map[realY][realX] == null && check && boolean_turn){
		var m = {
			x: realX,
			y: realY
		};
		firebase.database().ref('users/' + friend_uid + "/caro/" + current_uid + '/friendTurn').push(m);
		firebase.database().ref('users/' + current_uid + "/caro/" + friend_uid + '/youTurn').push(m);
		
	}
}
function keyReleased() {
	camera.zoom = 1;
	return false; 
}
function keyPressed() {
	if (keyCode === 13) {
		camera.zoom = 0.5;
	} 
}