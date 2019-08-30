/**
 * 创建一个敌人
 */
function createEnemy(){
	var enemy = document.createElement("div");
	enemy.className = "enemy";
	
	//随机生命值
	enemy.life = parseInt(Math.random()*4 + 1);
	enemy.innerText = enemy.life;
	enemy.style.fontSize = 16 + (enemy.life-1)*6 + "px";

	//根据生命值的不同设置不同的颜色
	switch(enemy.life){
		case 1:
			enemy.style.backgroundColor = "deepskyblue";
			break;
		case 2:
			enemy.style.backgroundColor = "blueviolet";
			break;
		case 3:
			enemy.style.backgroundColor = "mediumspringgreen";
			break;
		case 4:
			enemy.style.backgroundColor = "indianred";
			break;
		default:
			enemy.style.backgroundColor = "red";
	}
	
	//根据生命值构建元素
	enemy.style.width = 20 + enemy.life*10 + "px";
	enemy.style.height = 20 + enemy.life*10 + "px";
	
//	//随机速度
	enemy.ts = 1 + Math.random()*3;
	enemy.ls = Math.random()*6 - 3;
	
	//初始位置
	enemy.style.top = -parseInt(enemy.style.width) + "px";
	enemy.style.left = Math.random()*(gameBox.clientWidth - 25 - enemy.life*10) + "px";
	
	//垂直居中
	enemy.style.lineHeight = 20 + enemy.life*10 + "px";
	
	enemy.enemyMove = circleMove;
	
	return enemy;
}


/**
 * 需要移动的元素，给出角度和速度
 * @param {Object} obj
 * @param {Object} speed
 * @param {Object} greed
 * @param {Object} gameBox 边界元素
 */
function circleMove(){
	var obj = this;
	
	clearInterval(obj.moveTimer);
	obj.moveTimer = setInterval(function(){
		obj.style.left = obj.offsetLeft + obj.ls + "px";
		obj.style.top = obj.offsetTop + obj.ts + "px";
		
		// 到达左右边界时反弹
		if(obj.offsetLeft <= 0
			|| obj.clientWidth + obj.offsetLeft >= gameBox.clientWidth){
			obj.ls = -obj.ls;
			obj.style.left = obj.offsetLeft + obj.ls + "px";
			obj.style.top = obj.offsetTop + obj.ts + "px";
		}
		
		// 到达最底部时，清除样式，关闭定时调用
		if(obj.offsetTop >= gameBox.clientHeight){
			clearInterval(obj.moveTimer);
			gameBox.removeChild(obj);
		}
			
	},25);
}


/**
 * 被击中后缩小或者消失
 * @param {Object} obj 被击中的元素
 */
function beHit(obj){
	
	score++;
	
	if(obj.clientHeight % 10 != 0){
		obj.style.width = obj.clientHeight - obj.clientHeight%10 + "px";
		obj.style.width = obj.style.height;
		// 内部字体减小
		obj.style.lineHeight = 20 + obj.life*10 + "px";
		obj.style.fontSize = parseInt(obj.style.fontSize) - 6 + "px";
	}
	
	if(obj.clientHeight > 30){
		
		// 内部数字-1
		if(obj.life > 1){
			obj.life = obj.life - 1;
			obj.innerText = obj.life;
		}
		
		// 半径减少10像素
		var flag = 0;
		clearInterval(obj.changeTimer);
		obj.changeTimer = setInterval(function(){
			flag+=2;
			
			obj.style.width = obj.offsetWidth - 2 + "px";
			obj.style.height = obj.offsetHeight - 2 + "px";
			
			if(flag >= 10){
				clearInterval(obj.changeTimer);
			}
			
		},15);
		
		// 内部字体减小
		obj.style.lineHeight = 20 + obj.life*10 + "px";
		obj.style.fontSize = parseInt(obj.style.fontSize) - 6 + "px";
		
	}else{
		clearInterval(obj.moveTimer);
		obj.offsetParent.removeChild(obj);
	}
}

/**
 * 随机按时生成敌人
 */
function enemyAttack(){
	
	clearInterval(gameBox.ceTimer);
	
	gameBox.ceTimer = setInterval(function(){
		var enemy = createEnemy();
		gameBox.appendChild(enemy);
		enemy.enemyMove();
	}, gameBox.createEnemySpeed);
	
}


/**
 * 清除所有敌人
 */
function clearEnemy(){
	
	//清除界面上的所有敌人,必须从后往前遍历，否则只会删除一般的子节点
	var enArrs = gameBox.getElementsByClassName("enemy");
	for(var i=enArrs.length-1; i>=0; --i){
		if(enArrs[i]){
			clearInterval(enArrs.moveTimer);
			if(plane.live){
				score += enArrs[i].life;
			}
			gameBox.removeChild(enArrs[i]);
		}
	}
	
}


/**
 * 修改游戏难度，每30秒提升一次
 */
function changeDiff(){
	
	clearInterval(gameBox.createEnemySpeedTimer);
	
	gameBox.createEnemySpeedTimer = setInterval(function(){
		console.log(gameBox.createEnemySpeed);
		if(gameBox.createEnemySpeed >= 300){
			gameBox.createEnemySpeed -= 100;
			enemyAttack();
		}
		if(gameBox.createPropSpeed >= 1000){
			gameBox.createPropSpeed -= 500;
		}
		
	},30*1000)
}


/**
 * 让界面上的所有敌人停下
 */
function stopEnemy(){
	//清除界面上的所有敌人
	var enArrs = gameBox.getElementsByClassName("enemy");
	for(var i=0; i<enArrs.length; ++i){
		enArrs[i] && clearInterval(enArrs[i].moveTimer);
	}
}

/**
 * 让停下的敌人重新开始运动
 */
function enemyStopToMove(){
	var enArrs = gameBox.getElementsByClassName("enemy");
	for(var i=0; i<enArrs.length; ++i){
		enArrs[i].enemyMove();
	}
}


