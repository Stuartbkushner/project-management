module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    orders: {
      description: 'order data that comes from api get order boook call',
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
    var orders = inputs.orders;
    var total_asks_supply = 0;
    var total_asks_demand = 0;
    var total_bids_supply = 0;
    var total_bids_demand = 0;
    
    orders.asks.forEach(order => {
        console.log('ask order',order);
        var price = parseFloat(order.price);
        var remainingVolume = parseFloat(order.remainingVolume);
        total_asks_supply += remainingVolume;
        total_asks_demand += remainingVolume * price;
    });
    orders.bids.forEach(order => {
        console.log('bid order',order);
        var price = parseFloat(order.price);
        var remainingVolume = parseFloat(order.remainingVolume);
        total_bids_supply += remainingVolume;
        total_bids_demand += remainingVolume * price;
    });
    orders.total_asks_supply = total_asks_supply;
    orders.total_asks_demand = total_asks_demand;
    orders.total_bids_supply = total_bids_supply;
    orders.total_bids_demand = total_bids_demand;

    console.log(orders);
    return orders;


  }


};

