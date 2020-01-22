const generatePassword = require("../");
const zxcvbn = require("zxcvbn");

test("password strength", () => {
  // See zxcvbn docs: https://github.com/dropbox/zxcvbn#usage
  const { score } = zxcvbn(generatePassword());

  // 0 # too guessable: risky password. (guesses < 10^3)
  // 1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
  // 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
  // 3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
  expect(score).toBeGreaterThanOrEqual(3);
});

test("long password strength", () => {
  const password = generatePassword({ syllablesCount: 4 });
  const { score } = zxcvbn(password);

  // 4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
  expect(score).toBeGreaterThanOrEqual(4);
});

test("default settings", () => {
  const password = generatePassword();
  const regexp = /^([A-Z][a-z]{1,2}[0-9]){3}/;
  expect(regexp.test(password)).toBe(true);
});

test("disable numbers", () => {
  const password = generatePassword({ hasNumbers: false });
  const regexp = /^([A-Z][a-z]{1,2}){3}/;
  expect(regexp.test(password)).toBe(true);
});

test("disable titlecased symbols", () => {
  const password = generatePassword({ titlecased: false });
  const regexp = /^([a-z]{2,3}[0-9]){3}/;
  expect(regexp.test(password)).toBe(true);
});

test("change syllables count", () => {
  const password = generatePassword({ syllablesCount: 5 });
  const regexp = /^([A-Z][a-z]{1,2}[0-9]){5}/;
  expect(regexp.test(password)).toBe(true);
});

test("change syllables length", () => {
  const password = generatePassword({
    minSyllableLength: 4,
    maxSyllableLength: 6
  });
  const regexp = /^([A-Z][a-z]{3,5}[0-9]){3}/;
  expect(regexp.test(password)).toBe(true);
});

test("change characters", () => {
  const password = generatePassword({
    vowels: "аеиоуэюя",
    consonants: "бвгджзклмнпрстчш"
  });
  const regexp = /^([А-Я][а-я]{1,2}[0-9]){3}/;
  expect(regexp.test(password)).toBe(true);
});

test("enable separators", () => {
  const password = generatePassword({ separators: "<>" });
  expect(password.split(/[<>]/)).toHaveLength(3);
});

test("generate passphrase", () => {
  const syllablesCount = 4;
  const password = generatePassword({
    syllablesCount,
    minSyllableLength: 4,
    maxSyllableLength: 6,
    hasNumbers: false,
    titlecased: false,
    separators: " "
  });
  expect(password.split(" ")).toHaveLength(syllablesCount);
});
