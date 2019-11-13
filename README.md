# omgopass

[![npm](https://img.shields.io/npm/v/omgopass.svg?color=%2356C838)](https://www.npmjs.com/package/omgopass) [![Build Status](https://travis-ci.com/omgovich/omgopass.svg?branch=master)](https://travis-ci.com/omgovich/omgopass) ![Dependencies](https://img.shields.io/david/omgovich/omgopass)

A tiny memorable password generator

- **Fast**: [600 times](#benchmark) faster than `password-generator`
- **Small**: 334 bytes (minified and gzipped)
- **Secure**: Uses [cryptographically strong random API](https://nodejs.org/api/crypto.html) instead of `Math.random`
- **No dependencies**
- Supports Node.js and browsers

Why you should consider using **omgopass** in your project? The library's goal is to provide the fastest and the smallest (in terms of the bundle size) password generation solution. We have performed a bunch of [benchmarks](#benchmark) against popular password generation libraries, and omgopass currently beats them all.

### [Generate password online](https://omgovich.github.io/omgopass/)

<img src="https://omgovich.github.io/omgopass/demo.gif" width="400">

### Install

```
npm install omgopass --save
```

### Usage

```js
import generatePassword from "omgopass";
const password = generatePassword(); // Tu6Log5Bam4
```

#### Advanced Usage

```js
generatePassword({ hasNumbers: false }); // MunBedKod

generatePassword({ syllablesCount: 5 }); // Rot2Ba5Vim1My8Red4

generatePassword({ titlecased: false }); // si5co3ve8

generatePassword({
  syllablesCount: 4,
  minSyllableLength: 3,
  maxSyllableLength: 4,
  hasNumbers: false,
  titlecased: true,
  vowels: "аеиоуэюя",
  consonants: "бвгджзклмнпрстчш"
}); // ЗерКотиЛовМеч
```

#### Available options

| Name                | Description                           | Default              |
| ------------------- | ------------------------------------- | -------------------- |
| `syllablesCount`    | Integer, count of syllables           | `3`                  |
| `minSyllableLength` | Integer, minimal length of a syllable | `2`                  |
| `maxSyllableLength` | Integer, max length of a syllable     | `3`                  |
| `hasNumbers`        | Boolean, put numbers in the password  | `true`               |
| `titlecased`        | Boolean, use titlecase                | `true`               |
| `vowels`            | String, vowel alphabet                | `'aeiouy'`           |
| `consonants`        | String, consonant alphabet            | `'bcdfghklmnprstvz'` |

### Benchmark

| name                   | ops/sec       | size (bytes) | memorable | browser | node |
| ---------------------- | ------------- | ------------ | --------- | ------- | ---- |
| omgopass               | **1 430 233** | **334**      | true      | true    | true |
| password-generator     | 2 163         | 644          | true      | true    | true |
| generate-password      | 696 006       | 740          | false     | false   | true |
| randomatic             | 29 796        | 1 740        | false     | true    | true |
| secure-random-password | 7 622         | 8 939        | false     | true    | true |
| niceware               | 327 805       | 195 584      | true      | true    | true |
| xkpasswd               | 793 456       | 732 160      | true      | false   | true |

Benchmark results were generated on a MBP 2018, 2,3 GHz Intel Core i5. To perform these tests, execute `npm run benchmark` in the library folder.

### Supporting IE11 and obsolete platforms

This library uses features like [destructuring assignment](https://kangax.github.io/compat-table/es6/#test-destructuring,_assignment) and [`const/let` declarations](https://kangax.github.io/compat-table/es6/#test-const) and doesn't ship with ES5 transpiled sources. If you aim to support browsers like IE11 and below → make sure you run Babel over your `node_modules`
