module.exports = {


  friendlyName: 'Publish',


  description: 'Publish grid.',


  inputs: {
    user_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    team_id: {
      description: 'team id of grid owner',
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
		var user_id = inputs.user_id;
		var team_id = inputs.team_id;
    var updaate = {};
		update['grid_type'] = "published";
		update['grid_title'] = info['grid_title'];
		update['grid_description'] = info['grid_description'];
		update['grid_lock_user_id'] = 0;
		update['grid_privacy_user_id'] = 0;
		title = update['grid_title'];
		update['slug'] = sails.helpers.slug.create('grids',title, user_id);
		grid_id = info['grid_id'];
		new_grid = await sails.helpers.grid.copy(grid_id,update);
		contact_row = await sails.helpers.update_contact(user_id,team_id,info);

		new_grid.phone =  info['phone'];
		new_grid.contact_name =  info['contact_name'];
		new_grid.contact_email =  info['email'];
    new_grid.message =  info['message'];
    await Project.addToCollection(new_grid.project_id,"grids").members(new_grid.id);
    await Project.addToCollection(new_grid.project_id,"published").members(new_grid.id);
		return new_grid;
  }


};

