import validate from './validate'
import Blockchain from '../blockchain'

test('returns true when valid', () => {
  const blockchain = new Blockchain()

  expect(validate(blockchain.blocks)).toBe(true)
})

test('throws if genesis block is corrupt', () => {
  const blockchain = new Blockchain()
  blockchain.blocks[0].data = 'I find your lack of faith disturbing'

  expect(() => validate(blockchain.blocks)).toThrowErrorMatchingInlineSnapshot(
    `"Invalid Genesis block."`,
  )
})

test('throws if previousHash is corrupt within a block', () => {
  const blockchain = new Blockchain()
  const block = blockchain.addBlock('Anakin')
  block.previousHash = 'Vader'

  expect(() => validate(blockchain.blocks)).toThrowErrorMatchingInlineSnapshot(
    `"Invalid previous hash"`,
  )
})

test('throws if hash is corrupt within a block', () => {
  const blockchain = new Blockchain()
  const block = blockchain.addBlock('Obi-Wan')
  block.hash = 'Ben Kenobi'

  expect(() => validate(blockchain.blocks)).toThrowErrorMatchingInlineSnapshot(`"Invalid hash"`)
})
