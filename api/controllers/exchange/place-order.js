module.exports = {


  friendlyName: 'Place order',


  description: 'Places orders to api.',
  inputs: {
    market: {
        type: 'string',
        example: 'etcbtc',
        description: 'market id',
    },
    side: {
        type: 'string',
        example: 'buy or sell',
        description: 'order type',
    },
    volume: {
        type: 'number',
        example: 100,
        description: 'amount being traded',
    },
    ord_type: {
        type: 'string',
        example: 'market or limit',
        description: 'order type',
    },
    price: {
        type: 'number',
        example: 100,
        description: 'price to buy or sell',
    },

  },


  exits: {

    success: {
      description: 'Posted  orders.',
    }

  },


  fn: async function (inputs) {
    const request = require('request-promise');
    var marketUpdate = {};
    var order = {};
    var market = inputs.market
    var session = this.req.session;
    order.market = market;
    order.side = inputs.side;
    order.volume = inputs.volume;
    order.price = inputs.price;

    //  {market:testMarket,side:"sell",volume:0.0571279,price:1};

    console.log("place order",order);
    console.log("place session",session);
    var order = await sails.helpers.exchange.request("post","/market/orders",order,session);
    var flag = true;
    var msg = "Your order was placed successfully";
    console.log("placed order",order);


    if(order == false){
        flag = false;
        msg = "There was an error placing your order";
    }
    console.log("this.req.isSocket",this.req.isSocket);

    if (this.req.isSocket) {
      var socket = "markets";
      sails.sockets.join(this.req, socket);
      if(flag){
        marketUpdate = await sails.helpers.exchange.market(market,this.req);
        console.log("marketUpdate",marketUpdate);
        console.log("marketUpdate market",market);
        sails.sockets.broadcast(socket, market, marketUpdate, this.req);
      }
    }
    marketUpdate.openOrders = await sails.helpers.exchange.request("get","/market/orders/"+market+"/wait",{},session);
    marketUpdate.tradeHistory = await sails.helpers.exchange.request("get","/market/orders/"+market+"/done",{},session);
    console.log("place orders marketUpdate.openOrders",marketUpdate.openOrders);
    console.log("place orders marketUpdate.tradeHistory",marketUpdate.tradeHistory);
    return {
      market:marketUpdate,
      order:order,
      flag:flag,
      msg:msg,
    //   baseUrl:sails.config.custom.baseUrl,

    };

  }


};
