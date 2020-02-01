Project = {

  settings: {
  },

init: function() {

},
loadProjectSelect: function(projects) {

    $(".projectSelect").each( function(index,select) {
        select = $(this);
        var selected_id = select.val();
        select.empty();
        $.each(projects, function(index,project) {
            var selected = '';
            if (project.project_id == selected_id) {
              selected = "selected='selected'";
            };
            select.prepend("<option "+selected+" value='"+project.project_id+"'>"+project.project_name+"</option>");
        });
    });

  },



renderDashboard: function(project_id)
{
    $(".searchContainer").removeClass('projectFilter');
	$.when(this.getProject(project_id)).done(function(data) {
		var project = data;
		var project_url = project.user_url +'/'+project.slug;
    	Navigation.updateUrl(project_url);
		Project.loadProjectResources(project);
		Project.loadDashboard();
    });
},
loadProjectResources: function(project)
{
	
		User.setCurrentProject(project);
		Grid.loadGrids(User.data.grids); // belongs in navigation
		Pile.loadPile(User.data.pile_tiles);
		if (User.data.public == "0") {
			Source.loadSources(User.data.sources);
			Outline.loadOutlines(User.data.outlines);
			Template.loadTemplates(User.data.templates); //NEED TO REENABLE
			Published.loadPublished(User.data.published);
		}
		Navigation.showAllItems();
},
refreshDashboard: function(project_id){
	  project_tab = "tab_project_"+project_id;
	  tab_active = $('#'+project_tab).hasClass('active');
	  if (tab_active) {
	      Project.renderDashboard(project_id);
	  }

},	
loadDashboard: function()
{
	
	Application.setMode("dashboard");
	$('.gridInnerWrapper, .grid-message').empty();

	if(typeof User.data.grids !== 'undefined' && User.data.grids.length < 1) {
		var template_link = "Click <a class='selectTemplate' href='selectTemplate'>Here<a> to see suggested templates";
		$(".gridInnerWrapper").append("<div class='gridEmptyState'>You do not have any Grids for this Project.<br /><br />Click the plus icon next to 'Grids' on the left side to create your first grid, or you can start by uploading source files. <br><br>"+template_link+"</div>");
		$(".gridEmptyState").show();
		$('.selectTemplate').on("click", function(e) {
			e.preventDefault()
		  	$("#new_grid_button").click();
		});
		return;
	}
	else{
		$(".gridEmptyState").hide();
	}

	//User.data.dashboard_data should be replaced with User.data.projects.grids.grid
	$.each(User.data.grids, function(index,grid) {
		var grid_as_icon = Grid.renderAsIcon(grid);
		$(".gridInnerWrapper").prepend(grid_as_icon);
		grid_as_icon.find(".gridAsIconObjects").droppable({
		  greedy:true,
		  accept:".tile",
		  hoverClass: "tabDropActive",
		  tolerance: "pointer",
		  drop: function( event, ui ) {
		    event.stopPropagation();
		    ui.helper.remove();
		    var rendered_tile = ui.draggable;
		    var grid_id = $(this).find(".tab_grid_id").val();
		    Tile.placeOnGrid(rendered_tile,grid.grid_id);
		  }
		});

		grid_as_icon.on("click", function() {
		  Grid.loadGrid(grid);
		});
	});
},

renderProjectAsIcon: function(project) {
	var project_as_button = $('<div/>', {
	    title: project.project_name,
	    text: project.project_name,
	    class: "projectAsButton"
	});
	var project_folder = $('<div/>', {
	    class: "projectFolder"
	});
	var username = $('<label>',{
		title: project.author.username,
	    text: project.author.username,
	    class: "username"
	});
	project_folder.append(project_as_button);
	project_folder.append(username);
	
	project_folder.on("click", function() {
		Project.loadProject(project.project_id);
	});

	return project_folder;
},

loadProject: function(project_id) {
	$(".tile_modal_send_to_grid").empty();
	$.when(this.getProject(project_id)).done(function(data) {
		var project = data;	
		User.setCurrentProject(project);
		Navigation.clearAllTabs();
		//if we already have a tab
		if(!Navigation.tabExists("tab_project_"+project.project_id))
		{
			//if we don't have a tab for this project, create one
				var project_tab = Navigation.createTab(project.project_name+" > Grids", {
				  closeable:true,
				  id: 'project_'+project_id
				});

				project_tab.rendered_tab.appendTo(".gridTabs");

		}
		//$(".headerCurrentProject").html(project.project_name);
		//switch to this tab
		Navigation.switchToTab("tab_project_"+project_id);
        Navigation.showAllItems();
        Navigation.updateFrames();
		Project.loadDashboard();
    	console.log('send', 'event', 'Projects', 'load Project', project.project_name, project.project_id);
        $('.headerCurrentProject').html(data.project_name);

	});

},

getProject: function(project_id) {
	return $.ajax({
      type: "POST",
      dataType: 'json',
      url: '/project/getProject',
      data: {
        project_id: project_id
      }
	});
}, 

/**

ALL NEW CODE GOES ABOVE THIS LINE

**/
getProjectsWithVersions: function() {

	//return User.data.projects;
	var project_array = new Array();
	$.each(User.data.projects, function(index,project) {
		project_array.push({
			"id":project.project_id,
			"ver":project.project_version
		});
	});

	return project_array;

},


editProject: function(project,rendered_element) {
	//load the project modal
	$(".projectModal").filter(":visible").remove();
	var modal = $("#project_modal").mj_modal();
	modal.children(".header").prepend("Edit Project");
	//populate modal 
	modal.find(".name").val(project.project_name);
	modal.find(".description").val(project.project_description);

	//attach handler to save button
	modal.find('.save').on("click", function() {
		project.project_name = modal.find(".name").val();
		project.project_name = $.trim(project.project_name);
		if (project.project_name == '') {
			alert('Please Name Your Project');
		}else{
			project.project_description = modal.find(".description").val();
			console.log('send', 'event', 'Projects', 'edit', project.project_name, project.project_id);
			$.when(Project.save(project)).done(function(data) {
				project = data;
				rendered_element.find(".listItemTitle").html(project.project_name.trimToLength(40));
				var project_active = $('.tab_project_' + project.project_id).hasClass('active');
				$('.tab_project_' + project.project_id).html(project.project_name+' > Grids');
				$('.headerCurrentProject').html(project.project_name);
				var new_projects = User.data.projects.filter(function(obj) {
					return obj.id != project.project_id;
				});
				if (project_active) {
					var project_url = User.data.url +'/'+project.slug;
					User.data.settings.current_project_url = project_url;
	    			Navigation.updateUrl(project_url);
				}
				
				//increment version
				project.project_version++
				//User.data.projects.push(project);
				//User.data.projects = new_projects;
				Navigation.updateFrames();
				Grid.reloadGrids();
				modal.remove();
			});

		}
		
	});
},

newProject: function() {
//NEED TO UPDATE NAVIGATION FRAME HERE
	//load the project modal
	
	$(".projectModal").filter(":visible").remove();
	var modal = $("#project_modal").mj_modal();
	// var modal = $("#project_modal");
	modal.children(".header").prepend("New Project");
	Project.activateSave(modal);
},
activateSave: function(modal) {
	console.log("project modal",modal);
	var project = {};
	project.project_id = 0;
	var helpModal = modal.hasClass('helpModal');
	console.log("project save clicked");
	console.log("project save count",modal.find('.save').length);
	modal.find('.save').on("click", function() {
		console.log("project save clicked");

		project.project_name = modal.find(".name").val();
		project.project_name = $.trim(project.project_name);
		if (project.project_name == '') {
			alert('Please Name Your Project');
		}else{

			project.project_description = modal.find(".description").val();
			$.when(Project.save(project)).done(function(data) {
				project = data;
				console.log('send', 'event', 'Projects', 'save', project.project_name, project.project_id);
				$("#project_list").prepend(Project.renderProjectAsListItem(project));
				var project_as_object = {
					"project_id":project.project_id,
					"project_description":project.project_description,
					"project_group_id":User.data.settings.current_group,
					"project_name":project.project_name,
					"project_owner_id":User.data.user_id,
					"project_version":0
				};

				User.data.projects.push(project);
				Grid.reloadGrids();

				//make sure we are really on the application dashboard here
				// if(User.data.projects.length === 1)
				// {
				// 	Application.loadDashboard();
				// 	modal.remove();
				// 	return;
				// }
	          // if we are looking at a project dashboard, reload it
	          if (helpModal) {
					modal.hide();
				}
	          if(Navigation.getActiveTabType() === "application_dashboard")
	          {
					Application.loadDashboard();
					if (!helpModal) {
						modal.remove();
					}
					
					return; //TODO: return is here because updateFrames does some funky stuff if called. function calls in updateFrames that do things besides update the frame should be removed from updateFrames into the appropriate places
	          }          

				Navigation.updateFrames();
				if (!helpModal) {
					modal.remove();
				}
			});
		}
	});
},

save: async function(project) {
	var csrf = await CSRF.token();
       console.log('csrf',csrf);
    //    console.log('form_id',form_id);
       console.log('project',project); //data in json format
	var action = "saveProject";
       var apiRequestHeader = {
         'X-CSRF-Token':csrf._csrf,
           // 'cookie':cookie
       };
	return $.ajax({
	  type: "POST",
	  headers:apiRequestHeader,
      url: '/project/saveProject',
      dataType:'JSON',
      data: {
        project_id: project.project_id,
        project_name: project.project_name,
        project_description: project.project_description
      }
	});

},


deleteProject: async function(project_id) {
	$('.tab_project_' + project_id).remove();
	var csrf = await CSRF.token();
       console.log('csrf',csrf);
    //    console.log('form_id',form_id);
	var action = "saveProject";
       var apiRequestHeader = {
         'X-CSRF-Token':csrf._csrf,
           // 'cookie':cookie
       };
      $.ajax({
      type: "POST",
	  headers:apiRequestHeader,
      url: '/project/deleteProject',
      data: {
        project_id: project_id
      },
      success: function(data) 
      {
			console.log('send', 'event', 'Projects', 'delete', data.project_name, data.project_id);
	      	var new_projects = User.data.projects.filter(function(project) {
	      		return project.project_id != project_id;
	      	});
	      	User.data.projects = new_projects;

	    //   if(Navigation.getActiveTabType() === "application_dashboard")
	    //   {
		// 		Application.loadDashboard();
		// 		// modal.remove();
		// 		return; //TODO: return is here because updateFrames does some funky stuff if called. function calls in updateFrames that do things besides update the frame should be removed from updateFrames into the appropriate places
	    //   }    

      },
      dataType: 'json'
      });
},

	renderProjectAsListItem: function(project)
	{

	var container_div = $("<div/>", {class:"listItem",id:"project_"+project.project_id});
	var title_container_div = $("<div/>", {class:"listItemTitle unselectable"}).html(project.project_name.trimToLength(40)).on("click", function() {
		Project.loadProject(project.project_id);
		$(".listItem.active").removeClass("active");
		$(this).parent().addClass("active");
		var project_name = $(this).html();
		// $('.headerCurrentProject').html(project_name);

		var headerCurrentProject = $('.headerCurrentProject').html();
		$('.tab_project_'+project.project_id+ '.title').html(project_name + ' > Grids');
		
	});

	var items = {
			            "edit": {
			                name: "Edit Project Name", 
			                callback: function(key, options) {
								Project.editProject(project,container_div);
			                }
			                }

	};
	 // owner
	  if(User.data.team_leader_id > 0 && User.data.user_id == User.data.team_leader_id)
	  {
	    //if grid unlocked, in team mode and team leader
	    items.delete = {
                name: "Delete", 
                callback: function(key, options) {
	                if (confirm("Are you sure you want to delete this project and ALL tiles and grids contained by it?")) {
	                	container_div.remove();
	                	Navigation.updateFrames();
						Project.deleteProject(project.project_id);
					}
	            }
            };
	  }else if(User.data.team_leader_id == 0) {
	  	items.delete = {
                name: "Delete", 
                callback: function(key, options) {
	                if (confirm("Are you sure you want to delete this project and ALL tiles and grids contained by it?")) {
	                	container_div.remove();
	                	Navigation.updateFrames();
						Project.deleteProject(project.project_id);
					}
	            }
            };

	  }


	var gear_icon = gearMenu(items);
	container_div.append(title_container_div,gear_icon);
	container_div.append("<input type='hidden' class='navProjectID' value='"+project.project_id+"'>");

	return container_div;
	}


}

