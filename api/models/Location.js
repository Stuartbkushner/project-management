/**
 * Location.js
 *
 * A Location is where Tiles reside on the Grid.
 *  */

module.exports = {
  primaryKey: 'location_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    location_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },

    x: {
      type: 'number',
      // required: true,
    },
    
    y: {
      type: 'number',
      // required: true,
    },

    length: {
        type: 'number',
        // required: true,
    },

    width: {
        type: 'number',
        // required: true,
    },
    
    location_version: {
        type: 'number',
        // required: true,
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    grid_id: {
      model: 'grid'
    },

    tile_id: {
        model: 'tile',
        required: true,

    },
    project_id: {
        model: 'project'
    },
    
    
  },


};
