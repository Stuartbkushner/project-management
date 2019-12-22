module.exports = {


  friendlyName: 'Get project',


  description: 'Get the project for the logged-in user.',


  inputs: {

    project_id: {
      description: 'The new, unencrypted project.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    var project_id =  inputs.project_id
    //get project
    console.log("get project inputs",inputs);
    var project = {
        project_id : 1,
        project_title : "Test Project Data",
        project_type : "project",
        project_version : 0,
        project_version : 0,
        project_version : 0,
        project_lock_user_id : 0,
        project_decision_shown : 0,
        project_slug : "test-project",
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
            tile_project_id : 1,
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
        project : project,
      };
   

  }


};
