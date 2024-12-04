import { solution1, solution2 } from './'

const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`

test('solution1', () => {
  expect(solution1(input)).toEqual(18)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(9)
})
