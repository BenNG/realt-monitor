const { default: axios } = require('axios');

const realTApi = axios.create({
  baseURL: 'https://realt.co/',
  timeout: 15000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

module.exports = {
  realTApi,
};
