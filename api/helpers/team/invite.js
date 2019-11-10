module.exports = {


  friendlyName: 'Get',


  description: 'Get tile.',


  inputs: {
	user_id: {
        type: 'number',
        required: true,
	},
	team_id: {
        type: 'number',
        required: true,
    },
	invitee_email: {
        type: 'string',
        required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
	  var user_id = inputs.user_id;
	  var team_id = inputs.team_id;
	  var invitee_email = inputs.invitee_email;
	  var team_user_invite = await Team_Invite.create({
		  user_id : user_id,
		  team_id : team_id,
		  invitee_email : invitee_email,
	  }).fetch();
	  return team_user_invite;
	  var owner = await User.findOne({user_id:user_id});



		headers = "From: hello@mosaicjunction.com";
		var owner_name = owner.fullName;
		var register_link = sails.config.custom.baseUrl+"/register";
		var from = sails.config.custom.fromEmailAddress;


		//user already has an account
		if(count(user) > 0)
		{
			site_url =  sails.config.custom.baseUrl+"/welcome";
			//email user, log into mj to accept the invite
			subject = "owner_name wants you to join team->team_name";
			txt = `<p>Hi,</p>
			<p>You have been invited to join a Mosaic Junction Team created by owner_name.</p>
			<p>When you log in, click on the \"My Teams\" link to accept the invite. </p>
			<p>Please feel free to directly contact the Team Owner to verify this request.</p>
			<p>Mosaic Junction is a software platform to allow team to visually organize their documents and notes on to visual grids for better discover, discussions and decision making.</p>
			<p>Thank you,</p>
			<p>Mosaic Junction Team<p/>
			<p><a href='`+site_url+`' >`+site_url+`</a><p/>";
			//<p><a href='`+site_url+`' target='blank' >www.MosaicJunction.com</a><p/>`;

		}
		//user does not have an account
		else
		{
			var site_url =  sails.config.custom.baseUrl;
			//send email telling user to create an account with mj to accept invite
			subject = "owner_name wants you to join "+team.team_name;
			txt = `<p>Hi,</p>
			<p>You have been invited to join a Mosaic Junction Team created by owner_name.</p>
			<p>Since you currently do not have a Mosaic Junction account, please register at this link register_link .  </p>
			<p>When you log in, click on the \"My Teams\" link to accept the invite. </p>
			<p>Please feel free to directly contact the Team Owner to verify this request.</p>
			<p>Mosaic Junction is a software platform to allow team to visually organize their documents and notes on to visual grids for better discover, discussions and decision making.</p>
			<p>Thank you,</p>
			<p>Mosaic Junction Team<p/>
			<p><a href='`+site_url+`' >`+site_url+`</a><p/>`;

		}

		

		await sails.helpers.sendTemplateEmail.with({
			to: invitee_email,
			subject: subject,
			template: 'internal/email-contact-form',
			layout: false,
			templateData: {
			  contactName: owner_name,
			  contactEmail: from,
			//   topic: inputs.topic,
			  message: txt
			}
		  });

	

		return team_user_invite;
  }


};

