Grid = {


  settings: {

  },

init: function() {
    Grid.watchActivity();
},

// should proabably get called to load all projects grids
loadDashboard: function(project) {

  //if this grid dashboard is already open, switch to it's tab


  //if not, create a new tab and switch to it

  if(Layout.tabIsOpen("gridDashboard",project))
  {
   Navigation.switchToTab("gridDashboard",project);
  }
  else
  {
    var tab = Layout.createTab("gridDashboard",project);
    return;
  }

},

getIconGridLines: function(grid_size,object_width,object_height) {
  var lines = new Array();

  //columns (vertical lines)
  for(var i=0; i <= grid_size[0]; i++)
  {
    lines.push($('<div/>').css({"height":"100%","width":object_width/grid_size[0],"position":"absolute","left":object_width/grid_size[0]*i,"border-right":"1px solid #d8d8d8"}));
  }

  for(var i=0; i <= grid_size[0]; i++)
  {
    lines.push($('<div/>').css({"width":"100%","height":object_height/grid_size[1],"position":"absolute","top":object_height/grid_size[1]*i,"border-bottom":"1px solid #d8d8d8"}));
  }

  return lines;

},

renderAsIcon: function(grid) {

var container =  $('<div/>', {
  class:"gridAsIcon"
});

var object_container =  $('<div/>', {
  class:"gridAsIconObjects"
});

var grid_size = [6,6]; //TODO: this needs to pull the actual size of the grid!
var container_width = 200;
var container_height = 140;
var grid_lines = this.getIconGridLines(grid_size,container_width,container_height);
var tiny_object_width = container_width/grid_size[0];
var tiny_object_height = container_height/grid_size[1];

if(grid.tiles.length > 0)
{
  $.each(grid.tiles, function(index,tile) {
    var tile_position_x = parseInt(tile.x) - 1;
    var tile_position_y = parseInt(tile.y) - 1;
    var tile_color;
    var tile_border = "none";
    if(tile.tile_type == "header")
    {
      tile_color = "#4d6473";
      tile_border = "2px solid "+tile.tile_color;
    }
    else
    {
      tile_color = tile.tile_color;
    }
    var tiny_tile = $('<div/>').css({"border":tile_border,"z-index":"1","background":tile_color,"width":tiny_object_width*tile.width,"height":tiny_object_height,"position":"absolute","left":tile_position_x*tiny_object_width,"top":tile_position_y*tiny_object_height});
    tiny_tile.appendTo(object_container);
  });
}

//the title
var title_container =  $('<div/>', {
  class:"gridAsIconTitle"
});
// var date_container =  $('<div/>', {
//   class:"gridAsIconDate"
// });
title_container.html(grid.grid_title);

//put them together
object_container.append(grid_lines);
container.append(object_container,title_container);
container.attr("id","grid-icon-"+grid.grid_id);
return container;

},

getGridsWithVersions: function() {

  //return User.data.projects;
  var grid_array = new Array();
  $.each(User.data.grids, function(index,grid) {
    grid_array.push({
      "id":grid.grid_id,
      "ver":grid.grid_version
    });
  });

  return grid_array;

},

insertRow: function(after_y) {

  //grab all elements beneath after_row
  var items =   $(".grid .tile, .grid .header").filter(function(index,val) {
    return parseInt($(this).css("top")) >= after_y;
  }).each(function(index,val) {
    Tile.moveTileDown($(val),true);
  });

},

deleteRow: function(after_y) {


  //remove all the tiles in this row
  var items_to_remove =   $(".grid .tile, .grid .header").filter(function(index,val) {
    return parseInt($(this).css("top")) == after_y;
  }).each(function(index,val) {
    //Tile.moveTileUp($(val),true);
    //$(val).remove();
    var tile = Tile.getObjByRenderedTile($(val));
    Tile.removeFromGrid(tile);
    
  });

  //grab all elements beneath after_row
  var items =   $(".grid .tile, .grid .header").filter(function(index,val) {
    return parseInt($(this).css("top")) >= after_y;
  }).each(function(index,val) {
    Tile.moveTileUp($(val),true);
  });

},

insertColumn: function(after_x) {
  //grab all elements to the right of after_column
  var items =   $(".grid .tile, .grid .header").filter(function(index,val) {
    return parseInt($(this).css("left")) >= after_x;
  }).each(function(index,val) {
    Tile.moveTileRight($(val));
  });

},

deleteColumn: function(after_x) {

  //tiles to be removed from grid
  var items_to_remove =   $(".grid .tile, .grid .header").filter(function(index,val) {
    return parseInt($(this).css("left")) == after_x;
  }).each(function(index,val) {
    //Tile.moveTileRight($(val));
    //$(val).remove();

    var tile = Tile.getObjByRenderedTile($(val));
    Tile.removeFromGrid(tile);

  });

  //grab all elements to the right of after_column
  var items =   $(".grid .tile, .grid .header").filter(function(index,val) {
    return parseInt($(this).css("left")) >= after_x;
  }).each(function(index,val) {
    Tile.moveTileLeft($(val));
  });

},

save: async function(grid) {
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);
  return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/saveGrid',
      dataType: 'JSON',
      data: {
        grid: {
          grid_id: grid.grid_id,
          grid_title: grid.grid_title,
          grid_description: grid.grid_description,
          project_id:  grid.project_id,
          grid_template: grid.grid_template,
          grid_type: 'grid',
        }
      }
  });
},

copy: async function(grid) {
  console.log('send', 'event', 'Grids', 'copy', grid.grid_title, grid.grid_id);
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);
  return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/copyGrid',
      dataType: 'JSON',
      data: {
        grid_id: grid.grid_id,
        grid_title: grid.grid_title,
        grid_description: grid.grid_desc,
        project_id: User.data.settings.current_project_id
      }
  });
},

