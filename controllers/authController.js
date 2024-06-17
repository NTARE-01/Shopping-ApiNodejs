const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { sendVerificationEmail } = require('../services/emailService');

exports.signup = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  sendVerificationEmail(user);

  res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  if (!user.isVerified) return res.status(400).send('Please verify your email.');

  const token = user.generateAuthToken();
  res.send(token);
};

exports.verifyEmail = async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

  let user = await User.findById(decoded._id);
  if (!user) return res.status(400).send('Invalid token.');

  user.isVerified = true;
  await user.save();

  res.send('Email verified successfully.');
};
