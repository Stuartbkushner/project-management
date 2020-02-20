module.exports = {


  friendlyName: 'Create',


  description: 'Create project.',


  inputs: {
    user_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    team_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    info: {
      description: 'info for making a grid',
      required: true,
      type: "ref",
    },


  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var user_id = inputs.user_id;
    var team_id = inputs.team_id;
    var info = inputs.info;
    if(team_id){
      info['team_id'] = team_id;
    }
    delete info.project_id;
    // TODO
    info['user_id'] = user_id;
    title = info['project_name'];
    console.log("crete project pre info",info);

    info['slug'] = await sails.helpers.slug.create('project','project_name',info['project_name'],user_id);
    console.log("crete project pre info",info);
    project = await Project.create(info).fetch();
    // project->grid_groups = make_project_grid_groups(project);
    project = await Project.findOne({project_id:project.project_id}).populate( "user_id");
    var project_user = project.user_id; 
    project.user_id = project_user.id;
    project.user = { user_first : project_user.user_first, user_last : project_user.user_last} ;
    if(team_id){
      project = await Project.findOne({project_id:project.project_id}).populate("team_id");
    }
    return project;
/*
    author = project_author(project_id ,project);
    if (!is_null($team_id)) {
      $team = Teams::retrieveByPK($team_id); // call maybe uncessary
      $user_id = $team->user_id;
  }
  $user = Users::retrieveByPK($user_id); // call
  $object = new StdClass;
  $object->user_first = $user->user_first;
  $object->user_last = $user->user_last;
  $object->user_id = $user->user_id;
  $object->slug = $user->slug;
  $object->invite_cnt = 0;
  $object->public = 1;
  $object->contact_name = $user->contact_name;
  $object->phone = $user->phone;
  $object->contact_email = $user->contact_email;
  $object->message = $user->message;
  $object->user_quickstart = $user->user_quickstart;

  $user = $object;
  //$user->tags = $this->get_tags($user_id);
  //$team_info  = $teamHelper->get_user_teams($user_id);
  //$user->invites = $team_info['invites'];
  //$user->invite_cnt = count($user->invites);
  if (!is_null($team_id)) {
  $team = Teams::retrieveByPK($team_id); // call
  $user->team = $team;
  $user->name = $team->team_name;
  $user->contact_name = $team->contact_name;
  $user->phone = $team->phone;
  $user->contact_email = $team->contact_email;
  $user->message = $team->message;
  $user->username =  $team->slug;
  }else{
  $user->name = $user->user_first.' '.$user->user_last;
  $user->username =  $user->slug;
}
    project->author = author;
    return project;
  */

  }


};