newGrid: function() {
  //load the project modal
  var grid = {};
  grid.grid_id = "";
  $(".gridModal").filter(":visible").remove();
  var modal = $("#grid_modal").mj_modal();
  modal.children(".header").prepend("New Grid");
  modal.find(".templateSelect").show();
  current_project_id = User.data.settings.current_project_id;
  $('.gridModal .projectSelect option[value="'+current_project_id+'"]').attr('selected','selected');
  modal.find('.save').on("click", function() {
    grid.grid_id = 0;
    grid.grid_title = modal.find(".name").val();
    grid.grid_description = modal.find(".description").val();
    grid.grid_template = modal.find(".templateSelect").val();
    grid.project_id = modal.find(".projectSelect").val();
    
    $.when(Grid.save(grid)).done(function(data) {


      grid.grid_id = data.grid_id;
      User.data.new_grid = grid;
      $("#grid_list").prepend(Grid.renderGridAsListItem(grid,true));
      Grid.reloadGrids();
      console.log('send', 'event', 'Grids', 'new', grid.grid_title, grid.grid_id);
      
      modal.remove();
      
    });
  });
},
selectTemplate: function() {
  //load the project modal
  Grid.loadQuickTemplates();
  var modal = $("#select_template_modal").mj_modal();
  modal.children(".header").prepend("Select Template (Optional)");
  Grid.activateTemplate();
  modal.find('.fresh').on("click", function() {
      $('.gridModal .templateSelect option[value="0"]').attr('selected','selected');
      $(".selectTemplateModal,.helpModal").hide();
      Grid.newGrid();
  });


},
loadQuickTemplates: function(grid_group)
  {
    $(".quickStartPages .templates,.selectTemplateModal .templates").html('');
    if (grid_group){
      Grid.loadGridGroup(grid_group);
      var parent_grid_group_id = grid_group.parent_grid_group_id;
      if (parent_grid_group_id == 0) {
         $(".selectTemplateBottom .back").attr("id",'start');

      }else{
         $(".selectTemplateBottom .back").attr("id",parent_grid_group_id);
      }
      $(".selectTemplateBottom .page").val(grid_group.grid_group_id);
    }else{
      var global_templates =  User.data.global_grid_groups.templates;
      Grid.loadGridGroup(global_templates);

      if (User.data.grid_groups) {
        var user_templates =  User.data.grid_groups.templates;
        if ($(user_templates).length > 0) {
          Grid.loadGridGroup(user_templates);
        }
        
      }
      
      $(".selectTemplateBottom .page").val('start');
      $(".selectTemplateBottom .back").hide();
    }
    
  },
  loadGridGroup: function(grid_group)
  {
    var sub_groups = grid_group.sub_groups ;
    var grids = grid_group.grids ;
    // $(".quickStartPages .templates,.selectTemplateModal .templates").append("<label> Suggested Templates </label>");
      $.each(sub_groups, function(index,sub_group) {
        User.data.grid_groups_dict[sub_group.grid_group_id] =  sub_group;
        var group_icon = Grid.renderGroupAsIcon(sub_group);
        group_icon.appendTo(".quickStartPages .templates,.selectTemplateModal .templates");
      });
    //User.data.dashboard_data should be replaced with User.data.projects.grids.grid
    $.each(grids, function(index,grid) {
      var grid_as_icon = Grid.renderAsIcon(grid);
      $(".quickStartPages .templates,.selectTemplateModal .templates").prepend(grid_as_icon);

    });
   // if(grids.length == 0 && sub_groups.length == 0){
      var text = "<h3 class='tempMessage' ><a class='newTemp' href='#'>Click Here</a> to Create an Optional Grid Template.</h3> ";
      $(".quickStartPages .templates,.selectTemplateModal .templates").append(text);
    //}
    Grid.activateTemplate();
  },
  loadGridGroupDict: function(grid_group)
  {
    var sub_groups = grid_group.sub_groups ;
    User.data.grid_groups_dict[grid_group.grid_group_id] =  grid_group;
    $.each(sub_groups, function(index,sub_group) {
      User.data.grid_groups_dict[sub_group.grid_group_id] =  sub_group;
      Grid.loadGridGroupDict(sub_group);
    });
  },
  renderGroupAsIcon: function(grid_group)
  {
      var grid_group_as_button = $('<div/>', {
      title: grid_group.grid_group_title,
      text: grid_group.grid_group_title,
      class: "projectAsButton"
      });
      grid_group_as_button.attr("id","group-icon-"+grid_group.grid_group_id);

  return grid_group_as_button;

  },
