
/**
 * 判断两个圆形标签的是否相撞
 * @param {Object} c1
 * @param {Object} c2
 */
function circleToCircle(c1, c2){
	
	if(!c1 || !c2){
		return false;
	}
	
	//获取第一个圆形的圆心
	var x1 = c1.offsetLeft + c1.clientWidth/2;
	var y1 = c1.offsetTop + c1.clientHeight/2;
	
	//获取第二个圆的圆心
	var x2 = c2.offsetLeft + c2.clientWidth/2;
	var y2 = c2.offsetTop + c2.clientHeight/2;
	
	return judgeColl(x1, y1, x2, y2, c1.clientHeight/2 + c2.clientHeight/2);
}


/**
 * 通过坐标判断两个圆是否相撞
 */
function judgeColl(x1,y1,x2,y2,distance){
	if(calculated(x1,y1,x2,y2) <= distance){
		return true;
	}
	return false;
}


/**
 * 计算两个坐标的距离
 */
function calculated(x1, y1, x2, y2){
	return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}


/**
 * 检查子弹与敌人是否相撞
 */
function bulletToEnemy(){
	
	clearInterval(gameBox.BulletToEnemyTimer);
	
	gameBox.BulletToEnemyTimer = setInterval(function(){
		
		var bullets = gameBox.getElementsByClassName("bullet");
		var enemies = gameBox.getElementsByClassName("enemy");
		
		
		for(var i=0; i<bullets.length; ++i)
			for(var j=0; j<enemies.length; ++j){
				if(circleToCircle(bullets[i], enemies[j])){
					// 子弹停止并消失
					clearInterval(bullets[i].timerBullet);
					gameBox.removeChild(bullets[i]);
					
//					console.log(enemies[j]);
//					// 敌人被击中 
					beHit(enemies[j]);
				}
			}
	}, 25);
	
}

/**
 * 判断敌人是否击中飞机
 */
function enemyToPlane(){
	
	clearInterval(gameBox.enemyToPlaneTimer);
	
	gameBox.enemyToPlaneTimer = setInterval(function(){
		var enemies = gameBox.getElementsByClassName("enemy");
		
		//造4个圆形替代飞机
//		var c1 = create(18, plane.offsetTop+4, plane.offsetLeft+2);
//		var c2 = create(24, plane.offsetTop, plane.offsetLeft+14);
//		var c3 = create(18, plane.offsetTop+4, plane.offsetLeft+34);
//		var c4 = create(18, plane.offsetTop+16, plane.offsetLeft+16); 
		
		var x1,y1,x2,y2;
		for(var i=0; i<enemies.length; ++i){
			x1 = enemies[i].offsetLeft + enemies[i].clientWidth/2;
			y1 = enemies[i].offsetTop + enemies[i].clientHeight/2;
			
			x2 = plane.offsetLeft+11;
			y2 = plane.offsetTop+13;
			if(judgeColl(x1, y1, x2, y2, enemies[i].clientWidth/2+9)){
				planeDied();
			}
			
			x2 = plane.offsetLeft+26;
			y2 = plane.offsetTop+12;
			if(judgeColl(x1, y1, x2, y2, enemies[i].clientWidth/2+12)){
				planeDied();
			}
			
			
			x2 = plane.offsetLeft+43;
			y2 = plane.offsetTop+13;
			if(judgeColl(x1, y1, x2, y2, enemies[i].clientWidth/2+9)){
				planeDied();
			}
			
			x2 = plane.offsetLeft+25;
			y2 = plane.offsetTop+25;
			if(judgeColl(x1, y1, x2, y2, enemies[i].clientWidth/2+9)){
				planeDied();
			}
		}
	}, 25);
	
}

/**
 * 检查飞机是否接触到道具
 */
function propToPlane(){
	
	clearInterval(gameBox.propToPlaneTimer);
	
	gameBox.propToPlaneTimer = setInterval(function(){
		
		var props = gameBox.getElementsByClassName("prop");
		
		var x1,y1,x2,y2;
		for(var i=0; i<props.length; ++i){
			x1 = props[i].offsetLeft + props[i].clientWidth/2;
			y1 = props[i].offsetTop + props[i].clientHeight/2;
			
			x2 = plane.offsetLeft+11;
			y2 = plane.offsetTop+13;
			if(judgeColl(x1, y1, x2, y2, props[i].clientWidth/2+9)){
				judgeProp(props[i]);
				continue;
			}
			
			x2 = plane.offsetLeft+26;
			y2 = plane.offsetTop+12;
			if(judgeColl(x1, y1, x2, y2, props[i].clientWidth/2+12)){
				judgeProp(props[i]);
				continue;
			}
			
			
			x2 = plane.offsetLeft+43;
			y2 = plane.offsetTop+13;
			if(judgeColl(x1, y1, x2, y2, props[i].clientWidth/2+9)){
				judgeProp(props[i]);
				continue;
			}
			
			x2 = plane.offsetLeft+25;
			y2 = plane.offsetTop+25;
			if(judgeColl(x1, y1, x2, y2, props[i].clientWidth/2+9)){
				judgeProp(props[i]);
				continue;
			}
		}
		
	}, 25);
}

/**
 * 吃到道具，并判断道具种类
 * @param {Object} obj
 */
function judgeProp(obj){
	
	//将道具图标从游戏界面删除
	gameBox.removeChild(obj);
	
	var str = obj.src.split("/");
	if(str[str.length-1] === "prop1.png"){
		propImgs[0].style.width = propTs.clientWidth + "px";
		propImgs[0].style.top = "0px";
		plane.speedProp || (plane.speedProp = 1);
//		eatSpeed();
	}else if(str[str.length-1] === "prop2.png"){
		propImgs[1].style.width = propTs.clientWidth + "px";
		propImgs[1].style.top = "0px";
		plane.hzProp || (plane.hzProp = 1);
//		eatHz();
	}else if(str[str.length-1] === "prop3.png"){
		propImgs[2].style.width = propTs.clientWidth + "px";
		propImgs[2].style.top = "0px";
		plane.stopProp || (plane.stopProp = 1);
//		eatMapGun();
	}
}
