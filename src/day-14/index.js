import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n').map(makeRobot)

function makeRobot(robotStr) {
  let [p, v] = robotStr.split(' ')
  p = p.replace('p=', '')
  v = v.replace('v=', '')

  const [px, py] = p.split(',').map(Number)
  const [vx, vy] = v.split(',').map(Number)

  return { p: { x: px, y: py }, v: { x: vx, y: vy } }
}

export function moveRobot(robot, rows, cols) {
  const { p, v } = robot

  let nextPx = p.x + v.x

  if (nextPx < 0 || nextPx >= cols) {
    // adding cols should handle negative numbers
    nextPx = (nextPx + cols) % cols
  }

  let nextPy = p.y + v.y

  if (nextPy < 0 || nextPy >= rows) {
    nextPy = (nextPy + rows) % rows
  }

  return { p: { x: nextPx, y: nextPy }, v }
}

export function solution1(input, rows, cols) {
  const robots = formatInput(input)

  let i = 0
  let statefulBots = [...robots]
  while (i < 100) {
    i++
    statefulBots = statefulBots.map(robot => moveRobot(robot, rows, cols))
  }

  const xMid = Math.floor(cols / 2)
  const yMid = Math.floor(rows / 2)

  let nw = 0
  let ne = 0
  let sw = 0
  let se = 0

  for (const bot of statefulBots) {
    if (bot.p.x < xMid && bot.p.y < yMid) {
      nw++
      continue
    }

    if (bot.p.x > xMid && bot.p.y < yMid) {
      ne++
      continue
    }

    if (bot.p.x < xMid && bot.p.y > yMid) {
      sw++
      continue
    }

    if (bot.p.x > xMid && bot.p.y > yMid) {
      se++
    }
  }

  return nw * ne * sw * se
}

// console.log(solution1(data, 103, 101)) // 221616000

/**
 * I won't even lie, this solution feels like magic to me. The fact that when
 * none of the bots overlap they make a Christmas tree is non-sense to me, but
 * it's how others were figuring it out on Reddit.
 *
 * Personally, I think they should have given us an ASCII of the tree and just
 * made us check against that.
 */
export function solution2(input, rows, cols) {
  const robots = formatInput(input)

  let i = 0
  let statefulBots = [...robots]
  let positionSet
  let done = false

  do {
    i++
    statefulBots = statefulBots.map(robot => moveRobot(robot, rows, cols))
    positionSet = new Set(statefulBots.map(bot => `${bot.p.x},${bot.p.y}`))

    // No overlap would mean the sizes are the same
    done = positionSet.size === robots.length
  } while (!done)

  return i
}

// console.log(solution2(data, 103, 101)) // 7572
