module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    tile_id: {
      description: 'The new, unencrypted tile.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller delete-tile-single",inputs);
    var result = await sails.helpers.tile.action("deleteTile",this.req);
    console.log("controller delete-tile-single",result);
    return result;
   

  }


};
