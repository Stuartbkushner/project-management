Application = {

  settings: {
  },


  init: function(user) {
    console.log("application init called",user);
    var state = user.state;
    var state_data = user.state_data;
    global_tiles = new Array();
    //set our user global
    User.data = user;
    User.parent_user = jQuery.extend(true, {}, user) ;


    //TODO: SWITCHING PROJECTS SHOULD CHANGE THIS
    User.data.settings = {current_project_id:0};
    User.data.settings.current_project_id = 0;
    User.data.settings.outline_cnt = 0;
    User.data.settings.publish_cnt = 0;
    User.data.settings.timer = 0;
    User.data.settings.open_grids = {};
    User.data.settings.grid_timers = {};
    User.data.grid_groups_dict = {} ;
    User.data.author = User.data ;
    

    Layout.init();
    Navigation.init();
   // Grid.init();
    Pile.init();
    Published.init();

    var dashboard_tab = this.createDashboardTab();
    dashboard_tab.rendered_tab.appendTo(".gridTabs");
    

    if (state == 'loadGrid') {
      var grid = state_data.grid;
      var project = state_data.project;
      // var project_url = User.data.url +'/'+grid.project.slug;
      // User.data.settings.current_project_url =  project_url;
      // User.data.settings.current_project_id = grid.project.project_id;
      // Pile.reloadPile();
      Project.loadProjectResources(project);
      console.log("init loadGrid grid",grid);

      Grid.loadGrid(grid);
    }else if (state == 'loadProject') {
      var project_id = state_data;
      Project.loadProject(project_id);
      
    }else if (state == 'public') {
      // Navigation.switchToTab("tab_project_public");
      Navigation.switchToTab("tab_project_dashboard");

    }else  {
      //start us off with a dashboard displaying all of the users projects
      
      Navigation.switchToTab("tab_project_dashboard");
      
      User.loadNotifications();
    }
    setTimeout(function(){ 
      if (User.data.public > 0) {
        // Public.activeQuickStart(); 
      }else{
        User.activeQuickStart(); 
      }


    }, 3000);

      //start us off with a dashboard displaying all of the users projects
      // var dashboard_tab = this.createDashboardTab();
      // dashboard_tab.rendered_tab.appendTo(".gridTabs");
      // Navigation.switchToTab("tab_project_dashboard");
      // User.activeQuickStart();
      // User.loadNotifications();
    

  
      //if the user is viewing a group, start poll
      if(User.data.team_id > 0)
      {
        //User.data.url = '/'+User.data.team_slug;
        User.data.url = User.data.team_slug;
        Grid.loadQuickTemplates();

        this.doTeamPoll();
        $('#username').html("Hi, "+User.data.user_first +" "+User.data.user_last);

      }else if(User.data.public > 0)
      {
        $('.join').html(User.data.name);
      }else{
        User.data.url = User.data.slug;
        $('#username').html("Hi, "+User.data.user_first +" "+User.data.user_last);
        
        //User.data.url = '/'+User.data.slug;
        Grid.loadQuickTemplates();

        this.doUserPoll();

      }

    
  },

  doUserPoll: function(){
    $.post('/action?action=getUser', {}, function(data) {
        var user_data = $.parseJSON(data);
        User.data.invite_cnt = user_data.invite_cnt;
        User.data.invites = user_data.invites;
        User.loadNotifications();
        setTimeout(function() {Application.doUserPoll();},2000);
    });
},

  

  createDashboardTab: function()
  {
    var dashboard_tab = Navigation.createTab("All Projects", {
      closeable:false,
      id: 'project_dashboard'
    });

    return dashboard_tab;
  },
  createUserDashboardTab: function()
  {
    var user_name = User.data.user_first + ' ' + User.data.user_last;
    var dashboard_tab = Navigation.createTab(user_name +" Projects", {
      closeable:false,
      id: 'project_user_dashboard'
    });

    return dashboard_tab;
  },

  loadDashboard: function(type) {
    var projects = User.data.projects;
    projects = Pile.filterProjects(projects);
    Published.setContactInfo(User.parent_user);
    // if (type=='public') {
    //    Navigation.updateUrl('');
    // }else{
    //   Navigation.updateUrl(User.data.url);
    // }
  
    //hide stuff that doesn't matter
    Navigation.updateUrl(User.data.url);
    Application.setMode("dashboard");
    Navigation.hideAllButProjects();
    $(".pile").hide();
    $(".searchContainer").addClass('projectFilter');


    $('.gridInnerWrapper, .grid-message').empty();

    if(projects.length > 0)
    {
      $.each(projects, function(index,val) {
        var project = Project.renderProjectAsIcon(val);
        // project.prependTo(".gridInnerWrapper");
        $(".gridInnerWrapper").prepend(project);
      });
      
      $(".gridEmptyState").hide();
    }
    else
    {
      
      if(User.data.public > 0)
      {
        $(".gridInnerWrapper").append("<div class='gridEmptyState'>No Public Projects Yet.<br /><br /><a href='/login'>Log In</a> Now To Create One.</div>");

      }else{
        $(".gridInnerWrapper").append("<div class='gridEmptyState'>You do not have any Projects yet.<br /><br />Click the plus icon next to 'Projects' on the left side to create your first project.</div>");
      }
      $(".gridEmptyState").show();
      return;
    }
    if(User.data.username == "MosaicJunction")
    {
      $(".grid-message").append("<div class=''>Welcome to the Mosaic Junction Beta.<br>The “Public Project” folder seen here contains all the Published Mosaic Junction Grids. You will have the option to publish Grids from your account. <br/> Please  <a href='/register'>click here</a> to register.<br/> </div>");

    }
  },

  setMode: function(mode) {
    switch(mode)
    {
      case "dashboard":
        $(".lockedGridOverlay").hide();
        $(".floatingTilesContainer").hide();
        $(".gridDecision").hide();
        $(".decisionWrapper").hide();
        $(".navColumnContent .header").hide();
        $(".pile").show();
        $(".searchContainer").show();
        $(".pile").css({"top":170});
        $(".grid").hide();
        $(".gridEmptyState").hide();
        $(".block2 .title").empty();
        $(".block2 .description").empty();
        $(".headerWrapper .updated").empty();
      break;

      case "template":
        $(".gridAsIcon").remove();
          $(".grid").show();
          Grid.clearGrid();
          $(".grid").addClass("templating");
          $(".templateObjects").removeClass("templateObjectsSmall");
          $(".decisionWrapper").hide();
          $(".gridDecision .decisionContent").hide();
          $(".gridDecision").hide();
          $(".floatingTilesContainer").hide();
          $(".pile").hide();
          $(".searchContainer").hide();
          $(".navColumnContent .header").show();
          $(".pile").css({"top":205});
          break;
          
      case "grid":
          $(".gridAsIcon").remove();
          $(".grid").show();
          Grid.clearGrid();
          $(".grid").removeClass("templating");
          $(".templateObjects").addClass("templateObjectsSmall");
          $(".decisionWrapper").show();
//          $(".gridDecision .decisionContent").show();
//          $(".gridDecision").show();
          $(".floatingTilesContainer").show();
          $(".pile").show();
          $(".searchContainer").show();
          $(".navColumnContent .header").show();
          $(".pile").css({"top":205});
          break;

      default:
    }
  },


  // init: function(user_id,pile_tiles,grids,projects,sources,outlines,published,templates,active_grid,settings,pile_filters,current_project_id,dashboard_data) {


  //     User.data = {};

  //     User.data.user_id = user_id;
  //     User.data.pile_tiles = pile_tiles;
  //     User.data.grids = grids;
  //     User.data.projects = projects;
  //     User.data.sources = sources;

  //     User.data.outlines = outlines;
  //     User.data.published = published;
  //     User.data.templates = templates;

  //     User.data.active_grid = active_grid;
  //     User.data.settings = settings;
  //     User.data.settings.current_project_id = current_project_id;
  //     User.data.settings.pile_filters = pile_filters;
  //     User.data.dashboard_data = dashboard_data;

  //     CKEDITOR.config.height = '100px';
  //     CKEDITOR.config.width = '450px';
  //     global_tiles = [];
  //     source_counter = 0;

  //     //init
  //     Layout.init();
  //     Navigation.init();
  //     Pile.init();
  //     Grid.init();

  //     //if the user is viewing a group, start poll
  //     if(User.data.settings.current_group > 0)
  //     {
  //       this.doTeamPoll();
  //     }
    
  // },


  doTeamPoll: function() {

    var projects_with_versions = Project.getProjectsWithVersions();
    if(User.data.settings.current_project_id > 0)
    {
      var grids_with_versions = Grid.getGridsWithVersions();
      var sources_with_versions = Source.getSourcesWithVersions();
      var published_with_versions = Published.getPublishedWithVersions();
      var templates_with_versions = Template.getTemplatesWithVersions();
      var pile_tiles_with_versions = Pile.getPileTilesWithVersions();
     // var outlines_with_versions = Outline.getOutlinesWithVersions();
     Grid.timerIncrement();

    }else{
      var grids_with_versions = [];
      var sources_with_versions = [];
      var published_with_versions = [];
      var templates_with_versions = [];
      var pile_tiles_with_versions = [];
     // var outlines_with_versions = [];
    }


    var data_to_send = {
      "projects":projects_with_versions,
      "grids":grids_with_versions,
      "sources":sources_with_versions,
      // "outlines":outlines_with_versions, THESE ARE PRIVATE TO THE USER, WE DO NOT NEED TO POLL FOR THEM
      "published":published_with_versions,
      "templates":templates_with_versions,
      "pile_tiles":pile_tiles_with_versions,
      "project_id":User.data.settings.current_project_id

    };

    $.ajax({
        type: "POST",
        url: '/action?action=pollMJ',
        data: 
          {
            current_user_data:data_to_send
          },
        success: function(data) 
          {

            Application.processPolledItems("projects",data.projects);
            Application.processPolledItems("grids",data.grids);
            Application.processPolledItems("sources",data.sources);
            Application.processPolledItems("published",data.published);
             Application.processPolledItems("templates",data.templates);
             Application.processPolledItems("pile_tiles",data.pile_tiles);
            // Application.processPolledItems("outlines",data.outlines);

            setTimeout(Application.doTeamPoll,5000);
          },
          dataType: 'json'
          });  

  },

  processPolledItems: function(type,data) {

      var user_data_items;
      switch(type) {
        case "projects":
         user_data_items = User.data.projects;
        break;
        case "grids":
          user_data_items = User.data.grids;
        break;
        case "sources":
          user_data_items = User.data.sources;
        break;
        case "published":
          user_data_items = User.data.published;
        break;
        case "templates":
          user_data_items = User.data.templates;
        break;
        case "pile_tiles":
          user_data_items = User.data.pile_tiles;
        break;
      }

      var deleted_items = data.deleted_items;
      var edited_items = data.edited_items;
      var new_items = data.new_items;

      //handle new items
      if(new_items)
      {
        $.each(new_items, function(index,new_item) {
          var item_count = 1;

          switch(type) 
          {
            case "projects":
              var project_id = new_item.project_id;
              var item_count = $("#project_"+project_id).length;
              var list = "#project_list";
              var list_item = Project.renderProjectAsListItem(new_item);
            break;
            case "grids":
              //fix for inconsistency in returned data
              var grid_id = new_item.grid_id;
              var item_count = $("#grid_"+grid_id).length;
              var list = "#grid_list";
              var list_item = Grid.renderGridAsListItem(new_item);
            break;
            case "sources":
              var source_id = new_item.source_id;
              var item_count = $("#source_"+source_id).length;
              var list = "#source_list";
              var list_item = Source.renderSourceAsListItem(new_item);
            break;
            case "published":
              var grid_id = new_item.grid_id;
              var item_count = $("#published_"+grid_id).length;
              var list = "#published_list";
              var list_item = Published.renderPublishedAsListItem(new_item);
            break;
            case "templates":
              var grid_id = new_item.grid_id;
              var item_count = $("#template_"+grid_id).length;
              var list = "#template_list";
              var list_item = Template.renderTemplateAsListItem(new_item);
            break;
            case "pile_tiles":
              var tile = Tile.renderTile(new_item);
              Tile.makeDraggable(tile);
              $(".pile").prepend(tile);
              //TODO: PILE NOTES NEED TO BE PASSED THROUG THE USER'S ACTIVE FILTERS
              //RIGHT NOW THEY DISPLAY IN THE PILE REGARDLESS OF WHAT FILTERS ARE SET, UNTIL FILTERS ARE CHANGED

            break;
          }
          if (item_count == 0) {
              list_item.prependTo(list);
          }

          user_data_items.push(new_item);

        });
      }
      //handle edits
      if(edited_items)
      {
        $.each(edited_items, function(index,edited_item) {


          //update our nav items
          switch(type) 
          {
            case "projects":
              //find this project in the navigation and update it
              var nav_item = $("input[value='"+edited_item.project_id+"'].navProjectID").parents(".listItem");
              var new_nav_item = Project.renderProjectAsListItem(edited_item);

              //update User.data
              var new_items = user_data_items.filter(function(item) {
                return item.project_id != edited_item.project_id;
              });
              new_items.push(edited_item);
              User.data.projects = new_items;

            break;
            case "grids":
              //fix for inconsistency in returned data
              edited_item.grid_id = edited_item.grid_id;

              var nav_item = $("#grid_"+edited_item.grid_id);
              var new_nav_item = Grid.renderGridAsListItem(edited_item);
              
              //update User.data
              var new_items = user_data_items.filter(function(item) {
                return item.grid_id != edited_item.grid_id;
              });
              new_items.push(edited_item);
              User.data.grids = new_items;

            break;
            case "templates":
              //fix for inconsistency in returned data
              edited_item.grid_id = edited_item.grid_id;

              var nav_item = $("input[value='"+edited_item.grid_id+"'].navTemplateID").parents(".listItem");
              var new_nav_item = Template.renderTemplateAsListItem(edited_item);
              
              //update User.data
              var new_items = user_data_items.filter(function(item) {
                return item.grid_id != edited_item.grid_id;
              });
              new_items.push(edited_item);
              User.data.templates = new_items;

            break;
            case "outlines":
              //fix for inconsistency in returned data
              edited_item.grid_id = edited_item.grid_id;

              var nav_item = $("#outline_'"+edited_item.tile_group_id+"'].navTemplateID").parents(".listItem");
              var new_nav_item = Template.renderTemplateAsListItem(edited_item);
              
              //update User.data
              var new_items = user_data_items.filter(function(item) {
                return item.grid_id != edited_item.grid_id;
              });
              new_items.push(edited_item);
              User.data.grids = new_items;

            break;
            case "sources":
              var nav_item = $("input[value='"+edited_item.source_id+"'].navSourceID").parents(".listItem");
              var new_nav_item = Source.renderSourceAsListItem(edited_item);

              //update User.data
              var new_items = user_data_items.filter(function(item) {
                return item.source_id != edited_item.source_id;
              });
              new_items.push(edited_item);
              User.data.sources = new_items;
            break;
            case "pile_tiles":
              var nav_item = $(".pile input[value='"+edited_item.tile_id+"'].tile_id").parents(".tile");
              var new_nav_item = Tile.renderTile(edited_item);
              Tile.makeDraggable(new_nav_item);

              var new_items = user_data_items.filter(function(item) {
                return item.tile_id != edited_item.tile_id;
              });
              new_items.push(edited_item);
              User.data.pile_tiles = new_items;
            break;
          }

          nav_item.replaceWith(new_nav_item);

        });

      }
      if(deleted_items)
      {

        $.each(deleted_items, function(index, deleted_item) {

          switch(type) 
          {
            case "projects":
              var new_projects = User.data.projects.filter(function(project) {
                return project.project_id != deleted_item.id;
              });

              User.data.projects = new_projects;
              $("input[value='"+deleted_item.id+"'].navProjectID").parents(".listItem").remove();
            break;
            case "grids":
              //fix for inconsistency in returned data
              deleted_item.id = deleted_item.id;

              var new_grids = User.data.grids.filter(function(grid) {
                return grid.grid_id != deleted_item.id;
              });

              User.data.grids = new_grids;
              $("input[value='"+deleted_item.id+"'].navGridID").parents(".listItem").remove();
            break;
            case "sources":
              var new_sources = User.data.sources.filter(function(source) {
                return source.source_id != deleted_item.id;
              });

              User.data.sources = new_sources;
              $("input[value='"+deleted_item.id+"'].navSourceID").parents(".listItem").remove();

            break;
            case "published":
              //fix for inconsistency in returned data
              deleted_item.id = deleted_item.id;

              var new_grids = User.data.published.filter(function(grid) {
                return grid.grid_id != deleted_item.id;
              });

              User.data.published = new_grids;
              $("input[value='"+deleted_item.id+"'].navPublishedID").parents(".listItem").remove();
            break;
            case "templates":
              var new_templates = User.data.templates.filter(function(template) {
                return template.grid_id != deleted_item.id;
              });

              User.data.templates = new_templates;
              $("input[value='"+deleted_item.id+"'].navTemplateID").parents(".listItem").remove();
            break;
            case "pile_tiles":
              var new_pile_tiles = User.data.pile_tiles.filter(function(tile) {
                return tile.tile_id != deleted_item.id;
              });

              User.data.pile_tiles = new_pile_tiles;
              $(".pile input[value='"+deleted_item.id+"'].tile_id").parents(".tile").remove();
            break;
          }

        });

        //TODO: display an alert if this is the polling user's active project
      }

    //always do this in case anything has changed
    Navigation.updateFrames();

  }

}