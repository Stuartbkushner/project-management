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
    var update = {};
    console.log("helpers grid publish inputs",inputs);
		update['grid_type'] = "published";
		update['grid_title'] = info['grid_title'];
		update['grid_description'] = info['grid_description'];
		update['grid_lock_user_id'] = 0;
		update['grid_privacy_user_id'] = 0;
    title = update['grid_title'];
    update['slug'] = await sails.helpers.slug.create('grid',title, user_id);
    console.log("helpers grid publish update",update);
    
		grid_id = info['grid_id'];
		new_grid = await sails.helpers.grid.copy(user_id,team_id,grid_id,update);
		contact_row = await sails.helpers.updateContact(user_id,team_id,info);
    console.log("helpers grid publish contact_row",contact_row);
    console.log("helpers grid publish new_grid",new_grid);

		new_grid.phone =  info['phone'];
		new_grid.contact_name =  info['contact_name'];
		new_grid.contact_email =  info['email'];
    new_grid.message =  info['message'];
    await Project.addToCollection(new_grid.project_id,"grids").members(new_grid.grid_id);
    await Project.addToCollection(new_grid.project_id,"published").members(new_grid.grid_id);
		return new_grid;
  }


};

