import React, { useState, memo } from 'react'

import { DEFAULT_HISTORY, GOLD, SILVER } from '../constants'
import { Board } from './Board'
import { BoardInfo } from './BoardInfo'
import { MoveHistory } from './MoveHistory'
import { TurnHistory } from './TurnHistory'
import { Options } from './Options'

export const Game = memo(() => {
    
    return (
        <div className="game"> 
            <div className="playfield">
                <BoardInfo
                    // history={history}
                    // currentTurn={currentTurn}
                    // currentMove={currentMove}
                />
                <Board
                    // getNeighbours={getNeighbours}
                    // getIsFrozen={getIsFrozen}
                    // getValidClicks={getValidClicks}
                    // selectedPositions={selectedPositions}
                    // setSelectedPositions={setSelectedPositions}
                    // history={history}
                    // currentTurn={currentTurn}
                    // currentMove={currentMove}
                    // setCurrentMove={setCurrentMove}
                    // setHistory={setHistory}
                />
            </div>
            <div className="game-info">
                <Options
                    // getNeighbours={getNeighbours}
                    // getIsFrozen={getIsFrozen}
                    // getValidClicks={getValidClicks}
                    // setIsHistoryEnabled={setIsHistoryEnabled}
                    // isHistoryEnabled={isHistoryEnabled}
                    // setSelectedPositions={setSelectedPositions}
                    // setCurrentTurn={setCurrentTurn}
                    // setCurrentMove={setCurrentMove}
                    // setHistory={setHistory}
                    // history={history}
                    // currentTurn={currentTurn}
                    // currentMove={currentMove}
                />
                <MoveHistory
                    // setCurrentMove={setCurrentMove}
                    // setSelectedPositions={setSelectedPositions}
                    // currentTurn={currentTurn}
                    // history={history}
                />
                <TurnHistory
                    // setCurrentTurn={setCurrentTurn}
                    // setCurrentMove={setCurrentMove}
                    // setSelectedPositions={setSelectedPositions}
                    // isHistoryEnabled={isHistoryEnabled}
                    // history={history}
                />
            </div>
        </div>
    )
})