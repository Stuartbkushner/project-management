module.exports = {


  friendlyName: 'Decline',


  description: 'Decline invitation.',


  inputs: {
    team_invite_id: {
      description: 'id of of the invistation being declined',
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
    var team_invite_id = inpputs.team_invite_id;
    var deleted_invite = await Team_Invite.destroy({team_invite_id:team_invite_id});
    return deleted_invite;

    /*
      $team_invite = Team_Invites::retrieveByPK($team_invite_id);
		$team_invite->delete();
		return $team_invite;
    */
  }


};

