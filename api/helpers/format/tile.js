module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    tile: {
      description: 'market data that comes from api get market boook call',
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
    var tile = inputs.tile;
    var author = {
        user_id : tile.user_id,
        user_first : "test",
        user_last : "test",
        // user_first : tile.user_id.user_first,
        // user_last : tile.user_id.user_last,
    }
    console.log("format tile author",author);
    tile.author = author;
    tile.user_first = tile.author.user_first;
    tile.user_last = tile.author.user_last;
    tile.user_id = author.user_id;
    tile.tile_share = [];
    
    if(tile.grids){
      tile.tile_grids = tile.grids;
    }else{
      tile.tile_grids = [];
    }
    if(tile.annotations){
      tile.tile_source_anno = tile.annotations;
    }else{
      tile.tile_source_anno = [];
    }
    
    return tile;
  }


};

