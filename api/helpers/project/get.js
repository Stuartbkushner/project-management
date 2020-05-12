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
        .populate('locations')
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

    var tiles = {};
    for (let i = 0; i < project.tiles.length; i++) {
      var tile = project.tiles[i];
      const tile_id = tile.tile_id;
      console.log("get projet tile",tile);
      tiles[tile_id] = tile;
    }
    console.log("get projet tiles",tiles);
    console.log("get projet project.locations",project.locations);


    var locations = {};
    for (let i = 0; i < project.locations.length; i++) {
      var location = project.locations[i];
      const grid_id = location.grid_id;
      const tile_id = location.tile_id;
      var tile = tiles[tile_id];
      tile = Object.assign(tile, location);
      console.log("get projet location",location);
      console.log("get projet final tile",tile);
      if(locations[grid_id]){
        locations[grid_id].push(tile);
      }else{
        locations[grid_id] = [tile]
      }
    }
    console.log("get projet locations",locations);

    for (let i = 0; i < project.grids.length; i++) {
      var grid = project.grids[i];
      var grid_id = grid.grid_id;
      if( locations[grid_id]){
        project.grids[i].tiles = locations[grid_id];
      }else{
        project.grids[i].tiles = [];
      }
      console.log("get projet load tiles i",i);
      console.log("get projet load tiles project.grids[i].tiles",project.grids[i].tiles);
      
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

