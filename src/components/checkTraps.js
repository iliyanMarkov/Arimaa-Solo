export const checkTraps = (board) => {
    const friendlyNeighborsOfTraps = []
    const traps = [[2, 2],[2, 5], [5, 2], [5, 5]]
    const trapsOwners = [
        board[2][2][1],
        board[2][5][1], 
        board[5][2][1], 
        board[5][5][1]
    ]
    
    for (let i = 0; i < 4; i++) {
        friendlyNeighborsOfTraps.push([ 
            board[traps[i][0] - 1][traps[i][1]]/*top*/,
            board[traps[i][0] + 1][traps[i][1]]/*bot*/,
            board[traps[i][0]][traps[i][1] - 1]/*left*/,
            board[traps[i][0]][traps[i][1] + 1]/*right*/
        ].flat().filter(elem => elem === trapsOwners[i]))

        if (friendlyNeighborsOfTraps[i].includes(trapsOwners[i]) === false) {
            board[traps[i][0]][traps[i][1]] = [null]
        }
    }
}