activateTemplate: function() {
  $('.templates .gridAsIcon').off('click').on("click", function() {
      var icon_id = $(this).attr("id");
      var icon_split = icon_id.split('-');
      $('.gridModal .templateSelect option[value="'+icon_split[2]+'"]').attr('selected','selected');
      $(".selectTemplateModal,.helpModal").hide();
      var template_title = $('.gridModal .templateSelect option[value="'+icon_split[2]+'"]').html();
      console.log('send', 'event', 'Grids', 'select template', template_title, icon_id);

       Grid.newGrid();
  });
  $('.templates .projectAsButton').off('click').on("click", function() {
    var icon_id = $(this).attr("id");
    var icon_split = icon_id.split('-');
    var grid_group_id  = icon_split[2];
    var grid_group =  User.data.grid_groups_dict[grid_group_id];
    var current_page = $('.selectTemplateBottom .page').val();
    $('.selectTemplateBottom .back').attr("id",current_page).show();
    Grid.loadQuickTemplates(grid_group);
  });
  $('.selectTemplateBottom .back').off('click').on("click", function() {
      
      var icon_id = $(this).attr("id");
      if (icon_id == 'start') {
         $(this).hide();
         Grid.loadQuickTemplates(); 
      }else{
        var grid_group =  User.data.grid_groups_dict[icon_id];
        Grid.loadQuickTemplates(grid_group); 
      }
      
  });
  $(".newTemp").off('click').on("click", function(event) {
    event.preventDefault();
    // Template.newTemplate();
    // $('.templateModal input').focus();
    setTimeout(function() {Template.newTemplate();},10);
  });

},
reloadTemplatePage: function(){
    var current_page = $('.selectTemplateBottom .page').val();
    if (current_page == 'start') {
      Grid.loadQuickTemplates();
    }else{
      var grid_group =  User.data.grid_groups_dict[current_page];
      Grid.loadQuickTemplates(grid_group);
    }

},
unlockGrid: async function(grid_id) {
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);

  return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/unlockGrid',
      data: {
        grid_id: grid_id
      },
      dataType: 'json'
      });
},
lockGrid: async function(grid_id) {
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);
  
  return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/lockGrid',
      data: {
        grid_id: grid_id
      },
      dataType: 'json'
      });
},
editGrid: function(grid,rendered_element) {
  //this function needs to be modified to not accept rendered_elements
  rendered_element = $("#grid_list").find("#grid_"+grid.grid_id);

  var modal = $("#grid_modal").mj_modal();
  modal.children(".header").prepend("Rename Grid");
  modal.find(".templateSelect").hide();

  //populate modal 
  modal.find(".name").val(grid.grid_title);
  modal.find(".description").val(grid.grid_description);
  console.log('send', 'event', 'Grids', 'edit', grid.grid_title, grid.grid_id);

  //attach handler to save button
  modal.find('.save').on("click", function() {
    grid.grid_title = modal.find(".name").val();
    grid.grid_description = modal.find(".description").val();
    $.when(Grid.save(grid)).done(function(data) {
      grid = data;
      rendered_element.find(".listItemTitle").html(grid.grid_title);


      //if we have a tab open for this grid, update it's title
      if(Navigation.tabExists("tab_grid_"+grid.grid_id))
      {
        $(".tab_grid_"+grid.grid_id).find('.title').html(grid.grid_title);

        if($(".tab_grid_"+grid.grid_id).hasClass("active"))
        {
          //if this is the active grid, update title/desc in header
          $(".headerWrapper").find(".title").html(grid.grid_title);
          $(".headerWrapper").find(".description").html(grid.grid_desc);
          $(".headerWrapper").find(".updated").html(grid.updated_at);
          var grid_url = User.data.settings.current_project_url+"/"+grid.slug; 

          Navigation.updateUrl(grid_url);
        }

      }
      
      //update title in nav (or reload nav)



      var new_grids = User.data.grids.filter(function(obj) {
        return obj.grid_id != grid.grid_id;
      });

      //increment version
      grid.grid_version++
      new_grids.push(grid);
      User.data.grids = new_grids;

      Navigation.updateFrames();
      Project.refreshDashboard(grid.project_id);

      // $(".headerWrapper .title").html(grid.grid_title);
      // $(".headerWrapper .description").html(grid.grid_desc);

      modal.remove();
    });
  });
},

  renderGridAsListItem: function(grid,selected)
  {
  
  if(selected){
    selected = "selected='selected'" ;
  }

  var container_div = $("<div/>", {class:"listItem",id:"grid_"+grid.grid_id});
  var title_container_div = $("<div/>", {class:"listItemTitle unselectable"}).html(grid.grid_title).on("click", function() {

  if(grid.grid_privacy_user_id > 0 && User.data.user_id != grid.grid_privacy_user_id &&  User.data.user_id != User.data.team_leader_id)
  {
    alert('This grid is private. You do not have permission to view this grid').
    return;
  }

  Grid.loadGrid(grid);

  // if(Layout.tabIsOpen("gridTab",grid))
  // {
  //   Navigation.switchToTab("gridTab",grid);
  // }
  // else
  // {
  //   Layout.createTab("gridTab",grid);
  // }

  });

  title_container_div.append($("<input type='hidden' class='list_item_grid_id' value='"+grid.grid_id+"' />"));

  var items = {
                  "edit": {
                      name: "Rename Grid", 
                      callback: function(key, options) {
                Grid.editGrid(grid,container_div);
                      }
                      },

                  "copy": {
                      name: "Copy", 
                      callback: function(key, options) {
                          var modal = $("#grid_modal").mj_modal();
                          modal.children(".header").prepend("Copy Grid");
                          //populate modal 
                          modal.find(".name").val(grid.grid_title + " (Copy)");
                          modal.find(".description").val(grid.grid_desc);

                          //attach handler to save button
                          modal.find('.save').on("click", function() {

                              var new_grid = {
                                grid_id:grid.grid_id,
                                grid_title:modal.find(".name").val(),
                                grid_desc:modal.find(".description").val()
                              };

                            $.when(Grid.copy(new_grid)).done(function(data) {

                              new_grid.grid_id = data.grid_id;
                              Project.refreshDashboard(data.project_id);

                              $("#grid_list").prepend(Grid.renderGridAsListItem(new_grid));
                              Navigation.updateFrames();
                               
                              
                              modal.remove();
                            });
                          });

                      }
                      }

                  // "export": {
                  //     name: "Create PDF", 
                  //     callback: function(key, options) {
                  //       Grid.exportGrid(grid.grid_id);
                  //     }
                  //     },

  };
  if( User.data.user_id == grid.user_id)
  {
    items.remove = {
       name: "Delete", 
                      callback: function(key, options) {
                        if (confirm("Are you sure you want to delete this grid?")) {
                          container_div.remove();
                          Navigation.updateFrames();
                          Grid.deleteGrid(grid.grid_id);
                        }
                    }};
    
  }else if(User.data.team_leader_id > 0 && User.data.user_id == User.data.team_leader_id)
  {
        items.remove = {
       name: "Delete", 
                      callback: function(key, options) {
                        if (confirm("Are you sure you want to delete this grid?")) {
                          container_div.remove();
                          Navigation.updateFrames();
                          Grid.deleteGrid(grid.grid_id);
                        }
                    }};
  }



  if(grid.grid_privacy_user_id > 0 && User.data.user_id == grid.grid_privacy_user_id)
  {
    //if the grid is private, ane the current user made it private, show "make public"
    items.makeprivate = {
      name:"Make Public",
      callback: function(key, options) {
                        Grid.setPrivacy(grid,0);
                      }};
  }
  else if (grid.grid_privacy_user_id > 0 && User.data.user_id != grid.grid_privacy_user_id)
  {
    //if the grid is private but the current user did not make it private, show nothing
  }
  else if (User.data.team_id > 0 && grid.grid_privacy_user_id == 0 && (grid.grid_lock_user_id == 0 || grid.grid_lock_user_id == User.data.user_id))
  {
    //tony grid_lock_id note  to make grid private if you now own it and regardless if some other team meember is using it 
    //the grid is not set to private by any user, and is also not locked by another user show "make private"
    // items.makeprivate = {
    //   name:"Make Private",
    //   callback: function(key, options) {
    //                     Grid.setPrivacy(grid,1);
    //                   }};
  }
  else
  {
    
  }
  if(grid.grid_lock_user_id > 0 && User.data.team_leader_id > 0 )
  {
    //if grid locked, in team mode and team leader
    items.unlock = {
      name:"Unlock Grid",
      callback: function(key, options) {
                      
                      var grid_id = grid.grid_id ;
                      $("#grid_"+grid_id).find(".gridLock").removeClass("unlocked","locked");
                        Grid.unlockGrid(grid_id);
                      }};
  }
  //else if(grid.grid_lock_user_id == 0 && User.data.team_leader_id > 0 )
  if(User.data.team_leader_id > 0 )
  {
    //if grid unlocked, in team mode and team leader
    items.lock = {
      name:"Lock Grid",
      class:"lockGrid",
      
      callback: function(key, options) {
                        Grid.lockGrid(grid.grid_id);
                        var lock_icon = $("#grid_"+grid.grid_id+ " .gridLock");
                        lock_icon.addClass('unlocked').on('click', function() { 
                            Grid.unlockGrid(grid.grid_id);
                            Grid.toggleLock(this,grid);

                          }).css('cursor','pointer');

                      }};
  }


  var gear_icon = gearMenu(items);

  var lock_icons = $("<div/>", {class:"lockIcons"});
  lock_icons.append($("<div/>", {class:"gridLock"}));
  lock_icons.append($("<div/>", {class:"gridPrivacy"}));

  if(User.data.team_id > 0)
  {
    if(grid.grid_lock_user_id > 0 && User.data.team_leader_id > 0 )
    {
      //if grid locked, in team mode and team leader
      lock_icons.find(".gridLock").addClass("unlocked")
        .attr("title","Locked by: "+grid.grid_lock_user.user_first+" "+grid.grid_lock_user.user_last)
        .on('click', function() { 
            Grid.unlockGrid(grid.grid_id);
            Grid.toggleLock(this,grid);

          })
        .css('cursor','pointer');


    }else if(grid.grid_lock_user_id == 0 && User.data.team_leader_id > 0 )
    {
      //if grid unlocked, in team mode and team leader
      // lock_icons.find(".gridLock")
      //   .addClass("locked")
      //   .attr("title","Lock Grid")
      //   .on('click', function() { 
      //       Grid.lockGrid(grid.grid_id);
      //       Grid.toggleLock(this,grid);
      //     })
      //   .css('cursor','pointer');

    }
    else if(grid.grid_lock_user_id > 0  && grid.grid_lock_user_id != User.data.user_id)
    {
      //if grid  locked and not owner
       lock_icons.find(".gridLock").addClass("locked").attr("title","Locked by: "+grid.grid_lock_user.user_first+" "+grid.grid_lock_user.user_last);
    }else if(grid.grid_lock_user_id > 0  && grid.grid_lock_user_id == User.data.user_id)
    {
      //if grid  locked buy current user
     lock_icons.find(".gridLock").addClass("unlocked")
        .attr("title","Locked by: "+grid.grid_lock_user.user_first+" "+grid.grid_lock_user.user_last)
        .on('click', function() { 
            Grid.unlockGrid(grid.grid_id);
            Grid.toggleLock(this,grid);
          })
        .css('cursor','pointer');
        $("#grid_"+grid.grid_id).attr("title","Locked by: "+grid.grid_lock_user.user_first+" "+grid.grid_lock_user.user_last);

    }

    //if(grid.grid_privacy_user_id > 0 && (User.data.user_id == User.data.team_leader_id || User.data.user_id == User.data.team_leader_id) )
    if(grid.grid_privacy_user_id > 0 && (User.data.user_id == grid.grid_privacy_user_id  || User.data.user_id == User.data.team_leader_id) )
    {
      lock_icons.find(".gridPrivacy").addClass("private").attr("title","Make Public")
      .on('click', function() { 
            Grid.setPrivacy(grid,0); 
            $(this).removeClass("private")
            .css('cursor','pointer');
            $(this).parent().find('.gridLock').removeClass("locked");
          })
        .css('cursor','pointer');

       lock_icons.find(".gridLock").addClass("locked").attr("title","Locked by: "+grid.grid_privacy_user.user_first+" "+grid.grid_privacy_user.user_last);

    }else if(grid.grid_privacy_user_id > 0  ){
       lock_icons.find(".gridLock").addClass("locked").attr("title","Locked by: "+grid.grid_privacy_user.user_first+" "+grid.grid_privacy_user.user_last);
    }
  }

  container_div.append(title_container_div,lock_icons,gear_icon);
  container_div.append("<input type='hidden' class='navGridID' value='"+grid.grid_id+"'>");
  var tab_open = $("#tab_grid_"+grid.grid_id).hasClass('active');
  if (tab_open) {
    if (grid.grid_lock_user_id != User.data.user_id) {
        $("#tab_grid_"+grid.grid_id+" .closeButton").click();
    }
    
  }
  $.contextMenu({
                selector: '.gridInnerWrapper #grid-icon-'+grid.grid_id, 
                zIndex:4,
                events: {
                  show: function(options) {
                  if($(".grid").hasClass("templating"))
                  {
                    return false;
                  }
                }},
                callback: function(key, options) {
                    var m = "global: " + key;
                },
                items: items
                


  });

  return container_div;
  },

