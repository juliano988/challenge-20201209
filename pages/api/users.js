// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';

import { Users } from '../../models.js'

const db = mongoose.connection;

export default async (req, res) => {

  await mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  db.on('error', console.error.bind(console, 'connection error:'));

  await Users.findOne({ gender: "male" }, function (err, doc) {
    if (err) return console.error(err);
    console.log(doc)
  })

  res.status(200).json({ name: 'John Doe' })

}
