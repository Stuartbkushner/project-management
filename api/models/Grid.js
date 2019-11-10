/**
 * Grid.js
 *
 * A Grid shows the Tiles.
 */

module.exports = {
  primaryKey: 'grid_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    grid_id: {
      type: 'number',
      // unique: true, 
      autoIncrement: true,
      // required: true,
    },
    slug: {
      type: 'string',
      required: true,
    },
    
    grid_title: {
      type: 'string',
      required: true,
    },

    grid_description: {
      type: 'string',
      // required: true,
    },

    // project_id: {
    //   type: 'number',
    //   required: true,
    // },

    grid_decision: {
      type: 'string',
      // required: true,
    },

    grid_decision_shown: {
      type: 'boolean',
      // required: true,
    },
    grid_version: {
      type: 'number',
      // required: true,
    },

    grid_order: {
      type: 'number',
      // required: true,
    },

    user_order: {
      type: 'number',
      // required: true,
    },

    grid_type: {
      type: 'string',
      required: true,
    },
    



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    grid_groups: {
      collection: 'grid_group',
      via: 'grids'
    },

    tiles: {
      collection: 'tile',
      via: 'grids'
    },
    floating_tiles: {
      collection: 'tile',
      via: 'grids'
    },

    locations: {
      collection: 'location',
      via: 'grid_id'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user_id: {
      model: 'user'
    },

    project_id: {
      model: 'project',
      required: true,

    },
    grid_lock_user_id: {
      model: 'user'
    },

    grid_privacy_user_id: {
      model: 'user'
    },
  },


};
