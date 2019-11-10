module.exports = {


  friendlyName: 'Request',


  description: 'Request exchange.',


  inputs: 
  {
    info: {
      description: 'signup info',
      type: "ref",
      required: true,
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const signUpPayload = inputs.info;
  
      var result = await sails.helpers.exchange.request("post","/account/signup",signUpPayload);
      if(result == "OK"){
          return true;
      }else{
        return false;
      }
  }


};

