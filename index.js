'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('cxxhSlDspOrMiHOREzMVe9V8V61L1r703zKwX93F0p-QwfbRaVMS5ns5yGDaEUeXTg2ZSgn7GSQDZ7eodvO_m0uf0IBqOlRPLoQBEzNkVoEKSvlD6lcZ1Wx0V3apZnYx');

client.search({
  term: 'Four Barrel Coffee',
  location: 'san francisco, ca',
}).then(response => {
  console.log(response.jsonBody.businesses);
}).catch(e => {
  console.log(e);
});