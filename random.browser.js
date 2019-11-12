let crypto = self.crypto || self.msCrypto;
let size = 0xffff;
let index = size + 1;
let buffer = [];

module.exports = limit => {
  if (++index > size) {
    buffer = crypto.getRandomValues(new Uint8Array(size));
    index = 0;
  }

  return buffer[index] % limit;
};
