module.exports = {


  friendlyName: 'Get grid',


  description: 'Get the grid for the logged-in user.',


  inputs: {

    project_id: {
      description: 'The new, unencrypted grid.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller getGrids",inputs);
    var result = await sails.helpers.grid.action("getGrids",this.req);
    console.log("controller getGrids",result);
    return result;
   

  }


};
