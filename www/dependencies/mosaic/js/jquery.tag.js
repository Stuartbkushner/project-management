/*  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/
(function($){
	
	$.extend($.fn,{
		tag: function(options) {

			//console.log('tag called');

			var defaults = {
				minWidth: 100,
				minHeight : 100,
				defaultWidth : 100,
				defaultHeight: 100,
				maxHeight : null,
				maxWidth : null,
				save : null,
				remove: null,
				canTag: true,
				canDelete: true,
				autoShowDrag: false,
				autoComplete: null,
				defaultTags: null,
				clickToTag: true,
				draggable: true,
				resizable: true,
				showTag: 'hover',
				showLabels: false,
				debug: false,
        clickable: false,
        click: null
			};
			
			var options = $.extend(defaults, options);  

			return this.each(function() {
				
				var obj = $(this);
				
				obj.data("options",options);
				
				/* we need to wait for load because we need the img to be fully loaded to get proper width & height */
				//$(window).load(function(){
					
					obj.wrap('<div class="jTagContainer" />');
					
					obj.wrap('<div class="jTagArea" />');


					
					$("<div class='jTagLabels'><div style='clear:both'></div></div>").insertAfter(obj.parent());
					
					$('<div class="jTagOverlay"></div>').insertBefore(obj);
					
					container = obj.parent().parent();
					overlay = obj.prev();
					
					obj.parent().css("backgroundImage","url("+obj.attr('src')+")");
					
					obj.parent().width(obj.width());
					obj.parent().height(obj.height());
					
					obj.parent().parent().width(obj.width());
					
					obj.hide();
					
					if(options.autoShowDrag){
						obj.showDrag();
					}
				
					container.delegate('.jTagTag','mouseenter',function(){
						if($(".jTagDrag",container).length==0){
							$(this).css("opacity",1);
              if(options.canDelete){
                $(".jTagDeleteTag",this).show();
              }							
							$(this).find("span").show();
							obj.disableClickToTag();
						}
					});
					
					container.delegate('.jTagTag','mouseleave',function(){
						if($(".jTagDrag",container).length==0){
							if(options.showTag == 'hover'){
								$(this).css("opacity",0);
                if(options.canDelete){
                  $(".jTagDeleteTag",this).hide();
                }
								$(this).find("span").hide();
							}
							obj.enableClickToTag();
						}
					});
					
					if(options.showLabels && options.showTag != 'always'){
					
						container.delegate('.jTagLabels label','mouseenter',function(){
							$("#"+$(this).attr('rel'),container).css('opacity',1).find("span").show();
              if(options.canDelete){
                $(".jTagDeleteTag",container).show();
              }
						});
						
						container.delegate('.jTagLabels label','mouseleave',function(){
							$("#"+$(this).attr('rel'),container).css('opacity',0).find("span").hide();
              if(options.canDelete){
                $(".jTagDeleteTag",container).hide();
              }
							
						});
					
					}
					
					if(options.canDelete){
					
						container.delegate('.jTagDeleteTag','click',function(){
							
							/* launch callback */
							if(options.remove){
								options.remove($(this).parent().parent().getId());
							}
							
							/* remove the label */
							if(options.showLabels){
								$(".jTagLabels",container).find('label[rel="'+$(this).parent().parent().attr('id')+'"]').remove();
							}
							
							/* remove the actual tag from dom */
							$(this).parent().parent().remove();
							
							obj.enableClickToTag();
							
						});
					
					}
          
          if(options.clickable){
						container.delegate('.jTagTag','click',function(){
							/* launch callback */
							if(options.click){
								options.click($(this).find('span').html());
							}
						});
					}
					
					if(options.defaultTags){
						$.each(options.defaultTags, function (index,value){
							obj.addTag(value.width,value.height,value.top,value.left,value.label,value.id);
						});
					}
					
					obj.enableClickToTag();
						
				;
			
			});
		},
		hideDrag: function(){
			Tile.setCaptureMode(false);
			var obj = $(this);
			
			var options = obj.data('options');
			
			obj.prev().removeClass("jTagPngOverlay");
			
			obj.parent().parent().find(".jTagDrag").remove();
			
			if(options.showTag == 'always'){
				obj.parent().parent().find(".jTagTag").show();
			}
			
			obj.enableClickToTag();
			
		},
		showDrag: function(e){


			  var open_tiles = Tile.getOpenTiles();
              if(open_tiles.length > 0)
              {
                //let the user know they can use the capture buttons on any open tiles to capture their text selection
                Tile.setCaptureMode(true);
              }

			var obj = $(this);
			
			var container = obj.parent().parent();
			//console.log(container);
			var overlay = obj.prev();
			
			obj.disableClickToTag();
			
			var options = obj.data('options');
			
			var position = function(context){

				
				//console.log(context);
				var jtagdrag = $(".jTagDrag",context);

				//console.log(jtagdrag.offset());

				var offset = jtagdrag.offset();
				border =   parseInt(jtagdrag.css('borderTopWidth'));
				left_pos = parseInt(offset.left) + border;
				top_pos =  parseInt(offset.top) + border;

				//console.log("position function called with context:",context,"jtagdrag is:",jtagdrag,"left pos:",left_pos,"top_pos:",top_pos);
				return "-"+left_pos+"px -"+top_pos+"px";
			}
			
			if($(".jTagDrag",overlay).length==1){
				return;
			}
			
			if(!options.canTag){
				return;
			}
			
			if(options.showTag == 'always'){
				$(".jTagTag",overlay).hide();
			}
					
			$('<div style="width:'+options.defaultWidth+'px;height:'+options.defaultHeight+'px"class="jTagDrag"><div class="jTagSave"><div class="jTagInput"><!--<input type="text" id="jTagLabel">--></div><div class="jTagSaveClose"></div><div class="jTagSaveBtn"></div><div style="clear:both"></div></div>').appendTo(overlay);
			
			overlay.addClass("jTagPngOverlay");
			
			jtagdrag = $(".jTagDrag",overlay);
			
			//jtagdrag.css("backgroundImage","url("+obj.attr('src')+")");
			
			jtagdrag.css("position", "absolute");
			
			if(e){
				
				function findPos(someObj){
					var curleft = curtop = 0;
					if (someObj.offsetParent) {
						do {
							curleft += someObj.offsetLeft;
							curtop += someObj.offsetTop;
						} while (someObj = someObj.offsetParent);
						return [curleft,curtop];
					}
				}
				
				/* get real offset */
				pos = findPos(obj.parent()[0]);

				
				x = Math.max(0,e.pageX - pos[0] - (options.defaultWidth / 2));
				y = Math.max(0,e.pageY - pos[1] - (options.defaultHeight / 2));
				
				if(x + jtagdrag.width() > obj.parent().width()){
					x = obj.parent().width() - jtagdrag.width() - 2;
				}
				
			
				
				if(y + jtagdrag.height() > obj.parent().height()){
					y = obj.parent().height() - jtagdrag.height() - 2;
				}

			} else {
				
				x = 0;
				y = 0;
				
			}

			var scroll_offset = $('.sourceRight').offset();
			y = y - parseInt(scroll_offset.top) + 105;
			//console.log(x,y);

			jtagdrag.css("top",y)
						  .css("left",x);
			
			
			if(options.autoComplete){
				$("#jTagLabel",container).autocomplete({
					source: options.autoComplete
				});
			}
			
			$(".jTagSaveBtn",container).click(function(){
				
				//label = $("#jTagLabel",container).val();
				label = '';
				
				/*if(label==''){
					alert('The label cannot be empty');
					return;
				}*/
				
				height = $(this).parent().parent().height();
				width = $(this).parent().parent().width();

				//top_pos = $(this).parent().parent().attr('offsetTop');
				//left = $(this).parent().parent().attr('offsetLeft');

				//var my_offset = $(this).parent().parent().offset();
				//top_pos = my_offset.top;
				//left = my_offset.left;
				var my_position = $(this).parent().parent().position();
				//console.log(my_position);

				top_pos = my_position.top;
				left = my_position.left;

				//console.log($(this).position());
				
				tagobj = obj.addTag(width,height,top_pos,left,label);



				//console.log(my_offset);

				//console.log($(this).parent().parent());
//console.log(options);
//console.log(height,width,top_pos,left);

//console.log(top_pos);
//console.log(left);
//console.log(tagobj.parent().height());
//console.log(tagobj.parent().width());


var top_pos_as_percentage = top_pos / tagobj.parent().height() * 100;
var left_pos_as_percentage = left / tagobj.parent().width() * 100;
var width_as_percentage = width / tagobj.parent().width() * 100;
var focus_height = height / tagobj.parent().height() * 100;
width = width_as_percentage;
var anchor_position = {"top":top_pos_as_percentage,"left":left_pos_as_percentage};
var focus_position = anchor_position;
var text = "Image source";
var focus_width = width;
var anchor_position_left_percent = anchor_position.left;
//get container width


//get container height





								var blank_tile = Tile.newTile("#fdf8c5");
								var source_modal = $(".source_modal").filter(":visible");

								 //give our tile a temporary id
								 //THIS SUCKS NEEDS TO BE REPLACED WITH A RANDOM ID WILL NOT WORK CONSISTENT

								 blank_tile.find('.tile_id').val("temp" + source_counter);
								 source_counter++;



								$("<div/>", {
									position:'relative',
									height:height,
									width:width+"%",
									class: 'textSelectionHighlight'
									}).css({'background':'yellow','left':left_pos_as_percentage+'%','top':top_pos_as_percentage+'%',position:'absolute'}).appendTo(".jTagOverlay").html("<input type='hidden' class='source_temp_id' value='"+blank_tile.find('.tile_id').val()+"'>");



				if(!global_tiles[blank_tile.find('.tile_id').val()])
                  {
                    global_tiles[blank_tile.find('.tile_id').val()] = new Array();
                    global_tiles[blank_tile.find('.tile_id').val()].push({source_temp_id:blank_tile.find('.tile_id').val(),source_page:pageNum,source_id:source_modal.find(".view_source_source_id").val(),source_text:text,source_anchor_position:anchor_position,source_focus_position:focus_position,focus_width:focus_width,focus_height:focus_height,type:2});
                  }
                  else
                  {
                    global_tiles[blank_tile.find('.tile_id').val()].push({source_temp_id:blank_tile.find('.tile_id').val(),source_page:pageNum,source_id:source_modal.find(".view_source_source_id").val(),source_text:text,source_anchor_position:anchor_position,source_focus_position:focus_position,focus_width:focus_width,focus_height:focus_height,type:2});
                  }



								var anno_element = $("<li/>", {
									class: "selectedTextContainer"
								}).html("- "+text+"<input type='hidden' class='source_temp_id' value='"+blank_tile.find('.tile_id').val()+"'>").on("click", function() {
										
									//pageNum = current_page_num;
									 // global_pdf.then(renderPdf);
									
									});
								

								//var test_hack = source_counter;
								

								var anno_del_btn = $("<a/>", {
									class: "btn-mini"
								}).html("X").on("click", function() {

									//Source.removeTempAnnotation(test_hack);
									var rendered_annotations =  $('input.source_temp_id[value='+blank_tile.find('.tile_id').val()+']').parent();
					                rendered_annotations.remove();

					                //this removes the annotation object from the global_tiles[tile_id] array
					                global_tiles[blank_tile.find('.tile_id').val()] = $.grep(global_tiles[blank_tile.find('.tile_id').val()], function(n,i) {
					      
					                  return n.source_temp_id != blank_tile.find('.tile_id').val();
					                 });


								}).prependTo(anno_element);
								
								$(anno_element).appendTo(blank_tile.find('.tile_modal_annotations'));







				if(options.save){
					options.save(width,height,top_pos,left,label,tagobj);
				console.log('in');
				}


				
			});








			
			$(".jTagSaveClose",container).click(function(){
				obj.hideDrag();
			});
			
			if(options.resizable){
			
				jtagdrag.resizable({
					containment: obj.parent(),
					minWidth: options.minWidth,
					minHeight: options.minHeight,
					maxWidth: options.maxWidth,
					maxHeight: options.maxHeight,
					resize: function(){
						jtagdrag.css({backgroundPosition: position(overlay)});
					},
					stop: function(){
						jtagdrag.css({backgroundPosition: position(overlay)});
					}
				});
			
			}
		
			if(options.draggable){
		//console.log('this should be draggable');
				jtagdrag.draggable({
					containment: obj.parent(),
					drag: function(){
						//console.log('dragging');
						//console.log(overlay);
						jtagdrag.css({backgroundPosition: position(overlay)});
					},
					stop: function(){
						//console.log('drag stop');
						//console.log(jtagdrag);
						jtagdrag.css({backgroundPosition: position(overlay)});
					}
				});
			
			}
			
			jtagdrag.css({backgroundPosition: position(overlay)});
		},
		addTag: function(width,height,top_pos,left,label,id){
			
			var obj = $(this);
			
			var options = obj.data('options');
			var count = $(".jTagTag").length+1;
			
			tag = $('<div class="jTagTag" id="tag'+count+'"style="width:'+width+'px;height:'+height+'px;top:'+top_pos+'px;left:'+left+'px;"><div style="width:100%;height:100%"><div class="jTagDeleteTag"></div><span>'+label+'</span></div></div>')
						.appendTo(obj.prev());
			
			if(id){
				tag.setId(id);
			}
			
			if(options.canDelete){
				obj.parent().find(".jTagDeleteTag").show();
			}
			
			if(options.showTag == "always"){
				$(".jTagTag").css("opacity",1);
			}
			
			if(options.showLabels){
				$("<label rel='tag"+count+"'>"+label+"</label>").insertBefore($(".jTagLabels div:last"));
			}
			
			obj.hideDrag();
			
			return tag;
			
		},
		setId: function(id){
			if($(this).hasClass("jTagTag")){
				$(this).data("tagid",id);
			} else {
				alert('Wrong object');
			}
		},
		getId: function(id){
			if($(this).hasClass("jTagTag")){
				return $(this).data("tagid");
			} else {
				alert('Wrong object');
			}
		},
		enableClickToTag: function(){
			
			var obj = $(this);
			var options = obj.data('options');
			
			if(options.clickToTag){
				
				obj.parent().mousedown(function(e){
					obj.showDrag(e);
					obj.parent().unbind('mousedown');
				});
			}
		},
		disableClickToTag: function(){
			
			var obj = $(this);
			var options = obj.data('options');
			
			if(options.clickToTag){
				obj.parent().unbind('mousedown');
			}
		}
	});
})(jQuery);
