const BOARD_BORDER_COLOR = 'black'
const SNAKE_COLOR = 'lightgreen'
const SNAKE_BORDER_COLOR = 'darkgreen'
const GAME_BOARD_BG_COLOR = 'black'
const GAME_REFRESH_SPEED = 150

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

//Snake velocity
let dx = 10
let dy = 0

//Begin game
main()

//Event listender for arrow key change direction
document.addEventListener('keydown', changeDirection)

//main function
function main() {
    //Game loop
    setTimeout(function() {
        createBoard()
        renderSnake()
        moveSnake()

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