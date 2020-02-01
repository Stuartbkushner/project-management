let fs = require('fs');
module.exports = {


  friendlyName: 'Upload',


  description: 'Upload account.',


  inputs: {
    req: {
      description: 'current req',
      extendedDescription: 'current req',
      type: 'ref'
    },
    type: {
      description: 'type of file being uploadd. this becomes a folder name to find files of these type',
      extendedDescription: 'type of file being uploadd. this becomes a folder name to find files of these type',
      type: 'string'
    },
    saveToDir: {
      description: ' path to save file',
      type: 'string'
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
    const req = inputs.req;
    const type = inputs.type;
    const sourceDir = inputs.saveToDir;
    var location = sourceDir;
    var tmpLocation = '/.tmp/public/images/'+type+"/";
    var path = process.cwd() + location;
    return new Promise(function(resolve, reject) {
      req.file(type).upload({ dirname : path },
      async function(err, uploadedImage) {
      if (err) return reject(err);
      if (uploadedImage.length === 0){
        console.log('No file was uploaded');
        return resolve({
          flag: false,
          msg: 'No file was uploaded',
        });
        return resolve(uploadedImage);
      }else{
        let filename = uploadedImage[0].fd.substring(uploadedImage[0].fd.lastIndexOf('/')+1);
        let fileType = uploadedImage[0].fd.substring(uploadedImage[0].fd.lastIndexOf('.')+1);
        let uploadLocation = process.cwd() +location + filename;
        let tempLocation = process.cwd() + tmpLocation + filename;
        fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
        var updateValues = {};
        var src = uploadedImage[0].fd.split('images/')[1];
        src = '/images/'+ src;
        updateValues[type] = src;
        await User.update({ id : req.me.id }).set(updateValues);
        path += filename;
        var fileList = filename.split(".");
        baseFilename = fileList[0];

        return resolve({
          flag: true,
          msg: "success",
          src: src,
          path:path,
          type:fileType,
          filename:filename,
          baseFilename:baseFilename,
        });
      }
      

      // req.file(type).upload({
      //   // don't allow the total upload size to exceed ~10MB
      //   maxBytes: 10000000
      // },async function whenDone(err, uploadedFiles) {
      //   if (err) {
      //     return reject(err) ;
      //   }
    
      //   // If no files were uploaded, respond with an error.
      //   if (uploadedFiles.length === 0){
      //     console.log('No file was uploaded');
      //     return resolve(false);
      //     return resolve(uploadedFiles);
      //   }else{
      //     profileImageMeta = uploadedFiles[0];
      //     imageUrl = profileImageMeta['fd'];
      //     console.log(profileImageMeta);
  
      //     await User.updateOne({ id: req.me.id })
      //     .set({profileImage:imageUrl});
      //     return resolve(imageUrl );

  
      //   }
      //   console.log(uploadedFiles);
    
  
      });

    });
    
    
  }


};

