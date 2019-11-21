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
    var grids;
    // if project exists, grab the grids
    if (project_id) {
      /*global Project, a*/
      grids = await Project.find().populate('grids');
      console.log(grids);
      // else, just return an empty object
    } else {
      grids = {};
      console.log(grids);
    }
    return {
      grids:grids,
      project_id:project_id
    };

  }


};
