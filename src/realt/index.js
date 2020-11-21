const { realTApi } = require('../tech/api/realt');
const cheerio = require('cheerio');
const { notif } = require('../tech/notification');
const { STATUS, getProductsByStatus } = require('./utils');
const { REALT_OWN_PRODUCTS } = require('./env');

// to update

const nbrOfProducts = 13;
let isUp = true;

// to update end

const monitorWebsite = async () => {
  try {
    const { data, status } = await realTApi.get('marketplace');

    if (isUp && status !== 200) {
      notif({ message: 'is probably down' });
      isUp = false;
    } else if (!isUp && status === 200) {
      isUp = true;
    }

    if (!isUp) {
      return;
    }

    const $ = cheerio.load(data);
    $('.products').each((i, element) => {
      // is the number of product good ?
      const productNodes = $(element).find('li.product');
      const productsByStatus = getProductsByStatus($, productNodes);

      // tests

      if (productNodes.length === 0) {
        notif({ message: 'The market place is empty (update soon ?)' });
        return;
      }

      if (productNodes.length !== nbrOfProducts) {
        notif({ message: 'The number of products has changed' });
      }

      productsByStatus[STATUS.NEW].forEach((n) => {
        if (!REALT_OWN_PRODUCTS.includes(n)) {
          notif({ message: `There is a new product: ${n}` });
        }
      });

      productsByStatus[STATUS.COMING_SOON].forEach((n) => {
        if (!REALT_OWN_PRODUCTS.includes(n)) {
          notif({ message: `There is a coming soon product: ${n}` });
        }
      });
    });
  } catch (e) {
    console.log('something wrong, ' + e);
  }
};

monitorWebsite();
// setInterval(monitorWebsite, 20 * 1000);
