import React, { memo } from 'react'

export const NewGame = memo((props = {}) => {
    const {setHistory, setCurrentTurn, setCurrentMove, setSelectedCell, setSelected, setEnemySelected, setEnemySelectedRow, setEnemySelectedCell} = props
    
    const handleClick = () => {
        setHistory([[{
            playerOnTurn: 'gold',
            movesLeft: 4,
            winner: null,
            board: [...Array(8).keys()].map(idx => {
                switch (idx) {
                    case 0:
                        return [...Array(8).keys()].map(() => [1]).map(rabbit => rabbit.concat('silver'))
                    case 1:
                        return [[2], [4], [3], [6], [5], [3], [4], [2]].map(animal => animal.concat('silver'))
                    case 2:
                    case 5:
                        return [[null], [null], [0, 'trap'], [null], [null], [0, 'trap'], [null], [null]]
                    case 6:
                        return [[2], [4], [3], [6], [5], [3], [4], [2]].map(animal => animal.concat('gold'))
                    case 7:
                        return [...Array(8).keys()].map(() => [1]).map(rabbit => rabbit.concat('gold'))
                    default:
                        return [...Array(8).keys()].map(() => [null])
                }
            })
        }]])
        setCurrentTurn(0)
        setCurrentMove(0)
        setSelectedCell([])
        setSelected([])
        setEnemySelected([])
        setEnemySelectedRow([])
        setEnemySelectedCell([])        
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