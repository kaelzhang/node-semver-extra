'use strict';

var extra = exports;
var semver = require('semver');
extra.__proto__ = semver;
extra.isStable = isStable;
extra.isPrerelease = isPrerelease;

var util = require('util');

function isStable (version) {
  return !semver.parse(version).prerelease.length;
}

function isPrerelease (version, prerelease) {
  var pr = semver.parse(version).prerelease;

  // isPrerelease('1.1.0-abc') -> true
  if (!prerelease && pr.length) {
    return true;
  }

  prerelease = prerelease.split('.');
  return arrayEqual(prerelease, pr);
}


function arrayEqual (a, b) {
  if (!util.isArray(a) || !util.isArray(b)) {
    return false;
  }

  return a.every(function (v, i) {
    return v === b[i];
  });
}


// Returns the max stable version
function maxStable (versions) {
  return first(desc(versions), isStable);
}

// Returns the max prerelease version of the maximun matched prerelease version
function maxPrerelease (versions, prerelease) {
  return first(desc(versions), function (version) {
    return isPrerelease(version, prerelease);
  });
}

// Returns the max version
function max (versions) {
  return desc(versions)[0] || null;
}

// Sort `versions` in DESC order
function desc (versions) {
  return versions.filter(semver.rcompare);
}

// Returns the first matched array item
function first (array, filter) {
  var i = 0;
  var length = array.length;
  var item;
  for (; i < length; i ++) {
    item = array[i];
    if (filter(item)) {
      return item;
    }
  }

  return null;
}
