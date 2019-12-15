Source = {

  settings: {},
  coords: {},


  init: function() {

	  this.loadSources(sources);
    this.bindUIActions();
    minimized_sources = new Array();
    new_source_type = "pdf";
    source_annotations = new Array();

  },



  populateSourcesList: function(sources) {
    $.each(sources, function(index,source) {
      $("#source_list").append(Source.renderSourceAsListItem(source));
    });
  },


getSourcesWithVersions: function() {

  //return User.data.projects;
  var source_array = new Array();
  $.each(User.data.sources, function(index,source) {
    source_array.push({
      "id":source.source_id,
      "ver":source.source_version
    });
  });


  return source_array;

},


  renderSourceAsListItem: function(source)
  {


  var container_div = $("<div/>", {class:"listItem",id:"source_"+source.source_id});
  var title_container_div = $("<div/>", {class:"listItemTitle unselectable"}).html(source.source_title).on("click", function() {
    Source.viewSource(source.source_id,1);
  });

  var source_id = source.source_id;
  var source_title = source.source_title;
  var source_author = source.source_author;

  var items = {
                  "edit": {
                      name: "Edit Source Title/Author", 
                      callback: function(key, options) {
                //Project.editProject(project,container_div);
                Source.editSource(source_id,source_title,source_author);


                      }
                      }
  };
  // owner
    if(User.data.team_leader_id > 0 && User.data.user_id == User.data.team_leader_id)
    {
      //if grid unlocked, in team mode and team leader
      items.delete = {
                name: "Delete", 
                      callback: function(key, options) {
                        if (confirm("Are you sure you want to delete this source?")) {
                          $.when(Source.deleteSource(source_id)).done(function() {
                            container_div.remove();
                            Navigation.updateFrames();
                          });
                }
                    }
            };
    }else if(User.data.team_leader_id == 0) {
      items.delete = {
                name: "Delete", 
                      callback: function(key, options) {
                        if (confirm("Are you sure you want to delete this source?")) {
                          $.when(Source.deleteSource(source_id)).done(function() {
                            container_div.remove();
                            Navigation.updateFrames();
                          });
                }
                    }
            };

    }

  var gear_icon = gearMenu(items);
  container_div.append(title_container_div,gear_icon);

  container_div.append("<input type='hidden' class='navSourceID' value='"+source.source_id+"'>");

  return container_div;
  },
  
  
findAnnoObjectByTempID: function(temp_id) {
	   return $.grep(source_annotations, function(n,i) {
		  return n.source_temp_id != temp_id;
	  });
},
  
  
  
viewSource: function(source_id,page_num) {
  User.data.active_source_id =  source_id;
  if($(".source_modal").is(":visible"))
  {
    var source_modal = $(".source_modal").filter(":visible");
    source_modal.remove();
  }
  if(User.data.team_id > 0)
  {
      source_timer = setInterval(Source.reloadSourceAnnotations, 2000);
  }
    var modal = $("#source_modal").mj_modal();
     modal.find(".modalCloseButton").on("click", function() {
		clearInterval(source_timer);
	  });
    modal.resizable({
        minHeight: 540,
        minWidth: 1000
      });

    modal.width("80%");
    modal.height("80%");

    modal.css({"background":"white"});



    modal.find(".sourceRight").height($(".source_modal").filter(":visible").height());
    modal.find(".sourceLeft").height($(".source_modal").filter(":visible").height());

      modal.find(".source_create_tile_btn").on("click", function(e) {
      e.stopPropagation();
      var our_tile = Tile.newTile("#fdf8c5");
      our_tile.find(".new_tile_source_id").val(source_id);
      //add all page cordinate info to modal
      Source.addAnnotationToTile(0,0,0,0,0,0,0,our_tile);
    });

	// $('.text', draggableDiv).mousedown(function(ev) {
	//   draggableDiv.draggable('disable');
	// }).mouseup(function(ev) {
	//   draggableDiv.draggable('enable');
	// });
	modal.find(".pageNumbers").find("input[type=text]").mousedown(function(e) {

	  modal.draggable('disable');

	});

	modal.find(".pageNumbers").find("input[type=text]").mouseup(function(e) {
		modal.draggable('enable');
		// $(this).focus();
		// var tmpStr = $(this).val();
		// $(this).val('');
		// $(this).val(tmpStr);

	});

      modal.find(".goButton").on("click", function() {
        var new_page_number = modal.find(".pageNumbers").find("input[type=text]").val();
        Source.loadPage(new_page_number);

        //TODO: FIX THIS SO IT'S nNOT CALLED WHEN WE ARE JUST LOADING ONE PAGE FROM AN INITIAL VIEW SOURCE CALL
        Source.scrollToPage(new_page_number);
      });

      $.ajax({
          type: "POST",
          url: '/action?action=getSource',
          data: {
            source_id: source_id
          },
          beforeSend: function()
          {

          },
          success: function(data) 
          {

            //TODO: REMOVE ALL THIS "THIS" THESE DON'T NEED TO BE CLASS VARS
            Source.source = data;
            Source.modal = modal;
            Source.page_count = Source.source.pages.length;
            source_annotations= new Array();
            ga('send', 'event', 'Sources', 'view', Source.source.source_title, Source.source.source_id);
            var webpage_url = "";
            if(Source.source.source_url !== "" && Source.source.source_url !== 0 && Source.source.source_url !== '0')
            {
              var source_link = "<a href='"+Source.source.source_url+"' target='_blank'>"+Source.source.source_url+"</a>";
              webpage_url = "URL: "+source_link+" ";
            }
            modal.find(".sourceTitle").html(webpage_url+Source.source.source_title+" <span>Author: "+Source.source.source_author+"</span>");
            modal.find(".pageCount").html("/ "+Source.page_count);
            modal.find(".view_source_source_id").val(source_id);
            modal.find(".sourceLeft").empty();

            if(Source.source.source_tiles)
            {
              Source.loadLeftNav(Source.source.source_tiles,modal);

            }
            //TODO: backend is currently sending source annotations back in a funny way. find the TODO for this on the backend in Source_Helper.php in function get_source_pages
            if(typeof data.pages[0].notes !== "undefined" && data.pages[0].notes.length > 0)
            {
              source_annotations = data.pages[0].notes;
              //Source.loadAnnotationsForPage(source_annotations,1);
            }

            //load first page of source
            Source.loadPage(page_num);

            
            
             
            //continuous scroll
            var nearToBottom = 400;
            var nearToTop = 400;
            var my_modal = Source.modal;
            my_modal.find(".sourceRight").scroll(function() {
              if (my_modal.find(".sourceRight").scrollTop() + my_modal.find(".sourceRight").height() > my_modal.find(".sourceRight .sourceContainer").height() - nearToBottom)
              { 
                  Source.loadPage(Source.getNextPageID());
              }
             if(my_modal.find(".sourceRight").scrollTop() < 400)
              { 

                  Source.loadPage(Source.getPrevPageID());
              }
            });

          },
          dataType: 'json'
          });
  },


reloadSourceAnnotations: function() {

    //what source are we lookin at?
    if($(".source_modal").is(":visible"))
    {
      var source_modal = $(".source_modal").filter(":visible");

      //get our source id
      var our_source_id = source_modal.find(".view_source_source_id").val();
      if(!our_source_id || our_source_id == "0" || our_source_id == "" || our_source_id == 0)
      {
        return;
      }

      $.ajax({
          type: "POST",
          url: '/action?action=getSource',
          data: {
            source_id: our_source_id
          },
          beforeSend: function()
          {
            
          },
          success: function(data) 
          {

            if(typeof data.pages !== "undefined" && data.pages.length > 0)
            {
              $.each(data.pages, function(index,annotation) {
                if(Source.pageIsVisible(annotation.source_page_number))
                {
                  Source.loadAnnotationsForPage(data.pages[parseInt(annotation.source_page_number) - 1].notes,annotation.source_page_number);
                }
              });
            }

            if(data.source_tiles)
            {
              Source.loadLeftNav(data.source_tiles,source_modal);
            }

          },
          dataType: 'json'
          });

    }
    else
    {
      return;
    }
    
  },

loadLeftNav: function(tiles,modal) {

  $(".sourceLeft").empty();

  var unique_ids = [];
  var unique_tiles = [];

  $.each(tiles, function(index,tile) {
    var tile_id = tile.tile_id;
    if($.inArray(tile_id, unique_ids) === -1)
    {
      unique_ids.push(tile_id);
      unique_tiles.push(tile);
    }
  });

              $.each(unique_tiles, function(index,value) {

                if(value.tile_title == "")
                {
                  var our_tile_title = "No Title";
                }
                else
                {
                  var our_tile_title = value.tile_title;
                }

                modal.find(".sourceLeft").append(

                  $('<div/>' , {
                    text: our_tile_title
                  }).on("click", function(){

                    Tile.editTile(value);
                  })

                  );
              });
},
   
  deleteSource: function(source_id) {
	  
      return $.ajax({
          type: "POST",
          url: '/action?action=deleteSource',
          data: {
            source_id: source_id
          },
          success: function(data) 
          {
            ga('send', 'event', 'Sources', 'delete', data.source_title, data.source_id);

          },
          dataType: 'json'
          });	  
  },

  newSource: function() {
    $(".loading").hide();
    $(".newSourceModal").filter(":visible").remove();
    var modal = $("#new_source_modal").mj_modal();
    modal.children(".header").prepend("Upload Source Document");


    modal.find("#source_type_file_container").show();
    modal.find("#new_source_project_id").val(User.data.settings.current_project_id);

    //do stuff for the drag drop file upload
    var droppedFiles = false;

    var file_container = modal.find("#source_type_file_container");
    file_container.on('drag dragstart dragend dragover dragenter dragleave drop mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();
    })
    .on('dragover dragenter', function() {
      file_container.addClass('is-dragover');
    })
    .on('dragleave dragend drop', function() {
      file_container.removeClass('is-dragover');
    })
    .on('drop', function(e) {
      droppedFiles = e.originalEvent.dataTransfer.files;
      modal.find(".dragDropChoose").html("Ready to upload: "+droppedFiles[0].name);
    });



  modal.find("#new_source_type").on("change", function() {
    switch (this.value) {
        case "webpage":
            modal.find("#source_type_file_container").hide();
            modal.find("#source_type_text_container").hide();
            modal.find("#source_type_url_container").show();
            break;
        case "pdf":
            modal.find("#source_type_file_container").show();
            modal.find("#source_type_text_container").hide();
            modal.find("#source_type_url_container").hide();
            break;
        case "txt":
            modal.find("#source_type_text_container > textarea").ckeditor();
            modal.find("#source_type_file_container").hide();
            modal.find("#source_type_text_container").show();
            modal.find("#source_type_url_container").hide();
            break;
    }
  });

  //attach handler to save button
  modal.find('.save').on("click", function(e) {
  	e.preventDefault();
  $(".loading").show();
	
    $(this).css({"width":"auto"});
    $(this).html("Uploading...");
    
    modal.find(".dragDropChoose").html("Uploading...");

    // SUBMIT THE FORM, GETS PICKED UP BY THE ON SUBMIT CODE BELOW
    modal.find("#new_source_form").submit();

  });

  //ON SUBMIT FOR NEW SOURCE FORM
  modal.find("#new_source_form").submit(function(e) {

    e.preventDefault();

    var our_form = $(this)[0];
    var ajaxData = new FormData(our_form);

    if (droppedFiles) {
      $.each( droppedFiles, function(i, file) {
        ajaxData.append( $(our_form).find('input[type="file"]').attr('name'), file );
      });
    }

    $.ajax({
      url: $(our_form).attr('action'),
      type: $(our_form).attr('method'),
      data: ajaxData,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      complete: function() {

      },
      success: function(sources) {

        modal.remove();
        Navigation.populateSourcesList(sources);
        Navigation.updateFrames();

      },
      error: function() {
        alert('Error Occured. Is the file type supported?');
      }
    });

  });

  },


  editSource: function(source_id,source_title,source_author) {

    var modal = $("#edit_source_modal").mj_modal();


    var source_id_input = modal.find(".edit_source_source_id");
    var source_title_input = modal.find(".edit_source_source_title");
    var source_author_input = modal.find(".edit_source_source_author");

    source_id_input.val(source_id);
    source_title_input.val(source_title);
    source_author_input.val(source_author);

    //attach handler to save button
    modal.find('.save').on("click", function() {
      $.when(Source.saveEditedSource(source_id_input.val(),source_title_input.val(),source_author_input.val())).done(function() {
        modal.remove();
      });
    });

  },

  saveEditedSource: function(source_id,source_title,source_author) {
	  
      return $.ajax({
          type: "POST",
          url: '/action?action=editSource',
          data: {
            source_id:source_id,
            source_author:source_author,
            source_title:source_title
          },
          success: function(data) 
          {
            ga('send', 'event', 'Sources', 'edit', data.source_title, data.source_id);

          },
          dataType: 'json'
          });	  
  },	

  loadAnnotationsForPage: function(annotations,page_number) {

    var source_modal = $(".source_modal").filter(":visible");

    var annotations_for_page = new Array();
    var annotations_for_page = annotations.filter(function(annotation, index) {
      page_match = annotation.source_page == page_number;
      return annotation.source_page == page_number;
    });

    annotations = annotations_for_page;
    // var current_page_element = $('input[value="'+page_number+'"].source_page_number').siblings('.jcrop-holder').children('.jcrop-tracker');
    var current_page_element = $('input[value="'+page_number+'"].source_page_number').siblings('.jcrop-holder');

    //make sure the page is clear of annotations first
    current_page_element.find(".textSelectionHighlight").remove();

    //add the annotations
    $.each(annotations, function(index, annotation) {
            if(annotation.source_id == source_modal.find(".view_source_source_id").val())
            {
                var rendered_annotation = Source.renderAnnotation(annotation);
                rendered_annotation.appendTo(current_page_element);
            }
    });
  },

  renderAnnotation: function(annotation) {


//appendTo(current_page_element).html("<input type='hidden' class='source_temp_id' value='"+annotation.source_temp_id+"'>") used to be right before .on for some reason
                return $("<div/>", {
                    position:'relative',
                    height:annotation.focus_height+'%',
                    width:annotation.focus_width+'%',
                    class: 'textSelectionHighlight'
                    }).css({'background':'#ffff4d','left':annotation.anchor_left+'%','top':annotation.anchor_top+'%',position:'absolute'}).on("click", function(e) {
                        console.log('annotation clicked');
                        e.stopPropagation();
                        var tile_promise = Tile.getTile(annotation.tile_id);
                        var modal = $("#view_tile_template").mj_modal();
                        modal.children(".header").prepend("View Tile");

                        tile_promise.success(function(data) {
                          Tile.populateViewTileTemplate(modal,data);
                        });

                        modal.find('.save').on("click", function() {
                          $(this).parents(".modal").remove();
                          Tile.editTile({"tile_id":annotation.tile_id});
                        });
                });
  },


