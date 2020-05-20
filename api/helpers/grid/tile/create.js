module.exports = {


  friendlyName: 'Create tile',


  description: '',


  inputs: {
    info: {
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
    var info = inputs.info;
    console.log("create grid tile info",info);
    var grid_id = info['grid_id'];
    var tile_id = info['tile_id'];
    var project_id = info['project_id'];
    await Grid.addToCollection(grid_id, 'tiles').members(tile_id);
    var grid_tile = {};
    if(info['location'])
    {
      info['location']["grid_id"] = grid_id;
      info['location']["tile_id"] = tile_id;
      info['location']["project_id"] = project_id;
      grid_tile = await Location.create(info['location']).fetch();
      // grid_tile.location = location.location_id;
    }
    grid_tile.grid_tile_id = grid_tile.location_id;
    await Grid.removeFromCollection(grid_id, 'floating_tiles').members(tile_id);

    return grid_tile;

    /*
      TODO need to save ..

      $info['user_id'] = $this->user_id;
    	$grid_tile = new Grid_Tiles();
    	$grid_tile->tile_id = $info['tile_id'];
    	$grid_tile->grid_id = $info['grid_id'];
    	$grid_id = $grid_tile->grid_id;
    	$grid_tile->grid_tile_version = 0;
    	if(isset($info['location']))
    	{
	    	$location = $this->create_grid_location($info['location']);
	    	$grid_tile.location_id = $location->location_id;
    	}else if(isset($info['location_id']))
    	{
    		$grid_tile->location_id = $info['location_id'];
    	}
    	else
    	{
    		$grid_tile->location_id = 0;
    	}
      $grid_tile->save();	
      $this->update_grid_time($grid_id);
      
      return $grid_tile; 

      need to add tile to grid tiles
      need to create location record
      $_POST['grid_tiles'][0]['tile_id'] = 2; 
      $_POST['grid_tiles'][0]['grid_id'] = 5023; 

      then need to save location 
      $_POST['grid_tiles'][0]['location']['x'] = 2; 
      $_POST['grid_tiles'][0]['location']['x'] = 2; 
      $_POST['grid_tiles'][0]['location']['length'] = 2; 
      $_POST['grid_tiles'][0]['location']['width'] = 2; 

      then 
      need to save location id in grid_tile Created.


      use
      await Grid.addToCollection(3, 'pets').members([99,98]);

      */ 
    //   $info['user_id'] = $this->user_id;
    //   $grid_tile = new Grid_Tiles();
    //   $grid_tile->tile_id = $info['tile_id'];
    //   $grid_tile->grid_id = $info['grid_id'];
    //   $grid_id = $grid_tile->grid_id;
    //   $grid_tile->grid_tile_version = 0;
    //   if(isset($info['location']))
    //   {
    //     $location = $this->create_grid_location($info['location']);
    //     $grid_tile->location_id = $location->location_id;
    //   }else if(isset($info['location_id']))
    //   {
    //     $grid_tile->location_id = $info['location_id'];
    //   }
    //   else
    //   {
    //     $grid_tile->location_id = 0;
    //   }
    // $grid_tile->save();	
    // $this->update_grid_time($grid_id);
    
    // return $grid_tile; 
  }


};

