module.exports = {


  friendlyName: 'Saves tile and create soruce',


  description: 'Saves tile and create soruce.',


  inputs: {

    tile: {
      description: 'title object.',
      type: 'ref',
      required: true
    },
    tile_source_annotations: {
        description: 'title object.',
        type: 'ref',
        required: true
      },


  },


  fn: async function (inputs) {

    console.log("controller removeFromGrid",inputs);
    var result = await sails.helpers.grid.action("removeFromGrid",this.req);
    console.log("controller removeFromGrid",result);
    return result; 
   

  }


};
