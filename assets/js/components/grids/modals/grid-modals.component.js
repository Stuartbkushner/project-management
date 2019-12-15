/**
 * <grid-modals>
 * -----------------------------------------------------------------------------
 * Pile of tiles that show up next to grid 
 *
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('grid-modals', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    //…
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
    <div  class="gridModals">
        <!-- start new/edit grid modal !-->
        <div id="grid_modal" class="modal gridModal">
            <div class="header unselectable"><div class="modalCloseButton">X</div></div>
            <div class="content">
                <input type="text" class="name" placeholder="Grid Name">
                <textarea class="description" placeholder="Grid Description"></textarea>
                <label>Template (Optional)</label>
                <select name="template" class="templateSelect">
                <option value="0">No Template</option>
                <!-- <?php 
                if (isset($templates)) {

                    foreach(json_decode($templates) as $template) { ?>
                    <option value="<?php echo $template->grid_id; ?>"><?php echo $template->grid_title; ?></option>
                <?php 
                    } 
                }
                ?> -->
                </select>
                <label class="to-project">Project</label>
                <select name="project" class="to-project projectSelect">
                <!-- <?php 
                if (isset($projects)) {

                    foreach($projects as $project) { ?>
                    <option value="<?php echo $project->project_id; ?>"><?php echo $project->project_name; ?></option>
                <?php 
                    } 
                }
                ?> -->
                </select>
                <button class="save">Save</button>
            </div>
        </div>
        <!-- end new/edit grid modal !--> 

        <!-- start new/edit select grid template modal !-->

        <div id="select_template_modal" class="modal selectTemplateModal">
            <div class="header unselectable">
                <h2>Quick Start</h2>
                <div class="modalCloseButton">X</div>
            </div>
            <div class="content">
                
                <div class="selectTemplatePages">
                <div class="templates">
                    <label> Suggested Templates </label> 
                </div>
                </div>

                <div class="selectTemplateBottom selectTemplateNav">
                <input type="hidden" value="start" class="page"/>
                <button class="btn fresh">New Grid</button>
                <button class="btn back">Back</button>

                </div>
                
                
            </div>
        </div>
        <!-- end new/edit select grid template modal !-->

        <!-- start inactive modal !-->
        <div id="inactive_modal" class="modal inactiveModal">
            <div class="header unselectable"><div class="modalCloseButton">X</div></div>
            <div class="content">
                <h2>
                <span class="title"></span>
                will close in 
                <span class="time"></span> seconds
                </h2>
                <div class="inactiveBottom">
                <button class="save">Don't Close Grid</button>
                </div>
            </div>
        </div>
        <!-- end inactive modal !-->



       
       
    </div>
  
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

  },
  mounted: function(){
    //   this.init();

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    bindUIActions: function() {
        //trigger create Grid Cllick
        var Grid = this;
        $("#new_grid_button, .new_grid_button ").on("click", function() {
			  Grid.selectTemplate();
		});
    },
    edit: function() {
        var Grid = this;
        $(".edit-grid").on("click", function() {
        });
    
    },
    selectTemplate: function() {
        var Grid = this;
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
    loadQuickTemplates: function(grid_group){
        var Grid = this;
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
    loadGridGroup: function(grid_group){
        var Grid = this;
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
    newGrid: function() {
        //load the project modal
        var Grid = this;
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
          grid.project_id = current_project_id;
          
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

      /* can go in  */
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
      renderAsIcon: function(grid) {
    
        var Grid = this;
        var container =  $('<div/>', {
          class:"gridAsIcon"
        });
        
        var object_container =  $('<div/>', {
          class:"gridAsIconObjects"
        });
        
        var grid_size = [6,6]; //TODO: this needs to pull the actual size of the grid!
        var container_width = 200;
        var container_height = 140;
        var grid_lines = Grid.getIconGridLines(grid_size,container_width,container_height);
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
        save: function(grid) {
          return $.ajax({
              type: "POST",
              url: '/action?action=saveGrid',
              dataType: 'JSON',
              data: {
                grid: {
                  grid_id: grid.grid_id,
                  grid_title: grid.grid_title,
                  grid_description: grid.grid_description,
                  project_id:  grid.project_id,
                  grid_template: grid.grid_template
                }
              }
          });
        },
        
        copy: function(grid) {
          console.log('send', 'event', 'Grids', 'copy', grid.grid_title, grid.grid_id);
          return $.ajax({
              type: "POST",
              url: '/action?action=copyGrid',
              dataType: 'JSON',
              data: {
                grid_id: grid.grid_id,
                grid_title: grid.grid_title,
                grid_description: grid.grid_desc,
                project_id: User.data.settings.current_project_id
              }
          });
        },

    
  }
});
