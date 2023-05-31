'use strict'

var gBoard

function createBoard() {
    gBoard = []
    for (var i = 0; i < gGame.currLevel.size; ++i) {
        gBoard[i] = []
        for (var j = 0; j < gGame.currLevel.size; ++j) {
            gBoard[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
}

function addMines() {
    // var size = gGame.currLevel.size
    // var randomCell = createMixedNumsArrRangeOf(size ** 2)
    // for (var i = 0; i < gGame.currLevel.minesCount; ++i) {
    //     var num = randomCell.pop()
    //     gBoard[Math.floor(num / size)][num % size].isMine = true
    // }
    gBoard[1][1].isMine = true
    gBoard[3][3].isMine = true
    setMinesNegsCount()
}

function renderBoard() {

    var strHTML = ''
    for (var i = 0; i < gBoard.length; ++i) {
        strHTML += '<tr>'
        for (var j = 0; j < gBoard[0].length; ++j) {
            var cell = gBoard[i][j]
            var minesAroundCount = cell.minesAroundCount

            var className = cell.isShown ? 'uncover' : 'cover'
            var displayMode = gGame.isShown ? 'none' : 'block'
            var text = getTextFromCell(cell)

            strHTML += `<td class="cell ${className}"
                        data-i=${i}  data-j=${j}
                        onclick="onCellClicked(this,${i},${j})" 
                        oncontextmenu="onCellMarked(this,${i},${j},event)">`
            strHTML += `<p style="display: ${displayMode};">${text}</p>`
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    document.querySelector('.board').innerHTML = strHTML
}

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; ++i) {
        for (var j = 0; j < gBoard[0].length; ++j) {
            var cell = gBoard[i][j]
            if (!cell.isMine) {
                cell.minesAroundCount += countMinesAround(i, j)
            }
        }
    }
}

function countMinesAround(rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (currCell.isMine) count++
        }
    }
    return count
}

function showAllCells() {
    for (var i = 0; i < gBoard.length; ++i) {
        for (var j = 0; j < gBoard[0].length; ++j) {
            gBoard[i][j].isShown = true
        }
    }
}

function getTextFromCell(cell) {
    var text = ''
    if (cell.isShown || cell.isMarked) {
        if (cell.isMine && !cell.isMarked) {
            text = MINE
        } else {
            if (cell.minesAroundCount) {
                text = cell.minesAroundCount
            } else {
                if (cell.isMarked) {
                    text = FLAG
                }
            }
        }
    }
    return text
}
