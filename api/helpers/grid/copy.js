module.exports = {


  friendlyName: 'Copy',


  description: 'Copy grid.',


  inputs: {
    user_id: {
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
    var grid_id = inputs.grid_id;
    var update = inputs.update;
    // //TODO: relace note with grid in grids db table
		// copied_notes =  [];
		// copied_sources =  [];
		// copied_tiles =  [];

    // var grid = await Grid.findOne({grid_id:grid_id})
    //   .populate("tiles",{select:["tile_id"]})
    //   .populate("floating_tiles",{select:["tile_id"]})
    //   .populate("locations");

    
    
    //   //need to duplicate locations

    // 	new_grid = {};
    // 	grid.grid_lock_user_id = 0;
    // 	grid.grid_privacy_user_id = 0;

    // grid.user_id = this.user_id;
    // delete grid.grid_id;
    // new_grid = Object.assign(grid, update);
    // new_grid = await Grid.create(new_grid).fetch();
    // var locationIds = [];
    // for (let i = 0; i < grid.locations.length; i++) {
    //   const location = grid.locations[i];
    //   delete location.location_id;
    //   location.grid_id = new_grid.id;
    //   var new_location = Location.create(location).fetch();
    //   locationIds.push(new_location.location_id);
      
    // }
    // Grid.addToCollection(new_grid.id,"locations").members(locationIds);


		// title = new_grid.grid_title;
		// new_grid.slug = await sails.helpers.slug.create('grid',title,user_id);
		// new_grid = await Grid.create(new_grid).fetch();
    // grid_tiles = await Tile.find({grid_id:grid_id})
    //   .populate("grids",{select:["grid_id"]})
    //   .populate("groups",{select:["group_id"]})
    //   .populate("annotations",{select:["annotation_id"]})
    //   .populate("tags",{select:["tag_id"]});
		// sourceHelper = new Source_Helper();
		// publish_source = false;
		// foreach (grid_tiles as grid_tile) {
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
    // 			notes = sourceHelper.get_tile_notes(tile_id);
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
    // 					new_source = sourceHelper.copy_source(source_id,update);
    // 					copied_sources[source_id] = new_source.source_id  ;

    // 				}
    // 				if (!copied_note) {
    // 					copied_notes[] = note_id;
    // 					update['project_id'] = new_grid.project_id;
    // 					update['user_id'] = new_grid.user_id;
    // 					update['tile_id'] = new_tile.tile_id;
    // 					update['source_id'] = copied_sources[source_id];
    // 					sourceHelper.copy_note(note_id,update,note);
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

