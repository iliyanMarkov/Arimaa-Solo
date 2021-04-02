import React, { memo, useState } from 'react'
import Traps from './Traps'

import rabbitG from './img/1_gold.png'
import rabbitS from './img/1_silver.png'
import catG from './img/2_gold.png'
import catS from './img/2_silver.png'
import wolfG from './img/3_gold.png'
import wolfS from './img/3_silver.png'
import horseG from './img/4_gold.png'
import horseS from './img/4_silver.png'
import camelG from './img/5_gold.png'
import camelS from './img/5_silver.png'
import elephantG from './img/6_gold.png'
import elephantS from './img/6_silver.png'
import trap from "./img/trap.png"

    const GOLD = 'gold'
    const SILVER = 'silver'
    const powerToImg = {
        [`1 ${GOLD}`]: rabbitG,
        [`2 ${GOLD}`]: catG,
        [`3 ${GOLD}`]: wolfG,
        [`4 ${GOLD}`]: horseG,
        [`5 ${GOLD}`]: camelG,
        [`6 ${GOLD}`]: elephantG,
        [`1 ${SILVER}`]: rabbitS,
        [`2 ${SILVER}`]: catS,
        [`3 ${SILVER}`]: wolfS,
        [`4 ${SILVER}`]: horseS,
        [`5 ${SILVER}`]: camelS,
        [`6 ${SILVER}`]: elephantS,
        [`0 trap`]: trap
    }
    const rabbitsRow = [...Array(8).keys()].map(() => [1])
    const otherAnimalsRow = [[2], [4], [3], [6], [5], [3], [4], [2]]
    const trapsRow = [[null], [null], [0, 'trap'], [null], [null], [0, 'trap'], [null], [null]]
    const defaultHistory = [
        [
            {
                playerOnTurn: GOLD,
                movesLeft: 4,
                winner: null,
                board: [...Array(8).keys()].map(idx => {
                    switch (idx) {
                        case 0:
                            return rabbitsRow.map(rabbit => rabbit.concat(SILVER))
                        case 1:
                            return otherAnimalsRow.map(animal => animal.concat(SILVER))
                        case 2:
                        case 5:
                            return trapsRow
                        case 6:
                            return otherAnimalsRow.map(animal => animal.concat(GOLD))
                        case 7:
                            return rabbitsRow.map(rabbit => rabbit.concat(GOLD))
                        default:
                            return [...Array(8).keys()].map(() => [null])
                    }
                })
            }
        ]
    ]
    
export const Game = memo(() => {
    const [history, setHistory] = useState(defaultHistory)
    const [currentTurn, setCurrentTurn] = useState(0)
    const [currentMove, setCurrentMove] = useState(0)
    //const [historyTurns, setHistoryTurns] = history[currentTurn]
    //const [historyMoves, setHistoryMoves] = history[currentTurn][currentMove]
    const { playerOnTurn, movesLeft, winner, board } = history[currentTurn][currentMove]
    const [selectedCell, setSelectedCell] = useState([])
    const [ownSelRow, ownSelCell] = selectedCell

    Traps(board)

    const handleCellClick = (rowIdx, cellIdx) => () => {
        const clickedFigurePower = board[rowIdx][cellIdx][0]
        const clickedFigureOwner = board[rowIdx][cellIdx][1]
        // Selecting own figure
        if (clickedFigurePower > 0 && clickedFigureOwner !== null) { 
            setSelectedCell([rowIdx, cellIdx])
            return     
        }
        
        // Moving figure
        if (selectedCell.length === 2) {
            const nextHistory = history.map(turns => turns.map(move => Object.assign({}, move)))
            const nextBoard = board.map(row => [...row])       
            const clickedFigure = board[ownSelRow][ownSelCell]

            // Other figures valid moves
            const neighborsOfSelCell = [ 
                rowIdx > 0 ? nextBoard[rowIdx - 1][cellIdx] : undefined,
                cellIdx > 0 ? nextBoard[rowIdx][cellIdx - 1] : undefined,
                cellIdx < 7 ? nextBoard[rowIdx][cellIdx + 1] : undefined,
                rowIdx < 7 ? nextBoard[rowIdx + 1][cellIdx] : undefined
            ] 
            for (let i = 0; i < 4; i++) {
                if (clickedFigure[0] > 1 && board[ownSelRow][ownSelCell] === neighborsOfSelCell[i]) {
                    nextBoard[rowIdx][cellIdx] = board[ownSelRow][ownSelCell]
                    nextBoard[ownSelRow][ownSelCell] = [null]
                
                    setSelectedCell([rowIdx, cellIdx])
                }
            }

            // Silver Rabbits valid moves
            for (let i = 0; i < 3; i++) {
                const validSilverRabbitsMoves = neighborsOfSelCell.filter(neighbor => neighbor = neighborsOfSelCell[i])
                if (clickedFigure[0] === 1 && clickedFigure[1] === 'silver' && board[ownSelRow][ownSelCell] === validSilverRabbitsMoves[i]) {
                    nextBoard[rowIdx][cellIdx] = board[ownSelRow][ownSelCell]
                    nextBoard[ownSelRow][ownSelCell] = [null]
                
                    setSelectedCell([rowIdx, cellIdx])
                }
            }

            // Gold Rabbits valid moves
            for (let i = 1; i < 4; i++) {
                const validGoldRabbitsMoves = neighborsOfSelCell.filter(neighbor => neighbor = neighborsOfSelCell[i])
                if (clickedFigure[0] === 1 && clickedFigure[1] === 'gold' && board[ownSelRow][ownSelCell] === validGoldRabbitsMoves[i]) {
                    nextBoard[rowIdx][cellIdx] = board[ownSelRow][ownSelCell]
                    nextBoard[ownSelRow][ownSelCell] = [null]
                
                    setSelectedCell([rowIdx, cellIdx])
                }
            }

            // Save moves to history
            nextHistory[currentTurn] = nextHistory[currentTurn]
                .slice(0, currentMove + 1)
                .concat({
                    playerOnTurn,
                    movesLeft,
                    winner,
                    board: nextBoard
                })
                
                setCurrentMove(currentMove + 1)
                setHistory(nextHistory)

                return
        }
    }

    return (
        <div className='game'>
            <div className='play-field'>
                <div className='board-info'>
                    <button type="button" class="new-game-btn">
                        New Game
                    </button>
                    Winner is?
                    <button type="button" class="end-turn-btn">
                        End Turn
                    </button>
                </div> 
                <div className='board'>
                    {board.map((row, rowIdx) => (
                        <div className='row' key={rowIdx}>
                            {row.map((cell, cellIdx) => (
                                <button 
                                    className='cell' 
                                    key={cellIdx}
                                    onClick={handleCellClick( rowIdx, cellIdx )}
                                >
                                    {
                                        cell[0] !== null ?
                                            <img
                                                src={powerToImg[`${cell[0]} ${cell[1]}`]}
                                                alt={cell[0]}
                                            /> :
                                            null                                
                                    }
                                </button>
                            ))}
                        </div>
                    ))}
                </div>                
            </div>
            <div className='game-info'>
                <div className='options'>
                    <button type="button" class="turns-btns">
                        4. Turn: GOLD
                    </button>                     
                </div>
                <div className='turn-history'>
                    <button type="button" class="moves-btns">
                        Move: 1
                    </button>
                    <button type="button" class="moves-btns">
                        Move: 2
                    </button>
                    <button type="button" class="moves-btns">
                        Move: 3
                    </button>
                    <button type="button" class="moves-btns">
                        Move: 4
                    </button>
                </div>
            </div>
        </div>
    )
})