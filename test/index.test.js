const { generatePassword } = require("../");

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
