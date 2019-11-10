module.exports = {


  friendlyName: 'Request',


  description: 'Request exchange.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {

  
      var result = await sails.helpers.exchange.request("get","/account/logout",{});
    //   return result;
    console.log("logout",result);
      if(result == 204){
          return true;
      }else{
        return false;
      }
  }


};

