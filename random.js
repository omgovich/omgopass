const crypto = require("crypto");

module.exports = (from, to) => {
  const range = to - from;
  return from + (crypto.randomBytes(1).readUInt8() % range);
};
