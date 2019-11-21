module.exports = {


  friendlyName: 'View project',


  description: 'Display "Project" page.',

  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/project'
    }

  },


  fn: async function () {


    // Respond with view.
    var project_id = this.req.param('project_id');
    console.log(project_id);
    // if project exists, grab the grids

    return {};

  }


};
