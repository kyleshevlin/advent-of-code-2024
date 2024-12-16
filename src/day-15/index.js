import { getInput, safeGridGet, sum } from '../utils'

const data = getInput(__dirname)

const EMPTY = '.'
const WALL = '#'
const BOX = 'O'
const BOT = '@'

const MOVE_TO_COORDS = {
  '<': [0, -1],
  '>': [0, 1],
  '^': [-1, 0],
  v: [1, 0],
}

const formatInput = input => {
  const [gridLines, moveLines] = input.trim().split('\n\n')

  const grid = gridLines.split('\n').map(line => line.split(''))
  const moves = moveLines.split('\n').join('')

  return { grid, moves }
}

function canBoxMove(grid, row, col, dRow, dCol, depth = 1) {
  const nextRow = row + dRow
  const nextCol = col + dCol
  const nextChar = safeGridGet(grid, nextRow, nextCol)

  switch (nextChar) {
    case EMPTY:
      return depth
    case WALL:
      return 0
    case BOX:
      return canBoxMove(grid, nextRow, nextCol, dRow, dCol, depth + 1)
  }
}

export function solution1(input) {
  const { grid, moves } = formatInput(input)

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    const [dRow, dCol] = MOVE_TO_COORDS[move]

    const botRow = grid.findIndex(row => row.includes(BOT))
    const botCol = grid[botRow].indexOf(BOT)

    const nextRow = botRow + dRow
    const nextCol = botCol + dCol

    const nextChar = safeGridGet(grid, nextRow, nextCol)

    if (nextChar === WALL) {
      continue
    }

    if (nextChar === EMPTY) {
      grid[botRow][botCol] = EMPTY
      grid[nextRow][nextCol] = BOT
      continue
    }

    if (nextChar === BOX) {
      const canMoveInXSpaces = canBoxMove(grid, nextRow, nextCol, dRow, dCol)

      if (!canMoveInXSpaces) continue

      const swapRow = dRow * canMoveInXSpaces
      const swapCol = dCol * canMoveInXSpaces

      grid[nextRow + swapRow][nextCol + swapCol] = BOX
      grid[nextRow][nextCol] = BOT
      grid[botRow][botCol] = EMPTY
    }
  }

  const scores = []
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === BOX) {
        scores.push(r * 100 + c)
      }
    }
  }

  return sum(scores)
}

// console.log(solution1(data)) // 1511865

const LEFT_BOX = '['
const RIGHT_BOX = ']'

export function solution2(input) {
  const { grid, moves } = formatInput(input)
  const modGrid = grid.map(row =>
    row.flatMap(char => {
      switch (char) {
        case EMPTY:
          return [EMPTY, EMPTY]
        case WALL:
          return [WALL, WALL]
        case BOX:
          return [LEFT_BOX, RIGHT_BOX]
        case BOT:
          return [BOT, EMPTY]
      }
    })
  )

  for (let i = 0; i < 1; i++) {
    const move = moves[i]
    console.log(move)
    const [dRow, dCol] = MOVE_TO_COORDS[move]

    const botRow = grid.findIndex(row => row.includes(BOT))
    const botCol = grid[botRow].indexOf(BOT)

    const nextRow = botRow + dRow
    const nextCol = botCol + dCol

    const nextChar = safeGridGet(grid, nextRow, nextCol)

    if (nextChar === WALL) {
      continue
    }

    if (nextChar === EMPTY) {
      grid[botRow][botCol] = EMPTY
      grid[nextRow][nextCol] = BOT
      continue
    }

    if (nextChar === LEFT_BOX || nextChar === RIGHT_BOX) {
      // TODO
    }
  }

  console.log(modGrid.map(row => row.join('')).join('\n'))

  //   const scores = []
  //   for (let r = 0; r < grid.length; r++) {
  //     for (let c = 0; c < grid[r].length; c++) {
  //       if (grid[r][c] === BOX) {
  //         scores.push(r * 100 + c)
  //       }
  //     }
  //   }

  //   return sum(scores)
}
