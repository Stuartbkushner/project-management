module.exports = {


  friendlyName: 'Update',


  description: 'Update team.',


  inputs: {
    team_id: {
      description: 'team id of team to update',
      required: true,
      type: "number",
    },
    info: {
      description: 'info for update',
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
    var team_id = inputs.team_id;
    var info = inputs.info;
    var update_team_name = info.hasOwnProperty("team_name");
    
    if(update_team_name){
      slug = await sails.helpers.slug.create('team','team_name',info["team_name"]);
      info.slug = slug;
      console.log("update name team_id",team_id);

      var team = await Team.updateOne({team_id:team_id}).set(info);
      team = await Team.findOne({team_id:team_id});
      console.log("update name team",team,{team_id:team_id});
    }else{
      var team = await Team.updateOne({team_id:team_id}).set(info);
      console.log("update",team);
    }
    return team;
  }


};

