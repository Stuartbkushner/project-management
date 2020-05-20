module.exports = {


  friendlyName: 'Create Tile Group',


  description: 'Create tile.',


  inputs: {
    user_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    info: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
    tiles: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var user_id = inputs.user_id;
    var info = inputs.info;
    var tiles = inputs.tiles;
    var tile_ids = [];
    var location_ids = [];
    for (let i = 0; i < tiles.length; i++) {
      const tile = tiles[i];
      console.log("create group tile",tile);
      tile_ids.push(tile.tile_id);
      location_ids.push(tile.location_id);
      
    }
    info['slug'] = await sails.helpers.slug.create('tile_group','tile_group_title',info['tile_group_title'],user_id);
    var new_group = await Tile_Group.create(info).fetch();
    var tile_group_id =  new_group.tile_group_id;
    await Tile_Group.addToCollection(tile_group_id,"tiles").members(tile_ids);
    await Tile_Group.addToCollection(tile_group_id,"locations").members(location_ids);
    new_group =  Tile_Group.findOne({tile_group_id:tile_group_id}).populate("tiles").populate("locations");
    return new_group;

  }


};

