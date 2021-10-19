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
        setTimeout(function(){
            winner.style.transition = '1s'
            winner.style.opacity = '0%'
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

    const _checkBox = (target) => {
        if(target.textContent !== ''){
            return false
        }
    }

    // let aiMode = false
    let aiMode = true
    const vs = document.getElementById('vs')
    vs.onclick = () => {
        aiMode = true
        clearAll()
        if (nowPlay == player2) {
            compPlay().logic()
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
        drawCount = 0
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

    let drawCount = 0
    let _draw = () => {
        winner.textContent = `It's a Draw`
        winner.classList.add('win')
        setTimeout(function(){
            winner.style.transition = '1s'
            winner.style.opacity = '0%'
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
    editBTN.onclick = () => blurMode.on()

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
    
    return {addMark, clearAll}
})()





const compPlay = () => {
    // const _board = document.querySelectorAll('.board')
    // const _boardArr = Array.from(_board)
    // let _filteredboard = _boardArr.filter(box => box.textContent == '')
    
    // const logic = () => {
    //     // const random = _filteredboard[Math.floor(Math.random() * _filteredboard.length)]
    //     // Gameboard.addMark(random)
    // }
    const bestMove = () => {
        const _board = document.querySelectorAll('.board')
        const _boardArr = Array.from(_board)
        let _filteredboard = _boardArr.filter(box => box.textContent == '')

        let bestScroe = -Infinity
        let move;
        for (let i = 0; i < _filteredboard.length; i++) {
            let score = miniMax(_boardArr, 0, false)
            console.log(score)
            if (score > bestScroe) {
                bestScroe = score
                move = _filteredboard[i]
                console.log('in for')
            }
        }
        console.log('move= ' + move)
        // Gameboard.addMark(move)
    }
    

    const logic = () => {
        // let move = bestMove()
        // console.log(move)
        // Gameboard.addMark(move)
        bestMove()
    }

    let scores = {
        X: 1,
        O: -1,
        tie: 0
    }

    function miniMax(board, depth, isMaxing) {
        // console.log(board)
        let result
        isMaxing ? result = checkMiniMaxWin('O') : result = checkMiniMaxWin('X')
        if (result == true) {
            console.log(result)
            console.log('end this')
            return scores[result]
        }

        if (isMaxing) {
            let _filteredboard = Array.from(board).filter(box => box.textContent == '')
            let bestScroe = -Infinity
            for (let i = 0; i< _filteredboard.length;i++) {
                let score = miniMax(_filteredboard[i], 0, false)
                bestScroe = max(score, bestScroe)
            }
            return bestScroe
        } else {
            let _filteredboard = board.filter(box => box.textContent == '')
            let bestScroe = Infinity
            for (let i = 0; i< _filteredboard.length;i++) {
                let score = miniMax(_filteredboard[i], +1, true)
                
                if (score < bestScroe) {
                    bestScroe = score
                }
            }
            console.log(bestScroe)
            return bestScroe
        }
    }


    function checkMiniMaxWin(xo) {
        const _winingChoice = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
        ];

        //collecting all from board 
        const _board = document.querySelectorAll('.board')
        let _boardArr = []
        _board.forEach(e => {
            _boardArr.push(e.textContent)
        });

        //collecting all the same marks to check win
        let indexList = []; 
        pushToCheck(xo)
        function pushToCheck(mark) {
            for (let i=0; i < _boardArr.length; i++ ){
                if (_boardArr[i] == mark){
                    indexList.push( i );
                }
            }
        }

        console.log(xo,indexList)
    
        for (let i = 0; i < _winingChoice.length; i++) {
            const result = _winingChoice[i].every(val => indexList.includes(val));
            
            if (result == true) {
                console.log(result)
                return result
            }
            return result
        } 
    }


    return {logic}
}