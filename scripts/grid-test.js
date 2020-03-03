module.exports = {


  friendlyName: 'Grid test',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run grid-test`)');

    var grid_tile = await sails.helpers.grid.tile.copy(302,{grid_id:162});


  }


};

