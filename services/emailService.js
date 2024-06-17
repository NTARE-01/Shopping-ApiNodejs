const nodemailer = require('nodemailer');
const config = require('config');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: config.get('email.service'),
  auth: {
    user: config.get('email.user'),
    pass: config.get('email.password')
  }
});

exports.sendVerificationEmail = (user) => {
  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'), { expiresIn: '1h' });
  const url = `http://localhost:3000/api/auth/verify/${token}`;

  transporter.sendMail({
    to: user.email,
    subject: 'Email Verification',
    html: `Please click this link to verify your email: <a href="${url}">${url}</a>`
  });
};
