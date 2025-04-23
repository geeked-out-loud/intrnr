// intrnr/backend/crypto/keys.js

const bip39 = require('bip39');
const crypto = require('crypto');

/**
 * Generates a BIP39 mnemonic.
 */
function generateMnemonic() {
  return bip39.generateMnemonic(); // 12-word mnemonic by default
}

/**
 * Generates a key pair from the mnemonic.
 * The private key is derived by hashing the mnemonic,
 * and the public key is derived by hashing the private key.
 */
function generateKeyPair(mnemonic) {
  // Generate private key by hashing the mnemonic with SHA-256
  const privateKey = crypto.createHash('sha256').update(mnemonic).digest('hex');
  // Derive public key by hashing the private key with SHA-256
  const publicKey = crypto.createHash('sha256').update(privateKey).digest('hex');
  return { privateKey, publicKey };
}

module.exports = { generateMnemonic, generateKeyPair };
