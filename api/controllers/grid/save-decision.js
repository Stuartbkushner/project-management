module.exports = {


  friendlyName: 'Save grid decision',


  description: 'Save the grid decision for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    grid_decision: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller saveDecision",inputs);
    var result = await sails.helpers.grid.action("saveDecision",this.req);
    console.log("controller saveDecision",result);
    return result;
   

  }


};
