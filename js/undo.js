'use strict'

var gSituations

function onUndo() {
    if (!gGame.isOn || !gSituations.length) return

    var situation = gSituations.pop()
    gBoard = situation.board
    gGame = situation.game
    renderBoard()
    renderLives()
    renderScore()
}

function saveSituation() {
    if (!gSituations.length || !compareBoards(gBoard, gSituations[gSituations.length - 1].board)) {
        gSituations.push({ game: copyGame(gGame), board: copyBoard(gBoard) })
    }
    console.log(gSituations)
}

function copyGame(game) {
    return {
        isOn: game.isOn,
        isFirstClick: game.isFirstClick,
        currLevelIdx: game.currLevelIdx,
        currLevel: game.currLevel,
        lives: game.lives,
        emoji: game.emoji,
        isHintOn: game.isHintOn,
        score: game.score
    }
}

function copyBoard(board) {
    var newBoard = []
    for (var i = 0; i < board.length; ++i) {
        newBoard[i] = []
        for (var j = 0; j < board[0].length; ++j) {
            newBoard[i][j] = copyCell(board[i][j])
        }
    }
    return newBoard
}

function copyCell(cell) {
    return {
        minesAroundCount: cell.minesAroundCount,
        isShown: cell.isShown,
        isMine: cell.isMine,
        isMarked: cell.isMarked
    }
}

function compareBoards(board1, board2) {
    for (var i = 0; i < board1.length; ++i) {
        for (var j = 0; j < board1[0].length; ++j) {
            if (!compareCells(board1[i][j], board2[i][j])) {
                return false
            }
        }
    }
    return true
}

function compareCells(cell1, cell2) {
    return cell1.minesAroundCount === cell2.minesAroundCount &&
        cell1.isShown === cell2.isShown &&
        cell1.isMine === cell2.isMine &&
        cell1.isMarked === cell2.isMarked
}
