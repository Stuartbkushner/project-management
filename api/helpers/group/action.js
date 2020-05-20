module.exports = {


  friendlyName: 'Tile Action',


  description: 'Tile Action.',


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
    user_id = req.me ? req.me.user_id : 0;

    switch(action) {

      case "group":
        group_info =  post['group'];
        tiles =  post['tiles'];
        var new_group = await sails.helpers.group.create(user_id,group_info,tiles);
        result = new_group;
        break;
      case "editGroup":
        group_info =  post['group'];
        tile_group_id =  post['tile_group_id'];
        var updated_group = await sails.helpers.group.update(tile_group_id,group_info);
        result = updated_group;
        break;
      case "ungroup":
        var grid_tile_ids =  post['grid_tile_ids']; //must update on ront end
        // tile_ids =  post['tile_ids'];
        // tile_group_id =  post['tile_group_id'];
        var locations = await Location.find(grid_tile_ids).populate("groups");
        var tile_group_ids = [];
        var deleted_group_tiles_list = [];
        console.log("ungroup grid_tile_ids",grid_tile_ids);
        console.log("ungroup locations",locations);
        for (let i = 0; i < locations.length; i++) {
          const location = locations[i];
          const groups = location.groups;
          const location_id = location.location_id;
          console.log("ungroup location",location);
          console.log("ungroup groups",groups);
          console.log("ungroup location_id",location_id);

          for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            var tile_group_id = group.tile_group_id;
            console.log("ungroup tile_group_id",tile_group_id);

            tile_group_ids.push(tile_group_id);
            deleted_group_tiles = await Tile_Group.removeFromCollection(tile_group_id,"locations").members(location_id);
            console.log("ungroup deleted_group_tiles",deleted_group_tiles);

            deleted_group_tiles_list.push(deleted_group_tiles);
          }
          
        }
        console.log("ungroup deleted_group_tiles_list",deleted_group_tiles_list);

        result = deleted_group_tiles_list;
        break;
      case "add2Group":
        tile_group_id =  post['tile_group_id'];
        tiles =  post['tiles'];
        group_tiles = await Tile_Group.addToCollection(tile_group_id).members(tiles);
        new_group = Tile_Group.findOne({tile_group_id:tile_group_id}).populate("tiles");
        result = new_group;
        break;
      case "getGroup":
        tile_group_id =  post['tile_group_id'];
        //might need to load tiles??
        group = Tile_Group.findOne({tile_group_id:tile_group_id}).populate("tiles");
        result = group;
        break;
      case "deleteGroup":
        tile_group_id =  post['tile_group_id'];
        group = Tile_Group.destroyOne({tile_group_id:tile_group_id}).fetch();
        result = group;
        break;
      case "saveOutline":
        group_info =  post['outline'];
        tiles =  group_info['tiles'];
        //unset(group_info['tiles']);
    
        tile_group_id =  group_info['tile_group_id'];
        if (empty(tile_group_id)) {
          new_group = await sails.helpers.group.create(group_info,tiles);
        }
        else{
          updated_group = await Tile_Group.update({tile_group_id:tile_group_id}).set(group_info).fetch();
          group_tiles = await Tile_Group.replaceCollection(tile_group_id).members(tiles);
        }
        new_group = Tile_Group.findOne({tile_group_id:tile_group_id}).populate("tiles");

        // new_group = group->get_group(tile_group_id);
        result = new_group;
        break;
      default:
        break;
    } //end switch
    return result;
    


}




};

