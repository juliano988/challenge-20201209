import mongoose from 'mongoose';

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

export const Users = mongoose.model('Users', userSchema);
