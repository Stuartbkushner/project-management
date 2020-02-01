module.exports = {


  friendlyName: 'Save source',


  description: 'Save the source for the logged-in user.',


  inputs: {

    source_id: {
      description: 'source_id.',
      type: 'string',
      required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller saveSource",inputs);
    var result = await sails.helpers.source.action("getSource",this.req);
    console.log("controller saveSource",result);
    return result;
   

  }


};
