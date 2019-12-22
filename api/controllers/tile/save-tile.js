module.exports = {


  friendlyName: 'save tile',


  description: 'save the tile for the logged-in user.',


  inputs: {

    tile: {
      description: 'title object.',
      type: 'ref',
      required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller saveTile",inputs);
    var result = await sails.helpers.tile.action("saveTile",this.req);
    console.log("controller saveTile",result);
    return result;
   

  }


};
