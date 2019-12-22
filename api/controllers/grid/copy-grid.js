module.exports = {


  friendlyName: 'Copy grid',


  description: 'Copy the grid for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    grid_title: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    grid_description: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    project_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    }, 

  },


  fn: async function (inputs) {

    console.log("controller copyGrid",inputs);
    var result = await sails.helpers.grid.action("copyGrid",this.req);
    console.log("controller copyGrid",result);
    return result;
   

  }


};
