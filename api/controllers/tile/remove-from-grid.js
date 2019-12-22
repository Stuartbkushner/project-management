module.exports = {


  friendlyName: 'Remove Tile From grid',


  description: 'Remove Tile From grid',


  inputs: {

    grid_tile_id: {
      description: 'The new, unencrypted tile.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller removeFromGrid",inputs);
    var result = await sails.helpers.grid.action("removeFromGrid",this.req);
    console.log("controller removeFromGrid",result);
    return result; 
   

  }


};
