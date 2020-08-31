// select canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getcontext("2d");

//create the user paddle
const user ={
    x : 0,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score: 0
}
  // create the com paddle
  const com ={
    x : cvs.width -10,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score: 0
  }
   
// create the ball = 
    const ball ={
     x : cvs.width/2,
    y : cvs.height/2 ,
    radius: 10,
    speed : 0,
    velocityX : 5,
    velocityY : 5,
    color : "WHITE"
       
}
  

// draw rect function
 function drawRect(x,y,w,h,color)
 {
    ctx.fillstyle = color;
    ctx.fillrect(x,y,w,h);
 }

 //create the net 
 const net = {
     x : cvs.width/2 - 1,
     y : 0,
     width : 10,
     height : 10,
     color : "WHITE"
 }

 // draw net
 function drawNet()
 {
     for(let i = 0; i<= cvs.height; i +=15
        {
            drawRect(net.x, net.y +1, net.width, net.height, net.color);
        }
 }


 // draw circle 
 function DrawCircle(x,y,r,color)
 {
     ctx.fillstyle = color;
     ctx.beginpath ();
     ctx.arc(x,y,r,0,Mathh.PI*2,false);
     ctx.closePath();
     ctx.fill();
 }
 DrawCircle(100,100,50,"WHITE");

 // draw text
 function drawtext(text,x,y,color)
 {
     ctx.fillstyle = color;
     ctx.font ="45px fantasy";
     ctx.filltext(text,x,y);
 }


 // render the game 
function render()
 {
    //clear the canvas 
    drawRect(0,0,cvs.width, cvs.height,"BLACK");

    // draw the net 
    drawNet();

    //draw score
    drawtext(user.score,cvswidth/4,cvsheight/5,"WHITE");
    drawtext(com.score,3*cvswidth/4,cvsheight/5,"WHITE");

    //draw the user and com paddle
    
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, ucom.width, com.height, com.color);

    //draw the ball
    drawCircle(ball.x, ball.y, ball.redius, ball.color);
}

//control the user paddle
cvs.addEventListener("mousemove",movePaddle);

function movePaddle(evt) {
    let rect = cvs.getBoundingClientRect();

    user.y =  evt.clientY - rect.top - user.height/2;

}

// collision detection 
function collision (b,p)
{
    b.top = b.y - b.radius;
    b.bottom = n.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bpttom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}


//reset ball
function resetBall()
{
ball.x = cvs.width/2;
ball.y = cvs.height/2;

ball.speed = 5;
ball.velocityX= -ball.velocityX;
}

// update : pos, mov, score, ....
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityV;

// simple AI to control the com paddle
    let computerlevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerlevel;

    if(ball.y + ball.radius > cvs.height) || ball.y - ball.radius < 0)
    {
        ball.velocityY = -ball.velocityY
    }

    let player = (ball.x < cvs.width/2) ? user : com;

    if(collision(ball,player))
    {
    // where the ball hit the player
    let collidePoint = ball.y - (player.y + player.height/2);

// normalization
collidePoint = collidePoint/(player.height/2);


//calculate angle in radian
let angleRad = collidePoint * Math.PI/4;

//X direction of the ball when it's hit
let direction = (ball.x < cvs.width/2)? 1: -1;

// change vel X and Y
ball.velocityX = direction * ball.speed * Math.cos(angleRad);
ball.velocityY=              ball.speed * Math.sin(angleRad);

// everytime the ball hit a paddle ,we encrese its speed
ball.speed += 0.5;

//update the score
if(ball.x - ball.radius < 0){
    // the com win
    com.score++;
    resetBall();
}
else if (ball.x + ball.radius> cvs.width){
    //user win
    user.score++;
    resetBall();
}


    }
}

// game init
function game()
{
    render();
}

// loop
const framePerSecond = 50;
setInterval(game, 1000/framePerSecond);

































