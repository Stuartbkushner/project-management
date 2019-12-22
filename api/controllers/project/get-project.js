module.exports = {


  friendlyName: 'Get project',


  description: 'Get the project for the logged-in user.',


  inputs: {

    project_id: {
      description: 'The new, unencrypted project.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller getProject",inputs);
    var result = await sails.helpers.project.action("getProject",this.req);
    console.log("controller getProject",result);
    return result;
   

  }


};
