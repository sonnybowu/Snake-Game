const BOARD_BORDER_COLOR = 'black'
const SNAKE_COLOR = 'lightgreen'
const SNAKE_BORDER_COLOR = 'darkgreen'

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

//Begin game
main()

//main function
function main() {
    createBoard()
    renderSnake()
}

//Function to render the gameboard
function createBoard() {
    //Setting game board color
    context.strokestyle = BOARD_BORDER_COLOR

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