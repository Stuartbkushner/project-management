module.exports = {


  friendlyName: 'Place order',


  description: 'Places orders to api.',
  inputs: {  
  },


  exits: {

    success: {
      description: 'Listening.',
    }

  },


  fn: async function (inputs) {
    

    if (this.req.isSocket) {
      var socket = "markets";
      sails.sockets.join(this.req, socket);

    }
    return {
    //   baseUrl:sails.config.custom.baseUrl,
    };

  }


};
