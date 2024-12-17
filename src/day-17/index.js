import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => {
  const [registerLines, programLine] = input.trim().split('\n\n')

  const [registerA, registerB, registerC] = registerLines
    .split('\n')
    .map(line => Number(line.split(':').at(1).trim()))

  const program = programLine.split(':').at(1).trim().split(',').map(Number)

  return {
    registerA,
    registerB,
    registerC,
    program,
  }
}

function executeProgram(a, b, c, program) {
  let pointer = 0
  const output = []

  function getComboOperand(operand) {
    switch (operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return operand

      case 4:
        return a

      case 5:
        return b

      case 6:
        return c
        l
    }
  }

  while (pointer < program.length) {
    const opcode = program[pointer]
    const operand = program[pointer + 1]

    switch (opcode) {
      // adv
      case 0: {
        const numerator = a
        const denominator = 2 ** getComboOperand(operand)

        a = Math.trunc(numerator / denominator)
        break
      }

      // bxl
      case 1: {
        b = b ^ operand
        break
      }

      // bst
      case 2: {
        b = getComboOperand(operand) % 8
        break
      }

      // jnz
      case 3: {
        if (a === 0) break

        pointer = operand
        continue
      }

      // bxc
      case 4: {
        b = b ^ c
        break
      }

      // out
      case 5: {
        const result = getComboOperand(operand) % 8
        output.push(result)
        break
      }

      // bdv
      case 6: {
        const numerator = a
        const denominator = 2 ** getComboOperand(operand)

        b = Math.trunc(numerator / denominator)
        break
      }

      // cdv
      case 7: {
        const numerator = a
        const denominator = 2 ** getComboOperand(operand)

        c = Math.trunc(numerator / denominator)
        break
      }
    }

    pointer += 2
  }

  return output.join(',')
}

export function solution1(input) {
  const { registerA, registerB, registerC, program } = formatInput(input)

  return executeProgram(registerA, registerB, registerC, program)
}

// console.log(solution1(data)) // 3,6,7,0,5,7,3,1,4

export function solution2(input) {
  const { registerB, registerC, program } = formatInput(input)
  const expected = program.join(',')

  let registerA = 0
  // eslint-disable-next-line
  while (true) {
    const result = executeProgram(registerA, registerB, registerC, program)

    if (result === expected) break

    registerA++
  }

  return registerA
}

// console.log(solution2(data))
