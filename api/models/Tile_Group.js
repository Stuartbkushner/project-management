/**
 * TileGroup.js
 *
 * A Tile Group is grouping tiles on a grid that have an association.
 *  */

module.exports = {
  primaryKey: 'tile_group_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    tile_group_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },

    slug: {
        type: 'string',
        required: true,
    },

    tile_group_title: {
        type: 'string',
    },
    
    tile_group_description: {
        type: 'string',
        //required: true,
    },

    tile_group_type: {
        type: 'string',
        required: true,
    },

    tile_group_border: {
        type: 'string',
    },

    tile_group_order: {
        type: 'number',
    },

    user_order: {
        type: 'number',
    },

    tile_group_version: {
        type: 'number',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    
    tiles: {
        collection: 'tile',
        via: 'groups'
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

  
  },


};
