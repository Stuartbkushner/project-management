module.exports = {


  friendlyName: 'Get',


  description: 'Get user.',


  inputs: {
    where: {
      description: 'The email address of the primary recipient.',
      extendedDescription: 'If this is any address ending in "@example.com", then don\'t actually deliver the message. '+
        'Instead, just log it to the console.',
      required: true,
      type: "ref",

    },
    public: {
      description: 'is this public usage',
      required: false,
      defaultsTo: true,
      type: "boolean",
    },


  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var where = inputs.where;
    var public = inputs.public;
    /*
      get author info and get projects
      if pulbic only get projects with published gris
    */
    if(public){
        var projects = [];
        var all_projects = await Project.find(where)
            .populate("user_id")
            .populate("team_id")
            .populate('grids',{grid_type:"published"});
        all_projects.forEach(function(project) {
            console.log(project);
            if(project.grids.length > 0){
                projects.push(project);
            }
        });

    }
    else{
        var projects = await Project.find(where)
            .populate("user_id")
            .populate("team_id")
    }
    for (var i = 0, len = projects.length; i < len; i++) {
        var author = {};
        if(projects[i].team_id !== null && projects[i].team_id > 0 ){
            author = projects[i].team_id;
        }else{
            author = projects[i].user_id;
        }
        projects[i].author = author;
    }
    
    return projects;
  }


};

