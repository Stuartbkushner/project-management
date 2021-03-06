module.exports = {


  friendlyName: 'Create',


  description: 'Create tile.',


  inputs: {
    tile_id: {
        description: 'req object posted',
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
    var place_on_grid = inputs.place_on_grid;
    var grid_tiles = [];
    if(place_on_grid !== false){
      for (let i = 0; i < place_on_grid.length; i++) {
        const grid_id = place_on_grid[i];
        var place_info = {};
        place_info['grid_id'] = grid_id;
        place_info['tile_id'] = tile_id;
        var grid_tile = await sails.helpers.grid.tile.create(place_info); 
        grid_tiles.push(grid_tile);
      }
    }
    return grid_tiles;
    /*
    public function create_tile($info,$place_on_grid = false) {
        $tile = new Tiles($info,SimpleOrm::LOAD_NEW);
        $source = new Source_Helper();

      $tile->save();
      $tile_id = $tile->tile_id;


      if(isset($place_on_grid) && is_array($place_on_grid) && count($place_on_grid) > 0)
      {
        //add this tile to grid_id's floating notes as well as performing the regular edit
        $grid_helper = new Grid_Helper();
        $place_info = array();
        $place_info['tile_id'] = $tile_id;
        foreach($place_on_grid as $grid_id)
        {
          $place_info['grid_id'] = $grid_id;
          $grid_helper->create_grid_tile($place_info);

        }
      }

      $source_notes = array();
      if ($info['tile_type'] !== 'header') {
        $tile->annotations = $this->save_annotations($tile_id,$info);
        $tile->tags = $this->save_tags($tile_id,$info);
      }
      return $tile;
      }
      */
  }


};