showHighlightOptionsMenu: function() {
  jcrop_object = User.data.jcrop;
  c = Source.coords;
  var top_pos_as_percentage = c.y / jcrop_object.ui.selection.parents('.jcrop-holder').height() * 100;
  var left_pos_as_percentage = c.x / jcrop_object.ui.selection.parents('.jcrop-holder').width() * 100;
  var width_as_percentage = c.w / jcrop_object.ui.selection.parents('.jcrop-holder').width() * 100;
  var focus_height = c.h / jcrop_object.ui.selection.parents('.jcrop-holder').height() * 100;
  var anchor_position = {"top":top_pos_as_percentage,"left":left_pos_as_percentage};
  var focus_position = anchor_position;
  var text = "Image source";
  var focus_width = width_as_percentage;
  var anchor_position_left_percent = anchor_position.left;
  var source_modal = $(".source_modal").filter(":visible");
  var highlight_overlay = Source.getAnnotationAsHighlight(focus_height,width_as_percentage,left_pos_as_percentage,top_pos_as_percentage);

  //if we already have a note open that is capturing highlights, just add the highlight to that note
  if($(".tile_modal_highlight_button").filter(":visible").hasClass("active") === true)
  {
    var tile = $(".tile_modal_highlight_button.active").filter(":visible").parents(".tileModal");
    highlight_overlay.appendTo(jcrop_object.ui.holder.children('.jcrop-tracker'));
    Source.addAnnotationToTile(jcrop_object,anchor_position,focus_position,focus_width,focus_height,c,highlight_overlay,tile);

  }
  //we don't already have a note
  //else if(jcrop_object.ui.selection.find(".jcrop-vline + .jcrop-tracker > div").length == 0)
  else 
  {

    jcrop_object.ui.selection.find(".jcrop-vline + .jcrop-tracker").append("<div class='jcropTileBtn' style='font-size:16px;font-weight:bold;position:absolute;right:0px;top:0px;width:100px;height:40px;'><a>NEW TILE</a></div>");
    jcrop_object.ui.selection.find(".jcropTileBtn").off("click");
    jcrop_object.ui.selection.find(".jcropTileBtn").on("click", function(e) {

      e.stopPropagation();

      var tile = Tile.newTile("#fdf8c5");

      highlight_overlay.appendTo(jcrop_object.ui.holder.children('.jcrop-tracker'));
      Source.addAnnotationToTile(jcrop_object,anchor_position,focus_position,focus_width,focus_height,c,highlight_overlay,tile);
      //remove our button so that it is recreated next "onselect" call from jcrop
      this.remove();
      return;
    });
  }

},

