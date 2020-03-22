module.exports = {


  friendlyName: 'save filter',


  description: 'save the filter for the logged-in user.',


  inputs: {

    filter_search: {
      description: 'filter_search',
      type: 'string',
      required: false
    },
    match_title: {
      description: 'match_title',
      type: 'boolean',
      required: false
    },
    match_content: {
      description: 'match_content',
      type: 'boolean',
      required: false
    },
    match_tags: {
      description: 'match_tags',
      type: 'boolean',
      required: false
    },
    match_starred: {
      description: 'match_starred',
      type: 'boolean',
      required: false
    },
    filter_from: {
      description: 'filter_from',
      type: 'string',
      required: false
    },
    filter_to: {
      description: 'filter_to',
      type: 'string',
      required: false
    },
    type: {
      description: 'type',
      type: 'string',
      required: false
    },


  },


  fn: async function (inputs) {
    console.log("controller saveFilters",inputs);
    this.req.session.filter = inputs;
    var result = this.req.session.filter;
    // var result = await sails.helpers.filter.action("saveFilters",this.req);
    console.log("controller saveFilters",result);
    return result;
   

  }


};
