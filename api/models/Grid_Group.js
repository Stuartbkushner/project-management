/**
 * GridGroup.js
 *
 * A Grid Group shows the Grids as either a grid, template or published.
 */

module.exports = {
  primaryKey: 'grid_group_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    grid_group_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },

    slug: {
      type: 'string',
      required: true,
    },
    
    grid_group_title: {
      type: 'string',
      required: true,
    },

    grid_group_description: {
      type: 'string',
      // required: true,
    },

    grid_group_type: {
        type: 'string',
        // required: true,
      },

    grid_group_order: { 
        type: 'number',
        // required: true,
    },

    user_order: { 
        type: 'number',
        // required: true,
    },

    grid_group_version: { 
        type: 'number',
        // required: true,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    grids: {
      collection: 'grid',
      via: 'grid_groups'
    },

    grids_group: {
      collection: 'grid_group',
      via: 'parent_grid_group_id'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user_id: {
      model: 'user'
    },

    project_id: {
        model: 'project'
    },
    
    parent_grid_group_id: {
        model: 'grid_group'
    },
  },


};
