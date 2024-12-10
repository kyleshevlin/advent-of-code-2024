import { getInput, pipe } from '../utils'

const data = getInput(__dirname)

const formatInput = input => input.trim()

function expandMap(map) {
  let result = ''
  let id = 0
  let idx = 0

  // eslint-disable-next-line
  while (true) {
    const files = Number(map[idx] ?? 0)

    if (!files) break

    result += id.toString().repeat(files)

    const freeSpace = Number(map[idx + 1] ?? 0)

    if (freeSpace) {
      result += '.'.repeat(freeSpace)
    }

    id++
    idx += 2
  }

  return result
}

function defrag(expanded) {
  const chars = expanded.split('')

  let dotIdx = chars.indexOf('.')
  let tailIdx = chars.length - 1

  while (dotIdx < tailIdx) {
    while (chars[tailIdx] === '.') {
      tailIdx--
    }

    chars[dotIdx] = chars[tailIdx]
    chars[tailIdx] = '.'

    dotIdx = chars.indexOf('.')
    tailIdx--
  }

  return chars.join('')
}

function getChecksum(compactedMap) {
  let result = 0

  for (let i = 0; i < compactedMap.length; i++) {
    const char = compactedMap[i]

    if (char === '.') return result

    result += Number(char) * i
  }

  return result
}

export function solution1(input) {
  return pipe(formatInput, expandMap, defrag, getChecksum)(input)
}

console.log(solution1(data))

export function solution2(input) {}
