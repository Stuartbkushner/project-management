PublicView = {

init: function(id) {

	//loadgrid
	this.getGrid(id);

},


//this function should be modified so that "getGrid" also sets the active grid
//check if the getGrid call is fired on application launch
getGrid: function(grid_id) {

      $.ajax({
      type: "POST",
      url: '/action?action=getGrid',
      data: {
        grid_id: grid_id
      },
      success: function(data) 
      {
        PublicView.loadGrid(data);
      },
      dataType: 'json'
      });
},


loadGrid: function(grid) {

  //empty our current grid
  $("#grid").empty();
  $("#grid_title").empty();


  //generate a grid based on grid_size
  //TODO need to new set 
  grid.grid_size = "8,8";
  this.generateGrid(grid.grid_size);

  //display the grid title
  $("#grid_title").html(grid.grid_title);

  //populate the grid with tiles
  this.populateGrid(grid.tiles);

  if(grid.grid_decision && grid.grid_decision != "")
  {
    
    $("#grid_decision").html(grid.grid_decision);
    $(".decisionDisplayContainer").html(grid.grid_decision);
    $("#grid_decision").on("click", function() {
      $(".decisionDisplayContainer").toggle();
    });
  }
  else
  {
    $("#grid_decision").empty();
    $(".decisionDisplayContainer").empty();
  }
  //deselect tiles when empty tile clicked
  $('.cell').on("dblclick", function(evt) {

    $( ".selectedTile" ).each(function() {
      $( this ).removeClass( "selectedTile" );
    });

  });


},

populateGrid: function(tiles) {

  $.each(tiles, function(key, tile) {
     if(tile.tile_type != "header")
    {
      var rendered_tile = Tile.renderTile(tile);
    }
    else{
      var rendered_tile = Template.renderHeaderForGrid(tile);
      $( rendered_tile ).resizable( "destroy" );
      $( rendered_tile ).draggable( "destroy" );

    }
    
    //where does this tile go? assemble the id of the grid drop
    
    var tile_position = [tile.x,tile.y];
    var grid_drop = "column_"+tile_position[0]+"_row_"+tile_position[1];

    $("#"+grid_drop).append(rendered_tile);
      
  });

},
generateGrid: function(grid_size) {

  var cols_rows = grid_size.split(",");

  var grid_columns = cols_rows[0];
  var grid_rows = cols_rows[1];

  this.addColumns(grid_columns);
  this.addRows(grid_rows);

},

addColumns: function(num) {
  //get the number of columns
  var column_count = this.countColumns();
  var total_columns = $('.column').length + parseInt(num);

  //add a column
  for(var i = column_count; i < total_columns; i++) {

    var column = $('<ul/>', {
    class: 'column',
    id: "column_"+(i+1)
    });
    $('#grid').append(column);

  }

  //set #grid's width based on how many columns we have
  var column_width = $(".column").width() + parseInt($(".column").css("border-right-width"));
  $("#grid").width(column_width * total_columns);


},

addRows: function(num) {

//for every column in our grid, add some rows
$(".column").each(function(){

var row_count = PublicView.countRows(this);

  for(var i = 0; i < num; i++) {
    var row = $('<li/>', {
    class: 'cell',
    id: $(this).attr("id") + "_row_" + (i+1)
    });
    $(this).append(row);
  }

});

},

countRows: function(column) {
  return $(column).length;
},

countColumns: function() {
  return $('.column').length;
},

bindUIActions: function() {

// $("#new_project_btn").on("click", function(){
// 	Grid.showNewProjectModal();
// });
	

},
renderTile: function(tile){
    
  Date.prototype.prettyDate = function() {
    return (this.getMonth()+1)+"/"+this.getDate()+"/"+this.getFullYear();
  }


    var tile_div = $('<div class="tile draggable"></div>').css({'background':tile.tile_color});

if(tile.tile_group.group_id > 0)
{ 
  
  var strip_tile_desc = tile.tile_group.group_description.replace(/<\/?[^>]+(>|$)/g, "");
  var tile_div = $('<div class="tile draggable" data-container="body" data-content="'+strip_tile_desc+'" data-original-title="'+tile.tile_group.group_name+'"></div>').css({'background':tile.tile_color});
  
  // $(tile_div).popover({'trigger':'hover','delay':{'show':1000}});
  
    var group_color = $('<input/>', {
    type: 'hidden',
    class: 'group_color',
    value: tile.tile_group.group_color
    //id: 'tile_' + tile.tile_id
    });

    var group_description = $('<input/>', {
    type: 'hidden',
    class: 'group_description',
    value: tile.tile_group.group_description
    //id: 'tile_' + tile.tile_id
    });

    var group_grid_id = $('<input/>', {
    type: 'hidden',
    class: 'group_grid_id',
    value: tile.tile_group.group_grid_id
    //id: 'tile_' + tile.tile_id
    });

    var group_id = $('<input/>', {
    type: 'hidden',
    class: 'group_id',
    value: tile.tile_group.group_id
    //id: 'tile_' + tile.tile_id
    });

    var group_name = $('<input/>', {
    type: 'hidden',
    class: 'group_name',
    value: tile.tile_group.group_name
    //id: 'tile_' + tile.tile_id
    });

    var group_border = $('<input/>', {
        type: 'hidden',
        class: 'group_border',
        value: tile.tile_group.group_border
        //id: 'tile_' + tile.tile_id
        });
    
    
    if(tile.tile_group.group_border == "1") 
    {
      tile_div.css({'border':'3px dashed #999'});
    }
    else if(tile.tile_group.group_border == "2")
    {
      tile_div.css({'border':'3px dotted #999'});
    }
    else if (tile.tile_group.group_border == "3")
    {
      tile_div.css({'border':'3px solid #999'});
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

    var tile_color = $('<input/>', {
    type: 'hidden',
    class: 'tile_color',
    value: tile.tile_color
    //id: 'tile_' + tile.tile_id
    });

    var tile_position = $('<input/>', {
    type: 'hidden',
    class: 'tile_position',
    value: tile.tile_position
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
    }).html(tile.tile_title_truncated);

    //tile_title.truncate({});

    var tile_date = $('<div/>', {
    class: 'tileDate',
    }).html((new Date(tile.tile_created)).prettyDate());


if(tile.tile_starred == true) {
    var tile_star = $('<div/>', {
    class: 'tileStar favorite clearBoth',
  title: 'Favorite'
  });
}
else {
  var tile_star = $('<div/>', {
    class: 'tileStar clearBoth',
  title: 'Favorite'
  });
}

    var tile_content = $('<div/>', {
    class: 'tileContent',
    }).html(tile.tile_content_truncated);
    
    //$(tile_content).truncate({multiline:true});

    var tile_tags = $('<div/>', {
    class: 'tileTags',
    }).html(tile.tile_tags);

    if(tile.tile_position == "0,0")
    {

      tile_div.css({'float':'left'});

      //attach "find tile on grid button" (when clones exist on grid)
      
        if(Tile.getClonesByTileID(tile.tile_id).length > 0)
        {
          var j = 0;
          var pile_find_tile = $('<div/>', {
          class: 'findTile',
      title: 'Find on Grid'
          }).on("click", function() {

            //deselect all currently selected tiles
             $(".selectedTile").removeClass("selectedTile");
            
            var tiles = Tile.getClonesByTileID(tile.tile_id);
              if(tiles[j]){
                $('#center_container').parent().scrollTo(tiles[j]);
                $(tiles[j]).addClass("selectedTile");
              }
              else
              {
                j = 0;
                $('#center_container').parent().scrollTo(tiles[j]);
                $(tiles[j]).addClass("selectedTile");
              }
               j++;
          });
        }
    }
    else
    {
      var pile_find_tile = "";



      //depending on our zoom, adjust the tile
      if($("#grid_zoom").find(":selected").val() == 2)
      {
        //we are zoomed out(mindmap mode)
          
          
        if($(tile_div).css('border-right-width') == "0px")
    {
      $(tile_div).width(82.5);
      $(tile_div).height(57.5);
    }
  else
    {
    $(tile_div).width(72.5);
      $(tile_div).height(47.5);
    }
          
          $("#pile .findTile").css({'top':0,'right':0,'height':10});
          
          tile_title.height(45);
          tile_date.hide();
          tile_content.hide();
          tile_star.hide();
          tile_tags.hide();

      }

    }

    tile_div.append(tile_title,tile_content,tile_tags,tile_id,tile_position,tile_prev_position,tile_grid_id,tile_color,pile_find_tile,tile_star,tile_date,group_color,group_description,group_grid_id,group_id,group_name,group_border);
    $(tile_div).on("click", function(evt) {
      evt.stopPropagation();
    });


    $(tile_div).on("dblclick touchstart", function(evt) {
      evt.stopPropagation();



  var tile = PublicView.getObjByRenderedTile($(evt.currentTarget));
  var tile_promise = PublicView.getTile(tile.tile_id);

          var tile = $('<div/>', {
      html: PublicView.loadTemplate('view_tile_template')
  }).on("click", function() {
  PublicView.focusTile(this);

  }).addClass('customModal').addClass('tileView');


  tile_promise.success(function(data) {
    PublicView.populateViewTileTemplate(tile,data);
  });


      tile.appendTo('body');
      PublicView.focusTile(tile);

    tile.draggable({
    start: function() {
      PublicView.focusTile(this);
    }

  });

    var position = new Array(10,10);
    PublicView.setTilePosition(tile,position);

    tile.find('.close').on("click", function() {
      tile.remove();
    });

    });

    return tile_div;

  },



setTilePosition: function(tile,position) {
    //this function sets static values, settileposition calls need to be removed



    var left = parseInt($("#view_source_modal").css("left"))+parseInt($("#view_source_modal").css("margin-left")) + parseInt($("#view_source_modal").width());


    tile.css({top: 83, left: left - 150});
  },



  getObjByRenderedTile: function(rendered_tile) {
    var new_tile = {
      tile_color:rendered_tile.children(".tile_color").val(),
      tile_id: rendered_tile.children(".tile_id").val(),
      tile_position:rendered_tile.children(".tile_position").val(),
      tile_prev_position:rendered_tile.children(".tile_prev_position").val(),
      tile_title_truncated:rendered_tile.children(".tileTitle").html(),
      tile_content_truncated:rendered_tile.children(".tileContent").html(),
      tile_tags:rendered_tile.children(".tileTags").html(),
      tile_grid_id:rendered_tile.children(".tile_grid_id").val(),
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




  getTile: function(tile_id)
  {

 return $.ajax({
          type: "POST",
          url: '/action?action=getTile',
          data: {
                tile_id:tile_id

                },
          success: function(data) {

          },
          dataType: 'json'
        });




  },

  loadTemplate: function(template)
  {
    return $("#"+template).children().clone();
  },


    focusTile: function(tile) {
  //find the current focus tile
  var focus_tile = PublicView.getFocusTile();

  if(!focus_tile)
  return;

  var focus_tile_zindex = focus_tile.css('zIndex');
  $(tile).css('zIndex', parseFloat(focus_tile_zindex) + 1);

  },

  getFocusTile: function()
  {
    var currently_shown_tiles = $('.tileView');
    var zindex_array = new Array();
    var zIndex = 0;
    var tile;
    $.each(currently_shown_tiles, function(index,value) {
      if($(value).css('zIndex') > zIndex)
      {
        zIndex = $(value).css('zIndex');
        tile = $(value);
      }
    });
    return tile;
  },





  populateViewTileTemplate: function(tile,tile_data) {
    tile.resizable({
        minHeight: 530,
        minWidth: 730
      });
var tile_color_box = $(tile).find('.view_tile_color_box');
var tile_title = $(tile).find('.view_tile_tile_title');
var tile_content = $(tile).find('.view_tile_tile_content');
var tile_tags = $(tile).find('.view_tile_tile_tags');
var tile_used_on_grids = $(tile).find('.view_tile_used_on_grids_list');
var tile_shared_with = $(tile).find('.view_tile_shared_with_list');
var tile_annotations_ul = $(tile).find('.view_tile_annotations_list');

tile_color_box.css("background-color",tile_data.tile_color);
tile_title.html(tile_data.tile_title_truncated);
tile_content.html(tile_data.tile_content);

if(!tile_data.tile_tags)
{
  tile_tags.html('None');
}
else
{
  tile_tags.html(tile_data.tile_tags);
}

if(!tile_data.tile_grids)
{
  tile_used_on_grids.html('None');
}
$.each(tile_data.tile_grids, function(index,value) {
  tile_used_on_grids.append(value.grid_title);
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

$.each(tile_data.tile_source_anno, function(index,value) {
//this is where we want to append our li elements
//tile_annotations_ul

              var anno_element = $("<li/>", {
                class: "selectedTextContainer"
              }).html(value.source_text).on("click",function(){

                //if we're currently viewing the source document this annotation belongs to, go to the page it's on
                if($("#view_source_modal").is(":visible") && $("#view_source_source_id").val() == value.source_id)
                {
                  pageNum = value.source_page;
                  global_pdf.then(renderPdf);
                }
                //if we're not viewing a source document, open it
                else if($("#view_source_modal").is(":hidden"))
                {
                  pageNum = value.source_page;
                  Source.viewSource(value.source_id);
                }
                //we are on a different source doc - close it and open the proper one
                else if($("#view_source_modal").is(":visible") && $("#view_source_source_id").val() != value.source_id)
                {
                  pageNum = value.source_page;
                  Source.viewSource(value.source_id);
                }

              });
                //add the selected text (annotation) to the tile we clicked the "capture" button on
                anno_element.appendTo(tile_annotations_ul);
});

},





};