getAnnotationAsHighlight: function(focus_height,width_as_percentage,left_pos_as_percentage,top_pos_as_percentage) {
      var highlight_overlay = $("<div/>", {
        position:'relative',
        height:focus_height+"%",
        width:width_as_percentage+"%",
        class: 'textSelectionHighlight'
        }).css({'background':'yellow','left':left_pos_as_percentage+'%','top':top_pos_as_percentage+'%',position:'absolute'});

      return highlight_overlay;
},
makeCoordContainer: function(c,jcrop_object,anchor_position,focus_position,focus_width,focus_height,annotation_page_num){
  if (annotation_page_num == 0) {
    var bounds = 0;
  }else{
    var bounds = {"c":c,"bounds":jcrop_object.getBounds()};
  }
  var coord_inputs = Source.convertAnnotationCoordsToInputs({
    source_anchor_position:anchor_position,source_focus_position:focus_position,
    focus_width:focus_width,focus_height:focus_height,
    bounds,
    source_page:annotation_page_num});
  var coord_container = $("<div class='coordContainer'>");
  coord_container.append(coord_inputs);
  //cancels the jcrop tracker selection
  
  if (annotation_page_num !== 0) {
    jcrop_object.release();
  }
  return coord_container;
},
addAnnotationToTile: function(jcrop_object,anchor_position,focus_position,focus_width,focus_height,c,highlight_overlay,tile,source_page) {

        if (jcrop_object == 0) {
          jcrop_object = User.data.jcrop;
          var annotation_page_num = 0;
          var bounds = 0;
        }else{
          var annotation_page_num = jcrop_object.ui.holder.parents(".pageContainer").find(".source_page_number").val();
          var bounds = {"c":c,"bounds":jcrop_object.getBounds()};
        }
        var coord_container =  Source.makeCoordContainer(c,jcrop_object,anchor_position,focus_position,focus_width,focus_height,annotation_page_num);

        //GET THE DATA HERE!
        var annotation_link = $("<a href='#'>"+Source.source.source_title+" / "+annotation_page_num+" / "+Source.source.source_author+"</a>");
        
        var annotation = {"jcrop_coords":{"c":c,"bounds":bounds},"annotation_page_num":annotation_page_num};
       // annotation = annotation_page_num;
        var cutout = Source.renderTmpAnnotation(annotation,jcrop_object);

        var annotation_container = $('<div/>');
        annotation_container.append(annotation_link,cutout,coord_container);
        annotation_container.on("click", function() 
        {
            Source.viewSource(Source.source.source_id,annotation_page_num);
        });

        //REMOVE ANNOTATION
        var anno_del_btn = $("<a/>", { class: "annotationDeleteButton"}).html("X ");
        anno_del_btn.on("click", function(evt) {
            evt.stopPropagation();
            $(this).parent().remove();
            highlight_overlay.remove();
            }).prependTo(annotation_container);

        $(annotation_container).appendTo(tile.find('.tileModalAnnotationList'));

},

