module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    project: {
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
    var project = inputs.project;
    

    var author = {};
    if(project.team_id == null ){
        author = project.user_id;
        console.log("format project project.user_id",project.user_id);
    }else{
      author = project.team_id;
      console.log("format project project.team_id",project.team_id);
    }
    console.log("format project author",author);
    author.username = author.slug;
    project.author = author;
    return project;
  }


};

