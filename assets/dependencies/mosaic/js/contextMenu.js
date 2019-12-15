$(function(){




$.contextMenu({
			        selector: '.grid', 
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
			            window.console && console.log(m) || alert(m); 
			        },
			        items: 
			        {
			            "newtilefromsource":
			            {
			                name: "New Tile", 
			                icon: "edit", 
			                callback: function(key, options) 
			                {
							    var new_tile_position = options.$menu.position();
			               		var new_tile_position = Grid.getCellCoordinatesByCursorPosition(new_tile_position.left,new_tile_position.top);
    							var tile = Tile.newTile("#fdf8c5",new_tile_position);
							}
						},
						"insertrow":
						{
							name: "Insert Row",
							icon: "copy",
							callback: function(key,options)
							{
								var menu_position = options.$menu.position();
								var cell_coordinates = Grid.getCellCoordinatesByCursorPosition(menu_position.left,menu_position.top);
								var cell_pos = Grid.getPositionByCoordinates(cell_coordinates);
								Grid.insertRow(cell_pos.y);
							}
						},
						"insertcolumn":
						{
							name: "Insert Column",
							icon: "copy",
							callback: function(key,options)
							{
								var menu_position = options.$menu.position();
								var cell_coordinates = Grid.getCellCoordinatesByCursorPosition(menu_position.left,menu_position.top);
								var cell_pos = Grid.getPositionByCoordinates(cell_coordinates);
								Grid.insertColumn(cell_pos.x);
							}
						},

						"deleterow":
						{
							name: "Delete Row",
							icon: "copy",
							callback: function(key,options)
							{
								var menu_position = options.$menu.position();
								var cell_coordinates = Grid.getCellCoordinatesByCursorPosition(menu_position.left,menu_position.top);
								var cell_pos = Grid.getPositionByCoordinates(cell_coordinates);
								Grid.deleteRow(cell_pos.y);
							}
						},
						"deletecolumn":
						{
							name: "Delete Column",
							icon: "copy",
							callback: function(key,options)
							{
								var menu_position = options.$menu.position();
								var cell_coordinates = Grid.getCellCoordinatesByCursorPosition(menu_position.left,menu_position.top);
								var cell_pos = Grid.getPositionByCoordinates(cell_coordinates);
								Grid.deleteColumn(cell_pos.x);
							}
						}

					}

});




$.contextMenu({
			        selector: '.grid .header', 
			        build: function($trigger, e)
			        {
			        		if($(".selectedHeader").length >= 1)
			        		{
			        			if(!$trigger.hasClass("selectedHeader"))
			        			{
			        				//deselect all tiles, select trigger tile
			        				$(".selectedHeader").removeClass("selectedHeader");
			        				$trigger.addClass("selectedHeader");
			        			}
			        		}
			        		else if($(".selectedHeader").length == 0)
			        		{
			        			$trigger.addClass("selectedHeader");
			        		}
			        },
			        zIndex:4,
			        events: {
			        	show: function(options) {

			        	},
			        	hide: function(opt) {
			        		opt.$trigger.removeClass("selectedHeader");
			        	}
			    	},
			        callback: function(key, options) {
			            var m = "global: " + key;
			            window.console && console.log(m) || alert(m); 
			        },
			        items: 
			        {
			            "editheader": {
			                name: "Edit Header", 
			                icon: "edit", 
			                callback: function(key, options) {
			                	var header = options.$trigger;
			                	var header_id = header.find(".template_header_id").val();
			                	Template.editTemplateHeader(header_id);
			                }
			            },
			            "deleteheader": {
			            	name: "Delete Header",
			            	icon: "delete",
			            	callback: function(key, options) {
			                	var header = options.$trigger;
			                	Template.deleteHeader(header);
			            	}

			            }
			        }

});









var j_find = 2;
			$.contextMenu({
			        selector: '.pile .tile', 
			       build: function($trigger, e) {
							var project_list = Array();
					  		
							$.each(User.data.projects, function(key,project) {
									if(project.project_id	!= User.data.settings.current_project_id) {
										project_list.push({name: project.project_name,callback: function(key, options) {
											var tile = Tile.getObjByRenderedTile(options.$trigger);
												Tile.copyTileToProject(tile,project.project_id);
										}});
									}
									});
							

if($($trigger).find(".tileStar").hasClass("favorite"))
{

	var state = true;
	var favorite_option_name = "Remove Favorite";

}
else
{
	var state = false;
	var favorite_option_name = "Favorite";
}

	var menu_item_starred = {
									name: favorite_option_name, 
									icon: "favorite", 
									callback: function(key, options) {
										var tile = Tile.getObjByRenderedTile(options.$trigger);
										Tile.favorite(tile, state);

									}
									};

this.new_items = {
								"view": {
									name: "View", 
									icon: "view", 
									callback: function(key, options) {
										var tile = Tile.getObjByRenderedTile(options.$trigger);
										Tile.openTile(tile);
									}
									},
								"edit": {
									name: "Edit", 
									icon: "edit", 
									callback: function(key, options) {
										var tile = Tile.getObjByRenderedTile(options.$trigger);
										Tile.editTile(tile);
									}
									},
								// "copy2project": {
								// 	name: "Copy to Project &nbsp&nbsp&nbsp&nbsp",
								// 	icon: "copy",
								// 	items: project_list,
								// 	},
								"favorite": menu_item_starred,
								"find": {
									name: "Find On Grid", 
									icon: "find", 
									callback: function(key, options) {

										var tile = Tile.getObjByRenderedTile(options.$trigger);
										
										  var tiles = Tile.getClonesByTileID(tile.tile_id);

										  			$(".tile").removeClass("selectedTile");

										            if(tiles[j_find]){
										              $('.gridInnerWrapper').scrollTo(tiles[j_find]);
										              $(tiles[j_find]).addClass("selectedTile");
										            }
										            else
										            {
										              j_find = 0;
										              if(tiles[j_find])
										              {
											              $('.gridInnerWrapper').scrollTo(tiles[j_find]);
											              $(tiles[j_find]).addClass("selectedTile");
										              }
										              else
										              {
										              	alert('Tile not found on current grid.');
										              }

										            }
										            j_find++;

									}
									},

																	"delete": {
									name: "Delete", 
									icon: "delete", 
									callback: function(key, options) {
										var tile = Tile.getObjByRenderedTile(options.$trigger);
										if (confirm("Are you sure you want to delete ALL instances of this tile?")) {
											Tile.deleteTile(tile);
										}
									}
									}

								// "markinactive": {
								// 	name: "Mark as Inactive", 
								// 	icon: "delete", 
								// 	callback: function(key, options) {
								// 		var tile = Tile.getObjByRenderedTile(options.$trigger);
								// 		Tile.markAsInactive(tile);
								// 	}
								// 	}
						};



  			          return {
						 events: {
								show: function(opt) {
									opt.$trigger.addClass("selectedTile");
								},
								hide: function(opt) {
									opt.$trigger.removeClass("selectedTile");
								}
							},
							callback: function(key, options) {
								var m = "global: " + key;
								window.console && console.log(m) || alert(m); 
							},


							items: this.new_items
					};
		 },
						   
						   
});




$.contextMenu({
			        selector: '.textLayer div', 
			        trigger: 'none',
			        callback: function(key, options) {
			            var m = "global: " + key;
			            window.console && console.log(m) || alert(m); 
			        },
			        items: {
			        	

			            "newtile": {
			                name: "New Tile", 
			                icon: "copy", 
			                callback: function(key, options) {

			                	
			                	//$(".textLayer div").contextMenu("hide");

				                //var tile = Tile.getObjByRenderedTile(options.$trigger);
				                //Tile.markAsActive(tile);
 								var selection_text = getSelectionText();
 								var blank_tile = Tile.newTile("#fdf8c5");




 								Tile.addAnnotation(blank_tile,selection_text);
								 //give our tile a temporary id
								 //THIS SUCKS NEEDS TO BE REPLACED WITH A RANDOM ID WILL NOT WORK CONSISTENT
								

						          //bind our "save tile" button, for this function, we need to reload the pile
						          blank_tile.find('.create_tile_button').on("click", function()
						          {
						            Tile.viewSourceSaveTile($(blank_tile),true,true,true);
						          });


						          blank_tile.find('.shared_with_list').html("None");
						          blank_tile.find('.used_on_grids_list').html("None");


								//var current_page_num = pageNum;
							
								

								//var test_hack = source_counter;
							


//$("#new_tile_source_id").val($("#view_source_source_id").val());
								
								//source_annotations = new Array();
								
								
								//console.log(source_annotations);
								//source_counter++;


//$("#shared_with_list").hide();
//$("#shared_with_label").hide();
//$("#used_on_label").hide();
//$("#new_tile_source_container").hide();
//$("#sourceSelectionTiles").show();
//$("#select_source_label").hide();
//$("#new_tile_source").hide();
								//$("#tile_id").val(0);
								  

								  //$("#new_tile_source").val($("#view_source_source_id").val());
								  //pageNum = 1;

								  //console.log(source_id);


								  //hide the save and create new btn, can't do that for new tile on grid
								  //$("#save_and_create_new_tile_btn").hide();


								  //$("#new_tile_modal").css('zIndex',1051);
						     // $("#new_tile_modal").modal('show');
						   
						     // Tile.selectColor("new_tile_modal","#f47a7a");
								
			                }
			                },


"cancel": {
			        		name: "Cancel",
			        		icon: "delete",
			        		callback: function(key, options) {
			        			Tile.setCaptureMode(false);
			        		}
			        	}


			    }
});






$.contextMenu({
			        selector: '.grid .tile',
					build: function($trigger, e) {
										 
					 var count_selected_tiles = 0;
					 var count_tiles_from_single_group = 0;
					 var single_group = 0;
					
					
						//if more than one tile is selected, don't select additional items on show
			        		if($(".selectedTile").length >= 1)
			        		{
			        			
			        			if($trigger.hasClass("selectedTile"))
			        			{

			        			}
			        			else
			        			{
			        				//deselect all tiles, select trigger tile
			        				$(".grid .tile").removeClass("selectedTile");
			        				$trigger.addClass("selectedTile");
			        			}
			        		}
			        		else if($(".selectedTile").length == 0)
			        		{
			        			$trigger.addClass("selectedTile");
			        		}
					
						
					
					 $.each(Tile.getSelectedTiles(), function(key,value) {
						 var tile = Tile.getObjByRenderedTile($(value));
						 if(single_group == 0 && tile.tile_group.group_id) {
							single_group = tile.tile_group.group_id;
							count_tiles_from_single_group = 1; 
						 }
						 else if(tile.tile_group.group_id == single_group) {
							count_tiles_from_single_group++;	
						 }
						 count_selected_tiles++;
					 });
					 
					 var none_are_grouped = true;
					 var some_are_grouped = false;
					 var all_same_group = false;

					if(count_tiles_from_single_group != 0) {
						none_are_grouped = false;
						some_are_grouped = true;
						if(count_tiles_from_single_group == count_selected_tiles) {
							all_same_group = true;	
						}
					};
						
						
					
									 
					  var group_list = Array();
					  var grid_list = Array();
					  var group_grid_list = Array();

					  // console.log('User.data',User.data);
					  var my_groups = User.data.active_grid.groups;
					  var my_grids = User.data.grids;



							$.each(my_groups, function(key,value) {
									group_list.push({name: value.tile_group_title,callback: function(key, options) {
											Tile.addTilesToGroup(Tile.getSelectedTiles(),value.tile_group_id);
									}});
									
								});




							$.each(my_grids, function(key,value) {
									grid_list.push({name: value.grid_title,callback: function(key, options) {
											Tile.placeOnGrid(Tile.getSelectedTiles(),value.grid_id);

									}});

									group_grid_list.push({name: value.grid_title,callback: function(key, options) {
										console.log("wtfmate");
											// var tiles = Tile.getTilesByGroupID(single_group);
											// Tile.placeOnGrid(tiles,value.grid_id);

									}});



								});


					 
  			          return {
						         events: {
			        	show: function(opt) {

			        	

			        	},
			        	hide: function(opt) {
			        		//opt.$trigger.removeClass("selectedTile");
			        		//if only one item is selected, deselect the tile on hide
			        		if($(".selectedTile").length == 1)
			        		{
			        			//opt.$trigger.removeClass("selectedTile");
			        		}


			        	}
			        },
			        callback: function(key, options) {
			            var m = "global: " + key;
			            window.console && console.log(m) || alert(m); 
			        },
			        items: {
			            "view": {
									name: "View", 
									icon: "view", 
									callback: function(key, options) {
										var tile = Tile.getObjByRenderedTile(options.$trigger);
										Tile.openTile(tile);
									}
									},
			            "edit": {
			                name: "Edit", 
			                icon: "edit", 
			                callback: function(key, options) {
			                	var tile = Tile.getObjByRenderedTile(options.$trigger);
			                	Tile.editTile(tile);
			                }
			                },

			            "removefromgrid": {
			                name: "Remove from Grid", 
			                icon: "cut", 
			                callback: function(key, options) {
				                
			                	//get selected tiles
			                	var tiles = Tile.getSelectedTiles();
			                	$.each(tiles, function(index,value) {
			                		var tile = Tile.getObjByRenderedTile($(value));
			                		Tile.removeFromGrid(tile);
			                	});

				                //var tile = Tile.getObjByRenderedTile(options.$trigger);
				                //Tile.removeFromGrid(tile);
			                }
			                },
			            "copytonewgrid": {
			                name: "Copy to new Grid", 
			                icon: "copy", 
			                callback: function(key, options) {
			                	Tile.copyToNewGrid();
			                }
			                },
			            "movetonewgrid": {
			                name: "Move to new Grid", 
			                icon: "paste", 
			                callback: function(key, options) {
			                	Tile.moveToNewGrid();
			                }
			                },
			            "placeongrid": {
			                name: "Place on Grid", 
			                icon: "paste", 
										//disabled: (!none_are_grouped || group_list.length==0),
										items: grid_list
										// callback: function(key, options) {


										// 	//NOT FINISHED
										// 	$(".grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
										// 	Tile.moveToNewGrid(Tile.getSelectedTiles());
											
										// }

				                // callback: function(key, options) {

				                // 	var tiles = [];
				                // 	var selected_tiles = Tile.getSelectedTiles();
				                // 	$.each(selected_tiles, function(index,val) {
				                // 		console.log(val);

				                // 		var tile = Tile.getObjByRenderedTile(options.$trigger);
				                // 		var tile_id = tile.tile_id;

				                // 		tiles.push({"tile_id":1,"grid_id":2});
				                // 	});

				                // 	console.log(tiles);


				                // 	//Tile.placeOnGrid(selected_tiles);
				                	
				                // }
			                },


			                			            "delete": {
			                name: "Delete", 
			                icon: "delete", 
			                callback: function(key, options) {
								var tile = Tile.getObjByRenderedTile(options.$trigger);
				                if (confirm("Are you sure you want to delete ALL instances of this tile?")) {
									Tile.deleteTile(tile);
								}
				            }
			            	},

			            "group": {
			                name: "Group", 
			                icon: "copy",
							disabled: !none_are_grouped, 
			                callback: function(key, options) {
								Tile.groupTiles(Tile.getSelectedTiles());
							}
			                },
			            "ungroup": {
			                name: "Ungroup", 
			                icon: "cut", 
							disabled: !some_are_grouped,
			                callback: function(key, options) {
								Tile.ungroupTiles(Tile.getSelectedTiles());
							}
			                },

			            "addtogroup": {
			                name: "Add to Group", 
			                icon: "copy", 
							disabled: (!none_are_grouped || group_list.length==0),
							items: group_list
			                },
						 separator1: "-----",
						 "group_menu": {
								name: "Group",
								icon: "copy",
								disabled: !all_same_group,
								items: {
									item0: {
										name: "Edit Group info",
										icon: "edit",
										callback: function(key, options) {

											var group_name = $trigger.find(".group_name").val();
											var group_description = $trigger.find(".group_description").val();
											var group_id = $trigger.find(".group_id").val();
											var group_border = $trigger.find(".group_border").val();

											Tile.editGroup(group_id,group_name,group_description,group_border);
										}
									},
									item1: {
										name: "Copy to new grid",
										icon: "copy",
										callback: function(key, options) {



											$(".grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
											Tile.copyToNewGrid(Tile.getSelectedTiles());

										}
									},
									item2: {
										name: "Move to new grid",
										icon: "copy",
										callback: function(key, options) {



											$(".grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
											Tile.moveToNewGrid(Tile.getSelectedTiles());
											
										}
									},
			       //      item3: {
			       //          name: "Place Group on Grid", 
			       //          icon: "paste", 
										// //disabled: (!none_are_grouped || group_list.length==0),
										// items: group_grid_list
										// // callback: function(key, options) {


										// // 	//NOT FINISHED
										// // 	$(".grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
										// // 	Tile.moveToNewGrid(Tile.getSelectedTiles());
											
										// // }

				      //           // callback: function(key, options) {

				      //           // 	var tiles = [];
				      //           // 	var selected_tiles = Tile.getSelectedTiles();
				      //           // 	$.each(selected_tiles, function(index,val) {
				      //           // 		console.log(val);

				      //           // 		var tile = Tile.getObjByRenderedTile(options.$trigger);
				      //           // 		var tile_id = tile.tile_id;

				      //           // 		tiles.push({"tile_id":1,"grid_id":2});
				      //           // 	});

				      //           // 	console.log(tiles);


				      //           // 	//Tile.placeOnGrid(selected_tiles);
				                	
				      //           // }
			       //          },
									// item2: {
									// 	name: "Ungroup",
									// 	icon: "delete",
									// 	callback: function(key, options) {
									// 		$("#grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
									// 		Tile.ungroupTiles(Tile.getSelectedTiles());
									// 	}
										
									// }
									// item3: {
									// 	name: "Remove from grid",
									// 	icon: "cut",
									// 	 callback: function(key, options) {
									// 		$("#grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
									// 		//get selected tiles
									// 		var tiles = Tile.getSelectedTiles();
									// 		$.each(tiles, function(index,value) {
									// 			var tile = Tile.getObjByRenderedTile($(value));
									// 			Tile.removeFromGrid(tile);
									// 		});
			
									// 		//var tile = Tile.getObjByRenderedTile(options.$trigger);
									// 		//Tile.removeFromGrid(tile);
									// 	},
										
									// },
									// item4: {
									// 	name: "Delete",
									// 	icon: "delete",
									// 	callback: function(key, options) {
									// 		$("#grid input.group_id[value='"+single_group+"']").parent('.tile').addClass("selectedTile");
									// 		var tiles = Tile.getSelectedTiles();
									// 		if (confirm("Are you sure you want to delete ALL instances of this tile?")) {
									// 			$.each(tiles, function(index,value) {
									// 				var tile = Tile.getObjByRenderedTile($(value));
									// 				Tile.deleteTile(tile);
									// 			});
									// 		}
									// 	},
										
									// }
									
								}
						 }
			            }

					};
		 },
						   
						   
});

});
