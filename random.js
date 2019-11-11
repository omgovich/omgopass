const crypto = require("crypto");

module.exports = limit => crypto.randomBytes(1).readUInt8() % limit;
