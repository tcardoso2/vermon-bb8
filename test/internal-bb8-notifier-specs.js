  /*****************************************************
 * Internal tests
 * What are internal tests?
 * As this is a npm package, it should be tested from
 * a package context, so I'll use "interal" preffix
 * for tests which are NOT using the npm tarball pack
 * For all others, the test should obviously include
 * something like:
 * var md = require('t-motion-detector');
 *****************************************************/

var chai = require('chai');
//var chaiAsPromised = require("chai-as-promised");
var should = chai.should();
var fs = require('fs');
var vermon = require('vermon');
var ent = require('../Entities');
var main = require('../main.js');
var events = require('events');
var sphero = require('sphero');

//Chai will use promises for async events
//chai.use(chaiAsPromised);

before(function(done) {
  done();
});

after(function(done) {
  // here you can clear fixtures, etc.
  done();
});

describe("Sphero library sanity check, ", function(done) {
  xit('should ', function() {
    bb8 = sphero("F3:F2:6D:55:71:09"); // change BLE address accordingly
    bb8.connect(function() {
      // roll BB-8 in a random direction, changing direction every second
      setTimeout(function() {
        var direction = Math.floor(Math.random() * 360);
        bb8.roll(150, direction);
        done();
      }, 1000);
    });
  });
});

describe("When a new BB8 Notifier is created, ", function() {
  it('should throw an Exeption if no mac is provided', function() {
    //Assumes there is some local file with the key
    try{
      var n = new ent.BB8Notifier("My BB8 Notifier");
    } catch(e){
      e.message.should.equal("'address' is a required argument, which should contain the BB8 mac address.");
      return;
    }
    chai.assert.fail();
  });

  it('"BB8Notifier" must extend BaseNotifier', function() {
    //Assumes there is some local file with the key
    var n = new ent.BB8Notifier("My BB8 Notifier", "Some-MAC-Address");
    (n instanceof vermon.Entities.BaseNotifier).should.equal(true);
  });

  it('should detect the BB8 config address property', function() { //To deprecate
    //Assumes there is some local file with the key
    var address = new main.Config().bB8Address();
    var n = new ent.BB8Notifier("My BB8 Notifier", address);
    n.macAddress.should.equal(address);
  });

  it('should check if a local file exists', function () {
    var local_config = new main.Config();
    local_config.file.default.bb8.should.not.equal(undefined);
  });

  it('should detect the BB8 config properties from the local config file (default profile)', function() {
    //Assumes there is some local file with the key
    var address = new main.Config().bB8Address();
    var local_config = new main.Config();
    local_config.file.default.bb8.macAddress.should.not.equal(undefined);
  });
});