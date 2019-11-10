module.exports = {


  friendlyName: 'Get',


  description: 'Get user.',


  inputs: {
    user_id: {
      description: 'The email address of the primary recipient.',
      extendedDescription: 'If this is any address ending in "@example.com", then don\'t actually deliver the message. '+
        'Instead, just log it to the console.',
      required: true,
      type: "number",

    },
    public: {
      description: 'is this public usage',
      required: true,
      // defaultsTo: true,
      type: "boolean",
    },
    req: {
      description: 'sails req varbile that comes from controller',
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
     /*
     this is what needs to be returned to the fron end
     view app controller gets projects and such 
     but this is other nessary data like the url and app state
	  		active_tab_type: "project"
			author: {user_first: "Mosaic", user_last: "Junction", user_id: "0", slug: "", invite_cnt: "0", …}
			contact_email: undefined
			contact_name: undefined
			grid_groups_dict: {}
			invite_cnt: "0"
			message: undefined
			name: "Mosaic Junction"
			phone: undefined
			projects: (16) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
			public: "1"
			settings: {current_project_id: 0, outline_cnt: 0, publish_cnt: 0, timer: 0, open_grids: {…}, …}
			slug: ""
			state: "public"
			state_data: ""
			team_id: "0"
			team_leader_id: "0"
			team_slug: "0"
			url: ""
			user_first: "Mosaic"
			user_id: "0"
			user_last: "Junction"
			username: "MosaicJunction"
	  */
    var user_id = inputs.user_id;
    var public = inputs.public;
    var req = inputs.req;
    /*
      get author info and get projects
      if pulbic only get projects with published gris
    */
    // if(req){
      page_user_id =  req.session.page_user_id;
    	page_type =  req.session.page_type;
    	user_id = req.session.user_id ;
    	team_id = req.session.team_id ;
    // }
    // if(public){
    	
    	if ( page_type == 'public' ) {
        var user = {};
        user.user_first = 'Mosaic';
        user.user_last = 'Junction';
        user.user_id = 0;
        user.slug = '';
        user.invite_cnt = 0;
        user.public = 1;

        user.projects = await sails.helpers.project.getAllProjects({});
        user.team_id =  0;
        user.team_leader_id = 0;
        user.team_slug = 0;
        url = user.slug;
      }else if ( page_type == 'team' ) {
        console.log("page type team",user_id);

        user = await sails.helpers.user.authorInfo(user_id,team_id) ;
        team = user.team;
        user.projects = await sails.helpers.project.getUserProjects({team_id:team_id},public);
        // user = userHelper.get_user_public(user_id,page_user_id);
        url = user.team_slug;
      }else{
        console.log("else user_id",user_id);
        user = await sails.helpers.user.authorInfo(user_id) ;
        user.projects = await sails.helpers.project.getUserProjects({user_id:user_id},public);
        user.team_id =  0;
        user.team_leader_id = 0;
        user.team_slug = 0;
        url = user.slug;
      }
      user.url = url;
      user.state =  'start';
      user.state_data = [];
      return user;
    // }else{

    // }
  }


};

