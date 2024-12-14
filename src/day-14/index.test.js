import { advanceRobot, solution1 } from './'

const input = `
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3
`

test('solution1', () => {
  expect(solution1(input, 7, 11)).toEqual(12)
})

function makeBot(px, py, vx, vy) {
  return { p: { x: px, y: py }, v: { x: vx, y: vy } }
}

test('advanceRobot', () => {
  expect(advanceRobot(makeBot(0, 0, 1, 0), 10, 10)).toEqual(makeBot(1, 0, 1, 0))
  expect(advanceRobot(makeBot(0, 0, 0, 1), 10, 10)).toEqual(makeBot(0, 1, 0, 1))
  expect(advanceRobot(makeBot(1, 1, -1, -1), 10, 10)).toEqual(
    makeBot(0, 0, -1, -1)
  )

  // wraps around x positively
  expect(advanceRobot(makeBot(1, 0, 2, 0), 3, 3)).toEqual(makeBot(0, 0, 2, 0))
  expect(advanceRobot(makeBot(2, 0, 4, 0), 5, 5)).toEqual(makeBot(1, 0, 4, 0))

  // wraps around x negatively
  expect(advanceRobot(makeBot(1, 0, -2, 0), 3, 3)).toEqual(makeBot(2, 0, -2, 0))
})
