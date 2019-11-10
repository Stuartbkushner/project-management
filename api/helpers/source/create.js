module.exports = {


  friendlyName: 'Create Source',


  description: 'Create tile.',


  inputs: {
    user_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    info: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var user_id = inputs.user_id;
    var info = inputs.info;
    info['slug'] = await sails.helpers.slug.create('source',info['source_title'],user_id);
    var new_source = await Source.create(info).fetch();
    var source_id =  new_source.source_id;
    return new_source;

  }


};

