module.exports = {


  friendlyName: 'UPdate',


  description: 'UPdate tile group.',


  inputs: {
    tile_group_id: {
      description: 'user id of grid owner',
      required: true,
      type: "number",
    },
    info: {
      description: 'info for making a grid',
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
    var tile_group_id = inputs.tile_group_id;
    var info = inputs.info;
    var update_tile_group_title = info.hasOwnProperty("tile_group_title");
    
    if(update_tile_group_title){
        info['slug'] = await sails.helpers.slug.create('tile_group',info['tile_group_title'],1);
    }
    var updateGroup = await Tile_Group.update({tile_group_id:tile_group_id}).set(info).fetch();
    return updateGroup;


    // TODO
    // $tile_group = Tile_Groups::retrieveByPK($tile_group_id);
	// 	$tile_group->tile_group_version += 1;
	// 	foreach ($info as $key => $value) {
	// 		$tile_group->$key = $value;
	// 		if ($key =="tile_group_title") {
	// 			$tile_group->slug = $this->create_slug('tile_groups',$value,$this->user_id);
	// 			$this->retitle_groups($tile_group_id,$value);
	// 		}
    // 		$tile_group->updated_at = date('Y-m-d H:i:s');
	// 	}
	// 	$tile_group_id = $tile_group->tile_group_id;
	// 	$author = $this->tile_group_author($tile_group_id ,$tile_group);
	// 	$tile_group->author = $author;
	// 	$tile_group->save();
	// 	return $tile_group;
  }


};

