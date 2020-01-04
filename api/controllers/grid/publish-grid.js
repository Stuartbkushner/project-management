module.exports = {


  friendlyName: 'Publish grid',


  description: 'Publish the grid for the logged-in user.',


  inputs: {

    grid_id: {
      description: 'The new, unencrypted grid.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller publishGrid",inputs);
    var result = await sails.helpers.grid.action("publishGrid",this.req);
    console.log("controller publishGrid",result);
    return result;
   

  }


};
