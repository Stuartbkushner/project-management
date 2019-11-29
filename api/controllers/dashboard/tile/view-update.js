module.exports = {


  friendlyName: 'View update',


  description: 'Display "Update" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/tile/update'
    }

  },


  fn: async function () {

    // Respond with view.
    var tile_id = this.req.param('tile_id');
    var newTile = tile_id ? false : true;
    console.log(tile_id);
    console.log(newTile);
    if (tile_id) {
      var tile = await Tile.findOne({tile_id:tile_id});
      console.log(tile);
    } else {
      var tile = {};
      console.log(tile);
    }

    return {
      tile:tile,
      newTile:newTile,
      tile_id:tile_id,
    };

  }


};
