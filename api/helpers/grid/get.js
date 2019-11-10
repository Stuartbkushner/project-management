module.exports = {


  friendlyName: 'Get grid',


  description: 'Get grid.',


  inputs: {
    grid_id: {
      description: 'id of grid being got',
      required: true,
      type: "number",
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
    var grid = await Grid.findOne({grid_id:grid_id})
        .populate("user_id")
        // .populate("team_id")
        .populate("tiles")
        .populate("floating_tiles")
        .populate("grid_groups")
        // .populate("tile_groups")
        // .populate("sources")
        .populate('locations');
    if(lock){
        grid.grid_version++;
        await Grid.update({grid_id:grid_id})
            .set({grid_version:grid.grid_version,lock_user_id:lock_user_id })
    }
    return grid;
  }


};

