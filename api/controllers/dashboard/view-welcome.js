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

      var grids = await Grid.find({grid_type:"grid"});
      var templates = await Grid.find({grid_type:"template"});
      var published = await Grid.find({grid_type:"published"});

      var projects = await Project.find().populate("user_id");

      // var tiles = await Tile.find();

      var sources = await Source.find().populate("project_id").populate("team_id").populate("user_id");
      var project = {
        project_id: '1',
        project_name: 'Project1',
        slug: 'Slug1',
        user_id: {
          slug: 'Slug1',
        }
      };
      // var grids = [
      //   {
      //     grid_id: '1',
      //     grid_title: 'Grid1',
      //     slug: 'Slug1',
      //     user_id: {
      //       slug: 'Slug1',
      //     },
      //     project_id: {
      //       slug: 'Slug1',
      //     },
      //     team_id: {
      //       slug: 'Team1',
      //     }
      //   },
      //   {
      //     grid_id: '2',
      //     grid_title: 'Grid2',
      //     slug: 'Slug2',
      //     user_id: {
      //       slug: 'Slug2',
      //     },
      //     project_id: {
      //       slug: 'Slug2',
      //     },
      //   },
      // ]
      // var projects = [
      //   {
      //     project_id: '1',
      //     project_name: 'Project1',
      //     slug: 'Slug1',
      //     user_id: {
      //       slug: 'Slug1',
      //     }
      //   },
      //   {
      //     project_id: '2',
      //     project_name: 'Project2',
      //     slug: 'Slug2',
      //     user_id: {
      //       slug: 'Slug2',
      //     }
      //   },
      // ]
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

  
      // var sources = [
      //   {
      //     source_id: '1',
      //     source_filename: 'Source1',
      //     slug: 'Slug1',
      //     user_id: {
      //       slug: 'Slug1',
      //     },
      //     project_id: {
      //       slug: 'Slug1',
      //     },
      //     team_id: {
      //       slug: 'Team1',
      //     }
      //   },
      //   {
      //     source_id: '2',
      //     source_filename: 'Source2',
      //     slug: 'Slug2',
      //     user_id: {
      //       slug: 'Slug2',
      //     },
      //     project_id: {
      //       slug: 'Slug2',
      //     },
      //   },
      // ];
      // var templates = await Grid.find({project_id:project.project_id, grid_type:"template"});
      // var published = await Grid.find({project_id:project.project_id, grid_type:"published"});
  
      // var projects = await Project.find().populate("user_id");
  
      //   var tiles = await Tile.find();
  
      //   var sources = await Source.find();
      // var published = [
      //   {
      //     grid_id: '1',
      //     grid_title: 'Grid1',
      //     slug: 'Slug1',
      //     user_id: {
      //       slug: 'Slug1',
      //     },
      //     project_id: {
      //       slug: 'Slug1',
      //     },
      //     team_id: {
      //       slug: 'Team1',
      //     }
      //   },
      //   {
      //     grid_id: '2',
      //     grid_title: 'Grid2',
      //     slug: 'Slug2',
      //     user_id: {
      //       slug: 'Slug2',
      //     },
      //     project_id: {
      //       slug: 'Slug2',
      //     },
      //   },
      // ]
      // var templates = [
      //   {
      //     grid_id: '1',
      //     grid_title: 'Grid1',
      //     slug: 'Slug1',
      //     user_id: {
      //       slug: 'Slug1',
      //     },
      //     project_id: {
      //       slug: 'Slug1',
      //     },
      //     team_id: {
      //       slug: 'Team1',
      //     }
      //   },
      //   {
      //     grid_id: '2',
      //     grid_title: 'Grid2',
      //     slug: 'Slug2',
      //     user_id: {
      //       slug: 'Slug2',
      //     },
      //     project_id: {
      //       slug: 'Slug2',
      //     },
      //   },
      // ]


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
        published: published,
        templates: templates,
        grids: grids,
        projects: projects, 
        tiles: tiles, 
        sources: sources,
        user: user,
        public: public,
      };

    }
};
