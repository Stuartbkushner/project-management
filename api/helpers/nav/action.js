module.exports = {


  friendlyName: 'Project Action',


  description: 'Project Action.',


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

      //project actions
        case "getProject": //  GetGrids
          if(user_id == 0){
              project = await sails.helpers.project.get(post['project_id'],'public') ;
          }else{
              project = await sails.helpers.project.get(post['project_id']) ;
          }
          result = project;
          break;
        case "getPile": //  GetGrids
          project = new Project_Helper();
          if(user_id == 0){
                  pile = await sails.helpers.project.getPile(post['project_id'],'public') ;
              }else{
                  pile = await sails.helpers.project.getPile(post['project_id']) ;
              }
          result = pile;
          break;
        case "saveProject":
          project = new Project_Helper();
          post['user_id'] = user_id;
          project_id = parseFloat(post['project_id']);
          if (!project_id) {
            project = await sails.helpers.project.create(post) ;
          } else{
            project = await sails.helpers.project.update(project_id,post) ;
          }
          result = project;
          break;
        case "deleteProject":
          project = new Project_Helper();
          project = await sails.helpers.project.destory_(post['project_id']) ;
          result = project;
          break;
        case "exportCSV":
          project = new Project_Helper();
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

