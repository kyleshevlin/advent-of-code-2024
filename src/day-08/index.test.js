import { getAntinodes, solution1, solution2 } from './'

const input = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`

test('solution1', () => {
  expect(solution1(input)).toEqual(14)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(34)
})

describe('getAntinodes', () => {
  test('vertical', () => {
    expect(getAntinodes({ r: 1, c: 1 }, { r: 2, c: 1 })).toEqual([
      { r: 0, c: 1 },
      { r: 3, c: 1 },
    ])
  })

  test('horizontal', () => {
    expect(getAntinodes({ r: 0, c: 1 }, { r: 0, c: 2 })).toEqual([
      { r: 0, c: 0 },
      { r: 0, c: 3 },
    ])
  })

  test('diagonal down-right', () => {
    expect(getAntinodes({ r: 1, c: 1 }, { r: 2, c: 2 })).toEqual([
      { r: 0, c: 0 },
      { r: 3, c: 3 },
    ])
  })

  test('diagonal down-left', () => {
    expect(getAntinodes({ r: 1, c: 2 }, { r: 2, c: 1 })).toEqual([
      { r: 0, c: 3 },
      { r: 3, c: 0 },
    ])
  })
})
