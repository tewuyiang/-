//var bg1 = document.getElementsByClassName("bg")[0];

function createBg(top){
	var bg = document.createElement("img");
	bg.src = "img/bg.jpg";
	gameBox.appendChild(bg);
	bg.className = "bg";
	bg.style.top = top + "px";
	
	return bg;
}

/**
 * 背景图片持续移动
 * @param {Object} bg
 */
function moveBg(bg){
	var bg2 = createBg(-bg.clientHeight );
	move(bg, 3, "top", -5, "bgTimer", function(){
		//继续移动到底
		move(bg, 3, "top", gameBox.clientHeight, "bgTimer", function(){
			gameBox.removeChild(bg);
		});
		moveBg(bg2);
	});
	
}
