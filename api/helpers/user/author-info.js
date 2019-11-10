module.exports = {


    friendlyName: 'Get',
  
  
    description: 'Get user.',
  
  
    inputs: {
      user_id: {
        description: 'user_id',
        required: true,
        type: "number",
      },
      team_id: {
        description: 'team_id',
        required: false,
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
      var team_id = inputs.team_id;
      var user = {};
      //TODO dont query but format data from get project. need to add project to pramater
      if (team_id) {
        team = Team.findOne({team_id:team_id}); // call maybe uncessary
        user_id = team.user_id;
        user = User.findOne({
          where: {user_id : user_id},
          omit: ['password']
        }); 

        user.team = team;
        user.name = team.team_name;
        user.contact_name = team.contact_name;
        user.phone = team.phone;
        user.contact_email = team.contact_email;
        user.message = team.message;
        user.username =  team.slug;
        user.team_id = team_id;
        user.team_slug = team.slug;
        user.team_leader_id =  team.user_id;

      }else{
        user = User.findOne({
          where: {user_id : user_id},
          omit: ['password']
        }); // call
        user.username =  user.slug;
        user.name = user.fullName;
        user.team_id = 0;


      }
      user.invite_cnt = 0;
      user.public = 1;
      return user ;

    }
  
  
  };
  
  