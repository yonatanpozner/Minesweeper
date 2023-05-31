'use strict'

var gBoard

function createBoard(){
    for(var i = 0; i < gGame.boardSize; ++i){
        for(var j = 0; j < gGame.boardSize; ++j){
            gBoard[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
}

function renderBoard(){
    
}
