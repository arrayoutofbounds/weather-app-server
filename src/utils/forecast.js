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
          const tempHigh = body.daily.data[0].temperatureMax;
          const tempLow = body.daily.data[0].temperatureMin;
          const finalResult = `The temperate is ${temp}. Chance of rain is ${precipProbability}. Max temp is ${tempHigh}. Min temp is ${tempLow}. Overall it will be ${summary}`
          callback(undefined, {
            temp,
            precipProbability,
            summary,
            tempHigh,
            tempLow,
            finalResult
          });
      }
    }
  );
}

module.exports = forecast;



