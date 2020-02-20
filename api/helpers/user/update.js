module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    user_id: {
      description: 'id of user being updaed',
      required: true,
      type: "number",

    },
    info: {
      description: 'info with update info',
      required: true,
      type: "ref",
    },



  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var user_id = inputs.user_id;
    var info = inputs.info;
    var user = await User.updateOne({user_id:user_id}).set(info);
    var update_name = false;
    var update_user_first = info.hasOwnProperty("user_first");
    var update_user_last = info.hasOwnProperty("user_last");
    update_name = update_user_first || update_user_last ;


    if (update_name) {
        var user = await User.findOne({user_id:user_id});
        // name = user.user_first+user.last_name;
        name = user.fullName;
        slug = await sails.helpers.slug.create('team','team_name',name);
        slug = await sails.helpers.slug.create('user','slug',slug);
        info.slug = slug;
        user = await User.updateOne({user_id:user_id}).set(info);

    }
    // console.log("helper update user",user);
    return user;

  }


};

