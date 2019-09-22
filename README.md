# omgopass

[![npm](https://img.shields.io/npm/v/omgopass.svg?color=%2356C838)](https://www.npmjs.com/package/omgopass)

Generator of strong passwords that are easy to remember

- **Fast**: 40 times faster than `password-generator`
- **Small**: 314 bytes (minified and gzipped)
- **No dependencies**
- Supports Node.js and browsers

### Install

```
npm install omgopass --save
```

### Usage

```js
import { generatePassword } from "omgopass";
const password = generatePassword() // Tu6Log5Bam4
```

#### Advanced Usage

```
generatePassword({
  syllablesCount: 4,
  minSyllableLength: 3,
  maxSyllableLength: 4,
  hasNumbers: false,
  titlecased: true,
  vowels: "аеиоуэюя",
  consonants: "бвгджзклмнпрстчш"
}) // ЗерКотиЛовМеч
```

#### Available options

| Name               | Description                                | Default            |
|--------------------|--------------------------------------------|--------------------|
| `syllablesCount`   | Integer, count of syllables                |`3`                 |
| `minSyllableLength`| Integer, minimal length of a syllable      |`2`                 |
| `maxSyllableLength`| Integer, max length of a syllable          |`3`                 |
| `hasNumbers`       | Boolean, put numbers in the password       |`true`              |
| `titlecased`       | Boolean, use titlecase                     |`true`              |
| `vowels`           | String, vowel alphabet                     |`'aeiouy'`          |
| `consonants`       | String, consonant alphabet                 |`'bcdfghklmnprstvz'`|

### Supporting IE11 and obsolete platforms

This library uses features like [destructuring assignment](https://kangax.github.io/compat-table/es6/#test-destructuring,_assignment) and [`const/let` declarations](https://kangax.github.io/compat-table/es6/#test-const) and doesn't ship with ES5 transpiled sources. If you aim to support browsers like IE11 and below → make sure you run Babel over your `node_modules`