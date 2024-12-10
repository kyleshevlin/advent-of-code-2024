import { solution1, solution2 } from './'

const map1 = `
0123
1234
8765
9876
`

const map2 = `
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9
`

const map3 = `
..90..9
...1.98
...2..7
6543456
765.987
876....
987....
`

const map4 = `
10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01
`

const input = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`

test('solution1', () => {
  expect(solution1(map1)).toEqual(1)
  expect(solution1(map2)).toEqual(2)
  expect(solution1(map3)).toEqual(4)
  expect(solution1(map4)).toEqual(3)
  expect(solution1(input)).toEqual(36)
})

const map5 = `
.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....
`

const map6 = `
..90..9
...1.98
...2..7
6543456
765.987
876....
987....
`

const map7 = `
012345
123456
234567
345678
4.6789
56789.
`

test('solution2', () => {
  expect(solution2(map5)).toEqual(3)
  expect(solution2(map6)).toEqual(13)
  expect(solution2(map7)).toEqual(227)
  expect(solution2(input)).toEqual(81)
})
