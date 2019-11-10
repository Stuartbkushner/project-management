module.exports = {


  friendlyName: 'Market',


  description: 'Market exchange.',


  inputs: {
    currencyPair: {
      type: 'string',
      example: 'etcbtc',
      description: 'market id',
    },
    req: {
        type: 'ref',
        description: 'sails req object that should be set in controler',
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var currencyPair = inputs.currencyPair;
    var req = inputs.req;
    var session = req.session;
    var market = await sails.helpers.exchange.request("get","/public/markets/"+currencyPair,{},session);
    console.log('market helper return',market);
    // var currencyInfo = await sails.helpers.exchange.currencyPair(currencyPair);
    // market = Object.assign(market, currencyInfo);
    // var buyCurrency = market.buyCurrency;
    // var sellCurrency = market.sellCurrency;
    // market['depth'] = await sails.helpers.exchange.request("get","/public/markets/"+currencyPair+"/depth",{},session);
    // market['trades'] = await sails.helpers.exchange.request("get","/public/markets/"+currencyPair+"/trades",{},session);
    // market['orders'] = await sails.helpers.exchange.request("get","/public/markets/"+currencyPair+"/order-book",{},session);
    // market['kLine'] = await sails.helpers.exchange.request("get","/public/markets/"+currencyPair+"/k-line",{},session);
    // market[buyCurrency] = await sails.helpers.exchange.request("get","/account/balances/"+buyCurrency.toLowerCase(),{},session);
    // market[sellCurrency] = await sails.helpers.exchange.request("get","/account/balances/"+sellCurrency.toLowerCase(),{},session);
    // market.chartData = {};
    // market.chartData.trades = await sails.helpers.exchange.chartData("trades",market.trades);
    market.orders = await sails.helpers.exchange.format.orders(market.orders);
    market.id  = market.id.toLowerCase();
    return market;
  }


};

