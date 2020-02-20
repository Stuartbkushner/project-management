/**
 * Tile.js
 *
 * A Tile is the visual note with links to grids and sources.
 *  */

module.exports = {
  primaryKey: 'tile_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    tile_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    //   required: true,
    },

    slug: {
        type: 'string',
        required: true,
        // unique: true,
    },

    tile_title: {
        type: 'string',
        required: false,
    },

    tile_color: {
        type: 'string',
        // required: true,
    },

    tile_content: {
        type: 'string',
        required: false,
    },

    tile_active: {
        type: 'number',
        // required: true,
    },

    tile_starred: {
        type: 'boolean',
        // required: true,
    },

    tile_version: {
        type: 'number',
        // required: true,
    },

    tile_type: {
        type: 'string',
        required: true,
    },

    tile_video: {
        type: 'string',
       // required: true,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    tags: {
        collection: 'tag',
        via: 'tiles'
    },

    annotations: {
        collection: 'source_annotation',
        via: 'tile_id'
    },

    grids: {
        collection: 'grid',
        via: 'tiles'
    },
    groups: {
        collection: 'tile_group',
        via: 'tiles'
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

    totalSpending: {
      model: 'balance'
    },

    totalProfits: {
      model: 'balance'
    },

    totalDividends: {
      model: 'balance'
    },

    spendingBalance: {
      model: 'balance'
    },

    dividendBalance: {
      model: 'balance'
    },

  },


};
