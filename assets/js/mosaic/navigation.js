Navigation = {

	init: function() {
		console.log("navigation init called");

	    this.populateProjectsList(User.data.projects);
	    this.bindUIActions();

	    // this.populateGridsList(User.data.grids);
	    // this.populateSourcesList(User.data.sources);
	    // this.populateOutlinesList(User.data.outlines);
	    // this.populatePublishedList(User.data.published);
	},

	getActiveTabInfo: function() {
		  var tab_info = {};
		  tab_info['type'] =  '';
          tab_info['id'] =  '';
		  var tab_type = "";
          var open_tabs = $('.tab');
          var active_project_tab = open_tabs.filter(function(index,value) {
            return $(value).hasClass('active');
          });

          if(typeof active_project_tab !== 'undefined' && active_project_tab)
          {

            var tab_split = $(active_project_tab).attr('class').split(' ');
            var tab_id = tab_split.filter(function(index1,value1) {
              return index1.indexOf('tab_') >= 0;
            });

            if(typeof tab_id !== 'undefined' && tab_id.length === 1)
            {
            	tab_id = tab_id[0];
            	tab_info =  Navigation.getTabInfo(tab_id);
            }
          }

		return tab_info ;
	},
	getTabInfo: function(tab_id) {
		  var tab_info = {};
		  tab_info['type'] =  '';
		  tab_info['id'] =  '';
		  var tab_id_split = tab_id.split('_');
		  //if we are not on the application dashboard, we must be on the project dashboard (finally)
		  if(tab_id_split[2] == "dashboard")
		  {
		  	//must be on the application dashboard
		  	tab_type = "application_dashboard";
		  }
		  else if(tab_id_split[1] == "project" && tab_id_split[2] !== "dashboard")
		  {
		  	//must be on the project tab
		  	tab_type = "project_dashboard";
		  }
		  else if(tab_id_split[1] == "grid")
		  {
		  	//must be on a grid
		  	tab_type = "grid";

		  }
		  else
		  {
		  }
		  tab_info['type'] =  tab_type;
		  tab_info['id'] =  tab_id_split[2];

		return tab_info;
	},
	getActiveTabType: function() {
		var tab_info = Navigation.getActiveTabInfo();

		return tab_info['type'];
	},

	clearAllModals: function() {
		$(".modal:visible").remove();
	},

	hideAllButProjects: function() {
		$(".navGrids, .navSources, .navOutlines, .navPublished, .navTemplates").hide();
		$(".listContainer ul").not("#project_list").hide();
	},

	showAllItems: function() {
		$(".navGrids, .navSources, .navOutlines, .navPublished, .navTemplates").show();
		$(".listContainer ul").not("#project_list").show();
	},

	clearAllTabs: function() {
		$(".gridTabs .tab").not(".tab_project_dashboard").remove();
	},

	clearNavigation: function() {
		$("#project_list").empty();
		$("#grid_list").empty();
		$("#source_list").empty();
		$("#outline_list").empty();
		$("#published_list").empty();
		$("#template_list").empty();
	},

	updateFrames: function() {
		//if we have an open navigation item and something in it changed, resize it, creating scroll if necessary
		var nav_box = $(".listContainer:visible");
		var current_box_height = nav_box.outerHeight();
		var current_content_height = Layout.getOccupiedSpaceInContainer(nav_box);
		var active_tab_type = User.data.active_tab_type;
		//if the box got bigger, we may need to create a scroll (if the total height of nav items will exceed the available vertical space in the navigation column)
		if(current_box_height < current_content_height)
		{
			var space_available = Layout.getAvailableVerticalSpace($(".col1").find(".navColumnContent")) + current_box_height;
			var space_needed = current_content_height;
		    if(space_needed > space_available)
		    {
		      $(nav_box).css({"overflow":"auto"});
		      nav_box.height(space_available);
		    }
		    else
		    {
		      $(nav_box).css({"overflow":"visible"});
			  nav_box.height(current_content_height);
		    }
		}
		else
		{
		  nav_box.height(current_content_height);
		  $(nav_box).css({"overflow":"visible"});
		}

		Tile.updatePlaceOnGridSelect();
		if (User.data.grids) {
			grids = User.data.grids ;
			Published.loadPublishGridSelect(grids);
		}
		if (User.data.projects) {
			projects = User.data.projects ;
			Project.loadProjectSelect(projects);
		}
		
	},

	makeSortable: function(nav_item_container) {

		nav_item_container.sortable({
		    axis: 'y',
		    update: function (event, ui) {
		        var data = $(this).sortable('serialize');
		        $.ajax({
		            data: data,
		            type: 'POST',
		            url: '/action?action=updateNavOrder'
		        });
		    }
		});

	},

	populateProjectsList: function(projects)
	{
	  	$.each(projects, function(index,project) {
	  		var project_as_list_item = Project.renderProjectAsListItem(project);
	  		if(User.data.settings.current_project_id == project.project_id)
	  		{
	  			project_as_list_item.addClass("active");
	  		}
	  		$("#project_list").prepend(project_as_list_item);
	  	});

	  	this.makeSortable($('#project_list'));
	},
	populateGridsList: function(grids)
	{

		$("#grid_list").empty();
		if (typeof grids !== 'undefined') {
			$.each(grids, function(index,grid) {
		  		var grid_as_list_item = Grid.renderGridAsListItem(grid);
		  		$("#grid_list").prepend(grid_as_list_item);
		  	});
		  	this.makeSortable($('#grid_list'));
		}
	  	
	},
	populateSourcesList: function(sources)
	{
		$("#source_list").empty();
		if(sources)
		{

			sources.reverse();
		  	$.each(sources, function(index,source) {

		  		var source_as_list_item = Source.renderSourceAsListItem(source);
		  		$("#source_list").append(source_as_list_item);
		  	});
		 }
		 this.makeSortable($('#source_list'));
	},
	populateOutlinesList: function(outlines)
	{
		$("#outline_list").empty();
	  	$.each(outlines, function(index,outline) {

	  		var outline_as_list_item = Outline.renderOutlineAsListItem(outline);
	  		$("#outline_list").prepend(outline_as_list_item);
	  	});
	  	this.makeSortable($('#outline_list'));
	},
	populatePublishedList: function(published_grids)
	{
		$("#published_list").empty();
	  	$.each(published_grids, function(index,published) {

	  		var published_as_list_item = Published.renderPublishedAsListItem(published);
	  		$("#published_list").prepend(published_as_list_item);
	  	});
	  	this.makeSortable($('#published_list'));
	},

	populateTemplatesList: function(templates)
	{
		$("#template_list").empty();
	  	$.each(templates, function(index,template) {

	  		var template_as_list_item = Template.renderTemplateAsListItem(template);
	  		$("#template_list").prepend(template_as_list_item);
	  	});
	  	this.makeSortable($('#template_list'));


	},

	createTab: function(title,options,data)
	{

		if(typeof options.id === 'undefined' || options.id == "")
		{
			//tab id not set, this needs to be set for all tabs. find this
			return;
		}

		var closeable = options.closeable;
		var tab_id = options.id;
		var tab_split = tab_id.split("_");
		var tab_type = tab_split[0];
		var tab_object_id = tab_split[1];

		//tab html
		var rendered_tab = $("<div id='tab_"+tab_id+"' class='unselectable ui-droppable tab tab_"+tab_id+"' title='"+title+"'><div class='title'>"+title+"</div><div class='closeButton'>X</div></div>");

		//if the tab is static, hide the close button
		if(closeable === false)
		{
			rendered_tab.find(".closeButton").hide();
		}

		if(tab_type == 'grid')
		{
			rendered_tab.droppable({
			  greedy:true,
			  accept:".tile",
			  hoverClass: "tabDropActive",
			  tolerance: "pointer",
			  drop: function( event, ui ) {
			    event.stopPropagation();
			    ui.helper.remove();
			    var rendered_tile = ui.draggable;
			    var grid_id = tab_object_id;
			    Tile.placeOnGrid(rendered_tile,grid_id);
			  }
			});
		}

		//when this tab is clicked, fire it's click handler - also show it as active and deselect other tabs
		rendered_tab.on("click", function() {
			Navigation.switchToTab("tab_"+tab_id,data);
		});

		var tab = {
			title:title,
			closeable:closeable,
			tab_id:tab_id,
			rendered_tab:rendered_tab
		};

		//when the close button is clicked, remove this tab and run the on_close handler
		rendered_tab.find(".closeButton").on("click", function(evt) {
			evt.stopPropagation();
			Navigation.removeTab(tab);
		});

		return tab;
	},

	//TODO: FIX THIS - weird behavior after you close a grid, go back to the grid dashboard and open the same grid again. grid renders on the dashboard tab instead of creating a new tab
	removeTab: function(tab)
	{
		var tab_id = tab.tab_id;
		var tab_split = tab_id.split("_");
		var tab_type = tab_split[0];
		var tab_object_id = tab_split[1];
		//if we closed the active tab switch to the tab to the left
		if(tab.rendered_tab.hasClass("active"))
		{

			Navigation.switchToTab(this.getTabToLeftOfTab(tab));
		}
		if(tab_type == 'grid')
		{

			Grid.unlockGrid(tab_object_id);
		}

		//remove from dom
		tab.rendered_tab.remove();

	},
	getTabToLeftOfTab: function(tab)
	{
		var tab_id = "tab_"+tab.tab_id;
		var previous_tab = $("#"+tab_id).prev()[0];
	  	

		prev_tab_id = previous_tab.id;
		return prev_tab_id;


	},

	updateUrl: function(url){
		var has_slash = url.startsWith("/");
		if (!has_slash) {
			url = "/"+url;
		}
		history.pushState(null, '', url);
	},
	switchToTab: function(tab_id,reload)
	{
		console.log("switchToTab tab_id",tab_id);
		var tab_split = tab_id.split("_");
		var tab_type = tab_split[1];
		var tab_object_id = tab_split[2];
		User.data.active_tab_type = tab_type;

		var rendered_tab = $("."+tab_id);
		if(rendered_tab.hasClass("active") && reload !== "reload")
		{
			//stop here if this tab is already active
			return;
		}
		rendered_tab.siblings(".tab").removeClass("active");
		rendered_tab.addClass("active");

		switch(tab_type) {
			case "project":
				switch(tab_object_id) {
					case "dashboard":
						//we are loading the project dashboard (all projects)
						Application.loadDashboard(tab_object_id);
					case "public":
						//we are loading the project dashboard (all projects)
						Application.loadDashboard(tab_object_id);
					break;
					default:

					//we have a project id, load the project
					Project.renderDashboard(tab_object_id);
					Navigation.clearAllModals();
					Navigation.updateFrames();

				}

			break;
			case "grid":
				switch(tab_object_id) {
					case "dashboard":
					//we are loading the grid dashboard
					Navigation.updateFrames();

					break;
					default:
						console.log("case grid tab_object_id",tab_object_id);
					    $.when(Grid.getGrid(tab_object_id)).done(function(grid) {
							console.log("case grid got grid",grid);

					    	Grid.renderGrid(grid);

					    });

				}

			break;



		}
		Grid.resetTime();

	},

	tabExists: function(tab_id) {
		return $("."+tab_id).length > 0;
	},

	bindUIActions: function() {
		console.log("navigation bindUIActions called")

		$(".myGroupsContainer a").on("click", function() {
			if(User.data.public > 0){
				Published.viewContact();
			}else{
				Group.viewGroup();
			}
		});
		$("#new_team_button").on("click", function() {
			Group.viewGroup();
		});

		$("#new_project_button").on("click", function() {
			console.log("navigation bindUIActions new project button clicked")
			Project.newProject();
		});

		$("#new_grid_button").on("click", function() {
			Grid.selectTemplate();
		});

		$("#new_source_button").on("click", function() {
			Source.newSource();
		});

		$("#new_outline_button").on("click", function() {
			Outline.newOutline();
		});

		$("#new_published_button").on("click", function() {
			Published.newPublished();
		});

		$("#new_template_button").on("click", function() {
			Template.newTemplate();
		});

	}


}