const crypto = self.crypto || self.msCrypto;

module.exports = limit => {
  if (crypto) return crypto.getRandomValues(new Uint8Array(1))[0] % limit;

  return Math.round(Math.random() * 0xffff) % limit;
};
