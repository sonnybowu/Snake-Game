const BOARD_BORDER_COLOR = 'black'

//Get game board element
const gameBoard = document.getElementById("gameBoard")
//Create a 2D rendering context
const context = gameBoard.getContext("2d")

//Begin game
main()

//main function
function main() {
    createBoard()
}

function createBoard() {
    //Setting game board color
    context.strokestyle = BOARD_BORDER_COLOR

    //Render the border around the game board
    context.strokeRect(0, 0, gameBoard.width, gameBoard.height)
}