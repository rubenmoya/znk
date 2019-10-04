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
