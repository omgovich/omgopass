let crypto = require("crypto");
let size = 0xffff;
let index = size + 1;
let buffer = [];

module.exports = limit => {
  if (++index > size) {
    buffer = crypto.randomBytes(size);
    index = 0;
  }

  return buffer[index] % limit;
};
