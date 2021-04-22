import React, { memo, useState } from 'react'
import {MoveHistory} from './MoveHistory'
import {TurnHistory} from './TurnHistory'
import {EndTurn} from './EndTurn'
import {NewGame} from './NewGame'
import checkTraps from './checkTraps'

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
//TODO: Check if figure is frozen 
//TODO: Push Pull
//TODO: Rearrange figures the first two turns
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
    const { playerOnTurn, movesLeft, winner, board } = history[currentTurn][currentMove]
    const [selectedCell, setSelectedCell] = useState([])
    const [ownSelRow, ownSelCell] = selectedCell
    const [selected, setSelected] = useState([])
    const [enemySelected, setEnemySelected] = useState([])
    const [enemySelectedPosition, setEnemySelectedPosition] = useState([])
    const nextPlayerOnTurn = playerOnTurn === GOLD ? SILVER : GOLD
    
    checkTraps(board)

    // Check if someone has won by eliminating the rabbits of the opponent OR got one of his rabbits to the opposite side of the board
    const silverRabbitsLeft = board.flat().filter(elem => elem[0] === 1 && elem[1] === SILVER)[0]
    const goldRabbitsLeft = board.flat().filter(elem => elem[0] === 1 && elem[1] === GOLD)[0]
    const checkForWinner = ()  => {
        for(let i = 0; i < 8; i++){
            if ( board[0][i][0] === 1 && board[0][i][1] === GOLD || silverRabbitsLeft === undefined ) {
                return GOLD
            }
            if ( board[7][i][0] === 1 && board[7][i][1] === SILVER || goldRabbitsLeft === undefined) {
                return SILVER
            }
        }
    }
    
    //Checks if the selected figure is Frozen
    const checkIfFrozen = () => {
        const neighborsOfSelected = [ 
            ownSelRow > 0 ? board[ownSelRow - 1][ownSelCell] : [],
            ownSelCell > 0 ? board[ownSelRow][ownSelCell - 1] : [],
            ownSelCell < 7 ? board[ownSelRow][ownSelCell + 1] : [],
            ownSelRow < 7 ? board[ownSelRow + 1][ownSelCell] : []
        ]
        const friendlyNeighbor = [
            ...new Set(neighborsOfSelected.map(neighbor => neighbor.filter(figure => figure === playerOnTurn)).flat())
        ].toString()
        // Checks if there is any enemy neighbor with a higher power
        const strongerEnemyNeighbor = neighborsOfSelected.find(
            neighbor => neighbor[1] !== playerOnTurn 
                && typeof(neighbor[1]) === 'string' 
                && neighbor[0] > selected[0]
        ) === undefined ? [] 
            : neighborsOfSelected.filter(
                neighbor => neighbor[1] !== playerOnTurn 
                    && typeof(neighbor[1]) === 'string' 
                    && neighbor[0] > selected[0]
            )
        if (strongerEnemyNeighbor.length > 0 && selected[1] !== friendlyNeighbor) {
            return true
        } else {
            return false
        }
    }
    
    const handleCellClick = (rowIdx, cellIdx) => () => {
        
        const clickedFigurePower = board[rowIdx][cellIdx][0]
        const clickedFigureOwner = board[rowIdx][cellIdx][1]
        const neighborsOfSelCell = [ 
            rowIdx > 0 ? board[rowIdx - 1][cellIdx] : undefined,
            cellIdx > 0 ? board[rowIdx][cellIdx - 1] : undefined,
            cellIdx < 7 ? board[rowIdx][cellIdx + 1] : undefined,
            rowIdx < 7 ? board[rowIdx + 1][cellIdx] : undefined
        ]
        // Set the selected figure 
        if (clickedFigurePower > 0 && clickedFigureOwner === playerOnTurn) {
            setSelected(board[rowIdx][cellIdx])
        }
        
        // Set the enemy figure that the player wants to move
        for (let n = 0; n < 4; n++) {
            if (clickedFigureOwner !== playerOnTurn && selected[0] > clickedFigurePower && neighborsOfSelCell[n] === board[ownSelRow][ownSelCell]) {
                setEnemySelected(board[rowIdx][cellIdx])
                setEnemySelectedPosition([rowIdx, cellIdx])  
            }
        }
        
        // Selecting own figure
        if (clickedFigurePower > 0 && clickedFigureOwner !== null) { 
            setSelectedCell([rowIdx, cellIdx])
            return     
        }     
        
        // Moving figure
        if (selectedCell.length === 2 && board[ownSelRow][ownSelCell][1] === playerOnTurn && currentMove < 4) {
            const nextHistory = history.map(turns => turns.map(move => Object.assign({}, move)))
            const nextBoard = board.map(row => [...row])       
            const clickedFigure = board[ownSelRow][ownSelCell]

            // Silver Rabbits valid moves
            for (let i = 0; i < 3; i++) {
                const validSilverRabbitsMoves = neighborsOfSelCell.filter(neighbor => neighbor = neighborsOfSelCell[i])
                if (checkIfFrozen() === false && clickedFigure[0] === 1 && clickedFigure[1] === 'silver' && board[ownSelRow][ownSelCell] === validSilverRabbitsMoves[i]) {
                    nextBoard[rowIdx][cellIdx] = board[ownSelRow][ownSelCell]
                    nextBoard[ownSelRow][ownSelCell] = [null]
                
                    setSelectedCell([rowIdx, cellIdx])
                    
                    // Save moves to history
                    nextHistory[currentTurn].push({
                        playerOnTurn,
                        movesLeft: movesLeft > 0 ? movesLeft - 1 : 4,
                        winner,
                        board: nextBoard
                    })
                
                    setCurrentMove(currentMove + 1)
                    setHistory(nextHistory)
                }
            }
        
            // Gold Rabbits valid moves
            for (let i = 1; i < 4; i++) {
                const validGoldRabbitsMoves = neighborsOfSelCell.filter(neighbor => neighbor = neighborsOfSelCell[i])
                if (checkIfFrozen() === false && clickedFigure[0] === 1 && clickedFigure[1] === 'gold' && board[ownSelRow][ownSelCell] === validGoldRabbitsMoves[i]) {
                    nextBoard[rowIdx][cellIdx] = board[ownSelRow][ownSelCell]
                    nextBoard[ownSelRow][ownSelCell] = [null]
                
                    setSelectedCell([rowIdx, cellIdx])
                    
                    // Save moves to history
                    nextHistory[currentTurn].push({
                        playerOnTurn,
                        movesLeft: movesLeft > 0 ? movesLeft - 1 : 4,
                        winner,
                        board: nextBoard
                    })
                
                    setCurrentMove(currentMove + 1)
                    setHistory(nextHistory)
                }
            }
        
            // Other figures valid moves
            for (let i = 0; i < 4; i++) {
                if (checkIfFrozen() === false && clickedFigure[0] > 1 && board[ownSelRow][ownSelCell] === neighborsOfSelCell[i]) {
                    nextBoard[rowIdx][cellIdx] = board[ownSelRow][ownSelCell]
                    nextBoard[ownSelRow][ownSelCell] = [null]
                
                    setSelectedCell([rowIdx, cellIdx])
                    
                    // Save moves to history
                    nextHistory[currentTurn].push({
                        playerOnTurn,
                        movesLeft: movesLeft > 0 ? movesLeft - 1 : 4,
                        winner,
                        board: nextBoard
                    })
                    
                    setCurrentMove(currentMove + 1)
                    setHistory(nextHistory)
                    
                }
            }
            console.log(checkIfFrozen())
            //!! Pushing and pulling 

            //!! Pushing and pulling
        } 
    }

    return (
        <div className='game'>
            <div className='play-field'>
                <div className='board-info'>
                    <NewGame
                        defaultHistory={defaultHistory} 
                        setHistory={setHistory} 
                        setCurrentTurn={setCurrentTurn}
                        setCurrentMove={setCurrentMove}
                        setSelectedCell={setSelectedCell}
                    />
                    {
                       typeof(checkForWinner()) === 'string' ? `Winner is ${checkForWinner()}` 
                       : `Moves left: ${history[currentTurn][currentMove].movesLeft}`
                    }
                    <EndTurn
                        history={history}
                        setHistory={setHistory}
                        currentTurn={currentTurn}
                        setCurrentTurn={setCurrentTurn}
                        currentMove={currentMove}
                        setCurrentMove={setCurrentMove}
                        setSelectedCell={setSelectedCell} 
                        board={board}
                        playerOnTurn={playerOnTurn}  
                    />
                </div> 
                <div className='board'>
                    {board.map((row, rowIdx) => (
                        <div className='row' key={rowIdx}>
                            {row.map((cell, cellIdx) => {
                                let classNames = 'cell'                            

                                if (rowIdx === ownSelRow && cellIdx === ownSelCell && playerOnTurn === GOLD) {
                                    classNames = classNames + ' gold-own-selected'                                   
                                }

                                if (playerOnTurn === GOLD && enemySelected.length > 1 && enemySelected[0] > 0 && enemySelectedPosition[0] === rowIdx && enemySelectedPosition[1] === cellIdx) {
                                    classNames = classNames + ' enemy-gold-selected'
                                }

                                if (rowIdx === ownSelRow && cellIdx === ownSelCell && playerOnTurn === SILVER) {
                                    classNames = classNames + ' silver-own-selected'                                 
                                }

                                if (playerOnTurn === SILVER && enemySelected.length > 1 && enemySelected[0] > 0  && enemySelectedPosition[0] === rowIdx && enemySelectedPosition[1] === cellIdx) {
                                    classNames = classNames + ' enemy-silver-selected'
                                }                                    
   
                                return (
                                    <button 
                                        className={classNames} 
                                        key={`${rowIdx}${cellIdx}`}
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
                                )
                            })}
                        </div>
                    ))}
                </div>                
            </div>
            <div className='game-info'>
                <TurnHistory
                    history={history}
                    setHistory={setHistory}
                    setCurrentTurn={setCurrentTurn}
                    setCurrentMove={setCurrentMove}
                    setSelectedCell={setSelectedCell}
                />
                <div className='turn-history'>
                    <MoveHistory
                        history={history}
                        setHistory={setHistory}
                        currentTurn={currentTurn}
                        setCurrentMove={setCurrentMove}
                        setSelectedCell={setSelectedCell}
                        setCurrentTurn={setCurrentTurn}
                    />
                </div>
            </div>
        </div>
    )
})