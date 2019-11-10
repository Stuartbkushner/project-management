module.exports = {


  friendlyName: 'Delete',


  description: 'Delete tile.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // if(is_null($owner_id)) {
    //     return FALSE;	
    // }
    // if(!$all_projects) {
    //     var_dump($project_id);
        
    //     $project = $this->get_project($project_id);
    //     $tiles = $project->tiles;

    //     $output = strip_tags($project->project_description)."\n";
    //     $table = $project->project_name;
    //     //Lower case everything
    //     $table = strtolower($table);
    //     //Make alphanumeric (removes all other characters)
    //     $table = preg_replace("/[^a-z0-9_\s-]/", "", $table);
    //     //Clean up multiple dashes or whitespaces
    //     $table = preg_replace("/[\s-]+/", " ", $table);
    //     //Convert whitespaces and underscore to dash
    //     $table = preg_replace("/[\s_]/", "-", $table);
    // }
    // else {
    //     $query = "SELECT id,tile_title,tile_content 
    //         FROM tiles WHERE tile_user_id =$owner_id";
    //     $tiles = Tiles::sql($query);
        
    //     $output = "";
    //     $table = "all_notes";	
    // }
    

    // $output .= '"ID",';
    // $output .= '"Title",';
    // $output .= '"Content",';
    // $output .="\n";
    
    // // Get Records from the table
    // foreach ($tiles as $tile) {

    //     $output .= '"'.strip_tags($tile->tile_id).'",';
    //     $output .= '"'.strip_tags($tile->tile_title).'",';
    //     $output .= '"'.strip_tags($tile->tile_content).'",';
    //     $output .="\n";
    // }

    
    // // Download the file
    // $filename = $table.".csv";
    // header('Content-type: application/csv');
    // header('Content-Disposition: attachment; filename='.$filename);
    // echo $output;
    // return TRUE;
  }


};

