let crypto = self.crypto || self.msCrypto;

module.exports = size => crypto.getRandomValues(new Uint8Array(size));
