module.exports = {


  friendlyName: 'Has slug access',


  description: '',


  inputs: {
    user_id: {
      description: 'id of user requesting access',
      required: true,
      type: "number",
    },
    slug_type: {
      description: 'project slug',
      required: true,
      type: "string",
    },
    slug: {
      description: 'project slug',
      required: true,
      type: "string",
    },
    action: {
      description: 'grid slug',
      required: true,
      type: "string",
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    console.log('inputs',inputs);
    return true;
  }


};