toggleLock: function(lock_icon,grid){
    var locked = $(lock_icon).hasClass('unlocked');
    $(lock_icon).off('click');
    if (locked) {
      $(lock_icon).removeClass('unlocked');
//         .on('click', function() { 
//             Grid.lockGrid(grid.grid_id);
//             Grid.toggleLock(this,grid);

//           });
    }else{
      $(lock_icon).addClass('unlocked')
        .removeClass('locked')
        .on('click', function() { 
            Grid.unlockGrid(grid.grid_id);
            Grid.toggleLock(this,grid);
          });
    }
},

setPrivacy: async function(grid,state) {
      if (state) {
          var lock_icon = $("#grid_"+grid.grid_id+ " .gridLock");
          lock_icon.addClass('locked');
          var private_icon = $("#grid_"+grid.grid_id+ " .gridPrivacy");
          private_icon.addClass('private');
          console.log('send', 'event', 'Grids', 'make private', grid.grid_title, grid.grid_id);

      }else{
        var lock_icon = $("#grid_"+grid.grid_id+ " .gridLock");
          lock_icon.removeClass('locked');
          var private_icon = $("#grid_"+grid.grid_id+ " .gridPrivacy");
          private_icon.removeClass('private');
          console.log('send', 'event', 'Grids', 'make not private', grid.grid_title, grid.grid_id);
      }
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);

      $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/setPrivacy',
      data: {
        grid_id:grid.grid_id,
        make_private:state
      },
      success: function(data) 
      {

        var new_grids = User.data.grids.filter(function(grid) {
          return grid.grid_id != grid_id;
        });

        User.data.grids= new_grids;
        Grid.reloadGrids();

      },
      dataType: 'json'
      });
},

