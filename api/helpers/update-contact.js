module.exports = {


  friendlyName: 'Update contact',


  description: '',


  inputs: {
	user_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
	},
	team_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
	},
	info: {
        description: 'req object posted',
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
    var info = inputs.info;
    var team_id = inputs.team_id;		
	var user_id = inputs.user_id;
	if (team_id) {
		contact_row = await Team.updateOne({team_id:team_id} ).set(info);
	}else{
		contact_row = await User.updateOne({user_id:user_id} ).set(info);
	}
	var contact_info = {};
	contact_info.phone =  contact_row.phone;
	contact_info.contact_name =  contact_row.contact_name;
	contact_info.contact_email =  contact_row.contact_email;
	contact_info.message =  contact_row.message;
	return contact_info;
  }


};

