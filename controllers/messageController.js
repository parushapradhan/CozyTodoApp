const Message = require('../models/Message');

exports.getForm = (req, res) => {
  console.log('here')
  res.render('index');
};

exports.submitForm = async (req, res) => {
  const { name, message } = req.body;
  await new Message({ name, message }).save();
  res.render('success', { name });
};
