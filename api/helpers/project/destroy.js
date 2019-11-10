module.exports = {


  friendlyName: 'Delete',


  description: 'Delete tile.',


  inputs: {
    project_id: {
      description: 'project id',
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
    var project_id = inputs.project_id;


    // //delete grids
    var deleted_grid = await Grid.destroy({project_id:project_id});

    // //delete tile groups
    var deleted_groups = await Tile_Group.destroy({project_id:project_id});

    // //delete grid groups
    var deleted_grid_groups = await Grid_Group.destroy({project_id:project_id});

    // //delete tiles
    var deleted_tiles = await Tile.destroy({project_id:project_id});

    // //delete locations
    var deleted_locations = await Location.destroy({project_id:project_id});
    // //delete sources

    var deleted_sources = await Source.destroy({project_id:project_id}).fetch();
    for (let i = 0; i < deleted_sources.length; i++) {
      const deleted_source = deleted_sources[i];
      var deleted_source_pagess = await Source_Page.destroy({source_id:deleted_source.id});
      var deleted_source_annotations = await Source_Annotation.destroy({source_id:deleted_source.id});
      
    }
    var deleted_project = await Project.destroy({project_id:project_id}).fetch();

    return deleted_project;
  }


};

