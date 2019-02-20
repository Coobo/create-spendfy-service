const deps = require('./../dependencies.json');
const validateProjectName = require('validate-npm-package-name');
const printValidationResults = require('./printValidationResults');
var chalk = require('chalk');

function checkAppName(appName) {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  // TODO: there should be a single place that holds the dependencies
  const dependencies = deps.sort();
  if (dependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        `We cannot create a project called ${chalk.green(
          appName
        )} because a dependency with the same name exists.\n` +
          'Due to the way npm works, the following names are not allowed:\n\n'
      ) +
        chalk.cyan(dependencies.map((depName) => `  ${depName}`).join('\n')) +
        chalk.red('\n\nPlease choose a different project name.')
    );
    process.exit(1);
  }
}

module.exports = exports = checkAppName;
