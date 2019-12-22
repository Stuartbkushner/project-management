module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function () {
      var grids = [
        {
          grid_id: '1',
          grid_title: 'Grid1'
        },
        {
          grid_id: '2',
          grid_title: 'Grid2'
        },
      ]

      var projects = await Project.find();

      var tiles = [
        {
          tile_id: '1',
          tile_title: 'Tile1'
        },
        {
          tile_id: '2',
          tile_title: 'Tile2'
        },
      ]

      var sources = [
        {
          source_id: '1',
          source_filename: 'Source1'
        },
        {
          source_id: '2',
          source_filename: 'Source2'
        },
      ]

      return {
        grids: grids,
        projects: projects, 
        tiles: tiles, 
        sources: sources,
      };

    }
};
