# Spotify Api Test

A playground project template for training purposes on the Spotify web api.

## Installation

``` bash
yarn install
```

### Requirements

[Node.js LTS](https://nodejs.org/)

## Usage

### Running the tests and reporting

Running the tests with "yarn test" creates a report on the console and creates a html report to the report folder using mochawesome.

``` bash
yarn test
```

An additional reporter can be created using the mocha-junit-reporter:

``` bash
yarn test --reporter mocha-junit-reporter
```

### eslint fix

``` bash
yarn lint
```

## Toolset

| Type                                                  | Documentation                                                         |
| :---------------------------------------------------- | :-------------------------------------------------------------------- |
| Assertions Library                                    | [Chai](https://www.chaijs.com/)                                       |
| Execution framework                                   | [Mocha](https://mochajs.org/)                                         |
| Linting                                               | [eslint](https://eslint.org/)                                         |
| Promise based HTTP client for the browser and node.js | [axios](https://github.com/axios/axios)                               |
| Reporter                                              | [mochawesome](https://github.com/adamgruber/mochawesome)              |
| Constants enumerating the HTTP status codes           | [http-status-codes] (https://www.npmjs.com/package/http-status-codes) |

