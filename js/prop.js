propImgs = document.getElementsByClassName("TsImg");
propLi = document.getElementsByTagName("li");

/**
 * 定时随机生成道具
 */
function createProp(){
	gameBox.createPropTimer = setInterval(function(){
		
		var prop = document.createElement("img");
		prop.className = "prop";
		prop.move = circleMove;
		gameBox.appendChild(prop);
		
		var type = parseInt(1 + Math.random()*3);
		switch(type){
			case 1 : 
				prop.src = "img/prop1.png";
				break;
			case 2 : 
				prop.src = "img/prop2.png";
				break;
			case 3 : 
				prop.src = "img/prop3.png";
				break;
			default : 
				prop.src = "img/prop2.png";
		}
		
		//随机速度
		prop.ts = 1 + Math.random()*3;
		prop.ls = Math.random()*6 - 3;
		
		//初始位置
		prop.style.top = -parseInt(prop.clientWidth) + "px";
		prop.style.left = Math.random()*(gameBox.clientWidth - prop.clientWidth - 5) + "px";
		
		//移动
		prop.move();
		
	}, gameBox.createPropSpeed);
}


/**
 * 吃到提升速度的道具
 */
function eatSpeed(){
	
	
	//提速
	plane.speed = 8;
	
	clearInterval(plane.eatSpeedTimer);
	plane.eatSpeedTimer = setInterval(function(){
		
		propImgs[0].style.width = parseInt(getStyle(propImgs[0], "width")) - 1 + "px";
		verticalCentering(propImgs[0]);	//让样式垂直居中
		
		//道具时间结束
		if(propImgs[0].clientWidth <= 0){
			clearInterval(plane.eatSpeedTimer);
			plane.speed = 5;
			//清除此类道具
			plane.speedProp = 0;
		}
	},100);
	
}


/**
 * 吃到提升子弹频率的道具
 */
function eatHz(){
	
	//提升子弹频率
	plane.bulletHZ = 150;
	plane.bulletImg = "img/myBullet.png";
	//重新发射子弹
	bulletLaunch(); 
	
	clearInterval(plane.eatHzTimer);
	plane.eatHzTimer = setInterval(function(){
		propImgs[1].style.width = parseInt(getStyle(propImgs[1], "width")) - 1 + "px";
		verticalCentering(propImgs[1]);	//让样式垂直居中

		//道具时间结束
		if(propImgs[1].clientWidth <= 0){
			clearInterval(plane.eatHzTimer);
			//重新设置频率并发射子弹
			plane.bulletHZ = 250;
			plane.bulletImg = "img/BossBullet.png";
			bulletLaunch(); 
			//清除此类道具
			plane.hzProp = 0;
		}
	},100); 
}

/**
 * 吃到清除地图上所有敌人的道具
 */
function eatMapGun(){
	
	
//	clearEnemy();
	stopEnemy();
	
	clearInterval(plane.eatMapGunTimer);
	plane.eatMapGunTimer = setInterval(function(){
		propImgs[2].style.width = parseInt(getStyle(propImgs[2], "width")) - 1 + "px";
		verticalCentering(propImgs[2]);	//让样式垂直居中
		
		//道具时间结束
		if(propImgs[2].clientWidth <= 0){
			clearInterval(plane.eatMapGunTimer);
			//让停下的敌人重新运动
			enemyStopToMove();
			//清除此类道具
			plane.stopProp = 0;
		}
	},100); 
}


/**
 * 清除当前页面的所有道具
 */
function clearProps(){
	var props = gameBox.getElementsByClassName("prop");
	for(var i=props.length-1; i>=0; --i){
		props[i] && gameBox.removeChild(props[i]);
	}
}

/**
 * 让元素垂直居中
 * @param {Object} child
 * @param {Object} parend
 */
function verticalCentering(child){
	child.style.top = ( 100 - child.clientHeight )/2 + "px";
}
