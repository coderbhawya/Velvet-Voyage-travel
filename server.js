const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));

app.post('/contact', async (req, res) => {
  const { name, email, destination, travel_date, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Please fill in your name, email, and message.');
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  const hasPlaceholderPassword =
    !gmailPassword ||
    gmailPassword.includes('PASTE_') ||
    gmailPassword.includes('your_16') ||
    !/^[a-zA-Z0-9]{16}$/.test(gmailPassword.trim());

  if (!gmailUser || hasPlaceholderPassword) {
    return res.status(500).send(
      'Gmail is not configured correctly. Please generate a real 16-character Gmail App Password and update the .env file, then restart the server.'
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const mailOptions = {
      from: gmailUser,
      to: 'officialbhawyagugdodia@gmail.com',
      replyTo: email,
      subject: `New Travel Inquiry from ${name}`,
      html: `
        <h2>New Travel Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destination:</strong> ${destination || 'Not specified'}</p>
        <p><strong>Travel Date:</strong> ${travel_date || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.redirect('/thank-you.html');
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).send('The inquiry could not be sent. Please try again later.');
  }
});

app.get('/health', (req,res) => {
  res.json({ ok: true, message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
