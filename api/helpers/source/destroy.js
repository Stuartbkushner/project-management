module.exports = {


  friendlyName: 'Delete',


  description: 'Delete source.',


  inputs: {
    source_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var source_id = inputs.source_id;

    var deleted_source = await Source.destroy({source_id:source_id}).fetch();
    var deleted_source_pages = await Source_Page.destroy({source_id:source_id});
    var deleted_source_annotations = await Source_Annotation.destroy({source_id:source_id});
    return deleted_source;
  }


};

