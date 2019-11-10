/**
 * TeamUser.js
 *
 * A Team is several members working on the same project.
 *  */

module.exports = {
  primaryKey: 'team_user_id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    team_user_id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      required: true,
    },

    team_user_level: {
        type: 'boolean',
        required: true,
    },

    user_order: {
        type: 'number',
        required: true,
    },

    team_order: {
        type: 'number',
        required: true,
    },

    
    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    



    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user_id: {
      model: 'user'
    },

    team_id: {
        model: 'team'
    },
  
  },


};
