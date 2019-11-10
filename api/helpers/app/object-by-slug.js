module.exports = {


  friendlyName: 'Get Object by slug',


  description: '',


  inputs: {
    obj: {
      description: 'app user object being passed to the front end',
      type:"ref"
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
    var second_try = false;
    var where = {};
    if (slug_type=='page') {
        slug_type = 'user';
        var second_type = 'team';
        second_try = true;
    }
    object_id = slug_type + '_id';
    slug_type = jsUcfirst(slug_type);


    object = sails.models[slug_type].find({slug:slug})
    if (is_null(object)) {
        if (second_try) {
            object = sails.helpers.security.objectBySlug(second_type,slug);
        }else{
            object = false;
        }
    }else{
        object = object[object_id];
    }
    function jsUcfirst(string) 
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return object;
  }


};

