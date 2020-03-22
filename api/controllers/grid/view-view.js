module.exports = {


  friendlyName: 'View view',


  description: 'Display "View" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/grid/view'
    }

  },


  fn: async function () {

    // Respond with view.
    var me = this.req.me;
    if(me){
      var projects = await Project.find({user_id:me.user_id}).populate("user_id");
      console.log("view grid me.user_id",me.user_id);
      var grids = await Grid.find({user_id:me.user_id});
      var public = 0;
    }else{
      var projects = [];
      var grids = [];
      var public = 1;
    }

    projects = await sails.helpers.format.projects(projects);



    var gridSlug = this.req.param("gridSlug");
    console.log("view grid view grid gridSlug",gridSlug);
    var grid = await sails.helpers.grid.get(gridSlug);
    var project = grid.project;

    /*
      must load project
      User.data.pile_tiles = project.tiles;
      User.data.grids = project.grids;
      User.data.sources = project.sources;
      User.data.outlines = project.outlines;
      User.data.published = project.published;
      User.data.templates = project.templates;
      User.data.grid_groups = project.grid_groups;
      User.data.settings.current_project_url =  project.user_url +'/'+project.slug;
    */
    project.grids = grids;
    grid.groups = [];
    console.log("view grid grid",grid);
    console.log("view grid grids",grids);

    // var grid = {
    //   grid_id : 1,
    //   grid_title : "Test Data",
    //   grid_type : "grid",
    //   grid_version : 0,
    //   grid_version : 0,
    //   grid_version : 0,
    //   grid_lock_user_id : 0,
    //   grid_decision_shown : 0,
    //   grid_slug : "test-grid",
    //   tiles : [
    //     {
    //       tile_id:1,
    //       tile_title : "Test Tile",
    //       tile_color : "#fff",
    //       tile_content : "test-tile",
    //       tile_active : 0,
    //       tile_starred : true,
    //       tile_version : 0,
    //       tile_type : "tile",
    //       tile_video : "",
    //       tile_grid_id : 1,
    //       location_id : 1,
    //       x : 1,
    //       y : 1,
    //       user_first : "Tony",
    //       user_last : "Sparks",
    //       tags : [
    //         {
    //           tag_id : 1,
    //           tag_content : "test",
    //         }
    //       ],
    //       groups:[],
    //     }
    //   ],
    //   updated_at : "jan 5th ",
    // }
    // var project = {
    //   project_id : 1,
    //   project_title : "Test Project Data",
    //   project_type : "project",
    //   project_version : 0,
    //   project_version : 0,
    //   project_version : 0,
    //   project_lock_user_id : 0,
    //   project_decision_shown : 0,
    //   project_slug : "test-project",
    //   tiles : [
    //     {
    //       tile_id:1,
    //       tile_title : "Test Tile",
    //       tile_color : "#fff",
    //       tile_content : "test-tile",
    //       tile_active : 0,
    //       tile_starred : true,
    //       tile_version : 0,
    //       tile_type : "tile",
    //       tile_video : "",
    //       tile_project_id : 1,
    //       location_id : 1,
    //       x : 1,
    //       y : 1,
    //       user_first : "Tony",
    //       user_last : "Sparks",
    //       tags : [
    //         {
    //           tag_id : 1,
    //           tag_content : "test",
    //         }
    //       ],
    //       groups:[],
    //     }
    //   ],
    //   updated_at : "jan 5th ",
    // }
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
			state: "loadGrid",
			state_data: {
        grid:grid,
        project:project,
      },
			team_id: "0",
			team_leader_id: "0",
			team_slug: "0",
			url: "",
			user_first: "Mosaic",
			user_id: "0",
			user_last: "Junction",
      username: "MosaicJunction",
      active_grid : grid,
      global_grid_groups : { 
        templates : [],
      }, 
      grids:grids,
      projects:projects
    }
    user.parent_user = user ;
    console.log("view grid user.grids",user.grids);

    return {
      user : user,
      grid : grid,
      grids:user.grids,
      projects:projects,
    };

  }


};
