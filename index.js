let getRandomValues = require("./random");

module.exports = (options = {}) => {
  let settings = {
    syllablesCount: 3,
    minSyllableLength: 2,
    maxSyllableLength: 3,
    hasNumbers: true,
    titlecased: true,
    vowels: "aeiouy",
    consonants: "bcdfghjklmnpqrstvwxz",
    ...options
  };

  return produce(settings.syllablesCount, () => getRandomSyllable(settings));
};

let getRandomSyllable = ({
  consonants,
  vowels,
  hasNumbers,
  titlecased,
  minSyllableLength: minLength,
  maxSyllableLength: maxLength
}) => {
  let length = minLength + random(maxLength - minLength + 1);

  let syllable = produce(length, index => {
    let alpha = index % 2 ? vowels : consonants;
    let char = alpha[random(alpha.length)];

    return titlecased && !index ? char.toUpperCase() : char;
  });

  return hasNumbers ? syllable + random(10) : syllable;
};

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
