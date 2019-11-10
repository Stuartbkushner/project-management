module.exports = {


  friendlyName: 'Get Deposit Address',


  description: 'Get Deposit Address',
  inputs: {
        currency: {
            type: 'string',
            example: 'btc',
            description: 'currency id',
        },
    },


  exits: {
    success: {
      description: 'Got address info.',
    }

  },


  fn: async function (inputs) {
    const request = require('request-promise');
    var session = this.req.session;
    var currency = inputs.currency;
    var address = await sails.helpers.exchange.request("get","/balances/address",{},session);
    return {
      address:address,
      baseUrl:sails.config.custom.baseUrl,
    };

  }


};
