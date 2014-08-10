# semver-extra [![NPM version](https://badge.fury.io/js/semver-extra.svg)](http://badge.fury.io/js/semver-extra) [![Build Status](https://travis-ci.org/kaelzhang/node-semver-extra.svg?branch=master)](https://travis-ci.org/kaelzhang/node-semver-extra) [![Dependency Status](https://gemnasium.com/kaelzhang/node-semver-extra.svg)](https://gemnasium.com/kaelzhang/node-semver-extra)

`semver-extra` contains useful methods that aren't included in the vanilla semver package.

The main reason `semver-extra` exists is to deal with pre-release versions.

## Install

```bash
$ npm install semver-extra --save
```

## Usage

```js
var semver = require('semver-extra');
```

First of all, `semver-extra` contains all methods of [`semver@3.x`](https://www.npmjs.org/package/semver), so we could use `semver-extra` only without the vanilla one.

```js
semver.validRange('^1.2.3'); // '>=1.2.3-0 <2.0.0-0'
```

### semver.isStable(version)

```js
semver.isStable('1.2.3');        // -> true
semver.isStable('1.2.3-stable'); // -> false
semver.isStable('1.2.3-alpha');  // -> false
```

Checks whether the `version` is a stable version.

### semver.isPrerelease(version, [prerelease])

- version `string`
- prerelease `String=` 
  - If argument `prerelease` is not passed and `version` is an unstable version, it will return `true`.
  - or `prerelease` could be the pre-release string.

```js
semver.isPrerelease('1.2.3'); // false
semver.isPrerelease('1.2.3-beta'); // true
semver.isPrerelease('1.2.3-beta', 'alpha'); // false
semver.isPrerelease('1.2.3-1.2.3', '1.2.3'); // true, that supports numeric prerelease versions
semver.isPrerelease('1.2.3-alpha.1', 'alpha.1'); // true
```

Checks whether the `version` is an unstable version or matches the `prerelease`.


```js
var versions = [
  '1.1.2'
  '1.2.3-beta',
  '1.2.2',
  '1.2.1',
  '1.3.3',
  '1.5.0-rc'
];
```

### semver.max(versions)

```js
semver.max(versions); // '1.5.0-rc'
```

Returns `String` the maximun version in the list.


### semver.maxStable(versions)

```js
semver.maxStable(versions); // '1.3.3'
```

Returns `String` the maximun stable version in the list.

### semver.maxPrerelease(versions, [prerelease])

```js
semver.maxPrerelease(versions, 'alpha'); // null
semver.maxPrerelease(versions); // '1.5.0-rc'
semver.maxPrerelease(versions, 'beta'); // '1.2.3-beta'
```

Returns the maximun (matched) pre-release version matches the prerelease.


## License

MIT
