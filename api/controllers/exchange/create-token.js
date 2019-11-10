module.exports = {


  friendlyName: 'View token',


  description: 'Display "Shops" page.',

  inputs: {
    name: {
      description: 'Name of token',
      example: 'name',
      required: true
    },
    symbol: {
      description: 'symbol of token',
      example: 'symbol',
      required: true
    },
    description: {
      description: 'description of token',
      example: 'description',
      required: true
    },
    icoTargetGoal: {
      description: 'icoTargetGoal of token',
      type:'ref',
      required: false
    },
    commission: {
      description: 'commission of token',
      type:'ref',
      required: false
    },
    category: {
      description: 'category of token',
      type:'number',
      required: false
    },
    subcategory: {
      description: 'subcategory of token',
      type:'number',
      required: false
    },
    country: {
      description: 'country of token',
      example: 'country',
      required: true
    },
    city: {
      description: 'city of token',
      example: 'city',
      required: true
    },
    state: {
      description: 'state of token',
      example: 'state',
      required: true
    },
    zip: {
      description: 'zip of token',
      example: 'zip',
      required: true
    },
    website: {
      description: 'website of token',
      example: 'website',
      required: false
    },
    twitter: {
      description: 'twitter of token',
      example: 'twitter',
      required: false
    },
    // green: {
    //   description: 'is token green',
    //   type: "boolean",
    //   required: true
    // },
  },


  fn: async function (inputs) {


  //  var symbol = inputs.symbol;
  var session = this.req.session;

  console.log('inputs',inputs);
  var token = await sails.helpers.exchange.request("post","/tokens/mint",inputs,session);
  return token;

  }
  


};
