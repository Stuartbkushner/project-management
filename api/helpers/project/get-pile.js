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
      var publicGrids = await Grid.find({project_id:project_id,grid_type:"published"}).populate("tiles");
      var tiles = [];
      for (let i = 0; i < publicGrids.length; i++) {
        const grid = publicGrids[i];
        tiles = tiles.concat(grid.tiles);
      }
    }else{
      var project = await Project.findOne({project_id:project_id})
        .populate("tiles")
      var tiles = project.tiles;
    }
    var tile_ids = [];
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      tile_ids.push(tile.tile_id);
      
    }
    tiles = await sails.helpers.tile.get(tile_ids);
    
    return tiles;
  }


};