convertAnnotationCoordsToInputs: function(input_array) {
  var inputs = new Array();
  $.each(input_array, function(key, value) {
    if(typeof value === 'object' && value !== null)
    {
      $.each(value, function(key2, value2) {

        if(typeof value2 === 'object' && value2 !== null)
        {

          $.each(value2, function(key3, value3) {
            inputs.push(Source.renderInput(key2+"_"+key3, value3, "hidden"));
          });
          //inputs.push(Source.renderInput(key+"_"+key2, value2, "hidden"));
        }
        else
        {
          inputs.push(Source.renderInput(key+"_"+key2, value2, "hidden"));
        }
      });
    }
    else
    {
      inputs.push(Source.renderInput(key, value, "hidden"));
    }
  });
  return inputs;
},

renderInput: function(name,value,type) {
  return $("<input class='"+name+"' name='"+name+"' value='"+value+"' type='"+type+"' />");
},

renderTmpAnnotation: function(annotation,jcrop_object) {
 if (annotation.annotation_page_num == 0) {
    var source_page_image_url = $('.source_page_1 .sourcePageImage').attr("src");
    var width = 'auto';
    var height = 200;
    var bound_width = width;
    var bound_height = height;
    var left = 0;
    var top = 0;
  }else{
    var source_page_image_url = jcrop_object.ui.holder.parents(".pageContainer").find(".sourcePageImage").attr("src");
    var width = annotation.jcrop_coords.c.w;
    var height = annotation.jcrop_coords.c.h;
    var bound_width = annotation.jcrop_coords.bounds[0];
    var bound_height = annotation.jcrop_coords.bounds[1];
    var left = annotation.jcrop_coords.c.x;
    var top = annotation.jcrop_coords.c.y;
  }

 var annotation_image = $("<div/>", {

    }).css({
      width: width + 'px',
      height: height + 'px',
      overflow: "hidden",
      position: 'relative'
    });


    
    var the_image = $("<img width='"+bound_width+"px' height='"+bound_height+"px' src='"+source_page_image_url+"'>");

    the_image.css({"position":"absolute","left":"-"+left+"px","top":"-"+(top)+"px"});

    //annotation_image.append("<img src='"+$(".sourcePageImage").attr('src')+"'>");
    annotation_image.append(the_image);

    return annotation_image;



},

