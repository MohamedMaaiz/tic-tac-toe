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
        winner.classList.add('win')
        setTimeout(function(){
            winner.style.transition = '1s'
            winner.style.opacity = '0%'
        },1500)

        setTimeout(function(){
            winner.classList.remove('win')
            winner.textContent = ''
        },2500)
        //do the wining animation for second win too

        name === p1.value ? playerWin1.textContent = Number(playerWin1.textContent) + 1 : playerWin2.textContent = Number(playerWin2.textContent) + 1
    }

    const _winLine = (winArray) => {
        winArray.forEach(e => {
            document.querySelector(`[data-index="${e}"]`).classList.add('win-line')
        });
        setTimeout(function(){
            document.querySelectorAll('.win-line').forEach(e => {e.classList.remove('win-line')})
        }, 1000);
    }

    const check = (choice, playerChoices, name) => {

        let _filteredList = _winingChoice.filter(choices => choices.includes(choice))

        for (let i = 0; i < _filteredList.length; i++) {
            const result = _filteredList[i].every(val => playerChoices.includes(val));
            
            //display the last mark before removing??
            if (result == true) {
                _winLine(_filteredList[i])
                //display winners name above table??
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
    
    const p1display = document.getElementById('firstP')
    const p2display = document.getElementById('secondP')
    p1display.textContent = p1
    p2display.textContent = p2

    return{p1, p2}
}


const Gameboard = (() => {
    let player1 = Players(playerAssign().p1, 'X')
    let player2 = Players(playerAssign().p2, 'O')

    // let bord = ['','','','','','', '','','',]

    const _board = document.querySelectorAll('.board')

    _board.forEach(box => {
        box.addEventListener('click', () => {addMark(box)});
    })

    let nowPlay = player1
    const pDiv = document.querySelectorAll('.player')

    //change display to see the current player??
    const _currentPlayer = () => {
        // nowPlay == player2 ? nowPlay = player1 : nowPlay = player2
        if (nowPlay == player2) {
            nowPlay = player1
            pDiv[0].classList.add('current')
            pDiv[1].classList.remove('current')
        } else {
            nowPlay = player2
            pDiv[1].classList.add('current')
            pDiv[0].classList.remove('current')
        }
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

    const _blur = document.getElementById('blur')
    _blur.onclick = () => blurMode.off()

    const blurMode = {
        off: function(){
            _blur.style.display = 'none'
            pInfo.style.display = 'none'
        },
        on: function(){
            pInfo.style.display = 'flex'
            _blur.style.display = 'block'
        }
    }

    const editBTN = document.getElementById('edit-name')
    const pInfo = document.getElementById('player-info')
    editBTN.onclick = () => blurMode.on()

    const submitBTN = document.getElementById('submit')
    submitBTN.onclick = () => {
        player1 = Players(playerAssign().p1, 'X')
        player2 = Players(playerAssign().p2, 'O')
        blurMode.off()
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

