import { SHA256 } from 'crypto-js'
import adjustDifficulty from './modules/adjustDifficulty'

export const DIFFICULTY = 3

class Block {
  timestamp: number
  previousHash: string
  hash: string
  data: string
  nonce: number
  difficulty: number

  constructor(
    timestamp: number,
    previousHash: string,
    hash: string,
    data: string,
    nonce: number,
    difficulty: number,
  ) {
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty
  }

  static get genesis(): Block {
    const timestamp = new Date(1991, 1, 5).getTime()

    return new Block(
      timestamp,
      undefined,
      '01189998811991197253',
      'So this is how liberty dies… with thunderous applause.',
      1,
      DIFFICULTY,
    )
  }

  static mine(previousBlock: Block, data: string) {
    const { hash: previousHash } = previousBlock
    let hash
    let nonce = 0
    let timestamp
    let difficulty

    do {
      timestamp = Date.now()
      nonce += 1
      difficulty = adjustDifficulty(previousBlock, timestamp)
      hash = Block.hash(timestamp, previousHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    return new Block(timestamp, previousHash, hash, data, nonce, difficulty)
  }

  static hash(
    timestamp: number,
    previousHash: string,
    data: string,
    nonce: number,
    difficulty: number,
  ): string {
    return SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString()
  }

  toString(): string {
    const { timestamp, previousHash, hash, data, nonce, difficulty } = this

    return `Block
      timestamp     : ${timestamp}
      previousHash  : ${previousHash}
      hash          : ${hash}
      nonce         : ${nonce}
      difficulty    : ${difficulty}
      data          : ${data}
    `
  }
}

export default Block
