module.exports = {


  friendlyName: 'Stare tile',


  description: 'Stare the tile for the logged-in user.',


  inputs: {

    tile: {
      description: 'title object.',
      type: 'ref',
      required: true
    },
    tile_state: {
      description: 'is tile stared',
      type: 'boolean',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller starTile",inputs);
    var result = await sails.helpers.tile.action("starTile",this.req);
    console.log("controller starTile",result);
    return result;
   

  }


};
