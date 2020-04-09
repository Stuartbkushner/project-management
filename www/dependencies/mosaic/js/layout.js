Layout = {

settings: {
  column_effect_delay: 500,
  column_min_width: 20,
  column_max_width: 1100,
  column_snap_guide: 200, //columns snap to multiples of this value when using jquery resizable
  column_normal_width: 220,
  column_large_width: 420,
  nav_accordion_effect_speed: 300
},

init: function() {
  //bind events
  this.bindUIActions();
},

// loadTabs: function(tabs) {
//   $.each(tabs, function(index,val) {
//     Layout.createTab(val);
//   });
// },

// closeTab: function(tab_element) {

//   //if this is the only tab, load the dashboard
//   if($(tab_element).siblings().find(".tab_grid_id").length == 0)
//   {
//     Grid.loadDashboard();
//   }

//   //is this the active tab?
//   if($(tab_element).hasClass("active"))
//   {
//     //if there's a tab to the right, load it
//     if($(tab_element).next().length > 0)
//     {
//       var grid_id = $(tab_element).next().find(".tab_grid_id").val();
//       $(tab_element).next().addClass("active");
//       Grid.getGrid(grid_id,false);
//     }
//     //if there are no tabs to the right, load tab to the left
//     else
//     {
//       var grid_id = $(tab_element).prev().find(".tab_grid_id").val();
//       $(tab_element).prev().addClass("active");
//       Grid.getGrid(grid_id,false);
//     }
//   }

//   //remove "active" class from the list item as well
//   var list_item = $("#grid_list .listItem").find("input[value='"+$(tab_element).find(".tab_grid_id").val()+"'].list_item_grid_id").parent().parent();
//   list_item.removeClass("active");

//   $(tab_element).remove();

// },


// tabIsOpen: function(tab_type,data) {
// // rendered_tab.append($("<input type='hidden' class='tab_"+tab_type+"_id' value='"+tab_object_id+"' />"));

//   switch(tab_type) {
//     case "projectDashboard":
//     console.log("projectDashboard is always open");
//       return true;
//     break;
//     case "gridDashboard":
//       if($("input[value='"+data.project_id+"'].tab_"+tab_type+"_id").length > 0)
//       {
//          console.log("This griddashboard is already open");
//         return true;
//       }
//       else
//       {
//          console.log("griddashboard tab not found");
//         return false;
//       }
//     break;
//     case "gridTab":
//       if($("input[value='"+data.grid_id+"'].tab_"+tab_type+"_id").length > 0)
//       {
//          console.log("grid already open");
//         return true;
//       }
//       else
//       {
//          console.log("grid is not open");
//         return false;
//       }
//     break;
//     default:
//      console.log("default returned");
//       return false;
//   }

//   // if($(".gridTab").find("input[value='"+grid_id+"'].tab_grid_id").parent(".gridTab").is(":visible"))
//   // {
//   //   return true;
//   // }
//   // return false;


// },


// createTab: function(tab_type, data) {


//   var tab_title = "";
//   var tab_object_id = 0;
//   var rendered_tab = $("<div class='unselectable gridTab'><div class='title'></div></div>");


//   switch(tab_type) {

//     case "projectDashboard":

//       tab_object_id = 0;
//       tab_title = "All Projects";
//       //fromprojectdashboard
//       rendered_tab.on("click", function() {
//         if($(this).hasClass("active"))
//         {
//           return;
//         }

//         $(".gridTab").removeClass("active");
//         $(this).addClass("active");
//         Project.loadDashboard(User.data.projects);
//       }).appendTo(".gridTabs");
//       //fromprojectdashboard

//     break;

//     case "gridDashboard":

//       tab_object_id = data.project_id;
//       tab_title = data.project_name;

//        //from gridDashboard
//       rendered_tab.on("click", function() {
//         Grid.loadDashboard(data);
//       });
//       //fromgridDashboard

//     break;

//     case "gridTab":

//       tab_object_id = data.grid_id;
//       tab_title = data.grid_title;
      
//       //add a close button for grid tabs
//       rendered_tab.append($("<div class='closeButton'>X</div>").on("click", function(evt) {
//         evt.stopPropagation();
//         Layout.closeTab($(this).parent());
//       }));

//       rendered_tab.on("click", function() {
//         if($(this).hasClass("active"))
//         {
//           return;
//         }
//         $(".gridTab").removeClass("active");
//         $(this).addClass("active");
//         Grid.getGrid(data);
//       });

//       rendered_tab.droppable({
//         greedy:true,
//         accept:".tile",
//         hoverClass: "tabDropActive",
//         tolerance: "pointer",
//         drop: function( event, ui ) {
//           event.stopPropagation();
//           ui.helper.remove();
//           var rendered_tile = ui.draggable;
//           //TODO: FIX THIS, need to pull proper grid. name changed on dom, to something_gridTab somethingorother
//           var grid_id = $(this).find(".tab_grid_id").val();
//           Tile.placeOnGrid(rendered_tile,grid_id);
//         }
//       });

//     break;

//     default:

//   }

//   rendered_tab.on("click", function() {
//     console.log("clicked tab", $(this));
//   });

//   // $(".gridTab").removeClass("active");
//   rendered_tab.find(".title").html(tab_title);
//   rendered_tab.attr({"title":tab_title});
//   rendered_tab.addClass(tab_type);

//   rendered_tab.append($("<input type='hidden' class='tab_"+tab_type+"_id' value='"+tab_object_id+"' />"));

//   return rendered_tab;

// },


// createTemplateTab: function(tab) {

//   var rendered_tab = $("<div class='gridTab unselectable' title='"+tab.template_name+"'><div class='title'>"+tab.template_name+"</div></div>");
//   rendered_tab.append($("<div class='closeButton'>X</div>").on("click", function(evt) {
//     evt.stopPropagation();

//     Layout.closeTab($(this).parent());
//   }));

//   rendered_tab.on("click", function() {
//     if($(this).hasClass("active"))
//     {
//       return;
//     }
//     $(".gridTab").removeClass("active");
//     $(this).addClass("active");
//     Template.loadTemplate(tab.template_id);

//   });


//   rendered_tab.append($("<input type='hidden' class='tab_template_id' value='"+tab.template_id+"' />"));

//   $(".gridTab").removeClass("active");
//   rendered_tab.addClass("active");
//   $(".gridTabs").append(rendered_tab);
// },

togglePane: function(pane) {
  if(this.getPaneState(pane) == 1)
  {
    this.collapsePane(pane);
    pane.find(".navToggle").addClass("navClosed");
  }
  else
  {
    this.expandPane(pane);
    pane.find(".navToggle").removeClass("navClosed");
  }
},

getPaneState: function(pane)
{
  if($(pane).width() == this.settings.column_min_width)
  {
    return 0;
  }
  else return 1;
},

collapsePane: function(pane)
{
  $(pane).animate({width: this.settings.column_min_width}, this.settings.column_effect_delay);
},

expandPane: function(pane)
{
  //reset the column's content container to the normal size
  pane.children(".navColumnContent").width(this.settings.column_normal_width - 40);
  $(pane).animate({width: this.settings.column_normal_width}, this.settings.column_effect_delay);
},

hideWidget:function(container_element)
{
  $(container_element).prev().find(".arrowRightIcon").css({"transform":"rotate(0deg)"});
  container_element.animate({
        height: 0
      }, Layout.settings.nav_accordion_effect_speed).promise().done(function () {
        $(".navColumnContent .listContainer").hide();
        $(".navColumnContent .listContainer").height("auto");
      });
},

showWidget:function(container_element)
{
    $(container_element).prev().find(".arrowRightIcon").css({"transform":"rotate(90deg)"});

    //check how much room is available in the column we're displaying our list of items in
    var space_available = this.getAvailableVerticalSpace($(".col1").find(".navColumnContent"));

    //check how much room we need to display the list we want to display 
    var space_needed = container_element.outerHeight();
    
    //we've measured the box, now start it's height at 0 (starting point for our effect)
    container_element.height(0);
    container_element.show();

    //if we need more space than we have, use what we have and trigger overflow:auto
    if(space_needed > space_available)
    {
      $(container_element).css({"overflow":"auto"});
      container_element.animate({
          height: space_available
      }, this.settings.nav_accordion_effect_speed);

    }
    else
    {
    //if we don't need all the space, let the list be however large it wants to be
    $(container_element).css({"overflow":"visible"});
      container_element.animate({
        height: space_needed
      }, this.settings.nav_accordion_effect_speed);
    }
},



toggleWidget: function(widget)
{
  
  //get index of clicked button
  var trigger_index_position = this.getElementPositionInCollection(widget);
  //get natching container element
  var containers = $(".navColumnContent .listContainer");

  var container_element = $(containers[trigger_index_position]);

  //check if our widget is open or closed
  if(container_element.is(":visible"))
  {
    //widget is open, close it
    this.hideWidget(container_element);
  }
  else
  {

    //if there are other widgets open, close them then open the widget we want
    if($(".navColumnContent .listContainer").is(":visible"))
    {
      $(".navColumnContent .listContainer").prev().find(".arrowRightIcon").css({"transform":"rotate(0deg)"});
      $(".navColumnContent .listContainer").animate({
        height: 0
      }, Layout.settings.nav_accordion_effect_speed).promise().done(function () {
        $(".navColumnContent .listContainer").hide();
        $(".navColumnContent .listContainer").height("auto");
        Layout.showWidget(container_element);
      });
    }
    else
    {
      //no open widgets, just open it
      Layout.showWidget(container_element);
    }

  }
},

getElementPositionInCollection: function(element) {
  
  // console.log(element.attr("class"));
  //get all siblings with the same class as our element
  var matched_elements = $(".listHeader");
  return matched_elements.index(element);

},

getAvailableVerticalSpace: function(element) {

  //how large is the container
  var container_height = element.height();

  //how much of the container is filled with visible elements
  var occupied_space = this.getOccupiedSpaceInContainer(element);

  return container_height - occupied_space;
  
},

getOccupiedSpaceInContainer: function(container)
{

  //get all the visible elements in our container
  var elements = container.children(":visible");
  
  //add all their heights together
  var occupied_space = 0;

  $.each(elements, function() {
    occupied_space = occupied_space + $(this).outerHeight();
  });


  return occupied_space;
},

bindUIActions: function() {

  Template.makeDraggable($(".draggableTemplateHeader"));

  // $(".headerWrapper .title").on("click", function() {
  //   Grid.editGrid(User.data.active_grid);
  // });

  // $(".headerWrapper .description").on("click", function() {
  //   Grid.editGrid(User.data.active_grid);
  // });


  $(".area").draggable({helper: "clone", appendTo: "body", distance: 10 });

  $(".gearIcon").on("click", function() {
    $(".mainGearMenu").toggle();
  });

  $(".decisionWrapper").on("click", function() {
    if($(".gridDecision .decisionContent").is(":empty"))
    {
      Grid.setDecision();
    }
    else
    {
      $(".gridDecision").toggle();

      if($(".gridDecision").is(":visible"))
      {
        Grid.setDecisionShown(1);
      }
      else
      {
        Grid.setDecisionShown(0);
      }

    }
  });

    $(".navToggle").on("click", function() {
      Layout.togglePane($(this).parents(".navColumn"));
    });

    $( ".navColumn" ).resizable({
       minWidth: this.settings.column_min_width,
       maxWidth: this.settings.column_max_width,
       handles: 'e',
       grid: this.settings.column_snap_guide,
       resize: function( event, ui ) {}
    });

    $( ".navColumn" ).on( "resize", function( event, ui ) {
        var column = $(ui.element);
        column.children(".navColumnContent").width(ui.size.width - 40);
    });

    $(".arrowRightIcon").on("click", function() {
      Layout.toggleWidget($(this).parent());
    });
    
}

};

