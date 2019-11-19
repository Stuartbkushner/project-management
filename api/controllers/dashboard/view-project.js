module.exports = {


  friendlyName: 'View project',


  description: 'Display "Project" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/project'
    }

  },


  fn: async function () {

    project = [
      {
        name:'1'
      },
      {
        name:'2'
      },
    ]

    // Respond with view.
    return {
      project: project
    };

  }


};
