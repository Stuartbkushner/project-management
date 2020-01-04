module.exports = {


  friendlyName: 'save team',


  description: 'save the team for the logged-in user.',


  inputs: {
    team_id: {
      description: 'title object.',
      type: 'ref',
      required: true
    },
    team_name: {
      description: 'title object.',
      type: 'ref',
      required: true
    },


  },


  fn: async function (inputs) {

    console.log("controller createNewGroup",inputs);
    var result = await sails.helpers.team.action("createNewGroup",this.req);
    console.log("controller createNewGroup",result);
    return result;
   

  }


};
