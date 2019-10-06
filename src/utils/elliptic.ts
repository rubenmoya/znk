import Elliptic from 'elliptic'
import hash from './hash'

const ec = new Elliptic.ec('secp256k1')

export default {
  createKeyPair(): Elliptic.ec.KeyPair {
    return ec.genKeyPair()
  },

  verifySignature(publicKey, signature, data): boolean {
    return ec.keyFromPublic(publicKey, 'hex').verify(hash(data), signature)
  },
}

export type KeyPair = Elliptic.ec.KeyPair
