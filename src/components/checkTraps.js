export default function checkTraps(board) {
    // Traps Neighbors
    const trapOneNeighbors = [board[1][2][1]/*top*/, board[3][2][1]/*bot*/, board[2][1][1]/*left*/, board[2][3][1]/*right*/]
    const trapTwoNeighbors = [board[1][5][1]/*top*/, board[3][5][1]/*bot*/, board[2][4][1]/*left*/, board[2][6][1]/*right*/]
    const trapThreeNeighbors = [board[4][2][1]/*top*/, board[6][2][1]/*bot*/, board[5][1][1]/*left*/, board[5][3][1]/*right*/]
    const trapFourNeighbors = [board[4][5][1]/*top*/, board[6][5][1]/*bot*/, board[5][4][1]/*left*/, board[5][6][1]/*right*/]
    // Check if traps are protected
    board[2][2][0] === null ? board[2][2] = [0, 'trap'] 
    : trapOneNeighbors.includes(board[2][2][1]) === true ?  board[2][2] = board[2][2] 
    : board[2][2] = [0, 'trap']

    board[2][5][0] === null ? board[2][5] = [0, 'trap'] 
    : trapTwoNeighbors.includes(board[2][5][1]) === true ?  board[2][5] = board[2][5] 
    : board[2][5] = [0, 'trap']

    board[5][2][0] === null ? board[5][2] = [0, 'trap'] 
    : trapThreeNeighbors.includes(board[5][2][1]) === true ?  board[5][2] = board[5][2] 
    : board[5][2] = [0, 'trap']

    board[5][5][0] === null ? board[5][5] = [0, 'trap'] 
    : trapFourNeighbors.includes(board[5][5][1]) === true ? board[5][5] = board[5][5] 
    : board[5][5] = [0, 'trap']
}