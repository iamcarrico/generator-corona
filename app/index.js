'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var CoronaGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    //////////////////////////////
    /// Sass directory.
    //////////////////////////////
    this.sassDir = null;

    if (this.config.get['sassDir']) {
      this.sassDir = this.config.get['sassDir'];
    }
    if (this.options.sassDir) {
      this.sassDir = this.options.sassDir;
    }

    //////////////////////////////
    /// CSS directory.
    //////////////////////////////
    this.cssDir = null;

    if (this.config.get['cssDir']) {
      this.cssDir = this.config.get['cssDir'];
    }
    if (this.options.cssDir) {
      this.cssDir = this.options.cssDir;
    }


    //////////////////////////////
    /// Welcome Message.
    //////////////////////////////
    if (!this.options['skip-welcome-message']) {

      // Have Yeoman greet the user.
      this.log(yosay('Welcome to the Corona Sass partial generator!'));

      this.log(
        chalk.green(
          'This generator will create the scaffolding for Sass partials within your project folder. ' + '\n'
        )
      );
    }

    this.on('end', function () {

    });
  },

  prompts: function() {
    var done = this.async(),
    prompts = [];

    // Sass Folder
    if (!this.sassDir) {
      prompts.push({
        type: 'string',
        name: 'sassDir',
        message: 'What folder would you like to use for your Sass files?',
        default: 'sass',
        validate: function (input) {
          if (input === '') {
            return 'Please enter the sass folder';
          }
          return true;
        }
      });
    }

    // CSS Folder
    if (!this.cssDir) {
      prompts.push({
        type: 'string',
        name: 'cssDir',
        message: 'What folder would you like to use for your CSS output?',
        default: 'css',
        validate: function (input) {
          if (input === '') {
            return 'Please enter the CSS folder';
          }
          return true;
        }
      });
    }

    if (prompts.length === 0) {
      done();
    }
    else {
      this.prompt(prompts, function (props) {
        this.sassDir = props.sassDir;
        this.cssDir = props.cssDir;

        done();
      }.bind(this));
    }
  },

  default: function () {
    var files,
    partials,
    folders,
    base,
    gems;

    files = [
    'style'
    ]

    partials = [
    ];

    folders = [
    'components',
    'layouts'
    ];

    this.composeWith('sass:structure', {
      options: {
        syntax: 'scss',
        base: this.sassDir,
        files: files,
        partials: partials,
        folders: partials.concat(folders),
        fileTemplate: this.sourceRoot() + '/_style.scss'
      }
    });

    gems = {
      'sass': '~>3.4',
      'compass': '~>1.0',
      'breakpoint': '~>2.5',
      'singularitygs': '~>1.4',
      'toolkit': '~>2.6'
    };

    this.composeWith('sass:compass', {
      options: {
        gems: gems,
        httpPath: './',
        cssDir: this.cssDir,
        sassDir: this.sassDir,
        imagesDir: 'images',
        jsDir: 'js',
        fontsDir: 'fonts',
        outputStyle: ':expanded',
        relativeAssets: true,
        lineComments: false,
        sassOptions: {
          ':sourcemaps': true
        },
        'skip-install': this.options['skip-install']
      }
    });

    this.directory('config', this.sassDir + '/config');
    this.directory('global', this.sassDir + '/global');
    this.copy('_print.scss', this.sassDir + '/_print.scss');
  }
});

module.exports = CoronaGenerator;
