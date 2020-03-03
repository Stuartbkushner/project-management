module.exports = {


  friendlyName: 'save filter',


  description: 'save the filter for the logged-in user.',


  inputs: {

    filter: {
      description: 'title object.',
      type: 'ref',
      required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller saveFilters",inputs);
    var result = await sails.helpers.filter.action("saveFilters",this.req);
    console.log("controller saveFilters",result);
    return result;
   

  }


};
