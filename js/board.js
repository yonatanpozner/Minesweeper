'use strict'

const LEVELS = [{size: 4, minesCount: 2}, {size: 6, minesCount: 14}, {size: 8, minesCount: 32}]
var gGame

function onInit(){
    gGame = {
        isOn : true,
        currLevel: LEVELS[1]
    }

    createBoard()
    addMines()
    renderBoard()
}

function onCellClicked(elCell, i, j){
    var cell = gBoard[i][j]

    if(!gGame.isOn) return
    if(cell.isShown) return
    if(cell.isMarked) return

    cell.isShown = true
       
    if(cell.isMine) gameOver(0)
    if(checkVictory()) gameOver(1)
    expandShown(elCell,i,j)
    renderBoard()
}

function onCellMarked(elCell,i,j,event){
    event.preventDefault()
    if(elCell.classList.contains('cover') && gGame.isOn){
        gBoard[i][j].isMarked = !gBoard[i][j].isMarked
        if(checkVictory()){
            gameOver(1)
        }
        renderBoard()
    }
}

function expandShown(elCell, rowIdx, colIdx){
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (!currCell.isMine) currCell.isShown = true
        }
    }
}

function checkVictory(){
    var count = 0
    for (var i = 0; i < gGame.currLevel.size; ++i) {
        for (var j = 0; j < gGame.currLevel.size; ++j) {
            var cell = gBoard[i][j] 
            if(isGoodCell(cell)){
                count++
            }
        }
    }
    // console.log('count: ', count)
    return count === gGame.currLevel.size ** 2
}

function isGoodCell(cell){
    return cell.isShown || cell.isMarked && cell.isMine
}

function gameOver(isVictory){
    gGame.isOn = false
    if(isVictory){
        console.log('victory!')
    } else {
        showAllCells()
        console.log('game over')
    }
}
