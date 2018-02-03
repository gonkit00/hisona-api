'use strict';

const fs = require('fs');
const watson = require('watson-developer-cloud');

const visual_recognition = watson.visual_recognition({
  api_key: '0cfbaac9e09dd231cbf637d2c54ca8a7804fb077',
  version: 'v3',
  version_date: '2016-05-20'
});

const classifierID = "es_public_358205314";

const WatsonClient = {

  async classify () {
    
    let parameters = {
      classifier_ids: [classifierID],
      threshold: 0.2
    };
    
    const params = {
      images_file: fs.createReadStream('./test-images/columbus.jpg'),
      parameters: parameters
    };

    try {
      const label = await visual_recognition.classify(params, function(err, response) {
        if (err)
          console.log(err);
        else
          console.log(JSON.stringify(response, null, 2))
      });
      
      return label
      
    } catch (err) {
      console.log(err);
    }
    
  },

  async listClassifiers ()  {
    
    try {
      const classifiers = await visual_recognition.listClassifiers({
        verbose: true
      },
        function(err, response) {
          if (err)
            console.log(err);
          else
            console.log(JSON.stringify(response, null, 2))
      });
  
      return classifiers;
  
    } catch (err) {
      console.log(err);
    }
 
  }

}

module.exports = WatsonClient;

