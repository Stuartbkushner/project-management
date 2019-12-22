module.exports = {


  friendlyName: 'Unlock grid',


  description: 'Unlock the grid for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller unlockGrid",inputs);
    var result = await sails.helpers.grid.action("unlockGrid",this.req);
    console.log("controller unlockGrid",result);
    return result;
   

  }


};
