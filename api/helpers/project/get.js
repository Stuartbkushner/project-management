module.exports = {


  friendlyName: 'Get',


  description: 'Get user.',


  inputs: {
    project_id: {
      description: 'project id',
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
    var project_id = inputs.project_id;
    var public = inputs.public;
    if(public){
      var project = await Project.findOne({project_id:project_id})
        .populate("user_id")
        .populate("team_id")
        // .populate("tiles")
        // .populate("grid_groups")
        // .populate("tile_groups")
        // .populate("sources")
        // .populate('grids')
        // .populate('locations')
        .populate('grids',{grid_type:"published"});
        //load tiles, grid groups and tile groups, locations, sorouces 
    }else{
      var project = await Project.findOne({project_id:project_id})
        .populate("user_id")
        .populate("team_id")
        .populate("tiles")
        .populate("grid_groups")
        .populate("tile_groups")
        .populate("sources")
        .populate('grids')
        .populate('locations');
    }
    

    var author = {};
    if(project.team_id == null ){
        author = project.user_id;
        console.log("project project.user_id",project.user_id);


    }else{
      author = project.team_id;
      console.log("project project.team_id",project.team_id);

    }
    console.log("project author",author);
    author.username = author.slug;
    project.author = author;
    
    return project;
  }


};

