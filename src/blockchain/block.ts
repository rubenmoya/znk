class Block {
  timestamp: number
  previousHash: string
  hash: string
  data: string

  constructor(
    timestamp: number,
    previousHash: string,
    hash: string,
    data: string,
  ) {
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
