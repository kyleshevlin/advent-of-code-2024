import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

function getNodes(grid) {
  const result = []

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const char = grid[r][c]

      if (char !== '.') {
        result.push({ char, r, c })
      }
    }
  }

  return result
}

export function getAntinodes(a, b) {
  const { r: rA, c: cA } = a
  const { r: rB, c: cB } = b

  const rDiff = rA - rB
  const cDiff = cA - cB

  const result = [
    { r: rA + rDiff, c: cA + cDiff },
    { r: rA - rDiff * 2, c: cA - cDiff * 2 },
  ]

  return result
}

function getNodePairs(nodes) {
  const result = []

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      result.push([nodes[i], nodes[j]])
    }
  }

  return result
}

export function solution1(input, antinodeGetter = getAntinodes) {
  const grid = formatInput(input)
  const nodes = getNodes(grid)

  const groups = {}
  for (const node of nodes) {
    const { char } = node

    if (!groups[char]) {
      groups[char] = []
    }

    groups[char].push(node)
  }

  const antinodeLocations = new Set()

  for (const group of Object.values(groups)) {
    if (group.length < 2) continue

    for (const pair of getNodePairs(group)) {
      for (const antinode of antinodeGetter(...pair, grid)) {
        const { r, c } = antinode

        if (safeGridGet(grid, r, c) !== undefined) {
          antinodeLocations.add(`${r},${c}`)
        }
      }
    }
  }

  return antinodeLocations.size
}

// console.log(solution1(data)) // 295

function getAntinodesPart2(a, b, grid) {
  const { r: rA, c: cA } = a
  const { r: rB, c: cB } = b

  const rDiff = rA - rB
  const cDiff = cA - cB

  const result = [a]
  let dirty = true
  let i = 0

  while (dirty) {
    dirty = false
    i++

    if (safeGridGet(grid, rA + i * rDiff, cA + i * cDiff)) {
      result.push({ r: rA + i * rDiff, c: cA + i * cDiff })
      dirty = true
    }

    if (safeGridGet(grid, rA - i * rDiff, cA - i * cDiff)) {
      result.push({ r: rA - i * rDiff, c: cA - i * cDiff })
      dirty = true
    }
  }

  return result
}

export function solution2(input) {
  return solution1(input, getAntinodesPart2)
}

// console.log(solution2(data)) // 1034
