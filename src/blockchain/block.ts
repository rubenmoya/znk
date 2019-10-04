import { SHA256 } from 'crypto-js'

class Block {
  timestamp: number
  previousHash: string
  hash: string
  data: string

  constructor(timestamp: number, previousHash: string, hash: string, data: string) {
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.hash = hash
    this.data = data
  }

  static get genesis(): Block {
    const timestamp = new Date(1991, 1, 5).getTime()

    return new Block(
      timestamp,
      undefined,
      '01189998811991197253',
      'So this is how liberty dies…with thunderous applause.',
    )
  }

  static mine(previousBlock: Block, data: string) {
    const timestamp = Date.now()
    const { hash: previousHash } = previousBlock
    const hash = Block.hash(timestamp, previousHash, data)

    return new Block(timestamp, previousHash, hash, data)
  }

  static hash(timestamp: number, previousHash: string, data: string): string {
    return SHA256(`${timestamp}${previousHash}${data}`).toString()
  }

  toString(): string {
    const { timestamp, previousHash, hash, data } = this

    return `Block
      timestamp     : ${timestamp}
      previousHash  : ${previousHash}
      hash          : ${hash}
      data          : ${data}
    `
  }
}

export default Block
