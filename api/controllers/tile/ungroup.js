module.exports = {


  friendlyName: 'ungroups group tiles',


  description: 'ungroups group of tiles.',


  inputs: {
    grid_tile_ids: {
      description: 'group',
      type: 'ref',
      required: true
    },

  },


  fn: async function (inputs) {

    console.log("controller ungroup",inputs);
    var result = await sails.helpers.group.action("ungroup",this.req);
    console.log("controller ungroup",result);
    return result;
   

  }


};
