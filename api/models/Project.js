/**
 * Project.js
 *
 * A Project is the folder where all other assets: sources, tiles, grids, templates, outlines, published reside.
 *  */

module.exports = {
  primaryKey: 'project_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    project_id: {
      type: 'number',
      // unique: true,
      autoIncrement: true,
      // required: true,
    },

    slug: {
      type: 'string',
      required: true,
    },
    
    project_name: {
      type: 'string',
      required: true,
    },

    project_description: {
      type: 'string',
      // required: true,
    },

    project_version: {
        type: 'string',
        // required: true,
      },

    project_order: { 
        type: 'number',
        // required: true,
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    grids: {
      collection: 'grid',
      via: 'project_id'
    },
    templates: {
      collection: 'grid',
      via: 'project_id'
    },
    published: {
      collection: 'grid',
      via: 'project_id'
    },

    sources: {
        collection: 'source',
        via: 'project_id'
    },

    tiles: {
        collection: 'tile',
        via: 'project_id'
    },

    tile_groups: {
      collection: 'tile_group',
      via: 'project_id'
    },

    grid_groups: {
      collection: 'grid_group',
      via: 'project_id'
    },
    locations: {
      collection: 'location',
      via: 'project_id'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user_id: {
      model: 'user'
    },

    team_id: {
        model: 'team'
    },
    
    
  },


};
