module.exports = {


  friendlyName: 'View project',


  description: 'Display "Project" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/project'
    }

  },


  fn: async function () {
    var projects = [
      {
        project_id: '1',
        project_name: 'Name1',
        project_description: 'Des1',
        project_version: 'V1',
        project_order: 'O1',
        //project_id.grids: '1234'

      },
      {
        project_id: '2',
        project_name: 'Name2',
        project_description: 'Des2',
        project_version: 'V1',
        project_order: 'O2',
      },
    ]

    return {
      projects: projects, 
    };

  }


};
