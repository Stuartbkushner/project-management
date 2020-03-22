module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    tile_id: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    notes: {
      description: 'title/ name of slug',
      required: true,
      // type: "string",
      type: "ref",
    },



  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var notes = inputs.notes;
    var tile_id = inputs.tile_id;
    var noteIds = [];
    
    for (let i = 0; i < notes.length; i++) {
      var annotation_data = notes[i];
      console.log("annotation_data",annotation_data);
      note = await sails.helpers.source.note.create(annotation_data);
      console.log("note",note);
      noteIds.push(note.note_id);
    }
    await Tile.addToCollection(tile_id,"annotations").members(noteIds);

   return noteIds;



  }


};

