let crypto = require("crypto");

module.exports = size => crypto.randomBytes(size);