populateGridsList: function(grids) {
    $.each(grids, function(index,grid) {
      $("#grid_list").append(Grid.renderGridAsListItem(grid));
    });
  },

toggleDecisionElement: function(state) {
  var decision_button = $(".decisionWrapper");
  if(state == 1)
  {
    decision_button.addClass("green");
  }
  else
  {
    decision_button.removeClass("green");
  }

},






loadGrid: function(grid,reload) {

      if(!Navigation.tabExists("tab_grid_"+grid.grid_id))
      {
        //if we don't have a tab for this project, create one
          var grid_tab = Navigation.createTab(grid.grid_title, {
            closeable:true,
            id: 'grid_'+grid.grid_id
          },grid);

          grid_tab.rendered_tab.appendTo(".gridTabs");

      }
      User.data.settings.open_grids[grid.grid_id] = grid;
      User.data.settings.grid_timers[grid.grid_id] = 0;
      //switch to this tab
      Navigation.switchToTab("tab_grid_"+grid.grid_id,reload);
},

watchActivity: function(){


    //Zero the idle timer on mouse movement.
    $(".gridInnerWrapper").mousemove(function (e) {
       Grid.resetTime();
    });
    $(".gridInnerWrapper").keypress(function (e) {
       Grid.resetTime();
    });
},
resetTime: function(){
  if(User.data.public == 0){
    var tab_info = Navigation.getActiveTabInfo();
    var type = tab_info['type'];
    var id = tab_info['id'];

    if (type == 'grid') {
        var grid = User.data.settings.open_grids[id];
        User.data.settings.grid_timers[id] = 0;

    }
  }
  


},
timerIncrement: function() {

    $('.gridTabs .tab').each(function(i, tab) {
        var tab_id = tab.id;
        var tab_info = Navigation.getTabInfo(tab_id);
        var type = tab_info['type'];
        if (type == 'grid') {
            var grid_id = tab_info['id']; 
            var grid = User.data.settings.open_grids[grid_id];
            var idle_time = User.data.settings.grid_timers[grid_id];
            idle_time ++;
            if (idle_time > 45) { // 5 minutes
              // closed and unlock grid
              Grid.timerClose(grid_id);
            }else{
              User.data.settings.grid_timers[grid_id] = idle_time;

            }

        }

    });


},
timerClose: function(grid_id) {
    var modal_class =  "close_grid_"+grid_id;

    inactive_length = $("."+modal_class).length;
    if (inactive_length == 0 ) {
          var inactive = $("#inactive_modal").mj_modal();
          $(inactive).addClass(modal_class);
          var sec = 30;
          var tab_id = ".tab_grid_"+grid_id +" .title";
          var grid_title = $(tab_id).html();
          $('.'+modal_class+' .time').html(sec);
          $('.'+modal_class+' .title').html(grid_title);
          var timer = setInterval(function() { 
             $('.'+modal_class+' .time').html(sec--);
                 if (sec == -1) {
                    var close_button = ".tab_grid_" + grid_id + " .closeButton";
                    $(close_button).click(); 
                      inactive.remove();
                    clearInterval(timer);
                 } 
              }, 1000);
          inactive.find('.save, .modalCloseButton').on("click", function() { 
            clearInterval(timer);
            inactive.remove();
            User.data.settings.grid_timers[grid_id] = 0;


          });
          inactive.show();

    }
   
},


