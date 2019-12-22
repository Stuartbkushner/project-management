module.exports = {


  friendlyName: 'Save grid',


  description: 'Save the grid for the logged-in user.',


  inputs: {

    grid: {
      description: 'The new, unencrypted grid.',
      type: 'ref',
      required: true
    }

  },


  fn: async function (inputs) {

    console.log("controller saveGrid",inputs);
    var result = await sails.helpers.grid.action("saveGrid",this.req);
    console.log("controller saveGrid",result);
    return result;
   

  }


};
