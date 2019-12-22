module.exports = {


  friendlyName: 'Lock grid',


  description: 'Lock the grid for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller lockGrid",inputs);
    var result = await sails.helpers.grid.action("lockGrid",this.req);
    console.log("controller lockGrid",result);
    return result;
   

  }


};
