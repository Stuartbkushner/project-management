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
          grid_id: '',
          grid_title: ''
        },
        {
          grid_id: '',
          grid_title: ''
        },
      ]

      var projects = [
        {
          project_id: '1',
          project_name: 'Name1'
        },
        {
          project_id: '2',
          project_name: 'Name2'
        },
      ]

      var tiles = [
        {
          tile_id: '',
          tile_title: ''
        },
        {
          tile_id: '',
          tile_title: ''
        },
      ]

      return {
        grids: grids,
        projects: projects, 
        tiles: tiles, 
      };

    }
};
