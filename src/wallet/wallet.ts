import hash from '../utils/hash'
import elliptic, { KeyPair } from '../utils/elliptic'
import Blockchain from '../blockchain'
import Transaction from './transaction'

export const INITIAL_BALANCE = 100

class Wallet {
  balance: number
  blockchain: Blockchain
  keyPair: KeyPair
  publicKey: string

  constructor(blockchain) {
    this.balance = INITIAL_BALANCE
    this.blockchain = blockchain
    this.keyPair = elliptic.createKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex', false)
  }

  sign(data) {
    return this.keyPair.sign(hash(data))
  }

  createTransaction(recipientAddress, amount) {
    if (amount > this.balance) {
      throw Error(`Amount: ${amount} exceeds current balance, ${this.balance}`)
    }

    let transaction = this.blockchain.memoryPool.find(this.publicKey)

    if (transaction) {
      transaction.update(this, recipientAddress, amount)
    } else {
      transaction = Transaction.create(this, recipientAddress, amount)
    }

    this.blockchain.memoryPool.addOrUpdate(transaction)
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
