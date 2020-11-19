const player = require('play-sound')();

const play = () => {
  player.play('./not.wav', (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
  });
};

module.exports = {
  play,
};
