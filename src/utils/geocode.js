const request = require('request');

const geoCode = (address, callback) => {
  // encode is run if someone enteres an address that has a special characters such as "?"
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5tb2xkZXNhaTQiLCJhIjoiY2p6ZzU1cTVrMGdsZTNicDVla200YTk0aCJ9.NxfMJQIBGMIEnMBmcHZ9iA`;
  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        callback('Unable to connect to location services');
      } else if (!body.features.length) {
        callback('No results found for address');
      } else {
        const longtitude = body.features[0].center[0];
        const lattitude = body.features[0].center[1];
        const location = body.features[0].place_name;
        callback(undefined, { longtitude, lattitude, location });
      }
    }
  );
};

module.exports = geoCode;
