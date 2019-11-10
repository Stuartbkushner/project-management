module.exports = {


  friendlyName: 'Set page type',


  description: '',


  inputs: {
    session: {
      description: 'app user object being passed to the front end',
      type:"ref"
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
      var session = inputs.session;
      console.log("sesssion",session);
      if(session.page_set){
        var page = session.page;
        var page_user = await User.findOne({slug:page});
        console.log("page set user page ",page);
        console.log("page set user search ",page_user);


        if (page_user !== false) {
          var page_type = "user";
          var page_user_id  = page_user.user_id;
        }else{
          page_user = await Team.findOne({slug:page});
          console.log("page set team search ",page_team);
          var page_type = "team";
          var page_user_id  = page_user.team_id;
        }
        if (page_user_id == false ){
          var page_type = "404";
          //throw 404 error
        }
      }
    	else {
        var page_type = "public";
        var page_user_id = 0;
      }
      console.log("set page page_type ",page_type);
      console.log("page set page_user_id ",page_user_id);
    	session.page_user_id =  page_user_id;
      session.page_type =  page_type;
      console.log("session",session);
    	
      return session;
  }


};

