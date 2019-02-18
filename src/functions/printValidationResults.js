const chalk = require('chalk');

function printValidationResults(results) {
  if (typeof results !== 'undefined') {
    results.forEach((error) => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

module.exports = exports = printValidationResults;
