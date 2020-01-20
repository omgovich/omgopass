let getRandomValues = require("./random");

module.exports = ({
  syllablesCount = 3,
  minSyllableLength = 2,
  maxSyllableLength = 3,
  hasNumbers = true,
  titlecased = true,
  separators = "",
  vowels = "aeiouy",
  consonants = "bcdfghjklmnpqrstvwxz"
} = {}) =>
  produce(syllablesCount, i => {
    let length =
      minSyllableLength + random(maxSyllableLength - minSyllableLength + 1);

    let syllable = produce(length, index => {
      let alpha = index % 2 ? vowels : consonants;
      let char = alpha[random(alpha.length)];

      return titlecased && !index ? char.toUpperCase() : char;
    });

    if (hasNumbers) syllable += random(10);

    return i && separators
      ? separators[random(separators.length)] + syllable
      : syllable;
  });

let produce = (number, callback) => {
  for (var i = 0, result = ""; i < number; i++) result += callback(i);
  return result;
};

let buffer = [];
let bufferSize = 0xffff;
let bufferIndex = bufferSize;

let random = limit => {
  if (bufferIndex >= bufferSize) {
    buffer = getRandomValues(bufferSize);
    bufferIndex = 0;
  }

  return buffer[bufferIndex++] % limit;
};
