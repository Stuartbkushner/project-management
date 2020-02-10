/**
 * SourcePage.js
 *
 * A Source page is a page in the source file.
 *  */

module.exports = {
  primaryKey: 'source_page_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    source_page_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },

    source_page_number: {
      type: 'number',
      required: true,
    },

    source_page_content: {
      type: 'string',
      required: true,
    },

    source_page_version: {
      type: 'number',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    notes: {
      collection: 'source_annotation',
      via: 'page'
    },
    



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    source_id: {
      model: 'source',
      required: true,

    },

    
  },


};
