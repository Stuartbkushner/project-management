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

    var grid = {
      grid_id : 1,
      grid_title : "Test Data",
      grid_type : "grid",
      grid_version : 0,
      grid_version : 0,
      grid_version : 0,
      grid_lock_user_id : 0,
      grid_decision_shown : 0,
      grid_slug : "test-grid",
      tiles : [
        {
          tile_id:1,
          tile_title : "Test Tile",
          tile_color : "#fff",
          tile_content : "test-tile",
          tile_active : 0,
          tile_starred : true,
          tile_version : 0,
          tile_type : "tile",
          tile_video : "",
          tile_grid_id : 1,
          location_id : 1,
          x : 1,
          y : 1,
          user_first : "Tony",
          user_last : "Sparks",
          tags : [
            {
              tag_id : 1,
              tag_content : "test",
            }
          ],
          groups:[],
        }
      ],
      updated_at : "jan 5th ",
    }
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
			public: "1",
			settings: {current_project_id: 1, outline_cnt: 0, publish_cnt: 0, timer: 0},
			slug: "",
			state: "loadGrid",
			state_data: {
        grid:grid,
        project:grid,
      },
			team_id: "0",
			team_leader_id: "0",
			team_slug: "0",
			url: "",
			user_first: "Mosaic",
			user_id: "0",
			user_last: "Junction",
      username: "MosaicJunction",
      active_grid : grid
    }
    return {
      user : user,
      grid : grid,
    };

  }


};
