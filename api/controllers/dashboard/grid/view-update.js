module.exports = {


  friendlyName: 'View update',


  description: 'Display "Update" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/grid/update'
    }

  },


  fn: async function () {

    // Respond with view.
    var grid_id = this.req.param('grid_id');
    var newGrid = grid_id ? false : true;
    var grid;
    console.log(grid_id);
    console.log(newGrid);
    if (grid_id) {
      /*global Grid, */
      grid = await Grid.findOne({grid_id:grid_id});
      console.log(grid);
    } else {
      grid = {};
      console.log(grid);
    }

    return {
      grid:grid,
      newGrid:newGrid,
      grid_id:grid_id,
    };

  }


};
