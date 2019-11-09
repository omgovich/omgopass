const crypto = require("crypto");

module.exports = () => crypto.randomBytes(1).readUInt8() / 255;
