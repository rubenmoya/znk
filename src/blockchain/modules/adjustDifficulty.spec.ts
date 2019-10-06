import adjustDifficulty from './adjustDifficulty'
import Block from '../block'

test('decreases the difficulty for low mine rates', () => {
  const difficulty = 3
  const block = new Block(Date.now(), '', '', '', 1, difficulty)

  expect(adjustDifficulty(block, block.timestamp + 6000)).toEqual(difficulty - 1)
})

test('increases the difficulty for fast mine rates', () => {
  const difficulty = 3
  const block = new Block(Date.now(), '', '', '', 1, difficulty)

  expect(adjustDifficulty(block, block.timestamp + 1000)).toEqual(difficulty + 1)
})
