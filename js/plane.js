//var gameBox = document.getElementById("gameBox");
//var plane = document.getElementById("plane");

//上：38		下：40		左：37		右：39	空格：32
/**
 * 监听键盘的上下移动
 * @param {Object} plane
 */
function movePlane(){
	
	//按下键盘，开始移动
	document.onkeydown = function(event){
		event = event || window.event;
		
		if(event.keyCode == 38){
			move(plane, plane.speed, "top", 0, "timerUD" );
		}else if(event.keyCode == 40){
			move(plane, plane.speed, "top", gameBox.offsetHeight - plane.offsetHeight, "timerUD");
		}else if(event.keyCode == 37){
			move(plane, plane.speed, "left", 0, "timerLR" );
		}else if(event.keyCode == 39){
			move(plane, plane.speed, "left", gameBox.offsetWidth - plane.offsetWidth, "timerLR" );
		}else if(event.keyCode == 80){
			alert("已暂停，点击“确定”继续游戏");
		}else if(event.keyCode == 65){		//使用速度道具
			plane.speedProp && eatSpeed();
		}else if(event.keyCode == 83){		//使用增加子弹频率道具
			plane.hzProp && eatHz();
		}else if(event.keyCode == 68){		//使用敌人停止移动道具
			plane.stopProp && eatMapGun();
		}else{
			console.log(event.keyCode);
		}
	};
	
	//松开键盘，停止移动
	document.onkeyup = function(event){
		event = event || window.event;
		if(event.keyCode == 38 || event.keyCode == 40){
			clearInterval(plane.timerUD);
		}else if(event.keyCode == 37 || event.keyCode ==39){
			clearInterval(plane.timerLR);
		}
	}
	
}

/**
 * 产生单颗子弹
 * @param {Object} left
 * @param {Object} top
 * @param {Object} fun
 */
function bulletCreate(left, top, fun){
	var bullet = document.createElement("img");
	bullet.src = plane.bulletImg;

	bullet.className = "bullet";
	bullet.style.left = left + "px";
	bullet.style.top = top + "px";
	
	gameBox.appendChild(bullet);
	
	move(bullet, 10, "top", -12, "timerBullet", function(){ 
		gameBox.removeChild(bullet);
	});
	
}

/**
 * 子弹持续发射
 * @param {Object} speed
 * @param {Object} fun
 */
function bulletLaunch(){
	
	clearInterval(plane.bulletTimer);
	
	//持续发射子弹
	plane.bulletTimer = setInterval(function(){
		bulletCreate(
				plane.offsetLeft + plane.clientWidth/2 - 5,
				plane.offsetTop);
	}, plane.bulletHZ);

}

/**
 * 飞机死亡
 */
function planeDied(){
	//如果飞机已死，直接返回
	if(plane.live == false) return;
	
	//标记死亡
	plane.live = false;
	
	//停止发射子弹
	clearInterval(plane.bulletTimer);
	
	//停止移动
	clearInterval(plane.timerUD);
	clearInterval(plane.timerLR);
	
	//停止监听键盘
	document.onkeydown = null;
	document.onkeyup = null;
	
	//道具栏清空
	plane.speedProp && (propImgs[0].style.width = "0px");
	plane.hzProp && (propImgs[1].style.width = "0px");
	plane.stopProp && (propImgs[2].style.width = "0px");
	
	//爆炸并弹出游戏结束
	explosion();
	
}

/**
 * 飞机爆炸特效
 */
function explosion(){
	
	var index = 0;
	gameBox.planeBongTimer = setInterval(function(){
		index++;
		plane.src = "img/explosion/a" + index + ".png";
		
		if(index >= 9){
			clearInterval(gameBox.planeBongTimer);
			//移除飞机
			gameBox.removeChild(plane);
			//游戏结束
			gameEnd();
		}
		
	},80);
	
}
