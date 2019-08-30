/**
 * 
 * @param {Object} obj 需要操作的元素
 * @param {Object} speed 速度
 * @param {Object} attr 操作的样式
 * @param {Object} target 停止的位置
 * @param {Object} callback 回调函数
 */
function move(obj, speed, attr, target, timer, callback){
	
	clearInterval(obj[timer]);
	var newValue;
	var oldValue = getStyle(obj, attr);
//	alert(oldValue)
	if(oldValue == "auto"){
		oldValue = 0;
	}
	if(parseInt(oldValue) > target){
		speed = -speed;
	}
	
	obj[timer] = setInterval(function(){
		newValue = parseInt(oldValue) + speed;
		oldValue = newValue;
		
		if(newValue > target && speed > 0 || newValue < target && speed < 0){
			newValue = target;
		}
		
		obj.style[attr] = newValue + "px"; 
		
		if(newValue === target){
			clearInterval(obj[timer]);
			callback && callback();
		}
		
	}, 15);
}

/**
 * 获取元素的CSS样式
 * @param {Object} obj 需要获取样式的元素
 * @param {Object} name	需要获取的样式
 */
function getStyle(obj, name){
	if(window.getComputedStyle){
		return getComputedStyle(obj, null)[name];
	}
	return obj.currentStyle[name];
}


/**
 * 替换元素的类属性
 * @param {Object} obj
 * @param {Object} oldC
 * @param {Object} newC
 */
function replaceClass(obj, oldC, newC){
	var reg = new RegExp("\\b" + oldC + "\\b");
	obj.className = obj.className.replace(reg, newC); 
}


/**
 * 判断元素是否包含某个类属性
 * @param {Object} obj
 * @param {Object} cn
 */
function hasClass(obj, cn){
	var reg = new RegExp("\\b" + cn + "\\b");
	if(reg.test(obj.className)){
		return true;
	}
	return false;
}


/**
 * 为元素添加类属性
 * @param {Object} obj
 * @param {Object} cn
 */
function addClass(obj, cn){
	if(!hasClass(obj, cn)){
		obj.className += " " + cn;
	}
}


/**
 * 移除某个元素的某个类属性
 * @param {Object} obj
 * @param {Object} cn
 */
function removeClass(obj, cn){
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg, "");
}

/**
 * 判断元素是否包含某个类，若包含，则删除，不包含，则加上
 * @param {Object} obj
 * @param {Object} cn
 */
function toggleClass(obj, cn){
	if(hasClass(obj, cn)){
		removeClass(obj, cn);
	}else{
		addClass(obj, cn);
	}
}

function greedToRadian(greed){
	return Math.PI*2*greed / 360;
}
