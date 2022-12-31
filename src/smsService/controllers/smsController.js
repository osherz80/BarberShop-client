const express = require('express');
const router = express.Router();
const smsService = require('../services/smsService');

router.post('/send', (req, res) => {
  res.send(smsService.sendSms(req.body.phoneNum));
});

router.post('/send/code', (req, res) => {
  res.send(smsService.sendCodeToVerify(req.body.phoneNum));
});

router.post('/verify', (req, res) => {
  res.send(smsService.verifyCode(req.body.code));
});

module.exports = router;
