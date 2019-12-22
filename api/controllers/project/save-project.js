module.exports = {


  friendlyName: 'Save project',


  description: 'Save the project for the logged-in user.',


  inputs: {

    project_id: {
      description: 'project id, undefined if new project',
      example: 'abc123v2',
      required: false
    },
    project_name: {
        description: 'Name of project.',
        example: 'abc123v2',
        required: true
    },
    project_description: {
        description: 'Descriptions of project.',
        example: 'abc123v2',
        required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller saveProject",inputs);
    var result = await sails.helpers.project.action("saveProject",this.req);
    console.log("controller saveProject",result);
    return result;
   

  }


};
