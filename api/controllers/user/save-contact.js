module.exports = {


  friendlyName: 'Save source',


  description: 'Save the source for the logged-in user.',


  inputs: {

    new_source_project_id: {
      description: 'project_id.',
      type: 'string',
      required: true
    },
    new_source_title: {
      description: 'new_source_title',
      type: 'string',
      required: true
    },
    new_source_author: {
      description: 'new_source_author',
      type: 'string',
      required: true
    },
    new_source_type: {
      description: 'new_source_type',
      type: 'string',
      required: true
    },
    new_source_text: {
      description: 'new_source_text',
      type: 'string',
      required: false
    },
    source_url_input: {
      description: 'source_url_input',
      type: 'string',
      required: false
    },

  },


  fn: async function (inputs) {

    console.log("controller saveSource",inputs);
    var result = await sails.helpers.source.action("saveSource",this.req);
    console.log("controller saveSource",result);
    return result;
   

  }


};
