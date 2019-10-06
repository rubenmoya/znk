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

test('.toString', () => {
  const wallet = new Wallet()

  expect(wallet.toString()).toMatchInlineSnapshot(`
    "Wallet -
          publicKey   : 042183c641ddc02a54f627865c2d7f657591bb93839e1d0c6857ecbb2cabe89b2a53a8837b612504c082a8f75a6b2d729e273a678f960595db85018e8b623101e3
          balance     : 100
        "
  `)
})
