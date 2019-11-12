const getRandomValues = require("./random");

module.exports = (options = {}) => {
  return getRandomPassword({
    syllablesCount: 3,
    minSyllableLength: 2,
    maxSyllableLength: 3,
    hasNumbers: true,
    titlecased: true,
    vowels: "aeiouy",
    consonants: "bcdfghklmnprstvz",
    ...options
  });
};

const getRandomPassword = settings => {
  return produce(settings.syllablesCount, () => getRandomSyllable(settings));
};

const getRandomSyllable = ({
  consonants,
  vowels,
  hasNumbers,
  titlecased,
  minSyllableLength: minLength,
  maxSyllableLength: maxLength
}) => {
  const length = minLength + random(maxLength - minLength + 1);

  const syllable = produce(length, index => {
    const char = getRandomChar(index % 2 ? vowels : consonants);
    if (index === 0 && titlecased) return char.toUpperCase();
    return char;
  });

  if (hasNumbers) return syllable + random(10);
  return syllable;
};

const getRandomChar = stack => {
  return stack.charAt(random(stack.length));
};

const produce = (number, callback) => {
  let result = "";
  for (let index = 0; index < number; index++) result += callback(index);
  return result;
};

let buffer = [];
let bufferSize = 0xffff;
let bufferIndex = bufferSize + 1;

const random = limit => {
  if (++bufferIndex > bufferSize) {
    buffer = getRandomValues(bufferSize);
    bufferIndex = 0;
  }

  return buffer[bufferIndex] % limit;
};
