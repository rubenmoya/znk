import uuidV1 from 'uuid/V1'
import Wallet from './wallet'

class Transaction {
  id: string
  input: any
  outputs: any[]

  constructor() {
    this.id = uuidV1()
    this.input = null
    this.outputs = []
  }

  static create(senderWallet: Wallet, recipientAddress: string, amount: number) {
    const { balance, publicKey } = senderWallet

    if (amount > balance) {
      throw Error(`Amount: ${amount} exceeds balance.`)
    }

    const transaction = new Transaction()
    transaction.outputs.push(
      ...[{ amount: balance - amount, address: publicKey }, { amount, address: recipientAddress }],
    )
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(transaction.outputs),
    }

    return transaction
  }
}

export default Transaction
