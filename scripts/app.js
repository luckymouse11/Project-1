function init() {

  // ELEMENTS

  const playerGrid = document.querySelector('.player-grid')
  const computerGrid = document.querySelector('.computer-grid')
  const scoreBoard = document.querySelector('.player-score')
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
  let shipCoordinates = []                // player ships div arrays eg. [[1, 2], [25, 35, 45]]
  const allCoordinates = []                 // player ships div numbers eg. [1, 2, 25, 35, 45]
  let compShipCoordinates = []            // computer ships div arrays eg. [[1, 2], [25, 35, 45]]
  const compAllCoordinates = []             // computer ships div numbers eg. [1, 2, 25, 35, 45]

  const shipInPosition = 'ship-in-position' // css class for ship set in position
  const ship = 'ship'                       // css class for the pieces
  const startButton = 'start-button'
  const shipDisappear = 'button-disappear'  //css to make buttons disappear upon ship being placed
  const shipSizes = {                       // ship size (how many divs each take)
    'Ship 1': 6,
    'Ship 2': 5,
    'Ship 3': 4, 
    'Ship 4': 3,
    'Ship 5': 2
  }
  const startingPosition = 0                // cell starting position (where boat appears first)
  let singleShipCoordinates = []          // markng a ships saved position
  let isVertical = false
  let currentPosition = startingPosition    // current position which is updated on every move //shouldnt need this
  let currentShipSize = 0
  let currentShipButton 
  let playerSpaceOccupied = 0 //number      // counter for space occupied on player board - if time, can create for total number of ships
  let enemySpaceOccupied                    // divs occupied on enemy grid
  let enemyShipsRemaining                   // enemy ships remaining
  
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


  function introScreen() {
    // display none -> remove intro page
    // when button clicked, display none
  }


  function addShip(cellPosition, shipSize, isVertical, save = false, computerBoard = false){
    const shipClass = save === true ? shipInPosition : ship
    const shipArray = computerBoard === true ? compShipCoordinates : shipCoordinates
    const divArray = computerBoard === true ? compAllCoordinates : allCoordinates

    singleShipCoordinates = []
    if (isVertical === true){
      for (let i = cellPosition; i <= cellPosition + width * (shipSize - 1); i += width){
        if (computerBoard === false){
          playerBoard[i].classList.add(shipClass)
        }
        singleShipCoordinates.push(i)                                                         // saves ship divs as an array 
      }  
    } else if (isVertical !== true){ 
      for (let i = cellPosition; i < cellPosition + shipSize; i++){
        if (computerBoard === false){
          playerBoard[i].classList.add(shipClass)
        }
        singleShipCoordinates.push(i)                                                         // saves ship divs as an array 
      }
    }
    if (save === true){                                                                       // saves singleShipCoordinates into an array with other ships
      shipArray.push(singleShipCoordinates)
      singleShipCoordinates.forEach(value => divArray.push(value))
    }
  }

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


  function isSpaceOccupied(cellPosition, computerBoard){
    const coordinatesArray = computerBoard === true ? compAllCoordinates : allCoordinates
    if (coordinatesArray.indexOf(cellPosition) > -1){
      return true
    } else {
      return false
    }
  }

  function shipOverlaps(singleShipCoordinates, computerBoard = false){
    for (let i = 0; i < singleShipCoordinates.length; i++){
      if (isSpaceOccupied(singleShipCoordinates[i], computerBoard) === true){
        return true
      }
    }
    return false
  }


  // Key movement
  function handleKeyDown(event){
    removeShip(currentPosition, currentShipSize, isVertical)

    const key = event.keyCode

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
    rotateBtn.addEventListener('click', rotate)
    document.addEventListener('keydown', handleKeyDown)
  }

  function saveShipPosition(event){
    
    if (shipOverlaps(singleShipCoordinates) === false){
      addShip(currentPosition, currentShipSize, isVertical, true)
      removeShip(currentPosition, currentShipSize, isVertical)
      rotateBtn.removeEventListener('click', rotate)
      document.removeEventListener('keydown', handleKeyDown)
      currentShipButton.classList.add(shipDisappear)
    }
    if (shipCoordinates.length === 5){
      const startBtn = document.createElement('button')
      startBtn.setAttribute('id', 'start-button')
      startBtn.innerText = 'Start Game'
      startBtn.classList.add(startButton)
      scoreBoard.appendChild(startBtn)
      startBtn.addEventListener('click', gameStart)
    }
  }


  // function to reset the board
  function reset(event){

  }





  function gameStart(){

    const shipPlacement = document.getElementById('ship-placement')
    const rotateButton = document.getElementById('rotate-btn')
    const setPositionButton = document.getElementById('set-position-btn')
    const resetButton = document.getElementById('reset-btn')
    const startButton = document.getElementById('start-button')
    // const buttonsToRemove = ['ship-placement', 'rotate-btn', 'set-position-btn', 'reset-btn', 'start-btn']
    // buttonsToRemove.forEach(btn => document.getElementById(btn).parentNode.removeChild(document.getElementById(btn)))
    shipPlacement.parentNode.removeChild(shipPlacement)
    rotateButton.parentNode.removeChild(rotateButton)
    setPositionButton.parentNode.removeChild(setPositionButton)
    resetButton.parentNode.removeChild(resetButton)
    startButton.parentNode.removeChild(startButton)
    alert('AVENGERS ASSEMBLE')

    isVertical = (Math.random() > 0.5 ? true : false)
    currentPosition = Math.floor(Math.random() * 100)

    for (const [key, value] of Object.entries(shipSizes)) {
      let invalidPosition = false
      currentShipSize = value

      do {
        isVertical = (Math.random() > 0.5 ? true : false)
        currentPosition = Math.floor(Math.random() * 100)
        invalidPosition = isInvalidShipPosition()    
        addShip(currentPosition, currentShipSize, isVertical, false, true)
        console.log(singleShipCoordinates)
      }
      while (invalidPosition === true || shipOverlaps(singleShipCoordinates, true) === true)
      addShip(currentPosition, currentShipSize, isVertical, true, true)
    }
  }


  function isInvalidShipPosition(){
    if (isVertical === false){
      if ((currentPosition % 10) > width - currentShipSize){
        return true
      } else {
        return false
      }
    } else {
      if (currentPosition > (width - currentShipSize) * width + (width - 1)){
        return true
      } else {
        return false
      }
    }
  }

  function updateScoreBoard(){
    // Enemy space occupied
    // Enemy ships remaining
    // Total shots taken
    
  }



  function playerTurn(event){
    // click square on grid - run check for ship
        // if ship is hit -> then remove + add explosion 
            // have all occupied space been hit?
            // yes = gameOver
            // no = go again 
        // else add cross for miss -> computers turn
    const targetDiv = event.target.innerText
    const targetIndex = compAllCoordinates.indexOf(targetDiv)       
    if (targetIndex > -1){                                       // if target div doesn't exist in compAllCoordinates, indexof returns -1 else returns indexof targetDiv

    }

  }

function computerTurn(){
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
  setPositionBtn.addEventListener('click', saveShipPosition)

}

window.addEventListener('DOMContentLoaded', init)