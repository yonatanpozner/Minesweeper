'use strict'

const LEVELS = [{ size: 4, minesCount: 2 }, { size: 6, minesCount: 14 }, { size: 8, minesCount: 32 }]
const LIVES = 2
const VICTORY = 1
const LOSS = 0
var gGame

function onInit(level) {
    gGame = {
        isOn: true,
        isFirstClick: true,
        currLevelIdx : level,
        currLevel: LEVELS[level],
        lives: LIVES,
        smiley: HAPPY
    }

    createBoard()
    addMines()
    setMinesNegsCount()
    renderBoard()
    renderLives()
    renderSmiley()
}

function onCellClicked(i, j) {
    var cell = gBoard[i][j]

    if (!gGame.isOn) return
    if (cell.isShown) return
    if (cell.isMarked) return
    if (gGame.isFirstClick && cell.isMine) {
        moveMine(i, j)
    }
    if (gGame.isFirstClick) gGame.isFirstClick = false

    cell.isShown = true

    if (cell.isMine) {
        if (!gGame.lives) {
            gameOver(LOSS)
        } else {
            updateLives()
        }
    } else {
        expandShown(i, j)
    }
    if (checkVictory() && gGame.isOn) gameOver(VICTORY)
    renderBoard()
}

function onCellMarked(elCell, i, j, event) {
    event.preventDefault()
    if (elCell.classList.contains('cover') && gGame.isOn) {
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        if (checkVictory()) {
            gameOver(VICTORY)
        }
        renderBoard()
    }
}

function onLevelClicked(level,idx){

    var levelBtns = document.querySelectorAll('.level-btn')
    for(var i = 0; i < levelBtns.length; ++i){
        levelBtns[i].classList.remove('curr-level-btn')
        console.log('levelBtns[i]: ', levelBtns[i])
    }
    level.classList.add('curr-level-btn')
    onInit(idx)
}

function expandShown(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (!currCell.isMine && !currCell.isShown) {
                currCell.isShown = true
                if (!currCell.minesAroundCount) {
                    expandShown(i, j)
                }
            }
        }
    }
}

function checkVictory() {
    var count = 0
    for (var i = 0; i < gGame.currLevel.size; ++i) {
        for (var j = 0; j < gGame.currLevel.size; ++j) {
            var cell = gBoard[i][j]
            if (cell.isShown || cell.isMarked && cell.isMine) {
                count++
            }
        }
    }
    return count === gGame.currLevel.size ** 2
}

function gameOver(isVictory) {
    gGame.isOn = false
    if (isVictory) {
        gGame.smiley = WIN
        renderSmiley()
        console.log('victory!')
    } else {
        gGame.smiley = SAD
        renderSmiley()
        showAllCells()
        console.log('game over')
    }
}

function onResetGame(){
    onInit(gGame.currLevelIdx)
}

function updateLives() {
    --gGame.lives
    document.querySelector('.lives span').innerHTML = gGame.lives
}

function renderSmiley(){
    document.querySelector('.smiley').innerHTML = gGame.smiley
}

function renderLives() {
    document.querySelector('.lives').innerHTML = gGame.lives
}
