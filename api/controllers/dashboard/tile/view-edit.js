module.exports = {


  friendlyName: 'View edit',


  description: 'Display "Edit" page.',

  inputs: {
      tile_title: {
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

    success: {
      viewTemplatePath: 'pages/dashboard/tile/edit'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
