import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const START = 'S'
const END = 'E'
const WALL = '#'
const MOVE_COST = 1
const TURN_COST = 1000

const TURN_LEFT = {
  N: 'W',
  E: 'N',
  S: 'E',
  W: 'S',
}

const TURN_RIGHT = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
}

const NEXT_COORDS = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
}

const formatInput = input => input.trim().split('\n')

function findStart(grid) {
  const row = grid.findIndex(row => row.includes(START))
  const col = grid[row].indexOf(START)

  return [row, col]
}

function findEnd(grid) {
  const row = grid.findIndex(row => row.includes(END))
  const col = grid[row].indexOf(END)

  return [row, col]
}

function makeKey(row, col, direction) {
  return [row, col, direction].join(',')
}

export function solution1(input) {
  const grid = formatInput(input)
  const start = findStart(grid)
  const end = findEnd(grid)

  const visited = new Set()
  const costMap = new Map()
  const queue = [
    { position: start, direction: 'E', cost: 0 /* path: [start] */ },
  ]

  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost)

    const current = queue.shift()
    const [curRow, curCol] = current.position
    const key = makeKey(curRow, curCol, current.direction)

    if (curRow === end[0] && curCol === end[1]) {
      return current.cost
    }

    if (costMap.has(key) && costMap.get(key) <= current.cost) {
      continue
    }

    costMap.set(key, current.cost)

    // move forward
    const [dRow, dCol] = NEXT_COORDS[current.direction]
    const nextRow = curRow + dRow
    const nextCol = curCol + dCol
    const moveForwardKey = makeKey(nextRow, nextCol, current.direction)

    if (
      !visited.has(moveForwardKey) &&
      safeGridGet(grid, nextRow, nextCol) !== WALL
    ) {
      queue.push({
        ...current,
        position: [nextRow, nextCol],
        // path: [...current.path, [nextRow, nextCol]],
        cost: current.cost + MOVE_COST,
      })
    }

    // turn left
    const turnLeftDir = TURN_LEFT[current.direction]
    const [turnLeftDRow, turnLeftDCol] = NEXT_COORDS[turnLeftDir]
    const turnLeftRow = curRow + turnLeftDRow
    const turnLeftCol = curCol + turnLeftDCol
    const turnLeftKey = makeKey(turnLeftRow, turnLeftCol, turnLeftDir)

    if (
      !visited.has(turnLeftKey) &&
      safeGridGet(grid, turnLeftRow, turnLeftCol) !== WALL
    ) {
      queue.push({
        position: [turnLeftRow, turnLeftCol],
        direction: turnLeftDir,
        cost: current.cost + TURN_COST + MOVE_COST,
      })
    }

    // turn right
    const turnRightDir = TURN_RIGHT[current.direction]
    const [turnRightDRow, turnRightDCol] = NEXT_COORDS[turnRightDir]
    const turnRightRow = curRow + turnRightDRow
    const turnRightCol = curCol + turnRightDCol
    const turnRightKey = makeKey(turnRightRow, turnRightCol, turnRightDir)

    if (
      !visited.has(turnRightKey) &&
      safeGridGet(grid, turnRightRow, turnRightCol) !== WALL
    ) {
      queue.push({
        position: [turnRightRow, turnRightCol],
        direction: turnRightDir,
        cost: current.cost + TURN_COST + MOVE_COST,
      })
    }

    visited.add(key)
  }

  throw new Error('No path found')
}

// console.log(solution1(data))

export function solution2(input) {}
