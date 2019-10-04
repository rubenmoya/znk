import Block from './block'

test('creates an instance with parameters', () => {
  const expected = {
    timestamp: new Date(1987, 0, 1).getTime(),
    previousHash: 'hello-there',
    hash: 'general-kenobi',
    data: 'You are a bold one',
  }

  const block = new Block(
    expected.timestamp,
    expected.previousHash,
    expected.hash,
    expected.data,
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
