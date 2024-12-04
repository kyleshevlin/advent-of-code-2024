import { getInput, safeGridGet } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

export function solution1(input) {
  const search = formatInput(input)

  let count = 0

  for (let r = 0; r < search.length; r++) {
    for (let c = 0; c < search[r].length; c++) {
      if (search[r][c] === 'X') {
        // forwards
        if (search[r].substring(c, c + 4) === 'XMAS') {
          count++
        }

        // backwards
        if (search[r].substring(c - 3, c + 1) === 'SAMX') {
          count++
        }

        // down
        if (
          safeGridGet(search, r + 1, c) === 'M' &&
          safeGridGet(search, r + 2, c) === 'A' &&
          safeGridGet(search, r + 3, c) === 'S'
        ) {
          count++
        }

        // up
        if (
          safeGridGet(search, r - 1, c) === 'M' &&
          safeGridGet(search, r - 2, c) === 'A' &&
          safeGridGet(search, r - 3, c) === 'S'
        ) {
          count++
        }

        // down-to-the-right
        if (
          safeGridGet(search, r + 1, c + 1) === 'M' &&
          safeGridGet(search, r + 2, c + 2) === 'A' &&
          safeGridGet(search, r + 3, c + 3) === 'S'
        ) {
          count++
        }

        // up-to-the-left
        if (
          safeGridGet(search, r - 1, c - 1) === 'M' &&
          safeGridGet(search, r - 2, c - 2) === 'A' &&
          safeGridGet(search, r - 3, c - 3) === 'S'
        ) {
          count++
        }

        // down-to-the-left
        if (
          safeGridGet(search, r + 1, c - 1) === 'M' &&
          safeGridGet(search, r + 2, c - 2) === 'A' &&
          safeGridGet(search, r + 3, c - 3) === 'S'
        ) {
          count++
        }

        // up-to-the-right
        if (
          safeGridGet(search, r - 1, c + 1) === 'M' &&
          safeGridGet(search, r - 2, c + 2) === 'A' &&
          safeGridGet(search, r - 3, c + 3) === 'S'
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

  for (let r = 0; r < search.length; r++) {
    for (let c = 0; c < search[r].length; c++) {
      if (search[r][c] === 'A') {
        /**
         * M . M
         * . A .
         * S . S
         */
        if (
          safeGridGet(search, r - 1, c - 1) === 'M' &&
          safeGridGet(search, r - 1, c + 1) === 'M' &&
          safeGridGet(search, r + 1, c - 1) === 'S' &&
          safeGridGet(search, r + 1, c + 1) === 'S'
        ) {
          count++
        }

        /**
         * S . S
         * . A .
         * M . M
         */
        if (
          safeGridGet(search, r - 1, c - 1) === 'S' &&
          safeGridGet(search, r - 1, c + 1) === 'S' &&
          safeGridGet(search, r + 1, c - 1) === 'M' &&
          safeGridGet(search, r + 1, c + 1) === 'M'
        ) {
          count++
        }

        /**
         * S . M
         * . A .
         * S . M
         */
        if (
          safeGridGet(search, r - 1, c - 1) === 'S' &&
          safeGridGet(search, r - 1, c + 1) === 'M' &&
          safeGridGet(search, r + 1, c - 1) === 'S' &&
          safeGridGet(search, r + 1, c + 1) === 'M'
        ) {
          count++
        }

        /**
         * M . S
         * . A .
         * M . S
         */
        if (
          safeGridGet(search, r - 1, c - 1) === 'M' &&
          safeGridGet(search, r - 1, c + 1) === 'S' &&
          safeGridGet(search, r + 1, c - 1) === 'M' &&
          safeGridGet(search, r + 1, c + 1) === 'S'
        ) {
          count++
        }
      }
    }
  }

  return count
}

// console.log(solution2(data)) // 1854
