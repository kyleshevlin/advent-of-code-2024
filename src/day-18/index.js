import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.split(',').map(Number))

const NEXT_DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

function makeKey(cell) {
  return cell.join(',')
}

export function solution1(input, gridSize, limit) {
  const bytes = formatInput(input)
  const grid = Array.from({ length: gridSize + 1 }).map(() =>
    Array.from({ length: gridSize + 1 }).fill('.')
  )

  for (let i = 0; i < limit; i++) {
    const [x, y] = bytes[i]

    grid[y][x] = '#'
  }

  const start = [0, 0]
  const end = [gridSize, gridSize]

  const queue = [{ cell: start, path: [] }]
  const visited = new Set()
  visited.add(makeKey(start))

  let result
  while (queue.length) {
    const item = queue.shift()
    const { cell, path } = item
    const [row, col] = cell

    if (row === end[0] && col === end[1]) {
      result = item
      break
    }

    for (const [dy, dx] of NEXT_DIRS) {
      const newRow = row + dy
      const newCol = col + dx
      const key = makeKey([newRow, newCol])
      const newCell = safeGridGet(grid, newRow, newCol)

      if (newCell === '.' && !visited.has(key)) {
        visited.add(key)
        queue.push({ cell: [newRow, newCol], path: [...path, newCell] })
      }
    }
  }

  const { path } = result

  return path.length
}

// console.log(solution1(data, 70, 1024)) // 276

export function solution2(input, gridSize) {
  const bytes = formatInput(input)
  const grid = Array.from({ length: gridSize + 1 }).map(() =>
    Array.from({ length: gridSize + 1 }).fill('.')
  )

  let canEscape = true
  let result
  outer: while (canEscape) {
    canEscape = false
    const byte = bytes.shift()
    const [row, col] = byte
    grid[row][col] = '#'

    const start = [0, 0]
    const end = [gridSize, gridSize]

    const queue = [{ cell: start, path: [] }]
    const visited = new Set()
    visited.add(makeKey(start))

    while (queue.length) {
      const item = queue.shift()
      const { cell, path } = item
      const [row, col] = cell

      if (row === end[0] && col === end[1]) {
        canEscape = true
        continue outer
      }

      for (const [dy, dx] of NEXT_DIRS) {
        const newRow = row + dy
        const newCol = col + dx
        const key = makeKey([newRow, newCol])
        const newCell = safeGridGet(grid, newRow, newCol)

        if (newCell === '.' && !visited.has(key)) {
          visited.add(key)
          queue.push({ cell: [newRow, newCol], path: [...path, newCell] })
        }
      }
    }

    result = byte
  }

  return result.join(',')
}

// console.log(solution2(data, 70)) // 60,37
