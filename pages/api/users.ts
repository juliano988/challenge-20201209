import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Users } from '../../models.js'
import { User } from '../../customTypes.js';

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => console.log(error));

export default (req: NextApiRequest, res: NextApiResponse) => {

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  Users.find(function (err, docs:Array<User>) {
    if (err) return console.error(err);
    res.status(200).json(docs)
  })

}
