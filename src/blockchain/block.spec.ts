import Block from './block'

test('creates an instance with parameters', () => {
  const expected = {
    timestamp: new Date(1987, 0, 1).getTime(),
    previousHash: 'hello-there',
    hash: 'general-kenobi',
    data: 'You are a bold one',
  }

  const block = new Block(expected.timestamp, expected.previousHash, expected.hash, expected.data)

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
  const hash = Block.hash(timestamp, previoushash, data)
  const expectedHash = 'fa59e7e1e0263fae8fa1185a6b81dc2e6908ca3c08f824636a89531ddb8ae1c2'

  expect(hash).toEqual(expectedHash)
})

test('.mine', () => {
  const previousBlock = Block.genesis
  const data = 'Young Skywalker'
  const block = Block.mine(previousBlock, data)

  expect(block.hash.length).toEqual(64)
  expect(block.previousHash).toEqual(previousBlock.hash)
  expect(block.data).toEqual(data)
})
