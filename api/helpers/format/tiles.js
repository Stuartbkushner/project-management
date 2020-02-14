module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    tiles: {
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
    var tiles = inputs.tiles;
    for (let i = 0; i < tiles.length; i++) {
        var tile = tiles[i];
        tile = await sails.helpers.format.tile(tile);
        tiles[i] = tile;
    }
    return tiles;

  }


};

