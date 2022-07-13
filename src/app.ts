import express from 'express';
import 'dotenv/config';
import './config/database';
import path from 'path';
import userModel from './models/user.model';

const PORT = parseInt(process.env.PORT || '7000');
const app = express();

const static_path = path.join(__dirname, './public');
const template_path = path.join(__dirname, './templates/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));

app.set('view engine', 'hbs');
app.set('views', template_path);

app.get('/', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/register', async (req, res) => {
  try {
    const password = req.body.password;
    const rpassword = req.body.repeatpassword;
    const email = req.body.email;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res.send('<h1>Email already exist</h1>');
    }
    if (password === rpassword) {
      const registerBookings = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        repeatpassword: req.body.repeatpassword,
      });
      const registered = await registerBookings.save();
      res.send('<h1>Register Successfully</h1>');
    } else {
      res.send('<h1>passwords are not matching</h1>');
    }
  } catch (error) {
    res.status(555).send(`<h1>${error}</h1>`);
  }
});
app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.psw;

    const userEmail = await userModel.findOne({ email: email });

    if (userEmail.password === password) {
      res.status(514).send('Login Successfully');
    } else {
      res.send('<h1>invalid login details</h1>');
    }
  } catch (error) {
    res.status(555).send(`<h1>${error.message}</h1>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server on the running PORT http://localhost:${PORT}`);
});
