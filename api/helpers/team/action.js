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
    var post = inputs.req.body;
    var user_id = req.me ? req.me.user_id : 0;
    var team_id = req.session.team_id ? req.session.team_id: 0;


    switch(action) {

      case "declineInvitation":
        //TODO need to make sure tyler sends team_invite_id
        result = await sails.helpers.team.declineInvitation(post['team_invite_id']);
        break;
      case "acceptInvitation":
        //TODO need to make sure tyler sends team_invite_id
        result = await sails.helpers.team.acceptInvitation(post['team_invite_id']);
        break;
      // case "inviteUserToGroup":
      //   if (!isset(post['team_id'])) {
      //     post['team_id'] = post['group_id'];
      //   }
      //   invite = await sails.helpers.team.invite_user(user_id,post['team_id'],post['invitee_email']);
      //   result = invite;
      //   break;
      case "createNewGroup": // used to be createNewGroup
        var info = post;
        var team_id = info['team_id'];
        console.log("helpers team action team_id",team_id)

        if (team_id == 0) {
          console.log("helpers team action to create team_id",team_id)

          info['user_id'] = user_id;
          result_team = await sails.helpers.team.create(user_id,info);
        }
        else{
          result_team = await sails.helpers.team.update(post['team_id'],post);
        }
    
        result = result_team;
        break;
      // case "updateTeam":
      //   updated_team = await sails.helpers.team.update_team(post['team_id'],post['update']);
      //   result = updated_team;
      //   break;
      case "getGroups": // use to be getGroups
        teams = await sails.helpers.team.getUserTeams(user_id);
        result = teams;
        break;
      // case "removeTeam": 
      //   team_id = post['team_id'];
      //   team = await sails.helpers.team.delete_team(team_id);
      //   result = team;
      //   break;
      // case "makeTeamOwner": 
      //   team_id = post['team_id'];
      //   info['user_id'] = post['user_id'];
      //   team = await sails.helpers.team.update_team(team_id,info);
      //   result = team;
      //   break;
      // case "removeTeamMember": 
      //   team_id = post['team_id'];
      //   team_user_id = post['user_id'];
      //   team = await sails.helpers.team.delete_team_user(team_id,team_user_id);
      //   result = team;
      //   break;
      // case "leaveTeam": 
      //   team_user_id = post['team_user_id'];
      //   team = await sails.helpers.team.leave_team(team_user_id);
      //   result = team;
      //   break;
      // case "setTeam": 
      //   if (isset(get['team_id'])) {
      //     team_id = intval(get['team_id']);
      //   }else{
      //     team_id = intval(post['team_id']);
    
      //   }
      //   _SESSION['team_id'] = team_id;
      //   header("Location: ../");
        
      //   result = team_id;
      //   break;
      
      default:
        break;
    } //end switch
    return result;


}




};

