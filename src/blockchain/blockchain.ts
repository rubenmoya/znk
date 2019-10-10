import Block from './block'
import validate from './modules/validate'
import MemoryPool from './memoryPool'

class Blockchain {
  blocks: Block[]
  memoryPool: MemoryPool

  constructor() {
    this.blocks = [Block.genesis]
    this.memoryPool = new MemoryPool()
  }

  addBlock(data: string) {
    const previousBlock = this.blocks[this.blocks.length - 1]
    const block = Block.mine(previousBlock, data)

    this.blocks.push(block)

    return block
  }

  replace(newBlocks: Block[] = []) {
    if (newBlocks.length < this.blocks.length) {
      throw Error('New chain is shorter than current one')
    }

    try {
      validate(newBlocks)
    } catch (error) {
      throw Error('Received chain is invalid')
    }

    this.blocks = newBlocks

    return this.blocks
  }
}

export default Blockchain
