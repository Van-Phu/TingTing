const express = require("express");
const userModel = require("../models/userModel");
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'Không có user' });
  }

  if(password === user.password){
    passwordMatch = true
  }
  else{
    passwordMatch = false
  }

  if (passwordMatch == false) {
    return res.status(401).json({ error: 'Tài khoản hoặc mật khẩu không hợp lệ!!' });
  }

  if(passwordMatch == true){
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    console.log(token)
    return res
              .status(200)
              .json({ token });
  
  }
  // Generate a JWT
  const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  console.log(token)
  res.json({ token });
});


app.get('/sendMail/:email', function (req, res, next) {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const num = randomNumber;
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'tingapp401@gmail.com',
      pass: 'axrtvafzvrtjistp'
    }
  }));
  const mailOptions = {
    from: 'tingapp401@gmail.com',
    to: req.params.email,
    subject: 'Login Notification',
    text: `Mã xác thực: ${num}`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json(String(num));
    }
  });
});


app.get('/checkUsername/:username', (req, res) => {
  userModel.findOne({ username: req.params.username })
    .exec()
    .then(username => {
      if (username) {
        return res.status(409).json({
          message: "Tài khoản đã có trong hệ thống!!"
        });
      } else {
        res.status(200).json({
          message: "Tài khoản chưa có trong hệ thống!!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

app.get('/checkEmail/:email', (req, res) => {
  userModel.findOne({ email: req.params.email })
    .exec()
    .then(email => {
      if (email) {
        return res.status(409).json({
          message: "Email đã có trong hệ thống!!"
        });
      } else {
        res.status(200).json({
          message: "Email chưa có trong hệ thống!!"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
app.post('/signup', (req, res) => {
  userModel.findOne({ username: req.body.username })
    .exec()
    .then(username => {
      if (username) {
        return res.status(409).json({
          message: 'Tài khoản đã có trong hệ thống'
        });
      } else {
        const user = new userModel({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          fullName: req.body.fullName
          // email: req.body.email,
          // phoneNumber: req.body.phoneNumber
        });
        user.save()
          .then(result => {
            res.status(201).json({
              message: 'Tạo tài khoản thành công!!'
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    });
});


app.get("/users", async (request, response) => {
    const users = await userModel.find({});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.get('/getUserByName/:username', async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username });
    res.json(user);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/getUserByID/:_id', async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params._id });
    res.json(user);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch("/updateCose/:_id", async (request, response) => {
  const { _id } = request.params;
  const updates = request.body;
  try {
    const cost = await userModel.findByIdAndUpdate(_id, updates, { new: true });
    response.send({
      message: "Update Thành Công", 
      cost: cost
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

// app.patch("/updateCose/:_id", async (request, response) => {
//   const { _id } = request.params;
//   const updates = request.body;
//   try {
//     const cost = await userModel.findByIdAndUpdate(_id, updates, { new: true });
//     response.send({
//       message: "Update Thành Công", 
//       cost: cost
//     });
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });





module.exports = app;