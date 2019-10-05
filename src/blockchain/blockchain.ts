import Block from './block'
import validate from './modules/validate'

class Blockchain {
  blocks: Block[]

  constructor() {
    this.blocks = [Block.genesis]
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
