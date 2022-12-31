const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSms = (receivedPhoneNum) => {
    client.messages
        .create({ body: 'Hi there', from: process.env.TWILIO_NUMBER, to: `+972${receivedPhoneNum}` })
        .then((message) => { return message.sid });
}

exports.sendCodeToVerify = (receivedPhoneNum) => {
    client.verify.v2.services(process.env.AUTH_SERVICE_SID)
        .verifications
        .create({ to: `+972${receivedPhoneNum}`, channel: 'sms' })
        .then(verification => console.log(verification.status));
}

exports.verifyCode = (receivedCode) => {
    client.verify.v2.services(process.env.AUTH_SERVICE_SID)
        .verificationChecks
        .create({ to: '+9720584006013', code: receivedCode })
        .then(verification_check => console.log(verification_check.status));
}