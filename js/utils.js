'use strict'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// it doesn't work, it gives all the time the same array
function createMixedNumsArrRangeOf(range) {
    return Array.from(Array(range).keys()).sort(function () { return Math.random() - 0.5 })
}