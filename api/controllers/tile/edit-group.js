module.exports = {


  friendlyName: 'edit group ',


  description: 'edit group .',


  inputs: {
    tile_group_id: {
      description: 'group',
      example: 'asdjfejfoej',
      required: true
    },
    group: {
      description: 'group',
      type: 'ref',
      required: true
    },

  },


  fn: async function (inputs) {

    console.log("controller edit-group",inputs);
    var result = await sails.helpers.group.action("editGroup",this.req);
    console.log("controller edit-group",result);
    return result;
   

  }


};
