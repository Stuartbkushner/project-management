module.exports = {


  friendlyName: 'Withdraw currency',


  description: 'Withdraw currency',
  inputs: {
        currency: {
            type: 'string',
            example: 'btc',
            description: 'currency id',
        },
        address: {
            type: 'string',
            example: '0xjdjdljaljfls',
            description: 'where to send currency',
        },
        amount: {
            type: 'number',
            description: 'amount to withdraw',
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

    var withdrawPayload = {
        currency : inputs.currency,
        beneficiary_id : inputs.address,
        amount : inputs.amount,
    };
    return withdrawPayload;
    var result = await sails.helpers.exchange.request("post","/account/withdraws",withdrawPayload,session);
    return {
      result:result,
      baseUrl:sails.config.custom.baseUrl,

    };

  }


};
