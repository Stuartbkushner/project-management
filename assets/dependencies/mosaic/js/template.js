Template = {

  loadTemplate: function(template)
  {
 
      
      // $(".headerWrapper .title").html(template.grid_title);
      // $(".headerWrapper .description").html(template.grid_description);
      // Application.setMode("template");

      Grid.loadGrid(template);
     

  },


  getTemplatesWithVersions: function() {

  var templates_array = new Array();
  $.each(User.data.templates, function(index,template) {
    templates_array.push({
      "id":template.grid_id,
      "ver":template.grid_version
    });
  });

  return templates_array;

},

  loadTemplates: function(templates) {
    Navigation.populateTemplatesList(templates);
    Navigation.updateFrames();
    Template.loadTemplateSelect(templates);
  },
  loadTemplateSelect: function(templates) {
    var global_templates = User.data.global_grid_groups.templates.all_grids;
    var global_group =  $("<optgroup>").attr('label',"Global Templates");
    $(".templateSelect").empty();
    
    $(".templateSelect").append("<option value='0'>No Template</option>");
    $.each(templates, function(index,template) {
        $(".templateSelect").append("<option value='"+template.grid_id+"'>"+template.grid_title+"</option>");
    });
    $.each(global_templates, function(index,template) {
        global_group.prepend("<option value='"+template.grid_id+"'>"+template.grid_title+"</option>");
    });
    $(".templateSelect").append(global_group);

  },


  newTemplate: function() 
  {
    var modal = $("#template_modal").mj_modal();
    modal.children(".header").prepend("New Template");

    modal.find("input").focus();
    modal.find(".save").on("click", function() {
      var template_id = 0;
      var template_name = modal.find(".name").val();
      var template_desc = modal.find(".description").val();
      var template_project_id = modal.find(".projectSelect").val();
      Template.saveTemplate(0,template_name,template_desc,template_project_id,modal);
    });
  },

  editTemplate: function(template) 
  {
    var modal = $("#template_modal").mj_modal();
    modal.find(".name").val(template.grid_title);
    modal.find(".description").val(template.grid_description);
    modal.children(".header").prepend("Edit Template");
    


    modal.find(".save").on("click", function() {
      var template_id =  template.grid_id;
      var template_name = modal.find(".name").val();
      var template_desc = modal.find(".description").val();
      var template_project_id = modal.find(".projectSelect").val();

        $.when(Template.saveTemplate(template_id,template_name,template_desc,template_project_id,modal)).done(function(data) {
            template.grid_title = data.grid_title;
            template.grid_description = data.grid_description;
        });
    });
  },

  saveTemplate: function(template_id,template_name,template_desc,template_project_id,modal)
  {
    return $.when(this.saveTemplateToDB(template_id,template_name,template_desc,template_project_id)).done(function(data) {
      if (template_id == 0) {
        $(".templateSelect").append("<option value='"+data.grid_id+"'>"+data.grid_title+"</option>");
        $("#template_list").prepend(Template.renderTemplateAsListItem(data));
      }
      else{
        $("#template_"+data.grid_id+" .listItemTitle").html(data.grid_title);
        $("#tab_grid_"+data.grid_id+" .title").html(data.grid_title);
      }

      User.data.templates.push(data);
      Grid.reloadGrids();
      Navigation.updateFrames();
      modal.remove();
      return data;
    });
  },

  deleteTemplate: async function(template_id)
  {
    var csrf = await CSRF.token();
    console.log('csrf',csrf);
    //    console.log('form_id',form_id);
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    return $.ajax({
	        headers:apiRequestHeader,
        type: "POST",
        url: '/grid/deleteGrid',
        data: {
          grid_id:template_id
        },
        dataType: 'json'
        });
  },

  saveTemplateToDB: async function(template_id,template_name,template_desc,template_project_id) {
    var csrf = await CSRF.token();
    console.log('csrf',csrf);
    //    console.log('form_id',form_id);
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    return $.ajax({
	        headers:apiRequestHeader,
        type: "POST",
        url: '/grid/saveGrid',
        data: {
            grid: {
              grid_title: template_name,
                grid_description: template_desc,
                grid_id: template_id,
                grid_template: 0,
                grid_type: 'template',
                project_id:  template_project_id
              }
        },
        dataType: 'json'
        });
  },

  getOpenTemplate: function()
  {
    return $(".gridTab.active").find(".tab_template_id").val() || 0;
  },
  deleteHeader: function(header){
    var header_as_obj = Template.convertHeaderToObj(header);
    header_as_obj.grid_tile_id = header_as_obj.grid_tile_id;
      $.when(Tile.removeFromGrid(header_as_obj)).done(function(data) {
            header.remove();
      });


  },
  saveHeader: function(header,action,ignore_existing)
  {

    var header_as_obj = Template.convertHeaderToObj(header);
    var positions = [];

    for(var i = 0; i < header_as_obj.template_header_column_span; i++)
    {
      positions.push(
        parseInt(header_as_obj.template_header_x)+i+","+header_as_obj.template_header_y
        );
    }

    if(ignore_existing !== true)
    {
      Tile.moveExistingTiles(positions,header);
    }

      $.when(this.saveHeaderToDB(header_as_obj,header)).done(function(data) {
          $(".grid").append(header);
          if(header_as_obj.template_header_id == 0)
          {
            //this is a new header, backend will return the new header's id
            header.find(".template_header_id").val(data.tile_id);
            header.find(".template_header_title_container").empty();
            Template.editTemplateHeader(data.tile_id);
          }

          Template.makeResizeable(header);
          Template.makeDraggable(header);
        
      });

    

  },

  editTemplateHeader: function(template_header_id) {
    var rendered_header = $(".grid input[value='"+template_header_id+"'].template_header_id").parents(".header");


    rendered_header.find("textarea").val(rendered_header.find(".template_header_title_container").html());
    rendered_header.find(".template_header_title_container").empty();


    rendered_header.find(".template_header_edit_container").show();




     var color_boxes = rendered_header.find('.colorBox');


    //attach the click handler to our color boxes
    $.each(color_boxes, function(index,value) {
      $(value).on("click", function() {


         //remove highlight from all other selected colors
         color_boxes.removeClass('selected');

         $(value).addClass('selected');

         $(value).parents(".header").css({"background":$(this).css('backgroundColor')});
         rendered_header.find('.headerColorInput').val(rgb2hex($(this).css('backgroundColor')));
      });
    });



    rendered_header.find(".save").on("click", function() {
      var title = rendered_header.find(".template_header_edit_container textarea").val();
      rendered_header.find(".template_header_title").val(title);
      rendered_header.find(".template_header_edit_container").hide();
      rendered_header.find(".template_header_title_container").html(title);
      Template.updateHeader(rendered_header);
    });
  },

  updateHeader: async function(rendered_header) {

      var header = Template.convertHeaderToObj(rendered_header);


      var csrf = await CSRF.token();
    console.log('csrf',csrf);
    //    console.log('form_id',form_id);
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    return $.ajax({
	        headers:apiRequestHeader,
        type: "POST",
        url: '/tile/updateTile',
        data: {
          update:{
            tile_title:header.template_header_title,
            tile_color:header.template_header_color
          },
          tile_id:header.template_header_id

        },
        success: function(result){ 
          Grid.reloadGrid();
          Pile.reloadPile();

        },
        dataType:'json'
      });
    },

  saveHeaderToDB: function(header,header_html) {
    var tile = {};
    tile.tile_id=header.template_header_id;
    tile.tile_template_id=header.template_header_template_id;
    tile.tile_title=header.template_header_title;
    tile.tile_x=header.template_header_x;
    tile.tile_y=header.template_header_y;
    tile.tile_column_span=header.template_header_column_span;
    tile.tile_grid_id=User.data.active_grid.grid_id;
    tile.tile_color=header.template_header_color;
    tile.tile_position = header.tile_position;
    tile.location_id = header.location_id;
    tile.grid_tile_id = header.grid_tile_id;
    tile.width = header.template_header_column_span;
    tile.tile_type = 'header';
    if (tile.location_id == '' || typeof tile.location_id == 'undefined' ||  tile.location_id == '0') {
      return Tile.saveGridTile(tile,header_html);
    } else{
      return Tile.moveTile(tile);
    }
    
    

  },

  convertHeaderToObj: function(header) {

    header_obj = {
      "grid_tile_id":header.find(".grid_tile_id").val(),
      "location_id":header.find(".location_id").val(),
      "template_header_id":header.find(".template_header_id").val(),
      "template_header_title":header.find(".template_header_title").val(),
      "template_header_x":header.find(".template_header_x").val(),
      "template_header_y":header.find(".template_header_y").val(),
      "tile_position":header.find(".tile_position").val(),
      "template_header_template_id":header.find(".template_header_template_id").val(),
      "template_header_column_span":header.find(".template_header_column_span").val(),
      "template_header_grid_id":header.find(".template_header_grid_id").val(),
      "template_header_color":header.find(".headerColorInput").val()
    };
    
    return header_obj;
  },

  populateTemplate: function(template_data) {
    $.each(template_data, function(key, header) {
        Template.renderHeaderOnGrid(header);
    });
  },

  renderHeader: function(header)
  {

    var header_div = $(".draggableTemplateHeader").clone();
    header_div.removeClass("draggableTemplateHeader");

    header_div.css({"background-color":header.tile_color});
    
    header_div.find(".template_header_title_container").html(header.tile_title);
    header_div.find(".template_header_title").val(header.tile_title);
    header_div.find(".template_header_id").val(header.tile_id);
    header_div.find(".template_header_x").val(header.x);
    header_div.find(".template_header_y").val(header.y);
    header_div.find(".template_header_template_id").val(header.grid_id);
    header_div.find(".location_id").val(header.location_id);
    header_div.find(".grid_tile_id").val(header.grid_tile_id);
    header_div.find(".tile_position").val(header.x+","+header.y);
    header_div.find(".template_header_column_span").val(header.width);
    header_div.find(".headerColorInput").val(header.tile_color);

    Template.makeResizeable(header_div);
    Template.makeDraggable(header_div);
    header_div.css({"display":'block'});
    return header_div;
    
  },

  renderHeaderOnGrid: function(header) {

    rendered_header = this.renderHeaderForGrid(header);

    $(".gridInnerWrapper .grid").append(rendered_header);
  },
    renderHeaderForGrid: function(header) {

    var rendered_header = Template.renderHeader(header);

    var header_position = Grid.getPositionByCoordinates(header.x+","+header.y);
  
    rendered_header.css({"left":header_position.x,"top":header_position.y,"width":(205*header.width)+(1*header.width-1)});

    var space = Grid.isLargeEnoughFor(header_position.x,header_position.y);
    if(!space.has_x_space)
    {
      Grid.setGridSize(header_position.x + (206 * 3));
    }
    if(!space.has_y_space)
    {
      Grid.setGridSize(false,header_position.y + (156 * 3));
    }

    return rendered_header;
  },

  makeDraggable: function(rendered_header) {
    $(rendered_header).draggable({helper: "clone", appendTo: "body", distance: 10 }).click(function(evt){
            if ( $(this).is('.ui-draggable-dragging') ) {
                  return;
            }
            //if we clicked the tile, we want to select it
            //evt.stopPropagation();
      });
  },

  makeResizeable: function(rendered_header) {
    $(rendered_header).resizable({
      grid: 206,
      stop: function(event,ui) {
        rendered_header.find(".template_header_column_span").val(Tile.getColumnSpan(rendered_header));
        Template.saveHeader(rendered_header);
      }
      //minWidth:206
    });
  },

  isOpen: function(template_id) {
    if($(".gridTab").find("input[value='"+template_id+"'].tab_template_id").parent(".gridTab").is(":visible"))
    {
      return true;
    }
    return false;
  },


  getTemplateData: async function(template_id)
  {
     var csrf = await CSRF.token();
    console.log('csrf',csrf);
    //    console.log('form_id',form_id);
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    return $.ajax({
	        headers:apiRequestHeader,
          type: "POST",
          url: '/grid/getGrid',
          data: {
                grid_id:template_id
                },
          success: function(data) {
          },
          dataType: 'json'
        });
  },


  renderTemplateAsListItem: function(template)
  {

    var container_div = $("<div/>", {class:"listItem",id:"template_"+template.grid_id});
    var title_container_div = $("<div/>", {class:"listItemTitle unselectable"}).html(template.grid_title.trimToLength(40)).on("click", function() {
      Template.loadTemplate(template);
    });

    var items = {
                    "edit": {
                        name: "Edit Title", 
                        callback: function(key, options) {
                          Template.editTemplate(template);
                        }
                        },
                    "delete": {
                        name: "Delete", 
                        callback: function(key, options) {
                          if (confirm("Are you sure you want to delete this template?")) {

                            $.when(Template.deleteTemplate(template.grid_id)).done(function(data) {
                              container_div.remove();
                              Navigation.updateFrames();
                              Grid.reloadGrids();
                            });



                  }
                      }
                      }
    };

    var gear_icon = gearMenu(items);
    container_div.append(title_container_div,gear_icon);

    container_div.append("<input type='hidden' class='navTemplateID' value='"+template.grid_id+"'>");

    return container_div;
  }


}