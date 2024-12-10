import { getInput, safeGridGet, sum } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.split('').map(Number))

function getTrailheads(grid) {
  const result = []

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === 0) {
        result.push([r, c])
      }
    }
  }

  return result
}

const NEXT_DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

function getTrailScore(trailhead, grid) {
  let score = 0
  const visited = new Set()

  function recurse(point, level) {
    const key = point.join(',')

    if (visited.has(key)) return

    visited.add(key)

    if (level === 9) {
      score++
      return
    }

    const [r, c] = point

    for (const [y, x] of NEXT_DIRS) {
      const nextRow = r + y
      const nextCol = c + x

      const nextLevel = safeGridGet(grid, nextRow, nextCol)

      if (nextLevel === level + 1) {
        recurse([nextRow, nextCol], nextLevel)
      }
    }
  }

  recurse(trailhead, 0)

  return score
}

export function solution1(input) {
  const grid = formatInput(input)
  const trailheads = getTrailheads(grid)
  const scores = trailheads.map(head => getTrailScore(head, grid))

  return sum(scores)
}

// console.log(solution1(data)) // 459

function getTrailRating(trailhead, grid) {
  let score = 0
  const visited = new Set()

  function recurse(path, level) {
    if (visited.has(path)) return

    visited.add(path)

    if (level === 9) {
      score++
      return
    }

    const point = path.split('-').at(-1).split(',').map(Number)
    const [r, c] = point

    for (const [y, x] of NEXT_DIRS) {
      const nextRow = r + y
      const nextCol = c + x

      const nextLevel = safeGridGet(grid, nextRow, nextCol)

      if (nextLevel === level + 1) {
        recurse(path + `-${nextRow},${nextCol}`, nextLevel)
      }
    }
  }

  recurse(trailhead.join(','), 0)

  return score
}

export function solution2(input) {
  const grid = formatInput(input)
  const trailheads = getTrailheads(grid)
  const ratings = trailheads.map(head => getTrailRating(head, grid))

  return sum(ratings)
}

// console.log(solution2(data)) // 1034
