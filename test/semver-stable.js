'use strict';

var expect = require('chai').expect;
var stable = require('../');

describe("stable.is(version)", function(){
  [
    ['1.2.3-stable', false],
    ['1.2.4-alpha', false],
    ['1.3.5', true],
    ['0.3.9', true]
  ].forEach(function (c) {
    var version = c[0];
    var result = c[1];
    it(version + ': ' + result, function(done){
      expect(stable.is(version)).to.equal(result);
      done();
    });
  })
});


describe("stable.maxSatisfying(range, versions)", function(){
  it("normal", function(done){
    var versions = [
      '1.3.3',      
      '1.2.3-beta', 
      '1.2.2',      
      '1.2.1',     
      '1.1.2'
    ];

    expect(stable.maxSatisfying(versions, 'latest')).to.equal('1.3.3');
    expect(stable.maxSatisfying(versions, '~1.2.2')).to.equal('1.2.2');
    done();
  });
});