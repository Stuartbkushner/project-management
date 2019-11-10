module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    markets: {
      description: 'market data that comes from api get market boook call',
      example: '{ "asks": [], "bids": [] }',
      type: "ref",
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var markets = inputs.markets;

    for (var key in markets) {
        // check if the property/key is defined in the object itself, not in parent
        var pair = await sails.helpers.exchange.currencyPair(key);
        var marketInfo = markets[key];
        console.log("pair",pair);
        console.log("marketInfo",marketInfo);
        marketInfo = Object.assign(pair, marketInfo);
        console.log("marketInfo",marketInfo);

        markets[key] = marketInfo;
    }
    return markets;

   

  }


};

