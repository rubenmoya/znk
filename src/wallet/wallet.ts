import hash from '../utils/hash'
import elliptic, { KeyPair } from '../utils/elliptic'

export const INITIAL_BALANCE = 100

class Wallet {
  balance: number
  keyPair: KeyPair
  publicKey: string

  constructor() {
    this.balance = INITIAL_BALANCE
    this.keyPair = elliptic.createKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex', false)
  }

  sign(data) {
    return this.keyPair.sign(hash(data))
  }

  toString() {
    const { balance, publicKey } = this

    return `Wallet -
      publicKey   : ${publicKey.toString()}
      balance     : ${balance}
    `
  }
}

export default Wallet
