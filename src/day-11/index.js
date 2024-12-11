import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split(' ').map(Number)

export function solution1(input, ticks) {
  const stones = formatInput(input)

  let result = [...stones]
  for (let i = 0; i < ticks; i++) {
    result = result.flatMap(stone => {
      if (stone === 0) {
        return [1]
      }

      if (stone.toString().length % 2 === 0) {
        const str = String(stone)
        const midIndex = Math.ceil(str.length / 2)
        const left = str.slice(0, midIndex)
        const right = str.slice(midIndex)

        return [Number(left), Number(right)]
      }

      return [stone * 2024]
    })
  }

  return result.length
}

// console.log(solution1(data, 25)) // 213625

export function solution2(input) {
  // return solution1(input, 75)
}

// console.log(solution2(data))
