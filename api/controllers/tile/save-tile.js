module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    tile: {
      description: 'title object.',
      type: 'ref',
      required: true
    },


  },


  fn: async function (inputs) {

    var tile_id =  inputs.tile_id
    //get tile
    console.log("get tile inputs",inputs);
    var tile = {
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
    };
    console.log("get tile tile",tile);


    return tile;
   

  }


};
