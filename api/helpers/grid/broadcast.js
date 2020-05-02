module.exports = {


  friendlyName: 'Broadcast',


  description: 'Broadcast grid.',


  inputs: {
    req: {
        description: 'id of grid or slug',
        required: true,
        type: "ref",
    },
    grid_id: {
        description: 'id of grid or slug',
        required: true,
        type: "ref",
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    var grid_id = inputs.grid_id;
    var req = inputs.req;
    grid = await sails.helpers.grid.get(grid_id) ;
    gridUpdate = {
        grid:grid,
        pile_tiles:grid.project.pile_tiles
    };
    console.log("gridUpdate",gridUpdate);
    await sails.sockets.broadcast("grids", grid_id, gridUpdate, req);

    return {
        grid:grid
    };
  }


};

