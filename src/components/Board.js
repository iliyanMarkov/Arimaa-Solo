import React, { memo } from 'react'
import { GOLD, POWER_TO_IMG, SILVER } from '../constants'

export const Board = memo((props = {}) => {
    
    return (
        <div className='board'>
            {board.map((row, rowIdx)=> (
                <div className='row' key={rowIdx}>
                    {row.map((cell, colIdx) => {
                        let classes = 'cell'

                        if (typeof cell[1] === 'string') {
                            classes = classes + ` ${cell[1]}`
                        }

                        if ([2, 5].includes(rowIdx) && [2, 5].includes(colIdx)) {
                            classes = classes + ' trap'
                        }

                        if (rowIdx === ownSelRow && colIdx === ownSelCol) {
                            classes = classes + ' own-selected'
                        }

                        if (rowIdx === enemySelRow && colIdx === enemySelCol) {
                            classes = classes + ' enemy-selected'
                        }

                        return (
                            <button
                                className={classes}
                                key={`${rowIdx}${colIdx}`}
                                onClick={handleCellClick({ rowIdx, colIdx })}
                                disabled={typeof winner === 'string'}
                            >
                                {
                                    cell[0] !== null ?
                                        <img
                                            src={POWER_TO_IMG[`${cell[0]} ${cell[1]}`]}
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
    )
})