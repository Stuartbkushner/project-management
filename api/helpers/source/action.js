module.exports = {


  friendlyName: 'Source Action',


  description: 'Source Action tile.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var action = inputs.action;
    var req = inputs.req;
    var result = inputs.result;
    var post = inputs.req;
    user_id = req.me ? req.me.user_id : 0;


    switch(action) {

        case "getSource":
            source_id = post['source_id'];
            source = await Source.findOne({source_id:source_id}).populate("pages").populate("annotations") ;
            result = source;
            break;
    
        case "editSource":
            source_updated = Source.update({source_id:post['source_id']}).set(post) ;
            source = await Source.findOne({source_id:source_id}).populate("pages").populate("annotations") ;
            result = source;
            break;
        case "saveSource":
            //need make sure files get saved
            saved = await sails.helper.source.create(user_id,post['source']);
            result = saved;
            break;
        case "deleteSource":
            //TODO: need to make sure when you delete source, pages and source notes are deleted
            source = await sails.helper.source.destory(post['source_id']);
            result = source;
            break;
        case "saveAnnotation": // should change to saveSourceNote
            source_note = await sails.helper.source.note.create(post['note']);
            result = source_note;
            break;	
        default:
            break;
    } //end switch
    return result;
  }


};