renderGrid: function(grid)
{
    $(".searchContainer").removeClass('projectFilter');
   Application.setMode(grid.grid_type);
   Navigation.showAllItems();
   console.log("renderGrid grid",grid);
   User.data.active_grid = grid;
   var grid_url = User.data.settings.current_project_url+"/"+grid.slug; 
   Navigation.updateUrl(grid_url);


   $('.gridInnerWrapper, .grid-message').empty();
   $('.gridInnerWrapper').append("<div class='grid'>");
   //load floating tiles
   this.loadFloatingTiles(grid.floating_tiles);
   this.bindUIActions();


  $(".gridDecision .decisionContent").empty();

  if(grid.grid_decision && grid.grid_decision != "")
  {
    $(".gridDecision .decisionContent").html(grid.grid_decision);
    this.toggleDecisionElement(1);
  }
  else
  {
    this.toggleDecisionElement(0);
  }

  //set title and desc in header
  $(".headerWrapper .title").html(grid.grid_title);
  $(".headerWrapper .description").html(grid.grid_description);
  $(".headerWrapper .updated").html(grid.updated_at);

  //if we have a decision, display it
  if(grid.grid_decision && grid.grid_decision != "" && grid.grid_decision_shown == 1)
  {

   $(".gridDecision").show();

  }
  else
  {
    //$(".gridDecision .decisionContent").empty();
    $(".gridDecision").hide();
  }

  //populate the grid with tiles
  this.populateGrid(grid.tiles,grid.grid_lock_user_id);

  if(grid.grid_lock_user_id > 0 && grid.grid_lock_user_id != User.data.user_id)
  {
    $(".lockedGridOverlay").show();

    $(".grid").droppable("disable");

  }
  else
  {
    $(".lockedGridOverlay").hide();
    $(".grid").droppable("enable");

  }
  console.log('send', 'event', 'Grids', 'render', grid.grid_title, grid.grid_id);

},

setDecision: function() {
  //show the modal to set the decision

  var decision_modal = $(".decisionModal").filter(":visible");
  if(decision_modal.length > 0)
  {
    decision_modal.remove();
  }


  var grid_id = User.data.active_grid.grid_id;
  var modal = $("#decision_modal").mj_modal();
  modal.children(".header").prepend("Set Decision");
  modal.find(".decision").val($(".decisionContent").html());
  modal.find('.save').on("click", function() {
    var decision = modal.find(".decision").val();

    $.when(Grid.saveDecision(decision,grid_id)).done(function(data) {
      modal.remove();
      Grid.toggleDecisionElement(1);
      $(".gridDecision .decisionContent").html(decision);
      $(".gridDecision").show();

      if(decision == "")
      {
        $(".gridDecision").hide();
        $(".decisionWrapper").removeClass("green");
      }
    });
  });


},

setActiveProject: function(project_id) {
current_project_id = project_id;
  $("select option").filter(function() {
    //may want to use $.trim in here
    return $(this).val() == project_id; 
  }).prop('selected', true);
},

loadGrids: function(grids) {
  User.data.grids = grids;
  Navigation.populateGridsList(grids);
  Navigation.updateFrames();
  
  
},


reloadGrid: async function(set_active_grid) {
   User.data.active_grid = set_active_grid || User.data.active_grid;
   var active_grid = User.data.active_grid;
   if(active_grid){
    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
        'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);
     $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/get',
      headers:apiRequestHeader,
      data: {
        grid_id : active_grid.grid_id
      },
      success: function(grid) 
      {
        User.data.active_grid = grid;
        Grid.renderGrid(grid);
      },
      dataType: 'json'
      });
   }
   
},

getGrid: async function(grid_id) {

  var csrf = await CSRF.token();
    var apiRequestHeader = {
        'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);
  
  return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/get',
      headers:apiRequestHeader,
      data: {
        grid_id: grid_id
      },
      dataType: 'json'
      });
},


clearGrid: function() {
  $(".grid").empty();
  $(".headerWrapper .title").empty();
  $(".headerWrapper .description").empty();
  $(".headerWrapper .updated").empty();

},


loadFloatingTiles: function(tiles)
{
  //first clear out the existing floating tiles
  $('.floatingTilesContainer .tile').remove();

  if($.isEmptyObject(tiles))
  {
    $('.floatingTilesContainer').hide();
    $('.floatingTilesContainer').addClass("hidden");

  }
  else
  {
    $('.floatingTilesContainer').show();
    $('.floatingTilesContainer').removeClass("hidden");
  }

  $.each(tiles, function(key, val) {
    Tile.renderAsFloatingTile(val);

  });

},

