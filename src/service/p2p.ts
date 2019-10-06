import Websocket from 'ws'
import Blockchain from '../blockchain'

const { P2P_PORT = 5000, PEERS } = process.env
const peers = PEERS ? PEERS.split(',') : []

class P2PService {
  blockchain: Blockchain
  sockets: Websocket[]

  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT as number })
    server.on('connection', this.onConnection)

    peers.forEach(peer => {
      const socket = new Websocket(peer)
      socket.on('open', () => this.onConnection(socket))
    })

    console.log(`Service WS:${P2P_PORT} listenting...`)
  }

  onConnection(socket: Websocket) {
    console.log('[ws:socket] connected.')
    this.sockets.push(socket)
  }
}

export default P2PService
