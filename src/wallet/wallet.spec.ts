import Wallet, { INITIAL_BALANCE } from './wallet'
import Blockchain from '../blockchain'

test('has some initial balance', () => {
  const wallet = new Wallet()

  expect(wallet.balance).toEqual(100)
})

test('has a key pair generated', () => {
  const wallet = new Wallet()

  expect(typeof wallet.keyPair).toEqual('object')
})

test('has a publicKey', () => {
  const wallet = new Wallet()

  expect(wallet.publicKey).toHaveLength(130)
})

test('.sign', () => {
  const wallet = new Wallet()
  const signature = wallet.sign('Amidala')

  expect(typeof signature).toEqual('object')
})

test('.calculateBalance', () => {
  const blockchain = new Blockchain()
  const wallet = new Wallet(blockchain)
  const senderWallet = new Wallet(blockchain)

  senderWallet.createTransaction(wallet.publicKey, 16)
  senderWallet.createTransaction(wallet.publicKey, 16)

  blockchain.addBlock(blockchain.memoryPool.transactions)

  expect(wallet.calculateBalance()).toEqual(INITIAL_BALANCE + 32)
})

test('.toString', () => {
  const wallet = new Wallet()
  wallet.publicKey = 'Hello there'

  expect(wallet.toString()).toMatchInlineSnapshot(`
    "Wallet -
          publicKey   : Hello there
          balance     : 100
        "
  `)
})
