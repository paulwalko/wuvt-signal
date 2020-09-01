const AWS = require('aws-sdk');
const fetch = require('node-fetch');

AWS.config.update({region: 'us-east-1'});


exports.handler = (event) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  //console.log(`MESSAGE: ${JSON.stringify(message)}`);
  
  if (message.messageBody.toLowerCase().includes('wuvt')) {
    fetch('https://www.wuvt.vt.edu/playlists/latest_track', {
      headers: {
        Accept: 'application/json',
      }
    }).then((r) => {
      r.text().then((rt) => {
        // Check for error
        if (r.status !== 200) {
          console.error(`ERROR, STATUS: ${r.status}, TEXT: ${rt}`);
          return;
        }
        
        // Create smsResponse
        const trackinfo = JSON.parse(rt);
        let smsResponse = '';
        if (trackinfo.listeners) {
          smsResponse = `${trackinfo.dj} is currently playing "${trackinfo.title}" by ${trackinfo.artist} with ${trackinfo.listeners} listeners.`;
        } else {
          smsResponse = `${trackinfo.dj} is currently playing "${trackinfo.title}" by ${trackinfo.artist}.`;
        }
        
        // Send smsResponse
        const smsParams = {
          Message: smsResponse,
          PhoneNumber: message.originationNumber,
        };
        
        const promise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(smsParams).promise();
        promise.then().catch((err) => {
          console.error(err, err.stack);
         });
      });
    });
  } else {
    console.log(`MESSAGE: ${JSON.stringify(message)}`);
  }
};
