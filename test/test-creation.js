/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('The Corona generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('corona:app', [
        '../../app',
        [helpers.createDummyGenerator(), 'sass:structure'],
        [helpers.createDummyGenerator(), 'sass:compass']
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'sass/_print.scss'
    ];

    helpers.mockPrompt(this.app, {
      'sassDir': 'sass',
      'cssDir': 'css',
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
