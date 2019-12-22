module.exports = {


  friendlyName: 'Get tile',


  description: 'Get the tile for the logged-in user.',


  inputs: {

    grid_tile_id: {
        description: 'grid tile id.',
        example: 'abc123v2',
        required: true
      },
      location_id: {
        description: 'location id',
        example: 'abc123v2',
        required: true
      },
      update: {
          description: 'location update.',
          type: 'ref',
          required: true
      },


  },


  fn: async function (inputs) {

    console.log("controller moveGridTile",inputs);
    var result = await sails.helpers.grid.action("moveGridTile",this.req);
    console.log("controller moveGridTile",result);
    return result; 
   

  }


};
