const path = require('path');
var shell = require('shelljs');

const play = () => {
  if (shell.which('mplayer')) {
    if (shell.exec(`pwd && mplayer ${path.join(__dirname, 'not.mp3')}`).code !== 0) {
      console.log('something wrong while playing notification');
    }
  }
};

module.exports = {
  play,
};
