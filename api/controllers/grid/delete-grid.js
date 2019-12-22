module.exports = {


  friendlyName: 'Delete grid',


  description: 'Delete the grid for the logged-in user.',


  inputs: {

    grid_id: {
      description: 'The new, unencrypted grid.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller deleteGrid",inputs);
    var result = await sails.helpers.grid.action("deleteGrid",this.req);
    console.log("controller deleteGrid",result);
    return result;
   

  }


};
