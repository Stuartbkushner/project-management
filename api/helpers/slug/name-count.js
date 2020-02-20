module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    slug_type: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    title_key: {
      description: 'the column name in the data base for making slugs from',
      required: true,
      type: "string",

    },
    title: {
      description: 'title/ name of title',
      required: true,
      type: "string",
    },
    user_id: {
      description: 'user_id/ name of title',
      required: false,
      defaultsTo: 0,
      type: "number",
    },



  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var slug_type = inputs.slug_type;
    var title_key = inputs.title_key;
    var title = inputs.title;
    var user_id = inputs.user_id;
    var where = {};
    where[title_key] = title;
    if(user_id){
      where.user_id = user_id;
    }
    console.log("name-count where",where);

    var objects = await sails.helpers.app.find(slug_type,where);

    console.log("name-count objects.length",objects.length);
    
    return objects.length;

  }


};

