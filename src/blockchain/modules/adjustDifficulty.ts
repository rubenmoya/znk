import Block from '../block'

const MINE_RATE = 3000

export default function(previousBlock: Block, timestamp: number) {
  const { difficulty } = previousBlock
  const lowerThanMineRate = timestamp < previousBlock.timestamp + MINE_RATE

  return lowerThanMineRate ? difficulty + 1 : difficulty - 1
}
