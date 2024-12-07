import { getInput, sum } from '../utils'

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [answer, nums] = line.split(':').map(str => str.trim())

      return {
        answer: Number(answer),
        nums: nums.split(' ').map(Number),
      }
    })

function getCombos(equation, operators) {
  const { nums } = equation

  if (nums.length < 2) return []

  const [first, ...rest] = nums

  const combos = rest.reduce(
    (acc, num) => acc.flatMap(eq => operators.map(op => [...eq, op, num])),
    [[first]]
  )

  return combos
}

function validateEquation(equation, operations) {
  const { answer, nums } = equation

  if (nums.length === 0) return false
  if (nums.length === 1) return nums[0] === answer

  const combos = getCombos(equation, operations)

  for (const combo of combos) {
    let [result, ...rest] = combo

    while (rest.length) {
      const [op, num, ...remaining] = rest

      switch (op) {
        case '+':
          result += num
          break
        case '*':
          result *= num
          break
        case '|':
          result = Number(`${result}${num}`)
          break
      }

      rest = remaining
    }

    if (result === answer) return true
  }

  return false
}

export function solution1(input) {
  const equations = formatInput(input)
  const validEquations = equations.filter(equation =>
    validateEquation(equation, ['+', '*'])
  )

  return sum(validEquations.map(e => e.answer))
}

// console.log(solution1(data)) // 12839601725877

export function solution2(input) {
  const equations = formatInput(input)
  const validEquations = equations.filter(equation =>
    validateEquation(equation, ['+', '*', '|'])
  )

  return sum(validEquations.map(e => e.answer))
}

// console.log(solution2(data)) // 149956401519484
