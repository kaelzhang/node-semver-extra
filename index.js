'use strict';

var stable = exports;

var semver = require('semver');
var util = require('util');

stable.match = function(range, versions) {
  if (!util.isArray(versions)) {
    return null;
  }

  // Ordered by version DESC 
  versions.sort(semver.rcompare);
  var matched = null;

  versions.some(function(version) {
    if (stable.is(version)) {
      if (range === 'latest' || semver.satisfies(version, range)) {
        matched = version;
        return true;
      }
    }
  });

  return matched;
};


stable.is = function(version) {
  var semver_obj = semver.parse(version);
  return !semver_obj.prerelease.length;
};