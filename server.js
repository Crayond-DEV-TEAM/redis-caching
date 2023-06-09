const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const auth = require('./controllers/authorization');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});



const app = express();

app.use(cors())
app.use(express.json());

app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.patch('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})