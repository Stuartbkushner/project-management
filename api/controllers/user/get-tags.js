module.exports = {


  friendlyName: 'Save source',


  description: 'Save the source for the logged-in user.',


  inputs: {



  },


  fn: async function (inputs) {

    console.log("controller getTags",inputs);
    var term = this.req.param("term");
    console.log("view project term",term);
    var result = await sails.helpers.user.action("getTags",this.req);
    console.log("controller getTags",result);
    return result;
   

  }


};
