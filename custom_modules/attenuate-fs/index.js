const harden = Object.freeze;

const todoPath = 'todo.txt';

const checkFileName = (path) => {
  if (path !== todoPath) {
    throw Error(`This app does not have access to ${path}`);
  }
}

const attenuateFs = (originalFs) => {
  return harden({
    appendFile: (path, data, callback) => {
      checkFileName(path);
      return originalFs.appendFile(path, data, callback);
    },
    createReadStream: (path) => {
      checkFileName(path);
      return originalFs.createReadStream(path);
    },
  }); 
}

module.exports = attenuateFs;