createGroup: function(groups) {
	$.each(groups, function(key, val) {
  	$("<style type='text/css'> .redbold{ color:#f00; font-weight:bold;} </style>").appendTo("head");
  	$("<div/>").addClass("redbold").text("SOME NEW TEXT").appendTo("body");	
	});
},

clearGrid: function() {
  $(".gridInnerWrapper .grid").empty();
},

populateGrid: function(tiles,grid_lock_user_id) {
  if (User.data.public > 0) {
    $('.pile .tile').hide();      
  };
  this.clearGrid();
  $.each(tiles, function(key, tile) {
    if(tile.tile_type != "header")
    {
      Tile.renderOnGrid(tile,grid_lock_user_id);
      var tile_id = tile.tile_id;

      $(".pile .tile_id[value='"+tile_id+"']").parent().show();

    }
    else{
      Template.renderHeaderOnGrid(tile);
    }

  });
},

isLargeEnoughFor: function(x,y)
{
  
  //this function is buggy, should check if tile violates x or y independently
  //var tile_position = this.getPositionByCoordinates(tile.tile_position);
  var grid_height = $(".grid").height();
  var grid_width = $(".grid").width();
  var grid_cell_height = 156;
  var grid_cell_width = 206;

  var has_x_space = x < grid_width - (grid_cell_width * 3);
  var has_y_space = y < grid_height - (grid_cell_height * 3);


  return {has_x_space,has_y_space};

},

setGridSize: function(width,height) {
  if(width)
  {
    $(".grid").width(width);
  }
  if(height)
  {
    $(".grid").height(height);
  }
},

getPositionByCoordinates: function(coordinates)
{
  var position_array = coordinates.split(",");
  //this should be changed to measure the grid background's image size!
  var x = (position_array[0] - 1) * 206;
  var y = (position_array[1] - 1) * 156;

  return {x,y};

},

removeProjectFromDropdown: function(project_id) {

  $("select option").filter(function() {
    //may want to use $.trim in here
    return $(this).val() == project_id; 
  }).remove();

},

saveDecision: async function(grid_decision,grid_id) {
  console.log('send', 'event', 'Grids', 'decision', grid_decision, grid_id);
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);
  return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/saveDecision',
      data: {
        decision: grid_decision,
        grid_id: grid_id
      },
      dataType: 'json'
      });

},

getCellCoordinatesByCursorPosition: function(cursor_x,cursor_y) {

  var grid_offset = $(".grid").offset();

  var x = cursor_x - grid_offset.left;
  var y = cursor_y - grid_offset.top;

  x = Math.floor(x / 206) + 1;
  y = Math.floor(y / 156) + 1;

  return x+","+y;

},

setDecisionShown: async function(state) {
  var grid_id = User.data.active_grid.grid_id;
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);

    return $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/setDecisionShown',
      data: {
        grid_id: grid_id,
        state: state
      }
  });

},

bindUIActions: function() {
  $(".editDecisionBtn").on("click", function() {
    Grid.setDecision();
  });

  $(".gridDecision .modalCloseButton").on("click", function() {
    $.when(Grid.setDecisionShown(0)).done(function() {
      $(".gridDecision").hide();
    });
  });

  $(".grid").on("click", function() {
    $(".selectedTile").removeClass("selectedTile");
  });

  $(".grid").droppable({
    accept:".tile, .header",
    drop: function( event, ui ) {
      //TODO: make this function properly (AUTO GRID EXPAND)
      if(event.clientX > 1000)
      {
        $(".grid").width($(".grid").width() + (205 * 2));
      }
      if(event.clientY > 250)
      {
        $(".grid").height($(".grid").height() + (155 * 2));
      }

        //ui.helper.remove();

        var target_coordinates = Grid.getCellCoordinatesByCursorPosition(event.clientX,event.clientY);
        var target_coords_array = target_coordinates.split(",");
        if(target_coords_array[0] == 0 || target_coords_array[1] == 0)
        {
          return;
        }
        var tile_position = Grid.getPositionByCoordinates(target_coordinates);

        var rendered_tile = ui.draggable;

        //fix for bug with draggable/resizable
        if(rendered_tile.hasClass("header") && !rendered_tile.hasClass("draggableTemplateHeader"))
        {
          rendered_tile.resizable("destroy");
        }

        var new_tile = rendered_tile.clone();

        new_tile.find(".tile_prev_position").val(rendered_tile.find(".tile_position").val());

        if(new_tile.find(".tile_prev_position").val() != "undefined,undefined" && !new_tile.hasClass("draggableTemplateHeader"))
        {
          rendered_tile.remove();
        }

        if(ui.draggable.hasClass("floatingTile"))
        {
          rendered_tile.remove();
          new_tile.removeClass("floatingTile");
          new_tile.find(".tile_prev_position").val("0,0");
        }

        new_tile.css({"left":tile_position.x,"top":tile_position.y});
        new_tile.find(".tile_position").val(target_coordinates);
        new_tile.find(".tile_grid_id").val(User.data.active_grid.grid_id);


        if(ui.draggable.hasClass("draggableTemplateHeader"))
        {
          new_tile.find(".template_header_template_id").val(Template.getOpenTemplate());
          new_tile.find(".template_header_grid_id").val(Grid.getActiveGridID());
          new_tile.removeClass("draggableTemplateHeader");
        }


        if(ui.draggable.hasClass("header"))
        {
          var position_as_array = target_coordinates.split(",");
          //for headers (this function needs to be rewritten)
          new_tile.find(".template_header_x").val(position_as_array[0]);
          new_tile.find(".template_header_y").val(position_as_array[1]);
        }





        if(!ui.draggable.hasClass("header"))
        {          
            $(new_tile).unbind();
            $(new_tile).on("dblclick", function(evt) {
              evt.stopPropagation();

              var tile = Tile.getObjByRenderedTile($(evt.currentTarget));
              var tile_promise = Tile.getTile(tile.tile_id);

              var modal = $("#view_tile_template").mj_modal();
              modal.children(".header").prepend("View Tile");


              tile_promise.success(function(data) {
                Tile.populateViewTileTemplate(modal,data);
              });
            });
        }







        if(ui.draggable.hasClass("header"))
        {
          Template.saveHeader(new_tile);
        }
        else
        {
          Tile.save(new_tile);
        }

    }
  });

},
//used to be getOpenGrid
  getOpenTabID: function()
  {
    var active_tab = $(".tab.active");
    var tab_classes = active_tab.attr("class").split(" ");

    var tab_id = tab_classes.filter(function(index,value) {
      return index.indexOf("_") > 0;
    });
    return tab_id[0];
  },

  getActiveGridID: function()
  {

    var active_tab = $(".tab.active");
    var tab_classes = active_tab.attr("class").split(" ");

    var tab_id = tab_classes.filter(function(index,value) {
      return index.indexOf("_") > 0 && index.indexOf("_grid") > 0;
    });

    //no active grid, exit
    if(!tab_id || tab_id.length !== 1)
    {
      return false;
    }

    tab_id = tab_id[0];
    var classname_split = tab_id.split("_");
    return classname_split[2];

  },


