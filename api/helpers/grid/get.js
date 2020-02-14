module.exports = {


  friendlyName: 'Get grid',


  description: 'Get grid.',


  inputs: {
    grid_id: {
      description: 'id of grid or slug',
      required: true,
      type: "ref",
    },
    lock: {
        description: 'should grid be locked',
        required: false,
        type: "boolean",
        defaultsTo: false,
    },
    lock_user_id: {
        description: 'user id of user locking the grid',
        required: false,
        type: "number",
    },


  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var grid_id = inputs.grid_id;
    var lock = inputs.lock;
    var lock_user_id = inputs.lock_user_id;
    console.log("helpers grid get grid_id",grid_id);
    if(typeof grid_id == "string"){
      var grid = await Grid.findOne({slug:grid_id})
          .populate("user_id")
          // .populate("team_id")
          .populate("tiles")
          .populate("floating_tiles")
          .populate("grid_groups")
          // .populate("tile_groups")
          // .populate("sources")
          .populate('locations');
    }else{
      var grid = await Grid.findOne({grid_id:grid_id})
          .populate("user_id")
          // .populate("team_id")
          .populate("tiles")
          .populate("floating_tiles")
          .populate("grid_groups")
          // .populate("tile_groups")
          // .populate("sources")
          .populate('locations');
    }
    var project = await Project.findOne({project_id:grid.project_id}).populate("user_id").populate("tiles");
    project.author  = {
      user_id : project.user_id,
      user_first : project.user_id.user_first,
      user_last : project.user_id.user_last,
    }
    var tileIds = [];
    for (let i = 0; i < project.tiles.length; i++) {
      const tile = project.tiles[i];
      tileIds.push(tile.tile_id);
    }
    var tiles = await Tile.find({tile_id:tileIds})
          .populate("user_id")
          // .populate("team_id")
          .populate("tags")
          .populate("groups");
    var tiles_dict = {};
    var project_tiles = [];

    for (let i = 0; i < tiles.length; i++) {
      var tile = tiles[i];
      tile = await sails.helpers.format.tile(tile);
      tiles_dict[tile.tile_id] = tile;
      project_tiles.push(tile);
    }
    project.tiles = project_tiles;
    project.pile_tiles = project_tiles;
    var _tiles = [];

    for (let i = 0; i < grid.locations.length; i++) {
      const location = grid.locations[i];
      const tile_id = location.tile_id;
      var tile = tiles_dict[tile_id];
      tile.tile_grid_id = tile.location_id;
      tiles_dict[tile.tile_id] = tile;
      
      tile = Object.assign(location,tile);

      console.log("get grid tile tile",tile);


      _tiles.push(tile);
    }
    grid.tiles = _tiles;

    if(lock){
        grid.grid_version++;
        await Grid.update({grid_id:grid_id})
            .set({grid_version:grid.grid_version,lock_user_id:lock_user_id })
    }
    grid.project = project;
    return grid;
  }


};

