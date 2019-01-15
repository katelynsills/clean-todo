// export a function that goes from the real process obj 
// to the attentuated process obj that contains only what supports-color needs

const harden = Object.freeze;

const attenuateProcess = (originalProcess) => {
  // this is not pure - stdout and stderr are resources
  return harden({
    env: originalProcess.env,
    platform: 'win32',
    versions: originalProcess.versions,
    stdout: originalProcess.stdout,
    stderr: originalProcess.stderr,
  });
};

module.exports = attenuateProcess;