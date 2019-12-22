module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    tile_group_id: {
      description: 'group',
      example: 'abc123v2',
      required: true
    },
    tiles: {
      description: 'Tiles to add to group',
      type: 'ref',
      required: true
    },

  },


  fn: async function (inputs) {

    var tile_group_id = inputs.tile_group_id;
    var tiles = inputs.tiles;
    console.log("controller add-2-group",inputs);
    var result = await sails.helpers.group.action("add2Group",this.req);
    console.log("controller add-2-group",result);

    return result;
   

  }


};
