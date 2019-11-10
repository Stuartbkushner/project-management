module.exports = {


  friendlyName: 'Delete',


  description: 'Delete tile.',


  inputs: {
    project_id: {
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
    var project_id = inputs.project_id;
    var info = inputs.info;
    var update_project_name = info.hasOwnProperty("project_name");
    
    if(update_project_name){
      slug = await sails.helpers.slug.create('project',info["project_name"]);
      info.slug = slug;
    console.log("update name project_id",project_id);

      var project = await Project.updateOne({project_id:project_id}).set(info);
      project = await Project.findOne({project_id:project_id});
      console.log("update name project",project,{project_id:project_id});
    }else{
      var project = await Project.updateOne({project_id:project_id}).set(info);
      console.log("update",project);
    }
    return project;


    // TODO
    // $project = Projects::retrieveByPK($project_id);
	// 	$project->project_version += 1;
	// 	foreach ($info as $key => $value) {
	// 		$project->$key = $value;
	// 		if ($key =="project_name") {
	// 			$project->slug = $this->create_slug('projects',$value,$this->user_id);
	// 			$this->rename_groups($project_id,$value);
	// 		}
    // 		$project->updated_at = date('Y-m-d H:i:s');
	// 	}
	// 	$project_id = $project->project_id;
	// 	$author = $this->project_author($project_id ,$project);
	// 	$project->author = $author;
	// 	$project->save();
	// 	return $project;
  }


};

