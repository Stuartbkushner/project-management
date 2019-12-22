module.exports = {


  friendlyName: 'View project',


  description: 'Display "Project" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/project/project'
    }

  },


  fn: async function () {

    // Respond with view.
    var user = this.req.me;

    var projectSlug = this.req.param("projectSlug");
    console.log("view project projectSlug",projectSlug);
    var project = await Project.findOne({slug:projectSlug});
    console.log("view project project",project);
    if(project ==  undefined){
      return this.res.notFound();
    }

    var public = user.user_id == project.user_id;
    var project_id = project.project_id
    console.log("view project project_id",project_id);
    console.log("view project user",user);
    console.log("view project public",public);
    console.log("view project project",project);

    project = await sails.helpers.project.get(project_id,public);

    var user = {
      active_tab_type: "project",
			author: {user_first: "Mosaic", user_last: "Junction", user_id: "0", slug: "", invite_cnt: "0", },
			contact_email: undefined,
			contact_name: undefined,
			grid_groups_dict: {},
			invite_cnt: "0",
			message: undefined,
			name: "Mosaic Junction",
			phone: undefined,
			projects:  [],
			public: public,
			settings: {current_project_id: 1, outline_cnt: 0, publish_cnt: 0, timer: 0},
			slug: "",
			state: "loadProject",
			state_data: {
        project:project,
      },
			team_id: "0",
			team_leader_id: "0",
			team_slug: "0",
			url: "",
			user_first: "Mosaic",
			user_id: "0",
			user_last: "Junction",
      username: "MosaicJunction",
      active_grid : {},
      global_grid_groups : { 
        templates : [],
      }
    }


    return {
      user : user,
      public:public,
      project:project,
    };

  }


};
