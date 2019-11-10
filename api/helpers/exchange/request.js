module.exports = {


  friendlyName: 'Request',


  description: 'Request exchange.',


  inputs: {
    method: {
      description: 'request type',
      example: 'GET',
      type: "string",
      required: true,
    },
    endpoint: {
      description: 'the endpoin that goes at the end of the exchange url.',
      example: '/public/markets',
      type: 'ref',
      required: true
    },
    data: {
      description: 'data object/payload being sent',
      type: 'ref',
      required: true
    },
    session: {
      description: 'The type of the email.',
      type: 'ref',
      required: false
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // return;
    // return ;
    const request = require('request-promise');
    var method = inputs.method;
    var uri = sails.config.exchange.shopTokey + inputs.endpoint;
    var data = inputs.data;
    var session = inputs.session;
    console.log("request session",session);
    if(session){
      var cookie = session.exchange;
    }else{
      var cookie = "";
    }
    var apiRequestHeader = {
        // 'X-CSRF-Token':csrfSecret,
        'cookie':cookie
    };
  console.log("request cookie",cookie);
  var options = {
      method: method,
      uri: uri,
      body: data,
      json: true, // Automatically stringifies the body to JSON
      headers: apiRequestHeader,
  };

    console.log("request options",options);
    // var marketsTickets = await request.get(testRequestUrl, {headers: apiRequestHeader,json:testPayload,resolveWithFullResponse: false})
    return await request(options)
    .then((testResponse) => {
        return testResponse;

    })
    .catch((error) => {
      return false;
      console.log('error',error);
        // res.status(error.statusCode).send(error.error.error_description);
        return error;
    });
    console.log('marketsTickets',marketsTickets);
  }


};

