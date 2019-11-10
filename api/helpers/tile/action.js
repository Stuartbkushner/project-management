module.exports = {


  friendlyName: 'Action',


  description: 'Action tile.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var action = inputs.action;
    var req = inputs.req;
    var result = inputs.result;
    var post = inputs.req;
    user_id = req.me ? req.me.user_id : 0;


    switch(action) {

      case "saveTile": // saveTile
        post['tile']['user_id'] = user_id;
        new_tile = await sails.helpers.tile.create(post['tile'],post['tile']['tile_place_on_grid']) ;
        result = new_tile;
        break;
      case "saveHeader":
        post['tile']['user_id'] = user_id;
        new_tile = await sails.helpers.tile.create(post['tile']) ;
        result = new_tile;
        break;
      case "getTile": // used to be getNOte
        tile_id = intval(post['tile_id']);
        // tile = await sails.helpers.tile.get(tile_id) ;
        tile = await Tile.findOne({tile_id:tile_id}).populate("tags").populate("annotations").populate("grids").populate("groups");
        result = tile; // idk where this is being echoed out but it is somewhere.
        break;
      case "starTile": // used to be StarNote
        tile_info = post['tile'];
        tile_id = tile_info['tile_id'];
        tile_state = post['tile_state'];
        if (tile_state =='false') {
          update['tile_starred'] = 1;
        }else{
          update['tile_starred'] = 0;
        }
        tile = await sails.helpers.tile.update(tile_id,update) ;
        result = tile;
        break;
      case "updateTile": // used to be StarNote
        tile = await sails.helpers.tile.update(post['tile_id'],post['update'],post['tile_place_on_grid']) ;
        result = tile;
        break;
      case "deleteTile": // used to be deleteNote
        tile = await sails.helpers.tile.destory(post['tile_id']) ;
        result = tile;	
        break;
      case "deleteTileSingle": // used to be deleteNote
        tile = await sails.helpers.tile.destory(post['tile_id']) ;
        result = tile;	
        break;
      // case "copyTileToProject":
      //   tile_info = post['tile'];
      //   tile_id = tile_info['tile_id'];
      //   update['project_id'] = post['project_id'];
      //   new_tile = await sails.helpers.tile.copy(tile_id,update) ;
      //   result = new_tile;
      //   break;
      
      default:
        break;
    } //end switch
  }


};



