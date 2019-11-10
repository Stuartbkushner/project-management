module.exports = {


  friendlyName: 'Create tile',


  description: '',


  inputs: {
    grid_tiles: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
    grid_id: {
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
    var grid_tiles = inputs.grid_tiles;
    var grid_id = inputs.grid_id;
    var new_grid_tiles = []
    for (let i = 0; i < grid_tiles.length; i++) {
        const grid_tile = grid_tiles[i];
        if(grid_id){
            grid_tile['grid_id'] = grid_id;
        }   
        grid_tile = await sails.helpers.grid.tile.create(grid_tile) ;
        new_grid_tiles.push(grid_tile);
    }
    return new_grid_tiles;

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

