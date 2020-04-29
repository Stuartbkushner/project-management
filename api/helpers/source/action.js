module.exports = {


  friendlyName: 'Source Action',


  description: 'Source Action tile.',


  inputs: {
    action: {
      description: 'action of grid',
      required: true,
      type: "string",
    },
    req: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
    result: {
        description: 'req object posted',
        type: "ref",
        defaultsTo: {},
    },
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
    var post = inputs.req.body;
    var user_id = req.me ? req.me.user_id : 0;
    var team_id = req.session.team_id ? req.session.team_id: 0;

    switch(action) {

        case "getSource":
            source_id = post['source_id'];
            source = await Source.findOne({source_id:source_id}).populate("pages").populate("annotations").populate("source_tiles") ;
            pages = await Source_Page.find({source_id:source_id}).populate("notes") ;
            // source.user_id = 2;
            // source.source_url = "/images/SFHgH8-1.jpg";
            // var pages = [
            //   {
            //     source_page_content: "SFHgH8-1.jpg",
            //   }
            // ]
            source.pages = pages;
            // source.source_tiles = source.annotations;
            result = source;
            break;
    
        case "editSource":
            source_updated = await Source.updateOne({source_id:post['source_id']}).set(post) ;
            source = await Source.findOne({source_id:source_id}).populate("pages").populate("annotations") ;
            result = source;
            break;
        case "saveSource":
            //need make sure files get saved
            // saved = await sails.helpers.source.create(user_id,post['source']);
            var source = {
              project_id : post.new_source_project_id,
              source_title : post.new_source_title,
              source_author : post.new_source_author,
              source_type : post.new_source_type,
              source_text : post.new_source_text,
              source_url: post.source_url_input
            }
            saved = await sails.helpers.source.create(user_id,source,req);
            
            result = [saved];
            break;
        case "deleteSource":
            //TODO: need to make sure when you delete source, pages and source notes are deleted
            source = await sails.helpers.source.destroy(post['source_id']);
            result = source;
            break;
        case "saveAnnotation": // should change to saveSourceNote
            console.log("saveAnnotation post",post);
            console.log("saveAnnotation post note",post['note']);
            source_note = await sails.helpers.source.note.create(post['note']);
            result = source_note;
            break;	
        default:
            break;
    } //end switch
    return result;
  }


};



