module.exports = {


  friendlyName: 'Create',


  description: 'Create tile.',


  inputs: {
    info: {
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
    var info = inputs.info;
    var place_on_grid = inputs.place_on_grid;
    var user_id =  info.user_id;
    if(info.tags){
      info.tags = await sails.helpers.tag.saveTags(user_id,info.tags);
    }
    
    if(info['tile_title']){
      var tile_title =  info['tile_title'];

    }else{
      var tile_title =  "header";
      info['tile_title'] = tile_title;
    }
    info['slug'] = await sails.helpers.slug.create('tile','tile_title',tile_title,user_id);
    var annotations = info.annotations;
    delete info.annotations;
    console.log("tile create annotations",annotations);
    console.log("tile create info",info);
    var tile = await Tile.create(info).fetch();
    if(place_on_grid){
      var grid_tiles = await sails.helpers.tile.place(tile.tile_id,place_on_grid);
    }
    if(annotations){
      console.log("annotations",annotations);
      annotations = await sails.helpers.source.saveAnnotations(tile.tile_id,annotations);
      console.log("annotations post",info.annotations);

    }
  
    tile = await sails.helpers.tile.get(tile.tile_id);
    console.log("new tile post get",tile);
    
    return tile;
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

