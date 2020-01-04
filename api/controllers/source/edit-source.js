module.exports = {


  friendlyName: 'Edit source',


  description: 'Edit the source for the logged-in user.',


  inputs: {

    source: {
      description: 'The new, unencrypted source.',
      type: 'ref',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller editSource",inputs);
    var result = await sails.helpers.source.action("editSource",this.req);
    console.log("controller editSource",result);
    return result;
   

  }


};
