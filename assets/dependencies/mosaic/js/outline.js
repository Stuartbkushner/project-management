
Outline = {

  init: function() {

    //load our outlines
    // var outlines = Outline.getOutlinesList();

    
    //bind all our actions
    // this.bindUIActions();

  },

  loadOutlines: function(outlines) {
  Navigation.populateOutlinesList(outlines);
  Navigation.updateFrames();

  },
  getOutlinesWithVersions: function() {

  //return User.data.projects;
  var outline_array = new Array();
  $.each(User.data.outlines, function(index,outline) {
    outline_array.push({
      "id":outline.tile_group_id,
      "ver":outline.tile_group_version
    });
  });

  return outline_array;

},

  renderOutlineAsListItem: function(outline)
  {


  var container_div = $("<div/>", {class:"listItem",id:"outline_"+outline.tile_group_id});
  var title_container_div = $("<div/>", {class:"listItemTitle unselectable"}).html(outline.tile_group_title).on("click", function() {

    // $(".listItem.active").removeClass("active");
    // $(this).parent().addClass("active");
    Outline.viewFlattenedOutline(outline);



  });

  var items = {
                //   "edit": {
                //       name: "Edit", 
                //       callback: function(key, options) {
                // //Project.editProject(project,container_div);
                //       }
                //       },

                    "edit": {
                      name: "Edit",
                      callback: function(key, options) {
                        Outline.viewOutline(outline.tile_group_id);
                      }
                    },
                  "delete": {
                      name: "Delete", 
                      callback: function(key, options) {
                        if (confirm("Are you sure you want to delete this outline?")) {

                          $.when(Outline.deleteOutline(outline.tile_group_id)).done(function(data) {
                            container_div.remove();
                            Navigation.updateFrames();
                          });

                        }
                      }
                    }
  };

  var gear_icon = gearMenu(items);
  container_div.prepend(title_container_div,gear_icon);

  return container_div;
  },

newOutline: function() {
  Outline.populateOutlineModal({});
},



  // getOutlinesList: function() {
  //     $.post('/action?action=getOutlinesList',{}, function(outlines) {
  //       Outline.populateOutlinesList(outlines);
  //     });
  // },

  getOutline: function(group_id)
  {
    //ajax call to get a single outline, completely, including tiles
      return $.post('/action?action=getGroup',{tile_group_id:group_id});

/*
    if(outline_id == 1)
    {
      var complete_outline = 
      {
        outline_id:1, outline_title:"first outline title", 
        outline_tiles:
        [
          {
            tile_id:1,tile_title:"tile title",tile_content:"this is the tile content",tile_source_anno:[{source_id:718,source_page:1,source_text:"annotationTEST"},{source_id:11,source_page:752,source_text:"annotation2"}]
          },
          {
            tile_id:2,tile_title:"tile title 2",tile_content:"this is the tile content",tile_source_anno:[{source_id:115,source_page:214,source_text:"annotation1"},{source_id:175,source_page:7352,source_text:"annotation2"}]
          },
          {
            tile_id:3,tile_title:"tile title 3",tile_content:"this is the tile content",tile_source_anno:[{source_id:1161,source_page:712,source_text:"annotation1"},{source_id:11457,source_page:2753,source_text:"annotation2"}]
          }
        ]
      }
    }
    else
    {
      var complete_outline = 
      {
        outline_id:2, outline_title:"second outline title", 
        outline_tiles:
        [
          {
            tile_id:1,tile_title:"tile title",tile_content:"this is the tile content",tile_source_anno:[{source_id:1147,source_page:2175,source_text:"annotation1"},{source_id:117,source_page:217,source_text:"annotation2"}]
          },
          {
            tile_id:1,tile_title:"tile title",tile_content:"this is the tile content",tile_source_anno:[{source_id:11457,source_page:2145,source_text:"annotation1"},{source_id:157,source_page:217,source_text:"annotation2"}]
          },
          {
            tile_id:1,tile_title:"tile title",tile_content:"this is the tile content",tile_source_anno:[{source_id:171,source_page:1772,source_text:"annotation1"},{source_id:117,source_page:2157,source_text:"annotation2"}]
          }
        ]
      }
    }
    

    return complete_outline;
    */
  },



  render:function(outline)
  {
    return $("<div class='widgetListItemContainer'><div class='widgetListItem'><a href='#'' title='"+outline.outline_title+"'>"+outline.outline_title+"</a></div><div class='widgetListItemActions'><div class='iconDelete' title='Delete Outline'></div></div></div>");
  },

  convertOutlineHTMLToArray: function(html)
  {

    var outline_id = html.find(".outlineID").val();
    var outline_title = html.find(".outlineTitle").val();

    var outline_tiles = [];
    $.each(html.find(".outlineTile"), function() {
      var group_tile = {};
      group_tile.tile_id = $(this).find(".outlineTileTileID").val();
      outline_tiles.push(group_tile);
    });

    var outline = 
    {
      tile_group_id:outline_id,
      tile_group_title:outline_title,
      tiles:outline_tiles,
      tile_group_type:'outline',
      project_id: User.data.settings.current_project_id
    };
    
    return outline;
  },

  saveOutline: function(outline)
  {
      return $.post('/action?action=saveOutline', {outline:outline}, function(outlines) {
        //Navigation.populateOutlinesList(outlines);
        //Navigation.updateFrames();
      });
  },


  deleteOutline: function(outline_id)
  {
    $.post('/action?action=deleteOutline', {outline_id:outline_id}, function(outlines) {

    });
  },

  viewOutline: function(outline_id)
  {
    //here we call getOutline, to get all of the outline's data
    var complete_outline_promise = Outline.getOutline(outline_id);
    
    complete_outline_promise.success(function(data) {
          data = JSON.parse(data);
          var complete_outline = data;
          Outline.populateOutlineModal(complete_outline);
    });

  },

  populateOutlineModal: function(outline)
  {



    $(".outlineModal").filter(":visible").remove();
      var outline_modal = $("#outline_modal").mj_modal();
      outline_modal.resizable({
            minHeight: 460,
            maxHeight: 800,
            minWidth: 360,
            maxWidth: 360
          });
      outline_modal.find(".outlineContainer").sortable({
        update: function()
        {
          
        },
        stop: function(event, ui)
        {
          
          //if we're dropping a tile into the outline from the grid, we need to convert it to look like an outline
          if(ui.item.hasClass('tile'))
          {
            var tile_obj = Tile.getObjByRenderedTile(ui.item);
            var promise = Tile.getTile(tile_obj.tile_id);

            promise.success(function(data) {
              //we have our complete tile data
              var complete_tile_object = data;
              var tile_as_outline_html = Outline.convertOutlineTileObjectToHTML(complete_tile_object);
              tile_as_outline_html.find(".outlineTileDelBtn").on("click", function() {
                $(this).parent().remove();
              });


              ui.item.replaceWith(tile_as_outline_html);
             });
          }
        },
        over: function(event, ui)
        {
          $(".grid").droppable('disable');
        },
        out: function(event, ui) {
                setTimeout(function () {
                    $(ui.helper).removeClass("ui-sortable-helper")
                }, 1);
        $(".grid").droppable('enable');
        }
      });



var outline_container = outline_modal.find(".outlineContainer");

$( ".tile" ).draggable( "option", "connectToSortable", outline_container );


    outline_modal.find('.outlineID').val(outline.tile_group_id);
    outline_modal.find('.outlineTitle').val(outline.tile_group_title);

    outline_modal.find(".save").on("click", function() {
      var outline_to_save = Outline.convertOutlineHTMLToArray(outline_modal);


    $.when(Outline.saveOutline(outline_to_save)).done(function(data) {
            data = JSON.parse(data);

            if(outline_to_save.tile_group_id == "" || outline_to_save.tile_group_id == 0)
            {
              //TODO: adjust renderOutlineAsListItem
              var outline_as_list_item = Outline.renderOutlineAsListItem(data);
              $("#outline_list").prepend(outline_as_list_item);
              Navigation.updateFrames();
            }else{
              $('#outline_'+outline_to_save.tile_group_id+' .listItemTitle' ).html(data.tile_group_title);
            }
              //TODO: adjust viewFlattenedOutline

            Outline.viewFlattenedOutline(data);
            outline_modal.remove();
    });

    });

    if(outline.tiles)
    {
      $.each(outline.tiles, function(){
        var rendered_outline_tile = Outline.convertOutlineTileObjectToHTML(this);
        //attach our click handlers
        rendered_outline_tile.find(".outlineTileDelBtn").on("click", function() {
          $(this).parent().remove();
        });

        outline_modal.find(".outlineContainer").append(rendered_outline_tile);
      });
    }

  },

  convertOutlineArrayToHTML: function(outline) {
    if(outline.tiles)
    {
      var concat_html = "";
      $.each(outline.tiles, function(){
        concat_html += Outline.convertOutlineTileObjectToFlattenedHTML(this);
      });

      return concat_html;
    }
  },

    convertOutlineTileObjectToFlattenedHTML: function(outline_tile_object)
  { 
    var html = "<pre class='viewOutlineTileTitle'>"+outline_tile_object.tile_title+"</div><div class='viewOutlineTileContent'>"+outline_tile_object.tile_content+"</div>";
    html += "<div class='viewOutlineTileSources'>";
    if(outline_tile_object.tile_source_anno)
    {
      if(outline_tile_object.tile_source_anno)
      {
        $.each(outline_tile_object.tile_source_anno, function() {
          html += "<div class='viewOutlineTileSourceText'>"+this.source_title+" / "+this.source_page+" / "+this.source_author+" / "+this.source_text.substring(0,60)+"</div>";
        });
      }
    }
    html += "</pre><br>";

//    html += Outline.tileDate(outline_tile_object);

    return html;
  },
  tileDate: function(tile)
  { 
    var date = new Date(tile.tile_created).prettyDate();
    var name = "&nbsp;&nbsp;&nbsp;"+tile.tile_created_by_username;
    var tile_date = date+name;
    tile_date = "<div class='tileDate'>"+tile_date+"</div>";
    return tile_date;
  },


  convertOutlineTileObjectToHTML: function(outline_tile_object)
  {

    var html = "<div class='outlineTile' style='background:"+outline_tile_object.tile_color+"'><input class='outlineTileTileID' type='hidden' value='"+outline_tile_object.tile_id+"'/><div class='outlineTileTitle'>"+outline_tile_object.tile_title+"</div><a class='outlineTileDelBtn'></a><div class='outlineTileContent'>"+outline_tile_object.tile_content+"</div>";
      html += "<div class='outlineTileSources'>";
      if(outline_tile_object.tile_source_anno)
      {
        if(outline_tile_object.tile_source_anno)
        {
          html += "This tile makes "+outline_tile_object.tile_source_anno.length+" source references";
          // $.each(outline_tile_object.tile_source_anno, function() {
          //   html += "<div class='outlineTileSource blueLink'><input class='outlineTileSourceID' type='hidden' value='"+this.source_id+"' /><input class='outlineTileSourcePage' type='hidden' value='"+this.source_page+"' /><div class='outlineTileSourceText'><a href='#'>"+this.source_text.substring(0,60)+"</a></div></div>";
          // });
        }
      }
      html += "</div>";
      html += Outline.tileDate(outline_tile_object);

    html += "</div>";
    return $(html);
  },

  viewFlattenedOutline: function(outline_as_array)
  {

    var complete_outline_promise = Outline.getOutline(outline_as_array.tile_group_id);
    
    complete_outline_promise.success(function(data) {

          data = JSON.parse(data);
          var complete_outline = data;
          var outline_as_html = Outline.convertOutlineArrayToHTML(complete_outline);
          var modal = $("#view_outline_modal").mj_modal();
          var outline_modal_id = "outline-"+User.data.settings.outline_cnt;
          modal.find(".view_outline_modal_title").html(outline_as_array.tile_group_title);
          modal.find(".view_outline_modal_outline").html(outline_as_html);
          modal.find(".view_outline_modal_outline").attr("id",outline_modal_id).html(outline_as_html);
          modal.find(".outline_info").attr("id","info_"+outline_modal_id);
          User.data.settings.outline_cnt++;
          modal.resizable({
            minHeight: 50,
            minWidth: 360,
            maxWidth: 360
          });

          modal.find(".save").on("click", function() {
            Outline.viewOutline(outline_as_array.tile_group_id);
            $(this).parents(".modal").remove();
          });
          modal.find(".copy").on("click", function() {
              var clipboard = new Clipboard('.copy', {
                  target: function() {
                      //  var outline_title = $('#'+outline_modal_id).parent();
                        var out_text = document.querySelector('#info_'+outline_modal_id);
                       // var out_text = $('#'+outline_modal_id).html();
                        //out_text =  outline_title+"<br>"+out_text;
                        return out_text;
                  }
              });
          });
    });

  },

  

  bindUIActions: function() {


  }

};