'use strict';

var expect = require('chai').expect;
var extra = require('../');

describe("extra.isStable(version)", function(){
  [
    ['1.2.3-stable', false],
    ['1.2.4-alpha', false],
    ['1.3.5', true],
    ['0.3.9', true]
  ].forEach(function (c) {
    var version = c[0];
    var result = c[1];
    it(version + ': ' + result, function(done){
      expect(extra.isStable(version)).to.equal(result);
      done();
    });
  })
});


describe("extra.isPrerelease(version, [pr])", function(){
  [
    ['1.2.3-abc', undefined, true],
    ['1.2.3', undefined, false],
    ['1.2.3-stable', undefined, true],
    ['1.2.3-stable', 'stable', true],
    ['1.2.3-1.2.3', '1.2.3', true],
    ['1.2.3-alpha', 'alpha', true],
    ['1.2.3-alpha.1.ab', 'alpha.1.ab', true],
    ['1.2.3-alpha.1.ab', 'alpha.2.ab', false],
  ].forEach(function (c) {
    var v = c[0];
    var p = c[1];
    var r = c[2];

    it(v + ', ' + p + ': ' + r, function(){
      expect(extra.isPrerelease(v, p)).to.equal(r);
    });
  });
});


describe("extra.max*()", function(){
  var versions = [
    '1.2.2', 
    '1.3.3',
    '1.1.2',
    '1.2.3-beta', 
    '1.2.1',
    '1.0.0-alpha'
  ];

  it("extra.max()", function(){
    expect(extra.max(versions)).to.equal('1.3.3');
    expect(extra.max([])).to.equal(null);
  });

  it("extra.maxStable()", function(){
    expect(extra.maxStable(versions)).to.equal('1.3.3');
    expect(extra.maxStable([])).to.equal(null);
  });

  it("extra.maxPrerelease()", function(){
    expect(extra.maxPrerelease(versions)).to.equal('1.2.3-beta');
    expect(extra.maxPrerelease([])).to.equal(null);
  });

  it("extra.maxPrerelease(prerelease)", function(){
    expect(extra.maxPrerelease(versions, 'beta')).to.equal('1.2.3-beta');
    expect(extra.maxPrerelease(versions, 'alpha')).to.equal('1.0.0-alpha');
    expect(extra.maxPrerelease(versions, 'rc')).to.equal(null);
    expect(extra.maxPrerelease([], 'rc')).to.equal(null);
  });
});
