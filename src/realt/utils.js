const { notif } = require('../tech/notification');

const STATUS = {
  NEW: 'New!',
  SOLD_OUT: 'Sold Out',
  COMING_SOON: 'Coming Soon!',
  LIMITED: 'Limited Release',
};

const getProductsByStatus = ($, productsNode) => {
  const products = {
    [STATUS.SOLD_OUT]: [],
    [STATUS.NEW]: [],
    [STATUS.COMING_SOON]: [],
    [STATUS.LIMITED]: [],
  };
  $(productsNode).each((i, element) => {
    const status = getStatus($, element);
    const productName = getProductName($, element);

    if (status === STATUS.SOLD_OUT) {
      products[STATUS.SOLD_OUT].push(productName);
    } else if (status === STATUS.NEW) {
      products[STATUS.NEW].push(productName);
    } else if (status === STATUS.COMING_SOON) {
      products[STATUS.COMING_SOON].push(productName);
    } else if (status === STATUS.LIMITED) {
      products[STATUS.LIMITED].push(productName);
    } else {
      notif({ message: `There is a new status : ${status}` });
      throw new Error('er');
    }
  });
  return products;
};

const getStatus = ($, liElement) => {
  const status = $(liElement)
    .find('.property_status-banner')
    .text()
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => !!item);

  if (status && status.length === 1) {
    return status[0];
  } else if (status[0] === 'Limited Release') {
    return status[0];
  } else {
    throw new Error('something wrong with getStatus fn');
  }
};

const getProductName = ($, element) => {
  return $(element).find('.woocommerce-loop-product__title').text();
};

module.exports = {
  getProductName,
  getProductsByStatus,
  getStatus,
  STATUS,
};
