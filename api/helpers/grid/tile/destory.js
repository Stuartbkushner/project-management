module.exports = {


  friendlyName: 'Delete',


  description: 'Delete tile.',


  inputs: {
    grid_tile_id: {
        description: 'grid_id object posted',
        required: true,
        type: "number",
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    var grid_tile_id = inputs.grid_tile_id;
    var locations = await Location.destroy({location_id:grid_tile_id}).fetch();

		return locations;
  }


};

