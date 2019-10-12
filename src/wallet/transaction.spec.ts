import Transaction, { REWARD } from './transaction'
import Wallet, { blockainWallet } from './wallet'

test('outputs the amount substracted from the wallet balance', () => {
  const wallet = new Wallet()
  const recipientAddress = 'dagobah'
  const amount = 10
  const transaction = Transaction.create(wallet, recipientAddress, amount)

  const output = transaction.outputs.find(({ address }) => address === wallet.publicKey)

  expect(output.amount).toEqual(wallet.balance - amount)
})

test('outputs the amount added to the recipient wallet', () => {
  const wallet = new Wallet()
  const recipientAddress = 'dagobah'
  const amount = 10
  const transaction = Transaction.create(wallet, recipientAddress, amount)

  const output = transaction.outputs.find(({ address }) => address === recipientAddress)

  expect(output.amount).toEqual(amount)
})

test('fails if the wallet balance is less than the amount', () => {
  const wallet = new Wallet()
  const recipientAddress = expect(() =>
    Transaction.create(wallet, 'dagobah', 300),
  ).toThrowErrorMatchingInlineSnapshot(`"Amount: 300 exceeds balance."`)
})

test('inputs the balance of the wallet', () => {
  const wallet = new Wallet()
  const transaction = Transaction.create(wallet, 'dagobah', 50)

  expect(transaction.input.amount).toEqual(wallet.balance)
})

test('inputs the sender address of the wallet', () => {
  const wallet = new Wallet()
  const transaction = Transaction.create(wallet, 'dagobah', 50)

  expect(transaction.input.address).toEqual(wallet.publicKey)
})

test('inputs has a signature', () => {
  const wallet = new Wallet()
  const transaction = Transaction.create(wallet, 'dagobah', 50)

  expect(transaction.input.signature).toEqual(wallet.sign(transaction.outputs))
})

describe('.validate', () => {
  it('returns true for a valid transaction', () => {
    const wallet = new Wallet()
    const transaction = Transaction.create(wallet, 'dagobah', 50)

    expect(Transaction.verify(transaction)).toBe(true)
  })

  it('returns false for an invalid transaction', () => {
    const wallet = new Wallet()
    const transaction = Transaction.create(wallet, 'dagobah', 50)
    transaction.outputs[0].amount = 500

    expect(Transaction.verify(transaction)).toBe(false)
  })
})

describe('.update', () => {
  it('outputs the amount substracted from the wallet balance', () => {
    const wallet = new Wallet()
    const recipientAddress = 'dagobah'
    const amount = 10
    const transaction = Transaction.create(wallet, recipientAddress, amount)
    const newAmount = 20

    transaction.update(wallet, 'coruscant', newAmount)

    const output = transaction.outputs.find(({ address }) => address === wallet.publicKey)

    expect(output.amount).toEqual(wallet.balance - amount - newAmount)
  })

  it('outputs the amount added to the recipient wallet', () => {
    const wallet = new Wallet()
    const recipientAddress = 'dagobah'
    const amount = 10
    const transaction = Transaction.create(wallet, recipientAddress, amount)
    const newRecipientAddress = 'coruscant'
    const newAmount = 20

    transaction.update(wallet, newRecipientAddress, newAmount)

    const output = transaction.outputs.find(({ address }) => address === newRecipientAddress)

    expect(output.amount).toEqual(newAmount)
  })

  it('inputs the balance of the wallet', () => {
    const wallet = new Wallet()
    const transaction = Transaction.create(wallet, 'dagobah', 50)
    transaction.update(wallet, 'coruscant', 20)

    expect(transaction.input.amount).toEqual(wallet.balance)
  })
})

describe('.reward', () => {
  const wallet = new Wallet()
  const transaction = Transaction.reward(wallet, blockainWallet)

  const outputMiner = transaction.outputs.find(({ address }) => address === wallet.publicKey)
  const outputBlockchain = transaction.outputs.find(({ address }) => address === wallet.publicKey)

  expect(transaction.outputs).toHaveLength(2)
  expect(outputMiner.amount).toEqual(REWARD)
  expect(outputBlockchain.amount).toEqual(blockainWallet.balance - REWARD)
})
