const harden = Object.freeze;

const attenuateOs = (originalOs) =>
  // we know the result is pure
  harden({
    release: originalOs.release,
  });

module.exports = attenuateOs;
