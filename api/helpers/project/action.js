module.exports = {


  friendlyName: 'Project Action',


  description: 'Project Action.',


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
    var post = inputs.req.allParams();
    var user_id = req.me ? req.me.user_id : 0;
    console.log("project action req",req);
    console.log("project action post",post);
    console.log("project action req.session",req.session);
    var team_id = req.session.team_id ? req.session.team_id : 0;


    switch(action) {

      //project actions
        case "getProject": //  GetGrids
          if(user_id == 0){
              project = await sails.helpers.project.get(post['project_id'],true) ;
          }else{
              project = await sails.helpers.project.get(post['project_id'],false) ;
          }
          result = project;
          break;
        case "getPile": //  GetGrids
          if(user_id == 0){
                  pile = await sails.helpers.project.getPile(post['project_id'],true) ;
              }else{
                  pile = await sails.helpers.project.getPile(post['project_id'],false) ;
              }
          result = pile;
          break;
        case "saveProject":
          console.log("called saveProject");
          post['user_id'] = user_id;
          project_id = parseFloat(post['project_id']);
          console.log("called saveProject project_id",project_id);
          if (!project_id) {
            console.log("called saveProject save",project_id);

            project = await sails.helpers.project.create(user_id,team_id,post) ;
          } else{
            console.log("called saveProject update",project_id);
            
            project = await sails.helpers.project.update(project_id,post) ;
            console.log("called saveProject project",project);

          }
          result = project;
          console.log("called saveProject result",result);

          break;
        case "deleteProject":
          project = await sails.helpers.project.destory(post['project_id']) ;
          result = project;
          break;
        case "exportCSV":
          all_projects = false;
          project_id =  post['project_id'];
          await sails.helpers.project.exportTilesToCsv(user_id,all_projects,project_id);
          break;
        default:
          break;
      } //end switch
    return result;


}




};

