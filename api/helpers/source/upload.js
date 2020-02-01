module.exports = {


  friendlyName: 'Create Source',


  description: 'Create tile.',


  inputs: {
    req: {
        description: 'req object posted',
        required: true,
        type: "ref",
    },
    source: {
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
    var req = inputs.req;
	var source = inputs.source;
	var sourceDir = sails.config.custom.sourceDir;
    var sourceDirPath = process.cwd() + sourceDir;
	
	var source_id =  source.source_id;
	var user_id =  source.user_id;
	var saveToDir = sourceDirPath +user_id+"/";

	const webshot = require('webshot');
	const PDF2Pic = require("pdf2pic");
	console.log("helpers source upload saveToDir",saveToDir);

	if(source.source_type == "pdf"){
		var image = await sails.helpers.files.upload.with({
			req: req,
			// folder:"tokens",
			type:'new_source_file',
			saveToDir:saveToDir
		});
		console.log("helpers source upload",image);
		var sourceFileType = image.type;
		if(sourceFileType ==  "pdf"){

			const pdf2pic = new PDF2Pic({
				density: 100,           // output pixels per inch
				savename: image.baseFilename,     // output file name
				savedir: saveToDir,    // output file location
				format: "jpg",          // output file format
				size: "600x600"         // output size in pixels
			});
			
			var images = await pdf2pic.convertBulk(image.path,-1).then((resolve) => {
				console.log("image converter successfully!");
				console.log("image converter successfully!",resolve);
				return resolve;
			});
			var source_pages = [];
			for (let i = 0; i < images.length; i++) {
				const imageX = images[i];
				let filename = imageX.path.substring(imageX.path.lastIndexOf('/')+1);
				source_page = {};
				source_page['source_page_number'] = imageX.page;
				source_page['source_page_content'] = filename;
				source_pages.push(source_page); 
			}

		}else{
			let filename = image.path.substring(image.path.lastIndexOf('/')+1);
			var source_pages = [];
			source_page = {};
			source_page['source_page_number'] = 1;
			source_page['source_page_content'] = filename;
			source_pages.push(source_page); 
		}

	}else if(source.source_type == "webpage"){
		//must be
		var randomName = await sails.helpers.strings.random('url-friendly');
		var filePath = saveToDir+randomName+'.png';
		var options  = {
			shotSize: { 
				height: 'all'
			}
		}
		await webshot(source.source_url, filePath, options, function(err){
			if (!err) {
				console.log('Screenshot taken successfully!');
			}
		});
		let filename = filePath.substring(filePath.lastIndexOf('/')+1);
		var source_pages = [];
		source_page = {};
		source_page['source_page_number'] = 1;
		source_page['source_page_content'] = filename;
		source_pages.push(source_page); 
	}
	

	for (let i = 0; i < source_pages.length; i++) {
		var source_page = source_pages[i];
		source_page.source_id = source_id;
		source_pages[i] = await Source_Page.create(source_page).fetch();
	}
	
	    
	return source_pages;
	// $upload_dir = $this->getUploadDir($user_id);
	// $upload_file = tempnam($upload_dir,"");
 


    // source_pages = [];

	// 	switch(source.source_type) {

	// 		case "pdf":

	// 				//get the file type, use it to remove the suffix and save the basename
	// 				filename = explode(".",basename(file['new_source_file']['name']));
	// 				suffix = strtolower(".".array_pop(filename));
	// 				base = implode(".",filename);
	// 				filename = base.suffix;
	// 				this.system_filename = substr(upload_file.suffix,strlen(realpath(dirname(__FILE__)."/../")));
	// 				filename_base = this.getBaseFilename();

	// 				if (move_uploaded_file(file['new_source_file']['tmp_name'], upload_file.suffix)) {
	// 					putenv('PATH=' . getenv('PATH') . IMAGICK_DIR);
	// 					putenv('PATH=' . getenv('PATH') . GHOST_SCRIPT_DIR);
	// 					im = new imagick();
	// 					//upload_file.suffix
	// 					im.setResolution(120, 120);
	// 					im.readImage(upload_file.suffix);
	// 					im.setImageFormat('jpeg');
	// 					im.setImageCompression(imagick::COMPRESSION_JPEG); 
	// 					im.setImageCompressionQuality(100);

	// 					count = im.getNumberImages();
	// 					for (x = 1;x <= im.getNumberImages(); x++) {
	// 					  im.previousImage();
	// 					  im.writeImage(upload_file."-".count.".jpg");
	// 					  source_page['source_page_number'] = x;
	// 					  source_page['source_page_content'] = filename_base."-".count.".jpg";
	// 					  source_pages[] = source_page; 
	// 					  count--;
	// 					}

	// 					im.clear();
	// 					im.destroy();

	// 					return source_pages;
	// 				} else {
	// 					return source_pages;
	// 				}

	// 		break;

	// 		case "webpage":


	// 			image = new Image(source.source_url);
	// 			image.binary = '/usr/local/bin/wkhtmltoimage';
				
	// 			wkhtmltoimage_options = array(
	// 				'quality' => 80,
	// 				'type' => 'jpg'
	// 			);
	// 			image.setOptions(wkhtmltoimage_options);

	// 			this.system_filename = substr(upload_file.".jpg",strlen(realpath(dirname(__FILE__)."/../")));
	// 			filename_base = this.getBaseFilename();

	// 			if (!image.saveAs("..".this.system_filename)) {
	// 			    echo image.getError();
	// 			}

	// 			source_page['source_page_number'] = 1;
	// 			source_page['source_page_content'] = filename_base."-1.jpg";
	// 			source_pages[] = source_page; 
	// 			if (!image.saveAs("..".substr(upload_file."-1.jpg",strlen(realpath(dirname(__FILE__)."/../"))))) {
	// 			    echo image.getError();
	// 			}

	// 			return source_pages;
	// 		break;
/*
			case "txt":
				//we need to convert the text to a pdf
				require_once('../fpdf17/html2pdf.php');

				
				pdf = new createPDF(
						source['source_text'],    // html text to publish
						this.title,   // article title
						"",     // article URL
						this.author, // author name
						time()
				);

				this.system_filename = substr(upload_file.".pdf",strlen(realpath(dirname(__FILE__)."/../")));
				filename_base = this.getBaseFilename();
				//this.filename = "test.pdf";
				
				pdf.run(upload_file.".pdf");


				putenv('PATH=' . getenv('PATH') . ':/opt/local/bin/');
				im = new imagick(upload_file.".pdf");

						im.setResolution(120, 120);
						im.setImageFormat('jpeg');
						im.setImageCompression(imagick::COMPRESSION_JPEG); 
						im.setImageCompressionQuality(100);



				count = im.getNumberImages();
				for (x = 1;x <= im.getNumberImages(); x++) {
				  im.previousImage();
				  im.writeImage(upload_file."-".count.".jpg");
				  // source_pages[] = "<img class='sourcePageImage' src='./users/".user_id."/uploads/".filename_base."-".count.".jpg"."' />";

						  source_pages[] = array("source_page_number"=>x,"source_page_content"=>"<img class='sourcePageImage' src='./users/".user_id."/uploads/".filename_base."-".count.".jpg"."' />");

				  count--;
				}

				
				
				return source_pages;


			break;
		*/
// 			default:
// 				echo "hit default";

// 		}

// 		return source_pages;
//     return new_source;

  }


};

