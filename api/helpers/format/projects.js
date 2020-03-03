module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    projects: {
      description: 'market data that comes from api get market boook call',
      example: '{ "asks": [], "bids": [] }',
      type: "ref",
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var projects = inputs.projects;
    for (let i = 0; i < projects.length; i++) {
        var project = projects[i];
        project = await sails.helpers.format.project(project);
        projects[i] = project;
    }
    return projects;

  }


};

