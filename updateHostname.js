// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

require("dotenv").config({ path: ".env" });

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const newHostname = "https://service.callboard.io";
const oldHostname = "https://1ea8-2001-4450-817f-5801-8cd7-882a-f947-905e.ap.ngrok.io";

const client = require('twilio')(accountSid, authToken);

client.incomingPhoneNumbers
  .list()
  .then(incomingPhoneNumbers => incomingPhoneNumbers.forEach(i => {(
      i.smsUrl === oldHostname + "/twiml/sms/inbound" &&
      i.voiceUrl === oldHostname + "/twiml/voice/inbound" &&
      i.statusCallback === oldHostname + "/twiml/voice/status") &&
      i.sid === 'PNf990e52c506bbcd8ea5ce5c354e9c121' &&
      updateHostname(i.sid);
    })
  );

// function updateHostname(sid){
//     console.log(sid)
// }

function updateHostname(sid){
    client.incomingPhoneNumbers(sid)
    .update({
        statusCallback: newHostname + "/twiml/voice/status",
        voiceUrl: newHostname + "/twiml/voice/inbound",
        smsUrl: newHostname + "/twiml/sms/inbound"
     })
     .then(incoming_phone_number => console.log(incoming_phone_number.friendlyName, incoming_phone_number.phoneNumber, `Update hostname FROM ${oldHostname} TO ${newHostname}`));
}