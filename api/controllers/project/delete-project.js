module.exports = {


  friendlyName: 'Delete project',


  description: 'Delete the project for the logged-in user.',


  inputs: {

    project_id: {
      description: 'project id, undefined if new project',
      example: 'abc123v2',
      required: true
    },



  },


  fn: async function (inputs) {

    console.log("controller deleteProject",inputs);
    var result = await sails.helpers.project.action("deleteProject",this.req);
    console.log("controller deleteProject",result);
    return result;
   

  }


};
