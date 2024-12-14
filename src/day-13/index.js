import { getInput, sum } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n\n').map(parseGame)

function parseX(str) {
  return Number(str.match(/X.(\d+)/)[1])
}

function parseY(str) {
  return Number(str.match(/Y.(\d+)/)[1])
}

function parseGame(gameStr) {
  const [aStr, bStr, prizeStr] = gameStr.split('\n')

  const a = {}
  a.x = parseX(aStr)
  a.y = parseY(aStr)

  const b = {}
  b.x = parseX(bStr)
  b.y = parseY(bStr)

  const prize = {}
  prize.x = parseX(prizeStr)
  prize.y = parseY(prizeStr)

  return { a, b, prize }
}

function solveGame(game, limit) {
  const { a, b, prize } = game

  // determine if X can be solved
  const maxAPresses = Math.min(Math.ceil(prize.x / a.x), limit)
  const maxBPresses = Math.min(Math.ceil(prize.x / b.x), limit)

  const aTable = {}
  for (let i = 0; i < maxAPresses; i++) {
    aTable[i * a.x] = i
  }

  const potentialSolutions = []

  for (let i = 0; i < maxBPresses; i++) {
    const key = prize.x - b.x * i

    if (aTable[key]) {
      potentialSolutions.push({ aPresses: aTable[key], bPresses: i })
    }
  }

  // determine if Y can be solved with those values of X
  const filteredSolutions = potentialSolutions.filter(sol => {
    const { aPresses, bPresses } = sol

    return a.y * aPresses + b.y * bPresses === prize.y
  })

  const optimalSolution = filteredSolutions
    .toSorted((a, b) => {
      return b.aPresses + b.bPresses - (a.aPresses + b.bPresses)
    })
    .at(0)

  return optimalSolution
}

export function solution1(input) {
  const games = formatInput(input)
  const solves = games.map(game => solveGame(game, 100))
  const costs = solves.map(sol => {
    if (!sol) return 0

    return sol.aPresses * 3 + sol.bPresses
  })

  return sum(costs)
}

// console.log(solution1(data)) // 36954

export function solution2(input) {
  const games = formatInput(input)
  const modGames = games.map(game => ({
    ...game,
    prize: {
      x: game.prize.x + 10000000000000,
      y: game.prize.y + 10000000000000,
    },
  }))
  // const solves = modGames.map(game => solveGame(game, Infinity))
  // const costs = solves.map(sol => {
  //   if (!sol) return 0

  //   return sol.aPresses * 3 + sol.bPresses
  // })

  // return sum(costs)
}

// console.log(solution2(data))
