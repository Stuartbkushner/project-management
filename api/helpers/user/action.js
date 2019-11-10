module.exports = {


  friendlyName: 'User Action',


  description: 'User Action tile.',


  inputs: {
    action: {
        description: 'action of grid',
        required: true,
        type: "string",
      },
      req: {
          description: 'req object posted',
          required: true,
          type: "ref",
      },
      result: {
          description: 'req object posted',
          type: "ref",
          defaultsTo: {},
      },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var action = inputs.action;
    var req = inputs.req;
    var result = inputs.result;
    var post = inputs.req;
    user_id = req.me ? req.me.user_id : 0;


    switch(action) {

        case "getTags":

            result = await sails.helpers.user.getTags(user_id,post['term']);
            break;
        case "updateUser": //setActiveGrid
            user = await sails.helpers.user.update(user_id,post) ;
            result = user;
            break;
        case "submitFeedback":
           /*
            should use contact page
           */
            break;
        case "contact":
            page_user_id = req.session['page_user_id'];
            page_type = req.session['page_type'];
            if (page_type == "team") {
                page = Teams.findOne({id:page_user_id});
            }else{
                page = Users.findOne({id:page_user_id});
            }
            contact_email =  page.contact_email;
            email_sent = sails.helpers.user.contact(contact_email,post);
            result = email_sent;
            break;
        case "contactUs":
             /*
            should use contact page
           */
    
            // user = new User_Helper();
            // not_robot = user->verify_captcha();
            // var_dump(not_robot);
            // if(not_robot){
            //     email_sent = user->contact_us(post);
            //     result = email_sent;
            //     header("Location: ../contact?sent=true");
    
            // }else{
            //     header("Location: ../contact?robot=true");
            // }
            
    
            break;
        case "getUser":
            var page_user_id = req.session['page_user_id'];
            console.log("page_user_id",page_user_id);
            if(user_id == 0){
                user_data = await sails.helpers.user.get(page_user_id,true,req);
            }else{
                user_data = await sails.helpers.user.get(page_user_id,false,req);
            }
            result = user_data;
            break;
        case "myAccount":
            req.session['team_id'] = 0;
            req.redirect("/app");
            break;
            
        default:
        
            break;
    } //end switch
    return result;
    
  }


};



