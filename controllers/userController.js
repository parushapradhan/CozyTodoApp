const Message = require('../models/User');

exports.getForm = (req, res) => {
  console.log('here')
  res.render('index');
};

exports.submitSettings = async (req, res) => {
  const { name, message } = req.body;
  await new User({ name, message }).save();
  res.render('success', { name });
};

exports.submitLevel = async (req, res) => {
  const { name, message } = req.body;
  await new User({ name, message }).save();
  res.render('success', { name });
};
