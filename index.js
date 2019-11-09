const random = require("./random");

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
  minSyllableLength,
  maxSyllableLength
}) => {
  const length = getRandomNumber(minSyllableLength, maxSyllableLength);

  const syllable = produce(length, index => {
    const char = getRandomChar(index % 2 ? vowels : consonants);
    if (index === 0 && titlecased) return char.toUpperCase();
    return char;
  });

  if (hasNumbers) return syllable + getRandomNumber(0, 9);
  return syllable;
};

const getRandomChar = stack => {
  return stack.charAt(getRandomNumber(0, stack.length - 1));
};

const getRandomNumber = (from, to) => {
  return Math.round(random() * (to - from) + from);
};

const produce = (number, callback) => {
  const result = [];
  for (let index = 0; index < number; index++) result.push(callback(index));
  return result.join("");
};
