module.exports = {


  friendlyName: 'Create',


  description: 'Create Team.',


  inputs: {
    user_id: {
      description: 'user id of team owner',
      required: true,
      type: "number",
    },
    info: {
      description: 'info for making a team',
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
    var info = inputs.info;
  
    // TODO
    info['user_id'] = user_id;
    title = info['team_name'];
    info['slug'] = await sails.helpers.slug.create('team',info['team_name'],user_id);
    console.log("info",info);
    team = await Team.create(info).fetch();
    // team->team_groups = make_team_team_groups(team);
    team = await Team.findOne({team_id:team.team_id}).populate( "user_id");
    var team_user = team.user_id; 
    team.user_id = team_user.id;
    team.user = { user_first : team_user.user_first, user_last : team_user.user_last} ;
    return team;
  }


};

