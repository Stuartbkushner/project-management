module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    tile: {
      description: 'title object.',
      type: 'ref',
      required: true
    },
    grid_tile: {
      description: 'title object.',
      type: 'ref',
      required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller add-grid-tile",inputs);
    var result = await sails.helpers.grid.action("addGridTile",this.req);
    console.log("controller add-grid-tile",result);
    return result;
   

  }


};
