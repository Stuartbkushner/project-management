module.exports = {


  friendlyName: 'Create source note',


  description: 'create source note .',


  inputs: {
    annotation_data: {
        description: 'cutout info',
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
    var annotation_data = inputs.annotation_data;
    var source_id = annotation_data.source_id;
    var source_page = annotation_data.source_page;
    var left = parseInt(annotation_data.c_x);
    var top = parseInt(annotation_data.c_y);
    var width = parseInt(annotation_data.c_w);
    var height = parseInt(annotation_data.c_h);
    var new_width = parseInt(annotation_data.bounds_0);
    var new_height = parseInt(annotation_data.bounds_1);
    var sourceHeight = sails.config.custom.sourceHeight;
	  var sourceWidth = sails.config.custom.sourceWidth;
    console.log("note create inputs",inputs);
    console.log("note create annotation_data",annotation_data);

    var source_pages = await Source_Page.find({source_id:source_id,source_page_number:source_page}).populate("source_id");
    console.log("note create source_pages",source_pages);
    var source_page = source_pages[0];
    console.log("note create source_page",source_page);

    var source_page_content = source_page.source_page_content;

    var sourceDir = sails.config.custom.sourceDir;
	  var sourceDirTemp = sails.config.custom.sourceDirTemp;

    var sourceDirPath = process.cwd() + sourceDir;
    var sourceDirPathTemp = process.cwd() + sourceDirTemp;
	
    var user_id =  source_page.source_id.user_id;
    var saveToDir = sourceDirPath +user_id+"/";
    var saveToDirTemp = sourceDirPathTemp +user_id+"/";
    var image_name = await sails.helpers.strings.random('url-friendly');
    var saveToName = saveToDir+image_name+".png";
    var saveToNameTemp = saveToDirTemp+image_name+".png";
    var source_page_content_path = saveToDir+source_page_content;
    console.log("note create source_page_content_path",source_page_content_path);
    console.log("note create saveToDir",saveToDir);
    console.log("note create saveToName",saveToName);
    console.log("note create saveToDirTemp",saveToDirTemp);
    console.log("note create saveToNameTemp",saveToNameTemp);
    console.log("note create saveToDirTemp",saveToDirTemp);




    const sharp = require('sharp');
	  var fs = require('fs');

    const cutout = await sharp((source_page_content_path))
    .extract({ left: left, top: top, width: width, height: height })
    // .resize({ 
    //   height: sourceHeight ,
    //   width: sourceHeight ,
    // })
    .toFile(saveToName, function(err) {
      // Extract a region of the input image, saving in the same format.
      console.log("note create exstract tofile  err",err);
      console.log("note create exstract tofile  saveToName",saveToName);
      return saveToName;
      
    });
    console.log("note create cutout",cutout);

    const cutoutTemp = await sharp((source_page_content_path))
    .extract({ left: left, top: top, width: width, height: height })
    // .resize({ 
    //   height: sourceHeight ,
    //   width: sourceHeight ,
    // })
    .toFile(saveToNameTemp, function(err) {
      // Extract a region of the input image, saving in the same format.
      console.log("note create exstract tofile  err",err);
      console.log("note create exstract tofile  saveToNameTemp",saveToNameTemp);
      return saveToNameTemp;
      
    });
    console.log("note create cutoutTemp",cutoutTemp);

    // // destination.txt will be created or overwritten by default.
    // fs.copyFile(saveToName, saveToNameTemp, (err) => {
    //   if (err) throw err;
    //   console.log('note create  '+saveToName +'was copied to '+saveToNameTemp);
    // });

		// fs.createReadStream(saveToName).pipe(fs.createWriteStream(saveToNameTemp));

      console.log("note create saveToName",saveToName);
      var filename = saveToName.substring(saveToName.lastIndexOf('/')+1);
      console.log("note create filename",filename);

      annotation_data.cutout = "/images/"+user_id+"/"+filename;
      console.log("note create annotation_data",annotation_data);

    var source_annotation = await Source_Annotation.create(annotation_data).fetch();
    console.log("note create source_annotation",source_annotation);


      return source_annotation;
      
    // $annotation_data['source_page'] = source id in db
    // $annotation_data['source_page'] = the source page to take highlight from
    // $annotation_data['c_w'] = width of cut out
    // $annotation_data['c_h'] = height of cut out
    // $annotation_data['bounds_0'] = width of new image/ cutout
    // $annotation_data['bounds_1'] =  height of new image / cut out
    // $annotation_data['c_x'] = x coordinate of where cut out starts
    // $annotation_data['c_y'] = y coordinate of where cut out starts
  }


};

