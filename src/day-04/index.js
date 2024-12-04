import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

export function solution1(input) {
  const search = formatInput(input)

  let count = 0

  for (let y = 0; y < search.length; y++) {
    for (let x = 0; x < search[y].length; x++) {
      if (search[y][x] === 'X') {
        // forwards
        if (search[y].substring(x, x + 4) === 'XMAS') {
          count++
        }

        // backwards
        if (search[y].substring(x - 3, x + 1) === 'SAMX') {
          count++
        }

        // down
        if (
          safeGridGet(search, y + 1, x) === 'M' &&
          safeGridGet(search, y + 2, x) === 'A' &&
          safeGridGet(search, y + 3, x) === 'S'
        ) {
          count++
        }

        // up
        if (
          safeGridGet(search, y - 1, x) === 'M' &&
          safeGridGet(search, y - 2, x) === 'A' &&
          safeGridGet(search, y - 3, x) === 'S'
        ) {
          count++
        }

        // down-to-the-right
        if (
          safeGridGet(search, y + 1, x + 1) === 'M' &&
          safeGridGet(search, y + 2, x + 2) === 'A' &&
          safeGridGet(search, y + 3, x + 3) === 'S'
        ) {
          count++
        }

        // up-to-the-left
        if (
          safeGridGet(search, y - 1, x - 1) === 'M' &&
          safeGridGet(search, y - 2, x - 2) === 'A' &&
          safeGridGet(search, y - 3, x - 3) === 'S'
        ) {
          count++
        }

        // down-to-the-left
        if (
          safeGridGet(search, y + 1, x - 1) === 'M' &&
          safeGridGet(search, y + 2, x - 2) === 'A' &&
          safeGridGet(search, y + 3, x - 3) === 'S'
        ) {
          count++
        }

        // up-to-the-right
        if (
          safeGridGet(search, y - 1, x + 1) === 'M' &&
          safeGridGet(search, y - 2, x + 2) === 'A' &&
          safeGridGet(search, y - 3, x + 3) === 'S'
        ) {
          count++
        }
      }
    }
  }

  return count
}

// console.log(solution1(data)) // 2557

export function solution2(input) {
  const search = formatInput(input)

  let count = 0

  for (let y = 0; y < search.length; y++) {
    for (let x = 0; x < search[y].length; x++) {
      if (search[y][x] === 'A') {
        /**
         * M . M
         * . A .
         * S . S
         */
        if (
          safeGridGet(search, y - 1, x - 1) === 'M' &&
          safeGridGet(search, y - 1, x + 1) === 'M' &&
          safeGridGet(search, y + 1, x - 1) === 'S' &&
          safeGridGet(search, y + 1, x + 1) === 'S'
        ) {
          count++
        }

        /**
         * S . S
         * . A .
         * M . M
         */
        if (
          safeGridGet(search, y - 1, x - 1) === 'S' &&
          safeGridGet(search, y - 1, x + 1) === 'S' &&
          safeGridGet(search, y + 1, x - 1) === 'M' &&
          safeGridGet(search, y + 1, x + 1) === 'M'
        ) {
          count++
        }

        /**
         * S . M
         * . A .
         * S . M
         */
        if (
          safeGridGet(search, y - 1, x - 1) === 'S' &&
          safeGridGet(search, y - 1, x + 1) === 'M' &&
          safeGridGet(search, y + 1, x - 1) === 'S' &&
          safeGridGet(search, y + 1, x + 1) === 'M'
        ) {
          count++
        }

        /**
         * M . S
         * . A .
         * M . S
         */
        if (
          safeGridGet(search, y - 1, x - 1) === 'M' &&
          safeGridGet(search, y - 1, x + 1) === 'S' &&
          safeGridGet(search, y + 1, x - 1) === 'M' &&
          safeGridGet(search, y + 1, x + 1) === 'S'
        ) {
          count++
        }
      }
    }
  }

  return count
}

// console.log(solution2(data)) // 1854
