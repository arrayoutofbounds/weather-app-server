const request = require('request');


const forecast = (latitude, longtitude,  callback ) => {
  const url = `https://api.darksky.net/forecast/f6807345f31c2edde3f429275a44447e/${latitude},${longtitude}?units=si`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if(error){
          callback("Unable to connect to weather service");
      }else if(body.error){
          callback("Unable to find location");
      }else{
          const temp = body.currently.temperature;
          const precipProbability = body.currently.precipProbability;
          const summary = body.daily.data[0].summary;
          callback(undefined, {
            temp,
            precipProbability,
            summary
          });
      }
    }
  );
}

module.exports = forecast;



