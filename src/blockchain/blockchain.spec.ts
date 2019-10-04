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
