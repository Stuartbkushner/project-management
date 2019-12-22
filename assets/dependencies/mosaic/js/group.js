Group = {

	loadGroup: function(group_id) {

		//grab all the groups data
		$.when(this.getAllGroupData(group_id)).done(function(data) {
			Project.initProject(data);
		});

	},

	getAllGroupData: function(group_id) {
	  return $.ajax({
	      type: "POST",
	      url: '/action?action=setTeam',
	      data: {
	        team_id:team_id
	      },
	      dataType: 'json'
	      });
	},
	


	declineInvitation: function(team_invite_id) {
       console.log('send', 'event', 'Teams', 'decline invitation', 'decline invitation', team_invite_id);
	  return $.ajax({
	      type: "POST",
	      url: '/action?action=declineInvitation',
	      data: {
	      	team_invite_id: team_invite_id
	      },
	      dataType: 'json'
	      });
	},

	acceptInvitation: function(team_invite_id) {
       console.log('send', 'event', 'Teams', 'accept invitation', 'accept invitation', team_invite_id);
	  return $.ajax({
	      type: "POST",
	      url: '/action?action=acceptInvitation',
	      data: {
	      	team_invite_id: team_invite_id
	      },
	      dataType: 'json'
	      });
	},

	viewGroup: function() {
		console.log('viewGroup call');

		var view_groups_modal = $("#view_groups_modal").mj_modal();

		view_groups_modal.find(".save").on("click", function() {
			Group.newGroup();
		});

		$.when(this.getGroups()).done(function(data) {

			var groups = data.groups;
			var invites = data.invites;

			



			$.each(invites, function(index,invite) {
				console.log('invite',invite);
				var invite_decline = $("<button/>",{text:'Decline'}).on("click", function() {
					$.when(Group.declineInvitation(invite.team_invite_id)).done(function(data) {
						view_groups_modal.remove();
						Group.viewGroup();
						User.data.invite_cnt--;
    					User.loadNotifications();

					});
				});
				var invite_accept = $("<button/>",{text:"Accept"}).on("click", function() {
					$.when(Group.acceptInvitation(invite.team_invite_id)).done(function(data) {
						view_groups_modal.remove();
						Group.viewGroup();
						User.data.invite_cnt--;
    					User.loadNotifications();
					});
				});

				$('<div/>', {
				    class: 'groupInvite',
				    text: invite.user_first+" "+invite.user_last+" invited you to join the group "+invite.team_name
				}).append("<br>",invite_decline,invite_accept).appendTo(view_groups_modal.find(".groupInvites"));
			});


			//set up our template
			var group_container_template = view_groups_modal.find(".groupContainer").clone();
			view_groups_modal.find(".groupContainer").remove();
			console.log('groups',groups);
			$.each(groups, function(index,group) {

				if (group == null || group == 0)
				{
					return true;
				}
				var group_owner = group.members.filter(function(index) {
					return index.user_id==group.user_id;
				});
				group_owner  = group_owner[0];
				var group_owner_id  = $(group_owner).prop('user_id');

				var cloned_template = group_container_template.clone();
				cloned_template.find(".groupName").html("<a href='/action?action=setTeam&team_id="+group.team_id+"'>"+group.team_name+"</a>");

				var member_template = cloned_template.find(".groupMember").clone();
				cloned_template.find(".groupMember").remove();
				$.each(group.members, function(index,member) {
					console.log('memeber',member);
					var cloned_member_template = member_template.clone();
					cloned_member_template.find(".groupMemberDetails").html(member.user_first+" "+member.user_last+" "+"<a href='mailto:"+member.user_email+"'>"+member.user_email+"</a>");
					console.log('User.data.user_id',User.data.user_id,'group_owner_id',group_owner_id);
					var member_gear_icon = '';
					
					if(member.user_id == group_owner_id)
					{
						cloned_member_template.find(".groupMemberDetails").append(" (Owner)");
					}
					else if(User.data.user_id == group_owner_id)
					{
						var items = {
						                  "owner": {
						                      name: "Make Owner", 
						                      callback: function(key, options) {
						                      	var result = confirm("Are you sure you want to make "+member.user_first+" "+member.user_last +" the owner of "+group.team_name+"?");
												if (result) {
												    $.when(Group.makeTeamOwner(group.team_id,member.user_id ) ).done(function(data) {
														view_groups_modal.remove();
														Group.viewGroup();
      													console.log('send', 'event', 'Teams', 'change owener', group.team_name+' - '+ group.team_id, member.user_id);

													});
												}
												else{
													$('.groupContainer .gear_icon').css('display','block');
												}
						                      	
						                      }
						                      },
						                  "Remove": {
						                      name: "Remove Member", 
						                      callback: function(key, options) {
												var result = confirm("Are you sure you want to remove "+member.user_first+" "+member.user_last +" from "+group.team_name+"?");
												if (result) {
												    $.when(Group.removeTeamMember(group.team_id,member.user_id ) ).done(function(data) {
														view_groups_modal.remove();
														Group.viewGroup();
      													console.log('send', 'event', 'Teams', 'remove member', group.team_name+' - '+ group.team_id, member.user_id);

													});
												}
												else{
													$('.groupContainer .gear_icon').css('display','block');
												}

						                      }
						                    }
						   

						}
					   member_gear_icon = gearMenu(items);

					} else if(User.data.user_id == member.user_id)
					{
						var items = {
						                  "owner": {
						                      name: "Leave Group", 
						                      callback: function(key, options) {
						                      	var result = confirm("Are you sure you want to leave "+group.team_name+"?");
												if (result) {
												    $.when(Group.leaveTeam(member.team_user_id ) ).done(function(data) {
														view_groups_modal.remove();
														Group.viewGroup();
      													console.log('send', 'event', 'Teams', 'remove team', group.team_name+' - '+ group.team_id, member.user_id);

													});
												}
												else{
													$('.groupContainer .gear_icon').css('display','block');
												}
						                      	
						                      }
						                      }
						}
					member_gear_icon = gearMenu(items);

					}
				    cloned_member_template.find(".groupMemberActions").append(member_gear_icon);
					cloned_template.find(".groupMembers").append(cloned_member_template);

				});
					if(User.data.user_id == group_owner_id)
					{
						var items = {
						                  "rename": {
						                      name: "Rename Team", 
						                      callback: function(key, options) {
						                      	view_groups_modal.remove();
						                		Group.editGroup(group.team_id,group.team_name);
						                      }
						                      },

						                  "invite": {
						                      name: "Invite User to Team", 
						                      callback: function(key, options) {
						                      	view_groups_modal.remove();
						                      	Group.inviteUserToGroup(group.team_id);
						                      }
						                      },
						                  "Disband": {
						                      name: "Disband Team", 
						                      callback: function(key, options) {
						                      	
												var result = confirm("Are you sure you want to disband "+group.team_name+"?");
												if (result) {
												    $.when(Group.removeTeam(group.team_id ) ).done(function(data) {
														view_groups_modal.remove();
														Group.viewGroup();
      													console.log('send', 'event', 'Teams', 'delete', group.team_name+' - '+ group.team_id,group.team_id );

													});
												}
												else{
													$('.groupContainer .gear_icon').css('display','block');
												}
						                      }

						                      }
						};

						var gear_icon = gearMenu(items);
						console.log('gear_icon',gear_icon);
						cloned_template.find(".groupActions").append(gear_icon);
					}
					view_groups_modal.find(".content").append(cloned_template);

			}); //end big each

		}); //end when

	},


	inviteUserToGroup: function(group_id) {

		var modal = $("#invite_to_group_modal").mj_modal();
		modal.find(".header").prepend("Invite User to Group");

		modal.find(".save").on("click", function() {
			$.when(Group.sendInvite(group_id,modal.find(".invite_user_email").val())).done(function(data) {
				modal.remove();
				Group.viewGroup();
			});
		});
		
	},


	sendInvite: function(group_id, invitee_email) {
       console.log('send', 'event', 'Teams', 'send invite', invitee_email, User.data.user_id);
	  return $.ajax({
	      type: "POST",
	      url: '/action?action=inviteUserToGroup',
	      data: {
	      	group_id: group_id,
	      	invitee_email: invitee_email
	      },
	      dataType: 'json'
	      });
	},

	editGroup: function(group_id, group_name) {
        console.log('send', 'event', 'Teams', 'edit', group_name, group_id);
		$(".viewGroupsModal").filter(":visible").remove();

		var new_group_modal = $("#new_group_modal").mj_modal();
		new_group_modal.children(".header").prepend("Rename Group");

		new_group_modal.find(".new_group_name").val(group_name);
		new_group_modal.find(".new_group_id").val(group_id);

		new_group_modal.find(".save").on("click", function() {
			$.when(Group.saveGroup(new_group_modal.find(".new_group_name").val(),new_group_modal.find(".new_group_id").val())).done(function(data) {
				new_group_modal.remove();
				Group.viewGroup();
			});
		});

	},

	getGroups: function() {
       console.log('send', 'event', 'Teams', 'get', 'Get user teams', User.data.user_id);

	  return $.ajax({
	      type: "POST",
	      url: '/action?action=getGroups',
	      data: {
	      },
	      dataType: 'json'
	      });
	},

	newGroup: function() {

		$(".viewGroupsModal").filter(":visible").remove();

		var new_group_modal = $("#new_group_modal").mj_modal();
		new_group_modal.children(".header").prepend("New Team");

		new_group_modal.find(".save").on("click", function() {
			$.when(Group.saveGroup(new_group_modal.find(".new_group_name").val(),0)).done(function(data) {
				new_group_modal.remove();
				Group.viewGroup();
			});
		});

	},


	saveGroup: function(team_name, team_id) {
      console.log('send', 'event', 'Teams', 'save', team_name, team_id);

	  return $.ajax({
	      type: "POST",
	      url: '/action?action=createNewGroup',
	      data: {
	      	team_name:team_name,
	      	team_id:team_id
	      },
	      dataType: 'json'
	      });
	},
	removeTeam: function(team_id) {
	  return $.ajax({
	      type: "POST",
	      url: '/action?action=removeTeam',
	      data: {
	      	team_id:team_id
	      },
	      dataType: 'json'
	      });
	},
	makeTeamOwner: function(team_id,user_id) {

	  return $.ajax({
	      type: "POST",
	      url: '/action?action=makeTeamOwner',
	      data: {
	      	team_id:team_id,
	      	user_id:user_id
	      },
	      dataType: 'json'
	      });
	},
	removeTeamMember: function(team_id,user_id) {

	  return $.ajax({
	      type: "POST",
	      url: '/action?action=removeTeamMember',
	      data: {
	      	team_id:team_id,
	      	user_id:user_id
	      },
	      dataType: 'json'
	      });
	},
	leaveTeam: function(team_user_id) {

	  return $.ajax({
	      type: "POST",
	      url: '/action?action=leaveTeam',
	      data: {
	      	team_user_id:team_user_id
	      },
	      dataType: 'json'
	      });
	}





}