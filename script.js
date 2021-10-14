"use strict";

const Players = (name, mark) => {
    const getName = () => name
    const getMark = () => mark
    let _playerChoices = []   

    const pushChoice = (choice) => {
        _playerChoices.push(parseInt(choice))
        checkWin().check(parseInt(choice), _playerChoices, name)
    }

    const clear = () => {
        _playerChoices.length = 0
    }

    return {getName, getMark, pushChoice, clear,_playerChoices}
};

const checkWin = () => {
    
    const _winingChoice = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];

    const _winner = (name) => {
        const winner = document.getElementById('winner')
        const playerWin1 = document.querySelector('[data-win-p1]')
        const playerWin2 = document.querySelector('[data-win-p2]')
        winner.textContent = `Winner: ${name}`

        name === p1.value ? playerWin1.textContent = Number(playerWin1.textContent) + 1 : playerWin2.textContent = Number(playerWin2.textContent) + 1
    }

    const check = (choice, playerChoices, name) => {

        let _filteredList = _winingChoice.filter(choices => choices.includes(choice))

        for (let i = 0; i < _filteredList.length; i++) {
            const result = _filteredList[i].every(val => playerChoices.includes(val));
    
            if (result == true) {
                 _winner(name)
                return Gameboard.clearAll()
            }
            // console.log(result);
        } 
    }

    return {check}
}


const playerAssign = () =>{
    let p1 = document.getElementById('p1').value
    let p2 = document.getElementById('p2').value
    let p1Mark = document.getElementById('p1Mark').value
    let p2Mark = document.getElementById('p2Mark').value
    
    const p1display = document.getElementById('firstP')
    const p2display = document.getElementById('secondP')
    p1display.textContent = p1
    p2display.textContent = p2

    //add player mark to display if player name hase changed

    return{p1, p2, p1Mark, p2Mark}
}


const Gameboard = (() => {
    let player1 = Players(playerAssign().p1, playerAssign().p1Mark)
    let player2 = Players(playerAssign().p2, playerAssign().p2Mark)

    // let bord = ['','','','','','', '','','',]

    const _board = document.querySelectorAll('.board')

    _board.forEach(box => {
        box.addEventListener('click', () => {addMark(box)});
    })

    let nowPlay = player1

    const _currentPlayer = () => {
        nowPlay == player2 ? nowPlay = player1 : nowPlay = player2
    }

    const _checkBox = (target) => {
        if(target.textContent !== ''){
            return false
        }
    }

    const _Nstart = document.getElementById('new-start')
    _Nstart.onclick = () => {
        clearAll()
        document.querySelector('[data-win-p1]').textContent = 0
        document.querySelector('[data-win-p2]').textContent = 0
    }
    
    const _Rstart = document.getElementById('re-start')
    _Rstart.onclick = () => clearAll()
    
    const clearAll = () => {
        player1.clear()
        player2.clear()
        _board.forEach(box => {
            box.textContent = ''
            box.classList.remove('fill')
        })
    }

    const editBTN = document.getElementById('edit-name')
    const pInfo = document.getElementById('player-info')
    editBTN.onclick = () => {
        pInfo.style.display = 'flex'
    }

    const submitBTN = document.getElementById('submit')
    submitBTN.onclick = () => {
        player1 = Players(playerAssign().p1, playerAssign().p1Mark)
        player2 = Players(playerAssign().p2, playerAssign().p2Mark)
        pInfo.style.display = 'none'
        _currentPlayer()
        clearAll()
    }

    const addMark = (target) => {
        let boxID = target.getAttribute('data-index')
        if (_checkBox(target) == false) return 
        // bord[boxID] = nowPlay.getMark()
        target.textContent = nowPlay.getMark()
        target.classList.add('fill')
        nowPlay.pushChoice(boxID)
        _currentPlayer()

        // console.log(player1._playerChoices)
        // console.log(player2._playerChoices)
    }
    
    return {addMark, clearAll}
})()

