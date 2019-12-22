module.exports = {


  friendlyName: 'Update tile',


  description: 'Update the tile for the logged-in user.',


  inputs: {

    tile_id: {
      description: 'tile id.',
      example: 'abc123v2',
      required: true
    },
    update: {
        description: 'tile update info.',
        type: 'ref',
        required: true
    },
    tile_place_on_grid: {
        description: 'grid to place tile on',
        example: 'abc123v2',
        required: false
    },

  },


  fn: async function (inputs) {

    console.log("controller updateTile",inputs);
    var result = await sails.helpers.tile.action("updateTile",this.req);
    console.log("controller updateTile",result);
    return result;
   

  }


};
