var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
		//mode button event listeners
	for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		//below same as if/else statement using turnary operators
		// works with reset() to determine number of squares
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();
	});

  }
}

function setUpSquares() {
	  	//set event handlers for the squares
	for(var i = 0; i < squares.length; i++) {

		//add click listeners to squares
		squares[i].addEventListener("click", function() {
		// grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		// compare color to clicked color
		if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}

}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++) {
		//if there is a color to paint for the square
		//generateRandomColors outputs number of colors to paint
		if(colors[i]) {
			//display squares for numSquares from above
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			//there are no colors to paint for divs, 
			//then don't display divs
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";

}

resetButton.addEventListener("click", function() {
	reset();
});


function changeColors(color) {
	//loop though all squares
	for(var i = 0; i < squares.length; i++) {
	//change colors to given color
	squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//repeat num times
	var arr = []
	//add num random colors to array
	for(var i = 0; i < num; i++) {
	//get random color and push into array
	arr.push(randomColor());	
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a 'red' from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a 'green' from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a 'blue' from 0 - 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}