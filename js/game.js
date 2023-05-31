'use strict'

const LEVELS = [{size: 4, minesCount: 2}, {size: 6, minesCount: 14}, {size: 8, minesCount: 32}]
var gGame

function onInit(){
    gGame = {
        currLevel: LEVELS[0]
    }

    createBoard()
    console.log('gBoard: ', gBoard)
    addMines()
    renderBoard()
}

function onCellClicked(elCell, i, j){

}