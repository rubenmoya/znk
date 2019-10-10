import MemoryPool from './memoryPool'
import Transaction from '../wallet/transaction'
import Wallet from '../wallet/wallet'

test('starts with no transactions', () => {
  const memoryPool = new MemoryPool()

  expect(memoryPool.transactions).toHaveLength(0)
})

test('adds a transaction', () => {
  const wallet = new Wallet()
  const transaction = Transaction.create(wallet, 'morty', 10)
  const memoryPool = new MemoryPool()

  memoryPool.addOrUpdate(transaction)

  expect(memoryPool.transactions).toHaveLength(1)
  expect(memoryPool.transactions[0]).toEqual(transaction)
})

test('updates the transaction if already exists', () => {
  const wallet = new Wallet()
  const transaction = Transaction.create(wallet, 'morty', 10)
  const memoryPool = new MemoryPool()

  memoryPool.addOrUpdate(transaction)

  transaction.update(wallet, 'rick', 15)

  memoryPool.addOrUpdate(transaction)

  expect(memoryPool.transactions).toHaveLength(1)
  expect(memoryPool.transactions[0]).toEqual(transaction)
})
