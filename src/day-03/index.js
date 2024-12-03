import { add, getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const MUL_PATTERN = /mul\(\d{1,3},\d{1,3}\)/g

function sumMuls(muls) {
  return muls
    .map(match => {
      const [x, y] = match
        .replace('mul(', '')
        .replace(')', '')
        .split(',')
        .map(Number)

      return x * y
    })
    .reduce(add, 0)
}

export function solution1(input) {
  const lines = formatInput(input)
  const matches = lines.flatMap(line => line.match(MUL_PATTERN))

  return sumMuls(matches)
}

// console.log(solution1(data)) // 170778545

const MUL_DO_DONT_PATTERN = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g

export function solution2(input) {
  const lines = formatInput(input)
  const matches = lines.flatMap(line => line.match(MUL_DO_DONT_PATTERN))

  const kept = []
  let keeping = true
  for (const match of matches) {
    if (match === 'do()') {
      keeping = true
      continue
    }

    if (match === "don't()") {
      keeping = false
      continue
    }

    if (keeping) {
      kept.push(match)
    }
  }

  return sumMuls(kept)
}

// console.log(solution2(data)) // 82868252
