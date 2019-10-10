import Transaction from '../wallet/transaction'

class MemoryPool {
  transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  addOrUpdate(transaction: Transaction) {
    const transactionIndex = this.transactions.findIndex(({ id }) => id === transaction.id)

    if (transactionIndex !== -1) {
      this.transactions[transactionIndex] = transaction
    } else {
      this.transactions.push(transaction)
    }
  }

  find(address) {
    return this.transactions.find(({ input }) => input.address === address)
  }
}

export default MemoryPool
