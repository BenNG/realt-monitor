require('dotenv').config({ path: '../../.env' });
const { Env } = require('@humanwhocodes/env');
const env = new Env();

const MJ_APIKEY_PUBLIC = env.require('MJ_APIKEY_PUBLIC');
const MJ_APIKEY_PRIVATE = env.require('MJ_APIKEY_PRIVATE');

const REALT_OWN_PRODUCTS = env.get('REALT_OWN_PRODUCTS', '').split(';');

module.exports = {
  MJ_APIKEY_PRIVATE,
  MJ_APIKEY_PUBLIC,
  REALT_OWN_PRODUCTS,
};
