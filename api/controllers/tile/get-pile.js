module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    project_id: {
      description: 'The new, unencrypted project.',
      example: 'abc123v2',
      required: true
    }

  },


  fn: async function (inputs) {

    var project_id =  inputs.project_id
    //get tile
    console.log("get tiles inputs",inputs);
    var tiles = [
        {
            tile_id:1,
            tile_title : "Test Tile",
            tile_color : "#fdf8c5",
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
            tile_source_anno : [],
            tile_share : ["Tony@yohshow.com"],
            tile_grids : []
        }
    ];
    console.log("get tiles tiles",tiles);


    return tiles;
   

  }


};
