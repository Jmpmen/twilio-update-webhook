require("dotenv").config({ path: ".env" });

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require('twilio')(accountSid, authToken);

client.availablePhoneNumbers("US")
    .tollFree
    .list({VoiceEnabled: true})
    .then(tollFree => tollFree.forEach(t => console.log(t)));