module.exports = {


  friendlyName: 'Create grid',


  description: '',


  inputs: {
    grid_title: {
      type: 'string',
      // required: true,
    },
    totalSpending: {
      model: 'balance'
    },

    totalProfits: {
      model: 'balance'
    },

    totalDividends: {
      model: 'balance'
    },

    spendingBalance: {
      model: 'balance'
    },

    dividendBalance: {
      model: 'balance'
    },


  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    var name = inputs.grid_title;
    var spending = inputs.totalSpending;
    var profits = inputs.totalProfits;
    var dividends = inputs.totalDividends;
    var cost = inputs.spendingBalance;
    var royalties = inputs.dividendBalance;
    console.log(name);
    console.log(spending);
    console.log(profits);
    console.log(dividends);
    console.log(cost);
    console.log(royalties);

    /*global Grid, */
    var grid;
    grid = await Grid.create(inputs).fetch();
    console.log(grid);
    return {
      grid:grid,
      success:true
    };

  }


};
