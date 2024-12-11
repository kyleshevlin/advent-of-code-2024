import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split(' ').map(Number)

const cache = {}

function transform(stone) {
  if (stone === 0) {
    return [1]
  }

  if (stone.toString().length % 2 === 0) {
    const str = stone.toString()
    const midIndex = Math.ceil(str.length / 2)
    const left = str.slice(0, midIndex)
    const right = str.slice(midIndex)

    return [Number(left), Number(right)]
  }

  return [stone * 2024]
}

function simulation(stone, ticks) {
  const key = `${ticks}-${stone}`

  if (cache[key]) return cache[key]
  if (ticks === 0) return 1

  const nextStones = transform(stone)
  const result = nextStones.reduce(
    (acc, _stone) => acc + simulation(_stone, ticks - 1),
    0
  )

  cache[key] = result

  return result
}

export function solution1(input, ticks) {
  const stones = formatInput(input)

  let result = 0
  for (const stone of stones) {
    result += simulation(stone, ticks)
  }

  return result
}

// console.log(solution1(data, 25)) // 213625

// Part 2
// console.log(solution1(data, 75)) // 252442982856820
