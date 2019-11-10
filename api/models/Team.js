/**
 * Team.js
 *
 * A Team is several members working on the same project.
 *  */

module.exports = {
  primaryKey: 'team_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    team_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
    },

    slug: {
      type: 'string',
      required: true,
    },

    team_name: {
        type: 'string',
        required: true,
    },

    team_version: {
        type: 'number',
    },

    contact_name: {
        type: 'string',
    },

    phone: {
        type: 'number',
        //required: true,
    },

    contact_email: {
        type: 'string',
        //required: true,
    },

    message: {
        type: 'string',
        //required: true,
    },
    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    members: {
      collection: 'user',
      via: 'teams'
    },

    projects: {
      collection: 'project',
      via: 'team_id'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user_id: {
      model: 'user'
    },

    
  },


};
