import Elliptic from 'elliptic'
import genHas from '../utils/hash'

const ec = new Elliptic.ec('secp256k1')
export const INITIAL_BALANCE = 100

class Wallet {
  balance: number
  keyPair: Elliptic.ec.KeyPair
  publicKey: string

  constructor() {
    this.balance = INITIAL_BALANCE
    this.keyPair = ec.genKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex', false)
  }

  sign(data) {
    return this.keyPair.sign(genHas(data))
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
