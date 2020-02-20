module.exports = {


  friendlyName: 'Get',


  description: 'Get grid.',


  inputs: {
    grid_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    info: {
      description: 'info for making a grid',
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
    var grid_id = inputs.grid_id;
    var info = inputs.info;
    var update_grid_title = info.hasOwnProperty("grid_title");
    if(update_grid_title){
      var grid = await Grid.findOne({grid_id:grid_id});
      slug = await sails.helpers.slug.create('grid','grid_title',info["grid_title"],grid.user_id);
      info.slug = slug;
      grid = await Grid.updateOne({grid_id:grid_id}).set(info);
    }else{
      var grid = await Grid.updateOne({grid_id:grid_id}).set(info);
    }
    return grid;
    return grid;

   
  }


};

