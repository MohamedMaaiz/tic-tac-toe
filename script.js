"use strict";

const Players = (name, mark) => {
    const getName = () => name
    const getMark = () => mark
    let _playerChoices = []    

    const pushChoice = (choice) => {
        _playerChoices.push(parseInt(choice))
        checkWin(parseInt(choice), _playerChoices, name)
    }

    const clear = () => {
        _playerChoices.length = 0
    }

    return {getName, getMark, pushChoice, clear,_playerChoices}
};

const checkWin = (choice, playerChoices, name) => {
    
    const _winingChoice = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];
    
    let _filteredList = _winingChoice.filter(choices => choices.includes(choice))

    const _winner = (name) => {
        const winner = document.getElementById('winner')
        winner.textContent = name
    }

    for (let i = 0; i < _filteredList.length; i++) {
        const result = _filteredList[i].every(val => playerChoices.includes(val));

        if (result == true) {
            return _winner(name)
        }
        // console.log(result);
    } 
}


const playerAssign = () =>{
    const p1 = document.getElementById('p1').value
    const p2 = document.getElementById('p2').value
    const start = document.getElementById('start')
    
    const p1display = document.getElementById('firstP')
    const p2display = document.getElementById('secondP')
    p1display.textContent = p1
    p2display.textContent = p2
    
    // start.onclick = () => Gameboard(player1,player2)
    return{p1, p2}
}


const Gameboard = (() => {
    const player1 = Players(playerAssign().p1, 'X')
    const player2 = Players(playerAssign().p2, 'O')

    // let bord = ['','','','','','', '','','',]

    const _board = document.querySelectorAll('.board')

    _board.forEach(box => {
        box.addEventListener('click', () => {addMark(box)});
    })

    let nowPlay = player1

    const _currentPlayer = () => {
        nowPlay == player2 ? nowPlay = player1 : nowPlay = player2
    }

    const Rstart = document.getElementById('re-start')
    Rstart.onclick = () => clearAll()
    
    const clearAll = () => {
        player1.clear()
        player2.clear()
        _board.forEach(box => box.textContent = '')
    }

    const addMark = (target) => {
        let boxID = target.getAttribute('data-index')
        // bord[boxID] = nowPlay.getMark()
        target.textContent = nowPlay.getMark()
        nowPlay.pushChoice(boxID)
        _currentPlayer()

        // console.log(player1._playerChoices)
        // console.log(player2._playerChoices)
    }
    
    return {addMark}
})()

