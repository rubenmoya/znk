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
  const recipientAddress = 'dagobah'
  const amount = 300

  expect(() =>
    Transaction.create(wallet, recipientAddress, amount),
  ).toThrowErrorMatchingInlineSnapshot(`"Amount: 300 exceeds balance."`)
})
