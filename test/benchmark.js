const Benchmark = require("benchmark");
const omgopass = require("../");
const passwordGenerator = require("password-generator");
const generatePassword = require("generate-password");
const niceware = require("niceware");
const xkpasswd = require("xkpasswd");
const secureRandomPassword = require("secure-random-password");
const randomatic = require("randomatic");

const suite = new Benchmark.Suite();

const libraries = [
  {
    name: "omgopass",
    memorable: true,
    browser: true,
    node: true,
    size: 322,
    generate: () => omgopass()
  },
  {
    name: "password-generator",
    memorable: true,
    browser: true,
    node: true,
    size: 644,
    generate: () => passwordGenerator()
  },
  {
    name: "generate-password",
    memorable: false,
    browser: false,
    node: true,
    size: 740,
    generate: () => {
      generatePassword.generate({
        length: 12,
        symbols: false,
        uppercase: true,
        numbers: true,
        strict: true
      });
    }
  },
  {
    name: "randomatic",
    memorable: false,
    browser: true,
    node: true,
    size: 1740,
    generate: () => randomatic("Aa0", 12)
  },
  {
    name: "secure-random-password",
    memorable: false,
    browser: true,
    node: true,
    size: 8939,
    generate: () => secureRandomPassword.randomPassword()
  },
  {
    name: "niceware",
    memorable: true,
    browser: true,
    node: true,
    size: 191 * 1024,
    generate: () => niceware.generatePassphrase(8)
  },
  {
    name: "xkpasswd",
    memorable: true,
    browser: false,
    node: true,
    size: 715 * 1024,
    generate: () => xkpasswd()
  }
];

const results = [];

libraries.forEach(library => {
  suite.add(library.name, library.generate);
});

suite
  .on("cycle", event => {
    const { name, hz } = event.target;
    const { size, generate, ...library } = libraries.find(
      lib => lib.name === name
    );

    results.push({
      name,
      "ops/sec": Math.round(hz),
      "size (bytes)": size,
      ...library
    });
  })
  .on("complete", () => {
    console.table(results);
  })
  .run();
