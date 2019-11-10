module.exports = {


  friendlyName: 'View markets',


  description: 'Display "Markets" page.',


  exits: {

    success: {
      description: 'Got market info.',
    }

  },


  fn: async function () {
    const request = require('request-promise');
    var session = this.req.session;
    var balances = await sails.helpers.exchange.request("get","/balances/",{},session);
    return {
      balances:balances,
      baseUrl:sails.config.custom.baseUrl,

    };

  }


};
