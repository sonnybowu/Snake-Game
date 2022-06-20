const BOARD_BORDER_COLOR = 'black'
const SNAKE_COLOR = 'lightgreen'
const SNAKE_BORDER_COLOR = 'darkgreen'
const GAME_BOARD_BG_COLOR = 'black'
const GAME_REFRESH_SPEED = 150
const FOOD_COLOR = 'red'

//Get game board element
const gameBoard = document.getElementById("gameBoard")
//Create a 2D rendering context
const context = gameBoard.getContext("2d")

//Creating snake representation
let snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150}
]

//Food representation
let food = {x: 200, y: 200}

//Snake velocity
let dx = 10
let dy = 0

//Score value
let score = 0
//Score element
let scoreElement = document.getElementById("score")

//End game element
let endGameMsg = document.getElementById("gameOver")

//Begin game
main()

//Event listender for arrow key change direction
document.addEventListener('keydown', changeDirection)

//main function
function main() {
    //Game loop
    setTimeout(function() {
        //Checks if game has ended
        if (hasGameEnded()) {
            endGameMsg.innerHTML = "GAME OVER!"
            return
        }

        createBoard()
        renderSnake()
        moveSnake()
        drawFood()
        //Checks if food is eaten, if so generate another food at a raondom coordinate on the gameboard
        if (foodEaten()) {
            createFood()
            addSnakeSegment()
            updateScore()
        }

        //Call main again
        main()
    }, GAME_REFRESH_SPEED)
}

//Function to render the gameboard
function createBoard() {
    //Setting background color
    context.fillStyle = 'black'
    //Setting game board color
    context.strokestyle = BOARD_BORDER_COLOR

    //Fill board with background color 
    context.fillRect(0, 0, gameBoard.width, gameBoard.height)
    //Render the border around the game board
    context.strokeRect(0, 0, gameBoard.width, gameBoard.height)
}

//Function to create each segment of snake
function renderSnakeSegment(segment) {
    //Set color of snake
    context.fillStyle = SNAKE_COLOR

    //Set border color of snake segments
    context.strokestyle = SNAKE_BORDER_COLOR

    //Fill snake segment with color
    context.fillRect(segment.x, segment.y, 10, 10)
    
    //Render snake segment border color
    context.strokeRect(segment.x, segment.y, 10, 10)
}

//Function that renders the entire snake by calling renderSnakeSegment for each segment of the snake
function renderSnake() {
    snake.forEach(element => {
        renderSnakeSegment(element)
    });
}

//Function that moves the snake forward by popping the end segment and adding new head to the front
function moveSnake() {
    //Create new head of snake
    let head = {x: snake[0].x + dx, y: snake[0].y + dy}
    //Add new head to the front of the snake
    snake.unshift(head)
    //remove last segment of snake
    snake.pop()
}

//Function that handles snake change of direction
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode

    //Snake should only go in directions not opposite to it's current direction
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
}

//Function that creates the food/apple that the snake will eat
function createFood() {
    //Randomly generate food coordinates in multiples of 10 due to 10 x 10 unit size
    food.x = Math.floor(Math.random() * 10) * 40
    food.y = Math.floor(Math.random() * 10) * 40
}

//Draws food on board
function drawFood() {
    //Set color of food
    context.fillStyle = FOOD_COLOR
 
    //Fill food color
    context.fillRect(food.x, food.y, 10, 10)
}

function foodEaten() {
    const head = snake[0]
    
    //If head has same coordinates as food, then it has eaten the food
    if (head.x === food.x && head.y === food.y) {
        return true
    }
    return false
}

//Add segment to snake
function addSnakeSegment() {
    //Get coordinates of current last segment of snake and second to last segment of snake
    lastSegment = snake[snake.length - 1]
    secondLastSegment = snake[snake.length - 2]

    //The difference between last segment and second to last segment determines how to add the segment at the end
    //If theres snake is going right add segment to left end
    if ((secondLastSegment.x - lastSegment.x) > 0) { 
        snake.push({x: lastSegment.x - 10, y: lastSegment.y})
    }
    //If snake is going left add segment to right end
    else if ((secondLastSegment.x - lastSegment.x) < 0) { 
        snake.push({x: lastSegment.x + 10, y: lastSegment.y})
    }
    //If snake is going up add to lower end
    else if ((secondLastSegment.y - lastSegment.y) < 0) { 
        snake.push({x: lastSegment.x, y: lastSegment.y + 10})
    }
    else if ((secondLastSegment.y - lastSegment.y) > 0) { 
        snake.push({x: lastSegment.x, y: lastSegment.y - 10})
    }
}

//Update player score
function updateScore() {
    //increment score by 10 when food is eaten
    score += 10
    scoreElement.innerHTML = score
}

//Check conditions for game end: hit the border or snake hits itelf
function hasGameEnded() {
    head = snake[0]

    //If snake head is outside border range then game has ended
    if (head.x > 400 || head.y > 400 || head.x < 0 || head.y < 0) {
        return true
    }
    //If snake head intersets with one of the segments, end game
    for (i = 1; i < snake.length - 1; i++) {
        segment = snake[i]
        if (head.x === segment.x && head.y === segment.y) {
            return true
        }
    }
}