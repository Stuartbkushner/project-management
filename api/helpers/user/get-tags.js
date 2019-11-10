module.exports = {


    friendlyName: 'Get',
  
  
    description: 'Get user.',
  
  
    inputs: {
      user_id: {
        description: 'team or user object',
        required: true,
        type: "number",
  
      },
      term: {
        description: 'team or user object',
        required: false,
        type: "string",
  
      },
  
    },

    exits: {
  
      success: {
        description: 'All done.',
      },
  
    },
  
  
    fn: async function (inputs) {
      var user_id = inputs.user_id;
      var term = inputs.term;
      if(term){
        var tags = await Tag.find({
            where:{
                user_id: user_id,
                tag_content:{
                    "contains": term
                }
            },
            select: ['tag_content']
        });

    }else{
        var tags = await Tag.find({
            where:{
                user_id: user_id
            },
            select: ['tag_content']
        });
    }

    return tags;

    }
  
  
  };
  
  