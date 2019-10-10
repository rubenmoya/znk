import Transaction from '../wallet/transaction'

class MemoryPool {
  transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  addOrUpdate(transaction: Transaction) {
    const { input, outputs = [] } = transaction
    const outputTotal = outputs.reduce((total, output) => total + output.amount, 0)

    if (input.amount !== outputTotal) {
      throw Error(`Invalid transaction from ${input.address}`)
    }

    if (!Transaction.verify(transaction)) {
      throw Error(`Invalid signature from ${input.address}`)
    }

    const transactionIndex = this.transactions.findIndex(({ id }) => id === transaction.id)

    if (transactionIndex !== -1) {
      this.transactions[transactionIndex] = transaction
    } else {
      this.transactions.push(transaction)
    }

    return transaction
  }

  find(address) {
    return this.transactions.find(({ input }) => input.address === address)
  }
}

export default MemoryPool
