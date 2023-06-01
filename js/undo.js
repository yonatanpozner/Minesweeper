'use strict'

var gSituations

function ondo(){
    if(gSituations.length){
        gBoard = gSituations.pop()
        renderBoard()
    }
}

function saveSituation(){
    if(!gSituations.length){
        gSituations.push(copyOfBoard(gBoard))
    }
    if(!compareBoards(gBoard, gSituations[gSituations.length - 1])){
        gSituations.push(copyOfBoard(gBoard))
    }
    console.log(gSituations)
}

function copyOfBoard(board){
    var newBoard = []
    for(var i = 0; i < board.length; ++i){
        newBoard[i] = []
        for(var j = 0; j < board[0].length; ++j){
            newBoard[i][j] = copyOfCell(board[i][j])
        }
    }
    return newBoard
}

function copyOfCell(cell){
    var newCell = {}
    newCell.minesAroundCount = cell.minesAroundCount
    newCell.isShown = cell.isShown
    newCell.isMine = cell.isMine
    newCell.isMarked = cell.isMarked
    return newCell
}

function compareBoards(board1,board2){
    for(var i = 0; i < board1.length; ++i){
        for(var j = 0; j < board1[0].length; ++j){
            if(!compareCells(board1[i][j], board2[i][j])){
                return false
            }
        }
    }
    return true
}

function compareCells(cell1,cell2){
    return cell1.minesAroundCount === cell2.minesAroundCount &&
            cell1.isShown === cell2.isShown &&
            cell1.isMine === cell2.isMine &&
            cell1.isMarked === cell2.isMarked
}
