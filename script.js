"use strict";

const Players = (name, mark) => {
    const getName = () => name
    const getMark = () => mark
    let _playerChoices = []

    const _winingChoice = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];

    const _check = (choice) => {
        let _filteredList = _winingChoice.filter(choices => choices.includes(choice))

        for (let i = 0; i < _filteredList.length; i++) {
            const result = _filteredList[i].every(val => _playerChoices.includes(val));

            if (result == true) {
                console.log(getName())
            }
            // console.log(result);
        } 
    }

    const pushChoice = (choice) => {
        _playerChoices.push(parseInt(choice))
        
        // console.log(player1._playerChoices)
        // console.log(player2._playerChoices)

        _check(parseInt(choice))
    }

    return {getName, getMark, pushChoice,_playerChoices}
};

const player1 = Players('him', 'X')
const player2 = Players('them', 'O')

const Gameboard = () => {
    let bord = ['','','','','','', '','','',]

    const _board = document.querySelectorAll('.board')

    _board.forEach(box => {
        box.addEventListener('click', () => {addMark(box)});
    })

    let nowPlay = player1

    const _currentPlayer = () => {
        nowPlay == player2 ? nowPlay = player1 : nowPlay = player2
    }

    const addMark = (target) => {
        let boxID = target.getAttribute('data-index')
        bord[boxID] = nowPlay.getMark()
        target.textContent = nowPlay.getMark()
        nowPlay.pushChoice(boxID)
        _currentPlayer()
    }
    
    return {addMark}
}

Gameboard().addMark
