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
    return {};

  }


};
