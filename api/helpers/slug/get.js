module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    slug_type: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    slug: {
      description: 'slug/ name of slug',
      required: true,
      type: "string",
    },
    user_id: {
      description: 'user_id/ name of slug',
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
    var slug = inputs.slug;
    var user_id = inputs.user_id;
    var where = {
        slug : slug,
    }

    if(user_id){
        where.user_id = user_id;
    }
    var object = await sails.helpers.app.find(slug_type,where);

    console.log("get inputs",inputs);
    console.log("get object",object);
    return object;



  }


};

