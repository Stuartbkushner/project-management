module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    project_id: {
      description: 'The new, unencrypted project.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller get-pile",inputs);
    var result = await sails.helpers.project.action("getPile",this.req);
    console.log("controller get-pile",result);
    return result;   

  }


};
