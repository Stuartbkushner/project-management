module.exports = {


  friendlyName: 'Create',


  description: 'Create Team.',


  inputs: {
    user_id: {
      description: 'user id of team owner',
      required: true,
      type: "number",
    },



  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var user_id = inputs.user_id;
    var user = await User.findOne({user_id:user_id}).populate("teams");
    var teamIds = [];
    console.log("helpers team getUserTeams user.teams",user.teams);
    for (let i = 0; i < user.teams.length; i++) {
        const team = user.teams[i];
        teamIds.push(team.team_id);
    }
    console.log("helpers team getUserTeams teamIds",teamIds);

    var teams = await Team.find({team_id:teamIds}).populate("members", {
        select:"fullName",
    });
    var invites = await Team_Invite.find({invitee_email:user.emailAddress});
    console.log("helpers team getUserTeams post Find Teams teams",teams);


    var result = {
        groups:teams,
        invites:invites,
    }

    return result;
  }


};

