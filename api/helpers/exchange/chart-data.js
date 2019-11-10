module.exports = {


  friendlyName: 'Request',


  description: 'Returns chart data from trade inputs',


  inputs: {
    type: {
      description: 'chart type',
      example: 'trades',
      type: "string",
      required: true,
    },
    data: {
      description: 'chart type',
      example: 'trades',
      type: "ref",
      required: true,
    },

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    var type = inputs.type;
    var dataset = inputs.data;
    var chartData = [];
    console.log("dataset",dataset);
    dataset.forEach(data => {
        console.log('data',data);
        if(type == "trades"){
            time = new Date(data.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            time = time.replace("/","-");
            time = time.replace("/","-");

            chartData.push({
                time: time,
                value: data.price,
                amount: data.amount,
            });
        }
        
    });
    console.log(chartData);
    return chartData;


  }


};

