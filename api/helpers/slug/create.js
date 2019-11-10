module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    slug_type: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    title: {
      description: 'title/ name of slug',
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
    var title = inputs.title;
    var user_id = inputs.user_id;


    title = title.trim();
    pattern = '/[!@#%^&*(),.?":{}|<> _]/i';
    replacement = '-';
    slug =  title.replace(pattern, replacement);
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    console.log("slug",slug);
    // slug = stripcslashes(slug);
    // slug = str_ireplace('\'', '', slug);
    slug_exits = await sails.helpers.slug.exists(slug_type,slug,user_id);
    if (slug_exits ) {
        slug_name_count =  await sails.helpers.slug.nameCount(slug_type,slug,user_id);
        slug +='-'+slug_name_count;
    }
    return slug;

  }


};

