module.exports = {


  friendlyName: 'Save grid',


  description: 'Save the grid for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    state: {
        description: 'The new, unencrypted grid.',
        type: 'boolean',
        required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller setDecisionShown",inputs);
    var result = await sails.helpers.grid.action("setDecisionShown",this.req);
    console.log("controller setDecisionShown",result);
    return result;
   

  }


};
