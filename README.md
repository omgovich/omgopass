# omgopass

[![npm](https://img.shields.io/npm/v/omgopass.svg?color=%2356C838)](https://www.npmjs.com/package/omgopass) [![Build Status](https://travis-ci.com/omgovich/omgopass.svg?branch=master)](https://travis-ci.com/omgovich/omgopass) ![Dependencies](https://img.shields.io/david/omgovich/omgopass)

A tiny memorable password generator

- **Fast**: [600 times](#benchmark) faster than `password-generator`
- **Small**: 322 bytes (minified and gzipped)
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
const password = generatePassword(); // "Tu6Log5Bam4"
```

By default **omgopass** returns a random memorable password with size in range 9 to 12 characters.
To change password length you should config `syllablesCount`, `minSyllableLength` and `maxSyllableLength` options.

#### Advanced Usage

```js
generatePassword({ hasNumbers: false }); // "MunBedKod"

generatePassword({ syllablesCount: 5 }); // "Rot2Ba5Vim1My8Red4"

generatePassword({ titlecased: false }); // "si5co3ve8"

generatePassword({
  syllablesCount: 4,
  minSyllableLength: 3,
  maxSyllableLength: 4,
  hasNumbers: false,
  titlecased: true,
  separators: "-_",
  vowels: "аеиоуэюя",
  consonants: "бвгджзклмнпрстчш"
}); // "Зер_Коти-Лов_Меч"
```

#### Recipe: Generate random passphrase

Looking for long passwords that are easy to remember but hard to guess? Try to generate random passphrase instead.

```js
generatePassword({
  minSyllableLength: 4,
  maxSyllableLength: 6,
  hasNumbers: false,
  titlecased: false,
  separators: " "
}); // "goferu lipeba cyzex"
```

#### Available options

| Name                | Description                             | Default              |
| ------------------- | --------------------------------------- | -------------------- |
| `syllablesCount`    | Integer, count of syllables             | `3`                  |
| `minSyllableLength` | Integer, minimal length of a syllable   | `2`                  |
| `maxSyllableLength` | Integer, max length of a syllable       | `3`                  |
| `hasNumbers`        | Boolean, put numbers in the password    | `true`               |
| `titlecased`        | Boolean, use titlecase                  | `true`               |
| `vowels`            | String, vowel alphabet                  | `'aeiouy'`           |
| `consonants`        | String, consonant alphabet              | `'bcdfghklmnprstvz'` |
| `separators`        | String, symbols that separate syllables | `''`                 |

### Benchmark

| name                   | ops/sec       | size (bytes) | memorable | browser | node |
| ---------------------- | ------------- | ------------ | --------- | ------- | ---- |
| omgopass               | **1 430 233** | **322**      | ✅        | ✅       | ✅   |
| password-generator     | 2 163         | 644          | ✅        | ✅       | ✅   |
| generate-password      | 696 006       | 740          | ❌        | ❌       | ✅   |
| randomatic             | 29 796        | 1 740        | ❌        | ✅       | ✅   |
| secure-random-password | 7 622         | 8 939        | ❌        | ✅       | ✅   |
| niceware               | 327 805       | 195 584      | ✅        | ✅       | ✅   |
| xkpasswd               | 793 456       | 732 160      | ✅        | ❌       | ✅   |

Benchmark results were generated on a MBP 2018, 2,3 GHz Intel Core i5. To perform these tests, execute `npm run benchmark` in the library folder.

### Who uses omgopass

- [LogChimp](https://github.com/logchimp/logchimp) — self-hosted platform for products makers to get feedback from their users
- [Laravel VPN Admin](https://github.com/Laravel-VPN-Admin/api-core) — Admin panel for VPN servers management
- [Password Pusher](https://github.com/pglombardo/PasswordPusher) - application to securely communicate passwords over the web

### Supporting IE11 and obsolete platforms

This library uses features like [destructuring assignment](https://kangax.github.io/compat-table/es6/#test-destructuring,_assignment) and [`const/let` declarations](https://kangax.github.io/compat-table/es6/#test-const) and doesn't ship with ES5 transpiled sources. If you aim to support browsers like IE11 and below → make sure you run Babel over your `node_modules`
