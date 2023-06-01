'use strict'

function onHintClicked(el) {
    gGame.isHintOn = true
    el.innerHTML = LIGHT
    el.classList.add('light')
}

function handleClickOnHintMode(i,j){
    uncoverCellsAround({i,j})
    gGame.isHintOn = false
    document.querySelector('.light').innerHTML = ''
    setTimeout(coverCellsAround, 1000, {i,j}, 0)
}

function uncoverCellsAround(cell){
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if(!gBoard[i][j].isShown){
                gBoard[i][j].isHintShown = true
                gBoard[i][j].isShown = true
            }
        }
    }
    renderBoard()
}

function coverCellsAround(cell){
    for (var i = cell.i - 1; i <= cell.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cell.j - 1; j <= cell.j + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if(gBoard[i][j].isHintShown){
                gBoard[i][j].isHintShown = false
                gBoard[i][j].isShown = false
            }
        }
    }
    renderBoard()
}

function renderHints(){
    var hints = document.querySelectorAll('.hint-btn')
    for(var i = 0; i < hints.length; ++i){
        hints[i].innerHTML = OFF
    }
}
