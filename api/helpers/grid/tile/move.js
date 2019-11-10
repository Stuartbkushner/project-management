module.exports = {


  friendlyName: 'Update',


  description: 'Update tile.',


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
    var grid_tile_id = info['grid_tile_id'];
    var location = await Location.updateOne({location_id:grid_tile_id}).set(info);
    return location;

    // TODO
    // $grid_tile = Grid_Tiles::retrieveByPK($grid_tile_id);
		// $grid_tile->grid_tile_version += 1;
		// $grid_id = $grid_tile->grid_id;

		// foreach ($info as $key => $value) {
		// 	$grid_tile->$key = $value;
		// }
		// $grid_tile->save();
		// $this->update_grid_time($grid_id);
		// return $grid_tile;	
  }


};

