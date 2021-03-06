module.exports = {


  friendlyName: 'View source',


  description: 'Display "Source" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/source/source'
    }

  },


  fn: async function () {
    // Respond with view.
    var user = this.req.me;

    var sourceSlug = this.req.param("sourceSlug");
    console.log("view source sourceSlug",sourceSlug);
    var source = await Source.findOne({slug:sourceSlug});
    console.log("view source source",source);
    if(source ==  undefined){
      return this.res.notFound();
    }
    this.req.body = {};
    this.req.body.source_id = source.source_id;
    var source = await sails.helpers.source.action("getSource",this.req);
    
    console.log("view source source",source);

    var public = user.user_id == source.user_id;
    var source_id = source.source_id;
    var project_id = source.project_id;

  
    


    



    var projects = await Project.find().populate("user_id");

    var settings = {
      current_project_id:project_id,
    };
    // Respond with view.
    var result = {
      public: public,
      source_id: source_id,
      project_id: project_id,
      source: source,
      projects: projects,
      settings:settings,
    };
    console.log("view source result",result);
    return result;

  }


};
