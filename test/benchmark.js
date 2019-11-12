const Benchmark = require("benchmark");
const omgopass = require("../");
const passwordGenerator = require("password-generator");
const generatePassword = require("generate-password");
const niceware = require("niceware");

const suite = new Benchmark.Suite();

const libraries = [
  {
    name: "omgopass",
    browser: true,
    node: true,
    size: 476, // https://bundlephobia.com/result?p=omgopass@3.0.1
    generate: () => omgopass()
  },
  {
    name: "password-generator",
    browser: true,
    node: true,
    size: 707, // https://bundlephobia.com/result?p=password-generator@2.2.3
    generate: () => passwordGenerator()
  },
  {
    name: "generate-password",
    browser: false,
    node: true,
    size: 814, // https://bundlephobia.com/result?p=generate-password@1.4.2
    generate: () => {
      generatePassword.generate({
        length: 12,
        uppercase: true,
        numbers: true
      });
    }
  },
  {
    name: "niceware",
    browser: true,
    node: true,
    size: 192 * 1024, // https://bundlephobia.com/result?p=niceware@1.0.7
    generate: () => niceware.generatePassphrase(8)
  }
];

const results = [];

libraries.forEach(library => {
  suite.add(library.name, library.generate);
});

suite
  .on("cycle", event => {
    const { name, hz } = event.target;
    const library = libraries.find(lib => lib.name === name);

    results.push({
      name,
      "ops/sec": Math.round(hz),
      "size (bytes)": library.size,
      browser: library.browser,
      node: library.node
    });
  })
  .on("complete", () => {
    console.table(results);
  })
  .run();
