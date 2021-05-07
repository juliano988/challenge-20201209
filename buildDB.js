const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const db = mongoose.connection;

console.clear();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  const userSchema = new mongoose.Schema({
    gender: String,
    name: {
      title: String,
      first: String,
      last: String
    },
    location: {
      street: {
        number: Number,
        name: String
      },
      city: String,
      state: String,
      postcode: Number,
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      timezone: {
        offset: String,
        description: String
      }
    },
    email: String,
    login: {
      uuid: String,
      username: String,
      password: String,
      salt: String,
      md5: String,
      sha1: String,
      sha256: String
    },
    dob: {
      date: String,
      age: Number
    },
    registered: {
      date: String,
      age: Number
    },
    phone: String,
    cell: String,
    userId: {
      name: String,
      value: String
    },
    picture: {
      large: String,
      medium: String,
      thumbnail: String
    },
    nat: String
  });

  const Users = mongoose.model('Users', userSchema);

  fs.readFile(path.join(process.cwd(), 'challenge-files', 'users.json'), 'utf8', (err, data) => {

    const usersArr = JSON.parse(data).results;

    console.log('Inserindo no banco ' + usersArr.length + ' usuários...')

    usersArr.forEach(function (user, i, arr) {
      Users.findOneAndUpdate({ login: user.login }, user, { new: true, omitUndefined: true, overwrite: true, upsert: true }, function (err, doc) {
        if (err) return console.error(err);
        if (i === arr.length - 1) {
          console.log("Usuários inseridos com sucesso!")
        }
      })
    })

  })

});