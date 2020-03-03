/**
 * <grid-wrapper>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to grid 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('grid-wrapper', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'id',
    'grid'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {

    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="gridWrapper">
        <div class="lockedGridOverlay"></div>
        <div class="gridTabs">
        </div>
        <div class="gridDecision unselectable">
            <div class="header unselectable"><div class="editDecisionBtn">Edit</div><div class="modalCloseButton">X</div></div>
            <div class="decisionContent"></div>
        </div>
        <div class="floatingTilesContainer hidden">
        </div>
        <div class="grid-message"></div>
        <div class="gridInnerWrapper">
            <div class="grid"></div>
        </div>
        
    </div>
  
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: function(){
    GridWrapper = this;
    grid = GridWrapper.grid;
    console.log("grid wrapper grid",grid);
    console.log("grid wrapper User",User);
    // console.log("grid wrapper Tile",Tile);

    GridWrapper.renderGrid(grid);

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    init: function() {
        GridWrapper = this;
        GridWrapper.watchActivity();
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



    
    renderGrid: function(grid)
    {
        $(".searchContainer").removeClass('projectFilter');
      // Application.setMode(grid.grid_type);
      // Navigation.showAllItems();
      User.data.active_grid = grid;
      // var grid_url = User.data.settings.current_project_url+"/"+grid.slug; 
      // Navigation.updateUrl(grid_url);
    
    
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


    
    
    reloadGrid: function(set_active_grid) {
      User.data.active_grid = set_active_grid || User.data.active_grid;
      var active_grid = User.data.active_grid;
      if(active_grid){
        $.ajax({
          type: "POST",
          url: '/action?action=getGrid',
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

    
    getCellCoordinatesByCursorPosition: function(cursor_x,cursor_y) {
    
      var grid_offset = $(".grid").offset();
    
      var x = cursor_x - grid_offset.left;
      var y = cursor_y - grid_offset.top;
    
      x = Math.floor(x / 206) + 1;
      y = Math.floor(y / 156) + 1;
    
      return x+","+y;
    
    },
    
    
    bindUIActions: function() {
      var GridWrapper = this;
      $(".editDecisionBtn").on("click", function() {
        GridWrapper.setDecision();
      });
    
      $(".gridDecision .modalCloseButton").on("click", function() {
        $.when(GridWrapper.setDecisionShown(0)).done(function() {
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
    
            var target_coordinates = GridWrapper.getCellCoordinatesByCursorPosition(event.clientX,event.clientY);
            var target_coords_array = target_coordinates.split(",");
            if(target_coords_array[0] == 0 || target_coords_array[1] == 0)
            {
              return;
            }
            var tile_position = GridWrapper.getPositionByCoordinates(target_coordinates);
    
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
              // new_tile.find(".template_header_grid_id").val(Grid.getActiveGridID());
              new_tile.find(".template_header_grid_id").val(GridWrapper.id);
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
   
    

    
    
  }
});
