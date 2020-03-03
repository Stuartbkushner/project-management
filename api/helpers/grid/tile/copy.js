module.exports = {


  friendlyName: 'Copy',


  description: 'Copy tile.',


  inputs: {
    location_id: {
      description: 'id of location or slug',
      required: true,
      type: "ref",
    },
    update: {
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
    var location_id = inputs.location_id;
    var update = inputs.update;

    var location = await Location.findOne({location_id:location_id});

    
    console.log("helpers location copy location location",location);
    var newLocationInfo = {
      x: location.x,
      y: location.y,
      length: location.length,
      width: location.width,
      location_version: location.location_version,
      tile_id: location.tile_id,
    };
    var newLocationInfo = Object.assign(newLocationInfo, update);
    
    console.log("helpers location copy location newLocationInfo",newLocationInfo);
    var newLocation = await Location.create(newLocationInfo).fetch();
    return newLocation;



  }


};

