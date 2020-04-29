/**
 * SourceAnnotation.js
 *
 * A Source Annotation is highlighted text in a source, which triggers making a Tile.
 *  */

module.exports = {
  primaryKey: 'source_annotation_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    source_annotation_id: {
      type: 'number',
      // unique: true,
      autoIncrement: true,
      // required: true,
    },

    focus_width: {
      type: 'number',
      required: true,
    },
    
    anchor_left: {
      type: 'number',
      required: true,
    },

    anchor_top: {
        type: 'number',
        required: true,
    },

    focus_left: {
        type: 'number',
        // required: true,
    },

    focus_top: {
        type: 'number',
        required: true,
    },
    
    focus_height: {
        type: 'number',
        required: true,
    },

    source_page: {
        type: 'number',
        required: true,
    },

    source_text: {
        type: 'string',
        // required: true,
    },

    type: {
        type: 'number',
        // required: true,
    },

    cutout: {
        type: 'string',
        required: true,
    },

    source_annotation_version: {
        type: 'number',
        // required: true,
    },
    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    source_id: {
      model: 'source'
    },

    tile_id: {
        model: 'tile'
    },
    
    page: {
      model: 'source_page'
    },
  },


};
