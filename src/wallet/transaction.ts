import uuidV1 from 'uuid/V1'
import Wallet from './wallet'
import elliptic from '../utils/elliptic'

export const REWARD = 1

class Transaction {
  id: string
  input: any
  outputs: any[]

  constructor() {
    this.id = uuidV1()
    this.input = null
    this.outputs = []
  }

  static create(senderWallet: Wallet, recipientAddress: string, amount: number): Transaction {
    const { balance, publicKey } = senderWallet

    if (amount > balance) {
      throw Error(`Amount: ${amount} exceeds balance.`)
    }

    const transaction = new Transaction()
    transaction.outputs.push(
      ...[{ amount: balance - amount, address: publicKey }, { amount, address: recipientAddress }],
    )
    transaction.input = Transaction.sign(transaction, senderWallet)

    return transaction
  }

  static verify(transaction: Transaction): boolean {
    const { input, outputs } = transaction

    return elliptic.verifySignature(input.address, input.signature, outputs)
  }

  static sign(transaction: Transaction, senderWallet: Wallet) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(transaction.outputs),
    }
  }

  static reward(minerWallet: Wallet, blockchainWallet: Wallet): Transaction {
    return this.create(blockchainWallet, minerWallet.publicKey, REWARD)
  }

  update(senderWallet: Wallet, recipientAddress: string, amount: number) {
    const senderOutput = this.outputs.find(({ address }) => address === senderWallet.publicKey)

    if (amount > senderOutput.amount) {
      throw Error(`Amount: ${amount} exceeds balance.`)
    }

    senderOutput.amount -= amount
    this.outputs.push({ amount, address: recipientAddress })
    this.input = Transaction.sign(this, senderWallet)
  }
}

export default Transaction
