const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = require('../realt/env');

const mailjet = require('node-mailjet').connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE);

const sendEmail = ({ message }) => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'benjamin.kim.nguyen@gmail.com',
          Name: 'Benjamin',
        },
        To: [
          {
            Email: 'benjamin.kim.nguyen@gmail.com',
            Name: 'Benjamin',
          },
        ],
        Subject: `RealT : ${message}`,
        TextPart: 'RealT : ${message}',
        HTMLPart: `<h3>${message} <a href='https://realt.co/marketplace/'>marketplace</a>!</h3>`,
        CustomID: 'AppGettingStartedTest',
      },
    ],
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = {
  sendEmail,
};
