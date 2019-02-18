const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const os = require('os');
const execSync = require('child_process').execSync;
const checkAppName = require('./checkAppName');
const isSafeToCreateProjectIn = require('./isSafeToCreateProjectIn');
const shouldUseYarn = require('./shouldUseYarn');
const checkThatNpmCanReadCwd = require('./checkThatNpmCanReadCwd');
const run = require('./run');

function createApp(
  name,
  verbose,
  version,
  useNpm,
  usePnp,
  useTypescript,
  template
) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName);
  fs.ensureDirSync(name);
  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1);
  }

  console.log(`Creating a new Spendfy Microservice in ${chalk.green(root)}.`);
  console.log();

  const packageJson = {
    name: appName,
    version: '0.0.1-alpha',
    private: true
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  const useYarn = useNpm ? false : shouldUseYarn();
  const originalDirectory = process.cwd();
  process.chdir(root);
  if (!useYarn && !checkThatNpmCanReadCwd()) {
    process.exit(1);
  }

  if (useYarn) {
    let yarnUsesDefaultRegistry = true;
    try {
      yarnUsesDefaultRegistry =
        execSync('yarnpkg config get registry')
          .toString()
          .trim() === 'https://registry.yarnpkg.com';
    } catch (e) {
      // ignore
    }
    if (yarnUsesDefaultRegistry) {
      fs.copySync(
        require.resolve('./../../yarn.lock.cached'),
        path.join(root, 'yarn.lock')
      );
    }
  }

  run(
    root,
    appName,
    version,
    verbose,
    originalDirectory,
    template,
    useYarn,
    usePnp,
    useTypescript
  );
}

module.exports = exports = createApp;
