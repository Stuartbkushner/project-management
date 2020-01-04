module.exports = {


  friendlyName: 'Action',


  description: 'Action grid.',


  inputs: {
    action: {
      description: 'action of grid',
      required: true,
      type: "string",
    },
    req: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
    result: {
        description: 'req object posted',
        type: "ref",
        defaultsTo: {},
    },

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
    var post = inputs.req.body;
    var user_id = req.me ? req.me.user_id : 0;
    var team_id = req.session.team_id ? req.session.team_id: 0;


    switch(action) {
      case "setPrivacy":
        
        var update = {};
        if (post['make_private'] == 0) {
          update['grid_privacy_user_id'] = 0;
          //update['grid_lock_user_id'] = 0;
        }else{
          update['grid_privacy_user_id'] = user_id;
          //update['grid_lock_user_id'] = user_id;
        }
        grid_update = Grid.update({id:post['grid_id']},update);
        result = grid_update;
      break;
      case "setDecisionShown":
        result = Grid.update({id:post['grid_id']},{grid_decision_shown : post['state']});
      break;
      case "saveDecision":
        result = Grid.update({id:post['grid_id']},{grid_decision : post['decision']});
      break;
      // case "publishGrid":
      //   result = Grid.publish(post);
      // break;
      case "saveContact":
        publish = new Publish_Helper();
        result = await sails.helpers.updateContact(user_id,team_id,post);
      break;
      
      case "getGrids":
        project = await sails.helpers.project.get(post['project_id'],false) ;
        result = project;
      break;
      

      case "addGridTile": 
        
        var grid_tile = post['grid_tile'];
        var tile_id = parseInt(grid_tile['tile_id']);

        if(post['tile']['tile_place_on_grid'])
        {
          var tile_place_on_grid = post['tile']['tile_place_on_grid'];
        }
        else
        {
          var tile_place_on_grid = false;
        }

        if (  tile_id == 0   ) {
          post['tile']['user_id'] = user_id;
          new_tile = await sails.helpers.tile.create(post['tile'],tile_place_on_grid) ;
          grid_tile['tile_id'] = new_tile.tile_id;
          grid_tile = await sails.helpers.grid.tile.create(grid_tile); 
        }
        else {
          grid_tile = await sails.helpers.grid.tile.create(grid_tile) ;
          
        }
        result = grid_tile;
        break;
      case "placeTileOnGrid":
        var grid_id = post['grid_id'];
        var tiles = []; 
        for (let i = 0; i < post['tile_ids'].length; i++) {
          const tile_id = post['tile_ids'][i];
          info = {
            "tile_id": tile_id,
            "grid_id": grid_id
          };
          tiles.push(await sails.helpers.grid.tile.create(info) );

          
        }
        new_grid = await sails.helpers.grid.get(grid_id);
        result = new_grid;
        break;
      case "moveGridTile":
          // var location = await sails.helpers.grid.tile.update(post);
          var location = await sails.helpers.grid.tile.move(post);
          result = location;
        break;
      case "saveGrid":
        
        info = post['grid'];
        grid_id = parseInt(info['grid_id']);
        if (grid_id == 0 ) {
          grid_template_id = parseInt(info['grid_template']);
          if (grid_template_id == 0 ) {
            new_grid = await sails.helpers.grid.create(user_id,post['grid']) ;
            if (post['grid_tiles']) {
              new_grid_tiles = await sails.helpers.grid.tile.createBatch(post['grid_tiles'],new_grid.grid_id) ;
            }
          }else{
            info['grid_type'] = 'grid';
            new_grid = await sails.helpers.grid.copy(grid_template_id,info) ;
          }
        }
        else{
          new_grid = await sails.helpers.grid.update(grid_id,post['grid']);
        }
        
        result = new_grid;
        break;
      // case "unlockGrid":
      //   grid = await sails.helpers.grid.unlock(post['grid_id']) ;
      //   result = grid;
      //   break;
      // case "lockGrid":
      //   grid = await sails.helpers.grid.lock(post['grid_id']) ;
      //   result = grid;
      //   break;
      case "deleteGrid":
        grid = await sails.helpers.grid.destroy(post['grid_id']) ;
        result = grid;
        break;
      case "getGrid":
        if (user_id == 0 ) {
          grid = await sails.helpers.grid.get(post['grid_id'],false) ;
        }else{
          grid = await sails.helpers.grid.get(post['grid_id']) ;
        }
        result = grid;
        break;
      // case "copyGrid":
      //   info = {
      //     "grid_title" : post['grid_title'],
      //     "grid_description" : post['grid_description'],
      //     "project_id" : post['project_id']
      //   };
      //   new_grid = await sails.helpers.grid.copy.(post['grid_id'],info) ;
      //   // might need a copy grid tiles to new grid function or call
      //   result = new_grid;	
      //   break;
      case "removeFromGrid":
        grids_tile = await sails.helpers.grid.tile.destroy(post['grid_tile_id']) ;
        result = grids_tile;
        break;
      // case "copyToNewGrid":
      //   post['grid']['user_id']  = user_id;
      //   new_grid = await sails.helpers.grid.create(post['grid']) ;
      //   update['grid_id'] =  new_grid.grid_id;
      //   grid_tile_ids =  post['grid_tile_ids'];
      //   new_grid_tiles = {};
      //   foreach (grid_tile_ids as grid_tile_id) {
      //     new_grid_tiles[grid_tile_id] = await sails.helpers.grid.tile.copy(grid_tile_id,update);
      //   }
      //   new_group = sails.helpers.group.copy(new_grid_tiles);
      //   new_grid = sails.helpers.grid.get(new_grid.grid_id,false) ;
      //   result = new_grid;
      //   break;
      // case "moveToNewGrid":
      //   post['grid']['user_id']  =  user_id;
      //   new_grid = sails.helpers.grid.create(post['grid']) ;
      //   update['grid_id'] =  new_grid.grid_id;
      //   grid_tile_ids =  post['grid_tile_ids'];
      //   new_grid_tiles = array();
      //   foreach (grid_tile_ids as grid_tile_id) {
      //     new_grid_tiles[grid_tile_id] = sails.helpers.grid.tile.copy(grid_tile_id,update);
      //   }
      //   new_group = sails.helpers.group.copy(new_grid_tiles);
      //   await sails.helpers.group.tile.destroy(grid_tile_ids);
      //   sails.helpers.grid.tile.destroy(grid_tile_ids);
      //   new_grid = sails.helpers.grid.get(new_grid.grid_id,false) ;
      //   result = new_grid;
      //   break;
      
      
      default:
        break;
      
    } //end switch
    return {
      req:req,
      result:result
    }
  }


};

