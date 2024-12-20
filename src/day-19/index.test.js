import { solution1, solution2 } from './'

const input = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`

test('solution1', () => {
  expect(solution1(input)).toEqual(6)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})
