module.exports = {


  friendlyName: 'Update token',


  description: 'Update the token for the logged-in user.',


  inputs: {
    tokenId: {
        description: 'Id of the token',
        example: '10',
        required: true
      },
    name: {
      description: 'name paid to token holdrs',
      example: '10',
      required: true
    },
    // symbol: {
    //   description: 'how often name is paid',
    //   example: 'daily',
    //   required: true
    // },
    description: {
      description: 'Is this token public to view on token tokey',
      example: 'true',
      required: true
    },
    website: {
      description: 'how often name is paid',
      example: 'website for project',
      required: false
    },
    twitter: {
      description: 'Is this token public to view on token tokey',
      example: 'twitter',
      required: false
    },

  },


  fn: async function (inputs) {
    // make sure current user owns current token
    var name = inputs.name;
    var symbol = inputs.symbol;
    var description = inputs.description;
    var tokenId = inputs.tokenId;
    var twitter = inputs.twitter;
    var website = inputs.website;
    var userId = this.req.me.id;
    var token = await sails.models.token.findOne({id:tokenId});
    var current_frequency = token.symbol;
    if(token.userId == userId){
      var images = await sails.helpers.files.upload.with({
        req: this.req,
        // folder:"tokens",
        type:'logo'
      });
        await sails.models.token.update({ id: tokenId})
        .set({
            name: name,
            symbol: symbol,
            description: description,
            twitter: twitter,
            website: website,
        });
        
        console.log('token should e set');
        token = await sails.models.token.findOne({id:tokenId});
        return token;

        
    }else{
        console.log('not authorized',token.userId,user_id);
        return false;
    }
    
    // // Hash the new token.
    // var hashed = await sails.helpers.tokens.hashPassword(inputs.token);

    // // Update the record for the logged-in user.
   

  }


};
