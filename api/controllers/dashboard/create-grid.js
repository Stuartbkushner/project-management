module.exports = {


  friendlyName: 'Create grid',


  description: '',


  inputs: {
    grid_title: {
      type: 'string',
      // required: true,
    },


  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    var name = inputs.grid_title;
    /*global Grid, */
    console.log(name);
    var grid;
    grid = await Grid.create(inputs).fetch();
    return {
      grid:grid
    };

  }


};
