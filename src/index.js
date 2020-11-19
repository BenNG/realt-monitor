const { realTApi } = require('./tech/api/realt');
const cheerio = require('cheerio');
const { notif } = require('./tech/notification');

// to update

const expectedState = {
  products: 13,
  soldOut: 12,
  comingSoon: 0,
  news: 1,
};

// to update end

let isUp = true;

const monitorWebsite = async () => {
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
    const products = $(element).find('li.product');
    let state = {
      products: products.length,
    };

    isNumberOfProductsHasChanged(state);

    const currentStatuses = getCurrentStatuses($, products);
    state = getState(state, currentStatuses);

    Object.keys(expectedState).forEach((key) => {
      if (expectedState[key] !== state[key]) {
        notif({ message: `the ${key} status has changed` });
      }
    });
  });
};

monitorWebsite();
setInterval(monitorWebsite, 20 * 1000);

const getState = (state, currentStatuses) => {
  const soldOut = currentStatuses.filter((status) => status === 'Sold Out').length;
  const news = currentStatuses.filter((status) => status === 'New!').length;
  const comingSoon = currentStatuses.filter((status) => status === 'Coming Soon!').length;

  if (soldOut + news + comingSoon !== state.products) {
    notif({ message: 'There are unknown statuses' });
  }

  return {
    ...state,
    soldOut,
    news,
    comingSoon,
  };
};

const isNumberOfProductsHasChanged = (state) => {
  if (state.products !== expectedState.products) {
    notif({ message: 'The number of products has changed' });
  }
};

const getCurrentStatuses = ($, products) => {
  return $(products)
    .find('li.product .property_status-banner')
    .text()
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => !!item);
};
