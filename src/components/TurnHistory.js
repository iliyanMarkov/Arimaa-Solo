import React, { memo } from 'react'

export const TurnHistory = memo((props = {}) => {
    const {history, setHistory, setCurrentTurn, setCurrentMove, setSelectedCell, setSelected, setEnemySelected, setEnemySelectedRow, setEnemySelectedCell} = props
    const nextHistory = history.map(turns => turns.map(move => Object.assign({}, move)))

    const changeToTurn = wantedTurn => () => {
        setCurrentTurn(wantedTurn)
        setCurrentMove(history[wantedTurn].length - 1)
        setSelectedCell([])
        setSelected([])
        setEnemySelected([])
        setEnemySelectedRow([])
        setEnemySelectedCell([])
        setHistory(nextHistory.slice(0, wantedTurn + 1))
    }    
    
    return (
        <>
            {
                <div>
                    {history.map((turn, wantedTurn) => {
                        const nameOfPlayer = turn[0]['playerOnTurn'].replace(/^./, m => m.toUpperCase())

                        return (
                            nameOfPlayer === 'Gold' ?
                            <button onClick={changeToTurn(wantedTurn)} type="button" className="turns-btns-gold">
                                {`${wantedTurn + 1}. Turn: ${nameOfPlayer}`}
                            </button> 
                            : <button onClick={changeToTurn(wantedTurn)} type="button" className="turns-btns-silver">
                                {`${wantedTurn + 1}. Turn: ${nameOfPlayer}`}
                            </button>

                        )
                    })}
                </div>
            }
        </>
    )
})
