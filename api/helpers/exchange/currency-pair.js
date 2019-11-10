module.exports = {


  friendlyName: 'Request',


  description: 'Request exchange.',


  inputs: {
    market: {
      description: 'sell currency + buy currency',
      example: 'ethbtc',
      type: "string",
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var market = inputs.market.toUpperCase();
    var sellCurrencies = sails.config.exchange.sellCurrencies;
    var buyCurrency = "";
    var sellCurrency = "";
    var currencyPair = "";
    var label = "";
    sellCurrencies.forEach(function(currency) {
        console.log(currency);
        var index = market.indexOf(currency);
        if(index == 0){
            sellCurrency = currency;
            buyCurrency = market.replace(sellCurrency, "");
            currencyPair = sellCurrency + "-" + buyCurrency;
            currencyLabel = sails.config.exchange.currencies[sellCurrency];
            label = currencyLabel + " Exchange";
        }
    });
    return {
        currencyPair : currencyPair.toUpperCase(), 
        buyCurrency : buyCurrency.toUpperCase(),
        sellCurrency : sellCurrency.toUpperCase(),
        label : label.toUpperCase(),
        market  : market, 
        id : market, 
    }

  }


};

