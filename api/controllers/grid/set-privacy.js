module.exports = {


  friendlyName: 'Set grid privacy',


  description: 'Set the grid privacy for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    make_private: {
        description: 'The new, unencrypted grid.',
        type: 'boolean',
        required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller setPrivacy",inputs);
    var result = await sails.helpers.grid.action("setPrivacy",this.req);
    console.log("controller setPrivacy",result);
    return result;
   

  }


};
