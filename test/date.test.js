/*!
 * hessian.js - test/date.test.js
 *
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

/**
 * Module dependencies.
 */

var should = require('should');
var hessian = require('../');

describe('date.test.js', function () {
  var dateBuffer = new Buffer(['d'.charCodeAt(0), 0x00, 0x00, 0x00, 0xd0, 0x4b, 0x92, 0x84, 0xb8]);

  it('should read date 2:51:31 May 8, 1998', function () {
    var d = hessian.decode(dateBuffer);
    d.should.be.an.Date;
    d.getFullYear().should.equal(1998);
    d.getTime().should.equal(894621091000);
    d.toUTCString().should.equal('Fri, 08 May 1998 09:51:31 GMT');
    d.toISOString().should.equal('1998-05-08T09:51:31.000Z');
  });

  it('should write date 2:51:31 May 8, 1998', function () {
    hessian.encode(new Date(894621091000)).should.eql(dateBuffer);
  });

  it('should write date 0 and read', function () {
    hessian.encode(new Date(0)).should.eql(new Buffer(['d'.charCodeAt(0), 0, 0, 0, 0, 0, 0, 0, 0]));
  });
});