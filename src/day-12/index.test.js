import { getPerimeter, getSides, solution1, solution2 } from './'

const input = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
`

const map1 = `
AAAA
BBCD
BBCC
EEEC
`

const map2 = `
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
`

test('solution1', () => {
  expect(solution1(map1)).toEqual(140)
  expect(solution1(map2)).toEqual(772)
  expect(solution1(input)).toEqual(1930)
})

const map3 = `
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
`

const map4 = `
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
`

test('solution2', () => {
  // expect(solution2(map1)).toEqual(80)
  // expect(solution2(map2)).toEqual(436)
  // expect(solution2(map3)).toEqual(236)
  expect(solution2(map4)).toEqual(368)
  // expect(solution2(input)).toEqual(1206)
})

test('getPerimeter', () => {
  expect(getPerimeter({ positions: [[0, 0]] })).toEqual(4)
  expect(
    getPerimeter({
      positions: [
        [0, 0],
        [0, 1],
      ],
    })
  ).toEqual(6)
  expect(
    getPerimeter({
      positions: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
    })
  ).toEqual(16)
})

test('getSides', () => {
  expect(getSides({ positions: [[0, 0]] })).toEqual(4)
  expect(
    getSides({
      positions: [
        [0, 0],
        [0, 1],
      ],
    })
  ).toEqual(4)
  expect(
    getSides({
      positions: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
    })
  ).toEqual(8)
})
