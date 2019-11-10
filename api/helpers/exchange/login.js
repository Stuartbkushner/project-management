module.exports = {


  friendlyName: 'Request',


  description: 'Request exchange.',


  inputs: {
    email: {
      description: 'login email',
      type: "string",
      isEmail: true,
      required: true,
    },
    password: {
      description: 'login password',
      type: 'string',
      required: true
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

    var uri = sails.config.exchange.loginUri;
    const data = {
        // email: inputs.email,
        emailAddress: inputs.email,
        password: inputs.password,
          // _csrf: "ajg4JD(JGdajhLJALHDa",
          // code
      };
      var email = inputs.email;
      var password = inputs.password;

    // var login = await sails.helpers.exchange.login(email,password);

    // var csrf_session = await sails.helpers.security.grantCsrfToken();
    // var exchange_cookie = login.cookie;
    // var cookie = testResponse.headers['set-cookie'].concat(csrf_session.sails_cookie);
    // // var body = testResponse.body;
       

    // return {
    //     // body : body,          
    //     cookie:cookie,
    //     exchange_cookie:exchange_cookie,
    // };




  var options = {
      method: "POST",
      uri: uri,
      body: data,
      json: true, // Automatically stringifies the body to JSON
      resolveWithFullResponse: true
  };

  
    console.log("login",options);
    // var marketsTickets = await request.get(testRequestUrl, {headers: apiRequestHeader,json:testPayload,resolveWithFullResponse: false})
    return await request(options)
    .then(async (testResponse) => {
        // console.log('test',testResponse);
        var csrf_session = await sails.helpers.security.grantCsrfToken();
        var exchange_cookie = testResponse.headers['set-cookie'];
        var cookie = testResponse.headers['set-cookie'].concat(csrf_session.sails_cookie);
        var body = testResponse.body;
       

        return {
            body : body,          
            cookie:cookie,
            exchange_cookie:exchange_cookie,
        };

    })
    .catch((error) => {
      console.log('error',error);
        // res.status(error.statusCode).send(error.error.error_description);
        return error;
    });
    console.log('marketsTickets',marketsTickets);
  }


};

