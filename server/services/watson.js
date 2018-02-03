'use strict';

const fs = require('fs');
const watson = require('watson-developer-cloud');

const visual_recognition = watson.visual_recognition({
  api_key: '0cfbaac9e09dd231cbf637d2c54ca8a7804fb077',
  version: 'v3',
  version_date: '2016-05-20'
});

const WatsonClient = {

  classify () {
    let parameters = {
      classifier_ids: ["fruits_1462128776", "SatelliteModel_6242312846"],
      threshold: 0.6
    };
    
    const params = {
      images_file: fs.createReadStream('./images/'),
      parameters: parameters
    };
    
    visual_recognition.classify(params, function(err, response) {
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(response, null, 2))
    });
  },

  listClassifiers ()  {
    visual_recognition.listClassifiers({
      verbose: true
    },
      function(err, response) {
        if (err)
          console.log(err);
        else
          console.log(JSON.stringify(response, null, 2))
    });
  }

}

module.exports = WatsonClient;

