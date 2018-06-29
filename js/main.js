// Coin racing web application that randomly moves coin when user pushes a button and records outcome


// Create canvas element to draw coins on page
var circle = document.createElement("canvas");
circle.id = "canvas";
let circleWidth = document.body.clientWidth;
circle.width = circleWidth
circle.height = 300;


// store values of Red in var -  radius, width, height, start and end angle 
var redX = 100;
var redY = 75;
var redRadius = 50;
var redStartAngle = 0;
var redEndAngle = 2*Math.PI;

// store values of Blue in var -  radius, width, height, start and end angle 
var blueX = 100;
var blueY = 225;
var blueRadius = 50;
var blueStartAngle = 0;
var blueEndAngle = 2*Math.PI;

var circleCtx = circle.getContext("2d");

// container 
var container = document.getElementById("container")
container.appendChild(circle);



// create coin flip button 
var button = document.createElement("button");
button.textContent = "Go!!";
button.classList.add("btn","btn-secondary")
document.getElementById("scoreBoard").appendChild(button);

//counter to store heads/tails records
var redCounter = 0;
var blueCounter = 0;

// create onclick event listener on "go" button
button.addEventListener("click", function() {
	// if random number <= 1  show heads else show tails
	if ((Math.round(Math.random() * 100) / 100) < 0.50) {
		console.log((Math.round(Math.random() * 100) / 100))
		redCounter++;
		pushRed();
	} else  {
		blueCounter++;
		pushBlue();
	} 

	// update and set text storing count records for each circle
	var results = document.getElementById("results");
	document.getElementById("redCount").textContent = `Red: ${redCounter}`;
	document.getElementById("blueCount").textContent = `Blue: ${blueCounter}` ;
	document.getElementById("results").textContent = `Results: `;
	finish();
})



// logic for when player crosses finish line
function finish() {
	if (redX > circleWidth / 1.5 && blueX < circleWidth / 1.5) {
		console.log("heads won!")
		document.body.style.backgroundColor = "red"
		button.style.display = "none"
		// create reset button
		reset();
	} else if (blueX > circleWidth / 1.5 && redX < circleWidth / 1.5) {
		console.log("won!")
		document.body.style.backgroundColor = "blue"
		button.style.display = "none"
		// create reset button
		reset();

	}
}

function reset() {
	var resetButton = document.createElement("button");
	resetButton.innerHTML = "Reset";
	resetButton.id = "resetButton";
	resetButton.classList.add("btn", "btn-light");
	document.getElementById("scoreBoard").appendChild(resetButton);	
	resetButton.addEventListener("click", resetPos)
 }

 // add logic that resets redX and blueX original position
 function resetPos() {
	 document.body.style.backgroundColor = "white";
	document.getElementById("resetButton").style.display = "none";
	 redX = 100;
	 blueX = 100;
	 button.style.display = "block"
	 redCounter = 0
	 blueCounter = 0
	 pushRed();
	 pushBlue();
 }



// funnction that gets window size and appends to heading
function updateText() {
	screenWidthSize.innerHTML = document.body.clientWidth;
}

// funtion to create red circle
function drawRed() {
	circleCtx.beginPath();
	circleCtx.arc(redX, redY, redRadius, redStartAngle, redEndAngle);
	circleCtx.lineWidth = 3;
	circleCtx.fillStyle = "red"
	circleCtx.fill();
	circleCtx.stroke();
};
// function to create blue circle 
function drawBlue() {
	circleCtx.beginPath()
	circleCtx.arc(blueX, blueY, blueRadius, blueStartAngle, blueEndAngle);
	circleCtx.lineWidth = 3;
	circleCtx.fillStyle = "blue"
	circleCtx.fill();
	circleCtx.stroke();
}

// function to push red circle 
function pushRed() {
	circleCtx.clearRect(0, 0, circle.width, 165 );
	drawRed();
	finishLine()
	// speed of red circle
	redX += 20;
}

// funtion to push blue circle
function pushBlue() {
	circleCtx.clearRect(0, 150, circle.width, 165);
	finishLine()
	drawBlue();
	// speed of blue circle
	blueX += 20;
}

// draw finish line
function finishLine() {
	circleCtx.fillStyle = "black";
	circleCtx.fillRect(circleWidth/1.5, 0, 40, 300);
	circleCtx.stroke();
}

drawRed();
drawBlue();
finishLine()