pageIsVisible: function(page_num) {
  return this.modal.find('input[value="'+page_num+'"].source_page_number').length > 0;
},

scrollToPage: function(page_num) {
    this.modal.find(".sourceRight").animate({
        scrollTop: Source.modal.find('input[value="'+page_num+'"].source_page_number').parents(".pageContainer").offset().top + this.modal.find(".sourceRight").scrollTop()
    }, 2000);


},

loadPage: function(page_num) {

      //if this page isn't immediately prev or next a visible source page, and is not already visible itself

      //if this page is already visible, scroll to it
      var visible_pages = this.modal.find(".pageContainer");
      if(this.pageIsVisible(page_num))
      {
        this.scrollToPage(page_num);
        return; 
      }
      else if(visible_pages.length > 0 && page_num != this.getNextPageID() && page_num != this.getPrevPageID())
      {
        //if this page is not visible, and is not an immediate sibling of a visible page, reset everything by calling viewSource and load just this page
        Source.viewSource(this.source.source_id,page_num);
        return;
      }

      //if this page doesn't exist exit
      if(!this.source.pages[page_num - 1]) return;

      var page_image_url = this.source.pages[page_num - 1].source_page_content;
      var page_content = $("<img class='sourcePageImage' src='/img/"+this.source.user_id+"/"+page_image_url+"' />");

      var page_number = $("<div>", {
        "class": "sourcePageNumber"
      }).html(page_num);

      var page_number_input = $('<input>').attr({
          type: 'hidden',
          "class": 'source_page_number',
          value: page_num
      });

      var page_container = $("<div>", {
        "class": "pageContainer source_page_"+page_num
      }).append(page_content,page_number,page_number_input);

      page_content.Jcrop({
          onSelect: function(coords){
          	Source.coords = coords;
          	jcrop_api = this;
          	User.data.jcrop = this;
          	Source.showHighlightOptionsMenu();
          },
          onRelease: function(coords){
          	coords = coords;
            Source.hideHighlightOptionsMenu(this,coords);
            jcrop_api = this;
          },
          onChange: function(coords){
          	coords = coords;
          	jcrop_api = this;
          }
      }, function() {
        jcrop_api = this;
        User.data.jcrop = this;
        Source.reloadSourceAnnotations();

        //used to load source annotations here?
      });      

      page_container.on("click", function() {
        Source.modal.find(".pageNumbers input").val($(this).find(".source_page_number").val());
      });

      //if this is not the first page loaded, does this page go before or after the currently visible page range?
      var page_range = this.modal.find(".pageContainer");
      if(page_range.length != 0 && (page_num < $(page_range[0]).find(".source_page_number").val()))
      { 
       //prepend
        this.modal.find(".sourceRight .sourceContainer").prepend(page_container);
        this.modal.find(".sourceRight").scrollTop(page_container.height());
      }
      else 
      {
        //append
        this.modal.find(".sourceRight .sourceContainer").append(page_container);
      }

      if(source_annotations){
        Source.loadAnnotationsForPage(source_annotations,page_num);
        //Source.loadAnnotations(source_annotations,"image");
      }
      

},

