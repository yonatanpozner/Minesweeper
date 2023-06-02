'use strict'

const LEVELS = [{ size: 5, minesCount: 5 }, { size: 8, minesCount: 20 }, { size: 11, minesCount: 25 }]
const LIVES = 3
const VICTORY = 1
const LOSS = 0

var gGame

function onInit(level) {
    gGame = {
        isOn: true,
        isFirstClick: true,
        currLevelIdx: level,
        currLevel: LEVELS[level],
        lives: LIVES,
        emoji: HAPPY,
        isHintOn: false,
        score: 0
    }
    gSituations = []


    createBoard()
    setMines()
    setMinesNegsCount()
    renderBoard()
    renderLives()
    renderEmoji()
    renderHints()
    renderScore()
}

function onCellClicked(i, j) {
    saveSituation()
    var cell = gBoard[i][j]

    if (!gGame.isOn) return
    if (cell.isShown) return
    if (cell.isMarked) return
    if (gGame.isHintOn) {
        handleClickOnHintMode(i, j)
        return
    }
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
        shown(i, j)
        console.log('gGame.score: ', gGame.score)
    }
    if (checkVictory() && gGame.isOn) gameOver(VICTORY)
    renderBoard()
}

function onCellMarked(i, j, event) {
    saveSituation()
    event.preventDefault()
    if (!gBoard[i][j].isShown && gGame.isOn) {
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        if (checkVictory()) {
            gameOver(VICTORY)
        }
        renderBoard()
    }
}

function shown(i, j) {
    if (!gBoard[i][j].minesAroundCount) {
        expandShown(i, j)
    } else {
        gBoard[i][j].isShown = true
    }
    gGame.score++
    renderScore()
}

function expandShown(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (!currCell.isMine && !currCell.isShown && !currCell.isMarked) {
                currCell.isShown = true
                gGame.score += 0.5
                renderScore()
                if (!currCell.minesAroundCount) {
                    expandShown(i, j)
                }
            }
        }
    }
}

function onLevelClicked(elLevel, idx) {
    document.querySelector('.curr-level-btn').classList.remove('curr-level-btn')
    elLevel.classList.add('curr-level-btn')
    onInit(idx)
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
    gGame.emoji = isVictory ? WIN : SAD
    renderEmoji()
    if (!isVictory) showAllCells()
}

function onResetGame() {
    onInit(gGame.currLevelIdx)
}

function updateLives() {
    --gGame.lives
    document.querySelector('.lives span').innerHTML = gGame.lives
}

function renderEmoji() {
    document.querySelector('.emoji').innerHTML = gGame.emoji
}

function renderLives() {
    document.querySelector('.lives span').innerHTML = gGame.lives
}

function renderScore() {
    document.querySelector('.score span').innerHTML = gGame.score
}
