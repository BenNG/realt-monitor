const notifier = require('node-notifier');
const { sendEmail } = require('../sendmail');
const { play } = require('../sound');

const websiteName = 'RealT';

const notif = ({ message }) => {
  play();
  sendEmail({ message });
  notifier.notify({
    title: websiteName,
    message: `${websiteName}: ${message ? message : 'check the website'} (https://realt.co/marketplace/)`,
  });
};

module.exports = {
  notif,
};
