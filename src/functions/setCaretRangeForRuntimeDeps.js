const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const os = require('os');
const makeCaretRange = require('./makeCaretRange');
function setCaretRangeForRuntimeDeps(packageName) {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = require(packagePath);

  if (typeof packageJson.dependencies === 'undefined') {
    console.error(chalk.red('Missing dependencies in package.json'));
    process.exit(1);
  }

  const packageVersion = packageJson.dependencies[packageName];
  if (typeof packageVersion === 'undefined') {
    console.error(chalk.red(`Unable to find ${packageName} in package.json`));
    process.exit(1);
  }

  const deps = require('./../dependencies.json');

  for (let dep of deps) {
    makeCaretRange(packageJson.dependencies, dep);
  }

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
}

module.exports = exports = setCaretRangeForRuntimeDeps;
