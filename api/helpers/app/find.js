module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    slug_type: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    where: {
      description: 'where',
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
    var slug_type = inputs.slug_type;
    var where = inputs.where;
    if(slug_type == "project"){
        var object = await Project.find(where);
    }else if(slug_type == "grid"){
        var object = await Grid.find(where);
    }else if(slug_type == "source"){
        var object = await Source.find(where);
    }else if(slug_type == "user"){
        var object = await User.find(where);
    }else if(slug_type == "tile_group"){
        var object = await Tile_Group.find(where);
    }else if(slug_type == "team"){
        var object = await Team.find(where);
    }else if(slug_type == "tile"){
        var object = await Tile.find(where);
    }

    console.log("get inputs",inputs);
    console.log("get object",object);
    return object;



  }


};

