import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const GUARD = '^'
const OBSTACLE = '#'

function getNextPosition(currentPosition, direction) {
  const [r, c] = currentPosition

  switch (direction) {
    case 'N':
      return [r - 1, c]
    case 'E':
      return [r, c + 1]
    case 'S':
      return [r + 1, c]
    case 'W':
      return [r, c - 1]
  }
}

const NEXT_DIRECTION = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
}

export function solution1(input) {
  const grid = formatInput(input)
  const startingGuardRow = grid.findIndex(row => row.includes(GUARD))
  const startingGuardCol = grid[startingGuardRow]
    .split('')
    .findIndex(char => char === GUARD)

  const startingPosition = [startingGuardRow, startingGuardCol]
  const positions = new Set([`${startingGuardRow},${startingGuardCol}`])

  let currentPosition = startingPosition
  let direction = 'N'
  let walking = true

  while (walking) {
    const nextPosition = getNextPosition(currentPosition, direction)
    const [nextRow, nextCol] = nextPosition
    const nextChar = safeGridGet(grid, nextRow, nextCol)

    if (nextChar === undefined) {
      walking = false
      continue
    }

    if (nextChar === OBSTACLE) {
      direction = NEXT_DIRECTION[direction]
      continue
    }

    positions.add(`${nextRow},${nextCol}`)
    currentPosition = nextPosition
  }

  return positions.size
}

// console.log(solution1(data)) // 5531

export function solution2(input) {}

/**
 * Look in the next direction and find the nearest obstacle
 * Look behind you and find the nearest obstacle
 * If there is an obstacle that is [next + 1][behind + 1]
 * Then ahead of you could be a new obstacle for a loop
 */
