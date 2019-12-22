module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    grid: {
      description: 'Tiles to add to group',
      type: 'ref',
      required: true
    },
    grid_tile_ids: {
      description: 'Tiles to add to group',
      type: 'ref',
      required: true
    },

  },


  fn: async function (inputs) {

    console.log("controller moveGridTile",inputs);
    var result = await sails.helpers.grid.action("moveToNewGrid",this.req);
    console.log("controller moveGridTile",result);
    return result; 
   

  }


};
