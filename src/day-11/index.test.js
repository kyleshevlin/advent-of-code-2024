import { solution1, solution2 } from './'

const input = `125 17`

test('solution1', () => {
  expect(solution1(input, 25)).toEqual(55312)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})
