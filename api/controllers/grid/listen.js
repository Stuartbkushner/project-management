module.exports = {
    //TODO add 

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
      var socket = "grids";
      sails.sockets.join(this.req, socket);

    }
    return {
    };

  }


};
