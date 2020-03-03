module.exports = {


  friendlyName: 'Create',


  description: 'Create tile.',


  inputs: {
    tile_id: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
    place_on_grid: {
        description: 'req object posted',
        required: false,
        defaultsTo: false,
        type: "ref",
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var tile_id = inputs.tile_id;
    var place_on_grid = inputs.place_on_grid;
    var grid_tiles = [];
    if(place_on_grid !== false){
      for (let i = 0; i < place_on_grid.length; i++) {
        const grid_id = place_on_grid[i];
        var place_info = {};
        place_info['grid_id'] = grid_id;
        place_info['tile_id'] = tile_id;
        var grid_tile = await sails.helpers.grid.tile.create(place_info); 
        grid_tiles.push(grid_tile);
      }
    }
    return grid_tiles;

  }


};

