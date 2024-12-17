import { solution1, solution2 } from './'

const input = `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`

test('solution1', () => {
  expect(solution1(input)).toEqual('4,6,3,5,6,3,5,2,1,0')
})

const input2 = `
Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`

test('solution2', () => {
  expect(solution2(input2)).toEqual(117440)
})
