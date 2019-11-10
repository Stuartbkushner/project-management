module.exports = {


  friendlyName: 'Delete',


  description: 'Delete grid.',


  inputs: {
    grid_id: {
      description: 'grid id',
      required: true,
      type: "ref",
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var grid_id = inputs.grid_id;
    // //delete locations
    var deleted_locations = await Location.destroy({grid_id:grid_id});
    var deleted_grid = await Grid.destroy({grid_id:grid_id}).fetch();
    return deleted_grid;

  }


};

