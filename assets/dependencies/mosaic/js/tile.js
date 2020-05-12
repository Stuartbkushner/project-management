
/*
Tile = {

  settings: {},

  init: function() {


  },

  makeDraggable: function(tile) {

    $(tile).draggable({helper: "clone", appendTo: "body", distance: 10 }).click(function(evt){
      if ( $(this).is('.ui-draggable-dragging') ) {
        return;
      }
            //if we clicked the tile, we want to select it
            evt.stopPropagation();
            $(this).toggleClass("selectedTile");
          });
  },

  renderAsFloatingTile: function(tile) {
    tile.tile_prev_position="0,0";
    var rendered_tile = Tile.renderTile(tile);
    rendered_tile.addClass("floatingTile");
    this.makeDraggable(rendered_tile);
    $(".floatingTilesContainer").append(rendered_tile);
  },

  renderOnGrid: function(tile,grid_lock_user_id) {
    var rendered_tile = Tile.renderTile(tile);
    var coordinates = tile.x + ','+ tile.y;
    coordinates = Grid.getPositionByCoordinates(coordinates);
    var grid_x = coordinates.x;
    var grid_y = coordinates.y;

    rendered_tile.css({"left":grid_x,"top":grid_y});

    var space = Grid.isLargeEnoughFor(grid_x,grid_y);
    if(!space.has_x_space)
    {
      Grid.setGridSize(grid_x + (206 * 3));
    }
    if(!space.has_y_space)
    {
      Grid.setGridSize(false,grid_y + (156 * 3));
    }

    $(".gridInnerWrapper .grid").append(rendered_tile);

    if(grid_lock_user_id > 0 && grid_lock_user_id == User.data.user_id)
    {
      this.makeDraggable(rendered_tile);
    }else if (grid_lock_user_id == 0){
      this.makeDraggable(rendered_tile);
    }else{

    }
  },

  isTileTagged: function(search_tags,tile_tags)
  {
    if(this.csvMatch(search_tags,tile_tags) === true)
    {
      return true;
    }
    return false;
  },

  csvMatch: function(csv1,csv2)
  {
    var array_1 = this.CSVtoArray(csv1);
    var array_2 = this.CSVtoArray(csv2);

    var match = false;

    $.each(array_1, function(index,val) {
      if(array_2.indexOf(val) >= 0 || Tile.isPartialStringInArray(val,array_2) === true)
      {
        match = true;
      }
      else
      {
        match = false;
      }
    });

    if(match === true)
    {
      return true;
    }

    return false;
  },

  isPartialStringInArray: function(partial_string,array)
  {

    var found = false;
    $.each(array, function(index,val){
      if(val.search(partial_string) >= 0)
      {
        found = true
      }
    });

    if(found === true)
    {
      return true;
    }
    else
    {
      return false;
    }
  },


  CSVtoArray: function(text) {
    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
          });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
  },


  newTile: function(color,position) {

    //create the new tile div
    // this.renderNewTileModal(color);
    console.log('send', 'event', 'Tiles', 'new tile click', 'New Tile Click', User.data.user_id);

    var tile = this.createTile(color,position);
    tile.children(".header").prepend("New Tile");
    return tile;
  },

  //returns create tile modal DOM object
  createTile: function(color,position)
  {

    var tile = $("#tile_modal").mj_modal();
    tile.find(".tile_modal_send_to_grid").empty();
    Tile.updatePlaceOnGridSelect();
    tile.find(".tile_new_grid_btn").on("click", function(e) {
      e.stopPropagation();
      User.data.place_on_grid = true;
      Grid.newGrid();

    });

    tile.resizable();
    tile.find(".modalCloseButton").unbind();
    tile.find(".modalCloseButton").on("click", function() {


      //check if we have any annotations on this tile
      if($(".tile_modal_annotations li").length > 0)
      {
        var check_tile_id = tile.find(".tile_id").val();
        var highlights = $(".sourceRight").filter(":visible").find("input[value='"+check_tile_id+"'].source_temp_id").parent();
        highlights.remove();
      }
      tile.find('.annotationDeleteButton').each(function() {
             $(this).click();
      });
      tile.remove();
      User.data.place_on_grid = false;
    });

    tile.find('.save').on("click", function() {  
      var tile_id = tile.find('.tile_id').val();
      if(position)
      {
        Tile.createGridTile(tile,true); // (TODO: true causes createGridTile to also cause reloadGrid, this could be rewritten)
      }
      else if(tile_id == 0){
        Tile.saveTile(tile);
      }
      else
      {
        Tile.updateTile(tile);
      }
      tile.remove();
      User.data.place_on_grid = false;
    });

  //   tile.find('.tile_modal_content').ckeditor();

    tile.find('.tile_modal_tags')
        // don't navigate away from the field on tab when selecting an item
        .bind( "keydown", function( event ) {
          if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
            event.preventDefault();
        }
      })
        .autocomplete({
          source: function( request, response ) {
            $.getJSON( "/action", {
              term: Tile.extractLast( request.term ),
              action: "getTags"
            }, response );
          },
          search: function() {
            // custom minLength
            var term = Tile.extractLast( this.value );
            if ( term.length < 2 ) {
              return false;
            }
          },
          focus: function() {
            // prevent value inserted on focus
            return false;
          },
          select: function( event, ui ) {
            var terms = Tile.split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push( ui.item.value );
            // add placeholder to get the comma-and-space at the end
            terms.push( "" );
            this.value = terms.join( ", " );
            return false;
          }
        });

        var color_boxes = tile.find('.colorBox');


      //attach the click handler to our color boxes
      $.each(color_boxes, function(index,value) {
        $(value).on("click", function() {

          //remove highlight from all other selected colors
          color_boxes.removeClass('selected');

          $(value).addClass('selected');
          tile.find('.tileColorInput').val(rgb2hex($(this).css('backgroundColor')));
        });
      });





      if(position)
      {
        tile.find('.new_tile_position').val(position);
        tile.find('.new_tile_grid_id').val(User.data.active_grid.grid_id);
      }


      //select our starting color, red
      tile = Tile.selectColor(tile,color);


      var capture_button = tile.find('.tile_modal_highlight_button, .add_hightlight .tile_modal_highlight_button');
      capture_button.on("click", function() {

        if($(".source_modal").is(":visible"))
        {

        }
        else
        {
          alert("You must open a source document to highlight text.");
          return;
        }

        $(".tile_modal_highlight_button").not(this).removeClass("active");
        $(this).toggleClass("active");


      });

      return tile;
    },

    focusTile: function(tile) {
      var modal_zindex;
      var open_modals = $('.modal').filter(":visible");

      if(open_modals.length === 1)
      {
        modal_zindex = 5;
      }
      else if(open_modals.length > 1)
      {
        modal_zindex = this.getCurrentFocusZindex() + 1;
      }
        $(tile).css('z-index',modal_zindex);
},

getCurrentFocusZindex: function()
{

  var currently_shown_tiles = $('.modal').filter(":visible");

  var index_to_beat = 0;

  $.each(currently_shown_tiles, function(index,value) {
    var tile_index = parseInt($(value).css('zIndex'));
    if(tile_index > index_to_beat)
    {
      index_to_beat = tile_index;
    }
  });
  
  return index_to_beat;
},

setTilePosition: function(tile,position) {
    //this function sets static values, settileposition calls need to be removed
    var left = parseInt($("#view_source_modal").css("left"))+parseInt($("#view_source_modal").css("margin-left")) + parseInt($("#view_source_modal").width());
    tile.css({top: 83, left: left - 150});
  },

  loadTemplate: function(template)
  {
    return $("#"+template).children().clone();
  },


  getTile: async function(tile_id)
  {

    // // var Tile = this;
    console.log('get tile tile_id',tile_id);
    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);

    

    
    var data = {
      tile_id : tile_id,
    }
    console.log('get tile data',data);

    // var tile = await  io.socket.request({
    //   method: 'post',
    //   url: '/tile/get',
    //   data: data,
    //   headers: apiRequestHeader
    // }, function (resData, jwres) {
    //   console.log('get tile result',resData); // => e.g. 403
      
    //   if (jwres.error) {
    //     console.log(jwres.statusCode); // => e.g. 403
    //     return;
    //   }
    //   return resData;
    
    //   console.log(jwres.statusCode); // => e.g. 200
    
    // });
    // return tile; 
   var tile = await  $.ajax({
      type: "POST",
      // url: '/tile/getTile',
      url: '/tile/get',
      headers: apiRequestHeader,
      data: {
        tile_id:tile_id

      },
      success: function(data) {
        return data;
      },
      dataType: 'json'
    });
    return tile;




 },




 editTile: async function(tile) {

  var data =  await Tile.getTile(tile.tile_id);
  console.log("editTile tile data",data);



          var tile = data;

          //bind our "save tile" button, for this function, we need to reload the pile
          var blank_tile = Tile.createTile(tile.tile_color);
          blank_tile.children(".header").prepend("Edit Tile");
          console.log("editTile tile blank_tile",blank_tile);


          blank_tile.find('.create_tile_button').on("click", function()
          {
            Tile.createGridTile($(blank_tile));
          });

          if(tile.tile_source_anno.length >0)
          {
            global_tiles[tile.tile_id] = new Array();
            source_counter = 0;
            $.each(tile.tile_source_anno, function(index,annotation) {

                global_tiles[tile.tile_id].push(annotation);
                var test_hack = source_counter;
                var annotation_link = $("<a href='#'>"+annotation.source_title+" / "+annotation.source_page+" / "+annotation.source_author+"</a>");
                var cutout = $('<img>');
                cutout.attr('src', annotation.cutout);
                var annotation_container = $('<div/>');

                annotation_container.append(annotation_link,cutout);
                annotation_container.append("<input type='hidden' class='source_temp_id' value='"+test_hack+"'>");
                annotation_container.append("<input type='hidden' class='annotation_id' value='"+annotation.annotation_id+"'>");
                annotation_container.on("click", function() {
                  //Source.page_num = annotation.source_page;
                  Source.viewSource(annotation.source_id,annotation.source_page);
                });

                var anno_del_btn = $("<a/>", { class: "annotationDeleteButton"}).html("X ");

                anno_del_btn.on("click", function() {

                  var rendered_annotations =  $('input.source_temp_id[value='+test_hack+']').parent();
                  rendered_annotations.remove();

                  //this removes the annotation object from the global_tiles[tile_id] array
                  global_tiles[tile.tile_id] = $.grep(global_tiles[tile.tile_id], function(n,i) {
                    return n.source_temp_id != test_hack;
                  });

                }).prependTo(annotation_container);

                $(annotation_container).appendTo(blank_tile.find('.tileModalAnnotationList'));
                annotation.source_temp_id = test_hack;
                source_counter++;
              });
            }

            blank_tile.find('.tile_modal_title').val(tile.tile_title);
            blank_tile.find('.tile_modal_content').val(tile.tile_content);
            blank_tile.find('.tile_modal_video').val(tile.tile_video);
            blank_tile.find('.tile_modal_tags').val(tile.tile_tags);
                //NEED TO DO SOMETHING ABOUT THESE TWO
                //Tile.selectColor('new_tile_modal',tile.tile_color);
                blank_tile = Tile.selectColor(blank_tile,tile.tile_color);
                //$("#new_tile_source").val(tile.tile_source);
                //NEED TO DO SOMETHING ABOUT THESE TWO
                blank_tile.find('.tile_id').val(tile.tile_id);
                blank_tile.find('.new_tile_position').val(tile.tile_position);

              //if share field is populated in db, we load it into our hidden field, and show to the user
              if(tile.tile_share != "")
              {

                var tile_share_count = tile.tile_share.length;
                $.each(tile.tile_share, function(index, value) {
                  if(index == tile_share_count - 1)
                  {
                    blank_tile.find('.shared_with_list').append(value.sharing_email);
                  }
                  else
                  {
                    blank_tile.find('.shared_with_list').append(value.sharing_email+", ");
                  }
                });
              }
              else
              {
                blank_tile.find('.shared_with_list').html('None');
              }


              if(tile.tile_grids != "")
              {
                var used_on_grids_count = tile.tile_grids.length;
                $.each(tile.tile_grids, function(index, value) {
                  var grid_link = $('<a>',{

                    title: value.grid_title,
                    href: '#',
                    click: function()
                    { 
                      Grid.loadGrid(value);


                        //if a source is visible, minimize it
                        // if($("#view_source_modal").is(":visible"))
                        // {
                        //   var current_source_id = $("#view_source_source_id").val();
                        //   var current_page_number = pageNum;
                        //   var scroll_top = $("#source_scroll_container").scrollTop();
                        //   var source_title = $("#view_source_source_title").val()

                        //   Source.minimizeSource(current_source_id, current_page_number, scroll_top, source_title);
                        // }

                      }});

                  if(index == used_on_grids_count - 1)
                  {
                    grid_link.html(value.grid_title);
                  }
                  else
                  {
                    grid_link.html(value.grid_title+', ');
                  }

                  grid_link.appendTo(blank_tile.find('.tile_modal_used_on_grids'));
                });
            }
            else
            {
              blank_tile.find('.tile_modal_used_on_grids').html('None');
            }
            
 

},


selectColor: function(tile, hex) {

//var hex = "#b5e0dd";
    //find the color box that matches the hext code
    tile.find('.colorBox').removeClass('selected');

    var our_color_box = tile.find('.colorBox').filter(function() {
        var match = hex; // match background-color: black
            // true = keep this element in our wrapped set
            // false = remove this element from our wrapped set
            return ( rgb2hex($(this).css('background-color')) == match );

          });

    our_color_box.addClass("selected");



    // var hex_search_string = "color_" + hex.replace('#',"").toLowerCase();


    //find the color box we want to select
    // var our_color_box = tile.find('.'+hex_search_string);

    // $(our_color_box).addClass('selected');
    tile.find('.tileColorInput').val(rgb2hex($(our_color_box).css('backgroundColor')));

    return tile;
  },


  selectGroupBorder: function(modal, border) {

    //deselect any selected colors
    $('.groupIcon').removeClass("groupSelected");

    //find the color div that matches our hex
    var group_icon_div = $(".group_border_"+border);

    //set our hidden color input
    modal.find(".groupBorderInput").val(border);

    //select it
    group_icon_div.addClass("groupSelected");

  },


  //returns HTML for multiple passed tile objects
  renderTiles: function(tiles) {

    var rendered_tiles = [];

    $.each(tiles, function(index, value) {
      rendered_tiles.push(Tile.renderTile(value));
    });

    return rendered_tiles;
  },

  getOpenTiles: function() {

    return $(".tileView");

  },


  split: function( val ) {
    // return val.split( /,\s* / );
  },
  extractLast: function( term ) {
    return Tile.split( term ).pop();
  },







  bindUIActions: function() {

  },

  newGroup: async function(new_group,new_tiles) {
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);
    return $.ajax({
      type: "POST",
      url: '/tile/group',
      headers :apiRequestHeader,
      data: {
        group: new_group,
        tiles: new_tiles
      },
      success: function(data) 
      {
                // $("#add_to_new_group_modal").modal("hide");
                // Grid.getGrid($("#grid_id").val());
                Grid.reloadGrid();
              },
              dataType: 'json'
            });
  },

  saveGroup: async function(group_data) {
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
    console.log('csrf',csrf);
    return $.ajax({
      type: "POST",
      url: '/tile/editGroup',
      headers :apiRequestHeader,
      data: {
        tile_group_id: group_data.tile_group_id,
        group: group_data
      },
      success: function(data) 
      {
        Grid.reloadGrid();
      },
      dataType: 'json'
    });
  },


  ungroupTiles: async function(tiles) {
    var grid_tile_ids = new Array();
    $.each(tiles, function(index, value) {
      var grid_tile = Tile.getObjByRenderedTile($(value));
      grid_tile_ids.push(grid_tile.grid_tile_id);     
    });

    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);
    
    $.ajax({
      type: "POST",
      url: '/tile/ungroup',
      headers :apiRequestHeader,
      data: {
        grid_tile_ids: grid_tile_ids
      },
      success: function(data) 
      {
        Grid.reloadGrid();
      },
      dataType: 'json'
    });
  },


  getRenderedTileByObj: function(tile_obj) {

    //if the tile's in the pile, we can just grab it by id
    if(tile_obj.tile_position == "0,0")
    {
      return $(".tile_id").filter(function () {return $(this).val() == tile_obj.tile_id; }).parent(".tile");
    }
    //if the tile is a clone on the grid, we can grab the grid cell, get the tile in it, make sure the id matches the tile we want
    else
    {
      return $(".tile_position").filter(function () {return $(this).val() == tile_obj.tile_position && $(this).siblings(".tile_id").val() == tile_obj.tile_id;}).parent(".tile");
    }

  },




  deleteTile: async function(tile) {

    var rendered_tile = this.getRenderedTileByObj(tile);
    $(rendered_tile).remove();

    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);

    $.ajax({
      type: "POST",
      url: '/tile/deleteTileSingle',
      headers :apiRequestHeader,
      data: 
      {
        tile_id:tile.tile_id

      },
      success: function(data) 
      {
        Pile.reloadPile();
        Grid.reloadGrid();
      },
      dataType: 'json'
    });
  },

  removeFromGrid: async function(tile) {
    var rendered_tile = this.getRenderedTileByObj(tile);
    $(rendered_tile).remove();
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);
      console.log('removeFromGrid tile',tile);

    $.ajax({
      type: "POST",
      url: '/tile/removeFromGrid',
      headers:apiRequestHeader,
      data: 
      {
        grid_tile_id:tile.grid_tile_id
      },
      success: function(data) 
      {
      },
      dataType: 'json'
    });
  },


  rerenderTile: function(rendered_tile) {
    var new_tile = this.getObjByRenderedTile(rendered_tile);
    return this.renderTile(new_tile);
  },


  getObjByRenderedTile: function(rendered_tile) {
    var new_tile = {
      tile_color:rendered_tile.children(".tile_color").val(),
      tile_video:rendered_tile.children(".tile_video").val(),
      tile_id: rendered_tile.children(".tile_id").val(),
      tile_position:rendered_tile.children(".tile_position").val(),
      tile_prev_position:rendered_tile.children(".tile_prev_position").val(),
      tile_tags:rendered_tile.children(".tileTags").html(),
      tile_grid_id:rendered_tile.children(".tile_grid_id").val(),
      location_id:rendered_tile.children(".location_id").val(),
      grid_tile_id:rendered_tile.children(".grid_tile_id").val(),
      tile_created:rendered_tile.children(".tileDate").html(),
      tile_starred:rendered_tile.children(".tileStar").hasClass("favorite"),

      tile_group: {
        group_color: rendered_tile.children(".group_color").val(),
        group_description: rendered_tile.children(".group_description").val(),
        group_grid_id: rendered_tile.children(".group_grid_id").val(),
        group_id: rendered_tile.children(".group_id").val(),
        group_name: rendered_tile.children(".group_name").val(),
        group_border: rendered_tile.children(".group_border").val()

      }



    };
    return new_tile;

  },


  getSelectedTiles: function() {
    return $(".selectedTile");
  },

  getTilesByGroupID: function(group_id) {
    //return $(".tile_id:input[value='"+tile_id+"']").parents(".tile");
    return $(".grid .tile .group_id:input[value='"+group_id+"']").parents(".tile");
  },

  copyToNewGrid: async function() {
    var modal = $("#grid_modal").mj_modal();
    modal.children(".header").prepend("Copy Tiles to New Grid");
    console.log("copyToNewGrid Grid",Grid);

    modal.find(".save").on("click", async function() {

      var tiles = Tile.getSelectedTiles();
      var grid = {};
      var grid_tile_ids = new Array();

      grid.grid_title = modal.find(".name").val();
      grid.grid_description = modal.find(".name").val();
      grid.project_id = User.data.settings.current_project_id;
      $.each(tiles, function(index, value) {
        var grid_tile = Tile.getObjByRenderedTile($(value));
        grid_tile_ids.push(grid_tile.grid_tile_id);
      });
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);
      $.ajax({
        type: "POST",
        url: '/tile/copyToNewGrid',
        headers :apiRequestHeader,
        data: {
          grid:grid,
          grid_tile_ids: grid_tile_ids
        },
        success: function(data)
        {
          modal.remove();
          $(".selectedTile").removeClass("selectedTile");
            // Grid.loadGrid(data.grid);
            Grid.reloadGrids();
          }
        });
    });


  },

  moveToNewGrid: async function(tiles) {
    var modal = $("#grid_modal").mj_modal();
    modal.children(".header").prepend("Move Tiles to New Grid");


    modal.find(".save").on("click", async function() {

      var tiles = Tile.getSelectedTiles();
      var grid = {};
      var grid_tile_ids = new Array();

      grid.grid_title = modal.find(".name").val();
      grid.grid_description = modal.find(".name").val();
      grid.project_id = User.data.settings.current_project_id;
      $.each(tiles, function(index, value) {
        var grid_tile = Tile.getObjByRenderedTile($(value));
        grid_tile_ids.push(grid_tile.grid_tile_id);
      });
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);


      $.ajax({
        type: "POST",
        url: '/tile/moveToNewGrid',
        headers :apiRequestHeader,
        data: {
          grid:grid,
          grid_tile_ids: grid_tile_ids
        },
        success: function(data)
        {
          modal.remove();
          tiles.remove();
          Grid.reloadGrids();
        }
      });

    });

  },

  copyTileToProject:async function(tile,project_id) {

    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);

   $.ajax({
    type: "POST",
    url: '/tile/copyTileToProject',
    headers :apiRequestHeader,
    data: {
     tile: tile,
     project_id: project_id
   },
   success: function(data) 
   {
   },
   dataType: 'json'
 });

 },

 groupTiles: function(tiles) {

  var modal = $("#group_modal").mj_modal();
  modal.children(".header").prepend("Group Tiles");


  modal.find(".groupDashed").on("click", function() {
    Tile.selectGroupBorder(modal,1);
  });

  modal.find(".groupDotted").on("click", function() {
    Tile.selectGroupBorder(modal,2);
  });

  modal.find(".groupSolid").on("click", function() {
    Tile.selectGroupBorder(modal,3);
  });

  //attach handler to save button
  modal.find('.save').on("click", function() {

    var tiles = Tile.getSelectedTiles();

    var new_tiles = new Array();
    $.each(tiles, function(index, value) {
      new_tiles.push(Tile.getObjByRenderedTile($(value)));      
    });

    var new_group = {
      tile_group_title: modal.find(".add_to_new_group_title").val(),
      tile_group_description: modal.find(".add_to_new_group_desc").val(),
      tile_group_border:modal.find(".groupBorderInput").val(),
      tile_group_type:'group',
      project_id:User.data.settings.current_project_id
    }

    $.when(Tile.newGroup(new_group,new_tiles)).done(function() {
      modal.remove();
    });


  });

},

editGroup: function(group_id,group_name,group_description,group_border) {

  var modal = $("#group_modal").mj_modal();
  modal.children(".header").prepend("Edit Group");


  modal.find(".add_to_new_group_title").val(group_name);
  modal.find(".add_to_new_group_desc").val(group_description);
  modal.find(".groupBorderInput").val(group_border);
  modal.find(".groupIcon").removeClass("groupSelected");

  if(group_border == 1)
  {
    modal.find(".group_border_1").addClass("groupSelected");
  }
  else if(group_border == 2)
  {
    modal.find(".group_border_2").addClass("groupSelected");
  }
  else if(group_border == 3)
  {
    modal.find(".group_border_3").addClass("groupSelected");
  }


  modal.find(".groupDashed").on("click", function() {
    Tile.selectGroupBorder(modal,1);
  });

  modal.find(".groupDotted").on("click", function() {
    Tile.selectGroupBorder(modal,2);
  });

  modal.find(".groupSolid").on("click", function() {
    Tile.selectGroupBorder(modal,3);
  });

  //attach handler to save button
  modal.find('.save').on("click", function() {

    var new_group = {
      tile_group_id: group_id,
      tile_group_title: modal.find(".add_to_new_group_title").val(),
      tile_group_description: modal.find(".add_to_new_group_desc").val(),
      tile_group_border:modal.find(".groupBorderInput").val()
    }


    $.when(Tile.saveGroup(new_group)).done(function() {
      modal.remove();
    });


  });
},


addTilesToGroup: async function(tiles,group_id) {
    var selected_tiles = new Array();	
  $.each(tiles, function(index,value) {
    selected_tiles.push(Tile.getObjByRenderedTile($(value)));
  });
  console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);

  $.ajax({
    type: "POST",
    url: '/tile/add2Group',
    headers :apiRequestHeader,
    data: {
     tiles: selected_tiles,
     tile_group_id: group_id
   },
   success: function(data) 
   {
     Grid.reloadGrid();
   },
   dataType: 'json'
 });
},

getClonesByTileID: function(tile_id) {
  return $(".grid .tile_id[value='"+tile_id+"']").parents(".tile");
},

findRenderedTilesByID: function(tile_id) {
  return $(".tile_id:input[value='"+tile_id+"']").parents(".tile");
},


favorite: async function(tile,state) {
  console.log('get tile CSRF',CSRF);
  var csrf = await CSRF.token();
  var apiRequestHeader = {
    'X-CSRF-Token':csrf._csrf,
      // 'cookie':cookie
  };
  console.log('csrf',csrf);

    $.ajax({
        type: "POST",
        url: '/tile/starTile',
        headers :apiRequestHeader,
        data: {
            tile:tile,
            tile_state:state
   },
   success: function(data) 
   {
    var rendered_tiles = Tile.findRenderedTilesByID(tile.tile_id);

    $.each(rendered_tiles, function(index,tile) {
      if(state == true)
      {
        $(tile).find(".tileStar").hide();
        $(tile).find(".tileStar").removeClass("favorite");
      }
      else
      {
        $(tile).find(".tileStar").show();
        $(tile).find(".tileStar").addClass("favorite");
      }
    });
  },
  dataType: 'json'
});
},

isOnGrid: function(tile_id) {

  if($("#grid .tile_id[value='"+tile_id+"']"))
  {
    return true;
  }

  return false;

},

hasFindIcon: function(tile_id) {

  var pile_tile = $("#pile .tile_id[value='"+tile_id+"']");
  var our_tile = pile_tile.closest(".tile");
  var find_check = our_tile.children(".findTile");

  if(find_check.length > 0)
  {
   return true;
 }
 else
 {
   return false;
 }
 return false;
},


renderTile: function(tile){
    Date.prototype.prettyDate = function() {
        return (this.getMonth()+1)+"/"+this.getDate()+"/"+this.getFullYear();
    }
  var tile_div = $('<div class="tile draggable unselectable"></div>').css({'background':tile.tile_color});

  if(tile.groups.length > 0)
  { 
    tile.tile_group = tile.groups[0];

    var strip_tile_desc = tile.tile_group.tile_group_description.replace(/<\/?[^>]+(>|$)/g, "");
    var tile_div = $('<div class="tile draggable" data-container="body" data-content="'+strip_tile_desc+'" data-original-title="'+tile.tile_group.tile_group_title+'"></div>').css({'background':tile.tile_color});

    $(tile_div).popover({'trigger':'hover','delay':{'show':1000}});

    var group_color = $('<input/>', {
      type: 'hidden',
      class: 'group_color',
      value: tile.tile_group.tile_group_color
        //id: 'tile_' + tile.tile_id
      });

    var group_description = $('<input/>', {
      type: 'hidden',
      class: 'group_description',
      value: tile.tile_group.tile_group_description
        //id: 'tile_' + tile.tile_id
      });

    var group_grid_id = $('<input/>', {
      type: 'hidden',
      class: 'group_grid_id',
      value: tile.tile_group.tile_group_grid_id
        //id: 'tile_' + tile.tile_id
      });

    var group_id = $('<input/>', {
      type: 'hidden',
      class: 'group_id',
      value: tile.tile_group.tile_group_id
        //id: 'tile_' + tile.tile_id
      });

    var group_name = $('<input/>', {
      type: 'hidden',
      class: 'group_name',
      value: tile.tile_group.tile_group_title
        //id: 'tile_' + tile.tile_id
      });

    var group_border = $('<input/>', {
      type: 'hidden',
      class: 'group_border',
      value: tile.tile_group.tile_group_border
            //id: 'tile_' + tile.tile_id
          });


    if(tile.tile_group.tile_group_border == "1") 
    {
     tile_div.css({'border':'3px dashed #722f92'});
   }
   else if(tile.tile_group.tile_group_border == "2")
   {
     tile_div.css({'border':'3px dotted #c5442d'});
   }
   else if (tile.tile_group.tile_group_border == "3")
   {
     tile_div.css({'border':'3px solid #3a02d1'});
   }


 }
 else
 {
  tile_div.css({'border':'3px solid inherit'});
}



var tile_id = $('<input/>', {
  type: 'hidden',
  class: 'tile_id',
  value: tile.tile_id
        //id: 'tile_' + tile.tile_id
      });



var tile_grid_id = $('<input/>', {
  type: 'hidden',
  class: 'tile_grid_id',
  value: tile.tile_grid_id
        //id: 'tile_' + tile.tile_id
      });

var grid_tile_id = $('<input/>', {
  type: 'hidden',
  class: 'grid_tile_id',
  value: tile.grid_tile_id
        //id: 'tile_' + tile.tile_id
      });

var location_id = $('<input/>', {
  type: 'hidden',
  class: 'location_id',
  value: tile.location_id
        //id: 'tile_' + tile.tile_id
      });

var tile_color = $('<input/>', {
  type: 'hidden',
  class: 'tile_color',
  value: tile.tile_color
        //id: 'tile_' + tile.tile_id
      });

var tile_position = $('<input/>', {
  type: 'hidden',
  class: 'tile_position',
  value: tile.x + ',' + tile.y
        //id: 'tile_' + tile.tile_id
      });

var tile_prev_position = $('<input/>', {
  type: 'hidden',
  class: 'tile_prev_position',
  value: tile.tile_prev_position
        //id: 'tile_' + tile.tile_id
      });

var tile_title = $('<div/>', {
  class: 'tileTitle clearBoth',
  title: tile.tile_title
}).html(tile.tile_title);


var tile_content = $('<div/>', {
  class: 'tileContent',
}).html(tile.tile_content);

        //is the title too long for a pile tile?
        if(tile.tile_title.length > 20)
        {
          tile_title.addClass("pileLong");
          tile_content.addClass("pileLong");
        }
        //is the title too long for a regular sized tile?
        if(tile.tile_title.length > 26)
        {
          tile_title.addClass("gridLong");
          tile_content.addClass("gridLong");
        }



        //tile_title.truncate({});
        var created_by = tile.user_first[0] +"."+tile.user_last;
        var tile_date = $('<div/>', {
          class: 'tileDate',
        }).html((new Date(tile.createdAt)).prettyDate());
        // }).html((new Date(tile.tile_created)).prettyDate());

        tile_date.append("&nbsp;&nbsp;&nbsp;"+created_by);


        var tile_id_display = $('<div/>', {
          class: 'tileID',
        }).html("ID: "+tile.tile_id);


        if(tile.tile_starred == true) {
          var tile_star = $('<div/>', {
            class: 'tileStar favorite',
            title: 'Favorite'
          });


    //IF SUE WANTS THE FAVORITED ONCLICK BACK
    // .on("click", function(evt) {
    //     evt.stopPropagation();
    //     Tile.favorite(Tile.getObjByRenderedTile($(this).parent(".tile")));
    //   });



}
else {
 var tile_star = $('<div/>', {
  class: 'tileStar',
  title: 'Favorite'
})

    //IF SUE WANTS THE FAVORITED ONCLICK BACK
     //  .on("click", function(evt) {
        // 	evt.stopPropagation();
        // 	Tile.favorite(Tile.getObjByRenderedTile($(this).parent(".tile")));
        // });


}

var tile_tags = $('<div/>', {
  class: 'tileTags',
}).html(tile.tile_tags);


tile_div.append(tile_title,tile_content,tile_tags,tile_id,tile_position,tile_prev_position,tile_grid_id,tile_color,tile_star,tile_date,group_color,group_description,group_grid_id,group_id,group_name,group_border,tile_id_display,grid_tile_id,location_id);


$(tile_div).on("dblclick touchstart", function(evt) {
  evt.stopPropagation();

  tile_div.addClass("selectedTile");

  var tile = Tile.getObjByRenderedTile($(evt.currentTarget));
  Tile.openTile(tile);

});

return tile_div;

},

openTile : async function(tile){
  // var tile_promise =  Tile.getTile(tile.tile_id);
  var data =  await Tile.getTile(tile.tile_id);

  var modal = $("#view_tile_template").mj_modal();
  modal.children(".header").prepend("View Tile");
  // modal.children(".header").prepend(tile.tile_title);

  modal.resizable({
    minHeight: 530,
    minWidth: 730
  });
Tile.populateViewTileTemplate(modal,data);


  // tile_promise.success(function(data) {
  //   modal.resizable({
  //       minHeight: 530,
  //       minWidth: 730
  //     });
  //   Tile.populateViewTileTemplate(modal,data);
  // });
  modal.find('.save').on("click", function() {
    $(this).parents(".modal").remove();
    Tile.editTile(tile);
  });
},
populateViewTileTemplate: function(tile,tile_data) {
  

  var tile_color_box = $(tile).find('.view_tile_color_box');
  var tile_title = $(tile).find('.view_tile_tile_title');
  var tile_content = $(tile).find('.view_tile_tile_content');
  var tile_tags = $(tile).find('.view_tile_tile_tags');
  var tile_used_on_grids = $(tile).find('.view_tile_used_on_grids_list');
  var tile_shared_with = $(tile).find('.view_tile_shared_with_list');
  var tile_annotations_ul = $(tile).find('.view_tile_annotations_list');
  var tile_date = $(tile).find('.date');
  var tile_video = $(tile).find('.view_tile_video');

  tile_color_box.css("background-color",tile_data.tile_color);
  tile_title.html(tile_data.tile_title);
  tile_content.html(tile_data.tile_content);
  tile_video.html(tile_data.tile_video);
  if (tile_data.tile_modified) {
    tile_date.html(tile_data.tile_modified);
  }
  else{
    tile_date.html(tile_data.tile_created);
  }

  if(!tile_data.tile_tags)
  {
    tile_tags.html('None');
  }
  else
  {
    tile_tags.html(tile_data.tile_tags);
  }
  if(tile_data.tile_grids.length < 1)
  {
    tile_used_on_grids.html('None');
  }
  $.each(tile_data.tile_grids, function(index,value) {
    var title = $("<a href='#'>"+value.grid_title+"</a>").on("click", function() {
      Grid.loadGrid(value);
    });
    tile_used_on_grids.append(title);
    if(index != (tile_data.tile_grids.length - 1))
    {
      tile_used_on_grids.append(', ');
    }
  });


  if(!tile_data.tile_share)
  {
    tile_shared_with.html('None');
  }

  $.each(tile_data.tile_share, function(index,value) {
    tile_shared_with.append(value.sharing_email);
    if(index != tile_data.tile_share.length - 1)
    {
      tile_shared_with.append(', ');
    }
  });

  if(tile_data.tile_source_anno)
  {  
    $.each(tile_data.tile_source_anno, function(index,value) {




  //this is where we want to append our li elements
  var annotation = value;
  var annotation_link = $("<a href='#'>"+annotation.source_title+" / "+annotation.source_page+" / "+annotation.source_author+"</a>");
  var cutout = $('<img>'); //Equivalent: $(document.createElement('img'))
  cutout.attr('src', annotation.cutout);

  var annotation_container = $('<div/>');

  annotation_container.append(annotation_link,cutout);



  annotation_container.on("click", function() {
      //Source.page_num = annotation.source_page;
      if(annotation.source_page == 0) annotation.source_page = 1;
      Source.viewSource(annotation.source_id,annotation.source_page);
    });


  tile_annotations_ul.append(annotation_container);
  // cutout.appendTo(tile_annotations_ul);

});
  }
  tile.resizable({
        minHeight: 530,
        minWidth: 730
      });
},

//TODO make this call update tile location function that doesnt exist yet 

moveExistingTiles: function(positions,tile) {


  var rendered_tiles = [];
  $.each(positions, function(index,position) {

    var position_as_array = position.split(",");
    var x = parseInt(position_as_array[0]);
    var y = position_as_array[1];

    for(var i = x; i >= 1; i--)
    {

      var position_to_check = i+","+y;
      var rendered_tile = $(".grid input[value='"+position_to_check+"'].tile_position").parents(".tile, .header");

      if(rendered_tile.length > 0)
      {

        var conflict_tile_id = rendered_tile.find(".template_header_id").val();
        var dropped_tile_id = tile.find(".template_header_id").val();

        if((conflict_tile_id && dropped_tile_id) && conflict_tile_id.length > 0 && dropped_tile_id.length > 0 && conflict_tile_id === dropped_tile_id)
        {

        }
        else
        {
          var rendered_tile_position = $(rendered_tile).find(".tile_position").val().split(",");

          if((parseInt(rendered_tile_position[0]) + Tile.getColumnSpan(rendered_tile) - 1) >= x)
          {
            Tile.moveTileDown(rendered_tile);
          }
        }





      }
    }

  });

if(rendered_tiles.length > 0)
{
  return rendered_tiles;
}
else 
{
  return false;
}

},

getColumnSpan: function(tile) {
  return Math.floor(tile.outerWidth() / 205);
},

moveTileDown: function(tile,ignore_existing) {
  //fixes a bug causing us to lose resizing ability after a tile is moved
  if(tile.hasClass("header"))
  {
    tile.resizable("destroy");
  }
  var new_tile = tile.clone();
  
  tile.remove();
  var existing_tile_coords = new_tile.find(".tile_position").val();
  var split_coords = existing_tile_coords.split(",");
  split_coords[1] = parseInt(split_coords[1]) + 1;

  new_tile.find(".tile_prev_position").val(new_tile.find(".tile_position").val());
  new_tile.find(".tile_position").val(split_coords[0]+","+split_coords[1]);

  new_tile.find(".template_header_x").val(split_coords[0]);
  new_tile.find(".template_header_y").val(split_coords[1]);


  var tile_position = Grid.getPositionByCoordinates(new_tile.find(".tile_position").val());
  new_tile.css({"left":tile_position.x,"top":tile_position.y});

  
  if(tile.hasClass("header"))
  {
    Template.saveHeader(new_tile,"default",ignore_existing);
  }
  else
  {
    this.save(new_tile,ignore_existing);
  }

},

moveTileUp: function(tile,ignore_existing) {
  //fixes a bug causing us to lose resizing ability after a tile is moved
  if(tile.hasClass("header"))
  {
    tile.resizable("destroy");
  }
  var new_tile = tile.clone();
  
  tile.remove();
  var existing_tile_coords = new_tile.find(".tile_position").val();
  var split_coords = existing_tile_coords.split(",");
  split_coords[1] = parseInt(split_coords[1]) - 1;

  new_tile.find(".tile_prev_position").val(new_tile.find(".tile_position").val());
  new_tile.find(".tile_position").val(split_coords[0]+","+split_coords[1]);

  new_tile.find(".template_header_x").val(split_coords[0]);
  new_tile.find(".template_header_y").val(split_coords[1]);


  var tile_position = Grid.getPositionByCoordinates(new_tile.find(".tile_position").val());
  new_tile.css({"left":tile_position.x,"top":tile_position.y});

  
  if(tile.hasClass("header"))
  {
    Template.saveHeader(new_tile,"default",ignore_existing);
  }
  else
  {
    this.save(new_tile,ignore_existing);
  }

},

moveTileRight: function(tile) {
  //fixes a bug causing us to lose resizing ability after a tile is moved
  if(tile.hasClass("header"))
  {
    tile.resizable("destroy");
  }
  var new_tile = tile.clone();
  
  tile.remove();
  var existing_tile_coords = new_tile.find(".tile_position").val();
  var split_coords = existing_tile_coords.split(",");
  split_coords[0] = parseInt(split_coords[0]) + 1;

  new_tile.find(".tile_prev_position").val(new_tile.find(".tile_position").val());
  new_tile.find(".tile_position").val(split_coords[0]+","+split_coords[1]);

  new_tile.find(".template_header_x").val(split_coords[0]);
  new_tile.find(".template_header_y").val(split_coords[1]);


  var tile_position = Grid.getPositionByCoordinates(new_tile.find(".tile_position").val());
  new_tile.css({"left":tile_position.x,"top":tile_position.y});

  
  if(tile.hasClass("header"))
  {
    Template.saveHeader(new_tile,"default",true);
  }
  else
  {
    this.save(new_tile,true);
  }

},

moveTileLeft: function(tile) {
  //fixes a bug causing us to lose resizing ability after a tile is moved
  if(tile.hasClass("header"))
  {
    tile.resizable("destroy");
  }
  var new_tile = tile.clone();
  
  tile.remove();
  var existing_tile_coords = new_tile.find(".tile_position").val();
  var split_coords = existing_tile_coords.split(",");
  split_coords[0] = parseInt(split_coords[0]) - 1;

  new_tile.find(".tile_prev_position").val(new_tile.find(".tile_position").val());
  new_tile.find(".tile_position").val(split_coords[0]+","+split_coords[1]);

  new_tile.find(".template_header_x").val(split_coords[0]);
  new_tile.find(".template_header_y").val(split_coords[1]);


  var tile_position = Grid.getPositionByCoordinates(new_tile.find(".tile_position").val());
  new_tile.css({"left":tile_position.x,"top":tile_position.y});

  
  if(tile.hasClass("header"))
  {
    Template.saveHeader(new_tile,"default",true);
  }
  else
  {
    this.save(new_tile,true);
  }

},
//saves new tile location 
save: function(tile,ignore_existing)
{
  var tile_as_obj = Tile.getObjByRenderedTile(tile);

  

  if(ignore_existing !== true)
  {
    this.moveExistingTiles([tile_as_obj.tile_position],tile);
  }

  tile.removeClass("ui-draggable-dragging");



  $(".grid").append(tile);
  this.makeDraggable(tile);

  if (tile_as_obj.location_id == '') {
    tile_as_obj.tile_type = 'tile';
    Tile.saveGridTile(tile_as_obj,tile);


  }else{
    Tile.moveTile(tile_as_obj);
  }




},
//saves new tile location 
moveTile: async function(tile){
  var coordinates = Tile.getGridCoordinates(tile.tile_position);

  if (tile.width == '' || typeof tile.width == 'undefined') {
      tile.width = 1;
    }
    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);
  return $.ajax({
    type: "POST",
    url: '/tile/moveGridTile',
    headers :apiRequestHeader,
    data: {
      grid_tile_id:tile.grid_tile_id,
      location_id:tile.location_id,
      update:{
        x:coordinates.x,
        y:coordinates.y,
        width:tile.width
      }

    },
    success: function(data) 
    {
        console.log('send', 'event', 'Tiles', 'move grid tile', tile.tile_title, tile.grid_tile_id);

    },
    dataType: 'json'
  });

},

  saveTile: async function(tile_html) {
      var tile = Tile.getTileDomInfo(tile_html);
      tile.tile_type = 'tile';
      console.log('get tile CSRF',CSRF);
      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);
      return $.ajax({
        type: "POST",
        url: '/tile/saveTile',
        headers :apiRequestHeader,
        data: {
          tile:{
            tile_title:tile.tile_title,
            tile_content:tile.tile_content,
            tile_video:tile.tile_video,
            tile_tags:tile.tile_tags,
            tile_color:tile.tile_color,
            project_id: tile.project_id,
            tile_type: tile.tile_type,
            tile_place_on_grid:tile.tile_place_on_grid,
            annotations:tile.annotations
          }

        },
        success: function(result){
          console.log('send', 'event', 'Tiles', 'save', result.tile_title, result.tile_id);
          Pile.reloadPile();
          Source.reloadSourceAnnotations();
          Grid.reloadGrid();
        },
        dataType: 'json'
      });

    },
  saveGridTile: async function(tile,tile_html,reload_grid) {
    
    var grid_tile = {};
    var location = {};
    var grid_tile = {};
    var grid_coordinates =  tile.tile_position.split(',');
    if (grid_coordinates.length == 2) {
        // grid tile info
        grid_tile.tile_id = tile.tile_id; // TODO: need to check if set in backend. if not create tile
        grid_tile.grid_id = tile.tile_grid_id;
        //location info 
        location.x = grid_coordinates[0];
        location.y = grid_coordinates[1];
        location.length = 1;
        if (typeof tile.width !== 'undefined') {
           location.width = tile.width;
        }
        else{
           location.width = 1;
        }
       
        grid_tile.location = location;


      }

        var annotations = [];//tile.annotations;
        console.log('get tile CSRF',CSRF);
          var csrf = await CSRF.token();
          var apiRequestHeader = {
              'X-CSRF-Token':csrf._csrf,
              // 'cookie':cookie
          };
          console.log('csrf',csrf);

      return $.ajax({
        type: "POST",
        url: '/tile/addGridTile',
        headers :apiRequestHeader,
        data: {
          tile:{
            tile_title:tile.tile_title,
            tile_content:tile.tile_content,
            tile_video:tile.tile_video,
            tile_tags:tile.tile_tags,
            tile_color:tile.tile_color,
            project_id: tile.project_id,
            tile_type: tile.tile_type,
            tile_place_on_grid: tile_html.find('.tile_modal_send_to_grid').val(),
            annotations:annotations
          },
          grid_tile:grid_tile

        },
        success: function(result){
          $(tile_html).find('.location_id').val(result.location_id);
          $(tile_html).find('.grid_tile_id').val(result.grid_tile_id);
          if (tile.tile_type == 'header') {
            $(tile_html).find('.template_header_id').val(result.tile_id);
          }

          if(reload_grid === true)
          {
           Grid.reloadGrid();
           Pile.reloadPile();

          }
          console.log('send', 'event', 'Tiles', 'save grid tile', tile.tile_title, result.grid_tile_id);


        },
        dataType: 'json'
      });

    },
    createGridTile: function(tile_html,reload_grid) {
      if(typeof reload_grid === "undefined" || !reload_grid || reload_grid !== true)
      {
        reload_grid = false;
      }
      var tile = Tile.getTileDomInfo(tile_html);
      tile.tile_type = 'tile';
      return Tile.saveGridTile(tile,tile_html,reload_grid);
    },
    
    updateTile: async function(tile_html) {

      var csrf = await CSRF.token();
      var apiRequestHeader = {
          'X-CSRF-Token':csrf._csrf,
          // 'cookie':cookie
      };
      console.log('csrf',csrf);

      var tile = Tile.getTileDomInfo(tile_html);
      return $.ajax({
        type: "POST",
        url: '/tile/update',
        headers :apiRequestHeader,
        data: {
          update:{
            tile_title:tile.tile_title,
            tile_content:tile.tile_content,
            tile_video:tile.tile_video,
            tile_tags:tile.tile_tags,
            tile_color:tile.tile_color,
            annotations:tile.annotations,
            annotation_ids:tile.annotation_ids,
          },
          tile_id:tile.tile_id,
          tile_place_on_grid:tile.tile_place_on_grid

        },
        success: function(result){
          Grid.reloadGrid();
          Pile.reloadPile();
          Source.reloadSourceAnnotations();
          console.log('send', 'event', 'Tiles', 'update', result.tile_title, result.grid_tile_id);

        },
        dataType:'json'
      });
    },



// getTileSourceAnnotations: function(tile) {

// return;

// },

getTileDomInfo: function(tile_html) {

  reload_source_annotations = true;
  var tile = {};
  tile.tile_color = tile_html.find('.tileColorInput').val();
  tile.tile_content = tile_html.find('.tile_modal_content').val();
  tile.tile_video = tile_html.find('.tile_modal_video').val();
  tile.tile_grid_id = tile_html.find('.new_tile_grid_id').val();
  tile.tile_id = tile_html.find('.tile_id').val();
  tile.tile_position = tile_html.find('.new_tile_position').val();
  tile.tile_share = tile_html.find('.tile_share').val();
  tile.tile_source = tile_html.find('.new_tile_source_id').val();
  tile.tile_tags = tile_html.find('.tile_modal_tags').val();
  tile.tile_title = tile_html.find('.tile_modal_title').val();
  tile.tile_place_on_grid = tile_html.find('.tile_modal_send_to_grid').val();
  tile.project_id = tile_html.find('.tile_modal_project_id').val();
  
  tile.annotations = [];
  tile.annotation_ids = [];
  
  tile_html.find('.coordContainer').each(function() {
        var annotation = {};
        annotation.source_id = User.data.active_source_id;
        annotation.focus_width = $(this).find('.focus_width').val();
        annotation.anchor_left = $(this).find('.source_anchor_position_left').val();
        annotation.anchor_top = $(this).find('.source_anchor_position_top').val();
        annotation.focus_top = $(this).find('.source_focus_position_top').val();
        annotation.source_page = $(this).find('.source_page').val();
        annotation.source_text = $(this).find('.source_text').val();
        annotation.focus_height = $(this).find('.focus_height').val();
        annotation.type = $(this).find('.type').val();

        annotation.c_x = $(this).find(".c_x").val();
        annotation.c_y = $(this).find(".c_y").val();
        annotation.c_x2 = $(this).find(".c_x2").val();
        annotation.c_y2 = $(this).find(".c_y2").val();
        annotation.c_w = $(this).find(".c_w").val();
        annotation.c_h = $(this).find(".c_h").val();
        annotation.bounds_0 = $(this).find(".bounds_0").val();
        annotation.bounds_1 = $(this).find(".bounds_1").val();
        if (annotation.source_page == 0) {
          annotation.cutout =  $('.source_page_1 .sourcePageImage').attr("src");
        }
        tile.annotations.push(annotation);

  });
  tile_html.find('.annotation_id').each(function() {
        var annotation_id = $(this).val();
        tile.annotation_ids.push(annotation_id);
  });
  

  return tile;
},
getGridCoordinates: async function(tile_position) {

  var position_array = tile_position.split(",");
  var x = position_array[0] ;
  var y = position_array[1]; 
  return {x,y};
},

  //combine this into savetile later
  viewSourceSaveTile: async function(tile,reload_pile,reload_grid,reload_source_annotations) {

    reload_source_annotations = true;

    var tile_active = 1;
    var tile_color = tile.find('.tileColorInput').val();
    var tile_content = tile.find('.tile_modal_content').val();
    var tile_video = tile.find('.tile_modal_video').val();
    var tile_grid_id = tile.find('.new_tile_grid_id').val();
    var tile_id = tile.find('.tile_id').val();
    var tile_position = tile.find('.new_tile_position').val();
    var tile_share = tile.find('.tile_share').val();
    var tile_source = tile.find('.new_tile_source_id').val();
    var tile_tags = tile.find('.tile_modal_tags').val();
    var tile_title = tile.find('.tile_modal_title').val();
    var tile_place_on_grid = tile.find('.tile_modal_send_to_grid').val();
    var project_id = tile.find('.tile_modal_project_id').val();



    ///THIS NEEDS TO CHANGE
    var my_source_annotations = global_tiles[tile_id];

    console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);

 $.ajax({
  type: "POST",
  url: '/tile/saveTileAndSource',
  headers :apiRequestHeader,
  data: {

   tile:{tile_id:tile_id,tile_grid_id:tile_grid_id,tile_title:tile_title,tile_content:tile_content,tile_video:tile_video,tile_tags:tile_tags,tile_color:tile_color,tile_source:tile_source,tile_position:tile_position,tile_active:tile_active,tile_share:tile_share,tile_place_on_grid:tile_place_on_grid,tile_project_id:project_id},

   tile_source_annotations:my_source_annotations
 },
 success: function(data) 
 {

        //close this tile
        tile.remove();

        //reload pile and/or grid
        if(reload_pile === true)
        {
          Pile.reloadPile();
        }
        if(reload_grid === true)
        {
          Grid.reloadGrid(data);
        }
        if(reload_source_annotations === true)
        {
          Source.reloadSourceAnnotations();
          Grid.reloadGrid();
        }


      },
      dataType: 'json'
    });

},

placeOnGrid: async function(tiles,grid_id) {
  var tile_ids = new Array();

  $.each(tiles, function(index, value) {
    var grid_tile = Tile.getObjByRenderedTile($(value));
    tile_ids.push(grid_tile.tile_id); //we are using TILE here not GRID_TILE!
  });
  console.log('send', 'event', 'Tiles', 'place on grid', "Placed tiles on grid", grid_id);
  console.log('get tile CSRF',CSRF);
    var csrf = await CSRF.token();
    var apiRequestHeader = {
      'X-CSRF-Token':csrf._csrf,
        // 'cookie':cookie
    };
    console.log('csrf',csrf);
  $.ajax({
    type: "POST",
    url: '/tile/placeTileOnGrid',
    headers :apiRequestHeader,
    data: {
      grid_id:grid_id,
      tile_ids:tile_ids
    },
    success: function(tile_data) 
    {
        //if the tile was placed on the active grid display it
        if(Grid.getActiveGridID() == grid_id)
        {
          Grid.loadFloatingTiles(tile_data.floating_tiles);

        }

      },
      dataType: 'json'
    });

},

updatePlaceOnGridSelect: function()
{
  
 $('.tile_modal_send_to_grid').each(function() {
    var default_cnt = $(this).find(".default").length;
    if (default_cnt == 0) 
      $(this).append("<option class='default'>None (default)</option>");
  });


 // $(".list_item_grid_id").html('');
  
  $("#grid_list > div").each(function(index,val) {
    var grid_id = val.id.split('_')[1];
    var working_copy = $(val).find(".listItemTitle").clone();
    working_copy.find(".list_item_grid_id").remove();
    var grid_name = working_copy.html();
    var selected = '';
    if (User.data.place_on_grid) {
        new_grid_id = User.data.new_grid.grid_id;
        if (grid_id == new_grid_id) {
          selected = "selected='selected'";
        }
    };

//    $(".tile_modal_send_to_grid").append("<option "+selected+"value='"+grid_id+"'>"+grid_name+"</option>");
    $(".tile_modal_send_to_grid").each(function() {
        var grid_selector = 'option[value="'+grid_id+'"]';
        var grid_cnt = $(this).find(grid_selector).length;
        if (grid_cnt>0) {
          $(grid_selector).each(function() {
            if(this.selected)
                selected = "selected='selected'";

            $(this).parent().append("<option "+selected+"value='"+grid_id+"'>"+grid_name+"</option>");

            $(this).remove();

          });

        }else{
            $(this).append("<option "+selected+"value='"+grid_id+"'>"+grid_name+"</option>");
        }

    });
    
    
    
  });

},


};
*/