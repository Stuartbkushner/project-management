module.exports = {


  friendlyName: 'Convert sting to  slug',


  description: 'Convert sting to  slug.',


  inputs: {
    title: {
      description: 'title/ name of slug',
      required: true,
      type: "string",
    },


  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var title = inputs.title;
    title = title.trim();
    pattern = '/[!@#%^&*(),.?":{}|<> _]/i';
    replacement = '-';
    slug =  title.replace(pattern, replacement);
    slug = slug.replace(/\s+/g, '-').toLowerCase();
    return slug;

  }


};

