import React, { memo } from 'react'

export const MoveHistory = memo((props = {}) => {
    const {history, setHistory, currentTurn, setCurrentMove, setSelectedCell, setSelected, setEnemySelected, setEnemySelectedRow, setEnemySelectedCell} = props
    const nextHistory = history.map(turns => turns.map(move => Object.assign({}, move)))
    
    const changeToMove = wantedMove => () => {
        setCurrentMove(wantedMove)
        nextHistory.splice(currentTurn, 1, nextHistory[currentTurn].slice(0, wantedMove + 1))
        setHistory(nextHistory)
        setSelectedCell([])
        setSelected([])
        setEnemySelected([])
        setEnemySelectedRow([])
        setEnemySelectedCell([])
    }    
    
    return (
        <>
            {
                <div>
                    {history[currentTurn].map((_, wantedMove) => {

                        return (
                            <button key={wantedMove} onClick={changeToMove(wantedMove)} type="button" class="moves-btns">
                                {`${wantedMove}`}
                            </button>
                        )
                    })}
                </div>
            }
        </>
    )
})