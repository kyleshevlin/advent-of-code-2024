import {
  getRowPermutations,
  isDecreasingCorrectly,
  isIncreasingCorrectly,
  isRowSafe,
  solution1,
  solution2,
} from './'

const input = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`

test('solution1', () => {
  expect(solution1(input)).toEqual(2)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(4)
})

test('isRowSafe', () => {
  expect(isRowSafe([1, 2, 3, 4, 5])).toEqual(true)
  expect(isRowSafe([5, 4, 3, 2, 1])).toEqual(true)
  expect(isRowSafe([1, 2, 3, 2, 1])).toEqual(false)
  expect(isRowSafe([5, 4, 3, 4, 5])).toEqual(false)
  expect(isRowSafe([1, 4, 7, 10, 13])).toEqual(true)
  expect(isRowSafe([1, 5, 9, 13, 17])).toEqual(false)
  expect(isRowSafe([1, 2, 2, 3, 4])).toEqual(false)
  expect(isRowSafe([13, 10, 7, 4, 1])).toEqual(true)
  expect(isRowSafe([17, 13, 9, 5, 1])).toEqual(false)
})

test('isDecreasingCorrectly', () => {
  expect(isDecreasingCorrectly([1, 1, 1])).toEqual(false)
  expect(isDecreasingCorrectly([3, 2, 1])).toEqual(true)
  expect(isDecreasingCorrectly([9, 5, 1])).toEqual(false)
  expect(isDecreasingCorrectly([3, 2, 3])).toEqual(false)
})

test('isIncreasingCorrectly', () => {
  expect(isIncreasingCorrectly([1, 1, 1])).toEqual(false)
  expect(isIncreasingCorrectly([1, 2, 3])).toEqual(true)
  expect(isIncreasingCorrectly([1, 5, 9])).toEqual(false)
  expect(isIncreasingCorrectly([1, 2, 1])).toEqual(false)
})

test('getRowPermutations', () => {
  expect(getRowPermutations([1, 2, 3, 4, 5])).toEqual([
    [2, 3, 4, 5],
    [1, 3, 4, 5],
    [1, 2, 4, 5],
    [1, 2, 3, 5],
    [1, 2, 3, 4],
  ])
})
