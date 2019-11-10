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
    // Respond with view.'
    /*
      { ethbtc:
        { at: 1565814497,
          ticker:
            { buy: '0.0',
              sell: '0.0',
              low: '0.0',
              high: '0.0',
              open: '0.0',
              last: '0.0',
              volume: '0.0',
              avg_price: '0.0',
              price_change_percent: '+0.00%',
              vol: '0.0' } } }
    */
    var markets = {
      ethbtc : {
        at : 1565814497,
        ticker: {
          market : "BTC-ETH",
          symbol : "ETH",
          name : "Ethereum",
          lastPrice : 200,
          change : "32%",
          high : 330,
          low : 150,
          volume : "10000",
        }
      }

    };
    var session = this.req.session;
    var markets = await sails.helpers.exchange.request("get","/markets",{},session);
    markets = await sails.helpers.exchange.format.markets(markets);
    return {
      markets:markets
    };

  }


};
