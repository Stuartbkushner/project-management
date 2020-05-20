module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    user_id: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    tags: {
      description: 'title/ name of slug',
      required: true,
      // type: "string",
      type: "ref",
    },



  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var tags = inputs.tags;
    var user_id = inputs.user_id;
    var tagIds = [];
    if(typeof tags == "string"){
      tags = tags.split(",");
    }
    console.log("tags",tags);
    for (let i = 0; i < tags.length; i++) {
      var tag_content = tags[i];
      tag_content = tag_content.trim();
      var tag = {user_id:user_id,tag_content:tag_content};

      tag = await Tag.findOrCreate(tag,tag);
      console.log("tag",tag);
      tagIds.push(tag.tag_id);

      
    }
    console.log("tagIds",tagIds);

   return tagIds;



  }


};

