'use strict';

const fs = require('fs');
const watson = require('watson-developer-cloud');

const visual_recognition = watson.visual_recognition({
  api_key: process.env.WATSON_API_KEY,
  version: 'v3',
  version_date: '2016-05-20'
});

// TODO: Read from classification DB when created
// Reference from landmarkID collection property
const classifierID = 'es_public_358205314';

const WatsonClient = {

  /**
   * Classify an image
   */
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

  /**
   * Get all classifiers
  */
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

