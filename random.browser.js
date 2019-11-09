const crypto = self.crypto || self.msCrypto;

module.exports = () => {
  return crypto
    ? crypto.getRandomValues(new Uint8Array(1))[0] / 255
    : Math.random();
};
