import { SHA256 } from 'crypto-js'

export const DIFFICULTY = 3

class Block {
  timestamp: number
  previousHash: string
  hash: string
  data: string
  nonce: number

  constructor(timestamp: number, previousHash: string, hash: string, data: string, nonce: number) {
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
  }

  static get genesis(): Block {
    const timestamp = new Date(1991, 1, 5).getTime()

    return new Block(
      timestamp,
      undefined,
      '01189998811991197253',
      'So this is how liberty dies… with thunderous applause.',
      1,
    )
  }

  static mine(previousBlock: Block, data: string) {
    const { hash: previousHash } = previousBlock
    let hash
    let nonce = 0
    let timestamp

    do {
      timestamp = Date.now()
      nonce += 1
      hash = Block.hash(timestamp, previousHash, data, nonce)
    } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))

    return new Block(timestamp, previousHash, hash, data, nonce)
  }

  static hash(timestamp: number, previousHash: string, data: string, nonce: number): string {
    return SHA256(`${timestamp}${previousHash}${data}${nonce}`).toString()
  }

  toString(): string {
    const { timestamp, previousHash, hash, data, nonce } = this

    return `Block
      timestamp     : ${timestamp}
      previousHash  : ${previousHash}
      hash          : ${hash}
      nonce         : ${nonce}
      data          : ${data}
    `
  }
}

export default Block
