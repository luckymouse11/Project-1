function init() {

  // ELEMENTS
  const introPage = document.querySelector('.intro')
  const playerGrid = document.querySelector('.player-grid')
  const computerGrid = document.querySelector('.computer-grid')
  const scoreBoard = document.querySelector('.player-score')
  const shipButtons = document.querySelectorAll('.ship-btn')
  const rotateBtn = document.getElementById('rotate-btn')
  const setPositionBtn = document.getElementById('set-position-btn')
  const backgroundAudio = document.getElementById('audio-background')
  const gameStartAudio = document.getElementById('audio-gamestart')
  const gunshotAudio = document.getElementById('audio-gunshot')
  const enemyShipsDownAudio = document.getElementById('audio-enemy-ship-down')
  const enemyGunshotAudio = document.getElementById('audio-gunshot')
  const gunshotMissAudio = document.getElementById('audio-gunshot-miss')


  // VARIABLES
  const right = 68              // d
  const left = 65               // a
  const up = 87                 // w
  const down = 83               // s
  const width = 10                          // width of the grid
  const cellCount = width * width           // total cell count 
  const playerBoard = []                    // empty array that will contain all the grid cells once created
  const computerBoard = []                  // empty array that will contain grid cells for computer board
  const shipCoordinates = []                  // player ships div arrays eg. [[1, 2], [25, 35, 45]]
  const allCoordinates = []                 // player ships div numbers eg. [1, 2, 25, 35, 45]
  const compShipCoordinates = []              // computer ships div arrays eg. [[1, 2], [25, 35, 45]]
  const compAllCoordinates = []             // computer ships div numbers eg. [1, 2, 25, 35, 45]
  const compTargetLog = []

  const intro = 'intro'
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
  let singleShipCoordinates = []            // markng a ships saved position
  let isVertical = false
  let currentPosition = startingPosition    // current position which is updated on every move //shouldnt need this
  let currentShipSize = 0
  let currentShipButton = null
  let playerSpaceOccupied = null            // counter for space occupied on player board - if time, can create for total number of ships
  let enemySpaceOccupied = null             // divs occupied on enemy grid
  let enemyShipsRemaining = null            // enemy ships remaining

  let totalShotsTaken = 0                   // counter for shots taken

  const shotHit = 'shot-hit'                // css for shots that hit
  const shotMissed = 'shot-missed'          // css for shots that miss



  // EXECUTION

  function createGrid(){
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
    introPage.classList.remove(intro)
    backgroundAudio.src = 'audio-background/1.mp3'
    backgroundAudio.play()
    backgroundAudio.volume = 0.3
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

  function saveShipPosition(){
    
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


  function gameStart(){

    const shipPlacement = document.getElementById('ship-placement')
    const rotateButton = document.getElementById('rotate-btn')
    const setPositionButton = document.getElementById('set-position-btn')
    const startButton = document.getElementById('start-button')

    shipPlacement.parentNode.removeChild(shipPlacement)
    rotateButton.parentNode.removeChild(rotateButton)
    setPositionButton.parentNode.removeChild(setPositionButton)
    startButton.parentNode.removeChild(startButton)
    alert('AVENGERS ASSEMBLE')
    gameStartAudio.src = `audio-gamestart/${Math.ceil(Math.random() * 2)}.mp3`
    gameStartAudio.play()

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
    playerSpaceOccupied = allCoordinates.length
    enemySpaceOccupied = compAllCoordinates.length
    enemyShipsRemaining = compShipCoordinates.length
    updateScoreBoard()
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
    document.getElementById('enemy-space-occupied').innerHTML = enemySpaceOccupied
    document.getElementById('enemy-ships-remaining').innerHTML = enemyShipsRemaining
    document.getElementById('total-shots').innerHTML = totalShotsTaken
  }


  function playerTurn(event){
    const targetDiv = parseFloat(event.target.innerText)
    const targetIndex = compAllCoordinates.indexOf(targetDiv)
    console.log('player turn targetDiv ->', targetDiv)
    console.log('player turn targetIndex ->', targetIndex)
    computerBoard[targetDiv].removeEventListener('click', playerTurn)

    gunshotAudio.src = `audio-shot/${Math.ceil(Math.random() * 4)}.mp3`
    gunshotMissAudio.src = 'audio-miss/1.mp3'
    enemyShipsDownAudio.src = `audio-enemy-ship-down/${Math.ceil(Math.random() * 2)}.mp3`

    totalShotsTaken += 1
    if (targetIndex > -1){                                                                // if target div doesn't exist in compAllCoordinates, indexof returns -1 else returns indexof targetDiv
      enemySpaceOccupied -= 1
      console.log('player turn - enemyspaceocc ', enemySpaceOccupied)
      for (let i = 0; i < compShipCoordinates.length; i++){
        const compShipCoordinatesIndex = compShipCoordinates[i].indexOf(targetDiv)

        if (compShipCoordinatesIndex > -1){
          computerBoard[targetDiv].classList.add(shotHit)                                 // update css of target div if shot hits - change to explosion gif if time
          gunshotAudio.play()
          compShipCoordinates[i][compShipCoordinatesIndex] = 'x'                          // change element in compShipCoordinates array to 'x'
          console.log('compshipcoordinates edited -> ', compShipCoordinates[i])
          const compShipDestroyed = compShipCoordinates[i].every(value => value === 'x')

          if (compShipDestroyed === true){
            console.log('player turn ship destroyed')
            enemyShipsRemaining -= 1
            console.log('player turn enemyshipsremaining ', enemyShipsRemaining)
            enemyShipsDownAudio.play()
          }
          break
        }
      }
      updateScoreBoard()
      // sleep for 1000ms
      if (enemyShipsRemaining === 0){
        gameOver(true)
        return
      }
    } else {
      updateScoreBoard()
      computerBoard[targetDiv].classList.add(shotMissed)                                  // update css of target div if shot misses - change to cross if time
      gunshotMissAudio.play()
      // sleep(3000)
      computerTurn()
    }
  }

  
//let potentialTargets = []

  // function generatePotentialTargets(cellPosition){
  // // clear previous entries
  // potentialTargets = []
  // // +1, -1, +10, -10 

  // // if has been hit, do not include
  // }

  function computerTurn(){

    let compTarget = null
    let compTargetIndex = null
    let continueTurn = true
    
    do {
      compTarget = Math.floor(Math.random() * 100)
      // check if compTarget has previously been hit
      // if yes, skip 'if' and rerun 'do' loop
      if (compTargetLog.indexOf(compTarget) === -1) {
        compTargetLog.push(compTarget)
        compTargetIndex = allCoordinates.indexOf(compTarget)
        enemyGunshotAudio.src = `audio-shot/${Math.ceil(Math.random() * 4)}.mp3`
        gunshotMissAudio.src = 'audio-miss/1.mp3'
        
        // if compTarget is part of a ship
        if (compTargetIndex > -1) {
          playerSpaceOccupied -= 1
          playerBoard[compTarget].classList.add(shotHit)
          enemyGunshotAudio.play()

          // check if all ships cells have been hit -> if yes, computer wins
          if (playerSpaceOccupied === 0) {
            gameOver(false)
            return
          }
        } else {
          // if shot missed, end computer's turn
          continueTurn = false
          playerBoard[compTarget].classList.add(shotMissed)
          gunshotMissAudio.play()
        }
      }
    } while (continueTurn)
  }

  function gameOver(playerWins){
    if (playerWins === true){
      setTimeout(alert('PLAYER WINS!!! Game Over'), 2000)
    } else {
      // thanos finger snap gif
      setTimeout(alert('COMPUTER WINS..........'), 2000)
    }
  }

  function sleep(milliseconds){
    const date = Date.now()
    let currentDate = null
    do {
      currentDate = Date.now()
    } while (currentDate - date < milliseconds)
  }
  
  // EVENT

  introPage.addEventListener('click', introScreen)
  createGrid()
  shipButtons.forEach(btn => btn.addEventListener('click', setShipPosition))
  setPositionBtn.addEventListener('click', saveShipPosition)
  computerBoard.forEach(btn => btn.addEventListener('click', playerTurn))
}

window.addEventListener('DOMContentLoaded', init)