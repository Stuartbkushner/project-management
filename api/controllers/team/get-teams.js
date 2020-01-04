module.exports = {


  friendlyName: 'get teams',


  description: 'get the teams for the logged-in user.',


  inputs: {


  },


  fn: async function (inputs) {

    console.log("controller getGroups",inputs);
    var result = await sails.helpers.team.action("getGroups",this.req);
    console.log("controller getGroups",result);
    return result;
   

  }


};
