import Wallet, { INITIAL_BALANCE } from './wallet'

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
