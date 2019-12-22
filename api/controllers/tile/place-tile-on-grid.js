module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    grid_id: {
      description: 'Tiles to add to group',
      type: 'ref',
      required: true
    },
    tile_ids: {
      description: 'Tiles to add to group',
      type: 'ref',
      required: true
    },

  },


  fn: async function (inputs) {

    console.log("controller placeTileOnGrid",inputs);
    var result = await sails.helpers.grid.action("placeTileOnGrid",this.req);
    console.log("controller placeTileOnGrid",result);
    return result; 
   

  }


};
