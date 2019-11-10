module.exports = {


  friendlyName: 'Acceept',


  description: 'Acceept invitation.',


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
    var team_invite_id = inputs.team_invite_id;
    var invite = await Team_Invite.find({team_invite_id:team_invite_id});
    await Team.addToCollection(invite.team_id,"members").members(invite.user_id);
    return await Team.findOne({team_id:invite.team_id}).populate("members");
    /*
      $team_invite = Team_Invites::retrieveByPK($team_invite_id);
		$new_team_user['team_id']= $team_invite->team_id;
		$new_team_user['user_id']= $this->user_id;
		$new_team_user['teams_user_level']= 0;

		$new_team_user = $this->add_team_user($new_team_user);
		$team_invite = $this->delete_invitation($team_invite_id);
		
		return $new_team_user;
    */
  }


};

