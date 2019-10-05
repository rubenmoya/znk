import Blockchain from './blockchain'
import Block from './block'

test('every blockchain starts with a genesis block', () => {
  const blockchain = new Blockchain()
  const [genesisBlock] = blockchain.blocks

  expect(blockchain.blocks.length).toEqual(1)
  expect(genesisBlock).toEqual(Block.genesis)
})

test('.addBlock', () => {
  const blockchain = new Blockchain()
  const data = 'Hello There'
  const block = blockchain.addBlock(data)
  const [, lastBlock] = blockchain.blocks

  expect(blockchain.blocks.length).toEqual(2)
  expect(lastBlock).toEqual(block)
  expect(block.data).toEqual(data)
})

describe('.replace', () => {
  it('returns an error if the new chain is shorter than the current one', () => {
    const blockchain = new Blockchain()
    const newBlockchain = new Blockchain()
    blockchain.addBlock('hello there')

    expect(() => blockchain.replace(newBlockchain.blocks)).toThrowErrorMatchingInlineSnapshot(
      `"New chain is shorter than current one"`,
    )
  })

  it('returns an error if the validation fails', () => {
    const blockchain = new Blockchain()
    const newBlockchain = new Blockchain()
    newBlockchain.blocks[0].hash = 'Ashoka'

    expect(() => blockchain.replace(newBlockchain.blocks)).toThrowErrorMatchingInlineSnapshot(
      `"Received chain is invalid"`,
    )
  })

  it('returns the new blocks if there are no errors', () => {
    const blockchain = new Blockchain()
    const newBlockchain = new Blockchain()
    newBlockchain.addBlock('hello there')

    expect(blockchain.blocks.length).toEqual(1)

    blockchain.replace(newBlockchain.blocks)

    expect(blockchain.blocks.length).toEqual(2)
  })
})