saveGrid: async function(id,title,desc,load_grid) {

  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);

  //if grid_id is set, we're copying an existing grid
  if(id)
  {
      $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/copyGrid',
      data: {
        grid_id:id,
        grid_title:title,
        grid_description:desc,
        project_id: User.data.settings.current_project_id
      },
      success: function(data) 
      {
        
        $('#new_grid_modal').modal('hide');
        $("#copy_to_new_grid_modal").modal("hide");
        Grid.reloadGrids();

        if(load_grid === true)

        {
          Grid.getGrid(data);
        }
        else
        {
          
        }

      },
      dataType: 'json'
      });
  }
  //we're creating a new grid
  else
  {

      $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/saveGrid',
      data: {
        grid_id:id,
        grid_title:title,
        grid_description:desc
      },
      success: function(data) 
      {
        
        $('#new_grid_modal').modal('hide');
        $("#copy_to_new_grid_modal").modal("hide");
        Grid.reloadGrids();

        if(load_grid === true)

        {
          Grid.getGrid(data);
          Grid.reloadGrids();
        }
        else
        {
          
        }

      },
      dataType: 'json'
      });
  }




},

showEditGridModal: function(grid) {
      $('#edit_grid_id').val(grid.grid_id);
      $('#edit_grid_title').val(grid.grid_title);
      $('#edit_grid_description').val(grid.grid_desc);
      $('#edit_grid_modal').modal('show');
},


showEditProjectModal: async function(project_id) {
    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
        'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);

    $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/project/Project',
      data: {
            project_id:project_id
            },
      success: function(data) {

        $("#edit_project_project_id").val(project_id);
        $("#edit_project_title").val(data.name);
        $("#edit_project_desc").val(data.description);

      },
      dataType: 'json'
    });

    $('#edit_project_modal').modal('show');

},

clearEditProjectInput: function () {
        $('#edit_project_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
},

clearNewGridInput: function() {
  $('#new_grid_modal').find('input[type=text], input[type=hidden], input[type=password], input[type=number], input[type=email], textarea').val('');
},

clearEnterGridDecisionInputs: function () {
        $('#enter_grid_decision_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
},

clearEditGridInput: function () {
        $('#edit_grid_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
},

clearEditAnnotationInput: function () {
        $('#edit_annotation_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
},

clearCopyToNewGridInput: function () {
        $('#copy_to_new_grid_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
},

clearMoveToNewGridInput: function () {
        $('#move_to_new_grid_form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
},


exportGrid: function(grid) {

	$("#export_grid_id").val(grid.grid_id);
  $("#export_grid_form").submit();
	
},

deleteGrid: async function(grid_id) {
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);

      $.ajax({
      type: "POST",
      headers :apiRequestHeader,
      url: '/grid/deleteGrid',
      data: {
        grid_id:grid_id
      },
      success: function(data) 
      {
        
        var new_grids = User.data.grids.filter(function(grid) {
          if (grid.grid_id == grid_id) {
            console.log('send', 'event', 'Grids', 'delete', grid.grid_title, grid.grid_id);
          }

          return grid.grid_id != grid_id;
        });

        User.data.grids= new_grids;
        Grid.reloadGrids();

      },
      dataType: 'json'
      });
},

reloadGrids: async function() {
      if(User.data.settings.current_project_id){

        console.log('get tile CSRF',CSRF);
        var csrf = await CSRF.token();
        var apiRequestHeader = {
            'X-CSRF-Token':csrf._csrf,
            // 'cookie':cookie
        };
        console.log('csrf',csrf);
        $.ajax({
          type: "POST",
          headers :apiRequestHeader,
          url: '/project/getGrids',
          data: {
            project_id : User.data.settings.current_project_id
          },
          success: function(project) 
          {
            var grids = project.grids;
            User.data.grid_groups = project.grid_groups;
            User.data.grids = grids;
            $.each(project.grid_groups, function(index,grid_group) {
              Grid.loadGridGroupDict(grid_group);
            });
            
            Grid.loadGrids(grids);
            Grid.reloadTemplatePage();
            if(Navigation.getActiveTabType() == "project_dashboard")
            {
                Project.loadDashboard();
            }
          },
          dataType: 'json'
        });
      }

},


};

