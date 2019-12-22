module.exports = {


  friendlyName: 'group tiles',


  description: 'group the tiles.',


  inputs: {

    group: {
      description: 'group',
      type: 'ref',
      required: true
    },
    tiles: {
      description: 'Tiles to add to group',
      type: 'ref',
      required: true
    },

  },


  fn: async function (inputs) {

    console.log("controller group",inputs);
    var result = await sails.helpers.group.action("group",this.req);
    console.log("controller group",result);
    return result;  
   

  }


};
