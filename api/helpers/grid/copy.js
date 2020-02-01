module.exports = {


  friendlyName: 'Copy',


  description: 'Copy grid.',


  inputs: {
    user_id: {
      description: 'user id of user owner',
      required: true,
      type: "number",
    },
    team_id: {
      description: 'user id of user owner',
      required: true,
      type: "number",
    },
    grid_id: {
      description: 'grid id of grid owner',
      required: true,
      type: "number",
    },
    update: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    var user_id = inputs.user_id;
    var team_id = inputs.team_id;
    var grid_id = inputs.grid_id;
    var update = inputs.update;
    console.log("helpers grid copy grid inputs",inputs);

    // //TODO: relace note with grid in grids db table


    /*
        get all grid_tiles by grid id populate location

        for each grid tile
          copy grid tile 
            set grid_id to new grid 
            keep tile id
            copy locaion 
            set new location to grid tile copy location id
        
        add tile ids to new grid tiles collects so "shows up on grid" for tiles collected
        
        get all grid floating tile ids
          add them to new grid floating tile collection 



    */

    var grid = await Grid.findOne({grid_id:grid_id}).populate("locations").populate("floating_tiles");
    var locations = grid.locations;
    var floating_tiles = grid.floating_tiles;
    delete grid.grid_id;
    delete grid.locations;
    console.log("helpers grid copy grid grid",grid);
    console.log("helpers grid copy grid locations",locations);
    console.log("helpers grid copy grid floating_tiles",floating_tiles);

    update.user_id =  user_id;
    update.team_id =  team_id;

    var newGridInfo = Object.assign(grid, update);
    delete newGridInfo.grid_lock_user_id;
    delete newGridInfo.grid_privacy_user_id;
    console.log("helpers grid copy grid newGridInfo",newGridInfo);

    var newGrid = await Grid.create(newGridInfo).fetch();
    var newGrid = await Grid.findOne({grid_id:newGrid.grid_id}).populate("floating_tiles");
    console.log("helpers grid copy grid newGrid",newGrid);
    console.log("helpers grid copy grid newGrid.floating_tiles",newGrid.floating_tiles);


    
    var tileIds = [];
    var floatingTileIds = [];
    for (let i = 0; i < locations.length; i++) {
      var location = locations[i];
      location.grid_id = newGrid.grid_id;
      delete location.location_id;
      var newLocation = await Location.create(location).fetch();
      tileIds.push(location.tile_id);
    }
    for (let i = 0; i < floating_tiles.length; i++) {
      const tile = floating_tiles[i];
      floatingTileIds.push(tile.tile_id);
    }
    console.log("helpers grid copy grid tileIds",tileIds);
    console.log("helpers grid copy grid floatingTileIds",floatingTileIds);

    await Grid.addToCollection(newGrid.grid_id, "tiles").members(tileIds);
    await Grid.addToCollection(newGrid.grid_id, "floating_tiles").members(floatingTileIds);

    var newGrid = await Grid.findOne({grid_id:newGrid.grid_id}).populate("tiles").populate("locations").populate("floating_tiles");
    console.log("helpers grid copy grid newGrid",newGrid);
    return newGrid;

		// copied_notes =  [];
		// copied_sources =  [];
		// copied_tiles =  [];
    // console.log("helpers grid copy inputs",inputs);

    // var grid = await Grid.findOne({grid_id:grid_id})
    //   .populate("tiles",{select:["tile_id"]})
    //   .populate("floating_tiles",{select:["tile_id"]})
    //   .populate("locations");

    //   console.log("helpers grid copy old grid",grid);
    
    
    //   // need to duplicate locations

    // 	new_grid = {};
    // 	grid.grid_lock_user_id = 0;
    // 	grid.grid_privacy_user_id = 0;

    // grid.user_id = user_id;
    // delete grid.grid_id;
    // new_grid = Object.assign(grid, update);
    // var title = new_grid.grid_title;
    // new_grid.slug = await sails.helpers.slug.create('grid',title,user_id);
    // console.log("helpers grid copy new_grid.slug",new_grid.slug);
    
    // new_grid = await Grid.create(new_grid).fetch();
    // console.log("helpers grid copy new_grid",new_grid);

    // var locationIds = [];
    // for (let i = 0; i < grid.locations.length; i++) {
    //   var location = grid.locations[i];
    //   delete location.location_id;
    //   location.grid_id = new_grid.id;
    //   var new_location = await Location.create(location).fetch();
    //   console.log("helpers grid copy new_location",new_location);
    //   locationIds.push(new_location.location_id);
      
    // }
    // console.log("helpers grid copy locationIds",locationIds);

    // await Grid.addToCollection(new_grid.id,"locations").members(locationIds);





		
    // grid_tiles = await Tile.find({grid_id:grid_id})
    //   .populate("grids",{select:["grid_id"]})
    //   .populate("groups",{select:["group_id"]})
    //   .populate("annotations",{select:["annotation_id"]})
    //   .populate("tags",{select:["tag_id"]});
    // publish_source = false;
    // for (let i = 0; i < grid_tiles.length; i++) {
    //   var grid_tile = grid_tiles[i];
      
		// 	grid_tile_id = grid_tile.grid_tile_id;
		// 	tile_id = grid_tile.tile_id;
		// 	update['user_id'] = new_grid.user_id;
    // 		new_tile = tile_helper.copy_tile(tile_id,update);
		// 	update['tile_id'] = new_tile.tile_id;
		// 	update['grid_id'] = new_grid.grid_id;
    // 		new_grid_tile=this.copy_grid_tile(grid_tile_id,update,grid_tile);
		// 	update_group_tile['grid_tile_id'] = new_grid_tile.grid_tile_id;
		// 	update_group_tile['user_id'] = new_grid.user_id;
    // 		new_group_tile=this.copy_group_tile(grid_tile_id,update_group_tile);
    // 		copied_tile = in_array(tile_id, copied_tiles);
    // 		if (!copied_tile) {
    // 			//get tile notes
    // 			notes = await sails.helpers.source.get_tile_notes(tile_id);
    // 			foreach (notes as note) {
    // 				copied_tiles[] = tile_id;
    // 				note_id = note.annotation_id;
    // 				source_id = note.source_id;
    // 				copied_note = in_array(note_id, copied_notes);
    // 				copied_source = isset(copied_sources[source_id]);
    				
    // 				if (!copied_source) {
    // 					if (publish_source == false) {
    // 						update['source_filename'] = '';
	  //   					update['source_sys_filename'] = '';
	  //   					update['slug'] = '';
    // 					}
    // 					update['project_id'] = new_grid.project_id;
    // 					update['user_id'] = new_grid.user_id;
    // 					new_source = await sails.helpers.source.copy_source(source_id,update);
    // 					copied_sources[source_id] = new_source.source_id  ;

    // 				}
    // 				if (!copied_note) {
    // 					copied_notes[] = note_id;
    // 					update['project_id'] = new_grid.project_id;
    // 					update['user_id'] = new_grid.user_id;
    // 					update['tile_id'] = new_tile.tile_id;
    // 					update['source_id'] = copied_sources[source_id];
    // 					await sails.helpers.source.copy_note(note_id,update,note);
    // 				}


    // 			}
    // 			// copy notes
    // 			// copy
    // 		}
		// }
		// new_grid_id = new_grid.grid_id;
		// group_grid = this.add_project_grid(new_grid); // not dupliate if it exist. 

		// return this.get_grid(new_grid_id,false);
  }


};

