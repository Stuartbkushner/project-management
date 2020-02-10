module.exports = {


  friendlyName: 'Create slug',


  description: 'creates slug.',


  inputs: {
    user_id: {
      description: 'model this slug is for',
      required: true,
      type: "string",

    },
    notes: {
      description: 'title/ name of slug',
      required: true,
      // type: "string",
      type: "ref",
    },



  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var notes = inputs.notes;
    var user_id = inputs.user_id;
    var noteIds = [];
    // for (let i = 0; i < notes.length; i++) {
    //   var annotation_data = notes[i];
      


		// source_page_image = '<img class="sourcePageImage" src="http://localhost:8888/mosaic-app/users/182/uploads/T6nFrQ-1.jpg">';
		// image_source = (string) reset(simplexml_import_dom(DOMDocument::loadHTML(source_page_image))->xpath("//img/@src"));

    //     var source_page = await Source_Page.find({source_page_number: annotation_data['source_page']});
    //     var source_page_content = source_page.source_page_content;
    //     var source_user_id = source_page.user_id;

		//     var image_source = "../../../users/".source_user_id."/uploads/".source_page_content."";

    //     var targ_w = annotation_data['c_w'];
    //     var targ_h = annotation_data['c_h'];
    //     var jpeg_quality = 100;
    //     var src = '.'.image_source;

    //     var img_r = this->resizeImage(src,annotation_data['bounds_0'],annotation_data['bounds_1']);
    //     var dst_r = ImageCreateTrueColor( targ_w, targ_h );

    //     imagecopyresampled(dst_r,img_r,0,0,annotation_data['c_x'],annotation_data['c_y'],targ_w,targ_h,annotation_data['c_w'],annotation_data['c_h']);
    //     var img_name =  basename(tempnam("../users/".source_user_id, "h_").".jpg");
    //     //new_file_location = 'users/'.source_user_id.'/uploads/'.img_name;
    //     var new_file_location = 'users/'.source_user_id.'/'.img_name;
    //     var result = imagejpeg(dst_r, '../'.new_file_location, jpeg_quality);
    //       //^img/h/user_id/img_name      users/1/2    [NC,L]    # highlight images
    //     var img_url = "/img/h/".source_user_id.'/'.img_name;
    //     // return img_url;
    
    //   note = await Source_Annotation.create(note).fetch();
    //   console.log("note",note);
    //   noteIds.push(note.note_id);
    // }
   return noteIds;



  }


};

