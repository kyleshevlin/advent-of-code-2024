import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const NEXT_DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

function getRegions(grid) {
  const regions = []

  const cellsRemaining = new Set()
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      cellsRemaining.add(`${r},${c}`)
    }
  }

  function walk(row, col, char, positions) {
    for (const [dy, dx] of NEXT_DIRS) {
      const nextChar = safeGridGet(grid, row + dy, col + dx)
      const nextRow = row + dy
      const nextCol = col + dx
      const key = `${nextRow},${nextCol}`

      if (nextChar && nextChar === char && cellsRemaining.has(key)) {
        positions.push([nextRow, nextCol])
        cellsRemaining.delete(key)
        walk(nextRow, nextCol, char, positions)
      }
    }
  }

  while (cellsRemaining.size) {
    const cell = cellsRemaining.values().next().value
    cellsRemaining.delete(cell)

    const [row, col] = cell.split(',').map(Number)
    const char = grid[row][col]
    const positions = [[row, col]]

    walk(row, col, char, positions)

    regions.push({ char, positions })
  }

  return regions
}

function getArea(region) {
  return region.positions.length
}

export function getPerimeter(region) {
  const { positions } = region
  const positionSet = new Set(positions.map(([r, c]) => `${r},${c}`))
  let result = 0

  for (const [row, col] of positions) {
    let sides = 4

    for (const [dy, dx] of NEXT_DIRS) {
      const nextRow = row + dy
      const nextCol = col + dx
      const key = `${nextRow},${nextCol}`

      if (positionSet.has(key)) sides--
    }

    result += sides
  }

  return result
}

export function solution1(input) {
  const grid = formatInput(input)
  const regions = getRegions(grid)

  let result = 0
  for (const region of regions) {
    result += getArea(region) * getPerimeter(region)
  }

  return result
}

// console.log(solution1(data)) // 1533644

export function getSides(region) {
  const { positions } = region
  const positionSet = new Set(positions.map(([r, c]) => `${r},${c}`))
  let result = 0

  for (const [row, col] of positions) {
    let corners = 0

    const n = `${row - 1},${col}`
    const ne = `${row - 1},${col + 1}`
    const e = `${row},${col + 1}`
    const se = `${row + 1},${col + 1}`
    const s = `${row + 1},${col}`
    const sw = `${row + 1},${col - 1}`
    const w = `${row},${col - 1}`
    const nw = `${row - 1},${col - 1}`

    // NE Corner
    if (
      (!positionSet.has(n) && !positionSet.has(e)) ||
      (positionSet.has(n) && positionSet.has(e) && !positionSet.has(ne))
    ) {
      corners++
    }

    // SE Corner
    if (
      (!positionSet.has(s) && !positionSet.has(e)) ||
      (positionSet.has(s) && positionSet.has(e) && !positionSet.has(se))
    ) {
      corners++
    }

    // SW Corner
    if (
      (!positionSet.has(s) && !positionSet.has(w)) ||
      (positionSet.has(s) && positionSet.has(w) && !positionSet.has(sw))
    ) {
      corners++
    }

    // NW Corner
    if (
      (!positionSet.has(n) && !positionSet.has(w)) ||
      (positionSet.has(n) && positionSet.has(w) && !positionSet.has(nw))
    ) {
      corners++
    }

    result += corners
  }

  return result
}

export function solution2(input) {
  const grid = formatInput(input)
  const regions = getRegions(grid)

  let result = 0
  for (const region of regions) {
    result += getArea(region) * getSides(region)
  }

  return result
}

// console.log(solution2(data)) // 936718
