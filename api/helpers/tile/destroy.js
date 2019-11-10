module.exports = {


  friendlyName: 'Delete',


  description: 'Delete tile.',


  inputs: {
    tile_id: {
      description: 'user id of grid owner',
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
    var tile_id = inputs.tile_id;

    var deleted_tile = await Tile.destroy({tile_id:tile_id}).fetch();
    return deleted_tile;
  }


};

