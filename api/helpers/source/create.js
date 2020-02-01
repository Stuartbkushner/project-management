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
	req: {
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
    var req = inputs.req;
    console.log("helpers source create pre source create info",info);

    info['slug'] = await sails.helpers.slug.create('source',info['source_title'],user_id);
    info.user_id = user_id;
    var new_source = await Source.create(info).fetch();
    new_source.source_url = info.source_url;
    console.log("helpers source create info",info);
    console.log("helpers source create new_source",new_source);
    var source_id =  new_source.source_id;
    var source_pages = await sails.helpers.source.upload(req,new_source);
    new_source.source_pages = source_pages;
    console.log("helpers source create post upload new_source.source_pages",new_source.source_pages);
    console.log("helpers source create post upload new_source",new_source);


    return new_source;

  }


};

