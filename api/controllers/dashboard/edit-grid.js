module.exports = {


  friendlyName: 'Edit Grid',


  description: '',


  inputs: {
      grid_title: {
        type: 'string',
        // required: true,
      },
      totalSpending: {
        type: 'number',
        model: 'balance',
      },

      totalProfits: {
        type: 'number',
        model: 'balance',
      },

      totalDividends: {
        type: 'number',
        model: 'balance',
      },

      spendingBalance: {
        type: 'number',
        model: 'balance',
      },

      dividendBalance: {
        type: 'number',
        model: 'balance',
      },
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    var grid_id = inputs.grid_id;
    var name = inputs.grid_title;
    var spending = inputs.totalSpending;
    var profits = inputs.totalProfits;
    var dividends = inputs.totalDividends;
    var cost = inputs.spendingBalance;
    var royalties = inputs.dividendBalance;
    console.log(grid_id);
    console.log(name);
    console.log(spending);
    console.log(profits);
    console.log(dividends);
    console.log(cost);
    console.log(royalties);
    /*global Grid, */
    var grid;
    grid = await Grid.update({grid_id:grid_id}).set(inputs);
    console.log(grid);
    return {
      grid:grid,
      success:true
    };

  }


};
