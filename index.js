'use strict';

var chalk = require('chalk');

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 10) {
  console.error(
    chalk.red(
      `You are running Node ${currentNodeVersion}.\nThis script requires Node 10 or higher.\nPlease update your version of Node.`
    )
  );
  process.exit(1);
}

require('./src/create');
