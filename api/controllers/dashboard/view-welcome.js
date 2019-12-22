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
      ];


      var public = true;
      var user = {
        active_tab_type: "project",
        author: {user_first: "Mosaic", user_last: "Junction", user_id: "0", slug: "", invite_cnt: "0", },
        contact_email: undefined,
        contact_name: undefined,
        grid_groups_dict: {},
        invite_cnt: "0",
        message: undefined,
        name: "Mosaic Junction",
        phone: undefined,
        projects:  [],
        public: public,
        settings: {current_project_id: 1, outline_cnt: 0, publish_cnt: 0, timer: 0},
        slug: "",
        state: "public",
        state_data: {
        },
        team_id: "0",
        team_leader_id: "0",
        team_slug: "0",
        url: "",
        user_first: "Mosaic",
        user_id: "0",
        user_last: "Junction",
        username: "MosaicJunction",
        active_grid : {},
        global_grid_groups : { 
          templates : [],
        }
      }
  

      return {
        grids: grids,
        projects: projects, 
        tiles: tiles, 
        sources: sources,
        user: user,
        public: public,
      };

    }
};
