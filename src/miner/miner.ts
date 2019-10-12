import Blockchain from '../blockchain'
import P2PService, { MessageType } from '../service/p2p'
import Wallet, { blockchainWallet } from '../wallet/wallet'
import Transaction from '../wallet/transaction'

class Miner {
  blockchain: Blockchain
  p2pservice: P2PService
  wallet: Wallet

  constructor(blockchain, p2pservice, wallet) {
    this.blockchain = blockchain
    this.p2pservice = p2pservice
    this.wallet = wallet
  }

  mine() {
    const { memoryPool } = this.blockchain

    if (memoryPool.transactions.length == 0) {
      throw Error('There are no unconfirmed transactions')
    }

    const rewardTransaction = Transaction.reward(this.wallet, blockchainWallet)
    memoryPool.transactions.push(rewardTransaction)

    const block = this.blockchain.addBlock(memoryPool.transactions)

    this.p2pservice.sync()
    memoryPool.wipe()
    this.p2pservice.broadcast(MessageType.Wipe)

    return block
  }
}

export default Miner
