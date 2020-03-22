module.exports = {


  friendlyName: 'Update',


  description: 'Update tile.',


  inputs: {
    tile_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    info: {
      description: 'info for making a grid',
      required: true,
      type: "ref",
    },
    place_on_grid: {
        description: 'req object posted',
        required: false,
        defaultsTo: false,
        type: "ref",
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var tile_id = inputs.tile_id;
    var info = inputs.info;
    var place_on_grid = inputs.place_on_grid;
    var tile = await Tile.updateOne({tile_id:tile_id}).set(info);
    if (tile.tile_type !== 'header') {
      // clear annotions
      // save annoations
      //info['annotation_ids'] [3,34,4]
      if(info['annotation_ids']){
        await Tile.replaceCollection(tile_id,"annotations").members(info['annotation_ids']);
      }
      if(info.annotations){
        console.log("info.annotations",info.annotations);
        info.annotations = await sails.helpers.source.saveAnnotations(tile_id,info.annotations);
        console.log("info.annotations post",info.annotations);
      }
      if(info['tile_tags']){
        var tags = info['tile_tags'].split(",");
        var tag_ids = [];
        for (let i = 0; i < tags.length; i++) {
          var tag = tags[i];
          tag = await Tag.findOrCreate({tag_content:tag},{tag_content:tag});
          tag_ids.push(tag.id);
        }
        //info['tile_tags'] "tere,fefee,fefe"
        await Tile.replaceCollection(tile_id,"tags").members(tag_ids);
      }
      
    }
    var grid_tiles = await sails.helpers.tile.place(tile.tile_id,place_on_grid);
    tile = await Tile.findOne({tile_id:tile_id}).populate("tags").populate("annotations").populate("grids").populate("groups");

    return tile;
    /*
    tile = Tiles::retrieveByPK(tile_id);
		tile.tile_version += 1;
		foreach (info as key => value) {
			tile.key = value;
		}
		tile.tile_modified = date('Y-m-d H:i:s');
		tile.save();	
		if (tile.tile_type !== 'header') {
			tile.annotations = this->save_annotations(tile_id,info);
			tile.tags = this->save_tags(tile_id,info);
		}

		
		if(isset(place_on_grid) && is_array(place_on_grid) && count(place_on_grid) > 0)
		{
			//add this tile to grid_id's floating notes as well as performing the regular edit
			grid_helper = new Grid_Helper();
			info['tile_id'] = tile_id;
			foreach(place_on_grid as grid_id)
			{
				info['grid_id'] = grid_id;
				grid_helper->create_grid_tile(info);

			}
		}
    return tile;
    

      public function update_tile_tags(user_id,tile_id,tags) {
        //delte all tags

        tileTags = new Tile_Tags();
        old_tags = tileTags::retrieveByTileId(tile_id);
        tag_ids = array();
        deleted_tag_ids = array();
        new_tags = array();
        current_tile_tag_ids = array();
        user_id = user_id;
        // stort and load tag_ids
        foreach (tags as tag) {
          tag_id = tag['tag_id'];
          //add new tags
          if (tag_id == 0) {
            new_tags[]=tag;
          }else{
            tag_ids[]= tag_id;
          }
        }
        //keep old tags 
        //delete unused tags
        foreach (old_tags as tag) {
          if (!in_array(tag->tag_id, tag_ids)) {
              deleted_tag_ids[]= tag->tag_id;
              tag->delete();
            
          }
          else{
            if (in_array(tag->tag_id, current_tile_tag_ids)) {
              deleted_tag_ids[]= tag->tag_id;
              tag->delete();
            }
            else{
            current_tile_tag_ids[] =  tag->tag_id;
              
            }
          }
        }
        add_tags = array_diff(tag_ids, deleted_tag_ids);
        this->add_new_tile_tags(tile_id,user_id,add_tags);
        //create new tags
        this->create_new_tile_tags(tile_id,user_id,new_tags);
        // delete unused tags 
        this->delete_unused_tags(deleted_tag_ids);

        
        }
    */
  }


};

