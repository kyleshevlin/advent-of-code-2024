import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number))

export function isDecreasingCorrectly(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i] - arr[i + 1]

    if (diff <= 0 || diff >= 4) return false
  }

  return true
}

export function isIncreasingCorrectly(arr) {
  return isDecreasingCorrectly(arr.toReversed())
}

export function isRowSafe(arr) {
  return isDecreasingCorrectly(arr) || isIncreasingCorrectly(arr)
}

export function solution1(input) {
  const rows = formatInput(input)

  return rows.filter(isRowSafe).length
}

// console.log(solution1(data)) // 202

export function getRowPermutations(arr) {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const permutation = [...arr.slice(0, i), ...arr.slice(i + 1)]

    result.push(permutation)
  }

  return result
}

export function solution2(input) {
  const rows = formatInput(input)

  return rows.filter(
    row => isRowSafe(row) || getRowPermutations(row).some(isRowSafe)
  ).length
}

// console.log(solution2(data)) // 271
