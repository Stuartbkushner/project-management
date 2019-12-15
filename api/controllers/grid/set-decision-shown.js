module.exports = {


  friendlyName: 'Save grid',


  description: 'Save the grid for the logged-in user.',


  inputs: {
    grid_id: {
        description: 'The new, unencrypted grid.',
        example: 'abc123v2',
        required: true
    },
    state: {
        description: 'The new, unencrypted grid.',
        type: 'boolean',
        required: true
    },


  },


  fn: async function (inputs) {

    var grid_id =  inputs.grid_id
    //get grid
    console.log("get grid inputs",inputs);
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
      return {
        grid : grid,
      };
   

  }


};
