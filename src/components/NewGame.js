import React, { memo } from 'react'

export const NewGame = memo((props = {}) => {
    const {defaultHistory, setHistory, setCurrentTurn, setCurrentMove, setSelectedCell} = props

    const handleClick = () => {
        setHistory(defaultHistory)
        setCurrentTurn(0)
        setCurrentMove(0)
        setSelectedCell([])
        return 
    }
    
    return (
        <>
            {
                <button onClick={handleClick} type="button" class="new-game-btn">
                    New Game
                </button>
            }
        </> 
    )
})