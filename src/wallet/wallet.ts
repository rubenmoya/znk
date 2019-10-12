import hash from '../utils/hash'
import elliptic, { KeyPair } from '../utils/elliptic'
import Blockchain, { Block } from '../blockchain'
import Transaction from './transaction'

export const INITIAL_BALANCE = 100

class Wallet {
  balance: number
  blockchain?: Blockchain
  keyPair: KeyPair
  publicKey: string

  constructor(blockchain?: Blockchain, initialBalance = INITIAL_BALANCE) {
    this.balance = initialBalance
    this.blockchain = blockchain
    this.keyPair = elliptic.createKeyPair()
    this.publicKey = this.keyPair.getPublic().encode('hex', false)
  }

  sign(data) {
    return this.keyPair.sign(hash(data))
  }

  createTransaction(recipientAddress, amount) {
    const balance = this.calculateBalance()

    if (amount > balance) {
      throw Error(`Amount: ${amount} exceeds current balance, ${balance}`)
    }

    let transaction = this.blockchain.memoryPool.find(this.publicKey)

    if (transaction) {
      transaction.update(this, recipientAddress, amount)
    } else {
      transaction = Transaction.create(this, recipientAddress, amount)
    }

    return this.blockchain.memoryPool.addOrUpdate(transaction)
  }

  calculateBalance() {
    const transactions = []
    let balance

    this.blockchain.blocks.forEach(({ data = [] }) => {
      if (Array.isArray(data)) {
        data.forEach(tx => transactions.push(tx))
      }
    })

    const walletInputTxs = transactions.filter(tx => tx.input.address === this.publicKey)
    let timestamp = 0

    if (walletInputTxs.length > 0) {
      const latestInputTx = walletInputTxs
        .sort((a, b) => a.input.timestamp - b.input.timestamp)
        .pop()

      balance = latestInputTx.outputs.find(({ address }) => address === this.publicKey).amount
      timestamp = latestInputTx.input.timestamp

      transactions
        .filter(({ input }) => input.timestamp > timestamp)
        .forEach(({ outputs }) => {
          outputs.find(({ address, amount }) => {
            if (address === this.publicKey) {
              balance += amount
            }
          })
        })
    }

    return balance
  }

  toString() {
    const { balance, publicKey } = this

    return `Wallet -
      publicKey   : ${publicKey.toString()}
      balance     : ${balance}
    `
  }
}

export const blockchainWallet = new Wallet()
export default Wallet
