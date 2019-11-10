module.exports = {


  friendlyName: 'Get open orders',


  description: 'Gets data for "Open Orders page" page.',


  exits: {

    success: {
      description: 'Got open orders.',
    }

  },


  fn: async function () {
    const request = require('request-promise');
    var session = this.req.session;
    var orders = await sails.helpers.exchange.request("get","/market/orders",{state:"open"},session);
    return {
      orders:orders,
      baseUrl:sails.config.custom.baseUrl,

    };

  }


};
