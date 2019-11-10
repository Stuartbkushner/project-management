module.exports = {


    friendlyName: 'cancel order',
  
  
    description: 'send cancel order request to api.',
    inputs: {
      orderId: {
          type: 'number',
          example: 2,
          description: ' id of order being canceled',
      },
  
    },
  
  
    exits: {
  
      success: {
        description: 'Posted  orders.',
      }
  
    },
  
  
    fn: async function (inputs) {
      const request = require('request-promise');
      var orderId = inputs.orderId;
      var session = this.req.session;
      console.log("cancel order",orderId);
      var order = await sails.helpers.exchange.request("post","/markets/orders/cancel",{id:orderId},session);
      var flag = true;
      var msg = "Your order was canceled successfully";
      if(order == false){
          flag = false;
          msg = "There was an error canceling your order";
      }
      return {
        order:order,
        flag:flag,
        msg:msg,
      //   baseUrl:sails.config.custom.baseUrl,
  
      };
  
    }
  
  
  };
  