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
    // const req = inputs.req;
    // const type = inputs.type;
    // var location = '/assets/images/'+type+"/";
    // var tmpLocation = '/.tmp/public/images/'+type+"/";
    // return new Promise(function(resolve, reject) {
    //   req.file(type).upload({ dirname : process.cwd() + location },
    //   async function(err, uploadedImage) {
    //   if (err) return reject(err);
    //   if (uploadedImage.length === 0){
    //     console.log('No file was uploaded');
    //     return resolve({
    //       flag: false,
    //       msg: 'No file was uploaded',
    //     });
    //     return resolve(uploadedImage);
    //   }else{
    //     let filename = uploadedImage[0].fd.substring(uploadedImage[0].fd.lastIndexOf('/')+1);
    //     let uploadLocation = process.cwd() +location + filename;
    //     let tempLocation = process.cwd() + tmpLocation + filename;
    //     console.log("upload uploadedImage[0]",uploadedImage[0]);
    //     console.log("upload tempLocation",tempLocation);
    //     console.log("upload uploadLocation",uploadLocation);
    //     fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
    //     var updateValues = {};
    //     var src = uploadedImage[0].fd.split('images/')[1];
    //     src = '/images/'+ src;
    //     updateValues[type] = src;
    //     await User.update({ id : req.me.id }).set(updateValues);
    //     return resolve({
    //       flag: true,
    //       msg: "success",
    //       src: src,
    //     });
    //   }
      
    // TODO
    const req = inputs.req;
    const type = inputs.type;
    const sourceDir = inputs.saveToDir;
    var location = sourceDir;
    var tmpLocation = '/.tmp/public/images/'+type+"/";
    var path = process.cwd() + tmpLocation;
    return new Promise(function(resolve, reject) {
      req.file(type).upload({ dirname : location },
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
          //  var _location = '/assets/images/'+type+"/";  
        // let uploadLocation = process.cwd() +_location + filename;
        let uploadLocation = location + filename;
        let tempLocation = process.cwd() + tmpLocation + filename;
        console.log("upload uploadedImage[0]",uploadedImage[0]);
        console.log("upload tempLocation",tempLocation);
        console.log("upload uploadLocation",uploadLocation);
        if (!fs.existsSync(location)){
            fs.mkdirSync(location);
        }
        if (!fs.existsSync(tempLocation)){
            fs.mkdirSync(tempLocation);
        }
        console.log("upload location",location);

        fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
        var updateValues = {};
        var src = uploadedImage[0].fd.split('images/')[1];
        src = '/images/'+ src;
        updateValues[type] = src;
        await User.update({ user_id : req.me.user_id }).set(updateValues);
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

