var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');

// AWS SDK Configure  
AWS.config.update({
  accessKeyId: 'AKIARAR74F5B2ZJFROOU',
  secretAccessKey: '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',
  region: 'us-east-1', 
});

const client  = new AWS.Rekognition();

router.post('/classify', function(req, res, next) {

  // DON'T return the hardcoded response after implementing the backend
  let response = ["shoe", "red", "nike"];

  // Your code starts here //

  //Checking if the file is Uploaded
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const params = {
    Image: {
      Bytes: req.files.file.data, //Getting data from the uploaded image
    },
  };

  //Handling errors and returning the label names
  client .detectLabels(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to process the request' });
    } else {
      const labels = data.Labels.map(label => label.Name);
      res.json({
        "labels": labels 
        });
    }
  });


});

module.exports = router;
