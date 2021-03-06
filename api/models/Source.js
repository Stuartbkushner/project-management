/**
 * Source.js
 *
 * A Source is an uploaded document from which Tiles are created.
 *  */

module.exports = {
  primaryKey: 'source_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    source_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },

    slug: {
      type: 'string',
      required: true,
      // unique: true,

    },
    
    source_filename: {
      type: 'string',
    },

    source_sys_filename: {
        type: 'string',
    },
    
    source_type: {
        type: 'string',
        required: true,
    },
    
    source_title: {
        type: 'string',
        required: true,
    },

    source_author: {
        type: 'string',
    },

    source_reference: {
        type: 'string',
    },

    source_version: {
        type: 'number',
    },

    source_order: {
        type: 'number',
    },

    source_url: {
        type: 'string',
    },

    user_order: {
        type: 'number',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    annotations: {
        collection: 'source_annotation',
        via: 'source_id'
      },

    pages: {
        collection: 'source_page',
        via: 'source_id'
      },
      source_tiles: {
          collection: 'tile',
          via: 'sources'

      },


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    project_id: {
      model: 'project'
    },

    user_id: {
        model: 'user'
    },
    
    

    // this is new and might not need to be a thing
    //
    team_id: {
        model: 'team'
    },
    
    
  },


};
