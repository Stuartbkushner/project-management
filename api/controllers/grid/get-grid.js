module.exports = {


  friendlyName: 'Get grid',


  description: 'Get the grid for the logged-in user.',


  inputs: {

    grid_id: {
      description: 'The new, unencrypted grid.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller getGrid",inputs);
    var result = await sails.helpers.grid.action("getGrid",this.req);
    console.log("controller getGrid",result);
    return result;
   

  }


};
