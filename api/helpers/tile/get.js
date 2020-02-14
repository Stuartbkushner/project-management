module.exports = {


  friendlyName: 'Get',


  description: 'Get tile.',


  inputs: {
    tile_ids: {
      description: 'array of tile ids or tile id',
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
    var tile_ids = inputs.tile_ids;
    if(typeof tile_ids == "array"){
      var tiles = await Tile.find({tile_id:tile_ids})
            .populate("user_id")
            // .populate("team_id")
            .populate("tags")
            .populate("groups");
      tiles = await sails.helpers.format.tiles(tiles);
      return tiles;
    }else{
      var tile = await Tile.findOne({tile_id:tile_ids})
            .populate("user_id")
            // .populate("team_id")
            .populate("tags")
            .populate("groups");
      tile = await sails.helpers.format.tile(tile);
      return tile;
    }
    
    
    
  }


};

