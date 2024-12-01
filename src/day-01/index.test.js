const { solution1, solution2 } = require('./')

const input = `
3   4
4   3
2   5
1   3
3   9
3   3
`

test('solution1', () => {
  expect(solution1(input)).toEqual(11)
})

const input2 = `
3   4
4   3
2   5
1   3
3   9
3   3
`

test('solution2', () => {
  expect(solution2(input2)).toEqual(31)
})