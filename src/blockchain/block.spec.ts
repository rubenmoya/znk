import Block, { DIFFICULTY } from './block'

test('creates an instance with parameters', () => {
  const expected = {
    timestamp: new Date(1987, 0, 1).getTime(),
    previousHash: 'hello-there',
    hash: 'general-kenobi',
    data: 'You are a bold one',
    nonce: 1337,
  }

  const block = new Block(
    expected.timestamp,
    expected.previousHash,
    expected.hash,
    expected.data,
    expected.nonce,
  )

  expect(block).toEqual(expected)
})

test('.genesis', () => {
  const { genesis } = Block

  expect(genesis.previousHash).toBeUndefined()
  expect(genesis.timestamp).toBeDefined()
  expect(genesis.hash).toBeDefined()
  expect(genesis.data).toBeDefined()
})

test('.hash', () => {
  const { timestamp, hash: previoushash, data } = Block.genesis
  const hash = Block.hash(timestamp, previoushash, data, 1337)

  expect(hash).toMatchInlineSnapshot(
    `"c613cf5209431fbe8be5285fa0d94ce37d02438e7dd5cd995e6c502330591ec4"`,
  )
})

test('.mine', () => {
  const previousBlock = Block.genesis
  const data = 'Young Skywalker'
  const block = Block.mine(previousBlock, data)

  expect(block.hash.length).toEqual(64)
  expect(block.previousHash).toEqual(previousBlock.hash)
  expect(block.data).toEqual(data)
  expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY))
  expect(block.nonce).not.toEqual(0)
})

test('.toString', () => {
  const block = Block.genesis

  expect(block.toString()).toMatchInlineSnapshot(`
    "Block
          timestamp     : 665708400000
          previousHash  : undefined
          hash          : 01189998811991197253
          nonce         : 1
          data          : So this is how liberty dies… with thunderous applause.
        "
  `)
})