hideHighlightOptionsMenu: function(jcrop_object,coords) {

//jcrop_object.ui.selection.find(".jcrop-vline + .jcrop-tracker > div")


jcrop_object.ui.selection.find(".jcrop-vline + .jcrop-tracker > div").remove();

},

  getNextPageID: function() {
    
    var pages = this.modal.find(".pageContainer");
    var next_page_id = (parseInt($(pages[pages.length - 1]).find(".source_page_number").val())) + 1;
    return next_page_id;
  },

  getPrevPageID: function() {
    var pages = this.modal.find(".pageContainer");
    var prev_page_id = parseInt($(pages[0]).find(".source_page_number").val()) - 1;
    return prev_page_id;
  },

	
  reloadSources: function(project_id) {

    this.getSources(project_id);

  },
  
  getSources: function(project_id) {
      $.ajax({
      type: "POST",
      url: '/action?action=getSources',
      data: {
        project_id: project_id
      },
      success: function(data) 
      {
        //update our sources object
    	  sources = data;

        Source.loadSources(sources);

      },
      dataType: 'json'
      });
  },
  
    loadSources: function(sources) {

      Navigation.populateSourcesList(sources);

    },

  bindUIActions: function() {



    $("#minimize_source_button").on("click", function() {

      //minimize the open source
      if($("#view_source_modal").is(":visible"))
      {
        var current_source_id = $("#view_source_source_id").val();
        var current_page_number = this.page_num;
        var scroll_top = $("#source_scroll_container").scrollTop();
        var source_title = $("#view_source_source_title").val()

        Source.minimizeSource(current_source_id, current_page_number, scroll_top, source_title);

      }
    });

  	$("#toggleViewSourceTilesBtn").on("click", function() {

  		if($(".viewSourceTileContainer").is(":hidden"))
  		{
  			$(".viewSourceTileContainer").show();
  		}
  		else
  		{
  			$(".viewSourceTileContainer").hide();
  		}

  	});

	  
$("#view_source_modal").on("click", function() {

});



	  $('#new_source_modal').on('hidden', function () {
	      Source.clearNewSourceInput();
	  });
	  

    $("#btn_new_source").on("click", function() {
    	Source.resetNewSourceModal();
      $("#new_source_modal").modal("show");
	  $("#new_source_project_id").val($('#grid_project_id').val());
    });


    $("#edit_source_save_button").on("click", function() {
    var source_title = $("#edit_source_source_title").val();
    var source_author = $("#edit_source_source_author").val();
    var source_id = $("#edit_source_source_id").val();
     Source.saveEditedSource(source_id,source_title,source_author);
    });
    
	$("#new_source_save_button").on("click", function() {
     Source.saveNewSource();
    });
		
	$("#new_source_type").change(function(){
		
		
		//$("#new_source_type").children(":selected").val()
		
		if($("#new_source_type").children(":selected").val() == "pdf")
			{
			new_source_type = "pdf";
			$("#source_type_text_container").hide();
			$("#source_type_file_container").show();
      $("#source_type_url_container").hide();
			$("#new_source_save_button").html("Upload");

			}
		else if($("#new_source_type").children(":selected").val() == "txt")
			{ 
			new_source_type = "txt";
			$("#source_type_text_container").show();
			$("#source_type_file_container").hide();
      $("#source_type_url_container").hide();
			$("#new_source_save_button").html("Save");
			}
      else if($("#new_source_type").children(":selected").val() == "webpage")
      {
        $("#source_type_text_container").hide();
        $("#source_type_file_container").hide();
        $("#source_type_url_container").show();
        $("#new_source_save_button").html("Save");
      }
		
	});
    
    
    $("#view_source_modal").on("hidden", function() {
    	Source.clearViewSourceInput();
    });

    
    $("#view_source_create_tile_button").on("click", function() {
        Tile.viewSourceSaveTile(0,$('#view_source_tile_title').val(),$('#view_source_tile_content').val(),$('#view_source_tile_tags').val(),$('#view_source_tile_color').val(),$("#view_source_source_id").val(),null,null,true,false,1,new_tile_sources);
        $('#view_source_modal').modal('hide');
    });
    
    

  }

};