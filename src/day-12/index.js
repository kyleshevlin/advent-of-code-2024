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

  function walk(row, col, char, cells) {
    for (const [dy, dx] of NEXT_DIRS) {
      const nextChar = safeGridGet(grid, row + dy, col + dx)
      const nextRow = row + dy
      const nextCol = col + dx
      const key = `${nextRow},${nextCol}`

      if (nextChar && nextChar === char && cellsRemaining.has(key)) {
        cells.add(`${nextRow},${nextCol}`)
        cellsRemaining.delete(key)
        walk(nextRow, nextCol, char, cells)
      }
    }
  }

  while (cellsRemaining.size) {
    const cell = cellsRemaining.values().next().value
    cellsRemaining.delete(cell)

    const [row, col] = cell.split(',').map(Number)
    const char = grid[row][col]
    const cells = new Set([`${row},${col}`])

    walk(row, col, char, cells)

    regions.push({ char, cells })
  }

  return regions
}

function getArea(region) {
  return region.cells.size
}

export function getPerimeter(region) {
  const { cells } = region
  let result = 0

  for (const key of cells) {
    const [row, col] = key.split(',').map(Number)
    let sides = 4

    for (const [dy, dx] of NEXT_DIRS) {
      const nextRow = row + dy
      const nextCol = col + dx
      const nextKey = `${nextRow},${nextCol}`

      if (cells.has(nextKey)) sides--
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
  const { cells } = region
  let result = 0

  for (const key of cells) {
    const [row, col] = key.split(',').map(Number)
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
      (!cells.has(n) && !cells.has(e)) ||
      (cells.has(n) && cells.has(e) && !cells.has(ne))
    ) {
      corners++
    }

    // SE Corner
    if (
      (!cells.has(s) && !cells.has(e)) ||
      (cells.has(s) && cells.has(e) && !cells.has(se))
    ) {
      corners++
    }

    // SW Corner
    if (
      (!cells.has(s) && !cells.has(w)) ||
      (cells.has(s) && cells.has(w) && !cells.has(sw))
    ) {
      corners++
    }

    // NW Corner
    if (
      (!cells.has(n) && !cells.has(w)) ||
      (cells.has(n) && cells.has(w) && !cells.has(nw))
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
