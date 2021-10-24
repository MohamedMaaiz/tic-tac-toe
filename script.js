"use strict";

const Players = (name, mark) => {
    const getName = () => name
    const getMark = () => mark
    let _playerChoices = []   

    const pushChoice = (choice) => {
        _playerChoices.push(parseInt(choice))
        let check = checkWin().check(parseInt(choice), _playerChoices, name)
        return check ? true : false
    }

    const clear = () => {
        _playerChoices.length = 0
    }

    return {getName, getMark, pushChoice, clear,_playerChoices}
};

const checkWin = () => {
    const winner = document.getElementById('winner')
    
    const _winingChoice = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];

    const _winner = (name) => {
        const playerWin1 = document.querySelector('[data-win-p1]')
        const playerWin2 = document.querySelector('[data-win-p2]')
        winner.textContent = `Winner: ${name}`
        winner.classList.add('win')
        Gameboard.blurMode.on()
        setTimeout(function(){
            winner.style.transition = '1s'
            winner.style.opacity = '0%'
            Gameboard.blurMode.off()
        },1500)
        
        setTimeout(function(){
            winner.classList.remove('win')
            winner.textContent = ''
            winner.style.opacity = '100%'
        },2500)
        name === p1.value ? playerWin1.textContent = Number(playerWin1.textContent) + 1 : playerWin2.textContent = Number(playerWin2.textContent) + 1
    }

    const _winLine = (winArray) => {
        setTimeout(function(){
            winArray.forEach(e => {
                document.querySelector(`[data-index="${e}"]`).classList.add('win-line')
            });
        }, 5);
        setTimeout(function(){
            document.querySelectorAll('.win-line').forEach(e => {e.classList.remove('win-line')})
        }, 1500);
    }

    const check = (choice, playerChoices, name) => {

        let _filteredList = _winingChoice.filter(choices => choices.includes(choice))
        
        for (let i = 0; i < _filteredList.length; i++) {
            const result = _filteredList[i].every(val => playerChoices.includes(val));
            
            if (result == true) {
                _winLine(_filteredList[i])
                _winner(name)
                setTimeout(function(){
                    Gameboard.clearAll()
                }, 1500) 
                return true
            }
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

    return{p1, p2, p1display, p2display}
}



const Gameboard = (() => {
    let player1 = Players(playerAssign().p1, 'X')
    let player2 = Players(playerAssign().p2, 'O')

    const _board = document.querySelectorAll('.board')

    _board.forEach(box => {
        box.addEventListener('click', () => {addMark(box)});
    })

    const _checkBox = (target) => {
        if(target.textContent !== ''){
            return false
        }
    }

    const second = document.querySelector('.second')

    let aiMode = false
    const vs = document.getElementById('vs')
    vs.onclick = () => {
        if (aiMode) {
            aiMode = false
            vs.textContent = 'Vs Human'
        } else {
            aiMode = true
            vs.textContent = 'Vs Comp'
            _clearScore()
        }
        clearAll()
        if (nowPlay == player2) {
            compPlay().logic()
        }
    }

    const Nstart = document.getElementById('new-start')
    Nstart.onclick = () => _clearScore()

    const _clearScore = () => {
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
        drawCount = 0
    }

    const theme = document.getElementById("theme");
    let storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme)
    theme.onclick = function() {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let targetTheme = "light";
    
        if (currentTheme === "light") {
            targetTheme = "dark";
        }
        document.documentElement.setAttribute('data-theme', targetTheme)
        localStorage.setItem('theme', targetTheme);
    };

    const setting = document.getElementById('setting')
    const menu = document.querySelector('.first')
    menu.onclick = () => menuView()

    const menuView = () => {
        setting.style.display = 'flex'
        blurMode.on()
    }

    

    const blur = document.getElementById('blur')
    blur.onclick = () => blurMode.off()

    const blurMode = {
        off: function(){
            blur.style.display = 'none'
            pInfo.style.display = 'none'
            if (screen.width < 600) setting.style.display = 'none'
        },
        on: function(){
            blur.style.display = 'block'
        }
    }

    let drawCount = 0
    let _draw = () => {
        winner.textContent = `Draw`
        winner.classList.add('win')
        blurMode.on()
        setTimeout(function(){
            winner.style.transition = '1s'
            winner.style.opacity = '0%'
            blurMode.off()
        },1500)
        
        setTimeout(function(){
            winner.classList.remove('win')
            winner.textContent = ''
            winner.style.opacity = '100%'
        },2500)
        return Gameboard.clearAll()
    }

    const editBTN = document.getElementById('edit-name')
    const pInfo = document.getElementById('player-info')
    editBTN.onclick = () => {
        blurMode.on()
        pInfo.style.display = 'flex'
        if(screen.width < 600) {
            setting.style.display = 'none'
        }
    }

    const submitBTN = document.getElementById('submit')
    submitBTN.onclick = () => {
        player1 = Players(playerAssign().p1, 'X')
        player2 = Players(playerAssign().p2, 'O')
        blurMode.off()
        _currentPlayer()
        clearAll()
    }

    const pDiv = document.querySelectorAll('.player')
    let nowPlay = player1

    const _currentPlayer = () => {
        if (nowPlay == player2) {
            nowPlay = player1
            pDiv[0].classList.add('current')
            pDiv[1].classList.remove('current')
        } else {
            nowPlay = player2
            pDiv[1].classList.add('current')
            pDiv[0].classList.remove('current')
            if (aiMode === true){
                compPlay().logic()
            }
        }
    }

    const addMark = (target) => {
        drawCount++
        let boxID = target.getAttribute('data-index')
        if (_checkBox(target) == false) return 
        // bord[boxID] = nowPlay.getMark()
        target.textContent = nowPlay.getMark()
        target.classList.add('fill')
        const check = nowPlay.pushChoice(boxID)
        if (nowPlay == player2 && aiMode && check) {
            setTimeout(function(){
                compPlay().logic()
            },2000)
        }
        if(check) return false //stop ai when win
        if (drawCount == 9 && check == false) return _draw()
        _currentPlayer()

        // console.log(player1._playerChoices)
        // console.log(player2._playerChoices)
    }

    if(screen.width < 600) menuView()
    
    return {addMark, clearAll, blurMode}
})()

const compPlay = () => {
    const gameboard = document.getElementById('gameboard')
    const _board = document.querySelectorAll('.board')
    const _boardArr = Array.from(_board)
    let _filteredboard = _boardArr.filter(box => box.textContent == '')
    
    const logic = () => {
        gameboard.style.pointerEvents = 'none'
        const random = _filteredboard[Math.floor(Math.random() * _filteredboard.length)]
        setTimeout(function(){
            Gameboard.addMark(random)
            gameboard.style.pointerEvents = 'auto'
        },500)
    }

    return {logic}
}