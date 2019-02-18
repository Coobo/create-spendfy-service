const unpack = require('tar-pack').unpack;
function extractStream(stream, dest) {
  return new Promise((resolve, reject) => {
    stream.pipe(
      unpack(dest, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(dest);
        }
      })
    );
  });
}

module.exports = exports = extractStream;
