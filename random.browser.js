const crypto = self.crypto || self.msCrypto;

module.exports = (from, to) => {
  const range = to - from;

  if (crypto) {
    const randomNumber = crypto.getRandomValues(new Uint8Array(1))[0];
    return from + (randomNumber % range);
  }

  return from + Math.round(Math.random() * range);
};
