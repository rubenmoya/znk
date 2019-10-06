import Transaction from './transaction'
import Wallet from './wallet'

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
