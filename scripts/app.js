function init() {

  // ELEMENTS

  const playerGrid = document.querySelector('.player-grid')
  const computerGrid = document.querySelector('.computer-grid')
  const shipButtons = document.querySelectorAll('.ship-btn')
  const rotateBtn = document.getElementById('rotate-btn')
  const setPositionBtn = document.getElementById('set-position-btn')


  // VARIABLES
  const right = 68              // d
  const left = 65               // a
  const up = 87                 // w
  const down = 83               // s
  const width = 10                          // width of the grid
  const cellCount = width * width           // total cell count 
  const playerBoard = []                    // empty array that will contain all the grid cells once created
  const computerBoard = []                  // empty array that will contain grid cells for computer board
  const shipCoordinates = []

  const shipInPosition = 'ship-in-position' // css class for ship set in position
  const ship = 'ship'                       // css class for the pieces
  const shipDisappear = 'button-disappear'
  const shipSizes = {                       // ship size (how many divs each take)
    'Ship 1': 6,
    'Ship 2': 5,
    'Ship 3': 4, 
    'Ship 4': 3,
    'Ship 5': 2
  }
  const startingPosition = 0                // cell starting position (where boat appears first)
  let isVertical = false
  let currentPosition = startingPosition    // current position which is updated on every move //shouldnt need this
  let currentShipSize = 0
  let currentShipButton 
  let playerSpaceOccupied = 0 //number      // counter for space occupied on player board - if time, can create for total number of ships
  let computerSpaceOccupied                 // counter for space occupied on computer board
  let playerSpaceHit                        // counter for ships that have been hit
  let computerSpaceHit                      // counter for enemy ships remaining
  let totalShotsTaken                       // counter for shots taken


  // EXECUTION

  function createGrid(startPos){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      playerGrid.appendChild(cell)
      playerBoard.push(cell)
    }
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      computerGrid.appendChild(cell)
      computerBoard.push(cell)
    }
  }




  function startGameScreen() {
    // display none -> remove intro page
    // when button clicked, display none
  }



  function addShip(cellPosition, shipSize, isVertical, save = false){
    let shipClass = ship
    const singleShipCoordinates = []
    if (save === true){
      shipClass = shipInPosition
    }
    if (isVertical === true){
      for (let i = cellPosition; i <= cellPosition + width * (shipSize - 1); i += width){
        playerBoard[i].classList.add(shipClass)
        singleShipCoordinates.push(i)
      }  
    } else if (isVertical !== true){ 
      for (let i = cellPosition; i < cellPosition + shipSize; i++){
        playerBoard[i].classList.add(shipClass)
        singleShipCoordinates.push(i)
      }
    }
    if (save === true){
      shipCoordinates.push(singleShipCoordinates)
    }
  }
  // click to place ship -> use array to store ships position

  function removeShip(cellPosition, shipSize, isVertical){
    if (isVertical === true){
      for (let i = cellPosition; i <= cellPosition + width * (shipSize - 1); i += width){
        playerBoard[i].classList.remove(ship)
      }  
    } else { 
      for (let i = cellPosition; i < cellPosition + shipSize; i++){
        playerBoard[i].classList.remove(ship)
      }
    }
  }

  // Rotation
  function rotate(){
    removeShip(currentPosition, currentShipSize, isVertical)
    const remainder = currentPosition % width
    const rotationLimit = width - currentShipSize

    // ensure that ship does not rotate outside of board
    if (isVertical === true){
      isVertical = false
      if (remainder > rotationLimit){
        currentPosition = currentPosition - remainder + rotationLimit
      }
    } else {
      isVertical = true
      if (currentPosition >= (rotationLimit + 1) * width){
        currentPosition = rotationLimit * width + remainder
      }
    }

    addShip(currentPosition, currentShipSize, isVertical)
  }

  // Key movement
  function handleKeyDown(event){
    removeShip(currentPosition, currentShipSize, isVertical)

    const key = event.keyCode
    console.log(event.keyCode)

    if (isVertical === false){
      if (key === right && (currentPosition + currentShipSize - 1) % width !== width - 1){
        currentPosition++
      } else if (key === left && currentPosition % width !== 0){
        currentPosition--
      } else if (key === up && currentPosition >= width){
        currentPosition -= width
      } else if (key === down && currentPosition + width <= cellCount - 1){
        currentPosition += width
      } else {
        console.log('INVALID KEY')
      }
      console.log('current position ->',currentPosition)
      addShip(currentPosition, currentShipSize, isVertical)
    } else {
      if (key === right && currentPosition % width !== width - 1){
        currentPosition++
      } else if (key === left && currentPosition % width !== 0){
        currentPosition--
      } else if (key === up && currentPosition >= width){
        currentPosition -= width
      } else if (key === down && (currentPosition + ((currentShipSize - 1) * 10)) + width <= cellCount - 1){
        currentPosition += width
      } else {
        console.log('INVALID KEY')
      }
      console.log('current position ->',currentPosition)
      addShip(currentPosition, currentShipSize, isVertical)
    }
  } 


  // adjust ship position -> set ship position
  function setShipPosition(event){
    currentShipButton = event.target
    removeShip(currentPosition, currentShipSize, isVertical)
    currentShipSize = shipSizes[event.target.innerText]
    currentPosition = startingPosition
    addShip(currentPosition, currentShipSize, isVertical)
    document.addEventListener('keydown', handleKeyDown)
  }

  function saveShipPosition(event){
    addShip(currentPosition, currentShipSize, isVertical, true)
    document.removeEventListener('keydown', handleKeyDown)
    currentShipButton.classList.add(shipDisappear)
  }






  // function to reset the board
  function reset(event){

  }



function gameStart(){
  // upon game start button -> randomly place ships for computer
  // use array to store ships position for future checks
  // change cursor to crosshair
}

function shoot(){
  // click square on grid - run check for ship
      // if ship is hit -> then remove + add explosion 
          // have all occupied space been hit?
          // yes = gameOver
          // no = go again 
      // else add cross for miss -> computers turn
  // random select square for computer shot
      // if ship then remove + add explosion -> go again, else remove + add cross for miss
          // upon occupied space being hit -> create an array around the "hit" -> next turn targets this array
          // if miss then reset target area
}

function gameOver(){
  // if computer ships all hit -> winner screen
  // if player ships all hit -> loser screen
  // alert message for win or lose -> ask to reset game
}


  // EVENT

  // addEventListener - start game (to start adding ships)
  // addEventListener - click to add ship 1
  //                  - keys to rotate ship?
  //                  - click to set position - make sure squares are no longer accessible (avoid overlap)
  // repeat steps for ship 2 and ship 3
  // addEventListener - button to start game -> adds 




  createGrid(startingPosition)
  shipButtons.forEach(btn => btn.addEventListener('click', setShipPosition))
  rotateBtn.addEventListener('click', rotate)
  setPositionBtn.addEventListener('click', saveShipPosition)

}

window.addEventListener('DOMContentLoaded', init)