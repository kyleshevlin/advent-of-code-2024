import { getInput } from '../utils'

const data = getInput(__dirname)

const formatInput = input => {
  const [patternLines, desiredLines] = input.trim().split('\n\n')

  const patterns = patternLines.split(',').map(str => str.trim())
  const desires = desiredLines.split('\n')

  return { patterns, desires }
}

export function solution1(input) {
  const { patterns, desires } = formatInput(input)
  const patternSet = new Set(patterns)

  function recurse(desire) {
    if (patternSet.has(desire)) {
      return [desire]
    }

    // If we are down to a single character and it can't be found
    // then there is no solution
    if (desire.length === 1 && !patternSet.has(desire)) {
      return []
    }

    const potentials = []
    for (let i = 1; i < desire.length + 1; i++) {
      const pat = desire.slice(0, i)

      if (patternSet.has(pat)) {
        potentials.push(pat)
      }
    }

    if (!potentials.length) {
      return []
    }

    return potentials.flatMap(pat => {
      const nextDesire = desire.replace(pat, '')

      return recurse(nextDesire)
    })
  }

  const possiblePatterns = desires.filter(desire => {
    return recurse(desire).length
  })

  return possiblePatterns.length
}

// console.log(solution1(data))

export function solution2(input) {}
