module.exports = {


  friendlyName: 'Get',


  description: 'Get grid.',


  inputs: {
    user_id: {
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
    var user_id = inputs.user_id;
    var info = inputs.info;
    var project_id = info['project_id'];
    var grid_type = info['grid_type'];
    /*
        
    */
    delete info.grid_id;
    info['user_id'] = user_id;
    info['grid_decision'] = '';
    info['slug'] = "test";
    title = info['grid_title'];
    console.log("create grid grid_type",grid_type);
    projectCollection = "grids";
    projectCollection = grid_type == 'grid'? "grids": projectCollection;
    projectCollection = grid_type == 'template'? "templates": projectCollection;
    projectCollection = grid_type == 'published'? "published": projectCollection;
    
    info['slug'] = await sails.helpers.slug.create('grid','grid_title',info['grid_title'],user_id);

    var grid = await Grid.create(info).fetch();
    await Project.addToCollection(project_id,"grids").members(grid.grid_id);
    if(projectCollection !== "grids"){
      await Project.addToCollection(project_id,projectCollection).members(grid.grid_id);
    }
    // group_grid = this->add_project_grid(grid);
    return grid;

   
  }


};

