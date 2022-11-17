$(document).ready(function(){

	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	
	var cw = 20;
	var d;
	var food;
	var score;
   var level;
	
	
	var snake_array; 
	
	
	$("#start").click(function(){
        document.getElementById("stop").style.display="inline-block";
        document.getElementById("start").style.display="none";
        
		d = "right"; //direction
		create_snake();
		create_food(); 
		score = 0;
     level = 1;
		
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 100);
	});
	
	
    $("#stop").click(function(){
        document.getElementById("stop").style.display="none";
        document.getElementById("continue").style.display="inline-block";
        
        clearInterval(game_loop);
    });

    $("#continue").click(function(){
        document.getElementById("stop").style.display="inline-block";
        document.getElementById("continue").style.display="none";

        game_loop = setInterval(paint, 100);

    })
	function create_snake()
	{
		var length = 3; //Length of the snake
		snake_array = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:0});
		}
	}
	
	//Lets create the food now
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		
	}
	
	
	function paint()
	{
		
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, w, h);
		

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
	
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
	
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
            document.getElementById("start").style.display="inline-block";
            document.getElementById("stop").style.display="none";
            document.getElementById("continue").style.display="none";
            high_score=document.getElementById("score");
            if(high_score.value<score)
            alert(score)
            high_score.innerHTML=score;
			return;
		}
		
		
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score+=8;
       
			//Create new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); 
			tail.x = nx; tail.y = ny;
		}
		
		
		snake_array.unshift(tail); 
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			
			paint_cell(c.x, c.y, "black");
		}
		
		
		paint_cell(food.x, food.y, "green");
		
		var score_text = "Score: " + score;
     var level_text = "Level: " + level;
		ctx.fillText(score_text, 5, h-5);
     ctx.fillText(level_text, 60, h-5);
	}
	
	
	function paint_cell(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = color;
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	function check_collision(x, y, array)
	{
		
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}
	
	
	$(document).keydown(function(e){
		var key = e.which;
		
		if(key == "37" && d != "right") d = "left";
		else if(key == "38" && d != "down") d = "up";
		else if(key == "39" && d != "left") d = "right";
		else if(key == "40" && d != "up") d = "down";
		
	})
	
	
	
	
	
	
	
})